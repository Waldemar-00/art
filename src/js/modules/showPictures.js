const showPictures = (selectorImg) => {
    const pictures = document.querySelectorAll(selectorImg);
    const showImg = (picture) => {
        const img = picture.querySelector('img');
        img.src = img.src.slice(0, - 4) + "-1.png";
        picture.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    };
    const hiddenImg = (picture) => {
        const img = picture.querySelector('img');
            img.src = img.src.slice(0, - 6) + ".png"; 
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