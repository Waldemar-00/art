const burger = (burger, menuSelector) => {
    const button = document.querySelector(burger);
    const menu = document.querySelector(menuSelector);
    menu.style.zIndex = '70';
    button.addEventListener('click', function () {
        if (menu.style.display === 'none' && window.screen.availWidth < 993) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
    window.addEventListener('resize', function () {
        if (this.window.screen.availWidth > 992) {
            menu.style.display = 'none';
        }
    });
};
export default burger;