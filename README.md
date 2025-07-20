# 🚀 Adem Youssfi - Portfolio Website

This is the repository for my personal portfolio website. It's a modern, responsive, and feature-rich web application built with Flask and a variety of other web technologies. The portfolio showcases my skills, projects, and certifications, and provides an easy way for visitors to get in touch with me.

## ✨ Features

*   **Modern UI/UX**: A clean and professional design with a focus on user experience.
*   **Responsive Design**: Optimized for a seamless experience across all devices and screen sizes.
*   **Dark/Light Mode**: A theme toggle allows users to switch between light and dark modes.
*   **Interactive Project Showcase**: Projects are displayed in a horizontal scrolling layout with hover effects and filtering by category.
*   **Dynamic Content**: Project and certification data is loaded from CSV files, making it easy to update.
*   **PWA Ready**: Includes a service worker and manifest for Progressive Web App capabilities.
*   **Performance Optimized**: Utilizes caching and compression for fast load times.
*   **Secure**: Implements security headers and best practices to protect against common vulnerabilities.

## 🛠️ Technology Stack

### Backend
*   **Flask**: A lightweight and flexible Python web framework.
*   **Jinja2**: A modern and designer-friendly templating engine for Python.

### Frontend
*   **HTML5 & CSS3**: The latest standards for web development.
*   **Vanilla JavaScript**: For interactive and dynamic functionality.
*   **Bootstrap 5**: A popular CSS framework for building responsive and mobile-first websites.
*   **Font Awesome**: A comprehensive icon library.

### Data
*   **CSV**: Project and certification data is stored in simple and easy-to-edit CSV files.

## 🚀 Getting Started

### Prerequisites
*   Python 3.8+
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ad2m1109/my-portfolio-website.git
    cd my-portfolio-website
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # On Windows
    python -m venv venv
    venv\Scripts\activate

    # On macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the application:**
    ```bash
    python app.py
    ```

5.  Open your browser and navigate to `http://127.0.0.1:5000`.

## 📁 Project Structure

```
.
├── .gitignore
├── app.py
├── Procfile
├── README.md
├── render.yaml
├── requirements.txt
├── wsgi.py
├── data
│   ├── certifications.csv
│   └── projects.csv
├── static
│   ├── app.js
│   ├── style.css
│   ├── sw.js
│   └── images
│       ├── icon.png
│       └── projects
├── templates
│   ├── index.html
│   └── errors
│       ├── 404.html
│       └── 500.html
└── venv
```

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
