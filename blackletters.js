function getBlackletter(month, date) {
  switch (month) {
    case 0: //january
      switch (date) {
        case 8: return createBlackletter("St. Lucian of Beauvais", commonMartyr("Lucian")); //1 martyr 4-7
        case 13: return createBlackletter("St. Hilary of Poitiers", commonBishop("Hilary"));
        case 18: return createBlackletter("St. Prisca", commonMartyr("Prisca")); //vm, lesson 1 gospel, "GRANT, we beseech Thee, O Almighty God: that we who celebrate the birthday of Blessed Prisca, Thy Virgin and Martyr, may both rejoice in her yearly festival, and profit by the example of so great faith. Through."
        case 20: return createBlackletter("St. Fabian", commonMartyr("Fabian"));
        case 21: return createBlackletter("St. Agnes", commonMartyr("Agnes")); //vm lesson 2 gospel, "O ALMIGHTY and Everlasting GOD , Who choosest the weak things of the world , to confound the strong : mercifully grant ; that we who celebrate the feast of Blessed Agnes Thy Martyr , may perceive the effect of her prayers with Thee . Through ."
        case 22: return createBlackletter("St. Vincent of Saragossa", commonMartyr("Vincent")); //1 martyr, lesson 1 gospel 1, "BE E present , O LORD , at our earn- est supplications : that we who know that we are guilty of our iniquities , may be delivered there- from at the intercession of Thy blessed Martyr Vincent . Through . "
      }
    case 1: //february
      switch (date) {
        //case 3: blasius (blaise?), b m, martyrbishop lesson 1, one martyr gospel 2, "O LORD , let Thy blessed Mar- tyr Blasius entreat the aid of Thy mercy for us : that as we celebrate his festival we may be sensible of his help before Thee . Through ."
        case 5: return createBlackletter("St. Agatha", commonMartyr("Agatha")); //vm lesson 2, vm gospel
        case 14: return createBlackletter("St. Valentine", "ALMIGHTY and everlasting God, who didst enkindle the flame of thy love in the heart of thy holy martyr Valentine: Grant unto us, thy humble servants, a like faith and power of love, that we who rejoice in his triumph may profit by his example; through Jesus Christ our Lord. Amen."); //1 martyr lesson 2, gospel 3
      }
    case 2: //march
      switch (date) {
        case 1: return createBlackletter("St. David", commonBishop("David")); //confessor bishop 1.
        case 2: return createBlackletter("St. Chad", commonBishop("Chad")); //confessor bishop 2.
        //case 7: return createBlackletter("SS. Perpetua and Felicity", //vm 1, "GRANT us, we beseech Thee, O Lord our God, continually to reverence the palms of Thy holy Martyrs Perpetua and Felicity: that although we cannot worthily imitate them in inward spirit, we may at least commemorate them with humble devotion and service. Through."
        case 12: return createBlackletter("St. Gregory the Great", commonBishop("Gregory")); //confessor-doctor, ecclus 47:8-11, 24:1-2; "O GOD , Who hast rewarded the soul of Thy servant Gregory with everlasting bliss : mercifully grant ; that as we are oppressed with the weight of our sins , so through his prayers we may receive Thy gracious help . Through ."
        case 17: return createBlackletter("St. Patrick, Apostle of Ireland",
                                          "O ALMIGHTY God, who in thy providence didst choose thy servant Patrick to be the apostle of the Irish people, that he might bring those who were wandering in darkness and error to the true light and knowledge of thee; Grant us so to walk in that light, that we may come at last to the light of everlasting life; through the merits of Jesus Christ thy Son our Lord. Amen.");
        //case 18: return createBlackletter("St. Edward the Martyr", commonMartyr("Edward"));
        case 21: return createBlackletter("St. Benedict", commonMonastic("Benedict")); //confessor abbot, "ALMIGHTY and Everlasting GOD , Who on this day didst raise Thy most blessed Confessor Benedict up to heaven , when he was released from the prison of the flesh : grant , we beseech Thee , to us Thy servants who celebrate this feast , remission of all our sins ; that those who with hearts rejoicing do join in the joy of his greatness, may at his intercession with Thee share in the fellowship of his good deeds. Through."
      }
    case 3: //april
      switch (date) {
        //case 1: return "April, April Fool's Day";
        case 3: return createBlackletter("St. Richard", commonBishop("Richard")); //confessor-bishop 1, john 15:1-7, "O GOD , Who hast made Thy Church to shine by the deeds and glorious miracles of Blessed Richard , Thy Confessor and Bishop : grant that we , Thy servants , through his intercession , may attain to the blessedness of eternal glory . Through ." 
        case 4: return createBlackletter("St. Ambrose", commonBishop("Ambrose")); //confessor-bishop lesson 2 gospel 3, "O GOD , Who didst give Blessed Ambrose to Thy people for a minister of everlasting salvation : grant , we beseech Thee ; that as he has been the instructor of our life here upon earth , he may alway be our intercessor in heaven . Through."
        case 19: return createBlackletter("St. Alphege", commonBishop("Alphege")); //martyr bishop lesson 2, john 15:1-7, "O GOD , Who didst adorn Saint Alphege , Thy Bishop , with the dignity of the priesthood , and the palm of martyrdom : mercifully grant us , so to be assisted by his intercessions with Thee , that we may rejoice with him in everlasting happiness . Through ."
        case 23: return createBlackletter("St. George", commonMartyr("George")); //james 1:2-12, john 15:1-7, "O GOD , Who dost make us to rejoice in the good deeds and intercession of Blessed George Thy Martyr : mercifully grant ; that the benefits we ask of Thee , at his prayers , we may obtain by the gift of Thy grace . Through . "
        //case : return createBlackletter("", common(""));
      }
    case 4: //may
      switch (date) {
          //invention of the holy cross 3, 1 martyr lesson 3, trinity sunday gospel, "O GOD , Who in the wonderful Invention of the saving Cross didst renew the miracles of Thy Passion : grant ; that by the ransom paid on that life - giving Tree we may find help and obtain everlast- ing life . Who livest . "
        case 5: return "May, Cinco de Mayo";
          //john ante port lat 6
        case 19: return createBlackletter("St. Dunstan", commonBishop("Dunstan")); //confessor bishop lesson 1, gospel 1, "O GOD , Who hast translated Blessed Dunstan , Thy High Priest , to Thy kingdom in heaven : grant , that we , for his glorious sake , may pass to never ending joys . Through . "
        case 26: return createBlackletter("St. Augustine of Canterbury, Apostle of England", commonMissionary("Augustine", "English people")); //confessor doctor lesson 1, st lukes day gospel
        case 27: return createBlackletter("St. Bede", commonPriest("Bede")); //lesson vigil of an apostle 2, confessor doctor gospel, "O GOD , Who makest Thy Church illustrious by the learning of Blessed Bede , Thy Con- fessor and Doctor : mercifully grant to Thy servants ; that they may be enlightened by his wisdom , and aided for his sake . Through ."
      }
    case 5: //june
      switch (date) {
          case 1: return createBlackletter("St. Nicomedes", commonMartyr("Nicomedes")); //1 martyr lesson 1, gospel 3, "O GOD , Who dost make us to rejoice in the good deeds and intercession of Blessed Nicomede Thy Martyr : mercifully grant ; that his aid , which we ask of Thee , we may obtain by the gift of Thy grace . Through ."
          case 5: return createBlackletter("St. Boniface, Apostle to the Germans", commonMissionary("Boniface", "German people")); //martyr-bishop
          case 17: return createBlackletter("St. Alban", commonMartyr("Alban")); //wis 4:7-15, 1 martyr gospel 3, "O GOD , Who hast hallowed this day by the martyrdom of Blessed Alban : grant , we beseech Thee ; that as we yearly rejoice in his festival , so we may be encouraged by his continual help . Through ."
          //case 20: return createBlackletter("Translation of St. Edward Martyr", common(""));
      }
    case 6: //july 2 visitation 4 trans s martin 15 swithun b 20 margaret vm 22 mary magdalen 26 anne
      switch (date) {
        //2 visitation, song 2:1-4, 10-14; luke 1:39-56
        //4 trans st martin
        case 15: return createBlackletter("St. Swithun", commonBishop("Swithun")); //confessor-bishop
        case 20: return createBlackletter("St. Margaret of Antioch", commonMartyr("Margaret")); //vm lesson 2
        //22 mary magdalen, song 3:2-5, 8:6-7; luke 7:36-50 "MOST Merciful Father , bestow upon us Thy servants remis- sion of all our sins : which Blessed Mary Magdalene herself obtained by loving Thine Only - begotten SON above all things ; and grant that she may evermore entreat Thy loving- kindness to give unto us a place in everlasting blessedness . Through the same . "
        //26 anne gen 26:2-5, matt 1:1-16
      }
    case 7: //august 1 lammas 6 transfiguration 7 holy name 10 lawrence m 28 augustine b 29 beh john baptist
      switch (date) {
        //1 lammas, acts 12:12-17, gospel of s peter, "GOD , Who didst set free Blessed Peter the Apostle from his chains , and let him go un- hurt : loose us , we beseech Thee , from the chains of our sins ; and mercifully shut out all evil from us . Through . "
        //6 transfiguration
        //7 holy name, acts 4:8-12, matt 1:20-23 "OGOD , Who hast made the most glorious Name of our LORD JESUS CHRIST , Thine Only- begotten Son , to be loved by Thy faithful with the greatest affection and sweetness : and likewise to be full of fear and dread to the evil spirits : mercifully grant ; that all those who do devoutly worship this Name of JESUs upon earth , may re- ceive the sweetness of holy comfort in this life , and in the world to come may obtain the fulness of joy and everlasting gladness . Through the same."
        case 10: return createBlackletter("St. Lawrence", commonMartyr("Lawrence")); //2 cor 9:6-10, 1 martyr 1 gospel, "GRANT us , we beseech Thee , Almighty God , the grace to quench the flames of our sins : as Thou didst endue the blessed Lau- rence with power to overcome the fires of his torments . Through . "
        case 28: return createBlackletter("St. Augustine of Hippo", commonDoctor("Augustine")); //confessor doctor lesson 1 and gospel
        //29 beh john baptist, jer 1:17-19, mark 6:17-29, "GOD , Who didstchoose Bless- ed John Baptist to be the fore- runner both of the Birth and also of the Death of Thy SON : grant that as he died a Martyr for truth and righteousness ; so we may contend for truth and righteousness even unto death . Through the same . "
      }
    case 8: //september 1 giles a 7 enurchus b 8 nat bvm 14 roodmas 17 lambert b 26 cyprian abp 30 jerome
      switch (date) {
        //1 giles confessor and abbot
        // 7 enurchus, confessor bishop 1, "KEEP, we beseech Thee , O LORD , Thy Church with Thy perpetual mercy , at the intercession of the blessed Bishop Enurchus : that while it is tossed on the waves of this troublesome world ; it may re- joice in this time present , and at last obtain the joys of everlasting bless- edness . Through . "
        case 8: return createBlackletter("Elizabeth II, Queen of the United Kingdom", commonRuler("Elizabeth", true));
        // 14 roodmas, numbers 21:5-9, john 12:31-36
          // 17 lambert, martyr bishop lesson 1 gospel 2
          // 26 cyprian, many martyrs lesson 4 gospel 2
          // 30 jerome, vonfessor bishop lesson 1, confessor doctor gospel, "O GOD , Who hast vouchsafed to reveal unto us the truths of Holy Scripture and the mysteries of Thy sacraments by Blessed Jerome , Thy Priest and Confessor : grant , we beseech Thee , that as we observe his birthday , we may alway be in- structed by his teaching , and aided for his merits ' sake . Through . "
      }
    case 9: //october 1 remigius b 6 faith vm 9 denis b 13 trans k edw 17 etheldreda v 25 crispin m
      switch (date) {
        //1 remigius confessor-bishop
        //6 faith, vm lesson 2
        //9 denis, acts 17:16-34, martyr-bishop gospel, "O GOD , Who on this day didst strengthen Blessed Denys with the virtue of constancy in suffering , for the preaching of Thy glory to the Gentiles : grant unto us , we beseech Thee , that we following his ex- ample , for love of Thee , may despise the prosperous things of this world , neither fear any of its adversities . Through . "
        //13 x edward conf, confessor abbot, "O GOD , Who hast crowned bless- ed King Edward Thy Confes- sor with eternal glory : make us , we beseech Thee ; so to venerate him upon earth , that we may reign with him in heaven . Through . "
        //17 etheldreda, queen virgin, abbess, vm
        //25 crispin, 1 martyr lesson 1, gospel 3
        case 31: return "October, Halloween"; //rev 5:6-12, john 17:11-26, "LORD our God , increase and multiply upon us Thy grace : and grant , that we may by a holy profession follow after the joy of Thy Saints to whose glorious solem- nities we are coming . Through . "
      }
    case 10: //november 2 allsouls 6 leonard c 11 martin b 13 britius b 15 machutus b 17 hugh b 20 king edmund 22 cecilia vm 23 clement b 25 catherine vm
      switch (date) {
        //2 all souls, 1 thess 4:13-18, john 11:21-27, "O GOD , the Creator and Re- deemer of all the faithful , grant unto the souls of all the faithful de- parted remission of all their sins : that through devout supplications they may obtain Thy gracious par- don which they have alway desired . Who livest . "
        //6 leonard, confessor abbot
        case 11: return "November, Veterans Day"; //martin, confessor-bishop 1
        //13 britius, confessor-bishop lesson 3, gospel 1
        //15 machutus, 
        case 25: return "November, Thanksgiving";
      }
    case 11: //december 6 nicholas b 8 conc bvm 13 lucy vm 16 o sapientia 31 silvester b
      switch (date) {
        //case 6: nicholas, 1 confessor-bishop 14-18, "O GOD, Who by numberless miracles, hast honoured Blessed Nicholas Thy Bishop: grant us, we beseech Thee, that, for his merits' sake and intercession, we may be delivered from the flames of hell. Through."
        //case 8: conc bvm, gen 3:9-15, matt 1:1-16
        //case 13: lucy vm, 1 vm 23-27
        case 25: return "December, Christmas";
        //case 31: silvester confessor-bishop 14-18 (Collect 1, Gospel 1)
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
