const parallaxBuddaSection = document.querySelector('.section-budda__parallax-wrapper'),
    parallaxWelcomeSection = document.querySelector('.welcome-section__parallax-wrapper'),
    buddaSectionOffsetTop = document.querySelector('.section-budda').offsetTop,
    layersBuddaSection = parallaxBuddaSection.children,
    layersWelcomeSection =  parallaxWelcomeSection.children;

function moveLayer(wScroll, layers, multiplier) {
    Array.from(layers).forEach(layer => {
        const speed = layer.dataset.speed,
            pxl = speed * wScroll / multiplier;

        layer.style.transform = 'translate3d(0,-' + pxl + 'px,0)';
    });
}


window.addEventListener('scroll', () => {
    let wScroll = window.pageYOffset,
        scrollSectionBuddaStartPos = wScroll-buddaSectionOffsetTop;

    if(wScroll > buddaSectionOffsetTop-50) {
        moveLayer(scrollSectionBuddaStartPos, layersBuddaSection, 50);
    }

    moveLayer(wScroll, layersWelcomeSection, 40);
});