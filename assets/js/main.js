// main.js — общий скрипт для всех страниц Fazbear

document.addEventListener('DOMContentLoaded', function() {
    // --- Анимация счётчика посетителей ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        let count = Math.floor(Math.random() * 10000) + 5000;
        counters.forEach(counter => counter.textContent = count);
        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            counters.forEach(counter => counter.textContent = count);
        }, 30000);
    }

    // --- Кнопка наверх ---
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.style.display = 'block';
            } else {
                scrollToTopButton.style.display = 'none';
            }
        });
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Стилизация всех img ---
    document.querySelectorAll('img').forEach(img => {
        img.style.borderRadius = '14px';
        img.style.boxShadow = '0 4px 18px rgba(0,0,0,0.13)';
    });

    // --- Бегущая строка ---
    const marquee = document.getElementById('marquee-content');
    if (marquee) {
        let marqueePos = 0;
        let marqueeWidth = marquee.offsetWidth;
        let containerWidth = marquee.parentElement.offsetWidth;
        function animateMarquee() {
            marqueePos += 2;
            if (marqueePos > containerWidth) {
                marquee.style.visibility = 'hidden';
                setTimeout(() => {
                    marqueePos = -marqueeWidth;
                    marquee.style.visibility = 'visible';
                }, 1000);
            }
            marquee.style.transform = `translateX(${marqueePos}px)`;
            requestAnimationFrame(animateMarquee);
        }
        setTimeout(() => {
            marqueeWidth = marquee.offsetWidth;
            containerWidth = marquee.parentElement.offsetWidth;
            animateMarquee();
        }, 200);
    }

    // --- Golden Freddy эффект (главная) ---
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        function showGoldenFreddy() {
            if (Math.random() < 0.01) {
                const originalSrc = mainImage.src;
                mainImage.src = 'assets/images/goldenfreddy.png';
                setTimeout(() => { mainImage.src = originalSrc; }, 1000);
            }
        }
        setInterval(showGoldenFreddy, 30000);
    }

    // --- Случайные страшные звуки ---
    const scarySounds = [
        'assets/audio/laugh.mp3',
        'assets/audio/creak.mp3',
        'assets/audio/footsteps.mp3',
        'assets/audio/whisper.mp3', // добавьте этот файл для пасхалки
    ];
    setInterval(() => {
        if (Math.random() > 0.95) {
            const audio = new Audio(scarySounds[Math.floor(Math.random() * scarySounds.length)]);
            audio.volume = 0.3;
            audio.play().catch(()=>{});
        }
    }, 15000);

    // --- Пасхалка: "1987" на клавиатуре ---
    let code = '';
    document.addEventListener('keydown', e => {
        code += e.key;
        if (code.length > 4) code = code.slice(-4);
        if (code === '1987') {
            const img = document.createElement('img');
            img.src = 'assets/images/goldenfreddy.png';
            img.style.position = 'fixed';
            img.style.left = '50%';
            img.style.top = '50%';
            img.style.transform = 'translate(-50%,-50%) scale(1.5)';
            img.style.zIndex = 9999;
            img.style.boxShadow = '0 0 80px #ffb347';
            document.body.appendChild(img);
            const scream = new Audio('assets/audio/laugh.mp3');
            scream.volume = 0.7;
            scream.play().catch(()=>{});
            setTimeout(()=>{ img.remove(); }, 1800);
        }
    });

    // --- Пасхалка: долго не двигать мышкой ---
    let idleTimer;
    function showShadow() {
        const shadow = document.createElement('div');
        shadow.style.position = 'fixed';
        shadow.style.left = '0';
        shadow.style.top = '0';
        shadow.style.width = '100vw';
        shadow.style.height = '100vh';
        shadow.style.background = 'rgba(0,0,0,0.7) url(assets/images/afton.png) center/contain no-repeat';
        shadow.style.zIndex = 9998;
        shadow.style.opacity = '0';
        shadow.style.transition = 'opacity 0.5s';
        document.body.appendChild(shadow);
        setTimeout(()=>{ shadow.style.opacity = '1'; }, 10);
        setTimeout(()=>{ shadow.style.opacity = '0'; setTimeout(()=>shadow.remove(), 500); }, 2000);
    }
    function resetIdle() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(showShadow, 25000);
    }
    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('keydown', resetIdle);
    resetIdle();

    // --- Пасхалка: ночной режим после 21:00 ---
    function nightMode() {
        const hour = new Date().getHours();
        if (hour >= 21 || hour < 6) {
            document.body.style.background = '#181818';
            document.body.style.color = '#ffe066';
        }
    }
    nightMode();
    setInterval(nightMode, 60000);

    // --- Пасхалка: случайные "глюки" текста ---
    setInterval(() => {
        if (Math.random() < 0.03) {
            const all = document.querySelectorAll('h1, h2, h3, .section-title, .animatronic-name');
            if (all.length > 0) {
                const el = all[Math.floor(Math.random() * all.length)];
                const orig = el.textContent;
                el.textContent = 'ERROR_\u2588\u2588\u2588';
                setTimeout(()=>{ el.textContent = orig; }, 800);
            }
        }
    }, 10000);

    // --- Пасхалка: скример при клике по футеру ---
    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('click', () => {
            const img = document.createElement('img');
            img.src = 'assets/images/afton.png';
            img.style.position = 'fixed';
            img.style.left = '50%';
            img.style.top = '50%';
            img.style.transform = 'translate(-50%,-50%) scale(2)';
            img.style.zIndex = 9999;
            img.style.boxShadow = '0 0 80px #a00';
            document.body.appendChild(img);
            const scream = new Audio('assets/audio/laugh.mp3');
            scream.volume = 0.7;
            scream.play().catch(()=>{});
            setTimeout(()=>{ img.remove(); }, 1200);
        });
    }

    // --- Категории и поиск для меню (menu.html) ---
    if (document.querySelector('.category-buttons')) {
        const categoryButtons = document.querySelectorAll('.category-button');
        const menuCategories = document.querySelectorAll('.menu-category');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                menuCategories.forEach(cat => {
                    cat.classList.remove('active');
                    if (cat.getAttribute('data-category') === category) {
                        cat.classList.add('active');
                    }
                });
            });
        });
        // Поиск
        const searchInput = document.getElementById('menuSearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const activeCategory = document.querySelector('.menu-category.active');
                if (!activeCategory) return;
                const items = activeCategory.querySelectorAll('.menu-item-card');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }
}); 