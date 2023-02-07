const calculate = (size, material, options, promocode, rezult) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelector(options);
    const promo = document.querySelector(promocode);
    const rez = document.querySelector(rezult);
    let sum = 0;
    const calculateFu = () => {
         sum = sizeBlock.value * materialBlock.value + +optionsBlock.value;
        if (!sizeBlock.value || !materialBlock.value) {
            rez.innerText = 'Пожалуйста, выберите pазмер и материал картины!';
        } else if (promo.value === ' IWANTPOPART') {
            rez.innerText = sum * 0.7;
        } else {
            rez.innerText = sum;
        }
    };
    sizeBlock.addEventListener('change', calculateFu);
    materialBlock.addEventListener('change', calculateFu);
    optionsBlock.addEventListener('change', calculateFu);
    promo.addEventListener('input', calculateFu);
};
export default calculate;