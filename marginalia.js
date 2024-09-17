function setBorderImage(now) {
  if (now.getMonth() === 7 || now.getMonth() === 6 && now.getDate() > 25 || now.getMonth() === 8 && now.getDate() < 29) { //Serotinal: St. James to Michaelmas
    document.querySelectorAll('.tiled-border').forEach(element => {
      if (isFast(now))
        element.style.backgroundImage = 'url("gillsandberries.png")';
      else
        element.style.backgroundImage = 'url("blackberries.png")';
    });
  }
}

function getOfficeMargin1(now) {
  //if (now.getMonth() >= 8 && now.getMonth() < 11) { //September-November for now
    return "images/marginalia/apples1.png";
  //}
}

function getOfficeMargin2(now) {
  //if (now.getMonth() >= 8 && now.getMonth() < 11) { //September-November for now
    return "images/marginalia/Cicada.jpg";
  //}
}

function getEuchMargin(now) {
  var month = now.getMonth();
  var date = now.getDate();

  if (month === 8) {
    if (date === 21) return "images/marginalia/matthew.jpg";
    //else if (date === 29)
  }
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
