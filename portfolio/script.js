const textElement = document.getElementById("typing-text");
const words = ["Aryan", "a DSA Enthusiast", "a Backend Developer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let speed = isDeleting ? 100 : 200;
    if (!isDeleting && charIndex === currentWord.length) { 
        isDeleting = true; 
        speed = 2000; 
    } else if (isDeleting && charIndex === 0) { 
        isDeleting = false; 
        wordIndex = (wordIndex + 1) % words.length; 
        speed = 500; 
    }
    setTimeout(type, speed);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.filter = "blur(0px)";
            entry.target.style.transform = "translateY(0)";
        } else {
            entry.target.style.opacity = "0";
            entry.target.style.filter = "blur(15px)";
            entry.target.style.transform = "translateY(50px)";
        }
    });
}, { threshold: 0.1 });

window.addEventListener('DOMContentLoaded', () => {
    type();
    document.querySelectorAll('.about-row, .skill-card-flat, .contact-section').forEach(el => {
        el.style.transition = "all 1.0s ease";
        observer.observe(el);
    });
});