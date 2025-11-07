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

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // =========================================================
    // 2. Lógica de Virar o Card da Galeria (FINAL CORRIGIDA)
    // =========================================================
    const flipCardsInner = document.querySelectorAll('.flip-card-inner');
    const isDesktop = window.matchMedia("(min-width: 769px)");

    flipCardsInner.forEach(cardInner => {
        
        // Funções nomeadas para que possam ser adicionadas e removidas
        const handleMouseEnter = () => cardInner.classList.add('flipped');
        const handleMouseLeave = () => setTimeout(() => cardInner.classList.remove('flipped'), 300);
        const handleClick = () => cardInner.classList.toggle('flipped');

        const toggleFlipEvents = (mediaQuery) => {
            const flipCardParent = cardInner.closest('.flip-card'); 

            // Limpa todos os listeners existentes
            cardInner.removeEventListener('click', handleClick);
            flipCardParent.removeEventListener('mouseenter', handleMouseEnter);
            flipCardParent.removeEventListener('mouseleave', handleMouseLeave);

            if (mediaQuery.matches) {
                // MODO DESKTOP: HOVER (usando JS e CSS)
                
                // Anexa o HOVER
                flipCardParent.addEventListener('mouseenter', handleMouseEnter);
                flipCardParent.addEventListener('mouseleave', handleMouseLeave);
                
            } else {
                // MODO MOBILE: APENAS CLICK
                
                // Anexa o CLICK
                cardInner.addEventListener('click', handleClick);
            }
        };

        // Roda a verificação inicial
        toggleFlipEvents(isDesktop);
        
        // Anexa um listener para reconfigurar os eventos se a tela mudar de tamanho
        isDesktop.addListener(toggleFlipEvents); 
    });


    // 3. Animações de Entrada (Sem Alterações)
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