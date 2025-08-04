document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initCountdownTimer();
  initAnimations();
  initNavbarEffects();
  initSmoothScrolling();
  initMinistrySlider();

  // Countdown Timer
  function initCountdownTimer() {
    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) return;

    // Set target time (next Sunday at 10:00 AM)
    function getNextSunday() {
      const now = new Date();
      const daysUntilSunday = (7 - now.getDay()) % 7;
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(10, 0, 0, 0);
      return nextSunday;
    }

    const targetTime = getNextSunday();

    function updateCountdown() {
      const now = new Date();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const countdownItems =
          countdownElement.querySelectorAll(".countdown-item");
        if (countdownItems.length >= 3) {
          countdownItems[0].textContent = hours.toString().padStart(2, "0");
          countdownItems[1].textContent = minutes.toString().padStart(2, "0");
          countdownItems[2].textContent = seconds.toString().padStart(2, "0");
        }
      } else {
        // Reset to next Sunday
        targetTime.setDate(targetTime.getDate() + 7);
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Animation Effects
  function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((el) => observer.observe(el));

    // Hero section entrance animation
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      setTimeout(() => {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      }, 500);
    }
  }

  // Navbar Effects
  function initNavbarEffects() {
    const navbar = document.querySelector(".navbar");
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove background on scroll
      if (scrollTop > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Hide/show navbar on scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      lastScrollTop = scrollTop;
    });

    // Smooth navbar transitions
    navbar.style.transition = "all 0.3s ease";
  }

  // Smooth Scrolling
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Ministry Slider Initialization
  function initMinistrySlider() {
    const ministrySwiper = new Swiper(".ministry-swiper", {
      // Disable autoplay - we'll handle it manually
      autoplay: false,

      // Enable loop
      loop: true,

      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5.5,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
      },

      // Enable touch/swipe gestures
      allowTouchMove: true,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,

      // Smooth transitions
      effect: "slide",
      speed: 800,

      // Auto height
      autoHeight: false,

      // Enable keyboard navigation
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      // Enable mousewheel control
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
      },

      // Touch settings
      touchEventsTarget: "container",
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,

      // Callbacks for additional animations
      on: {
        init: function () {
          // Add entrance animation to slides
          const slides = this.slides;
          slides.forEach((slide, index) => {
            slide.style.opacity = "0";
            slide.style.transform = "translateY(30px)";
            setTimeout(() => {
              slide.style.transition = "all 0.6s ease";
              slide.style.opacity = "1";
              slide.style.transform = "translateY(0)";
            }, index * 100);
          });
        },
        slideChange: function () {
          // Add animation to active slide
          const activeSlide = this.slides[this.activeIndex];
          if (activeSlide) {
            activeSlide.style.transform = "scale(1.05)";
            setTimeout(() => {
              activeSlide.style.transform = "scale(1)";
            }, 300);
          }
        },
      },
    });

    // Ministry data - can be loaded from API or external file
    const ministryData = [
      {
        id: 1,
        title: "Prayer & Care",
        image: "assets/images/prayer-slide.png",
        description: "Join our prayer and care ministry",
      },
      {
        id: 2,
        title: "Kids",
        image: "assets/images/kids-slide.png",
        description: "Children's ministry and activities",
      },
      {
        id: 3,
        title: "Students",
        image: "assets/images/students-slide.png",
        description: "Youth and student programs",
      },
      {
        id: 4,
        title: "Worship",
        image: "assets/images/worship-slide.png",
        description: "Music and worship ministry",
      },
      {
        id: 5,
        title: "Men",
        image: "assets/images/men-slide.png",
        description: "Men's fellowship and activities",
      },
      {
        id: 6,
        title: "Women",
        image: "assets/images/women-slide.png",
        description: "Women's ministry and events",
      },
      {
        id: 7,
        title: "Small Groups",
        image: "assets/images/small-group-slide.png",
        description: "Connect through small groups",
      },
      {
        id: 8,
        title: "Small",
        image: "assets/images/small-group-slide.png",
        description: "Connect through small groups",
      },
    ];

    // Function to populate slider with data
    function populateSlider() {
      const swiperWrapper = ministrySwiper.el.querySelector(".swiper-wrapper");
      swiperWrapper.innerHTML = "";

      ministryData.forEach((ministry, index) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="ministry-card">
            <div class="ministry-image">
              <img src="${ministry.image}" alt="${ministry.title}" />
            </div>
            <div class="ministry-content">
              <h3 class="ministry-title">
                <span class="title-text mr-2">${ministry.title}</span>
                <img src="assets/images/Vector.png" class="inner-img" alt="Arrow Right" />
              </h3>
            </div>
          </div>
        `;
        swiperWrapper.appendChild(slide);
      });

      // Update Swiper after adding slides
      ministrySwiper.update();
    }

    // Populate slider with data
    populateSlider();

    // Sliding window autoplay - shows 7 slides, moves window by 1
    function startSlidingWindowAutoplay() {
      let currentStartIndex = 0;
      const windowSize = 7; // Number of slides visible at once
      const totalSlides = ministryData.length;

      function nextSlide() {
        // Move the window forward by 1 slide
        currentStartIndex = (currentStartIndex + 1) % totalSlides;

        // Slide to show the new starting position
        // This will show slides from currentStartIndex to currentStartIndex + 6
        ministrySwiper.slideTo(currentStartIndex, 800);
      }

      // Start the sliding window progression
      setInterval(nextSlide, 1000);
    }

    // Start sliding window autoplay after initialization
    setTimeout(startSlidingWindowAutoplay, 2000);

    // Add click handlers to ministry cards
    const ministryCards = document.querySelectorAll(".ministry-card");
    ministryCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Add ripple effect
        const ripple = document.createElement("div");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.6)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s linear";
        ripple.style.left = "50%";
        ripple.style.top = "50%";
        ripple.style.width = "100px";
        ripple.style.height = "100px";
        ripple.style.marginLeft = "-50px";
        ripple.style.marginTop = "-50px";
        ripple.style.pointerEvents = "none";

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
});
