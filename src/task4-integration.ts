// Задание 4: Интеграция с DOM (Парсинг сырых данных)
// Преобразование данных из HTML-формы в строго типизированный объект

import { Book } from "./task1-types";

/**
 * Создаёт объект Book из данных HTML-формы.
 *
 * ВАЖНО: Данные из формы всегда приходят как строки.
 * Ваша задача — преобразовать их в правильные типы и проверить границы значений.
 */
export function createBookFromForm(formData: FormData): Book {
  // TODO 1: получаем сырые значения полей формы
  const title = formData.get("title") as string;
  const authorsStr = formData.get("authors") as string;
  const yearStr = formData.get("year") as string;
  const ratingStr = formData.get("rating") as string;

  // TODO 2: разбиваем авторов по запятой, убираем пробелы и пустые строки
  const authors = authorsStr
    .split(",")
    .map((author) => author.trim())
    .filter((author) => author !== "");

  // TODO 3: год — число, если поле заполнено
  let year: number | undefined = undefined;
  if (yearStr) {
    year = parseInt(yearStr, 10);
  }

  // TODO 4: рейтинг — число от 0 до 5, если поле заполнено
  let rating: number | undefined = undefined;
  if (ratingStr) {
    rating = parseFloat(ratingStr);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      throw new Error("Рейтинг должен быть числом от 0 до 5");
    }
  }

  // TODO 5 и 6: генерируем id и возвращаем книгу
  return {
    id: crypto.randomUUID(),
    title: title,
    authors: authors,
    year: year,
    rating: rating,
  };
}
