function getEmberDayPrayer(lit, month, date, day) {
  var result = "";
  
  if (isEmberDay(lit, month, date, day)) {
    result = "<h2>For the Ember Days.</h2><p>ALMIGHTY God, the giver of all good gifts, who of thy divine providence hast appointed divers Orders in thy Church; Give thy grace, we humbly beseech thee, to all those who are to be called to any office and administration in the same; and so replenish them with the truth of thy doctrine, and endue them with innocency of life, that they may faithfully serve before thee, to the glory of thy great Name, and the benefit of thy holy Church; through Jesus Christ our Lord. Amen.</p>";
    switch (month) {
      case 11: //december
        result += "<p>Grant, we most humbly beseech Thee, O heavenly Father, that with holy Simeon and Anna, and all Thy devout servants, who waited for the consolation of Israel, we may at this time  so serve Thee with fasting and prayer, that by the celebration of the advent and birth of our blessed Redeemer, we may with them be filled with true joy and consolation, through the same Jesus Christ our Lord. Amen. <i>—John Cosin</i></p>";
        break;
      case 8: //september
        result += "<p>Almighty God, who givest to all life, and breath, and all things; and bringest forth good out of the earth for the use of man; Keep us ever in mind, that this world, with all the glory of it, fadeth, and the fashion thereof passeth away; and grant that we may so use the fruits of the ground which thou hast now given us, and all other temporal blessings wherewith thou crownest the year, as we abuse them not to the satisfying of our wanton and inordinate appetites; but may evermore serve thee in Christian temperance and sobriety, as it becometh those who, living on earth, have their conversation in heaven, that at the last we may be admitted into thy heavenly kingdom, where we shall never hunger or thirst again, being satisfied with the plenteousness of thy house, and filled with the abundance of thy pleasures for evermore. Grant this, O heavenly Father, for Jesus Christ's sake our Lord. Amen. <i>—John Cosin</i></p>";
        break;
      case 1:
      case 2:
        result += "<p>O Lord Jesus Christ, the Son of God, and Saviour of the world, who didst foretell to thine apostles, that at the time of thy sufferings, they should weep and lament, while the world rejoiced, and that they should be sorrowful, but their sorrow should be turned into joy; Grant that during this time wherein thou didst suffer, and wast afflicted with extreme sorrow and anguish for the sins of the whole world, we thy unworthy servants may so weep and lament, and be sorrowful for our sins, the cause of all those thy sorrows and sufferings, that on the day of thy triumphant resurrection, we may rejoice with that joy, which no man can take from us. Grant this, O blessed Lord and Saviour, who didst die for our sins, and rise again for our justification, and now livest and reignest with the Father, in the unity of the Holy Ghost, world without end. Amen. <i>—John Cosin</i></p>";
        break;
      case 4:
      case 5:
        result += "<p>O Lord Jesus Christ, the Eternal Son of the Eternal Father, who at the time of thy glorious ascension didst command thine apostles to tarry in Jerusalem, until they were endued with power from on high; and when, in obedience to this thy commandment, they had there continued with one accord in prayer and supplication, didst, according to thy promise, send down upon them the Holy Ghost the Comforter; Grant, we beseech thee, that we thy most humble servants, abiding in the unity of thy Holy Catholic Church, the Mother of us all, and continually serving thee as thou hast commanded, may be evermore replenished with the heavenly grace of the Holy Ghost, through thy precious merits and most powerful intercession, who livest and reignest with the Father in the unity of the same Spirit, ever world without end. Amen. <i>—John Cosin</i></p>";
        break;
      default:
        return "I AM ERROR";
    }
  }

  return result;
}
