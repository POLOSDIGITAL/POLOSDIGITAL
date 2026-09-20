

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     1. SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================
     2. NAVBAR SCROLL EFFECT
  ========================================= */

  const navbar = document.querySelector(".navbar");

  if (navbar) {

    const handleNavbarScroll = () => {

      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

    };

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();

  }


  /* =========================================
     3. SCROLL REVEAL ANIMATION
  ========================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .work-card, .process-card, .pricing-card, .about-card, .stat-card"
  );

  if (revealElements.length) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });

  }


  /* =========================================
     4. ACTIVE NAVIGATION LINK
  ========================================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    '.navbar a[href^="#"]'
  );

  if (sections.length && navLinks.length) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navLinks.forEach(link => {
              link.classList.remove("active");
            });

            const activeLink = document.querySelector(
              `.navbar a[href="#${entry.target.id}"]`
            );

            if (activeLink) {
              activeLink.classList.add("active");
            }

          }

        });

      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* =========================================
     5. NUMBER COUNTER ANIMATION
  ========================================= */

  const counters = document.querySelectorAll("[data-count]");

  if (counters.length) {

    const counterObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const counter = entry.target;
          const target = Number(counter.dataset.count);

          if (isNaN(target)) return;

          let current = 0;
          const duration = 1500;
          const increment = target / (duration / 16);

          const updateCounter = () => {

            current += increment;

            if (current >= target) {

              counter.textContent = Math.round(target);

              return;

            }

            counter.textContent = Math.round(current);

            requestAnimationFrame(updateCounter);

          };

          updateCounter();

          counterObserver.unobserve(counter);

        });

      },
      {
        threshold: 0.5
      }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  }


  /* =========================================
     6. SERVICE / PRICING CARD HOVER
  ========================================= */

  const cards = document.querySelectorAll(
    ".service-card, .pricing-card, .work-card"
  );

  cards.forEach(card => {

    card.addEventListener("mousemove", e => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;

      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =========================================
     7. BUTTON CLICK FEEDBACK
  ========================================= */

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 250);

    });

  });


  /* =========================================
     8. WHATSAPP BUTTON
  ========================================= */

  const whatsappButtons = document.querySelectorAll(
    'a[href*="wa.me"]'
  );

  whatsappButtons.forEach(button => {

    button.addEventListener("click", () => {

      console.log("POLOS DIGITAL WhatsApp order initiated.");

    });

  });


  /* =========================================
     9. MARQUEE PAUSE ON HOVER
  ========================================= */

  const marquees = document.querySelectorAll(".marquee");

  marquees.forEach(marquee => {

    marquee.addEventListener("mouseenter", () => {
      marquee.style.animationPlayState = "paused";
    });

    marquee.addEventListener("mouseleave", () => {
      marquee.style.animationPlayState = "running";
    });

  });


  /* =========================================
     10. BACK TO TOP
  ========================================= */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }

    });

    backToTop.addEventListener("click", e => {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =========================================
     11. PARALLAX HERO EFFECT
  ========================================= */

  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual) {

    window.addEventListener("mousemove", e => {

      const x = (window.innerWidth / 2 - e.clientX) / 60;
      const y = (window.innerHeight / 2 - e.clientY) / 60;

      heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;

    });

  }


  /* =========================================
     12. PAGE LOADED
  ========================================= */

  document.body.classList.add("loaded");

});
