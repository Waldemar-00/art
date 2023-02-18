const dragDrop = () => {
    const uploadInputs = document.querySelectorAll('[name=upload]');
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        uploadInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function enterOverFile(element) {
        element.closest('.file_upload').style.border = '2px solid #F7E7E6';
        element.closest('.file_upload').style.borderRadius = '27px';
        element.closest('.file_upload').style.background = 'rgba(0,0,0, 0.05)';
    }
    function leaveDropFile(element) {
        element.closest('.file_upload').style.border = 'none';
        if (element.closest('[data-modal]')) {
                element.closest('.file_upload').style.background = '#ededed';
        } else if (element.closest('.file_upload.button')) {
                element.closest('.file_upload').style.background = '#F7E7E6';
        }
        else {
            element.closest('.file_upload').style.background = '#fff';
        }
    }
    ['dragenter', 'dragover'].forEach(eventName => {
    uploadInputs.forEach(input => {
        input.addEventListener(eventName, () => enterOverFile(input), false);
        });
    });
    ['dragleave', 'drop'].forEach(eventName => {
    uploadInputs.forEach(input => {
        input.addEventListener(eventName, () => leaveDropFile(input), false);
        });
    });
    uploadInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
                const array = input.files[0].name.split('.');
                array[0].length > 6 ? dots = '...' : dots = '.';
                const nameImg = array[0].substring(0, 6) +
                    dots + array[1];
                input.previousElementSibling.innerText = nameImg;
        }, false);
    });
};
export default dragDrop;