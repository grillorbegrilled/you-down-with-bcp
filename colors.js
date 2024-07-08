var r = document.querySelector(':root');

function setColors(uno, due, tre) {
    r.style.setProperty('--color1', uno); //body text
    r.style.setProperty('--color2', due); //h1 text
    r.style.setProperty('--color3', tre); //h1 background
}

function colorsByDay(lit, month, date) {
    switch (lit) {
            //Blue for Advent and St. John Baptist
        case "A1":
        case "A2":
        case "A3":
        case "A4":
        case "JohnBaptist":
        case "LXX":
        case "LX":
        case "L":
            setColors("white", "white", "darkblue");
            break;
        case "Xmas":
        case "Stephen":
        case "JohnEvangelist":
        case "Innocents":
        case "X1":
        case "Circ":
            setColors("red", "white", "green");
            break;
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
            setColors("gray", "black", "gray");
            break;
        case "L5":
        case "Palm":
        case "HW-Mon":
        case "HW-Tue":
        case "HW-Wed":
        case "HW-Thu":
        case "GF":
        case "EE":
            setColors("maroon", "black", "maroon");
            break;
            //White for Easter
            //Red for Whitsun and martyrs
        case "Whitsun":
        case "Whitmon":
        case "WhitTue":
            setColors("red", "gold", "red");
            break;
            //Pink on Annunciation Day
            //Sky blue on Michaelmas
            //Rainbow on All Saints?
        case "E1":
        case "E2":
        case "E3":
        case "E4":
        case "E5":
        case "E6":        
        case "T1":
        case "T2":
        case "T3":
        case "T4":
        case "T5":
        case "T6":
        case "T7":
        case "T8":
        case "T9":
        case "T10":
        case "T11":
        case "T12":
        case "T13":
        case "T14":
        case "T15":
        case "T16":
        case "T17":
        case "T18":
        case "T19":
        case "T20":
        case "T21":
        case "T22":
        case "T23":
        case "T24":
        case "SNBA":
            if (month === 5 && date > 24 || month === 6 || month === 7 || month === 8 && date < 29)
                setColors("gold", "black", "gold");
            else if (month === 8 && date > 29 || month >= 9)
                setColors("darkorange", "black", "darkorange");
            else
                setColors("green", "black", "green");
            break;
        default:
            setColors("white", "black", "white");
    }
}

/*
    "Epiphany": [""],
    "AW": [""],
    "L1": [""],
    "L2": [""],
    "L3": [""],
    "L4": [""],
    "L5": [""],
    "Palm": [""],
    "HW-Mon": [""],
    "HW-Tue": [""],
    "HW-Wed": [""],
    "HW-Thu": [""],
    "GF": [""],
    "EE": [""],
    "Easter": [""],
    "EasterMon": [""],
    "EasterTue": [""],
    "Ea1": [""],
    "Ea2": [""],
    "Ea3": [""],
    "Ea4": [""],
    "Ea5": [""],
    "Ascension": [""],
    "Asc1": [""],
    "Whitsun": [""],
    "Whitmon": [""],
    "WhitTue": [""],
    "Trinity": [""],
    "Andrew": [""],
    "Thomas": [""],
    "Paul": [""],
    "Candlemas": [""],
    "Matthias": [""],
    "Annunciation": [""],
    "Mark": [""],
    "PhilipAndJames": [""],
    "Barnabas": [""],
    "JohnBaptist": [""],
    "Peter": [""],
    "James": [""],
    "Bartholomew": [""],
    "Matthew": [""],
    "Michael": [""],
    "Luke": [""],
    "SimonAndJude": [""],
    "AllSaints": [""],
    "ThanksgivingDay": [""]
*/
