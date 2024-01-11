console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
    const overlayE1 = e.currentTarget;
    const x = e.pageX - cardsContainer.offsetLeft;
    const y = e.pageY - cardsContainer.offsetTop;

    overlayE1.style = `--opacity: 1; --x: ${x}px; --y: ${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEL) => {
    const overlayCta = document.createElement("div");
    overlayCta.classList.add("cta");
    overlayCta.textContent = ctaEL.textContent;
    overlayCta.setAttribute("aria-hidden", true);
    overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height =entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
            overlay.children[cardIndex].style.width =`${width}px`;
            overlay.children[cardIndex].style.height = `${height}px`;
        }
    });
});

const initOverlayCard = (cardEL) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayCta(overlayCard, cardEL.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardEL);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove",applyOverlayMask);