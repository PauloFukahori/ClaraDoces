document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica do Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // 2. Lógica de Virar o Card da Galeria
    const flipCards = document.querySelectorAll('.flip-card-inner');

    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        if (window.innerWidth > 768) {
            card.parentElement.addEventListener('mouseenter', () => {
                card.classList.add('flipped');
            });
            card.parentElement.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, 300);
            });
        }
    });

    // 3. Animações de Entrada
    const animateElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.classList.contains('section-title') ? 'animate__fadeInUp' :
                                       element.classList.contains('plan-card') ? 'animate__fadeInUp' :
                                       element.classList.contains('product-card') ? 'animate__fadeInUp' :
                                       element.classList.contains('flip-card') ? 'animate__fadeInUp' :
                                       'animate__fadeIn';

                const dataAnimate = element.getAttribute('data-animate');
                const delay = dataAnimate ? (parseInt(dataAnimate) * 100) + 'ms' : '0ms';

                element.style.animationDelay = delay;
                element.classList.add(animationClass);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.2 });

    animateElements.forEach(el => {
        if (!el.parentElement.classList.contains('hero')) {
            observer.observe(el);
        }
    });

    // 4. Efeito de toque nos cards (mobile)
    const allCards = document.querySelectorAll('.plan-card, .product-card, .flip-card');

    allCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('hovered');
        });
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('hovered');
            }, 500);
        });
    });
});
