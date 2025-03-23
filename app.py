from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Flask app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key-for-development')
app.config['ENV'] = os.getenv('FLASK_ENV', 'production')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

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
    'certifications': [
        {
            'title': 'Introduction to Object-Oriented Programming in Java',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'java',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/e4db24cdddcc7eb5afc2351da2c3b9ff7090e1cf'
        },
        {
            'title': 'Joining Data in SQL',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'sql',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/5309400ca72303cc846f6ce1ddf38655561b58ba'
        },
        {
            'title': 'Introduction to Python for Developers',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/912cb7765a217684a87614e284869cba36275942'
        },
        {
            'title': 'Intermediate Python for Developers',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/52e07da6b033518bedff66b9df578a61ce81498e'
        },
        {
            'title': 'Python Toolbox',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/f0920f3b9312b10ebc36f3282db44e2fe754d417'
        },
        {
            'title': 'Data Types in Python',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/5f95c1e5561cd9afee42d95d28db7261f6c6ebd1'
        },
        {
            'title': 'Introduction to Git',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'git',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/8dbfbfe3ac3b21ecd4f85af6e8d560001eaff248'
        },
        {
            'title': 'Intermediate Git',
            'issuer': 'DataCamp',
            'date': '2025',
            'category': 'git',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/f471424fc4cceff203826cab1ea99aa925bebdd5'
        },
        {
            'title': 'Introduction to Python',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/17a94a6f2a5c6ec86f8852b79c714a95257d0571'
        },
        {
            'title': 'Intermediate Python',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/28892bf27a945373e9e2b5a7533019a3bdfcdc38'
        },
        {
            'title': 'Introduction to ChatGPT',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'data-science',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/1238c95c6ce759dde766f57874f0712808ee592a'
        },
        {
            'title': 'Introduction to Functions in Python',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'python',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/a4528ab3ccacb24c5b138c8ab048986e7dc31806'
        },
        {
            'title': 'Introduction to SQL',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'data-science',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/6ffac1e115a755021c76f852b85f10800c8d49b2'
        },
        {
            'title': 'Introduction to Java',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'java',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/4b8c4f460543891649d33b0fe9f8dda8b1705cc3'
        },
        {
            'title': 'Data Manipulation with pandas',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'data-science',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/eed7528091732eaff72b336931b32ede72b3f27a'
        },
        {
            'title': 'Understanding Artificial Intelligence',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'data-science',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/a7016982d79e08dae62b028d6a397f50257da316'
        },
        {
            'title': 'Intermediate SQL',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'data-science',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/1ab3a5ae428978755dfb7eb081de7b789e34dccd'
        },
        {
            'title': 'Understanding Data Science',
            'issuer': 'DataCamp',
            'date': '2024',
            'category': 'data-science',
            'url': 'https://www.datacamp.com/completed/statement-of-accomplishment/course/860d909cd0a4c7b35ce037f3ba1b1350d8a77cfc'
        }
    ],
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