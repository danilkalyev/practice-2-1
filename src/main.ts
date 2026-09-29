import './styles.css';
import { Book, BookFilter, Catalog, formatBook } from './task1-types';
import { addBook, removeBook } from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from './task4-integration';

// Готовые данные для старта
const initialBooks: Book[] = [
  { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023 },
  { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
];

// Каталог, в котором хранятся все книги
let catalog: Catalog = {};
for (const book of initialBooks) {
  catalog = addBook(catalog, book);
}

const bookList = document.getElementById('bookList')!;
const form = document.getElementById('bookForm') as HTMLFormElement;
const authorInput = document.getElementById('filterAuthor') as HTMLInputElement;
const yearInput = document.getElementById('filterYear') as HTMLInputElement;

function renderBooks(books: Book[]) {
  bookList.innerHTML = '';

  for (const book of books) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.textContent = formatBook(book) + ' ';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
      catalog = removeBook(catalog, book.id);
      showBooks();
    });

    card.appendChild(deleteButton);
    bookList.appendChild(card);
  }
}

// Берём книги из каталога, применяем фильтры из полей и рисуем
function showBooks() {
  const filters: BookFilter[] = [];

  const author = authorInput.value.trim();
  if (author !== '') {
    filters.push(filterByAuthor(author));
  }

  const year = yearInput.value;
  if (year !== '') {
    filters.push(filterByMinYear(Number(year)));
  }

  const books = Object.values(catalog);
  renderBooks(applyFilters(books, filters));
}

// Отрисовать начальные книги
showBooks();

// Обработчик формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const book = createBookFromForm(new FormData(form));
    catalog = addBook(catalog, book);
    form.reset();
    showBooks();
  } catch (error) {
    alert((error as Error).message);
  }
});

// Обработчик фильтров
document.getElementById('applyFilters')!.addEventListener('click', () => {
  showBooks();
});
