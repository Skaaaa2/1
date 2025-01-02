const squares = document.querySelectorAll('.square');
let activeSquare = null;
let offsetX, offsetY;

squares.forEach(square => {
    square.addEventListener('mousedown', (event) => {
        activeSquare = square;
        offsetX = event.clientX - square.getBoundingClientRect().left;
        offsetY = event.clientY - square.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

function onMouseMove(event) {
    if (!activeSquare) return;
    activeSquare.style.left = (event.clientX - offsetX) + 'px';
    activeSquare.style.top = (event.clientY - offsetY) + 'px';
}

function onMouseUp() {
    activeSquare = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}