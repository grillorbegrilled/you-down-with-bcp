function getTopImage(lit, month, date) {
  if (lit === "AllSaints") return "images/bg/All-saints-day.jpg";

  
    switch (lit) {
        case "A1":
        case "A2":
        case "A3":
        case "A4":
        case "JohnBaptist":
        case "LXX":
        case "LX":
        case "L":
            return "images/bg/IMG_3000.JPG";
            break;
        case "Xmas":
        case "Stephen":
        case "JohnEvangelist":
        case "Innocents":
        case "X1":
        case "Circ":
            return "images/bg/Xmas.jpg";
            break;
        /*case "Candlemas":
        case "Annunciation":
            return "white_damask"; //pink or Marian blue
            break;
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
            return "purple";
            break;
        case "L5":
        case "Palm":
        case "HW-Mon":
        case "HW-Tue":
        case "HW-Wed":
        case "HW-Thu":
        case "GF":
        case "EE":
            return "purple";
            break;
        case "Epiphany":
        case "Easter":
        case "EasterMon":
        case "EasterTue":
        case "Ea1":
        case "Ea2":
        case "Ea3":
        case "Ea4":
        case "Ea5":
        case "Ascension":
        case "Asc1":
        case "Trinity":
        case "AllSaints":
        case "ThanksgivingDay":
            return "white_damask";
            break;
        case "Whitsun":
        case "Whitmon":
        case "WhitTue":*/
        case "Andrew":
            return "images/bg/andy.png";
            break;
        /*case "Thomas":
        case "Paul":
        case "Matthias":
        case "Mark":
        case "PhilipAndJames":
        case "Barnabas":
        case "Peter":
        case "James":
        case "Bartholomew":
        case "Matthew":
        case "Michael":
        case "Luke":
        case "SimonAndJude":
            return "red";
            break;
        case "Michael":
            return "white_damask"; //blue?
            break;
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
                return "olive";
            else if (month === 8 && date > 29 || month >= 9)
                return "olive";
            else
                return "olive";
            break;*/
        default:
            return "images/bg/harvest.png";
    }
}
