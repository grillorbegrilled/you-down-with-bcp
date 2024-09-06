function displayEventDetails() {
    const now = new Date();
    
    const week = getWeek(now);
    const feast = getLiturgicalDate(now);
    const liturgicalDay = synthDate(week, feast, now.getDay());

    const dayName = getDayName(liturgicalDay);
    const details = getProper(liturgicalDay);
    const hymn = getHymns(liturgicalDay);
    const collect = synthCollects(details.c, week);

    if (!isFast(now))
        document.getElementById('fastDayLabel').style.display = "none";
  
    if (now.getHours() < 10) {
        document.getElementById('canticle').innerHTML = makeP(getMorn(liturgicalDay));
        document.getElementById('collect').textContent = "O LORD, our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.";
        if (liturgicalDay === 'Whitsun' || liturgicalDay === 'Whitmon' || liturgicalDay === 'WhitTue' || liturgicalDay === 'Xmas' || liturgicalDay === 'Stephen' || liturgicalDay === 'JohnEvangelist' || liturgicalDay === 'Innocents')
          document.getElementById('creed').innerHTML = "";
    } else if (now.getHours() >= 15) {
      document.getElementById('officeName').textContent = "Evening Prayer";
      document.getElementById('canticle').innerHTML = makeP(getEve(liturgicalDay));  
      document.getElementById('collect').textContent = "O GOD, from whom all holy desires, all good counsels, and all just works do proceed; Give unto thy servants that peace which the world cannot give; that both our hearts may be set to obey thy commandments, and also that by thee, we, being defended from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Saviour. Amen.";
    } else document.getElementById('office').style.display = "none";

    if(now.getHours() < 21)
        document.getElementById('compline').style.display = "none";

    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    document.getElementById('bookmark').src = $"images/bookmarks/{getBookmarkColor(liturgicalDay, month, date)}.gif";
    
    setBorderImage(now);

    if (day !== 3 && day !== 5) //All Conditions on W & F
        document.getElementById('pfac').style.display = "none";

    if (day !== 0 && day !== 4) //General Thanksgiving on Su & Th
        document.getElementById('genThanks').style.display = "none";
    
    if (details) {
        if (collect.includes("</p><p>"))
            document.getElementById('c_h').textContent = "The Collects";
        
        document.getElementById('c').innerHTML = collect;
        document.getElementById('e_cit').textContent = `${details.e.cit}`;
        document.getElementById('e_txt').innerHTML = makeP(details.e.txt);
        document.getElementById('g_cit').textContent = `${details.g.cit}`;
        document.getElementById('g_txt').innerHTML = makeP(details.g.txt);
    } else {
        document.getElementById('c').innerHTML = '';
        document.getElementById('e_cit').textContent = '';
        document.getElementById('e_txt').innerHTML = '';
        document.getElementById('g_cit').textContent = '';
        document.getElementById('g_txt').innerHTML = '';
    }

    if (hymn)
        document.getElementById('hymn').innerHTML = makeP(hymn);
    else
        document.getElementById('hymn').innerHTML = '';

    if (dayName)
        document.getElementById('nameOfTheDay').textContent = `${dayName}`;
    else
        document.getElementById('nameOfTheDay').textContent = '';

    const litany = getLitany(liturgicalDay, month, date, day);
    if (litany) {
        document.getElementById('office').style.display = "none";
        document.getElementById('litany').innerHTML = litany;
    }
    else
        document.getElementById('litany').style.display = "none";

    const penitentialOffice = getPenitentialOffice(liturgicalDay, date, day);
    if (penitentialOffice) {
        document.getElementById('office').style.display = "none";
        document.getElementById('penitentialOffice').innerHTML = penitentialOffice;
    }
    else
        document.getElementById('penitentialOffice').style.display = "none";

    document.getElementById('spiritualCommunion').style.display = "none";
}

function synthCollects(cotd, week) {
    const collectP = makeP(cotd);
    
    //TODO commemoration
    //TODO eves/vigils (4:00 PM or later)
    
    const seasonal = getSeasonalCollect(week);
    
    return collectP + "" + seasonal;
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
