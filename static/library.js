let library = [
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', pagesNumber: 295, wasRead: 'not yet read'},
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', pagesNumber: 295, wasRead: 'not yet read'},
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', pagesNumber: 295, wasRead: 'not yet read'}
];

let form = document.getElementsByName('addBook')[0];
let tBody = document.getElementsByTagName('tbody')[0];

form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();
    library.push(new Book(form.elements['getBookName'].value,
        form.elements['getBookAuthor'].value,
        form.elements['getPagesNumber'].value,
        form.elements['wasRead'].checked));

    showBooks();
    form.reset();
}

function showBooks() {
    tBody.innerHTML = '';
    
    library.map(el => {
        let row = document.createElement('tr');
        tBody.append(row);
        
        for (key in el) {
            if (!el.hasOwnProperty(key)) return;
            
            let tData = document.createElement('td');
            tData.textContent = el[key];
            row.append(tData);
        }
    })
}

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

showBooks();