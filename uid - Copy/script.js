document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Basic validation
        if (username === '') {
            alert('Please enter your username');
            return;
        }
        
        if (password === '') {
            alert('Please enter your password');
            return;
        }
        
        // Simulate login process
        if (username === 'admin' && password === '1234') {
            

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

});

function forgotPassword() {
    const email = prompt('Please enter your email address to reset your password:');
    if (email) {
        // In a real app, you would send a reset link to this email
        alert(`Password reset link has been sent to ${email}. Please check your inbox.`);
    }
}

function loginWithGoogle() {
    alert('Google login functionality will be implemented soon!');
}

function loginWithFacebook() {
    alert('Facebook login functionality will be implemented soon!');
}
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            this.setAttribute('aria-expanded', mainNav.classList.contains('show'));
        });
    }

    // Hero Slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slideshow-dots');
        const prevBtn = document.querySelector('.slide-nav.prev');
        const nextBtn = document.querySelector('.slide-nav.next');
        let currentIndex = 0;
        let slideInterval;

        // Create dots for slideshow
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slideshow-dots button');
        updateSlides();

        // Auto-rotate slides
        function startSlideShow() {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlides();
            }, 5000);
        }
        startSlideShow();

        // Pause on hover
        slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshowContainer.addEventListener('mouseleave', startSlideShow);

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
            resetInterval();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
            resetInterval();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlides();
                resetInterval();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlides();
                resetInterval();
            }
        });

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
                slide.setAttribute('aria-hidden', index !== currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startSlideShow();
        }
    }

    // AI Travel Suggestions
    const refreshSuggestionBtn = document.getElementById('refreshSuggestion');
    if (refreshSuggestionBtn) {
        const suggestions = [
            "Looking for adventure? Try trekking in the Himalayas with our guided tours!",
            "Interested in wildlife? Visit Ranthambore National Park for tiger sightings!",
            "Food lover? Explore our culinary tours in Delhi, Mumbai, and Kolkata!",
            "Seeking spirituality? Consider a yoga retreat in Rishikesh or Varanasi!",
            "Beach vacation? Discover the pristine beaches of Andaman and Nicobar Islands!",
            "Cultural enthusiast? Explore the temples of Tamil Nadu and Karnataka!"
        ];

        refreshSuggestionBtn.addEventListener('click', function() {
            const suggestionText = document.getElementById('aiSuggestionText');
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            suggestionText.textContent = suggestions[randomIndex];
            
            // Add animation
            suggestionText.style.animation = 'none';
            void suggestionText.offsetWidth; // Trigger reflow
            suggestionText.style.animation = 'fadeIn 0.5s ease-in-out';
        });
    }

    // Destination Card Hover Effects
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('focus', () => card.classList.add('hover'));
        card.addEventListener('blur', () => card.classList.remove('hover'));
        
        // Make entire card clickable
        const link = card.querySelector('.card-link');
        card.addEventListener('click', (e) => {
            if (e.target !== link) {
                link.click();
            }
        });
    });


    // Add animation when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.welcome-section, .featured-destinations, .travel-blog');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animations
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.welcome-section, .featured-destinations, .travel-blog');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);
});

// Add CSS animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('.video-player');
    const playBtn = container.querySelector('.play-btn');
    const progress = container.querySelector('.progress');
    const timeDisplay = container.querySelector('.time-display');
    const fullscreenBtn = container.querySelector('.fullscreen-btn');
  
    // Format time as MM:SS
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
  
    // Play/Pause
    playBtn.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });
  
    // Update interface
    video.addEventListener('play', () => playBtn.textContent = '❚❚');
    video.addEventListener('pause', () => playBtn.textContent = '▶');
    
    // Time updates
    video.addEventListener('timeupdate', () => {
      progress.value = (video.currentTime / video.duration) * 100;
      timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    });
  
    // Seek video
    progress.addEventListener('input', () => {
      video.currentTime = (progress.value / 100) * video.duration;
    });
  
    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(console.log);
      } else {
        document.exitFullscreen();
      }
    });
  });


