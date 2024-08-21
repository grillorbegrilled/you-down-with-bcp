function getBlackletter(month, date) {
  switch (month) {
    case 0: //January: 8 Lucian PM, 13 Hilary BpC, 18 Prisca VM, 20 Fabian BpM 21 Agnes VM 22 Vincent M
      switch (date) {
        case 8: return createBlackLetter("St. Lucian of Beauvais", commonMartyr("Lucian"));
        case 13: return createBlackletter("St. Hilary of Poitiers", commonBishop("Hilary"));
        case 18: return createBlackLetter("St. Prisca", commonMartyr("Prisca"));
        case 20: return createBlackLetter("St. Fabian", commonMartyr("Fabian"));
        case 21: return createBlackLetter("St. Agnes", commonMartyr("Agnes"));
        case 22: return createBlackLetter("St. Vincent of Saragossa", commonMartyr("Vincent"));
      }
    case 1: //february: 5 agatha vm 14 valentine b
      switch (date) {
        case 5: return createBlackLetter("St. Agatha", commonMartyr("Agatha"));
        case 14: return createBlackLetter("St. Valentine", "ALMIGHTY and everlasting God, who didst enkindle the flame of thy love in the heart of thy holy martyr Valentine: Grant unto us, thy humble servants, a like faith and power of love, that we who rejoice in his triumph may profit by his example; through Jesus Christ our Lord. Amen.");
      }
    case 2: //march: 1 david abp 2 chad b 7 perpetua m 12 gregory mb 18 king edward 21 benedict a
      switch (date) {
        case 1: return createBlackLetter("St. David, Bishop of Menevia", commonBishop("David"));
        case 2: return createBlackLetter("St. Chad, Bishop of Northumbria", commonBishop("Chad"));
        case 17: return createBlackletter("St. Patrick",
                                          "O ALMIGHTY God, who in thy providence didst choose thy servant Patrick to be the apostle of the Irish people, that he might bring those who were wandering in darkness and error to the true light and knowledge of thee; Grant us so to walk in that light, that we may come at last to the light of everlasting life; through the merits of Jesus Christ thy Son our Lord. Amen.");
      }
    case 3: //april 3 richard b 4 ambrose b 19 alphege abp 23 george m
      switch (date) {
        case 1: return "April, April Fool's Day";
      }
    case 4: //may 3 invent cross 6 john ante port lat 19 dunstan abp 26 augustine abp 27 bede p
      switch (date) {
        case 5: return "May, Cinco de Mayo";
      }
    case 5: return "June, Regular day in June"; //june 1 nicomede m 5 boniface b 11 barnabas ap 17 alban m 20 trans king edward
    case 6: //july 2 visitation 4 trans s martin 15 swithun b 20 margaret vm 22 mary magdalen 26 anne
      switch (date) {
        case 4: return "July, Independence Day";
      }
    case 7: return "August, Regular day in August"; //august 1 lammas 6 transfiguration 7 holy name 10 lawrence m 28 augustine b 29 beh john baptist
    case 8: return "September, Regular day in September"; //september 1 giles a 7 enurchus b 8 nat bvm 14 roodmas 17 lambert b 26 cyprian abp 30 jerome
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
//const commonFoo = (name) => ``;
