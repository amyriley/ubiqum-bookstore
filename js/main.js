var data;

var url = 'https://api.myjson.com/bins/udbm5'

var request = {
    method: 'GET',
    body: JSON.stringify(data),
};

fetch(url, request)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        initializeBooks(data);
        document.getElementById('search-bar').addEventListener('input', function () {
            applySearchFilter(data)
        });
        document.getElementById('more-info').addEventListener('click', function () {
            getCurrentBook(event)
        });
    })
    .catch(error => {
        console.log(error);
    })

function createBookCards(books, bookDisplay) {

    for (var i = 0; i < books.length; i++) {

        var card = document.createElement('div');
        card.className = 'card';
        var flipCard = document.createElement('div');
        flipCard.className = 'flip-card';
        card.appendChild(flipCard);
        var flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';
        flipCard.appendChild(flipCardInner);
        var flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        flipCardInner.appendChild(flipCardFront);
        var cardBodyFront = document.createElement('div');
        cardBodyFront.className = 'card-body';
        flipCardFront.appendChild(cardBodyFront);
        var coverImage = document.createElement('IMG');
        coverImage.setAttribute('src', books[i].portada);
        coverImage.setAttribute('id', 'portada');
        coverImage.className = 'img-responsive';
        cardBodyFront.appendChild(coverImage);

        var flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
    
        var cardBodyBack = document.createElement('div');
        cardBodyBack.className = 'card-body';
        cardBodyBack.setAttribute('id', 'card-body-back');

        var title = books[i].titulo;
        var description = books[i].descripcion;

        var cardTitle = document.createElement('h5');
        var cardTitleText = document.createTextNode(title);
        cardTitle.className = 'card-title';
        cardTitle.text = books.titulo;

        cardTitle.appendChild(cardTitleText);

        var cardDescription = document.createElement('p');
        cardDescription.className = 'card-text';
        cardDescriptionText = document.createTextNode(description);

        cardDescription.appendChild(cardDescriptionText);

        var moreInfoButton = document.createElement('button');
        moreInfoButton.innerHTML = 'More info';
        moreInfoButton.className = 'btn btn-primary';
        moreInfoButton.setAttribute('data-toggle', 'modal');
        moreInfoButton.setAttribute('data-target', '#exampleModal');
        moreInfoButton.setAttribute('id', 'more-info');
        
        cardBodyBack.appendChild(cardTitle);
        cardBodyBack.appendChild(cardDescription);
        cardBodyBack.appendChild(moreInfoButton);
        flipCardBack.appendChild(cardBodyBack);
        flipCardInner.appendChild(flipCardBack);

        if (i % 3 == 0) {
            var row = document.createElement('div');
            row.className = 'row';
            bookDisplay.appendChild(row);
            var cell = document.createElement('div');
            cell.className = 'col-sm px-0';
            cell.appendChild(card);
            row.appendChild(cell);
        }

        if (i % 3 != 0) {
            var column = document.createElement('div');
            column.className = 'col-sm px-0';
            column.appendChild(card);
            row.appendChild(column);
        }

        // var carouselInner = document.getElementById('carousel-inner');
        // var carouselItem = document.createElement('div');
        // carouselItem.className = 'carousel-item active';
        
        // var carouselItem = document.getElementById('carousel-item')
        // var modalImage = document.createElement('IMG');
        // modalImage.setAttribute('src', books[i].detalle);
        // modalImage.setAttribute('id', 'modal-image');
        // modalImage.className = 'd-block w-100';
        // carouselItem.appendChild(modalImage);
        // carouselInner.appendChild(carouselItem);

        // for (var j = i + 1; j < books.length; j++) {
        //     var nextCarouselItem = document.createElement('div');
        //     nextCarouselItem.className = 'carousel-item';
        //     var carouselImage = document.createElement('IMG');
        //     carouselImage.setAttribute('src', books[j].detalle);
        //     carouselImage.className = 'd-block w-100';
        //     nextCarouselItem.appendChild(carouselImage);
        //     carouselInner.appendChild(nextCarouselItem);
        // }

    }
}

function startCarousel(books) {
    
    for (var i = 0; i < books.length; i++) {
        var carouselItem = document.getElementById('carousel-item')
        var modalImage = document.createElement('IMG');
        modalImage.setAttribute('src', books[i].detalle);
        modalImage.setAttribute('id', 'modal-image');
        modalImage.className = 'd-block w-100';
        carouselItem.appendChild(modalImage);
        carouselInner.appendChild(carouselItem);
    }
}

function getCurrentBook(event) {
    console.log(event.target.id);
}

// function startCarousel(books) {



//     for (var i = 0; i < books.length; i++) {
//         var carouselInner = document.getElementById('carousel-inner');
//         var carouselItem = document.createElement('div');
//         carouselItem.className = 'carousel-item active';
//         var modalImage = document.createElement('IMG');
//         modalImage.setAttribute('src', books[i].detalle);
//         modalImage.setAttribute('id', 'modal-image');
//         modalImage.className = 'd-block w-100';
//         carouselItem.appendChild(modalImage);
//         carouselInner.appendChild(carouselItem);

//         for (var j = i + 1; j < books.length; j++) {
//             var nextCarouselItem = document.createElement('div');
//             nextCarouselItem.className = 'carousel-item';
//             var carouselImage = document.createElement('IMG');
//             carouselImage.setAttribute('src', books[j].detalle);
//             carouselImage.className = 'd-block w-100';
//             nextCarouselItem.appendChild(carouselImage);
//             carouselInner.appendChild(nextCarouselItem);
//         }
//     }
// }

function initializeBooks(data) {
    var bookDisplay = document.getElementById('book-rows');
    createBookCards(data.books, bookDisplay);
}

function applySearchFilter(data) {
    var searchInput = document.getElementById('search-bar').value.toLowerCase();
    var booksToDisplay = [];
    var books = data.books;

    if (searchInput.length === 0) {
        booksToDisplay = books;
    } else {
        booksToDisplay = getSearchMatchBooks(books, searchInput);
    }

    clearBooks();

    var bookDisplay = document.getElementById('book-rows');
    createBookCards(booksToDisplay, bookDisplay);
}

function getSearchMatchBooks(books, searchInput) {
    var matchedBooks = [];

    for (var i = 0; i < books.length; i++) {
        if (books[i].titulo.toLowerCase().includes(searchInput)) {
            var book = books[i];
            matchedBooks.push(book);
        }
    }

    return matchedBooks;
}

function clearBooks() {
    document.getElementById('book-rows').innerHTML = "";
}









