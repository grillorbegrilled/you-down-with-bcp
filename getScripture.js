async function fetchBibleVerse(book, chapter, verses = "") {
            const resultDiv = document.getElementById('result');
            const bookLower = book.replace(/\s+/g, '').toLowerCase();
            let verseStart, verseEnd;

            if (verses) {
                if (verses.includes('-')) {
                    // Handle range of verses
                    [verseStart, verseEnd] = verses.split('-');
                } else if (verses.includes('ff')) {
                    // Handle "ff" (following verses)
                    verseStart = verses.replace('ff', '');
                    verseEnd = 'end'; // Placeholder for actual logic
                } else {
                    // Single verse or multiple verses separated by commas
                    verseStart = verses;
                }
            }

            try {
                // Fetch Bible chapter
                //const response = await fetch(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-US-kjvcpb/books/${bookLower}/chapters/${chapter}.json`);
                const response = await fetch(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${bookLower}/chapters/${chapter}.json`);
                const data = await response.json();

                // Convert chapter and verse properties to numbers
                data.data.forEach(verse => {
                    verse.verse = Number(verse.verse);
                });

                // Filter and concatenate verses
                let versesText = '';
                data.data.forEach(verse => {
                    if (!verses || (verse.verse >= verseStart && (verseEnd === 'end' || verse.verse <= verseEnd))) {
                        versesText += verse.text + ' ';
                    }
                });

                // Display result
                return versesText.trim().replace(/¶/g, "");
            } catch (error) {
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
            } else if ((bibleReference.match(/:/g) || []).length <= 1) {
                // Zero or one colon
                const [bookChapter, verses] = bibleReference.split(':');
                const [book, chapter] = splitAtLastSpace(bookChapter);
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
