var r = document.querySelector(':root');

//function setColors(uno, due, tre) {
//    r.style.setProperty('--color1', uno); //body text
//    r.style.setProperty('--color2', due); //h1 text
//    r.style.setProperty('--color3', tre); //h1 background
//}

//basic colors
//white     gray    red     yellow  lime    aqua    blue    fuchsia
//silver    black   maroon  olive   green   teal    navy    purple

function getBookmarkColor(lit, month, date) {
    switch (lit) {
        //ADVENT BLUE=============
        case "A1":
        case "A2":
        case "A3":
        case "A4":
        case "JohnBaptist":
        case "Joseph":
        case "LXX":
        case "LX":
        case "L":
            return "midnite";
            break;
        //FESTAL GOLD============
        case "Xmas":
        case "Epiphany":
        case "Easter":
        case "EasterMon":
        case "EasterTue":
        case "Ascension":
        case "Whitsun":
        case "Whitmon":
        case "WhitTue":
        case "Trinity":
        case "AllSaints": //Or figure out a way to do EVERY color
            
        case "Anniversary":
            return "gold";
            break;
        //RED===================
        case "Stephen":
        case "Innocents":
        case "Circ":
        case "Andrew":
        case "Thomas":
        case "Paul":
        case "Matthias":
        case "Mark":
        case "PhilipAndJames":
        case "Barnabas":
        case "Peter":
        case "James":
        case "Bartholomew":
        case "Matthew":
        case "Luke":
        case "SimonAndJude":
        case "IndependenceDay":
        //Apostles, Evangelists, St. Mary Magdalene, Martyrs, and local Apostles
            return "red";
            break;
        //WHITE==================
        case "JohnEvangelist":
        case "X1":
        case "Transfiguration":
        case "Ea1":
        case "Ea2":
        case "Ea3":
        case "Ea4":
        case "Ea5":
        case "Asc1":
        case "SNBA":
        case "ThanksgivingDay": //or blue
        //virgins not martyrs
            return "white_damask";
            break;
        //ROSE===================
        case "Candlemas":
        case "Annunciation":
        //Visitation, all the Lady Days, votives of BVM
            return "pink";
            break;
        //LENTEN ARRAY===========
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
        case "Patrick":
            return "lent";
            break;
        //MAROON================
        case "L5":
        case "Palm":
        case "HW-Mon":
        case "HW-Tue":
        case "HW-Wed":
        case "HW-Thu":
        case "GF":
        case "EE":
            return "scarlet";
            break;
        //SKY BLUE===============
        case "Michael":
            return "white_damask"; //blue?
            break;
        //DARK GREEN============
        case "E1":
        case "E2":
        case "E3":
        case "E4":
        case "E5":
        case "E6": 
        case "Patrick":
            return "green";
            break;
        //BLACK===================
        case "AllSouls":
            return "black";
            break;
        //TRINITYTIDE================
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
            //OLIVE
            if (month === 5 && date > 24 || month === 6 || month === 7 || month === 8 && date < 29)
                return "olive";
            //ORANGE
            else if (month === 8 && date > 29 || month >= 9)
                return "olive";
            //YELLOW
            else
                return "olive";
            break;
        default:
            return "green";
        //Future additions:
            //Confessors, Monastics, Matrons: Orange or Yellow
            //Virgin Martyrs: White with red
            //Corpus Christi: White AND red, or white WITH red
    }
}
