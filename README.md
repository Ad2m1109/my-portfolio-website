# 🚀 Adem Youssfi - Portfolio Website

A modern, responsive portfolio website built with Flask, Bootstrap, and enhanced with cutting-edge web technologies. This portfolio showcases skills, projects, certifications, and provides multiple ways to get in touch.

## ✨ Features

### 🎨 Modern Design
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Interactive Animations**: Smooth scroll animations and hover effects
- **Modern UI/UX**: Clean, professional design with glassmorphism elements

### 🔧 Technical Features
- **Progressive Web App (PWA)**: Installable, works offline
- **Performance Optimized**: Fast loading with lazy loading and caching
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Security**: CSP headers, CSRF protection, and secure configurations

### 📱 Functionality
- **Project Filtering**: Filter projects by category with smooth animations
- **Contact Form**: Working contact form with validation and error handling
- **Certification Display**: Dynamic certification showcase with filtering
- **Search Functionality**: Search through projects and technologies
- **Analytics Integration**: Google Analytics support
- **Error Handling**: Custom 404 and 500 error pages

## 🛠️ Technology Stack

### Backend
- **Flask** - Python web framework
- **Jinja2** - Template engine
- **Flask-Talisman** - Security headers
- **Flask-Compress** - Gzip compression
- **Flask-Caching** - Response caching

### Frontend
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Inter Font** - Typography
- **Vanilla JavaScript** - Interactive functionality
- **CSS Grid & Flexbox** - Layout systems

### DevOps & Deployment
- **Gunicorn** - WSGI server
- **Docker** - Containerization support
- **Heroku** - Cloud deployment ready
- **Service Worker** - PWA functionality

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ installed
- Git installed
- A modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ad2m1109/my-portfolio-website.git
   cd my-portfolio-website
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Basic Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
PORT=5000

# Email Configuration (for contact form)
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Security
WTF_CSRF_ENABLED=true
```

### Customization

#### Personal Information
Update the portfolio data in `app.py`:

```python
portfolio_data = {
    'name': 'Your Name',
    'title': 'Your Title',
    'bio': 'Your bio here...',
    # ... rest of your information
}
```

#### Styling
Modify CSS variables in `static/style.css`:

```css
:root {
    --primary-color: #2563eb;    /* Your brand color */
    --secondary-color: #3b82f6;  /* Secondary color */
    --accent-color: #1e40af;     /* Accent color */
}
```

#### Projects
Add your projects to the projects array in `app.py` or create a database integration.

#### Certifications
Update `data/certifications.csv` with your certifications:

```csv
title,issuer,date,category,url
Your Certification,Issuer Name,2024,category,https://cert-url
```

## 📁 Project Structure

```
portfolio/
├── app.py                  # Main Flask application
├── config.py              # Configuration settings
├── requirements.txt        # Python dependencies
├── README.md              # This file
├── .env.example           # Environment variables template
├── data/
│   └── certifications.csv # Certifications data
├── static/
│   ├── style.css          # Main stylesheet
│   ├── main.js           # Main JavaScript
│   ├── projects.js       # Project filtering logic
│   ├── sw.js            # Service worker
│   └── images/          # Images and icons
├── templates/
│   ├── index.html        # Main template
│   └── errors/
│       ├── 404.html      # 404 error page
│       └── 500.html      # 500 error page
└── uploads/              # File uploads (if enabled)
```

## 🔧 Advanced Features

### PWA Support
The portfolio is a Progressive Web App with:
- Offline functionality
- Install prompts
- Background sync for contact forms
- Push notifications (optional)

### Performance Optimization
- **Lazy Loading**: Images and content load as needed
- **Caching**: Aggressive caching strategies
- **Compression**: Gzip compression enabled
- **Minification**: CSS and JS are optimized

### Security Features
- **Content Security Policy**: Prevents XSS attacks
- **CSRF Protection**: Form security
- **Security Headers**: Various security headers
- **Input Validation**: Server-side validation

### SEO Optimization
- **Meta Tags**: Comprehensive meta information
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Auto-generated sitemap
- **Open Graph**: Social media sharing optimization

## 🚀 Deployment

### Heroku Deployment

1. **Create a Heroku app**
   ```bash
   heroku create your-portfolio-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set FLASK_ENV=production
   heroku config:set SECRET_KEY=your-production-secret-key
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t portfolio .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 portfolio
   ```

### Traditional Hosting

1. **Upload files** to your server
2. **Install dependencies** on the server
3. **Configure web server** (Apache/Nginx)
4. **Set up WSGI** (mod_wsgi/gunicorn)

## 🔍 API Endpoints

The portfolio includes several API endpoints:

- `GET /api/projects` - Get all projects
- `GET /api/certifications` - Get all certifications
- `GET /api/skills` - Get skills data
- `POST /contact` - Submit contact form
- `GET /manifest.json` - PWA manifest

## 🧪 Testing

Run the test suite:

```bash
# Install test dependencies
pip install pytest pytest-flask coverage

# Run tests
pytest

# Run with coverage
coverage run -m pytest
coverage report
```

## 📊 Analytics

The portfolio supports Google Analytics 4:

1. Get your GA4 measurement ID
2. Add it to your `.env` file
3. Analytics will automatically track:
   - Page views
   - Project clicks
   - Filter usage
   - Contact form submissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in .env file or run with different port
python app.py --port 8000
```

**CSS not loading:**
- Check static file paths
- Verify Flask static folder configuration
- Clear browser cache

**Contact form not working:**
- Verify email configuration in `.env`
- Check firewall settings
- Ensure SMTP credentials are correct

**PWA not installing:**
- Check HTTPS (required for PWA)
- Verify manifest.json
- Check service worker registration

### Performance Issues

- Enable caching in production
- Use a CDN for static assets
- Optimize images
- Enable compression

## 📞 Support

If you need help or have questions:

- 📧 Email: ademyoussfi57@gmail.com
- 💼 LinkedIn: [Adem Youssfi](https://www.linkedin.com/in/adem-youssfi-2289672a4)
- 🐱 GitHub: [Ad2m1109](https://github.com/Ad2m1109)

## 🙏 Acknowledgments

- Flask documentation and community
- Bootstrap team for the amazing framework
- Font Awesome for the beautiful icons
- All the open-source contributors

---

**Made with ❤️ by Adem Youssfi**

*This portfolio is constantly evolving. Check back for updates and new features!*