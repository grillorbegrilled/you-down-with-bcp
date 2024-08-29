function getBlackletter(month, date) {
  switch (month) {
    case 0: //january
      switch (date) {
        case 8: return createBlackletter("St. Lucian of Beauvais", commonMartyr("Lucian"));
        case 13: return createBlackletter("St. Hilary of Poitiers", commonBishop("Hilary"));
        case 18: return createBlackletter("St. Prisca", commonMartyr("Prisca"));
        case 20: return createBlackletter("St. Fabian", commonMartyr("Fabian"));
        case 21: return createBlackletter("St. Agnes", commonMartyr("Agnes"));
        case 22: return createBlackletter("St. Vincent of Saragossa", commonMartyr("Vincent"));
      }
    case 1: //february
      switch (date) {
        case 5: return createBlackletter("St. Agatha", commonMartyr("Agatha"));
        case 14: return createBlackletter("St. Valentine", "ALMIGHTY and everlasting God, who didst enkindle the flame of thy love in the heart of thy holy martyr Valentine: Grant unto us, thy humble servants, a like faith and power of love, that we who rejoice in his triumph may profit by his example; through Jesus Christ our Lord. Amen.");
      }
    case 2: //march
      switch (date) {
        case 1: return createBlackletter("St. David", commonBishop("David"));
        case 2: return createBlackletter("St. Chad", commonBishop("Chad"));
        case 7: return createBlackletter("SS. Perpetua and Felicity", "ALMIGHTY God, by whose grace and power thy holy Martyrs Perpetua and Felicity triumphed over suffering, and despised death; Grant, we beseech thee, that enduring hardness, and waxing valiant in fight, we may with the noble army of martyrs receive the crown of everlasting life; through Jesus Christ our Lord. Amen.");
        case 12: return createBlackletter("St. Gregory the Great", commonBishop("Gregory"));
        case 17: return createBlackletter("St. Patrick, Apostle of Ireland",
                                          "O ALMIGHTY God, who in thy providence didst choose thy servant Patrick to be the apostle of the Irish people, that he might bring those who were wandering in darkness and error to the true light and knowledge of thee; Grant us so to walk in that light, that we may come at last to the light of everlasting life; through the merits of Jesus Christ thy Son our Lord. Amen.");
        //case 18: return createBlackletter("St. Edward the Martyr", commonMartyr("Edward"));
        case 21: return createBlackletter("St. Benedict", commonMonastic("Benedict"));
      }
    case 3: //april
      switch (date) {
        //case 1: return "April, April Fool's Day";
        case 3: return createBlackletter("St. Richard", commonBishop("Richard"));
        case 4: return createBlackletter("St. Ambrose", commonBishop("Ambrose"));
        case 19: return createBlackletter("St. Alphege", commonBishop("Alphege"));
        case 23: return createBlackletter("St. George", commonMartyr("George"));
        //case : return createBlackletter("", common(""));
      }
    case 4: //may
      switch (date) {
          //invention of the holy cross 3
        case 5: return "May, Cinco de Mayo";
          //john ante port lat 6
        case 19: return createBlackletter("St. Dunstan", commonBishop("Dunstan"));
        case 26: return createBlackletter("St. Augustine of Canterbury, Apostle to the English", commonMissionary("Augustine", "English people"));
        case 27: return createBlackletter("St. Bede", commonPriest("Bede"));
      }
    case 5: //june
      switch (date) {
          case 1: return createBlackletter("St. Nicomedes", commonMartyr("Nicomedes"));
          case 5: return createBlackletter("St. Boniface, Apostle to the Germans", commonMissionary("Boniface", "German people"));
          case 17: return createBlackletter("St. Alban", commonMartyr("Alban"));
          //case 20: return createBlackletter("Translation of St. Edward the Confessor", common(""));
      }
    case 6: //july 2 visitation 4 trans s martin 15 swithun b 20 margaret vm 22 mary magdalen 26 anne
      switch (date) {
        //2 visitation
        //2 trans st martin
        case 15: return createBlackletter("St. Swithun", commonBishop("Swithun"));
        case 20: return createBlackletter("St. Margaret of Antioch", commonMartyr("Margaret"));
        //22 mary magdalen
        //26 anne
      }
    case 7: //august 1 lammas 6 transfiguration 7 holy name 10 lawrence m 28 augustine b 29 beh john baptist
      switch (date) {
        //1 lammas
        //6 transfiguration
        //7 holy name
        case 10: return createBlackletter("St. Lawrence", commonMartyr("Lawrence"));
        case 28: return createBlackletter("St. Augustine of Hippo", commonDoctor("Augustine"));
        //29 beh john baptist
      }
    case 8: //september 1 giles a 7 enurchus b 8 nat bvm 14 roodmas 17 lambert b 26 cyprian abp 30 jerome
      switch (date) {
        case 8: return createBlackletter("Elizabeth II, Queen of the United Kingdom", commonRuler("Elizabeth", true));
      }
    case 9: //october 1 remigius b 6 faith vm 9 denis b 13 trans k edw 17 etheldreda v 25 crispin m
      switch (date) {
        case 31: return "October, Halloween";
      }
    case 10: //november 2 allsouls 6 leonard c 11 martin b 13 britius b 15 machutus b 17 hugh b 20 king edmund 22 cecilia vm 23 clement b 25 catherine vm
      switch (date) {
        case 11: return "November, Veterans Day";
        case 25: return "November, Thanksgiving";
      }
    case 11: //december 6 nicholas b 8 conc bvm 13 lucy vm 16 o sapientia 31 silvester b
      switch (date) {
        case 25: return "December, Christmas";
      }
  }

  return "";
}

