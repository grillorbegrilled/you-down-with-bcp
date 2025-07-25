function getTopImage(lit, month, date) {
  if (lit === "AllSaints") return "images/bg/All-saints-day.jpg";

  
    switch (lit) {
        case "A1":
        case "A2":
        case "A3":
        case "A4":
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
            return "images/bg/xmas.jpg";
            break;
        case "Epiphany":
        case "E1":
            return "images/bg/magi.jpg";
            break;
        case "E2":
        case "E3":
        case "E4":
        case "E5":
        case "E6":
            return "images/bg/cotswolds.jpg";
            break;
        case "Candlemas":
            return "images/bg/pres-temp-erase.jpg";
            break;
        case "Annunciation":
            return "images/bg/4994.jpg";
            break;
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
            return "images/bg/lent.jpg";
            break;
        case "L5":
        case "Palm":
        case "HW-Mon":
        case "HW-Tue":
        case "HW-Wed":
        case "HW-Thu":
        case "GF":
        case "EE":
            return "images/bg/Maroon.jpg";
            break;
        case "Easter":
        case "EasterMon":
        case "EasterTue":
        case "Ea1":
        case "Ea2":
        case "Ea3":
        case "Ea4":
return "images/bg/Easter.jpg";
        break;
        case "Ea5":
            return "images/bg/Rogation.jpg";
        break;
        case "Ascension":
        case "Asc1":
        return "images/bg/Ascension.jpg";
        break;
        case "Whitsun":
        case "Whitmon":
        case "WhitTue":
        return "images/bg/Whitsun.jpg";
        break;
        case "Trinity":
        return "images/bg/Htcincy.jpg";
        break;
        case "JohnBaptist":
        return "images/bg/John Baptist.jpg";
        break;
        /*case "AllSaints":
        case "ThanksgivingDay":
            return "white_damask";
            break;
        */
        case "Andrew":
            return "images/bg/andy.png";
            break;
        /*case "Thomas":
        case "Paul":
        case "Matthias":*/
        case "Mark":
            return "images/bg/St-Mark.png";
            break;
        case "PhilipAndJames":
            return "images/bg/PnJ.jpg";
            break;
        case "Barnabas":
            return "images/bg/Barnabas.png";
            break;
        /*case "Peter":*/
        case "James":
            return "images/bg/SJtoronto.JPG";
            break;
        /*case "Bartholomew":
        case "Matthew":
        case "Michael":
        case "Luke":
        case "SimonAndJude":
            return "red";
            break;
        case "Michael":
            return "white_damask"; //blue?
            break;
        */
      case "Patrick": return "images/bg/st-pat.jpg";
      case "Joseph": return "images/bg/joseph.jpg";
        default:
          if (month < 8 || month === 8 && date < 29)
            return "images/bg/trinity.png";
          else
            return "images/bg/harvest.png";
    }
}
