const accordionOnJS = (triggers, contents,) => {
    const btnParagraphs = document.querySelectorAll(triggers);
    btnParagraphs.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');
            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = 0;
            }
        });

    });
};
export default accordionOnJS;