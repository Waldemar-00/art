const accordion = (paragraphTrigger, divContent) => {
    const triggers = document.querySelectorAll(paragraphTrigger);
    const contents = document.querySelectorAll(divContent);
    contents.forEach(content => {
        content.classList.add('animated', 'fadeInDown');
    });
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                triggers.forEach(trig => {
                    trig.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style');
            }
        });
    });
};
export default accordion;