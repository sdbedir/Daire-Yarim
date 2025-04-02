const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const errorSound = document.getElementById('errorSound');
let pattern = [];
let firstColorChosen = null;

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
        if (!firstColorChosen) {
            firstColorChosen = e.target.getAttribute('data-color');
            determinePattern(firstColorChosen);
        }
    });
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const color = e.dataTransfer.getData('color');
        const index = parseInt(dropzone.getAttribute('data-index'));

        if (color === pattern[index]) {
            dropzone.style.backgroundColor = color;
            dropzone.classList.add('correct');
            checkCompletion();
        } else {
            dropzone.classList.add('incorrect');
            errorSound.play();
            setTimeout(() => dropzone.classList.remove('incorrect'), 1000);
        }
    });
});

function checkCompletion() {
    if ([...dropzones].every((zone, i) => zone.style.backgroundColor === pattern[i])) {
        setTimeout(() => alert("Tebrikler! Örüntüyü doğru yerleştirdiniz."), 500);
    }
}
