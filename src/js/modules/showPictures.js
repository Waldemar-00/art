const showPictures = (selectorImg) => {
    const pictures = document.querySelectorAll(selectorImg);
    const showImg = (picture) => {
        const img = picture.querySelector('img');
        const partOfPath = img.src.match(/sizes-\d/)[0];
        img.src = partOfPath + '-1.png';
        //img.src = img.src.replace(/(\d)(\.png)/, `${'$1' + '-' + '1' + '$2'}`);
            picture.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    };
    const hiddenImg = (picture) => {
        const img = picture.querySelector('img');
        const partOfPath = img.src.match(/sizes-\d/)[0];
        img.src = partOfPath + '.png';
            //img.src = img.src.replace(/(\d)(\.png)/, `${'$1' + '-' + '1' + '$2'}`); 
            picture.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    };
    pictures.forEach(pic => {
        pic.addEventListener('mouseover', () => {
            showImg(pic);
        });
        pic.addEventListener('mouseout', () => {
            hiddenImg(pic);
        });
    });
};
export default showPictures;

//! http://localhost:1234/sizes-1.68b798a4-1-1.png