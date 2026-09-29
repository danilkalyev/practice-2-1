// Задание 2: Функции работы с каталогом
// Управление данными без мутации исходных объектов (иммутабельность)

// TODO 0: Импортируйте типы Book и Catalog из файла task1-types.ts
import { Book, Catalog } from "./task1-types";

// TODO 1: Добавьте книгу в каталог
// Параметры:
//   - catalog (Catalog): исходный каталог
//   - book (Book): книга для добавления
// Возвращает: новый объект Catalog, содержащий все старые книги и новую
// Подсказка: используйте оператор расширения (spread) `...`, чтобы создать новый объект,
// а не изменять существующий. Ключом должно быть свойство book.id.
export function addBook(catalog: Catalog, book: Book): Catalog {
  // копируем старые книги и добавляем новую
  return {
    ...catalog,
    [book.id]: book,
  };
}

// TODO 2: Удалите книгу из каталога по id
// Параметры:
//   - catalog (Catalog): исходный каталог
//   - id (string): идентификатор книги для удаления
// Возвращает: новый объект Catalog без указанной книги
//  Подсказка: используйте деструктуризацию объекта с вычисляемым ключом и rest-параметром:

export function removeBook(catalog: Catalog, id: string): Catalog {
  // делаем копию, чтобы не менять исходный каталог
  const newCatalog = { ...catalog };
  delete newCatalog[id];
  return newCatalog;
}

// TODO 3: Найдите книгу в каталоге по id
// Параметры:
//   - catalog (Catalog): исходный каталог
//   - id (string): идентификатор искомой книги
// Возвращает: объект Book, если книга найдена, или undefined, если её нет
export function getBook(catalog: Catalog, id: string): Book | undefined {
  return catalog[id];
}
