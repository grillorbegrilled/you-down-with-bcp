function displayEventDetails() {
    const now = new Date();
     
    const week = getWeek(now);
    const feast = getLiturgicalDate(now);
    const liturgicalDay = synthDate(week, feast, now.getDay());

    getProper2(liturgicalDay).then(details => {
        const collect = synthCollects(details.c, week);
        document.getElementById('nameOfTheDay').textContent = `${getDayName(liturgicalDay)}`;
        if (collect.includes("</p><p>")) document.getElementById('c_h').textContent = "The Collects";
        document.getElementById('c').innerHTML = collect;
        document.getElementById('e_cit').textContent = `${details.e.cit}`;
        document.getElementById('e_txt').innerHTML = makeP(makeDropCap(details.e.txt));
        document.getElementById('g_cit').textContent = `${details.g.cit}`;
        document.getElementById('g_txt').innerHTML = makeP(makeDropCap(details.g.txt));
    });

    if (isFast(now)) document.getElementById('fastDayLabel').textContent = "FAST.";

    document.getElementById('bookmark').src = "images/bookmarks/" + getBookmarkColor(liturgicalDay, now.getMonth(), now.getDate()) + ".gif";
    document.getElementById('euchMarg').src = getEuchMargin(now, liturgicalDay);

    const element = document.getElementById('top-image');
element.style.backgroundImage = `url("${getTopImage(liturgicalDay, now.getMonth(), now.getDate())}")`;
element.style.backgroundRepeat = 'no-repeat';
element.style.backgroundPosition = 'top center';
    const hymns = getHymns(liturgicalDay);
    if (hymns) {
        if (hymns.multiple) document.getElementById('hymn-title').textContent = "Hymns";
        document.getElementById('hymn').innerHTML = hymns.hymns;
    }

    getOffice(now, week, feast);

    getLesson(liturgicalDay).then(lessonContent => {
        document.getElementById('tab-3').innerHTML = lessonContent;
    });
}

async function getProper2(liturgicalDay) {
    if (/^A\d$/.test(liturgicalDay) || liturgicalDay === "Xmas" || liturgicalDay === "Stephen" || liturgicalDay === "JohnEvangelist" || liturgicalDay === "Innocents" || liturgicalDay === "Circ" ||
        liturgicalDay === "Epiphany" || /^E\d$/.test(liturgicalDay)) return getProperFromFile(liturgicalDay, "./ceg/advent-epi.json");
    else if (liturgicalDay === "LXX" || liturgicalDay === "LX" || liturgicalDay === "L" || liturgicalDay === "AW" || /^L\d$/.test(liturgicalDay) ||
            liturgicalDay === "Palm" || /^HW.*$/.test(liturgicalDay) || liturgicalDay === "GF" || liturgicalDay === "EE" ||
            /^Easter.*$/.test(liturgicalDay) || /^Ea\d$/.test(liturgicalDay) || /^Asc.*$/.test(liturgicalDay) || /^Whit...$/.test(liturgicalDay)) return getProperFromFile(liturgicalDay, "./ceg/lxx-whitsun.json");
    else if (/^T\d{1,2}$/.test(liturgicalDay) || liturgicalDay === "SNBA" || liturgicalDay === "Trinity") return getProperFromFile(liturgicalDay, "./ceg/trinity.json");
    else if (liturgicalDay === "IndependenceDay" || liturgicalDay === "ThanksgivingDay") return getProperFromFile(liturgicalDay, "./ceg/nationaldays-us.json");
    else if (liturgicalDay === "Patrick" || liturgicalDay === "Joseph" || liturgicalDay === "SuperWesleyBros" || liturgicalDay === "ElizabethII" || liturgicalDay === "WeddingAnniversary") return getProperFromFile(liturgicalDay, "./ceg/custom-festivals.json");
    else return getProperFromFile(liturgicalDay, "./ceg/1662festivals.json");
}

async function getProperFromFile(liturgicalDay, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data[liturgicalDay] || ""; // Return the actual value for the liturgicalDay or an empty string if not found
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return "";
    }
}

function synthCollects(cotd, week) {
    const collectP = makeP(makeDropCap(cotd));
    
    //TODO commemoration
    //TODO eves/vigils (4:00 PM or later)
    
    const seasonal = getSeasonalCollect(week);

    let result = collectP;

    if (seasonal && collectP !== seasonal)
        result += seasonal;
    
    return result;
}

function getSeasonalCollect(week) {
    switch (week) {
        case "A1":
        case "A2":
        case "A3":
        case "A4":
            return makeP("ALMIGHTY God, give us grace that we may cast away the works of darkness, and put upon us the armour of light, now in the time of this mortal life in which thy Son Jesus Christ came to visit us in great humility; that in the last day, when he shall come again in his glorious majesty to judge both the quick and the dead, we may rise to the life immortal; through him who liveth and reigneth with thee and the Holy Ghost, one God, now and for ever. Amen.");
            break;
        case "Xmas":
        case "Stephen":
        case "JohnEvangelist":
        case "Innocents":
        case "X1":
            return makeP("ALMIGHTY God, who hast given us thy only-begotten Son to take our nature upon him, and as at this time to be born of a pure Virgin; Grant that we being regenerate, and made thy children by adoption and grace, may daily be renewed by thy Holy Spirit; through the same our Lord Jesus Christ, who liveth and reigneth with thee and the same Spirit, ever one God, world without end. Amen.");
            break;
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
        case "L5":
        case "L6":
            return makeP("ALMIGHTY and everlasting God, who hatest nothing that thou hast made and dost forgive the sins of all them that are penitent; Create and make in us new and contrite hearts, that we, worthily lamenting our sins, and acknowledging our wretchedness, may obtain of thee, the God of all mercy, perfect remission and forgiveness; through Jesus Christ our Lord. Amen.");
            break;
        default:
            return "";
            break;
    }
}

//Commemoration collects

function makeP(text){
    if (text == "" || !text) return "";
    
    return "<p>" + text + "</p>";
}

function makeDropCap(text) {
  if (text.length === 0) return text;
  const firstLetter = text.charAt(0);
  const restOfString = text.slice(1);
  return `<span class="drop-cap">${firstLetter}</span>${restOfString}`;
}
