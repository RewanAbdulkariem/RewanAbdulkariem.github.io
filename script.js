// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function () {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            const mobileMenu = document.getElementById('mobile-menu');
            if(mobileMenu && !mobileMenu.classList.contains('hidden')){
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
// Active Navigation Link
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = 'home';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="#${currentSection}"]`)?.classList.add('active');
}
// Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}
// Back to Top Button
function toggleBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if(backToTop){
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

// Event Listeners
window.addEventListener('scroll', function () {
    updateActiveLink();
    updateScrollProgress();
    toggleBackToTop();
});

const backToTopButton = document.getElementById('back-to-top');
if(backToTopButton){
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// EmailJS Configuration
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("Kz_tOnL1-kItGfyW6"); // You'll need to replace this with your actual EmailJS public key
    
    // Contact Form Handler
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Send email using EmailJS
        emailjs.send('service_0en78uq', 'template_i5e8yvc', formData)
            .then(function(response) {
                // Success
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'linear-gradient(90deg, #10B981, #059669)'; // Green gradient
                document.getElementById('contact-form').reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, function(error) {
                // Error
                submitButton.textContent = 'Error - Try Again';
                submitButton.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)'; // Red gradient
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
                
                // Show error message
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                console.error('EmailJS Error:', error);
            });
    });
    
    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
})();

// Initialize
window.addEventListener('load', function () {
    updateActiveLink();
    updateScrollProgress();
});