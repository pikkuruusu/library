let myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages`; 
    }
    
    changeReadStatus() {
        this.isRead = !this.isRead;
    }

    get isRead() {
        return this._isRead;
    }

    set isRead(value) {
        this._isRead = value;
    }
}

function addBookToLibrary(library, title, author, pages, isRead) {
    let bookToAdd = new Book(title, author, pages, isRead);
    library.push(bookToAdd);
    updateLocalStorage(library);
    printBooks();
}

function removeBook(library, index) {
    library.splice(index, 1);
    updateLocalStorage(library);
    printBooks();
}

function updateLocalStorage(library) {
    localStorage.setItem('library', JSON.stringify(library));
}

const bookList = document.querySelector('.book-list');
const printBooks = function() {
    bookList.textContent = '';
    myLibrary.forEach((book, index) => {
        let bookItem = document.createElement('li');
        bookItem.setAttribute('class', 'book-card');
        bookItem.setAttribute('data-index', index);
        bookItem.textContent = book.info();
        let readStatus = document.createElement('span');
        readStatus.setAttribute('class', book.isRead ? 'read-status read' : 'read-status not-read')
        readStatus.textContent = book.isRead ? 'Read' : 'Not read';
        bookItem.appendChild(readStatus);
        let removeButton = document.createElement('span');
        removeButton.setAttribute('class', 'remove-button');
        removeButton.appendChild(createRemoveSVG());
        bookItem.appendChild(removeButton);
        
        bookList.appendChild(bookItem);
    })

    const readStatusButton = document.querySelectorAll('.read-status');
    readStatusButton.forEach(button => {
        button.addEventListener('click', function(e) {
            const indexOfBook = e.target.parentNode.getAttribute('data-index');
            myLibrary[indexOfBook].changeReadStatus();
            if (button.classList.contains('read')) {
                button.classList.remove('read');
                button.classList.add('not-read');
            } else {
                button.classList.remove('not-read');
                button.classList.add('read');
            }
            button.textContent = myLibrary[indexOfBook].isRead ? 'Read' : 'Not read';
            updateLocalStorage(myLibrary);
        })
    })

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            const indexToRemove = e.target.parentNode.getAttribute('data-index');
            removeBook(myLibrary, indexToRemove);
    });
});
};

const showFormButton = document.querySelector('.add-book-button');
const formContainer = document.querySelector('.form-container');
showFormButton.addEventListener('click', function(e) {
    if (formContainer.classList.contains('show')) {
        formContainer.classList.remove('show');
    } else {
        formContainer.classList.add('show');
    }
})

const addBookForm = document.getElementById('add-book');
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let isRead = document.getElementById('isread').checked;
    addBookToLibrary(myLibrary, title, author, pages, isRead);
    formContainer.classList.remove('show');
});

const createRemoveSVG = function() {
    let xlmns = 'http://www.w3.org/2000/svg';
    let svg = document.createElementNS(xlmns, 'svg');
    svg.setAttributeNS(null, 'width', '1.5em');
    svg.setAttributeNS(null, 'height', '1.5em');
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


const getStoredBooks = function() {
    if (localStorage.getItem('library') != null) {
        let storedLibrary = JSON.parse(localStorage.getItem('library'));
        storedLibrary.forEach(book => {
            myLibrary.push(new Book(book.title, book.author, book.pages, book._isRead));
        })
        printBooks();
    }
}

getStoredBooks();
