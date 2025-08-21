// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling with service type detection
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    const serviceType = document.getElementById('serviceType').value;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Processing...';
    submitButton.disabled = true;
    
    // Simulate booking/quote process
    setTimeout(() => {
        let message = '';
        if (serviceType === 'table') {
            message = 'Thank you! Your table booking request has been received. We will confirm your reservation within 2 hours.';
        } else {
            message = 'Thank you! Your pop-up service inquiry has been received. Our team will contact you within 24 hours with a detailed quote and availability.';
        }
        
        alert(message);
        this.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Track inquiries (for CV metrics)
        trackInquiry(serviceType);
    }, 2000);
});

// Track different types of inquiries
function trackInquiry(serviceType) {
    console.log(`${serviceType} inquiry tracked - contributing to business metrics`);
    // In real implementation, this would track:
    // - Table bookings vs pop-up service inquiries
    // - Conversion rates for different services
    // - Revenue attribution from website
}

// Dynamic form behavior based on service type
document.getElementById('serviceType').addEventListener('change', function() {
    const timeField = document.getElementById('time');
    const guestsField = document.getElementById('guests');
    const messageField = document.getElementById('message');
    
    if (this.value === 'table') {
        timeField.required = true;
        guestsField.max = 12;
        messageField.placeholder = "Any dietary requirements or special occasions?";
    } else if (this.value !== '') {
        timeField.required = false;
        guestsField.max = 500;
        messageField.placeholder = "Please describe your event: location, duration, budget range, specific requirements, etc.";
    }
});

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
        navLinks.style.display = 'flex';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
}

// Set minimum date to today for booking form
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Initialize mobile menu accessibility
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
});

// Form validation
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const errorElement = document.getElementById(field.id + '-error');
        
        if (!field.value.trim()) {
            field.style.borderLeft = '4px solid #e74c3c';
            if (errorElement) {
                errorElement.textContent = `${field.labels[0].textContent} is required`;
                errorElement.style.display = 'block';
            }
            isValid = false;
        } else {
            field.style.borderLeft = '4px solid #27ae60';
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const errorElement = document.getElementById('email-error');
            if (this.value && !validateEmail(this.value)) {
                this.style.borderLeft = '4px solid #e74c3c';
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.style.display = 'block';
                }
            } else if (this.value) {
                this.style.borderLeft = '4px solid #27ae60';
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            const errorElement = document.getElementById('phone-error');
            if (this.value && !validatePhone(this.value)) {
                this.style.borderLeft = '4px solid #e74c3c';
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid phone number';
                    errorElement.style.display = 'block';
                }
            } else if (this.value) {
                this.style.borderLeft = '4px solid #27ae60';
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    }
});

// Track metrics for CV purposes
function trackBookingAttempt() {
    // In a real implementation, this would send analytics data
    console.log('Table booking tracked - contributing to 30% customer inquiries metric');
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 5000);
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu-category, .about-text, .contact-info, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    }
});

// Service type specific form updates
function updateFormForService(serviceType) {
    const timeField = document.getElementById('time');
    const guestsField = document.getElementById('guests');
    const messageField = document.getElementById('message');
    const submitButton = document.querySelector('#bookingForm button[type="submit"]');
    
    switch(serviceType) {
        case 'table':
            timeField.required = true;
            guestsField.max = 12;
            guestsField.value = Math.min(guestsField.value || 2, 12);
            messageField.placeholder = "Any dietary requirements or special occasions?";
            submitButton.textContent = "Book Table";
            break;
        case 'catering':
        case 'coffee-bar':
        case 'popup':
        case 'corporate':
            timeField.required = false;
            guestsField.max = 500;
            messageField.placeholder = "Please describe your event: location, duration, budget range, specific requirements, etc.";
            submitButton.textContent = "Request Quote";
            break;
        default:
            timeField.required = false;
            guestsField.max = 500;
            messageField.placeholder = "Please provide details about your requirements";
            submitButton.textContent = "Submit Request";
    }
}

// Enhanced form submission with better UX
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const serviceTypeSelect = document.getElementById('serviceType');
    
    // Update form when service type changes
    serviceTypeSelect.addEventListener('change', function() {
        updateFormForService(this.value);
    });
    
    // Enhanced form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showToast('Please fill in all required fields correctly', 'error');
            return;
        }
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Processing...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const serviceType = formData.get('serviceType');
            let message = '';
            
            if (service