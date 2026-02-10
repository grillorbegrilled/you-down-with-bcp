async function getHymns2(liturgicalDay) {
  var day = liturgicalDay;
  switch (day) {
    case "T25":
      day = "E6";
      break;
    case "T26":
      day = "E5";
      break;
    case "X1":
      day = "Xmas";
      break;
    case "HW-Mon":
    case "HW-Tue":
    case "HW-Wed":
      day = "Palm";
      break;
    case "EasterMon":
    case "EasterTue":
      day = "Easter";
      break;
    case "Whitmon":
    case "WhitTue":
      day = "Whitsun";
      break;
  }

  const nums = await getHymnNumbers(day);
  const items = await getHymnTexts(nums);
  var result = "";
  if (items) result = items.map(item => `<p class="dropcap">${item}</p>`).join("");//<p style='text-align: center;'>✠&#9;✠&#9;✠</p>");

  return {"hymns": result, "multiple": items.length > 1};
}

async function getHymnNumbers(liturgicalDay) {
  var filePath = `./hymns/hymndirectory.json`;
  
  const response = await fetch(filePath);
  if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data[liturgicalDay].map(x => x.number) ?? [];
}

async function getHymnTexts(numbers) {
  var filePath = `./hymns/hymntexts.json`;
  
  const response = await fetch(filePath);
  if (!response.ok) {
      throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return numbers.map(x => data[x]) ?? [];
}
