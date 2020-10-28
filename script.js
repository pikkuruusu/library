let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    let readString = this.isRead ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`; 
}

Book.prototype.changeReadStatus = function() {
    return !this.isRead;
}

function addBookToLibrary(library, title, author, pages, isRead) {
    let bookToAdd = new Book(title, author, pages, isRead);
    library.push(bookToAdd);
    printBooks();
}

function removeBook(library, index) {
    library.splice(index, 1);
    printBooks();
}

const bookList = document.querySelector('.book-list');
const printBooks = function() {
    //Todo need to stop it from printing everything out if ti is already there
    bookList.textContent = '';
    // TODO create a toggle switch fro the isread
    myLibrary.forEach((book, index) => {
        let bookItem = document.createElement('li');
        bookItem.setAttribute('class', 'book-card');
        bookItem.setAttribute('data-index', index);
        bookItem.textContent = book.info();
        let removeButton = document.createElement('span');
        removeButton.setAttribute('class', 'remove-button');
        removeButton.appendChild(createRemoveSVG());
        bookItem.appendChild(removeButton);
        
        bookList.appendChild(bookItem);
    })

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            const indexToRemove = e.target.parentNode.getAttribute('data-index');
            removeBook(myLibrary, indexToRemove);
    });
});
};

const addBookForm = document.getElementById('add-book');
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let isRead = document.getElementById('isread').checked;
    addBookToLibrary(myLibrary, title, author, pages, isRead);
});

const showFormButton = document.querySelector('.add-book-button');
const formContainer = document.querySelector('.form-container');
showFormButton.addEventListener('click', function(e) {
    if (formContainer.classList.contains('show')) {
        formContainer.classList.remove('show');
    } else {
        formContainer.classList.add('show');
    }
})


const createRemoveSVG = function() {
    let xlmns = 'http://www.w3.org/2000/svg';
    let svg = document.createElementNS(xlmns, 'svg');
    svg.setAttributeNS(null, 'width', '1.8em');
    svg.setAttributeNS(null, 'height', '1.8em');
    svg.setAttributeNS(null, 'viewBox', '0 0 16 16');
    svg.setAttributeNS(null, 'class', 'bi bi-x-circle');
    svg.setAttributeNS(null, 'fill', 'currentColor');
    let pathOne = document.createElementNS(xlmns, 'path');
    pathOne.setAttributeNS(null, 'fill-rule', 'evenodd');
    pathOne.setAttributeNS(null, 'd', 'M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z');
    let pathTwo = document.createElementNS(xlmns, 'path');
    pathTwo.setAttributeNS(null, 'fill-rule', 'evenodd');
    pathTwo.setAttributeNS(null, 'd', 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z');
    svg.appendChild(pathOne);
    svg.appendChild(pathTwo);
    return svg;
}


addBookToLibrary(myLibrary, "Best book", "Staffan", 234, true);
addBookToLibrary(myLibrary, "Best book 2", "Staffan S", 234, true);