export interface BibleBook {
  id: string;
  name: string;
  abbreviation: string;
  testament: 'OT' | 'NT';
  chapters: number;
  canonicalOrder: number;
  youVersionCode: string;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // OLD TESTAMENT
  { id: 'genesis', name: 'Genesis', abbreviation: 'Gen', testament: 'OT', chapters: 50, canonicalOrder: 1, youVersionCode: 'GEN' },
  { id: 'exodus', name: 'Exodus', abbreviation: 'Exo', testament: 'OT', chapters: 40, canonicalOrder: 2, youVersionCode: 'EXO' },
  { id: 'leviticus', name: 'Leviticus', abbreviation: 'Lev', testament: 'OT', chapters: 27, canonicalOrder: 3, youVersionCode: 'LEV' },
  { id: 'numbers', name: 'Numbers', abbreviation: 'Num', testament: 'OT', chapters: 36, canonicalOrder: 4, youVersionCode: 'NUM' },
  { id: 'deuteronomy', name: 'Deuteronomy', abbreviation: 'Deut', testament: 'OT', chapters: 34, canonicalOrder: 5, youVersionCode: 'DEU' },
  { id: 'joshua', name: 'Joshua', abbreviation: 'Josh', testament: 'OT', chapters: 24, canonicalOrder: 6, youVersionCode: 'JOS' },
  { id: 'judges', name: 'Judges', abbreviation: 'Judg', testament: 'OT', chapters: 21, canonicalOrder: 7, youVersionCode: 'JDG' },
  { id: 'ruth', name: 'Ruth', abbreviation: 'Ruth', testament: 'OT', chapters: 4, canonicalOrder: 8, youVersionCode: 'RUT' },
  { id: '1samuel', name: '1 Samuel', abbreviation: '1 Sam', testament: 'OT', chapters: 31, canonicalOrder: 9, youVersionCode: '1SA' },
  { id: '2samuel', name: '2 Samuel', abbreviation: '2 Sam', testament: 'OT', chapters: 24, canonicalOrder: 10, youVersionCode: '2SA' },
  { id: '1kings', name: '1 Kings', abbreviation: '1 Kgs', testament: 'OT', chapters: 22, canonicalOrder: 11, youVersionCode: '1KI' },
  { id: '2kings', name: '2 Kings', abbreviation: '2 Kgs', testament: 'OT', chapters: 25, canonicalOrder: 12, youVersionCode: '2KI' },
  { id: '1chronicles', name: '1 Chronicles', abbreviation: '1 Chr', testament: 'OT', chapters: 29, canonicalOrder: 13, youVersionCode: '1CH' },
  { id: '2chronicles', name: '2 Chronicles', abbreviation: '2 Chr', testament: 'OT', chapters: 36, canonicalOrder: 14, youVersionCode: '2CH' },
  { id: 'ezra', name: 'Ezra', abbreviation: 'Ezra', testament: 'OT', chapters: 10, canonicalOrder: 15, youVersionCode: 'EZR' },
  { id: 'nehemiah', name: 'Nehemiah', abbreviation: 'Neh', testament: 'OT', chapters: 13, canonicalOrder: 16, youVersionCode: 'NEH' },
  { id: 'esther', name: 'Esther', abbreviation: 'Esth', testament: 'OT', chapters: 10, canonicalOrder: 17, youVersionCode: 'EST' },
  { id: 'job', name: 'Job', abbreviation: 'Job', testament: 'OT', chapters: 42, canonicalOrder: 18, youVersionCode: 'JOB' },
  { id: 'psalms', name: 'Psalms', abbreviation: 'Ps', testament: 'OT', chapters: 150, canonicalOrder: 19, youVersionCode: 'PSA' },
  { id: 'proverbs', name: 'Proverbs', abbreviation: 'Prov', testament: 'OT', chapters: 31, canonicalOrder: 20, youVersionCode: 'PRO' },
  { id: 'ecclesiastes', name: 'Ecclesiastes', abbreviation: 'Eccl', testament: 'OT', chapters: 12, canonicalOrder: 21, youVersionCode: 'ECC' },
  { id: 'songofsolomon', name: 'Song of Solomon', abbreviation: 'Song', testament: 'OT', chapters: 8, canonicalOrder: 22, youVersionCode: 'SNG' },
  { id: 'isaiah', name: 'Isaiah', abbreviation: 'Isa', testament: 'OT', chapters: 66, canonicalOrder: 23, youVersionCode: 'ISA' },
  { id: 'jeremiah', name: 'Jeremiah', abbreviation: 'Jer', testament: 'OT', chapters: 52, canonicalOrder: 24, youVersionCode: 'JER' },
  { id: 'lamentations', name: 'Lamentations', abbreviation: 'Lam', testament: 'OT', chapters: 5, canonicalOrder: 25, youVersionCode: 'LAM' },
  { id: 'ezekiel', name: 'Ezekiel', abbreviation: 'Ezek', testament: 'OT', chapters: 48, canonicalOrder: 26, youVersionCode: 'EZK' },
  { id: 'daniel', name: 'Daniel', abbreviation: 'Dan', testament: 'OT', chapters: 12, canonicalOrder: 27, youVersionCode: 'DAN' },
  { id: 'hosea', name: 'Hosea', abbreviation: 'Hos', testament: 'OT', chapters: 14, canonicalOrder: 28, youVersionCode: 'HOS' },
  { id: 'joel', name: 'Joel', abbreviation: 'Joel', testament: 'OT', chapters: 3, canonicalOrder: 29, youVersionCode: 'JOL' },
  { id: 'amos', name: 'Amos', abbreviation: 'Amos', testament: 'OT', chapters: 9, canonicalOrder: 30, youVersionCode: 'AMO' },
  { id: 'obadiah', name: 'Obadiah', abbreviation: 'Obad', testament: 'OT', chapters: 1, canonicalOrder: 31, youVersionCode: 'OBA' },
  { id: 'jonah', name: 'Jonah', abbreviation: 'Jonah', testament: 'OT', chapters: 4, canonicalOrder: 32, youVersionCode: 'JON' },
  { id: 'micah', name: 'Micah', abbreviation: 'Mic', testament: 'OT', chapters: 7, canonicalOrder: 33, youVersionCode: 'MIC' },
  { id: 'nahum', name: 'Nahum', abbreviation: 'Nah', testament: 'OT', chapters: 3, canonicalOrder: 34, youVersionCode: 'NAM' },
  { id: 'habakkuk', name: 'Habakkuk', abbreviation: 'Hab', testament: 'OT', chapters: 3, canonicalOrder: 35, youVersionCode: 'HAB' },
  { id: 'zephaniah', name: 'Zephaniah', abbreviation: 'Zeph', testament: 'OT', chapters: 3, canonicalOrder: 36, youVersionCode: 'ZEP' },
  { id: 'haggai', name: 'Haggai', abbreviation: 'Hag', testament: 'OT', chapters: 2, canonicalOrder: 37, youVersionCode: 'HAG' },
  { id: 'zechariah', name: 'Zechariah', abbreviation: 'Zech', testament: 'OT', chapters: 14, canonicalOrder: 38, youVersionCode: 'ZEC' },
  { id: 'malachi', name: 'Malachi', abbreviation: 'Mal', testament: 'OT', chapters: 4, canonicalOrder: 39, youVersionCode: 'MAL' },

