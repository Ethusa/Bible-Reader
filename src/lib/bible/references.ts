import { getBookByYouVersionCode, getBookById } from './books';

export interface ScriptureReference {
  bookId: string;
  bookCode: string;
  chapter: number;
}

export function formatReferenceId(bookCode: string, chapter: number): string {
  return `${bookCode.toUpperCase()}.${chapter}`;
}

export function parseReferenceId(refId: string): ScriptureReference | null {
  const parts = refId.split('.');
  if (parts.length !== 2) return null;
  const bookCode = parts[0].toUpperCase();
  const chapter = parseInt(parts[1], 10);
  if (isNaN(chapter)) return null;

  const book = getBookByYouVersionCode(bookCode);
  if (!book) return null;

  return {
    bookId: book.id,
    bookCode: book.youVersionCode,
    chapter
  };
}

export function formatHumanReference(bookCode: string, chapter: number): string {
  const book = getBookByYouVersionCode(bookCode);
  const name = book ? book.name : bookCode;
  return `${name} ${chapter}`;
}

export function formatGroupedReferences(assignments: { bookCode: string; chapter: number }[]): string[] {
  if (!assignments || assignments.length === 0) return [];

  const grouped: { [bookCode: string]: number[] } = {};
  for (const item of assignments) {
    if (!grouped[item.bookCode]) {
      grouped[item.bookCode] = [];
    }
    grouped[item.bookCode].push(item.chapter);
  }

  const result: string[] = [];
  for (const bookCode of Object.keys(grouped)) {
    const book = getBookByYouVersionCode(bookCode);
    const bookName = book ? book.name : bookCode;
    const chapters = grouped[bookCode].sort((a, b) => a - b);

    if (chapters.length === 1) {
      result.push(`${bookName} ${chapters[0]}`);
    } else {
      // Check if consecutive
      let isConsecutive = true;
      for (let i = 1; i < chapters.length; i++) {
        if (chapters[i] !== chapters[i - 1] + 1) {
          isConsecutive = false;
          break;
        }
      }

      if (isConsecutive) {
        result.push(`${bookName} ${chapters[0]}–${chapters[chapters.length - 1]}`);
      } else {
        result.push(`${bookName} ${chapters.join(', ')}`);
      }
    }
  }

  return result;
}
