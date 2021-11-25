function Book(title, author, pagesNumber, wasRead) {
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.wasRead = wasRead;
}

Book.prototype = {
    info() {
        return `${this.title} by ${this.author}, ${this.pagesNumber} pages, ${this.wasRead}.`;
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, "not yet read");