
// const checkNum = (selector) => {
    // const inputs = document.querySelectorAll(selector);
    // inputs.forEach((input) => {
        // input.addEventListener('input', () => {
            // input.value = input.value.replace(/\D/, '');
        // });
    // });
// };

const formsFn = () => {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    //checkNum('input[name="user_phone"]');
    const messege = {
        loading: "Laoding...",
        success: "Wait for our call!",
        failure: "Somesing's wrong!",
        spinner: './assets/img/spinner.gif',
        ok: './assets/img/ok.png',
        failureImg: './assets/img/fail.png',
    };
    const clearInputs = () => {
        inputs.forEach(input => input.value = '');
    };
    const urls = {
        postText: 'https://jsonplaceholder.typicode.com/posts',
        postImg: 'https://jsonplaceholder.typicode.com/photos'
    };
    const postData = async (url, data) => {
        const dataObject = {};
        data.forEach((value, key) => {
            dataObject[key] = value;
        });
        console.log(dataObject);
        const response = await fetch(url , {
            method: 'POST',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(dataObject),
        });
        return await response.json();
    };
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const messegeBox = document.createElement('div');
            messegeBox.classList.add('status');
            form.parentElement.append(messegeBox);
            form.classList.add('animated', 'fadeOutUp');
            setTimeout(() => { 
                form.style.display = 'none';
            }, 400);
            const showImg = document.createElement('img');
            showImg.src = messege.spinner;
            //showImg.setAttribute('src', messege.spinner);
            showImg.classList.add('animated', 'fadeInUp');
            messegeBox.append(showImg);   

            const textMessege = document.createElement('div');
            textMessege.innerText = messege.loading;
            messegeBox.append(textMessege);

            const formData = new FormData(form);
            let api;
            form.closest('.popup-design') ? api = urls.postImg : api = urls.postText;
            console.log(api);
            postData(api, formData)
                .then(response => {
                    console.log(response);
                    messegeBox.setAttribute('showImg', messege.ok);
                    textMessege.textContent = messege.success;
            })
                .catch(() => {
                    messegeBox.setAttribute('showImg', messege.failureImg);
                    textMessege.textContent = messege.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        messegeBox.remove();
                        const mainForms = document.querySelectorAll('.main_form');
                        mainForms.forEach(form => form.style.display = 'none');
                        const close = document.querySelectorAll('[data-closePopup]');
                        close.forEach(popup => popup.style.display = 'none');
                        document.body.style.overflow = 'visible';
                    }, 4000);

                });
        });
    });
};
export default formsFn;