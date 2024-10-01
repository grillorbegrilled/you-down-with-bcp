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
      return `BLESSED be the Lord God of Israel : for he hath visited and redeemed his people;<br>
        And hath raised up a mighty salvation for us : in the house of his servant David;<br>
        As he spake by the mouth of his holy Prophets : which have been since the world began;<br>
        That we should be saved from our enemies : and from the hand of all that hate us.<br>
        To perform the mercy promised to our forefathers : and to remember his holy Covenant;<br>
        To perform the oath which he sware to our forefather Abraham : that he would give us;<br>
        That we being delivered out of the hand of our enemies : might serve him without fear;<br>
        In holiness and righteousness before him : all the days of our life.<br>
        And thou, Child, shalt be called the Prophet of the Highest : for thou shalt go before the face of the Lord to prepare his ways;<br>
        To give knowledge of salvation unto his people : for the remission of their sins,<br>
        Through the tender mercy of our God : whereby the day-spring from on high hath visited us;<br>
        To give light to them that sit in darkness, and in the shadow of death : and to guide our feet into the way of peace.</p>
        <p>Glory be.`;
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
      return `Blessed art thou, O Lord God of our fathers : praised and exalted above all for ever.<br>
        Blessed art thou for the Name of thy Majesty : praised and exalted above all for ever.<br>
        Blessed art thou in the temple of thy holiness : praised and exalted above all for ever.<br>
        Blessed art thou that beholdest the depths, and dwellest between the Cherubim : praised and exalted above all for ever.<br>
        Blessed art thou on the glorious throne of thy kingdom : praised and exalted above all for ever.<br>
        Blessed art thou in the firmament of heaven : praised and exalted above all for ever.</p>
        <p>Glory be.`;
      break;
    case "Easter":
    case "EasterMon":
    case "EasterTue":
      return `CHRIST our passover is sacrificed for us : therefore let us keep the feast;<br>
        Not with the old leaven, nor with the leaven of malice and wickedness : but with the unleavened bread of sincerity and truth. 1 Cor. v. 7<br>
        Christ being raised from the dead dieth no more : death hath no more dominion over him.<br>
        For in that he died, he died unto sin once : but in that he liveth, he liveth unto God.<br>
        Likewise reckon ye also yourselves to be dead indeed unto sin : but alive unto God through Jesus Christ our Lord. Rom. vi. 9<br>
        Christ is risen from the dead : and become the first-fruits of them that slept.<br>
        For since by man came death : by man came also the resurrection of the dead.<br>
        For as in Adam all die : even so in Christ shall all be made alive. 1 Cor. xv. 20.</p>
        <p>Glory be.`;
      break;
    case "Xmas":
    case "Stephen":
    case "JohnEvangelist":
    case "Innocents":
    case "Whitsun":
    case "Whitmon":
    case "WhitTue":
      return `WE praise thee, O God : we acknowledge thee to be the Lord.<br>
    All the earth doth worship thee : the Father everlasting.<br>
    To thee all Angels cry aloud : the Heavens, and all the Powers therein.<br>
    To thee Cherubin and Seraphin : continually do cry,<br>
    Holy, Holy, Holy : Lord God of Sabaoth;<br>
    Heaven and earth are full of the Majesty : of thy glory.<br>
    The glorious company of the Apostles praise thee : the goodly fellowship of the Prophets praise thee.<br>
    The noble army of Martyrs praise thee : the holy Church throughout all the world doth acknowledge thee; the Father of an infinite Majesty;<br>
    Thine honourable, true and only Son : also the Holy Ghost the Comforter.</p>
    <p>Thou art the King of Glory, O Christ : thou art the everlasting Son of the Father.<br>
    When thou tookest upon thee to deliver man : thou didst not abhor the Virgin's womb.<br>
    When thou hadst overcome the sharpness of death : thou didst open the Kingdom of Heaven to all believers.<br>
    Thou sittest at the right hand of God : in the glory of the Father.<br>
    We believe that thou shalt come : to be our Judge.<br>
    We therefore pray thee, help thy servants : whom thou hast redeemed with thy precious blood.<br>
    Make them to be numbered with thy Saints : in glory everlasting.</p>
    <p>O Lord, save thy people : and bless thine heritage.<br>
    Govern them : and lift them up for ever.<br>
    Day by day : we magnify thee;<br>
    And we worship thy Name : ever world without end.<br>
    Vouchsafe, O Lord : to keep us this day without sin.<br>
    O Lord, have mercy upon us : have mercy upon us.<br>
    O Lord, let thy mercy lighten upon us : as our trust is in thee.<br>
    O Lord, in thee have I trusted : let me never be confounded.`;
      break;
    case "ThanksgivingDay":
      return `O PRAISE the Lord, for it is a good thing to sing praises unto our God : yea, a joyful and pleasant thing it is to be thankful.<br>
        The Lord doth build up Jerusalem : and gather together the outcasts of Israel.<br>
        He healeth those that are broken in heart : and giveth medicine to heal their sickness.<br>
        O sing unto the Lord with thanksgiving : sing praises upon the harp unto our God:<br>
        Who covereth the heaven with clouds, and prepareth rain for the earth : and maketh the grass to grow upon the mountains, and herb for the use of men;<br>
        Who giveth fodder unto the cattle : and feedeth the young ravens that call upon him.<br>
        Praise the Lord, O Jerusalem : praise thy God, O Sion.<br>
        For he hath made fast the bars of thy gates : and hath blessed thy children within thee.<br>
        He maketh peace in thy borders : and filleth thee with the flour of wheat.</p>
        <p>Glory be.`;
      break;
    default:
      return `O BE joyful in the Lord, all ye lands : serve the Lord with gladness, and come before his presence with a song.<br>
        Be ye sure that the Lord he is God; it is he that hath made us, and not we ourselves : we are his people, and the sheep of his pasture.<br>
        O go your way into his gates with thanksgiving, and into his courts with praise : be thankful unto him, and speak good of his Name.<br>
        For the Lord is gracious, his mercy is everlasting : and his truth endureth from generation to generation.</p>
        <p>Glory be.`;
  }
}

