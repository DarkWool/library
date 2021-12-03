let library = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis euismod magna, quis rutrum ante. Maecenas aliquet, velit in iaculis rhoncus, est nulla fermentum elit, sed suscipit sapien nisl eu orci. Nullam pharetra felis ac faucibus bibendum. Quisque at nisl augue. Cras commodo semper ipsum sed efficitur. Sed non feugiat sem. Fusce rutrum at libero vitae dignissim. Suspendisse dictum a tortor eget convallis. Nam et sem nec augue venenatis dignissim. Vestibulum mi nulla, venenatis vitae placerat a', pagesNumber: 295, wasRead: false},
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis euismod magna, quis rutrum ante. Maecenas aliquet, velit in iaculis rhoncus, est nulla fermentum elit, sed suscipit sapien nisl eu orci. Nullam pharetra felis ac faucibus bibendum. Quisque at nisl augue. Cras commodo semper ipsum sed efficitur. Sed non feugiat sem. Fusce rutrum at libero vitae dignissim. Suspendisse dictum a tortor eget convallis. Nam et sem nec augue venenatis dignissim. Vestibulum mi nulla, venenatis vitae placerat a', pagesNumber: 295, wasRead: true},
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', pagesNumber: 295, wasRead: false},
    {title: 'Huesos de Lagartija.', author: 'Federico Navarrete', pagesNumber: 410, wasRead: false}
];

const form = document.getElementsByName('addBookForm')[0];
const bookLibrary = document.getElementById('libraryContent');

const addCardBtn = document.createElement('div');
addCardBtn.id = 'addNew';
addCardBtn.classList.add('card');
addCardBtn.insertAdjacentHTML('beforeend',
'<span class="material-icons">add_circle</span>');

const darkMode = document.getElementById('dark-mode');

const modal = document.getElementsByClassName('modal')[0];
const openModalBtn = document.getElementById('addNew');
const closeModalBtn = document.getElementById('close-button');
const darkOverlay = document.getElementById('darkOverlay');

form.addEventListener('submit', addBookToLibrary);
addCardBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal)
darkOverlay.addEventListener('click', closeModal);
darkMode.addEventListener('click', toggleDarkMode);

function openModal() {
    darkOverlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal() {
    darkOverlay.removeAttribute('class');
    modal.classList.remove('active');
};

function addBookToLibrary(e) {
    // Prevents the form refreshing the page.
    e.preventDefault();
    library.push(new Book(
        form.elements['getBookName'].value,
        form.elements['getBookAuthor'].value,
        form.elements['getBookDescription'].value,
        form.elements['getPagesNumber'].value,
        form.elements['wasRead'].checked));

    closeModal();
    updateLibrary();
    form.reset();
}

function updateLibrary() {
    bookLibrary.innerHTML = '';

    library.map((el, index) => {
        const newCard = document.createElement('article');
        newCard.classList.add('card');
        newCard.setAttribute('data-index', index);

        newCard.insertAdjacentHTML('beforeend',
            `<header class="card-header">
            <h2 class="book-title">${el.title}</h2>
            </header>
            <div class="card-body">
                <p class="book-author">${el.author}</p>
                <p class="book-pages"><span class="pages-number">${el.pagesNumber}</span><br>PAGES
            </div>`);
        
        if (el.description) {
            newCard.lastElementChild.insertAdjacentHTML('beforeend', 
            `<p class="book-description" hidden>${el.description}</p>
            <button type="button" class="desc-btn desc-status">
            SHOW DESCRIPTION
                <span class="material-icons"> keyboard_arrow_down</span>
            </button>`);
        } else {
            newCard.lastElementChild.insertAdjacentHTML('beforeend', `<p class="desc-status">NO DESCRIPTION</p>`);
        }
                
        if (el.wasRead) {
            newCard.insertAdjacentHTML('beforeend', 
            `<footer>
                <button type="button" class="icon-btn read-btn">
                    <i class="material-icons">check_circle</i> READ
                </button>
                <button type="button" class="icon-btn delete-btn"><i class="material-icons">delete_forever</i></button>
            </footer>`);
        } else {
            newCard.insertAdjacentHTML('beforeend',
                `<footer>
                <button type="button" class="icon-btn read-btn">
                    <i class="material-icons">cancel</i> NOT READ
                </button>
                <button type="button" class="icon-btn delete-btn"><i class="material-icons">delete_forever</i></button>
            </footer>`);
        }

        bookLibrary.append(newCard);
    })

    const descButtons = document.getElementsByClassName('desc-btn');
    const readButtons = document.getElementsByClassName('read-btn');
    const deleteButtons = document.getElementsByClassName('delete-btn');
    bookLibrary.append(addCardBtn);

    for (let button of readButtons) {
        button.addEventListener('click', checkIfRead);
    }
    
    for (let button of deleteButtons) {
        button.addEventListener('click', deleteBook);
    }

    for (let button of descButtons) {
        button.addEventListener('click', showDescription);
    }
}

function checkIfRead(e) {
    const index = e.target.closest('.card').dataset.index;
    if (library[index].wasRead) {
        e.target.innerHTML = `<i class="material-icons">cancel</i> NOT READ`;
        return library[index].wasRead = false;
    }
    
    e.target.innerHTML = `<i class="material-icons">check_circle</i> READ`;
    return library[index].wasRead = true;
}

function deleteBook(e) {
    const card = e.target.closest('.card');
    library.splice(card.dataset.index, 1);
    card.remove();
    
    updateLibrary();
}

function showDescription(e) {
    const bookDescription = e.target.previousElementSibling;
    if (bookDescription.hidden) {
        bookDescription.hidden = false;
        e.target.firstChild.textContent = 'HIDE DESCRIPTION';
        e.target.firstElementChild.classList.add('hide-active');
    } else {
        bookDescription.hidden = true;
        e.target.firstChild.textContent = 'SHOW DESCRIPTION';
        e.target.firstElementChild.classList.remove('hide-active');
    }
}

function Book(title, author, description, pagesNumber, wasRead) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.pagesNumber = pagesNumber;
    this.wasRead = wasRead;
}

function toggleDarkMode(e) {
    return (document.body.classList.contains('dark')) ? document.body.classList.remove('dark') : document.body.classList.add('dark');
}

updateLibrary();