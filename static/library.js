let library = [
    {
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J. K. Rowling',
        description: `Harry Potter is in his fifth year at Hogwarts School as the adventures continue. There is a door at the end of a silent corridor. And it's haunting Harry Potter's dreams. Why else would he be waking in the middle of the night, screaming in terror? Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defence Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams.`,
        pagesNumber: 766,
        wasRead: true
    },
    {
        title: 'Letters from a Stoic',
        author: 'Lucius Annaeus Seneca',
        description: `For several years of his turbulent life, in which he was dogged by ill health, exile and danger, Seneca was the guiding hand of the Roman Empire. This selection of Seneca's letters shows him upholding the ideals of Stoicism - the wisdom of the self-possessed person immune to life's setbacks - while valuing friendship and courage, and criticizing the harsh treatment of slaves and the cruelties in the gladiatorial arena. A moving and inspiring declaration of the dignity of the individual mind.`,
        pagesNumber: 254,
        wasRead: false
    },
    {
        title: 'I Am a Cat',
        author: 'Natsume Sōseki',
        pagesNumber: 480,
        wasRead: false
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        description: `Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter Gollum.`,
        pagesNumber: 300,
        wasRead: true
    }
];

const form = document.getElementsByName('addBookForm')[0];
const bookLibrary = document.getElementById('libraryBody');
const darkModeBtn = document.getElementById('dark-mode');
const booksProgress = document.getElementById('books-read');
const newBookBtn = document.createElement('div');
newBookBtn.id = 'addNew';
newBookBtn.classList.add('card');
newBookBtn.insertAdjacentHTML('beforeend',
'<span class="material-icons">add_circle</span>');

const modal = document.getElementsByClassName('modal')[0];
const openModalBtn = document.getElementById('addNew');
const closeModalBtn = document.getElementById('close-button');
const darkOverlay = document.getElementById('darkOverlay');

form.addEventListener('submit', addBookToLibrary);
darkModeBtn.addEventListener('click', toggleDarkMode);
newBookBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal)
darkOverlay.addEventListener('click', closeModal);

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
    bookLibrary.append(newBookBtn);
    updateProgressBar();

    for (let button of readButtons) {
        button.addEventListener('click', toggleReadStatus);
    }
    
    for (let button of deleteButtons) {
        button.addEventListener('click', deleteBook);
    }

    for (let button of descButtons) {
        button.addEventListener('click', showDescription);
    }
}

function updateProgressBar() {
    const totalBooks = library.length;

    if (!totalBooks) {
        booksProgress.value = 0;
        return booksProgress.labels[0].textContent = `No books.`;
    }

    const booksRead = library.reduce((total, el) => (el.wasRead) ? total += 1 : total, 0);
    booksProgress.value = booksRead / totalBooks * 100;
    booksProgress.labels[0].textContent = `${booksRead} of ${totalBooks} books read`;
}

function toggleReadStatus(e) {
    const index = e.target.closest('.card').dataset.index;
    if (library[index].wasRead) {
        e.target.innerHTML = `<i class="material-icons">cancel</i> NOT READ`;
        library[index].wasRead = false;
    } else {
        e.target.innerHTML = `<i class="material-icons">check_circle</i> READ`;
        library[index].wasRead = true;
    }
    
    return updateProgressBar();
}

function deleteBook(e) {
    const card = e.target.closest('.card');
    library.splice(card.dataset.index, 1);
    card.remove();
    
    return updateLibrary();
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

// Dark mode functions
function toggleDarkMode(e) {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        e.target.textContent = 'dark_mode';
    } else {
        document.body.classList.add('dark');
        e.target.textContent = 'light_mode';
    }
}

const query = window.matchMedia('(prefers-color-scheme: dark)');
function setInitialTheme(e) {
    if (e.matches) {
        document.body.classList.add('dark');
        darkModeBtn.textContent = 'light_mode';
    }
}

query.addListener(setInitialTheme);
setInitialTheme(query);

// Modal functions
function openModal() {
    darkOverlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal() {
    darkOverlay.removeAttribute('class');
    modal.classList.remove('active');
};


updateLibrary();