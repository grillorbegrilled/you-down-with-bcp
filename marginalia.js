function getOfficeMargin1(now, liturgicalDay) {
  var result = "";
  
  switch(liturgicalDay) {
    case "Easter":
    case "EasterMon":
    case "EasterTue":
      result = "images/marginalia/Empty-Tomb.jpg";
      break;
    case "Matthew":
      result = "images/marginalia/coins.gif";
      break;
    case "Michael":
      result = "images/marginalia/neaster.png";
      break;
    case "Trinity":
      result = "images/marginalia/Triquetra.png";
      break;
    case "T1":
      result = "images/marginalia/dives.jpg";
      break;
    default:
      result = "";
  }
  
  if (result === "") {
    if (now.getMonth() >= 8 && now.getMonth() < 11) { //September-November for now
      result = "images/marginalia/apples1.png";
    }
  }

  return result;
}

function getOfficeMargin2(now, liturgicalDay) {
  var result = "";
  var month = now.getMonth();
  var date = now.getDate();

  switch(liturgicalDay) {
    case "Michael":
      result = "images/marginalia/geese.png";
      break;
    case "Easter":
    case "EasterMon":
    case "EasterTue":
      result = "images/marginalia/FloweredCross.jpg";
      break;
    case "Ea2":
      result = "images/marginalia/GoodShepherd.jpg";
      break;
    case "JohnBaptist":
      result = "images/marginalia/wortwortwort.jpg";
      break;
    default:
      result = "";
  }

  if (/\d$/.test(liturgicalDay) && result === "") {
    //Spring
    if (month === 2 && date > 20 || month === 3 || month === 4) result = "images/marginalia/RobinEggs.png";
    //June
    if (month === 5) result = "images/marginalia/opuntia.png";
    //Estival
    if (month === 8) {
      if (date < 29) {result = "images/marginalia/Cicada.jpg";}
      //Autumnal
      else {result = "images/marginalia/mums2.jpg"}
    }
  }

  return result;
}

function getEuchMargin(now, liturgicalDay) {
  var month = now.getMonth();
  var date = now.getDate();
  var result = "";
  
  switch(liturgicalDay) {
    case "T8":
      result = "images/marginalia/bytheirfruit.gif";
      break;
    case "Matthew":
      result = "images/marginalia/matthew.jpg";
      break;
    case "Michael":
      result = "images/marginalia/michael.png";
      break;
    case "Trinity":
      result = "images/marginalia/Triquetra.png";
      break;
    case "JohnBaptist":
      result = "images/marginalia/agnusdei.png";
      break;
    default:
      result = "";
  }

  //if (result === "") {} //calendar days

  return result;
}

/*
{
    "A1": [""],
    "A2": [""],
    "A3": [""],
    "A4": [""],
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
    "T8": grapes and thorns, figs and thistles
    "T9": something about the unjust steward... oil and wheat, maybe? or from E: golden calf, bronze serpent...
    "T10": E: Multiple gifts, one Spirit. G: cleansing the Temple
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
}
*/