//function createBlackletter(name, collectName, type = "", femPronouns = false) {
function createBlackletter(name, collect) {
    return {
        name: name,
        collect: collect
    };
}

const commonMartyr = (name) => `ALMIGHTY God, by whose grace and power thy holy Martyr ${name} triumphed over suffering, and despised death; Grant, we beseech thee, that enduring hardness, and waxing valiant in fight, we may with the noble army of martyrs receive the crown of everlasting life; through Jesus Christ our Lord. Amen.`;
const commonDoctor = (name) => `O GOD, who hast enlightened thy Church by the teaching of thy servant ${name}; Enrich it evermore, we beseech thee, with thy heavenly grace, and raise up faithful witnesses, who by their life and doctrine may set forth to all men the truth of thy salvation; through Jesus Christ our Lord. Amen.`;
const commonBishop = (name) => `O GOD, the light of the faithful, and shepherd of souls, who didst set blessed ${name} to be a bishop in the Church, that he might feed thy sheep by his word and guide them by his example; Grant us, we pray thee, to keep the faith which he taught, and to follow in his footsteps; through Jesus Christ our Lord. Amen.`;
const commonMonastic = (name) => `O GOD, by whose grace thy blessed servant ${name}, enkindled with the fire of thy love, became a burning and a shining light in thy Church; Grant that we may be inflamed with the same spirit of discipline and love, and ever walk before thee as children of light; through Jesus Christ our Lord. Amen.`;
const commonMatron = (name) => `O GOD, who hast built up thy Church through the divers gifts and graces of thy saints; we give thee humble thanks for the example of holy women, and especially this day for thy servant ${name}, and we beseech thee to maintain among us the shelter of a mother’s love and the protection of a mother’s prayer, in the grace of thy Son, Jesus Christ our Lord. Amen.`;
const commonPriest = (name) => `O GOD, our heavenly Father, who didst raise up thy faithful servant ${name}, to be a shepherd in thy Church and to feed thy flock: Give abundantly to all pastors the gifts of thy Holy Spirit, that they may minister in thy household as true servants of Christ and stewards of thy divine mysteries; through the same Jesus Christ our Lord. Amen.`;
const commonMissionary = (name, people) => `ALMIGHTY and everlasting God, we thank thee for thy servant ${name}, whom thou didst call to preach the Gospel to the ${people}. Raise up, we beseech thee, in this and every land evangelists and heralds of thy kingdom, that thy Church may proclaim the unsearchable riches of our Savior Jesus Christ. Amen.`;
const commonConfessor = (name) => `O ALMIGHTY God, who hast called us to faith in thee, and hast compassed us about with so great a cloud of witnesses; Grant that we, encouraged by the good examples of thy Saints, and especially of thy servant Saint ${name}, may persevere in running the race that is set before us, until at length, through thy mercy, we, with them, attain to thine eternal joy; through him who is the author and finisher of our faith, thy Son Jesus Christ our Lord. Amen.`;
const commonRuler = (name, useFemPronouns = false) => `SOVEREIGN God, who didst call thy faithful servant ${name} to be a ruler among ${useFemPronouns ? "her" : "his"} people and gave ${useFemPronouns ? "her" : "him"} grace to be their servant: help us, following our Saviour Christ in the path of humble service, to see his kingdom set forward on earth, and with ${useFemPronouns ? "her" : "him"} to enjoy its fulness in heaven; through the same Jesus Christ our Lord. Amen.`;
//const commonFoo = (name) => ``;
