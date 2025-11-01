function displayEventDetails() {
    const now = new Date();
     
    const week = getWeek(now);
    const feast = getLiturgicalDate(now);
    const liturgicalDay = synthDate(week, feast, now.getDay());

    const euchMarg = getEuchMargin(now, liturgicalDay);
    if (euchMarg) document.getElementById("euchMarg").src = euchMarg;
    else document.getElementById("euchMarg").style.display = "none";

    getProper2(liturgicalDay).then(details => {
    document.getElementById('nameOfTheDay').textContent = `${getDayName(liturgicalDay)}`;
    const collect = synthCollects(details.c, week);
    if (collect.includes("</p><p>")) for (let e of document.getElementsByName('c_h')) e.textContent = 'The Collects';
    for (let e of document.getElementsByName('c')) e.innerHTML = collect;
    for (let e of document.getElementsByName('e_cit')) e.textContent = `${details.e.cit}`;
    for (let e of document.getElementsByName('e_txt')) e.innerHTML = makeP(makeDropCap(details.e.txt));
    for (let e of document.getElementsByName('g_cit')) e.textContent = `${details.g.cit}`;
    for (let e of document.getElementsByName('g_txt')) e.innerHTML = makeP(makeDropCap(details.g.txt));
}).catch(error => {
    for (let e of document.getElementsByName('e_txt')) e.innerHTML = makeP(error.message);
});

    if (isFast(now)) document.getElementById('fastDayLabel').textContent = "FAST.";

    for (let e of document.getElementsByName('bookmark')) e.src = "images/bookmarks/" + getBookmarkColor(liturgicalDay, now.getMonth(), now.getDate()) + ".gif";

    const element = document.getElementById('top-image');
element.style.backgroundImage = `url("${getTopImage(liturgicalDay, now.getMonth(), now.getDate())}")`;
element.style.backgroundRepeat = 'no-repeat';
element.style.backgroundPosition = 'top center';
    let hymns = "";
    getHymns2(liturgicalDay).then(x => {
        hymns = x;
    
        if (hymns) {
            if (hymns.multiple) document.getElementById('hymn-title').textContent = "Hymns";
            document.getElementById('hymn').innerHTML = hymns.hymns;
        }
    });
    document.getElementById('preface').innerHTML = getPreface(liturgicalDay, now.getMonth(), now.getDate(), now.getDay());

    if (['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week))
        document.getElementById('gloria').innerHTML = makeP(makeDropCap(`O saving Victim, open wide<br>
the gate of heav'n to man below;<br>
our foes press on from every side;<br>
thine aid supply; thy strength bestow.`)) +
makeP(`All praise and thanks to thee ascend<br>
for evermore, blest One in Three;<br>
O grant us life that shall not end<br>
in our true native land with thee.`);

    getOffice(now, week, feast);

    getLesson(liturgicalDay).then(lessonContent => {
        document.getElementById('readings').innerHTML = lessonContent;
    });

    //additional devotions
    if (now.getMonth() == 10 && now.getDate() <= 8)
        document.getElementById("tab-4").innerHTML = getMemorial();
    else
        document.getElementById('tab-4').innerHTML = "<h1>Intercessions</h1>" + getIntercessions() + getAddlPrayers(liturgicalDay);
}

async function getProper2(liturgicalDay) {
    const adventEpi = new Set([
      "A1", "A2", "A3", "A4",
      "Xmas", "X1", "Stephen", "JohnEvangelist", "Innocents", "Circ", "Epiphany",
      "E1", "E2", "E3", "E4", "E5", "E6"
    ]);

    const lxxWhitsun = new Set([
      "LXX", "LX", "L", "AW",
      "L1", "L2", "L3", "L4", "L5",
      "Palm", "GF", "EE",
      "HW-Mon", "HW-Tue", "HW-Wed", "HW-Thu",
      "Easter", "EasterMon", "EasterTue",
      "Ea1", "Ea2", "Ea3", "Ea4", "Ea5",
      "Ascension", "Asc1",
      "Whitsun", "Whitmon", "WhitTue"
    ]);

    const trinity = new Set([
      "SNBA", "Trinity",
      "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10",
      "T11", "T12", "T13", "T14", "T15", "T16", "T17", "T18", "T19", "T20",
      "T21", "T22", "T23", "T24", "T25", "T26"
    ]);

    const custom = new Set(["Patrick", "Joseph", "SuperWesleyBros", "ElizabethII", "WeddingAnniversary", "MaryMagdalene", "Transfiguration"]);

    if (adventEpi.has(liturgicalDay)) return getProperFromFile(liturgicalDay, "./ceg/advent-epi.json");
    else if (lxxWhitsun.has(liturgicalDay)) return getProperFromFile(liturgicalDay, "./ceg/lxx-whitsun.json");
    else if (trinity.has(liturgicalDay)) return getProperFromFile(liturgicalDay, "./ceg/trinity.json");
    else if (liturgicalDay === "IndependenceDay" || liturgicalDay === "ThanksgivingDay") return getProperFromFile(liturgicalDay, "./ceg/nationaldays-us.json");
    else if (custom.has(liturgicalDay)) return getProperFromFile(liturgicalDay, "./ceg/custom-festivals.json");
    else return getProperFromFile(liturgicalDay, "./ceg/1662festivals.json");
}

async function getProperFromFile(liturgicalDay, filePath) {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data[liturgicalDay]; // Return the actual value for the liturgicalDay or an empty string if not found
}

function synthCollects(cotd, week) {
    //TODO commemoration
    //TODO eves/vigils (4:00 PM or later)
    
    const seasonal = getSeasonalCollect(week);

    let result = makeP(makeDropCap(cotd));

    if (seasonal && cotd !== seasonal)
        result += makeP(seasonal);
    
    return result;
}

function getSeasonalCollect(week) {
    switch (week) {
        case "A1":
        case "A2":
        case "A3":
        case "A4":
            return "ALMIGHTY God, give us grace that we may cast away the works of darkness, and put upon us the armour of light, now in the time of this mortal life in which thy Son Jesus Christ came to visit us in great humility; that in the last day, when he shall come again in his glorious majesty to judge both the quick and the dead, we may rise to the life immortal; through him who liveth and reigneth with thee and the Holy Ghost, one God, now and for ever. Amen.";
            break;
        case "Xmas":
        case "Stephen":
        case "JohnEvangelist":
        case "Innocents":
        case "X1":
            return "ALMIGHTY God, who hast given us thy only-begotten Son to take our nature upon him, and as at this time to be born of a pure Virgin; Grant that we being regenerate, and made thy children by adoption and grace, may daily be renewed by thy Holy Spirit; through the same our Lord Jesus Christ, who liveth and reigneth with thee and the same Spirit, ever one God, world without end. Amen.";
            break;
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
        case "L5":
        case "L6":
            return "ALMIGHTY and everlasting God, who hatest nothing that thou hast made and dost forgive the sins of all them that are penitent; Create and make in us new and contrite hearts, that we, worthily lamenting our sins, and acknowledging our wretchedness, may obtain of thee, the God of all mercy, perfect remission and forgiveness; through Jesus Christ our Lord. Amen.";
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
    if (!text) return "NULL";
  if (text === "") return text;
  const firstLetter = text.charAt(0);
  const restOfString = text.slice(1);
  return `<span class="drop-cap">${firstLetter}</span>${restOfString}`;
}


