// GLIMMER Photo Album Tutorial - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive features
    initProgressBar();
    initScrollAnimations();
    initStepInteractions();
    initSmoothScrolling();
    
    console.log('¡Tutorial GLIMMER cargado exitosamente!');
    
    /**
     * Progress Bar - Shows reading progress
     */
    function initProgressBar() {
        const progressBar = document.getElementById('progressBar');
        
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            progressBar.style.width = Math.min(progress, 100) + '%';
        });
    }
    
    /**
     * Scroll Animations - Fade in elements as they come into view
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.step-card, .intro-card, .tip-card');
        
        // Add fade-in class to all animated elements
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    /**
     * Step Interactions - Enhanced interactivity for tutorial steps
     */
    function initStepInteractions() {
        const stepCards = document.querySelectorAll('.step-card');
        
        stepCards.forEach((card, index) => {
            // Add click interaction for mobile users
            card.addEventListener('click', function() {
                const content = card.querySelector('.step-content');
                const isExpanded = card.classList.contains('expanded');
                
                // Remove expanded class from all cards
                stepCards.forEach(otherCard => {
                    otherCard.classList.remove('expanded');
                });
                
                // Toggle expanded state for clicked card
                if (!isExpanded) {
                    card.classList.add('expanded');
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
            
            // Add hover effects for desktop
            card.addEventListener('mouseenter', function() {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add completion tracking
            const checkboxes = card.querySelectorAll('.materials-list i, .instruction-list li');
            checkboxes.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleStepCompletion(item, card);
                });
            });
        });
    }
    
    /**
     * Toggle step completion state
     */
    function toggleStepCompletion(item, card) {
        const isCompleted = item.classList.contains('completed');
        
        if (isCompleted) {
            item.classList.remove('completed');
            item.style.color = '';
            item.style.textDecoration = '';
        } else {
            item.classList.add('completed');
            item.style.color = '#28a745';
            item.style.textDecoration = 'line-through';
        }
        
        // Check if all items in the step are completed
        checkStepCompletion(card);
    }
    
    /**
     * Check if entire step is completed
     */
    function checkStepCompletion(card) {
        const allItems = card.querySelectorAll('.materials-list i, .instruction-list li');
        const completedItems = card.querySelectorAll('.completed');
        
        if (allItems.length > 0 && completedItems.length === allItems.length) {
            card.classList.add('step-completed');
            const stepHeader = card.querySelector('.step-header');
            if (!stepHeader.querySelector('.completion-badge')) {
                const badge = document.createElement('div');
                badge.className = 'completion-badge';
                badge.innerHTML = '<i class="fas fa-check-circle"></i>';
                badge.style.color = '#28a745';
                badge.style.fontSize = '1.5rem';
                badge.style.marginLeft = 'auto';
                stepHeader.appendChild(badge);
            }
        } else {
            card.classList.remove('step-completed');
            const badge = card.querySelector('.completion-badge');
            if (badge) {
                badge.remove();
            }
        }
        
        // Update overall progress
        updateOverallProgress();
    }
    
    /**
     * Update overall tutorial progress
     */
    function updateOverallProgress() {
        const totalSteps = document.querySelectorAll('.step-card').length;
        const completedSteps = document.querySelectorAll('.step-completed').length;
        const progressPercentage = (completedSteps / totalSteps) * 100;
        
        // Update progress in localStorage for persistence
        localStorage.setItem('glimmerProgress', progressPercentage.toString());
        
        // Show completion message if all steps are done
        if (completedSteps === totalSteps) {
            showCompletionMessage();
        }
    }
    
    /**
     * Show completion congratulations message
     */
    function showCompletionMessage() {
        if (document.querySelector('.completion-message')) return;
        
        const completionMessage = document.createElement('div');
        completionMessage.className = 'completion-message';
        completionMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, var(--light-blue), var(--butter-yellow));
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1001;
                max-width: 400px;
                width: 90%;
            ">
                <i class="fas fa-trophy" style="font-size: 3rem; margin-bottom: 1rem; color: gold;"></i>
                <h3 style="margin-bottom: 1rem;">¡Felicitaciones!</h3>
                <p style="margin-bottom: 1.5rem;">¡Has completado todos los pasos! Tu hermoso álbum de fotos te espera.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: white;
                    color: var(--dark-gray);
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                ">¡Sigue Creando!</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
            " onclick="this.parentElement.remove()"></div>
        `;
        
        document.body.appendChild(completionMessage);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (completionMessage && completionMessage.parentElement) {
                completionMessage.remove();
            }
        }, 5000);
    }
    
    /**
     * Smooth scrolling for internal links
     */
    function initSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Create a "back to top" button
        const backToTopButton = document.createElement('button');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--light-blue), var(--butter-yellow));
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 999;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(backToTopButton);
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'translateY(0)';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.transform = 'translateY(20px)';
            }
        });
        
        // Back to top functionality
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /**
     * Load saved progress from localStorage
     */
    function loadSavedProgress() {
        const savedProgress = localStorage.getItem('glimmerProgress');
        if (savedProgress) {
            console.log(`Progreso guardado cargado: ${savedProgress}%`);
        }
    }
    
    /**
     * Add keyboard navigation support
     */
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            const stepCards = document.querySelectorAll('.step-card');
            const currentStep = document.querySelector('.step-card:focus');
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                
                if (!currentStep) {
                    stepCards[0].focus();
                    return;
                }
                
                const currentIndex = Array.from(stepCards).indexOf(currentStep);
                let nextIndex;
                
                if (e.key === 'ArrowDown') {
                    nextIndex = (currentIndex + 1) % stepCards.length;
                } else {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : stepCards.length - 1;
                }
                
                stepCards[nextIndex].focus();
                stepCards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Make step cards focusable
        document.querySelectorAll('.step-card').forEach(card => {
            card.setAttribute('tabindex', '0');
        });
    }
    
    /**
     * Add print functionality
     */
    function initPrintFeature() {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '<i class="fas fa-print"></i> Imprimir Guía';
        printButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            padding: 0.75rem 1rem;
            background: var(--white);
            color: var(--dark-gray);
            border: 2px solid var(--light-blue);
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 999;
            font-weight: bold;
            transition: all 0.3s ease;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        printButton.addEventListener('mouseenter', function() {
            this.style.background = 'var(--light-blue)';
            this.style.color = 'white';
        });
        
        printButton.addEventListener('mouseleave', function() {
            this.style.background = 'var(--white)';
            this.style.color = 'var(--dark-gray)';
        });
        
        document.body.appendChild(printButton);
    }
    
    // Initialize additional features
    loadSavedProgress();
    initKeyboardNavigation();
    initPrintFeature();
    
    // Add CSS for step completion animations
    const style = document.createElement('style');
    style.textContent = `
        .step-completed {
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            border-left-color: #28a745 !important;
        }
        
        .completion-badge {
            animation: bounceIn 0.5s ease;
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .step-card:focus {
            outline: 3px solid var(--butter-yellow);
            outline-offset: 2px;
        }
        
        @media (max-width: 768px) {
            .back-to-top, .print-button {
                bottom: 1rem;
            }
            
            .print-button {
                left: 1rem;
                padding: 0.5rem;
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add some fun easter eggs and special interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Add sparkle effect on title hover
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('mouseenter', function() {
            createSparkleEffect(this);
        });
    }
    
    function createSparkleEffect(element) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.cssText = `
                    position: absolute;
                    pointer-events: none;
                    font-size: 1rem;
                    z-index: 1000;
                    animation: sparkle 1.5s ease-out forwards;
                `;
                
                const rect = element.getBoundingClientRect();
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1500);
            }, i * 100);
        }
    }
    
    // Add CSS for sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(0); 
            }
            50% { 
                opacity: 1; 
                transform: translateY(-20px) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-40px) scale(0.5); 
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
});
