// script.js

document.addEventListener("DOMContentLoaded", () => {
    const shapes = document.querySelectorAll(".shape");
    const dropzone = document.getElementById("dropzone");
    const successMessage = document.getElementById("successMessage");

    shapes.forEach(shape => {
        shape.addEventListener("dragstart", dragStart);
        shape.addEventListener("dragend", dragEnd);
    });

    dropzone.addEventListener("dragover", dragOver);
    dropzone.addEventListener("dragenter", dragEnter);
    dropzone.addEventListener("dragleave", dragLeave);
    dropzone.addEventListener("drop", drop);

    function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
        setTimeout(() => e.target.classList.add("hidden"), 0);
    }

    function dragEnd(e) {
        e.target.classList.remove("hidden");
    }

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

        if (!dropzone.contains(draggable)) {
            dropzone.appendChild(draggable);
            draggable.style.position = "absolute";
            draggable.style.top = `${dropzone.children.length === 1 ? 0 : 100}px`;
            draggable.style.left = "0";
        }

        checkWin();
    }

    function checkWin() {
        const children = dropzone.children;
        if (children.length === 2) {
            const [first, second] = children;
            const firstRect = first.getBoundingClientRect();
            const secondRect = second.getBoundingClientRect();

            if (Math.abs(firstRect.top - secondRect.top) === 100 && Math.abs(firstRect.left - secondRect.left) === 0) {
                successMessage.style.display = "block";
                setTimeout(() => {
                    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 0);
            }
        }
    }
});
