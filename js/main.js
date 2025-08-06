document.addEventListener("DOMContentLoaded", function () {
  initCountdownTimer();
  initAnimations();
  initNavbarEffects();
  initSwiper();

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
    const navbarCollapse = document.querySelector(".navbar-collapse");
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

    // Prevent body scroll when navbar is open on mobile
    if (navbarCollapse) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            if (navbarCollapse.classList.contains("show")) {
              document.body.classList.add("navbar-open");
            } else {
              document.body.classList.remove("navbar-open");
            }
          }
        });
      });

      observer.observe(navbarCollapse, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }

  // Swiper Initialization
  function initSwiper() {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });
  }
});
