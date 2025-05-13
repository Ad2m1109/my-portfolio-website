from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
import csv
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Flask app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key-for-development')
app.config['ENV'] = os.getenv('FLASK_ENV', 'production')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

def load_certifications():
    certifications = []
    csv_path = os.path.join(os.path.dirname(__file__), 'data', 'certifications.csv')
    
    with open(csv_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        certifications = list(csv_reader)
    
    return certifications

# Portfolio data updated to match the HTML content
portfolio_data = {
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
        'programming': ['Python (Advanced)', 'Java (Advanced)', 'SQL (Advanced)', 'C (Intermediate)', 'JavaScript (Intermediate)', 'Dart (Intermediate)', 'HTML/CSS'],
        'frameworks': ['Flask', 'scikit-learn', 'TensorFlow', 'Flutter', 'Android SDK', 'Git/GitHub', 'RESTful APIs'],
        'databases': ['MySQL', 'PostgreSQL', 'JSON', 'Prompt Engineering', 'Android Studio', 'Adobe Photoshop', 'Adobe After Effects'],
        'soft_skills': ['Team Leadership', 'Problem-solving', 'Communication', 'Project Management', 'Adaptability']
    },
    'projects': [
        {
            'title': 'House Price Prediction',
            'description': 'A machine learning model using scikit-learn to predict house prices in California with data preprocessing, feature engineering, and model evaluation.',
            'tech_stack': ['Python', 'scikit-learn', 'Data Analysis'],
            'github_url': 'https://github.com/Ad2m1109',
        },
        {
            'title': 'Chatbot with Gemini API',
            'description': 'Developed a chatbot integrated with the Gemini API, fine-tuned responses using prompt engineering and improved user interaction.',
            'tech_stack': ['Python', 'AI', 'API Integration'],
            'github_url': 'https://github.com/Ad2m1109',
        },
        {
            'title': 'Mobile App Development',
            'description': 'Created Android apps using Java and XML, and cross-platform apps with Flutter and Dart, backed by Flask and SQL databases.',
            'tech_stack': ['Android', 'Flutter', 'Java', 'Dart'],
            'github_url': 'https://github.com/Ad2m1109',
        },
        {
            'title': 'Portfolio Website',
            'description': 'A modern portfolio website built with Flask and Bootstrap, featuring responsive design and interactive elements.',
            'tech_stack': ['Python', 'Flask', 'Bootstrap', 'JavaScript'],
            'github_url': 'https://github.com/Ad2m1109/my-portfolio-website',
        }
    ],
    'certifications': load_certifications(),
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

@app.route('/')
def index():
    return render_template('index.html', data=portfolio_data)

@app.route('/healthz')
def healthcheck():
    return jsonify({"status": "healthy"}), 200

@app.route('/contact', methods=['POST'])
def contact():
    # Here you can add logic to handle contact form submissions
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)