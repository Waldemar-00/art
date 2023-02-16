const scrollHtml = (selectorUp) => {
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 2750) {
            document.querySelector(selectorUp).style.opacity = 1;
        } else if (document.documentElement.scrollTop < 1650) {
            document.querySelector(selectorUp).style.opacity = 0;
        }
    });
};
export default scrollHtml;