  // NEW TESTAMENT
  { id: 'matthew', name: 'Matthew', abbreviation: 'Matt', testament: 'NT', chapters: 28, canonicalOrder: 40, youVersionCode: 'MAT' },
  { id: 'mark', name: 'Mark', abbreviation: 'Mark', testament: 'NT', chapters: 16, canonicalOrder: 41, youVersionCode: 'MRK' },
  { id: 'luke', name: 'Luke', abbreviation: 'Luke', testament: 'NT', chapters: 24, canonicalOrder: 42, youVersionCode: 'LUK' },
  { id: 'john', name: 'John', abbreviation: 'John', testament: 'NT', chapters: 21, canonicalOrder: 43, youVersionCode: 'JHN' },
  { id: 'acts', name: 'Acts', abbreviation: 'Acts', testament: 'NT', chapters: 28, canonicalOrder: 44, youVersionCode: 'ACT' },
  { id: 'romans', name: 'Romans', abbreviation: 'Rom', testament: 'NT', chapters: 16, canonicalOrder: 45, youVersionCode: 'ROM' },
  { id: '1corinthians', name: '1 Corinthians', abbreviation: '1 Cor', testament: 'NT', chapters: 16, canonicalOrder: 46, youVersionCode: '1CO' },
  { id: '2corinthians', name: '2 Corinthians', abbreviation: '2 Cor', testament: 'NT', chapters: 13, canonicalOrder: 47, youVersionCode: '2CO' },
  { id: 'galatians', name: 'Galatians', abbreviation: 'Gal', testament: 'NT', chapters: 6, canonicalOrder: 48, youVersionCode: 'GAL' },
  { id: 'ephesians', name: 'Ephesians', abbreviation: 'Eph', testament: 'NT', chapters: 6, canonicalOrder: 49, youVersionCode: 'EPH' },
  { id: 'philippians', name: 'Philippians', abbreviation: 'Phil', testament: 'NT', chapters: 4, canonicalOrder: 50, youVersionCode: 'PHP' },
  { id: 'colossians', name: 'Colossians', abbreviation: 'Col', testament: 'NT', chapters: 4, canonicalOrder: 51, youVersionCode: 'COL' },
  { id: '1thessalonians', name: '1 Thessalonians', abbreviation: '1 Thess', testament: 'NT', chapters: 5, canonicalOrder: 52, youVersionCode: '1TH' },
  { id: '2thessalonians', name: '2 Thessalonians', abbreviation: '2 Thess', testament: 'NT', chapters: 3, canonicalOrder: 53, youVersionCode: '2TH' },
  { id: '1timothy', name: '1 Timothy', abbreviation: '1 Tim', testament: 'NT', chapters: 6, canonicalOrder: 54, youVersionCode: '1TI' },
  { id: '2timothy', name: '2 Timothy', abbreviation: '2 Tim', testament: 'NT', chapters: 4, canonicalOrder: 55, youVersionCode: '2TI' },
  { id: 'titus', name: 'Titus', abbreviation: 'Titus', testament: 'NT', chapters: 3, canonicalOrder: 56, youVersionCode: 'TIT' },
  { id: 'philemon', name: 'Philemon', abbreviation: 'Phlm', testament: 'NT', chapters: 1, canonicalOrder: 57, youVersionCode: 'PHM' },
  { id: 'hebrews', name: 'Hebrews', abbreviation: 'Heb', testament: 'NT', chapters: 13, canonicalOrder: 58, youVersionCode: 'HEB' },
  { id: 'james', name: 'James', abbreviation: 'Jas', testament: 'NT', chapters: 5, canonicalOrder: 59, youVersionCode: 'JAS' },
  { id: '1peter', name: '1 Peter', abbreviation: '1 Pet', testament: 'NT', chapters: 5, canonicalOrder: 60, youVersionCode: '1PE' },
  { id: '2peter', name: '2 Peter', abbreviation: '2 Pet', testament: 'NT', chapters: 3, canonicalOrder: 61, youVersionCode: '2PE' },
  { id: '1john', name: '1 John', abbreviation: '1 John', testament: 'NT', chapters: 5, canonicalOrder: 62, youVersionCode: '1JN' },
  { id: '2john', name: '2 John', abbreviation: '2 John', testament: 'NT', chapters: 1, canonicalOrder: 63, youVersionCode: '2JN' },
  { id: '3john', name: '3 John', abbreviation: '3 John', testament: 'NT', chapters: 1, canonicalOrder: 64, youVersionCode: '3JN' },
  { id: 'jude', name: 'Jude', abbreviation: 'Jude', testament: 'NT', chapters: 1, canonicalOrder: 65, youVersionCode: 'JUD' },
  { id: 'revelation', name: 'Revelation', abbreviation: 'Rev', testament: 'NT', chapters: 22, canonicalOrder: 66, youVersionCode: 'REV' }
];

export function getBookById(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id.toLowerCase() === id.toLowerCase());
}

export function getBookByYouVersionCode(code: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.youVersionCode.toUpperCase() === code.toUpperCase());
}
