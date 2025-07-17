// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Анимация посетителей
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        let count = Math.floor(Math.random() * 10000) + 5000;
        counters.forEach(counter => {
            counter.textContent = count;
        });
        
        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            counters.forEach(counter => {
                counter.textContent = count;
            });
        }, 30000);
    }

    // Эффект Golden Freddy для главной страницы
    if (document.getElementById('main-image')) {
        const mainImage = document.getElementById('main-image');
        
        function showGoldenFreddy() {
            if (Math.random() < 0.01) {
                const originalSrc = mainImage.src;
                mainImage.src = 'assets/images/goldenfreddy.png';
                
                setTimeout(() => {
                    mainImage.src = originalSrc;
                }, 1000);
            }
        }
        
        setInterval(showGoldenFreddy, 30000);
    }

    // Случайные звуки
    const playRandomSound = () => {
        if (Math.random() > 0.95) {
            const sounds = [
                new Audio('assets/audio/laugh.mp3'),
                new Audio('assets/audio/creak.mp3'),
                new Audio('assets/audio/footsteps.mp3')
            ];
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            randomSound.volume = 0.3;
            randomSound.play().catch(e => console.log("Audio play prevented:", e));
        }
    };
    
    setInterval(playRandomSound, 15000);
});