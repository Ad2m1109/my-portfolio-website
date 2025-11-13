from flask import Flask, render_template, jsonify, request
from flask_compress import Compress
from flask_talisman import Talisman
from flask_caching import Cache
import os
import csv
import logging
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Security Configuration
    app.config.update(
    SECRET_KEY=os.getenv('SECRET_KEY', 'dev-key-change-in-production'),
    WTF_CSRF_ENABLED=True,
    SESSION_COOKIE_SECURE=True if os.getenv('ENV') == 'production' else False,
    SESSION_COOKIE_HTTPONLY=True,
    PERMANENT_SESSION_LIFETIME=timedelta(hours=1),
    CACHE_TYPE='simple',
    CACHE_DEFAULT_TIMEOUT=300,
    MAIL_SERVER=os.environ.get('MAIL_SERVER') or 'smtp.gmail.com',
    MAIL_PORT=int(os.environ.get('MAIL_PORT') or 587),
    MAIL_USE_TLS=os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1'],
    MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
    MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
    MAIL_DEFAULT_SENDER=os.environ.get('MAIL_DEFAULT_SENDER')
)
    
    # Extensions
    Compress(app)
    Cache(app)
    
    # Security headers
    Talisman(app, force_https=False, content_security_policy={
        'default-src': "'self'",
        'script-src': [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://www.googletagmanager.com"
        ],
        'style-src': [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://fonts.googleapis.com"
        ],
        'font-src': [
            "'self'",
            "https://fonts.gstatic.com",
            "https://cdnjs.cloudflare.com"
        ],
        'img-src': ["'self'", "data:", "https:"],
        'connect-src': ["'self'"]
    })
    
    return app

app = create_app()

# Security headers
@app.after_request
def security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

