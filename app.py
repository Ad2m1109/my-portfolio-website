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
        CACHE_DEFAULT_TIMEOUT=300
    )
    
    # Extensions
    Compress(app)  # Enable gzip compression
    Cache(app)     # Enable caching
    
    # Security headers (disable HTTPS forcing for development)
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
    def load_certifications():
        try:
            certifications = []
            csv_path = os.path.join('data', 'certifications.csv')
            if os.path.exists(csv_path):
                with open(csv_path, mode='r', encoding='utf-8') as file:
                    return list(csv.DictReader(file))
            else:
                # Fallback data if CSV doesn't exist
                return [
                    {
                        'title': 'Python Programming',
                        'issuer': 'Codecademy',
                        'date': '2024',
                        'category': 'python',
                        'url': '#'
                    },
                    {
                        'title': 'Machine Learning Basics',
                        'issuer': 'Coursera',
                        'date': '2024',
                        'category': 'data-science',
                        'url': '#'
                    },
                    {
                        'title': 'Java Programming',
                        'issuer': 'Oracle',
                        'date': '2023',
                        'category': 'java',
                        'url': '#'
                    },
                    {
                        'title': 'Git Version Control',
                        'issuer': 'GitHub',
                        'date': '2023',
                        'category': 'git',
                        'url': '#'
                    },
                    {
                        'title': 'SQL Database Management',
                        'issuer': 'MySQL',
                        'date': '2023',
                        'category': 'sql',
                        'url': '#'
                    }
                ]
        except Exception as e:
            logging.error(f"Error loading certifications: {e}")
            return []
    
    @classmethod
    def get_portfolio_data(cls):
        return {
            'name': 'Adem Youssfi',
            'title': 'Computer Science Student | Machine Learning Enthusiast | Web & Mobile Developer',
            'bio': "I'm a passionate second-year Bachelor's student in Computer Science with a strong foundation in Python, Java, SQL, machine learning, and web/mobile development. Currently focusing on building innovative solutions and exploring new technologies.",
            'about': "I'm a highly motivated and skilled second-year Bachelor's student in Computer Science with experience in building end-to-end projects, leading teams, and solving complex problems. I'm passionate about leveraging technology to create innovative solutions that make a difference.",
            'experience': [
                {
                    'title': 'Machine Learning Development',
                    'description': 'Building predictive models using scikit-learn and TensorFlow'
                },
                {
                    'title': 'Full Stack Development',
                    'description': 'Creating responsive web applications with Flask backend and modern frontend technologies'
                },
                {
                    'title': 'Mobile App Development',
                    'description': 'Developing Android and cross-platform Flutter applications'
                },
                {
                    'title': 'Team Leadership',
                    'description': 'Leading project conception, coding, and delivery with effective collaboration'
                }
            ],
            'education': {
                'degree': "Bachelor's Degree in Computer Science",
                'level': 'Second Year Student',
                'courses': 'Relevant coursework: Python, Java, SQL, Machine Learning, Web Development, Mobile Development'
            },
            'skills': {
                'programming': ['Python', 'Java', 'SQL', 'C', 'JavaScript', 'Dart', 'HTML/CSS'],
                'frameworks': ['Flask', 'scikit-learn', 'TensorFlow', 'Flutter', 'Android SDK', 'Git/GitHub', 'RESTful APIs'],
                'databases': ['MySQL', 'PostgreSQL', 'JSON', 'Prompt Engineering', 'Android Studio', 'Adobe Photoshop', 'Adobe Premiere Pro'],
                'soft_skills': ['Team Leadership', 'Problem-solving', 'Communication', 'Project Management', 'Adaptability']
            },
            'projects': [
                {
                    'title': 'Harmonia - Alzheimer\'s Support App',
                    'description': 'A privacy-first Flutter app designed to help Alzheimer\'s patients maintain independence with smart reminders, family profiles, and emergency features.',
                    'tech_stack': ['Flutter', 'Dart', 'Mobile'],
                    'category': 'mobile',
                    'github_url': 'https://github.com/Ad2m1109/Harmonia',
                    'demo_url': 'https://websites-hub.onrender.com/Harmonia'
                },
                {
                    'title': 'YouTube MP3/MP4 Converter',
                    'description': 'Convert YouTube videos to MP3 and MP4 formats easily with a user-friendly web interface.',
                    'tech_stack': ['Web', 'Audio/Video', 'Converter'],
                    'category': 'web',
                    'github_url': 'https://github.com/Ad2m1109/YouTube-MP3-MP4-Converter',
                    'demo_url': 'https://websites-hub.onrender.com/MP3-MP4-Converter'
                },
                {
                    'title': 'California Housing Price Predictor',
                    'description': 'Predict housing prices using machine learning algorithms and data analysis.',
                    'tech_stack': ['Python', 'scikit-learn', 'Machine Learning'],
                    'category': 'machine-learning',
                    'github_url': 'https://github.com/Ad2m1109/Machine-Lerning',
                    'demo_url': 'https://websites-hub.onrender.com/California-Housing-Price'
                },
                {
                    'title': 'Food Chatbot with Gemini API',
                    'description': 'Developed a food-focused chatbot integrated with the Gemini API, fine-tuned responses using prompt engineering and improved user interaction.',
                    'tech_stack': ['Python', 'AI', 'API Integration'],
                    'category': 'ai',
                    'github_url': 'https://github.com/Ad2m1109/Food-Chatbot',
                    'demo_url': 'https://ad2m1109.github.io/Food-Chatbot/'
                },
                {
                    'title': 'Portfolio Website',
                    'description': 'This very website! A modern portfolio built with Flask and Bootstrap, featuring responsive design, interactive elements, and project filtering functionality.',
                    'tech_stack': ['Python', 'Flask', 'Bootstrap', 'JavaScript', 'HTML5/CSS3'],
                    'category': 'web',
                    'github_url': 'https://github.com/Ad2m1109/my-portfolio-website',
                    'demo_url': '#',
                    'is_current': True
                }
            ],
            'certifications': cls.load_certifications(),
            'contact': {
                'email': 'ademyoussfi57@gmail.com',
                'whatsapp': '+216 55 905 236',
                'whatsapp_url': 'https://wa.me/21655905236',
                'linkedin': 'Adem Youssfi',
                'linkedin_url': 'https://www.linkedin.com/in/adem-youssfi-2289672a4',
                'github': 'Ad2m1109',
                'github_url': 'https://github.com/Ad2m1109'
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

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def server_error(error):
    return render_template('errors/500.html'), 500

@app.route('/blog')
def blog():
    articles = [
        {'title': 'Building an Alzheimer\'s Support App with Flutter', 
         'url': '#', 'date': '2024-01-15'},
        {'title': 'Machine Learning for Housing Price Prediction',
         'url': '#', 'date': '2023-11-20'}
    ]
    return render_template('blog.html', articles=articles)

if __name__ == "__main__":
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    
    # Run app
    app.run(
        host='0.0.0.0', 
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )