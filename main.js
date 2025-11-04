particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#6C63FF" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#6C63FF",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
        },
        retina_detect: true,
      });

      window.addEventListener("scroll", function () {
        const header = document.getElementById("header");
        header.classList.toggle("scrolled", window.scrollY > 50);
      });

      const menuToggle = document.querySelector(".menu-toggle");
      const navLinks = document.querySelector(".nav-links");

      menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", function () {
          navLinks.classList.remove("active");
        });
      });

      const skillBars = document.querySelectorAll(".skill-progress");

      function animateSkillBars() {
        skillBars.forEach((skillBar) => {
          const level = skillBar.getAttribute("data-width");
          skillBar.style.width = level + "%";
        });
      }

      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top <=
            (window.innerHeight || document.documentElement.clientHeight) *
              0.8 && rect.bottom >= 0
        );
      }

      function checkScroll() {
        skillBars.forEach((skillBar) => {
          if (isElementInViewport(skillBar) && skillBar.style.width === "0px") {
            animateSkillBars();
          }
        });
      }

      window.addEventListener("scroll", checkScroll);
      window.addEventListener("load", checkScroll);

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
          }
        });
      });

      
// معالجة نموذج التواصل
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // عرض رسالة التحميل
    formMessage.textContent = "جاري إرسال رسالتك...";
    formMessage.className = "form-message sending";
    formMessage.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

    try {
        const formData = new FormData(contactForm);
        
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.textContent = "شكراً لك! تم إرسال رسالتك بنجاح. سأتصل بك قريباً.";
            formMessage.className = "form-message success";
            contactForm.reset();
        } else {
            throw new Error('فشل في الإرسال');
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر البريد الإلكتروني مباشرة.";
        formMessage.className = "form-message error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
        
        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => {
            formMessage.style.display = "none";
        }, 5000);
    }
});

// إظهار رسالة النجاح إذا كان هناك معامل success في الرابط
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        formMessage.textContent = "شكراً لك! تم إرسال رسالتك بنجاح. سأتصل بك قريباً.";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";
        
        setTimeout(() => {
            formMessage.style.display = "none";
        }, 5000);
    }
});