# Data Management Class
class PortfolioData:
    @staticmethod
    def _load_from_csv(file_path, expected_fields):
        if not os.path.exists(file_path):
            logging.warning(f"{file_path} not found. Returning empty list.")
            return []
        
        data = []
        try:
            with open(file_path, mode='r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if not all(field in row for field in expected_fields):
                        logging.warning(f"Skipping invalid row in {file_path}: {row}")
                        continue
                    data.append(row)
        except Exception as e:
            logging.error(f"Error reading {file_path}: {e}")
            return []
        return data

    @staticmethod
    def load_certifications():
        csv_path = os.path.join('data', 'certifications.csv')
        expected_fields = ['title', 'issuer', 'date', 'category', 'url']
        return PortfolioData._load_from_csv(csv_path, expected_fields)

    @staticmethod
    def load_projects():
        csv_path = os.path.join('data', 'projects.csv')
        expected_fields = ['title', 'description', 'tech_stack', 'category', 'github_url', 'demo_url', 'is_current', 'image_url']
        projects_data = PortfolioData._load_from_csv(csv_path, expected_fields)
        
        projects = []
        for row in projects_data:
            project = {
                'title': row['title'] or 'Untitled Project',
                'description': row['description'] or 'No description provided',
                'tech_stack': row['tech_stack'].split(',') if row['tech_stack'] else ['Unknown'],
                'category': row['category'] or 'other',
                'github_url': row['github_url'] or '#',
                'demo_url': row['demo_url'] or '#',
                'is_current': row['is_current'].lower() == 'true',
                'image_url': row['image_url'] or '/static/images/projects/default.png'
            }
            projects.append(project)
        return projects

    @classmethod
    def get_portfolio_data(cls):
        return {
            'name': 'Adem Youssfi',
            'title': 'Computer Science Student | AI/ML Engineer | Full-Stack Developer',
            'bio': "I'm a passionate second-year Computer Science student with extensive hands-on experience in AI/ML, computer vision, full-stack development, and mobile apps. I've built 25+ projects across machine learning, web, mobile, and desktop platforms, demonstrating strong problem-solving skills and technical versatility.",
            'about': "A highly motivated Computer Science student specializing in Artificial Intelligence, Machine Learning, and Full-Stack Development. I've successfully delivered 25+ projects ranging from advanced computer vision systems (football analytics with YOLOv8/TensorRT) to cross-platform mobile apps (Flutter) and web applications (Flask, FastAPI). My expertise spans the entire development lifecycle - from concept to deployment - with a focus on creating innovative, user-centric solutions. I'm passionate about leveraging cutting-edge technologies to solve real-world problems and continuously expanding my skillset through hands-on projects.",
            'experience': [
                {
                    'title': 'AI & Computer Vision Engineer',
                    'description': 'Engineered and deployed advanced computer vision systems using YOLOv8, TensorRT, and OpenCV for real-time object detection and tracking in sports analytics. Developed and optimized deep learning models for facial recognition and landmark detection, achieving high accuracy and performance.'
                },
                {
                    'title': 'Full-Stack Developer',
                    'description': 'Architected and developed scalable web applications using Flask, FastAPI, and Laravel. Designed and implemented RESTful APIs, managed databases, and deployed production-ready applications on cloud platforms. Championed responsive design and a seamless user experience.'
                },
                {
                    'title': 'Mobile App Developer',
                    'description': 'Led the development of 10+ cross-platform mobile applications using Flutter and Dart, from concept to deployment on the app stores. Integrated AI-powered features, implemented offline-first architecture, and ensured high-quality user experiences.'
                },
                {
                    'title': 'Machine Learning Practitioner',
                    'description': 'Developed and evaluated predictive models using scikit-learn and TensorFlow for various data science projects. Implemented and visualized clustering algorithms, and performed data analysis and feature engineering to extract valuable insights.'
                },
                {
                    'title': 'Software Engineer',
                    'description': 'Designed and built desktop applications using Python (Tkinter) and Java (Swing). Contributed to open-source projects, managed version control with Git, and collaborated with teams to deliver high-quality software solutions.'
                }
            ],
            'education': {
                'degree': "Bachelor's Degree in Computer Science",
                'level': 'Second Year Student - Expected Graduation: 2027',
                'courses': 'Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java, C++), Database Management (SQL), Web Technologies (HTML, CSS, JavaScript, PHP), Machine Learning & AI, Computer Vision, Software Engineering, Mobile Development, Network Programming'
            },
            'skills': {
                'programming': ['Python', 'Java', 'C++', 'JavaScript', 'Dart', 'SQL', 'HTML/CSS', 'PHP', 'Rust'],
                'frameworks': ['Flask', 'FastAPI', 'Laravel', 'Flutter', 'Bootstrap', 'TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'Android SDK', 'React', 'Angular'],
                'ai_ml': ['Computer Vision', 'Deep Learning', 'Object Detection', 'Image Segmentation', 'Natural Language Processing', 'Prompt Engineering', 'YOLOv8', 'TensorRT', 'Gemini API'],
                'databases': ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB'],
                'tools': ['Git', 'GitHub', 'Docker', 'Android Studio', 'VS Code', 'Jupyter Notebook', 'Postman', 'RESTful APIs', 'Cargo'],
                'design': ['UI/UX Design', 'Responsive Design', 'Material Design', 'Adobe Photoshop', 'Adobe Premiere Pro'],
                'soft_skills': ['Team Leadership', 'Problem Solving', 'Project Management', 'Agile Development', 'Technical Writing', 'Communication']
            },
            'projects': cls.load_projects(),
            'certifications': cls.load_certifications(),
            'contact': {
                'email': 'ademyoussfi57@gmail.com',
                'whatsapp': '+216 55 905 236',
                'whatsapp_url': 'https://wa.me/21655905236',
                'linkedin': 'Adem Youssfi',
                'linkedin_url': 'https://www.linkedin.com/in/adem-youssfi-2289672a4',
                'github': 'Ad2m1109',
                'github_url': 'https://github.com/Ad2m1109'
            },
            'stats': {
                'projects_completed': '25+',
                'technologies_mastered': '20+',
                'years_coding': '3+',
                'github_repos': '30+'
            }
        }

# Get portfolio data
portfolio_data = PortfolioData.get_portfolio_data()

# Routes
@app.route('/')
def index():
    return render_template('index.html', data=portfolio_data)

@app.route('/api/projects')
def api_projects():
    """API endpoint for projects"""
    return jsonify(portfolio_data['projects'])

@app.route('/api/certifications')
def api_certifications():
    """API endpoint for certifications"""
    return jsonify(portfolio_data['certifications'])

@app.route('/api/skills')
def api_skills():
    """API endpoint for skills"""
    return jsonify(portfolio_data['skills'])

@app.route('/api/stats')
def api_stats():
    """API endpoint for statistics"""
    return jsonify(portfolio_data['stats'])

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        # Basic validation
        if not all([name, email, message]):
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        # Here you would typically send an email or store in database
        # For now, just log the message
        logging.info(f"Contact form submission from {name} ({email}): {message}")
        
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    
    except Exception as e:
        logging.error(f"Contact form error: {e}")
        return jsonify({'success': False, 'message': 'An error occurred'}), 500

@app.route('/manifest.json')
def manifest():
    """PWA manifest"""
    return jsonify({
        "name": "Adem Youssfi Portfolio",
        "short_name": "AY Portfolio",
        "description": "Portfolio of Adem Youssfi - Computer Science Student",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#2563eb",
        "icons": [
            {
                "src": "/static/images/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/static/images/icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    })

@app.errorhandler(404)
def not_found(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def server_error(error):
    return render_template('errors/500.html'), 500

if __name__ == "__main__":
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    
    # Run app
    app.run(
        host='0.0.0.0', 
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )