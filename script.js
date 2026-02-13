document.addEventListener('DOMContentLoaded', function () {
    function createHeart(x, y) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.innerHTML = '🖤';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.position = 'absolute';

        // Случайный размер
        const size = Math.floor(Math.random() * 40 + 20); // От 20px до 60px
        heart.style.fontSize = `${size}px`;

        // Меняем цвет при клике
        heart.addEventListener('click', (e) => {
            e.stopPropagation();
            heart.style.color = '#ff0000';
        });

        // Удаляем сердечко через 3 секунды
        setTimeout(() => {
            heart.remove();
        }, 3000);

        return heart;
    }

    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const heart = createHeart(x, y);
        document.body.appendChild(heart);
    });
});