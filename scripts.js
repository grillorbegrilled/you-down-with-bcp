function displayEventDetails() {
    const now = new Date();
    
    const week = getWeek(now);
    const feast = getLiturgicalDate(now);
    const liturgicalDay = synthDate(week, feast, now.getDay());
    const details = getProper(liturgicalDay);
    const collect = synthCollects(details.c, week);

    document.getElementById('nameOfTheDay').textContent = `${getDayName(liturgicalDay)}`;
    if (collect.includes("</p><p>")) document.getElementById('c_h').textContent = "The Collects";
    document.getElementById('c').innerHTML = collect;
    document.getElementById('e_cit').textContent = `${details.e.cit}`;
    document.getElementById('e_txt').innerHTML = makeP(makeDropCap(details.e.txt));
    document.getElementById('g_cit').textContent = `${details.g.cit}`;
    document.getElementById('g_txt').innerHTML = makeP(makeDropCap(details.g.txt));

    if (isFast(now)) document.getElementById('fastDayLabel').textContent = "FAST.";

    document.getElementById('bookmark').src = "images/bookmarks/" + getBookmarkColor(liturgicalDay, now.getMonth(), now.getDate()) + ".gif";
    document.getElementById('euchMarg').src = getEuchMargin(now, liturgicalDay);

    const hymn = getHymns(liturgicalDay);
    if (hymn) document.getElementById('hymn').innerHTML = makeP(hymn);

    document.getElementById('office').src = getOffice(now, week, feast);

    getLesson(liturgicalDay).then(lessonContent => {
        document.getElementById('tab-3').innerHTML = lessonContent;
    });
}

function synthCollects(cotd, week) {
    const collectP = makeP(makeDropCap(cotd));
    
    //TODO commemoration
    //TODO eves/vigils (4:00 PM or later)
    
    const seasonal = getSeasonalCollect(week);
    
    return collectP + "" + seasonal;
}

function getSeasonalCollect(week, liturgicalDay) {
    switch (week) {
        case "A1":
        case "A2":
        case "A3":
        case "A4":
            if (liturgicalDay !== "A1") return makeP("ALMIGHTY God, give us grace that we may cast away the works of darkness, and put upon us the armour of light, now in the time of this mortal life in which thy Son Jesus Christ came to visit us in great humility; that in the last day, when he shall come again in his glorious majesty to judge both the quick and the dead, we may rise to the life immortal; through him who liveth and reigneth with thee and the Holy Ghost, one God, now and for ever. Amen.");
            else return "";
            break;
        case "Xmas":
        case "Stephen":
        case "JohnEvangelist":
        case "Innocents":
        case "X1":
            if (liturgicalDay !== "Xmas") return makeP("ALMIGHTY God, who hast given us thy only-begotten Son to take our nature upon him, and as at this time to be born of a pure Virgin; Grant that we being regenerate, and made thy children by adoption and grace, may daily be renewed by thy Holy Spirit; through the same our Lord Jesus Christ, who liveth and reigneth with thee and the same Spirit, ever one God, world without end. Amen.");
            else return "";
            break;
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
        case "L5":
        case "L6":
            if (liturgicalDay !== "AW") return makeP("ALMIGHTY and everlasting God, who hatest nothing that thou hast made and dost forgive the sins of all them that are penitent; Create and make in us new and contrite hearts, that we, worthily lamenting our sins, and acknowledging our wretchedness, may obtain of thee, the God of all mercy, perfect remission and forgiveness; through Jesus Christ our Lord. Amen.");
            else return "";
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
