// script.js

// ============================================
// PREMIUM PORTFOLIO WEBSITE - JavaScript File
// ============================================
// This file contains all interactive functionality
// for the premium animated portfolio website.

// Wait for DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. PAGE LOADER ANIMATION
    // ============================================
    const pageLoader = document.querySelector('.page-loader');
    
    // Simulate loading progress
    const loaderProgress = document.querySelector('.loader-progress');
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loader after a short delay
            setTimeout(() => {
                pageLoader.classList.add('fade-out');
                
                // Remove loader from DOM after animation completes
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                    
                    // Start animations after loader is gone
                    initScrollAnimations();
                    animateElementsOnLoad();
                }, 800);
            }, 300);
        }
        
        // Update loader width
        loaderProgress.style.width = `${progress}%`;
    }, 150);
    
    // ============================================
    // 2. CUSTOM CURSOR EFFECT
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Animate cursor outline with smooth follow effect
    function animateCursorOutline() {
        // Calculate distance between dot and outline
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;
        
        // Move outline toward dot with easing
        outlineX += dx * 0.1;
        outlineY += dy * 0.1;
        
        // Update outline position
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        // Continue animation
        requestAnimationFrame(animateCursorOutline);
    }
    
    // Start cursor animation
    animateCursorOutline();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .tool-badge, .tool-item, .highlight-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.width = '16px';
            cursorDot.style.height = '16px';
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'rgba(108, 99, 255, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'rgba(108, 99, 255, 0.5)';
        });
    });
    
    // ============================================
    // 3. NAVIGATION FUNCTIONALITY
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // ============================================
    // 4. SCROLL-BASED ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-header, .about-text, .about-timeline, .skills-category, .project-card, .contact-info, .contact-form');
        
        // Create Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // If it's a skill card, animate the progress bars
                    if (entry.target.classList.contains('skill-card')) {
                        const progressFill = entry.target.querySelector('.progress-fill');
                        const width = progressFill.getAttribute('data-width');
                        setTimeout(() => {
                            progressFill.style.width = `${width}%`;
                        }, 300);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe each animated element
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Animate skill progress bars
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = '0%';
            
            // Animate when in view
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            fill.style.width = `${width}%`;
                        }, 300);
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            skillObserver.observe(fill.closest('.skill-card'));
        });
    }
    
    // ============================================
    // 5. INITIAL LOAD ANIMATIONS
    // ============================================
    function animateElementsOnLoad() {
        // Animate hero section elements sequentially
        const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-profession, .hero-description, .hero-buttons, .hero-scroll');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
        
        // Animate visual card
        const visualCard = document.querySelector('.visual-card');
        setTimeout(() => {
            visualCard.style.opacity = '1';
            visualCard.style.transform = 'translateY(0)';
        }, 1500);
    }
    
    // ============================================
    // 6. PROJECT MODAL FUNCTIONALITY
    // ============================================
    const projectModal = document.querySelector('.project-modal');
    const projectViewButtons = document.querySelectorAll('.project-view');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');
    
    // Project data for modals
    const projectData = [
        {
            title: "Sales Analytics Dashboard",
            description: "Interactive dashboard for tracking sales performance across multiple regions with predictive analytics. This project involved collecting, cleaning, and analyzing sales data from multiple sources to create a comprehensive view of business performance.",
            details: "The dashboard provides real-time insights into sales trends, customer behavior, and product performance. It includes predictive models to forecast future sales and identify potential opportunities for growth. Built with Power BI, SQL, and advanced data modeling techniques.",
            technologies: ["Power BI", "SQL", "Data Modeling", "DAX", "Azure"],
            image: "sales-analytics"
        },
        {
            title: "E-commerce Customer Segmentation",
            description: "Machine learning model to segment customers based on purchasing behavior for targeted marketing. This solution helps e-commerce businesses personalize marketing campaigns and improve customer retention.",
            details: "Using Python and clustering algorithms, this project analyzes customer transaction data to identify distinct segments with similar behaviors. The model helps businesses understand their customer base and create targeted marketing strategies for each segment.",
            technologies: ["Python", "Machine Learning", "Clustering", "Pandas", "Scikit-learn"],
            image: "customer-segmentation"
        },
        {
            title: "Healthcare Data Analysis",
            description: "Analysis of patient data to identify trends and improve healthcare delivery efficiency. This project focuses on optimizing hospital resource allocation and predicting patient admission rates.",
            details: "Through statistical analysis and data visualization in R, this project uncovers patterns in patient admission, treatment outcomes, and resource utilization. The insights help healthcare providers improve patient care while optimizing operational efficiency.",
            technologies: ["R", "Statistics", "Data Visualization", "Healthcare Analytics", "Tableau"],
            image: "healthcare-analysis"
        }
    ];
    
    // Open project modal
    projectViewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const project = projectData[index];
            
            // Create modal content
            modalBody.innerHTML = `
                <h2 class="modal-project-title">${project.title}</h2>
                <p class="modal-project-description">${project.description}</p>
                <div class="modal-project-details">
                    <h3>Project Details</h3>
                    <p>${project.details}</p>
                </div>
                <div class="modal-project-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-project-image">
                    <div class="image-placeholder">
                        <i class="fas fa-${project.image === 'sales-analytics' ? 'chart-network' : project.image === 'customer-segmentation' ? 'shopping-cart' : 'heartbeat'}"></i>
                    </div>
                </div>
            `;
            
            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ============================================
    // 7. CONTACT FORM INTERACTIONS
    // ============================================
    const contactForm = document.getElementById('messageForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = formData.get('name') || 'User';
        
        // Create submit button reference
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (in a real site, this would be an AJAX call)
        setTimeout(() => {
            // Show success message
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = '#2ecc71';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 1500);
    });
    
    // ============================================
    // 8. SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // 9. NAVBAR SCROLL EFFECT
    // ============================================
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid var(--color-border)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
    
    // ============================================
    // 10. UPDATE ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ============================================
    // 11. BUTTON RIPPLE EFFECT
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            // Calculate ripple position
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style ripple
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ============================================
    // 12. BACKGROUND PARTICLE EFFECT
    // ============================================
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        document.body.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(108, 99, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.boxShadow = '0 0 10px rgba(108, 99, 255, 0.5)';
            
            // Add animation
            particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        // Add animation keyframes
        const particleAnimation = document.createElement('style');
        particleAnimation.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20vh) translateX(10vw);
                }
                50% {
                    transform: translateY(-40vh) translateX(20vw);
                }
                75% {
                    transform: translateY(-20vh) translateX(10vw);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        document.head.appendChild(particleAnimation);
    }
    
    // Initialize particles
    createParticles();
    
    // ============================================
    // 13. TEXT ANIMATION FOR HERO SECTION
    // ============================================
    function initTextAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        titleLines.forEach(line => {
            const text = line.textContent;
            line.textContent = '';
            
            // Create span for each character
            for (let i = 0; i < text.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = text[i];
                charSpan.style.display = 'inline-block';
                charSpan.style.opacity = '0';
                charSpan.style.transform = 'translateY(20px)';
                charSpan.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
                line.appendChild(charSpan);
            }
        });
        
        // Animate characters after page load
        setTimeout(() => {
            const charSpans = document.querySelectorAll('.hero-title .title-line span');
            charSpans.forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 1800);
    }
    
    // Initialize text animation
    initTextAnimation();
    
    // ============================================
    // 14. ADDITIONAL MICRO-INTERACTIONS
    // ============================================
    
    // Add hover effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add typing effect to profession text
    function initProfessionTyping() {
        const professionText = document.querySelector('.profession-text');
        const texts = ['BI / DATA ANALYTICS', 'COMPUTING INFORMATION SYSTEM'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                professionText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                professionText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of typing
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                // Move to next text
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeEffect, 500);
            } else {
                // Continue typing/deleting
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeEffect, 2500);
    }
    
    // Initialize typing effect
    initProfessionTyping();
});