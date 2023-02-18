const postData = async (url, data) => {
    const dataObject = {};
    data.forEach((value, key) => {
        dataObject[key] = value;
    });
    const calcPrice = document.querySelector('.calc-price').innerText;
    dataObject.Price = calcPrice;
    const response = await fetch(url , {
        method: 'POST',
        headers: {
            "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(dataObject),
    });
    return await response.json();
};

const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    return await response.json();
};
export {postData, getData};