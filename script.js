// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        item.classList.toggle('active');
    });
});

// Form Submission - Enviar para WhatsApp
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `Olá! Tenho interesse no curso de Direito.

*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone}
*Mensagem:* ${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappNumber = "5511969449698";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappURL, '_blank');

    this.reset();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '5px 0';
        document.querySelector('.logo').style.maxWidth = '120px';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.padding = '10px 0';
        document.querySelector('.logo').style.maxWidth = '150px';
    }
});

// Scroll Suave Lento (função genérica)
function smoothScrollTo(target, duration = 3000) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
}

// Intercepta todos os cliques em buttons
document.addEventListener('click', function (e) {
    // Só pega <button>
    if (e.target.tagName.toLowerCase() === 'button') {
        const attr = e.target.getAttribute('onclick');
        if (attr && attr.includes('scrollIntoView')) {
            e.preventDefault();

            // Tenta pegar o ID do destino
            const matches = attr.match(/document\.getElementById\(['"]([^'"]+)['"]\)/);
            if (matches && matches[1]) {
                const targetId = matches[1];
                const target = document.getElementById(targetId);
                if (target) {
                    smoothScrollTo(target, 3000); // 3 segundos de duração
                }
            }
        }
    }
});
