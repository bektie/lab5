const async = require('async');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Genre = require('./models/genre');
const Book = require('./models/book');
const BookInstance = require('./models/bookinstance');

const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

mongoose.set('strictQuery', false);
mongoose.connect(mongoDB)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const authors = [];
const genres = [];
const books = [];
const bookinstances = [];

async function authorCreate(first_name, family_name, d_birth, d_death) {
    const author = new Author({ first_name, family_name, date_of_birth: d_birth, date_of_death: d_death });
    await author.save();
    authors.push(author);
    return author;
}

async function genreCreate(name) {
    const genre = new Genre({ name });
    await genre.save();
    genres.push(genre);
    return genre;
}

async function bookCreate(title, summary, isbn, author, genre) {
    const book = new Book({ title, summary, isbn, author, genre });
    await book.save();
    books.push(book);
    return book;
}

async function bookInstanceCreate(book, imprint, due_back, status) {
    const bookInstance = new BookInstance({ book, imprint, due_back, status });
    await bookInstance.save();
    bookinstances.push(bookInstance);
    return bookInstance;
}

async function createGenresAuthors() {
    await genreCreate('Fantasy');
    await genreCreate('Science Fiction');
    await genreCreate('French Poetry');
    await authorCreate('Patrick', 'Rothfuss', '1973-06-06', null);
    await authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06');
    await authorCreate('Bob', 'Billings', null, null);
}

async function createBooks() {
    await bookCreate(
        'The Name of the Wind',
        'A book about a magically gifted young man.',
        '9781473211896',
        authors[0],
        [genres[0]]
    );
    await bookCreate(
        'The Wise Man\'s Fear',
        'The second volume of the Kingkiller Chronicle.',
        '9788401352836',
        authors[0],
        [genres[0]]
    );
    await bookCreate(
        'Foundation',
        'A science fiction novel about the collapse of a Galactic Empire.',
        '9780008117498',
        authors[1],
        [genres[1]]
    );
}

async function createBookInstances() {
    await bookInstanceCreate(books[0], '1st edition', '2025-07-01', 'Available');
    await bookInstanceCreate(books[1], '2nd edition', '2025-07-15', 'Loaned');
    await bookInstanceCreate(books[2], '3rd edition', '2025-08-01', 'Reserved');
}

(async () => {
    try {
        await createGenresAuthors();
        await createBooks();
        await createBookInstances();
        console.log('Data successfully loaded.');
    } catch (err) {
        console.error('FINAL ERROR: ' + err);
    } finally {
        mongoose.connection.close();
    }
})();