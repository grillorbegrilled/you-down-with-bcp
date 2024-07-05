function getCanticle(day) {
  const hour = (new Date()).getHours();
  if (hour >= 6 && hour < 10) {
      return getMorn(day);
  } else if (hour >= 15 && hour < 20) {
      return getEve();
  } else {
      return "";
  }
}

function getMorn(day) {
  switch (day) {
    case "A1":
    case "A2":
    case "A3":
    case "A4":
    case "JohnBaptist":
      return "";
      break;
    case "AW":
    case "L1":
    case "L2":
    case "L3":
    case "L4":
    case "L5":
    case "Palm":
    case "HW-Mon":
    case "HW-Tue":
    case "HW-Wed":
    case "HW-Thu":
    case "GF":
    case "EE":
      return "";
      break;
    case "Easter":
    case "EasterMon":
    case "EasterTue":
      return "";
      break;
    case "ThanksgivingDay":
      return "";
      break;
    default:
      return `O BE joyful in the Lord, all ye lands : serve the Lord with gladness, and come before his presence with a song.<br>
        Be ye sure that the Lord he is God; it is he that hath made us, and not we ourselves : we are his people, and the sheep of his pasture.<br>
        O go your way into his gates with thanksgiving, and into his courts with praise : be thankful unto him, and speak good of his Name.<br>
        For the Lord is gracious, his mercy is everlasting : and his truth endureth from generation to generation.</p>
        <p>Glory be to the Father, and to the Son : and to the Holy Ghost;<br>As it was in the beginning, is now, and ever shall be : world without end. Amen.`;
  }
}

function getEve() {
  return `MY soul doth magnify the Lord : and my spirit hath rejoiced in God my Saviour.<br>
  For he hath regarded : the lowliness of his handmaiden.<br>
  For behold, from henceforth : all generations shall call me blessed.<br>
  For he that is mighty hath magnified me : and holy is his Name.<br>
  And his mercy is on them that fear him : throughout all generations.<br>
  He hath showed strength with his arm : he hath scattered the proud in the imagination of their hearts.<br>
  He hath put down the mighty from their seat : and hath exalted the humble and meek.<br>
  He hath filled the hungry with good things : and the rich he hath sent empty away.<br>
  He remembering his mercy hath holpen his servant Israel : as he promised to our forefathers, Abraham and his seed, for ever.</p>
  <p>Glory be to the Father, and to the Son : and to the Holy Ghost;<br>As it was in the beginning, is now, and ever shall be : world without end. Amen.`;
}
