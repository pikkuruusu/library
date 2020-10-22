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
}