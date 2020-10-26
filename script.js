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
    myLibrary.forEach((book, index) => {
        let bookItem = document.createElement('li');
        bookItem.setAttribute("data-index", index);
        bookItem.textContent = book.info();
        let removeButton = document.createElement('div');
        removeButton.setAttribute('class', 'remove-button');
        removeButton.textContent = 'Remove';
        bookItem.appendChild(removeButton);
        bookList.appendChild(bookItem);
    })

    const removeButtons = document.querySelectorAll('div.remove-button');
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

addBookToLibrary(myLibrary, "Best book", "Staffan", 234, true);
addBookToLibrary(myLibrary, "Best book 2", "Staffan S", 234, true);