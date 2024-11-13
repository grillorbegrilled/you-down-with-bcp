async function fetchBibleVerse(book, chapter, verses = "") {
    try {
        const resultDiv = document.getElementById('result');
        const bookLower = book.replace(/\s+/g, '').toLowerCase();
        let verseStart, verseEnd;

        if (verses) {
            if (verses.includes('-')) {
                [verseStart, verseEnd] = verses.split('-').map(Number);
            } else if (verses.includes('ff')) {
                verseStart = Number(verses.replace('ff', ''));
                verseEnd = 'end';
            } else {
                verseStart = Number(verses);
            }
        }

        const response = await fetch(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${bookLower}/chapters/${chapter}.json`);
        const data = await response.json();
        
        data.data.forEach(verse => {
            verse.verse = Number(verse.verse);
        });

        let versesText = '';
        const addedVerses = new Set();
        data.data.forEach(verse => {
            if (!verses || (verse.verse >= verseStart && (verseEnd === 'end' || verse.verse <= verseEnd))) {
                if (!addedVerses.has(verse.verse)) {
                    versesText += verse.text.replace(/\d+(\.\d+)?\b.*/, '').replace("LORD", "Lᴏʀᴅ").replace("GOD", "Gᴏᴅ") + ' ';
                    addedVerses.add(verse.verse);
                }
            }
        });

        return versesText.trim().replace(/¶/g, "");
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error fetching data: ' + error.message;
    }
}


const splitAtLastSpace = str => str.split(/ (?!.* )/);

async function handleBibleReference(bibleReference) {
    const resultDiv = document.getElementById('result');
    var result = "";

    if (bibleReference.includes('&')) {
        // Handle ampersand
        const [firstPart, secondPart] = bibleReference.split('&').map(part => part.trim());
        const book = splitAtLastSpace(firstPart)[0];
        const firstResult = await fetchBibleVerse(book, splitAtLastSpace(firstPart)[1]);
        const secondResult = await fetchBibleVerse(book, secondPart);
        result = `${firstResult} ${secondResult}`;
    } else if (bibleReference.includes(',')) {
        const [firstPart, secondPart] = bibleReference.split(',').map(part => part.trim());
        const [firstBookChapter, firstVerse] = firstPart.split(':');

        const [book, chapter] = splitAtLastSpace(firstBookChapter);

        const firstResult = await fetchBibleVerse(book, chapter, firstVerse);
        const secondResult = await fetchBibleVerse(book, chapter, secondPart);

        result = `${firstResult} ${secondResult}`;
    } else if ((bibleReference.match(/:/g) || []).length <= 1) {
        // Zero or one colon
        const [bookChapter, verses] = bibleReference.split(':');
        let [book, chapter] = splitAtLastSpace(bookChapter);
        if (!chapter) chapter = 1;
        result = await fetchBibleVerse(book, chapter, verses);
    } else {
        // Two colons
        const [firstPart, secondPart] = bibleReference.split('-');
        const [firstBookChapter, firstVerse] = firstPart.split(':');
        const [secondChapter, secondVerse] = secondPart.split(':');

        const [book, firstChapter] = splitAtLastSpace(firstBookChapter);

        const firstResult = await fetchBibleVerse(book, firstChapter, `${firstVerse}ff`);
        const secondResult = await fetchBibleVerse(book, secondChapter, `1-${secondVerse}`);

        result = `${firstResult} ${secondResult}`;
    }

    return result;
}
