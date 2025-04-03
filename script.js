document.addEventListener("DOMContentLoaded", () => {
    const shapes = document.querySelectorAll(".shape");
    const dropzone = document.getElementById("dropzone");
    const successMessage = document.getElementById("successMessage");
    const resetButton = document.getElementById("resetButton");
    const shapesContainer = document.querySelector(".shapes-container");

    // Başlangıçta dairelerin doğru şekilde görünmesini sağlıyoruz.
    function resetShapes() {
        shapes.forEach((shape) => {
            shape.style.left = "0px";
            shape.style.top = "0px";
            shape.classList.remove("hidden");
            shape.setAttribute("draggable", "true");  // draggable'ı tekrar etkinleştir
        });
        dropzone.innerHTML = ""; // Dropzone'u sıfırlıyoruz
        successMessage.style.display = "none";
        resetButton.style.display = "none";
    }

    // Drag başlangıcı
    shapes.forEach((shape) => {
        shape.addEventListener("dragstart", dragStart);
        shape.addEventListener("dragend", dragEnd);
    });

    // Dropzone işlemleri
    dropzone.addEventListener("dragover", dragOver);
    dropzone.addEventListener("dragenter", dragEnter);
    dropzone.addEventListener("dragleave", dragLeave);
    dropzone.addEventListener("drop", drop);

    // Sürükle başlangıcı
    function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
        setTimeout(() => e.target.classList.add("hidden"), 0);
    }

    // Sürükle bitişi
    function dragEnd(e) {
        e.target.classList.remove("hidden");
    }

    // Dropzone'u aktifleştiriyoruz
    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        dropzone.style.backgroundColor = "#f8bbd0";
    }

    function dragLeave(e) {
        dropzone.style.backgroundColor = "#fce4ec";
    }

    function drop(e) {
        e.preventDefault();
        dropzone.style.backgroundColor = "#fce4ec";
        const id = e.dataTransfer.getData("text/plain");
        const draggable = document.getElementById(id);

        // Daireyi yerleştiriyoruz
        if (!dropzone.contains(draggable)) {
            dropzone.appendChild(draggable);
            draggable.style.position = "absolute";
            draggable.style.top = `${dropzone.children.length === 1 ? 0 : 75}px`;
            draggable.style.left = "0";
        }
        checkWin();
    }

    // Kazanma kontrolü
    function checkWin() {
        if (dropzone.children.length === 2) {
            successMessage.style.display = "block";
            resetButton.style.display = "block";
        }
    }

    // Tekrar oyna butonuna tıklandığında
    resetButton.addEventListener("click", () => {
        resetShapes();
        shapes.forEach(shape => shapesContainer.appendChild(shape)); // Şekilleri tekrar başlat
    });

    resetShapes(); // Sayfa ilk açıldığında da dairelerin sıfırlanmasını sağlıyoruz.
});
