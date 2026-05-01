// Modern PlantAI JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }

    // Initialize all components
    initNavbar();
    initFileUpload();
    initBackToTop();
    initStatCounters();
    initSmoothScrolling();
    initFormValidation();
    initAlerts();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// File upload functionality
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const uploadForm = document.getElementById('uploadForm');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    if (!uploadArea || !fileInput) return;

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect();
        }
    });

    // File input change
    fileInput.addEventListener('change', handleFileSelect);

    // Form submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            if (!fileInput.files[0]) {
                e.preventDefault();
                showAlert('Please select an image file first.', 'error');
                return;
            }
            
            showProgress();
        });
    }

    function handleFileSelect() {
        const file = fileInput.files[0];
        
        if (!file) return;

        // Validate file type
        if (!file.type.match('image.*')) {
            showAlert('Please select a valid image file.', 'error');
            fileInput.value = '';
            return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            showAlert('File size should be less than 10MB.', 'error');
            fileInput.value = '';
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            if (previewImg && imagePreview) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
                
                // Add fade-in animation
                imagePreview.classList.add('fade-in');
            }
            
            if (analyzeBtn) {
                analyzeBtn.disabled = false;
                analyzeBtn.classList.add('pulse');
            }
        };
        reader.readAsDataURL(file);
    }

    function showProgress() {
        if (progressContainer && progressBar) {
            progressContainer.style.display = 'block';
            
            let width = 0;
            const interval = setInterval(() => {
                width += Math.random() * 15;
                if (width >= 90) {
                    clearInterval(interval);
                    width = 90;
                }
                progressBar.style.width = width + '%';
            }, 200);
        }
        
        if (analyzeBtn) {
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...';
            analyzeBtn.disabled = true;
        }
    }
}

// Clear image function
function clearImage() {
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (fileInput) fileInput.value = '';
    if (imagePreview) imagePreview.style.display = 'none';
    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.classList.remove('pulse');
    }
}

// Sample image loading
function loadSampleImage(imageSrc, imageName) {
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (previewImg && imagePreview) {
        previewImg.src = imageSrc;
        previewImg.alt = imageName;
        imagePreview.style.display = 'block';
        imagePreview.classList.add('fade-in');
    }
    
    if (analyzeBtn) {
        analyzeBtn.disabled = false;
        analyzeBtn.classList.add('pulse');
    }
    
    // Create a virtual file for the form
    fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], imageName + '.jpg', { type: 'image/jpeg' });
            const dt = new DataTransfer();
            dt.items.add(file);
            document.getElementById('fileInput').files = dt.files;
        });
        
    // Scroll to upload area
    document.getElementById('detect').scrollIntoView({ behavior: 'smooth' });
}

// Back to top functionality
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
}

// Animated counters for statistics
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;

        statNumbers.forEach(function(statNumber) {
            const target = parseInt(statNumber.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    statNumber.textContent = target;
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Trigger animation when stats section is in view
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    });

    statNumbers.forEach(function(statNumber) {
        observer.observe(statNumber);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showAlert('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Alert system
function initAlerts() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.opacity = '0';
            setTimeout(function() {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }, 5000);
    });
}

// Show custom alerts
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'error' : 'success'} alert-modern position-fixed top-0 start-50 translate-middle-x mt-5`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        alertDiv.style.opacity = '0';
        setTimeout(function() {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, 5000);
}

// Loading spinner functions
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'block';
    }
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Utility function for mobile detection
function isMobile() {
    return window.innerWidth <= 768;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close modals or clear image
    if (e.key === 'Escape') {
        clearImage();
    }
    
    // Enter key on upload area to trigger file input
    if (e.key === 'Enter' && e.target.id === 'uploadArea') {
        document.getElementById('fileInput').click();
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// Error handling for network issues
window.addEventListener('online', function() {
    showAlert('Connection restored!', 'success');
});

window.addEventListener('offline', function() {
    showAlert('Connection lost. Please check your internet connection.', 'error');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-out;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .floating-icon {
        position: absolute;
        font-size: 2rem;
        opacity: 0.1;
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .sample-card {
        cursor: pointer;
        transition: var(--transition);
        padding: 0.5rem;
        border-radius: var(--border-radius);
    }
    
    .sample-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow);
    }
    
    .sample-label {
        font-size: 0.8rem;
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0;
        font-weight: 500;
    }
    
    .feature-icon-small {
        width: 40px;
        height: 40px;
        background: linear-gradient(45deg, var(--primary-green), var(--secondary-green));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
    }
    
    .about-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .stat-card {
        text-align: center;
        padding: 2rem 1rem;
    }
    
    .stat-icon {
        font-size: 3rem;
        color: var(--primary-green);
        margin-bottom: 1rem;
    }
    
    .stat-number {
        font-size: 3rem;
        font-weight: 700;
        color: var(--text-dark);
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        color: var(--text-light);
        font-weight: 500;
        margin: 0;
    }
    
    .social-link {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 50%;
        text-decoration: none;
        line-height: 40px;
        text-align: center;
        transition: var(--transition);
    }
    
    .social-link:hover {
        background: var(--primary-green);
        transform: translateY(-2px);
        color: white;
    }
    
    .navbar-modern.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .touch-device .feature-card:hover,
    .touch-device .about-card:hover {
        transform: none;
    }
`;
document.head.appendChild(style);