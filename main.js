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
    let newLeft = event.clientX - offsetX;
    let newTop = event.clientY - offsetY;
    const minLeft = 0;
    const maxLeft = window.innerWidth - activeSquare.offsetWidth;
    const minTop = 0;
    const maxTop = window.innerHeight - activeSquare.offsetHeight;
    
    if (newLeft < minLeft) newLeft = minLeft;
    if (newLeft > maxLeft) newLeft = maxLeft;
    if (newTop < minTop) newTop = minTop;
    if (newTop > maxTop) newTop = maxTop;
    
    activeSquare.style.left = newLeft + 'px';
    activeSquare.style.top = newTop + 'px';
    squares.forEach(square => {
        if (square !== activeSquare && isColliding(activeSquare, square)) {
            pushSquare(activeSquare, square);
        }
    });
}

function onMouseUp() {
    activeSquare = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function isColliding(square1, square2) {
    const rect1 = square1.getBoundingClientRect();
    const rect2 = square2.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function pushSquare(activeSquare, otherSquare) {
    const rectActive = activeSquare.getBoundingClientRect();
    const rectOther = otherSquare.getBoundingClientRect();
    const overlapX = Math.min(rectActive.right - rectOther.left, rectOther.right - rectActive.left);
    const overlapY = Math.min(rectActive.bottom - rectOther.top, rectOther.bottom - rectActive.top);

    if (overlapX < overlapY) {
        if (rectActive.left < rectOther.left) {
            otherSquare.style.left = (rectOther.left + overlapX) + 'px';
        } else {
            otherSquare.style.left = (rectOther.left - overlapX) + 'px';
        }
    } else {
        if (rectActive.top < rectOther.top) {
            otherSquare.style.top = (rectOther.top + overlapY) + 'px';
        } else {
            otherSquare.style.top = (rectOther.top - overlapY) + 'px';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    squares.forEach(square => {
        square.style.position = 'absolute';
        square.style.left = square.offsetLeft + 'px';
        square.style.top = square.offsetTop + 'px';
    });
});
