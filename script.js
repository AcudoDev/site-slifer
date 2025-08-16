// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize particle effects
    createParticleEffect();
    
    // Add glitch effect to title on hover
    initTitleEffects();
    
    // Initialize responsive handlers
    initResponsiveHandlers();
});

// ===== MODAL FUNCTIONS =====

function openModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'all 0.3s ease';
        }, 10);
    }
}

function closeModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset form
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
            }
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        const modalId = e.target.id.replace('modal-', '');
        closeModal(modalId);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            const modalId = activeModal.id.replace('modal-', '');
            closeModal(modalId);
        }
    }
});

// ===== FORM SUBMISSION =====

function submitForm(event, type) {
    event.preventDefault();
    
    const form = event.target;
    
    // Collect form data with proper field names
    const formElements = form.elements;
    const data = {};
    
    // Get all form inputs with proper handling
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type !== 'submit' && element.name !== '') {
            data[element.name] = element.value;
        } else if (element.type !== 'submit' && element.placeholder) {
            // Use placeholder as fallback identifier
            const fieldName = element.placeholder.toLowerCase().replace(/[^a-z]/g, '_');
            data[fieldName] = element.value;
        }
    }
    
    // Determine email destination
    const emailDestination = type === 'solutions' ? 'solutions@slifer.fr' : 'holdings@slifer.fr';
    
    // Add metadata
    data.destination_email = emailDestination;
    data.form_type = type;
    data.timestamp = new Date().toISOString();
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Envoi en cours...</span>';
    submitBtn.disabled = true;
    
    // Log form data for debugging (remove in production)
    console.log('Form submission data:', data);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification(`Message envoyé avec succès !`, 'success');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        form.reset();
        
        // Close modal
        closeModal(type);
        
        // In real implementation, you would send the data to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     if (result.success) {
        //         showNotification('Message envoyé avec succès !', 'success');
        //     } else {
        //         showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     showNotification('Erreur de connexion. Veuillez réessayer.', 'error');
        // });
        
    }, 2000);
}

// ===== NOTIFICATION SYSTEM =====

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    // Style based on type
    if (type === 'success') {
        notification.classList.add('bg-green-600', 'border-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-600', 'border-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-600', 'border-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ===== VISUAL EFFECTS =====

function createParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.6';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            color: Math.random() > 0.5 ? '#00ffff' : '#22d3ee'
        };
    }
    
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.opacity *= 0.995;
            
            if (particle.y < -10 || particle.opacity < 0.01) {
                particles.splice(i, 1);
            }
        }
        
        // Add new particles
        if (Math.random() < 0.3) {
            particles.push(createParticle());
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

function initTitleEffects() {
    const title = document.querySelector('header h1');
    const underline = title ? title.querySelector('.w-16') : null;
    
    if (title && underline) {
        title.addEventListener('mouseenter', () => {
            // Subtle color change
            title.style.color = '#f8fafc';
            title.style.transition = 'color 0.3s ease';
            
            // Animate underline
            underline.style.animation = 'subtle-glow 2s ease-in-out infinite alternate';
        });
        
        title.addEventListener('mouseleave', () => {
            // Return to original color
            title.style.color = '#ffffff';
            
            // Stop underline animation
            setTimeout(() => {
                underline.style.animation = 'none';
            }, 2000);
        });
    }
}

// ===== RESPONSIVE HANDLERS =====

function initResponsiveHandlers() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Refresh AOS on resize
            AOS.refresh();
        }, 250);
    });
}

// ===== SCROLL EFFECTS =====

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for background elements
    const stars = document.querySelector('.stars');
    const grid = document.querySelector('.moving-grid');
    
    if (stars) {
        stars.style.transform = `translateY(${rate}px)`;
    }
    
    if (grid) {
        grid.style.transform = `translateY(${rate * 0.5}px)`;
    }
});

// ===== MOUSE TRACKING EFFECTS =====

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle parallax effect on cards
    const cards = document.querySelectorAll('.futuristic-card');
    cards.forEach((card, index) => {
        const moveX = (mouseX - 0.5) * 10 * (index % 2 === 0 ? 1 : -1);
        const moveY = (mouseY - 0.5) * 10 * (index % 2 === 0 ? 1 : -1);
        
        card.style.transform = `perspective(1000px) rotateX(${moveY * 0.1}deg) rotateY(${moveX * 0.1}deg) translateZ(0)`;
    });
});

// ===== PERFORMANCE OPTIMIZATION =====

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ACCESSIBILITY =====

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal && e.key === 'Tab') {
        const focusableElements = activeModal.querySelectorAll(
            'input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ===== LOADING STATE =====

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animations
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, index * 100);
    });
});