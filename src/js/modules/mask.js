const mask = (selector) => {
    function createMask(e) {
        const matrix = '+375 (__) ___ __ __';
        let iterator = 0;
        const defaultValueOfMatrix = matrix.replace(/\D/g, '');
        let valueChange = e.target.value.replace(/\D/g, '');
        
        if (defaultValueOfMatrix.length >= valueChange.length) {
            valueChange = defaultValueOfMatrix;
        }
        e.target.value = matrix.replace(/./g, function (char) {
            return /[_\d]/.test(char) &&
                iterator < valueChange.length ? valueChange.charAt(iterator++) :
                iterator >= valueChange.length ? "" : char;
        }
        );
        if (e.type === 'blur') {
            if (e.target.value.length < 19) {
                this.value = '';
            }
        } else {
            e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
        }

    }
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};






export default mask;