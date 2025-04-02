const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const errorSound = document.getElementById('errorSound');
let pattern = [];
let firstColorChosen = null;
let placedItems = new Array(6).fill(null);

// Oyuncu istediği renkten başlamalı
function determinePattern(startColor) {
    pattern = [];
    for (let i = 0; i < 6; i++) {
        pattern.push(i % 2 === 0 ? startColor : startColor === "green" ? "orange" : "green");
    }
}

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('color', e.target.getAttribute('data-color'));
        e.dataTransfer.setData('id', e.target.dataset.color + Math.random());

        if (!firstColorChosen) {
            firstColorChosen = e.target.getAttribute('data-color');
            determinePattern(firstColorChosen);
        }
    });
});

dropzones.forEach((dropzone, index) => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const color = e.dataTransfer.getData('color');

        if (placedItems[index]) return; // Eğer alan doluysa işlem yapma

        if (color === pattern[index]) {
            dropzone.style.backgroundColor = color;
            dropzone.classList.add('correct');
            placedItems[index] = color;
            checkCompletion();
        } else {
            dropzone.classList.add('incorrect');
            errorSound.play();
            setTimeout(() => dropzone.classList.remove('incorrect'), 1000);
        }
    });
});

function checkCompletion() {
    if (placedItems.every((color, i) => color === pattern[i])) {
        setTimeout(() => alert("Tebrikler! Örüntüyü doğru yerleştirdiniz."), 500);
    }
}
