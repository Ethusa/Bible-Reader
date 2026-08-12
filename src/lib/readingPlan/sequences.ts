import { BIBLE_BOOKS } from '../bible/books';
import type { ChapterUnit, TrackSlug } from './types';

export function buildNTSequence(): ChapterUnit[] {
  const ntBooks = BIBLE_BOOKS.filter((b) => b.testament === 'NT').sort(
    (a, b) => a.canonicalOrder - b.canonicalOrder
  );

  const singleRotation: { bookId: string; bookCode: string; chapter: number }[] = [];
  for (const book of ntBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      singleRotation.push({
        bookId: book.id,
        bookCode: book.youVersionCode,
        chapter: ch
      });
    }
  }

  // 4 Rotations
  const fullSequence: ChapterUnit[] = [];
  for (let rot = 1; rot <= 4; rot++) {
    singleRotation.forEach((item, index) => {
      fullSequence.push({
        ...item,
        rotationNumber: rot,
        positionInTrack: index + 1
      });
    });
  }

  return fullSequence;
}

export function buildOTSequence(): ChapterUnit[] {
  // Exclude Psalms ('psalms') and Proverbs ('proverbs')
  const otBooks = BIBLE_BOOKS.filter(
    (b) => b.testament === 'OT' && b.id !== 'psalms' && b.id !== 'proverbs'
  ).sort((a, b) => a.canonicalOrder - b.canonicalOrder);

  const fullSequence: ChapterUnit[] = [];
  let pos = 1;
  for (const book of otBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      fullSequence.push({
        bookId: book.id,
        bookCode: book.youVersionCode,
        chapter: ch,
        rotationNumber: 1,
        positionInTrack: pos++
      });
    }
  }

  return fullSequence;
}

export function buildPsalmsSequence(): ChapterUnit[] {
  const psalmBook = BIBLE_BOOKS.find((b) => b.id === 'psalms')!;
  const fullSequence: ChapterUnit[] = [];

  for (let rot = 1; rot <= 2; rot++) {
    for (let ch = 1; ch <= psalmBook.chapters; ch++) {
      fullSequence.push({
        bookId: psalmBook.id,
        bookCode: psalmBook.youVersionCode,
        chapter: ch,
        rotationNumber: rot,
        positionInTrack: ch
      });
    }
  }

  return fullSequence;
}

export function buildProverbsSequence(): ChapterUnit[] {
  const proverbsBook = BIBLE_BOOKS.find((b) => b.id === 'proverbs')!;
  const fullSequence: ChapterUnit[] = [];

  for (let rot = 1; rot <= 4; rot++) {
    for (let ch = 1; ch <= proverbsBook.chapters; ch++) {
      fullSequence.push({
        bookId: proverbsBook.id,
        bookCode: proverbsBook.youVersionCode,
        chapter: ch,
        rotationNumber: rot,
        positionInTrack: ch
      });
    }
  }

  return fullSequence;
}

export function getTrackMasterSequence(trackSlug: TrackSlug): ChapterUnit[] {
  switch (trackSlug) {
    case 'new_testament':
      return buildNTSequence();
    case 'old_testament':
      return buildOTSequence();
    case 'psalms':
      return buildPsalmsSequence();
    case 'proverbs':
      return buildProverbsSequence();
  }
}
