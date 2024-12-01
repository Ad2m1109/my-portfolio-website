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

# Sample portfolio data - you can replace this with your own
portfolio_data = {
    'name': 'Adem Youssfi',
    'title': 'Full Stack Developer',
    'about': 'I am a passionate developer with expertise in Python, JavaScript, and web development.',
    'skills': ['Python', 'JavaScript', 'HTML/CSS', 'Flask', 'React', 'SQL'],
    'projects': [
        {
            'name': 'Project 1',
            'description': 'A web application built with Flask and SQLAlchemy',
            'technologies': ['Python', 'Flask', 'SQLAlchemy'],
            'github': 'https://github.com/yourusername/project1'
        },
        {
            'name': 'Project 2',
            'description': 'Interactive dashboard using React and D3.js',
            'technologies': ['React', 'D3.js', 'Node.js'],
            'github': 'https://github.com/yourusername/project2'
        }
    ],
    'contact': {
        'email': 'ademyoussfi57@gmail.com',
        'linkedin': 'https://linkedin.com/in/yourusername',
        'github': 'https://github.com/yourusername'
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

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
