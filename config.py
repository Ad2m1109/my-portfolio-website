import os
from datetime import timedelta

class Config:
    """Base configuration class."""
    
    # Basic Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Security Configuration
    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = 3600  # 1 hour
    SESSION_COOKIE_SECURE = os.environ.get('FLASK_ENV') == 'production'
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1)
    
    # File Upload Configuration
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx'}
    
    # Cache Configuration
    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 300  # 5 minutes
    
    # Rate Limiting
    RATELIMIT_STORAGE_URL = 'memory://'
    RATELIMIT_DEFAULT = '100 per hour'
    
    # Email Configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
    
    # API Configuration
    JSONIFY_PRETTYPRINT_REGULAR = True
    JSON_SORT_KEYS = False
    
    # Portfolio Specific Configuration
    PORTFOLIO_VERSION = '1.0.0'
    PORTFOLIO_AUTHOR = 'Adem Youssfi'
    PORTFOLIO_TITLE = 'Adem Youssfi - Computer Science Student & Developer'
    PORTFOLIO_DESCRIPTION = 'Portfolio of Adem Youssfi, Computer Science student specializing in Machine Learning, Web Development, and Mobile Apps.'
    PORTFOLIO_URL = os.environ.get('PORTFOLIO_URL') or 'https://localhost:5000'
    
    # Social Media Links
    GITHUB_URL = 'https://github.com/Ad2m1109'
    LINKEDIN_URL = 'https://www.linkedin.com/in/adem-youssfi-2289672a4'
    CONTACT_EMAIL = 'ademyoussfi57@gmail.com'
    WHATSAPP_NUMBER = '+216 55 905 236'
    
    # Analytics Configuration
    GOOGLE_ANALYTICS_ID = os.environ.get('GOOGLE_ANALYTICS_ID')
    GOOGLE_TAG_MANAGER_ID = os.environ.get('GOOGLE_TAG_MANAGER_ID')
    
    # Monitoring Configuration
    SENTRY_DSN = os.environ.get('SENTRY_DSN')
    
    # Database Configuration (if needed)
    DATABASE_URL = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_timeout': 20,
        'pool_recycle': -1,
        'pool_pre_ping': True
    }
    
    # Redis Configuration (if using)
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
    
    # Content Security Policy
    CSP_DIRECTIVES = {
        'default-src': "'self'",
        'script-src': [
            "'self'",
            "'unsafe-inline'",
            'https://cdn.jsdelivr.net',
            'https://cdnjs.cloudflare.com',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com'
        ],
        'style-src': [
            "'self'",
            "'unsafe-inline'",
            'https://cdn.jsdelivr.net',
            'https://cdnjs.cloudflare.com',
            'https://fonts.googleapis.com'
        ],
        'font-src': [
            "'self'",
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ],
        'img-src': [
            "'self'",
            'data:',
            'https:',
            'blob:'
        ],
        'connect-src': [
            "'self'",
            'https://www.google-analytics.com'
        ],
        'media-src': "'self'",
        'object-src': "'none'",
        'frame-ancestors': "'none'",
        'form-action': "'self'",
        'base-uri': "'self'"
    }

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    ENV = 'development'
    
    # Less strict security for development
    SESSION_COOKIE_SECURE = False
    WTF_CSRF_ENABLED = False  # Disable CSRF for easier testing
    
    # Development cache
    CACHE_TYPE = 'simple'
    
    # Development database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'sqlite:///portfolio_dev.db'
    
    # Disable some security headers for development
    FORCE_HTTPS = False

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    ENV = 'production'
    
    # Strict security for production
    SESSION_COOKIE_SECURE = True
    WTF_CSRF_ENABLED = True
    FORCE_HTTPS = True
    
    # Production cache (use Redis in production)
    CACHE_TYPE = 'redis' if os.environ.get('REDIS_URL') else 'simple'
    CACHE_REDIS_URL = os.environ.get('REDIS_URL')
    
    # Production database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///portfolio.db'
    
    # Logging
    LOG_LEVEL = 'INFO'
    
    # Performance
    SEND_FILE_MAX_AGE_DEFAULT = timedelta(days=365)  # Cache static files for 1 year

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True
    
    # Disable CSRF for testing
    WTF_CSRF_ENABLED = False
    
    # In-memory database for testing
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    
    # Disable rate limiting for testing
    RATELIMIT_ENABLED = False
    
    # Fast cache for testing
    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 1

class HerokuConfig(ProductionConfig):
    """Heroku-specific production configuration."""
    
    @classmethod
    def init_app(cls, app):
        ProductionConfig.init_app(app)
        
        # Handle proxy server headers
        from werkzeug.middleware.proxy_fix import ProxyFix
        app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
        
        # Log to stderr
        import logging
        from logging import StreamHandler
        file_handler = StreamHandler()
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

class DockerConfig(ProductionConfig):
    """Docker-specific configuration."""
    
    @classmethod
    def init_app(cls, app):
        ProductionConfig.init_app(app)
        
        # Container-specific configurations
        pass

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'heroku': HerokuConfig,
    'docker': DockerConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Get configuration based on environment."""
    return config[os.getenv('FLASK_CONFIG', 'default')]