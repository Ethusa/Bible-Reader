export const YOUVERSION_ESV_VERSION_ID = '59';

export function buildYouVersionWebUrl(bookCode: string, chapter: number): string {
  const cleanBook = bookCode.trim().toUpperCase();
  return `https://www.bible.com/bible/${YOUVERSION_ESV_VERSION_ID}/${cleanBook}.${chapter}.ESV`;
}

export function buildYouVersionDeepLink(bookCode: string, chapter: number): string {
  const cleanBook = bookCode.trim().toUpperCase();
  return `youversion://bible?reference=${cleanBook}.${chapter}&version=${YOUVERSION_ESV_VERSION_ID}`;
}

export function launchYouVersionPassage(bookCode: string, chapter: number): void {
  const webUrl = buildYouVersionWebUrl(bookCode, chapter);
  const deepLink = buildYouVersionDeepLink(bookCode, chapter);

  // Check if browser/window environment exists
  if (typeof window === 'undefined') return;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    let appOpened = false;
    const start = Date.now();

    const handleBlur = () => {
      appOpened = true;
    };
    window.addEventListener('blur', handleBlur, { once: true });

    // Attempt native scheme launch
    window.location.href = deepLink;

    setTimeout(() => {
      window.removeEventListener('blur', handleBlur);
      // If user hasn't switched out of browser after 600ms, open web URL fallback
      if (!appOpened && Date.now() - start < 1500) {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }
    }, 600);
  } else {
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  }
}
