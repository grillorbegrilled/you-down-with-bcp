async function getHymns2(liturgicalDay) {
  var day = liturgicalDay;
  switch (day) {
    case "T25":
      day = "E6";
      break;
    case "T26":
      day = "E5";
      break;
    case "Stephen":
    case "JohnEvangelist":
    case "Innocents":
    case "X1":
    case "Circ":
      day = "Xmas";
      break;
    case "E1":
      day = "Epiphany";
      break;
    case "HW-Tue":
    case "HW-Wed":
      day = "HW-Mon";
      break;
    case "EasterMon":
    case "EasterTue":
      day = "Easter";
      break;
    case "Ea4":
      day = "T19"; // breathe on me
      break;
    case "Asc1":
      day = "Ascension";
      break;
    case "Whitmon":
    case "WhitTue":
      day = "Whitsun";
      break;
  }

  const items = await getDataFromFile(liturgicalDay, "hymns");
  var result = "";
  if (items) result = items.map(item => `<p class="dropcap">${item}</p>`).join("");//<p style='text-align: center;'>✠&#9;✠&#9;✠</p>");

  return {"hymns": result, "multiple": items.length > 1};
}

async function getDataFromFile(liturgicalDay, pathPrefix) {
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
  
  const custom = new Set(["Patrick", "Joseph", "SuperWesleyBros", "ElizabethII", "WeddingAnniversary"]);

  var filePath = "";
  if (trinity.has(liturgicalDay)) 
    filePath = `./${pathPrefix}/trinity.json`;
  else if (lxxWhitsun.has(liturgicalDay)) 
    filePath = `./${pathPrefix}/lxx-whitsun.json`;
  else if (adventEpi.has(liturgicalDay)) 
    filePath = `./${pathPrefix}/advent-epi.json`;
  else if (liturgicalDay === "IndependenceDay" || liturgicalDay === "ThanksgivingDay") 
    filePath = `./${pathPrefix}/nationaldays-us.json`;
  else if (custom.has(liturgicalDay)) 
    filePath = `./${pathPrefix}/custom-festivals.json`;
  else
    filePath = `./${pathPrefix}/1662festivals.json`;

  const response = await fetch(filePath);
  if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data[liturgicalDay]; // Return the actual value for the liturgicalDay or an empty string if not found
}
