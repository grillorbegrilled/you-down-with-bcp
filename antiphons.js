function getAntiphon(lit, day) {
  switch (lit) {
    case "A1":
    case "A2":
    case "A3":
    case "A4":
      if (day === 0)
      return "Our King and Saviour draweth nigh : O come, let us adore him.";
    case "Xmas":
    case "Stephen":
    case "JohnEvangelist":
    case "Innocents":
    case "X1":
    case "Circ":
      return "Alleluia. Unto us a child is born : O come, let us adore him. Alleluia.";
    case "Epiphany":
    case "E1":
    case "Transfiguration":
      if ((new Date()).getDate() <= 13)
      return "The Lord hath manifested forth his glory : O come, let us adore him.";
    //Eastertide when you don't say the Te Deum
    //Alleluia. The Lord is risen indeed : O come let us adore him. Alleluia.
    case "Ascension":
    case "Asc1":
      return "Alleluia. Christ the Lord ascended into heaven : O come, let us adore him. Alleluia.";
    case "Whitsun":
    case "Whitmon":
    case "WhitTue":
      return "Alleluia. The Spirit of the Lord filleth the world : O come, let us adore him. Alleluia.";
    case "Trinity":
      if (day === 0) return "Father, Son, and Holy Ghost, One God : O come, let us adore him.";
    case "Candlemas":
    case "Annunciation":
      return "The Word was made flesh : O come, let us adore him.";
    case "Andrew":
    case "Thomas":
    case "Paul":
    case "Matthias":
    case "Mark":
    case "PhilipAndJames":
    case "Barnabas":
    case "JohnBaptist":
    case "Peter":
    case "James":
    case "Bartholomew":
    case "Matthew":
    case "Michael":
    case "Luke":
    case "SimonAndJude":
    case "AllSaints":
      return "The Lord is glorious in his saints : O come, let us adore him.";
    default:
      return "";
  }
}
