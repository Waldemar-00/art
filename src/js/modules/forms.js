
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
    const uploads = document.querySelectorAll('[name="upload"]');
    //checkNum('input[name="user_phone"]');
    const messege = {
        loading: "Загрузка ваших данных",
        success: "Спасибо, мы скоро с Вами свяжемся!",
        failure: "Что-то сломалось :(",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        failureImg: 'assets/img/fail.png',
    };
    const clearInputs = () => {
        inputs.forEach(input => input.value = '');
        uploads.forEach(load => load.previousElementSibling.innerText = 'Файл не выбран');
    };
    const urls = {
        postText: 'https://jsonplaceholder.typicode.com/users',
        postImg: 'https://jsonplaceholder.typicode.com/photos'
    };
    const postData = async (url, data) => {
        const dataObject = {};
        data.forEach((value, key) => {
            dataObject[key] = value;
        });
        const response = await fetch(url , {
            method: 'POST',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(dataObject),
        });
        return await response.text();
    };
    uploads.forEach(load => {
        load.addEventListener('input', () => {
            let dots;
            const array = load.files[0].name.split('.')
            array[0].length > 6 ? dots = '...' : dots = '.';
            const nameImg = array[0].substring(0, 6) +
                dots + array[1];
            load.previousElementSibling.innerText = nameImg;
        });
    });
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const messegeBox = document.createElement('div');
            form.classList.add('animated', 'fadeOutUp');
            messegeBox.classList.add('status');
            form.parentElement.append(messegeBox);
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
            form.closest('.popup-design') || form.classList.contains('calc_form') ?
                api = urls.postImg : api = urls.postText;
            console.log(api);
            postData(api, formData)
                .then(response => {
                    console.log(response);
                    showImg.setAttribute('src', messege.ok);
                    textMessege.textContent = messege.success;
            })
                .catch(() => {
                    showImg.setAttribute('src', messege.failureImg);
                    textMessege.textContent = messege.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        messegeBox.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                        document.body.style.overflow = 'visible';
                    }, 4000);
                });
        });
    });
};
export default formsFn;