# Adem Youssfi - Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and certifications as a Computer Science student specializing in AI/ML and Full-Stack Development.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Project Showcase**: 25+ projects with filtering by category (AI, Machine Learning, Mobile, Web)
- **Interactive UI**: Smooth animations and transitions
- **Performance Optimized**: Gzip compression, caching, and lazy loading
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **PWA Ready**: Progressive Web App with offline support
- **Security**: CSP headers, HTTPS support, and input validation

## 📊 Portfolio Highlights

- **25+ Projects**: Across AI/ML, Web, Mobile, and Desktop platforms
- **20+ Technologies**: Python, Java, C++, Flutter, Flask, TensorFlow, YOLOv8, and more
- **3+ Years**: Hands-on coding experience
- **30+ GitHub Repos**: Active open-source contributions

## 🛠️ Tech Stack

### Backend
- **Flask**: Python web framework
- **Flask-Compress**: Gzip compression
- **Flask-Talisman**: Security headers
- **Flask-Caching**: Response caching

### Frontend
- **Bootstrap 5**: Responsive UI framework
- **JavaScript**: Interactive features
- **Font Awesome**: Icons
- **CSS3**: Custom animations and styling

### Data Management
- **CSV**: Project and certification data storage
- **JSON**: API responses and configuration

## 📂 Project Structure

```
portfolio-website/
│
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (not in repo)
│
├── templates/
│   ├── index.html         # Main portfolio page
│   └── errors/
│       ├── 404.html       # Not found page
│       └── 500.html       # Server error page
│
├── static/
│   ├── style.css          # Main stylesheet
│   ├── app.js             # JavaScript functionality
│   ├── sw.js              # Service worker
│   └── images/
│       └── projects/      # Project screenshots
│
└── data/
    ├── projects.csv       # Project information
    └── certifications.csv # Certification details
```

## 🎯 Featured Projects

### AI & Computer Vision
- **Football Analytics AI**: C++ tool with TensorRT for player tracking
- **Coach Pro Backend**: YOLOv8-based match analysis
- **Face Detection & Landmark Tracking**: Computer vision tutorial
- **Gemini GUI Agent**: AI automation tool

### Mobile Applications
- **Harmonia**: Alzheimer's support app (Flutter)
- **Mr. Grammar**: AI writing assistant with Gemini API
- **Spendora**: Personal finance tracker
- **Sign Language Platform**: Accessibility communication tool

### Web Development
- **Phone-to-Graphic-Tablet**: Cross-platform drawing solution
- **DragNDropTeX**: No-code LaTeX editor
- **MarketPlace**: E-commerce platform
- **Project Manager**: Full-stack management system

### Machine Learning
- **California Housing Predictor**: Regression model with scikit-learn
- **K-means Visualizer**: Interactive clustering algorithm
- **Huffman Coding**: Text compression implementation

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ad2m1109/my-portfolio-website.git
cd my-portfolio-website
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
PORT=5000
```

5. Run the application:
```bash
python app.py
```

6. Open browser:
```
http://localhost:5000
```

## 📝 Updating Content

### Adding Projects
Edit `data/projects.csv`:
```csv
title,description,tech_stack,category,github_url,demo_url,is_current,image_url
"Project Name","Description","Tech1,Tech2",category,https://github.com/...,#,false,/static/images/projects/image.png
```

**Categories**: `ai`, `machine-learning`, `mobile`, `web`

### Adding Certifications
Edit `data/certifications.csv`:
```csv
title,issuer,date,category,url
"Certification Name","Issuer","Month Year",category,https://...
```

**Categories**: `python`, `java`, `data-science`, `git`, `sql`

### Updating Skills
Edit `app.py` in the `get_portfolio_data()` method under the `skills` dictionary.

### Adding Project Images
1. Create/capture project screenshot
2. Save to: `/static/images/projects/your-project-name.png`
3. Recommended size: 1200x630px
4. Format: PNG or JPG

## 🎨 Customization

### Changing Colors
Edit CSS variables in `static/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    /* Add your custom colors */
}
```

### Modifying Layout
Edit `templates/index.html` sections:
- Hero Section
- About Section
- Skills Section
- Projects Section
- Certifications Section

## 📱 PWA Features

- Offline support via Service Worker
- Add to home screen capability
- Fast loading with caching
- App-like experience

## 🔒 Security Features

- Content Security Policy (CSP)
- HTTPS enforcement (production)
- XSS protection
- CSRF protection
- Secure session cookies
- Input validation

## 📈 Performance Optimizations

- Gzip compression
- Response caching
- Lazy loading images
- Minified assets
- CDN for libraries
- Preconnect hints

## 🚀 Deployment

### Deploying to Production

1. Set environment variables:
```env
FLASK_ENV=production
SECRET_KEY=your-secure-key
```

2. Update security settings in `app.py`
3. Enable HTTPS
4. Configure reverse proxy (nginx/Apache)
5. Set up SSL certificate

### Deployment Platforms
- **Heroku**: Easy deployment with Git
- **DigitalOcean**: VPS with full control
- **AWS**: Elastic Beanstalk or EC2
- **Vercel/Netlify**: For static export

## 📊 Analytics

The site includes Google Analytics integration. Update `GA_MEASUREMENT_ID` in `templates/index.html`.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: ademyoussfi57@gmail.com
- **LinkedIn**: [Adem Youssfi](https://www.linkedin.com/in/adem-youssfi-2289672a4)
- **GitHub**: [@Ad2m1109](https://github.com/Ad2m1109)
- **WhatsApp**: +216 55 905 236

## 🙏 Acknowledgments

- Bootstrap for the responsive framework
- Font Awesome for icons
- Google Fonts for typography
- All open-source libraries used in this project

---

⭐ **Star this repo** if you find it useful!

Built with ❤️ by Adem Youssfi