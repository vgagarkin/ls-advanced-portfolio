const parallax = document.querySelector('.welcome-section__parallax-wrapper');
    layers = parallax.children;

function moveLayer(wScroll) {
    Array.from(layers).forEach(layer => {
        const speed = layer.dataset.speed,
            pxl = speed * wScroll / 10;

        layer.style.transform = 'translate3d(0,-' + pxl + 'px,0)';
    });
}


window.addEventListener('scroll', () => {
    let wScroll = window.pageYOffset;
    moveLayer(wScroll);
});