function getEve() {
  var now = "";
  
  if (getLiturgicalDate(now) !== "")
      return `GLORY be to God on high, and in earth peace, good will towards men. We praise thee, we bless thee, we worship thee, we glorify thee, we give thanks to thee for thy great glory, O Lord God, heavenly King, God the Father Almighty.<br>
        O Lord, the only begotten Son Jesu Christ; O Lord God, Lamb of God, Son of the Father, that takest away the sins of the world, have mercy upon us. Thou that takest away the sins of the world, have mercy upon us. Thou that takest away the sins of the world, receive our prayer. Thou that sittest at the right hand of God the Father, have mercy upon us.<br>
        For thou only art holy; thou only art the Lord; thou only, O Christ, with the Holy Ghost, art most high in the glory of God the Father. Amen.`;
  else
      return `MY soul doth magnify the Lord : and my spirit hath rejoiced in God my Saviour.<br>
        For he hath regarded : the lowliness of his handmaiden.<br>
        For behold, from henceforth : all generations shall call me blessed.<br>
        For he that is mighty hath magnified me : and holy is his Name.<br>
        And his mercy is on them that fear him : throughout all generations.<br>
        He hath showed strength with his arm : he hath scattered the proud in the imagination of their hearts.<br>
        He hath put down the mighty from their seat : and hath exalted the humble and meek.<br>
        He hath filled the hungry with good things : and the rich he hath sent empty away.<br>
        He remembering his mercy hath holpen his servant Israel : as he promised to our forefathers, Abraham and his seed, for ever.</p>
        <p>Glory be.`;
  }
}
