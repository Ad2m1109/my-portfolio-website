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

# Portfolio data
portfolio_data = {
    'name': 'Adem Youssfi',
    'bio': 'Passionate Full Stack Developer | Python Enthusiast | Data Science Explorer',
    'projects': [
        {
            'title': 'Portfolio Website',
            'description': 'Personal portfolio website built with Flask and Bootstrap',
            'tech_stack': ['Python', 'Flask', 'Bootstrap', 'HTML/CSS', 'JavaScript'],
            'github_url': '#'
        }
    ],
    'certifications': [
        {
            'title': 'Your Certification',
            'issuer': 'Certification Provider',
            'date': '2023',
            'description': 'Description of your certification'
        }
    ],
    'contact': {
        'email': 'your.email@example.com',
        'location': 'Your Location'
    },
    'social_links': [
        {'platform': 'github', 'url': 'https://github.com/Ad2m1109'},
        {'platform': 'linkedin', 'url': 'https://linkedin.com/in/adem-youssfi'},
        {'platform': 'twitter', 'url': 'https://twitter.com/yourusername'}
    ],
    'experience': """
        <div class="timeline">
            <div class="timeline-item">
                <h4>Full Stack Developer</h4>
                <p>Freelance | 2023 - Present</p>
                <ul>
                    <li>Developed responsive web applications using Flask and React</li>
                    <li>Implemented data analysis solutions using Python</li>
                </ul>
            </div>
        </div>
    """
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
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
