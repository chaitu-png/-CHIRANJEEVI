// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .project-card, .contact-item, .about-text');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Create mailto link as fallback
        const mailtoLink = `mailto:chiruammulu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        setTimeout(() => {
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            showNotification('Thank you! Your email client should open with your message.', 'success');
        }, 1000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05)';
            tag.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });
});

// Project cards tilt effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Loading animation for images (if any are added later)
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
        
        if (img.complete) {
            img.classList.remove('loading');
        } else {
            img.classList.add('loading');
        }
    });
}

// Enhanced 3D Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Random 3D positioning
        particle.style.transform = `translateZ(${Math.random() * 200 - 100}px)`;
        
        particlesContainer.appendChild(particle);
    }
}

// 3D Background Mouse Interaction
function init3DBackgroundInteraction() {
    const animatedBg = document.querySelector('.animated-bg');
    const hero = document.querySelector('.hero');
    
    if (!animatedBg || !hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        animatedBg.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        animatedBg.style.transform = 'perspective(2000px) rotateX(0deg) rotateY(0deg)';
    });
}

// 3D Shape Interactions
function init3DShapeInteractions() {
    const shapes = document.querySelectorAll('.shape');
    const cubes = document.querySelectorAll('.cube');
    const rings = document.querySelectorAll('.ring');
    
    // Add click interactions to shapes
    shapes.forEach((shape, index) => {
        shape.addEventListener('click', () => {
            shape.style.animationPlayState = 'paused';
            shape.style.transform = 'scale(1.5) rotate(360deg)';
            shape.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                shape.style.animationPlayState = 'running';
                shape.style.transform = '';
                shape.style.transition = '';
            }, 1000);
        });
    });
    
    // Add hover effects to cubes
    cubes.forEach(cube => {
        cube.addEventListener('mouseenter', () => {
            cube.style.animationPlayState = 'paused';
            cube.style.transform = 'scale(1.2) rotateX(45deg) rotateY(45deg)';
            cube.style.transition = 'all 0.3s ease-out';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.animationPlayState = 'running';
            cube.style.transform = '';
            cube.style.transition = '';
        });
    });
    
    // Add click effects to rings
    rings.forEach(ring => {
        ring.addEventListener('click', () => {
            ring.style.animationDuration = '2s';
            ring.style.filter = 'brightness(1.5)';
            
            setTimeout(() => {
                ring.style.animationDuration = '15s';
                ring.style.filter = '';
            }, 2000);
        });
    });
}

// Dynamic 3D Lighting Effects
function init3DLightingEffects() {
    const rays = document.querySelectorAll('.ray');
    const gridLines = document.querySelectorAll('.grid-line');
    
    // Add dynamic lighting to rays
    setInterval(() => {
        rays.forEach(ray => {
            const randomIntensity = Math.random() * 0.5 + 0.3;
            ray.style.filter = `brightness(${randomIntensity})`;
        });
    }, 2000);
    
    // Add pulsing effect to grid lines
    setInterval(() => {
        gridLines.forEach((line, index) => {
            const randomOpacity = Math.random() * 0.3 + 0.1;
            line.style.opacity = randomOpacity;
        });
    }, 1500);
}

// Enhanced 3D Mouse Effects
function init3DEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
}

// Enhanced Project Card 3D Effects
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Floating Animation for Shapes
function animateShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for multiple elements
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                // Add staggered animation for education timeline items
                if (entry.target.classList.contains('education-timeline') || entry.target.closest('.education-timeline')) {
                    const timelineItems = document.querySelectorAll('.education .timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 300);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .project-card, .contact-item, .about-text, .skills-category, .education-timeline');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Education Timeline Animations
function initEducationAnimations() {
    const educationItems = document.querySelectorAll('.education .timeline-item');
    
    // Set initial state for education items
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add hover effects for education cards
    educationItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');
        
        if (content && marker) {
            item.addEventListener('mouseenter', () => {
                marker.style.transform = 'scale(1.2)';
                marker.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
            });
            
            item.addEventListener('mouseleave', () => {
                marker.style.transform = 'scale(1)';
                marker.style.boxShadow = '0 0 0 4px #e5e7eb, 0 4px 20px rgba(102, 126, 234, 0.3)';
            });
        }
    });
}

// Enhanced Education Timeline Effects
function enhanceEducationTimeline() {
    const educationTimeline = document.querySelector('.education-timeline');
    if (!educationTimeline) return;
    
    // Add progress animation to timeline
    const timelineLine = educationTimeline.querySelector('::before');
    
    // Animate timeline line on scroll
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animated line effect
                educationTimeline.style.setProperty('--timeline-progress', '100%');
            }
        });
    }, { threshold: 0.5 });
    
    timelineObserver.observe(educationTimeline);
}

// Technical Expertise Animations
function initTechExpertiseAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    // Add staggered animation for tech items
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.8) rotateX(45deg)';
        item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        item.style.transitionDelay = `${index * 0.1}s`;
        
        // Animate in after a delay
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        }, 1500 + (index * 100));
    });
    
    // Add enhanced 3D mouse effects
    techItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `translateY(-12px) translateZ(30px) scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    // Add click animations with 3D effects
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'translateY(-15px) translateZ(40px) scale(1.15) rotateX(10deg) rotateY(10deg)';
            item.style.transition = 'all 0.2s ease-out';
            
            setTimeout(() => {
                item.style.transform = 'translateY(-12px) translateZ(30px) scale(1.08) rotateX(5deg) rotateY(5deg)';
                item.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, 200);
        });
    });
    
    // Add enhanced floating animation with 3D rotation
    techItems.forEach((item, index) => {
        setInterval(() => {
            const randomY = (Math.random() - 0.5) * 8;
            const randomX = (Math.random() - 0.5) * 4;
            const randomRotate = (Math.random() - 0.5) * 2;
            
            if (!item.matches(':hover')) {
                item.style.transform = `translateY(${randomY}px) translateX(${randomX}px) rotateZ(${randomRotate}deg)`;
            }
        }, 4000 + index * 600);
    });
    
    // Add special effects for each icon type
    const iconTypes = ['vlsi', 'iot', 'automation', 'embedded', 'circuit', 'plc'];
    
    techItems.forEach((item, index) => {
        const icon = item.querySelector('.tech-icon');
        
        // Add special hover effects based on icon type
        item.addEventListener('mouseenter', () => {
            switch(iconTypes[index]) {
                case 'vlsi':
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.8))';
                    break;
                case 'iot':
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))';
                    break;
                case 'automation':
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.8))';
                    break;
                case 'embedded':
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))';
                    break;
                case 'circuit':
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))';
                    break;
                case 'plc':
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))';
                    break;
            }
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.filter = 'none';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.add('loading'));
    
    // Initialize new features
    createParticles();
    init3DEffects();
    init3DBackgroundInteraction();
    init3DShapeInteractions();
    init3DLightingEffects();
    enhanceProjectCards();
    animateShapes();
    initScrollAnimations();
    initEducationAnimations();
    enhanceEducationTimeline();
    initTechExpertiseAnimations();
});

// Console welcome message
console.log(`
🚀 Welcome to Chiranjeevi Srinivas Bandaru's Portfolio!
📧 Contact: chiruammulu@gmail.com
📱 Phone: +91 9848844843
🔗 LinkedIn: https://www.linkedin.com/in/chiranjeevi-srinivas-b-363b732b4/
📸 Instagram: https://www.instagram.com/chiranjeevisrinivas_985
`);
