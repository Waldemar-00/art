const showMoreStyles = (stylesSelector, buttonSelector) => {
    const styles = document.querySelectorAll(stylesSelector);
    const button = document.querySelector(buttonSelector);
    button.addEventListener('click', (e) => {
        styles.forEach(style => {
            style.classList.add('animated', 'fadeInUp');
            style.classList.remove("hidden-lg", "hidden-md", "hidden-sm","hidden-xs");
            style.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
        });
        button.style.display = "none";
    });
};
export default showMoreStyles;