var r = document.querySelector(':root');

function setColors(uno, due, tre) {
    r.style.setProperty('--color1', 'lightblue'); //body text
    r.style.setProperty('--color2', 'lightblue'); //h1 text
    r.style.setProperty('--color3', 'lightblue'); //h1 background
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
            //Red and Green (body text white?) for Christmas
            //Blue again for pre-lent
            //Lenten White for Lent
            //Maroon for Passiontide
            //White for Easter, St. John Evangelist
            //Red for Whitsun and martyrs
            //Green from Trinity to Petermas, Yellow from Petermas to Michaelmas, Orange from Michaelmas to SNBA
            //Pink on Annunciation Day
            //Sky blue on Michaelmas
            //Rainbow on All Saints?
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
                setColors("orange", "black", "orange");
            else
                setColors("green", "black", "green");
            break;
        default:
            setColors("white", "black", "white");
    }
}

/*
    "Xmas": [""],
    "Stephen": [""],
    "JohnEvangelist": [""],
    "Innocents": [""],
    "X1": [""],
    "Circ": [""],
    "Epiphany": [""],
    "E1": [""],
    "E2": [""],
    "E3": [""],
    "E4": [""],
    "E5": [""],
    "E6": [""],
    "LXX": [""],
    "LX": [""],
    "L": [""],
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
    "T1": [""],
    "T2": [""],
    "T3": [""],
    "T4": [""],
    "T5": [""],
    "T6": [""],
    "T7": [""],
    "T8": [""],
    "T9": [""],
    "T10": [""],
    "T11": [""],
    "T12": [""],
    "T13": [""],
    "T14": [""],
    "T15": [""],
    "T16": [""],
    "T17": [""],
    "T18": [""],
    "T19": [""],
    "T20": [""],
    "T21": [""],
    "T22": [""],
    "T23": [""],
    "T24": [""],
    "SNBA": [""],
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
