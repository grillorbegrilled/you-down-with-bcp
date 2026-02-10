function getOffice(now, week, feast) {
    const day = now.getDay();
    //------------------COMMINATION
    if (now.getDate() < 8 && day === 5) //first Friday of the month
        document.getElementById("tab-0").innerHTML = commination;
    //------------------litany & commination on AW, just litany on Lenten Fridays not first of month
    if (week === "AW" && day === 3) document.getElementById("tab-0").innerHTML = getIntercessions() + commination; //Ash Wednesday litany and commination
    if (["L2", "L3", "L4", "L5"].includes(week) && day === 5) document.getElementById("tab-0").innerHTML = getIntercessions();
    
    else {
        try {
        //------------------DAILY PRAYERS
        //officeType: 1=MP, 2=EP, 3=Compline, 4=Intercessions
        var officeType = 0;
        if (now.getHours() >= 3 && now.getHours() < 11) officeType = 1;
        else if (now.getHours() >=11 && now.getHours() < 15) officeType = 4;
        else if (now.getHours() >= 15 && now.getHours() < 21) officeType = 2;
        else officeType = 3;
    const topMarg = getOfficeMargin1(now, feast || week);
                if (topMarg) document.getElementById("topMarg").src = topMarg;
                else document.getElementById("topMarg").style.display = "none";
        switch (officeType) {
            case 1:
                document.getElementById("office-name").textContent = "Morning Prayer";
                let antiphon = getAntiphon(synthDate(week, feast, day), day);
                if (antiphon) document.getElementById("antiphon").innerHTML = makeP(antiphon);
                let canticle = getMorningCanticle(week, feast);
                document.getElementById("canticle").innerHTML = canticle;
                if (!canticle.startsWith(`WE`))
                    document.getElementById("creed-or-suffrages").innerHTML = `<p>I believe in God the Father Almighty, Maker of heaven and earth: <br>
                        And in Jesus Christ his only Son our Lord: Who was conceived by the Holy Ghost, Born of the Virgin Mary: Suffered under Pontius Pilate, Was crucified, dead, and buried: He descended into hell; The third day he rose again from the dead: He ascended into heaven, And sitteth on the right hand of God the Father Almighty: From thence he shall come to judge the quick and the dead.<br>
                        I believe in the Holy Ghost: The holy Catholic Church; The Communion of Saints: The Forgiveness of sins: The Resurrection of the body, And the Life everlasting. Amen.</p>`;
                //getLessonFromFile(feast || week, "./lessons/morning.json").then(lessonContent => {
                //    document.getElementById('lesson').innerHTML = `<h2>${lessonContent.cit}</h2>${makeP(lessonContent.txt)}`;
                //});
                document.getElementById("ogc").style.display = "none";
                document.getElementById("ogt").style.display = "none";
                document.getElementById("office-collect").innerHTML = "<p>O Lord, our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings, being ordered by thy governance, may be righteous in thy sight; through Jesus Christ our Lord. Amen.</p>";
                const cantMarg = getOfficeMargin2(now, feast || week);
                if (cantMarg) document.getElementById("cantMarg").src = cantMarg;
                else document.getElementById("cantMarg").style.display = "none";
                document.getElementById("additional-prayers").innerHTML = getAdditionalPrayers(week, day, officeType);
                document.getElementById("sentence").innerHTML = makeDropCap(getSentence(feast || week, officeType));
                break;
            case 2:
                document.getElementById("office-name").textContent = "Evening Prayer";
                document.getElementById("canticle").innerHTML = getEveningCanticle(feast, week);
                document.getElementById("creed-or-suffrages").innerHTML = `<p>O Lord, show thy mercy upon us.<br>
                 	  <b>And grant us thy salvation.</b><br>
                 	  O Lord, save the State.<br>
                 	  <b>And mercifully hear us when we call upon thee.</b><br>
                 	  Endue thy Ministers with righteousness.<br>
                 	  <b>And make thy chosen people joyful.</b><br>
                 	  O Lord, save thy people.<br>
                 	  <b>And bless thine inheritance.</b><br>
                 	  Give peace in our time, O Lord.<br>
                 	  <b>For it is thou, Lord, only, that makest us dwell in safety.</b><br>
                 	  O God, make clean our hearts within us.<br>
                   	<b>And take not thy Holy Spirit from us.</b></p>`;
                document.getElementById("office-collect").innerHTML = "<p>O God, from whom all holy desires, all good counsels, and all just works do proceed; Give unto thy servants that peace which the world cannot give; that our hearts may be set to obey thy commandments, and also that by thee, we, being defended from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Saviour. Amen.</p>";
                document.getElementById("additional-prayers").innerHTML = getAdditionalPrayers(week, day, officeType);
                //getLessonFromFile(feast || week, "./lessons/evening.json", "./lessons/morning.json").then(lessonContent => {
                //    document.getElementById('lesson').innerHTML = `<h2>${lessonContent.cit}</h2>${makeP(lessonContent.txt)}`;
                //});
                document.getElementById("oec").style.display = "none";
                document.getElementById("oet").style.display = "none";
                document.getElementById("sentence").innerHTML = makeDropCap(getSentence(feast || week, officeType));
                break;
            case 3:
                document.getElementById("office-name").textContent = "Night Prayer";
                document.getElementById("lp").innerHTML = "ALMIGHTY and most merciful Father; We have erred, and strayed from thy ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against thy holy laws. We have left undone those things which we ought to have done; And we have done those things which we ought not to have done; And there is no health in us. But thou, O Lord, have mercy upon us, miserable offenders. Spare thou those, O God, who confess their faults. Restore thou those who are penitent; According to thy promises declared unto mankind in Christ Jesus our Lord. And grant, O most merciful Father, for his sake; That we may hereafter live a godly, righteous, and sober life, To the glory of thy holy Name. Amen.";
                document.getElementById("lp").className = "dropcap";
                document.getElementById("canticle").innerHTML = `<p class='dropcap'>LORD, now lettest thou thy servant depart in peace * according to thy word.<br>
                    For mine eyes have seen * thy salvation,<br>
                    Which thou hast prepared * before the face of all people;<br>
                    To be a light to lighten the Gentiles * and to be the glory of thy people Israel.</p>
                    <p>Glory be to the Father, and to the Son * and to the Holy Ghost;<br>
                    As it was in the beginning, is now, and ever shall be * world without end. Amen.</p>`;
                document.getElementById("office-collect").innerHTML = "<p>Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Saviour, Jesus Christ. Amen.</p>";
                document.getElementById('sentence').style.display = "none";
                document.getElementById("additional-prayers").style.display = "none";
                document.getElementById("oec").style.display = "none";
                document.getElementById("oet").style.display = "none";
                document.getElementById("ogc").style.display = "none";
                document.getElementById("ogt").style.display = "none";
                break;
            case 4:
                if (now.getMonth() == 10 && now.getDate() <= 8)
                    document.getElementById("tab-0").innerHTML = getMemorial();
                document.getElementById("tab-0").innerHTML = getIntercessions();
            default:
                document.getElementById("tab-0").innerHTML = `<p>Invalid Office type ${officeType}</p>`;
                break;
            }
        } catch (e) {
            document.getElementById("tab-0").innerHTML = `<p>I AM ERROR ${e}</p>`;
        }
    }
}

function getAdditionalPrayers(week, day, officeType) {
    //All Conditions
        var result = //`<p>BLESS thy servant <i>N.</i> with health of body and of spirit. Let the hand of thy blessing be upon her head night and day, and support her in all necessities, strengthen her in all temptations, comfort her in all sorrows, and let her be thy servant in all changes; and make us both to dwell with thee for ever in thy favour, in the light of thy countenance, and in thy glory. Amen.<i>⸺Jeremy Taylor</i></p>
            //<p>ALMIGHTY God, heavenly Father, who hast blessed us with the joy and care of children; Give us light and strength so to train them, that they may love whatsoever things are true and pure and lovely and of good report, following the example of their Saviour Jesus Christ. Amen.</p>
            "<p>O God, merciful and gracious, who hast made my family, my friends, and my benefactors ministers of thy mercy and instruments of Providence to me, I humbly beg a blessing to descend upon the heads of <i>N, &c.</i> and all those who desire our prayers. Send thy holy angels to guard their persons, thy Holy Spirit to guide their souls, thy providence to minister to their necessities; and let thy grace and mercy preserve them from the bitter pains of hell, and bring them to everlasting life, through Jesus Christ. Amen.<i>⸺after Jeremy Taylor</i></p>" +
           // <p>PRESERVE, O Lord, we beseech thee, thy servant <i>N.</i> under the shield of thy protection. And as thou hast ordained of thy grace that she be with child, so when the time of her labour shall draw near, graciously deliver her and mercifully keep her, and her child, from all disquietude. Amen.</p>
            "<p>O heavenly Father, who in thy Word hast given us a vision of that holy City to which the nations of the world bring their glory: Behold and visit, we beseech thee, the <I>City</i> of <I>N.</i> Renew the bonds of charity that uphold our civic life. Send us honest and able leaders. Deliver us from poverty, prejudice, and oppression, that peace may prevail with righteousness, and justice with mercy. And at the last, bring us to thy Holy City, the new Jerusalem, where we shall know perfect unity and peace; through Jesus Christ our Lord. Amen.</p>";
        if ((day === 3 || day === 5) && officeType == 1) //All Conditions on W & F Morning
            result += `<h2>A Prayer for All Conditions of Men</h2>
                <p>O God, the Creator and Preserver of all mankind, we humbly beseech thee for all sorts and conditions of men: that thou wouldest be pleased to make thy ways known unto them, thy saving health unto all nations. More especially, we pray for thy holy Church universal; that it may be so guided and governed by thy good Spirit, that all who profess and call themselves Christians may be led into the way of truth, and hold the faith in unity of spirit, in the bond of peace, and in righteousness of life. Finally, we commend to thy fatherly goodness all those, who are any ways afflicted, or distressed, in mind, body, or estate; ... that it may please thee to comfort and relieve them, according to their several necessities, giving them patience under their sufferings, and a happy issue out of all their afflictions. And this we beg for Jesus Christ’s sake. Amen.</p>`;
        
        //General Thanks
        if (day === 0 || day === 4) //General Thanksgiving on Su & Th
            result += `<h2>A General Thanksgiving</h2>
                <p>Almighty God, Father of all mercies, we thine unworthy servants do give thee most humble and hearty thanks for all thy goodness and loving-kindness to us, and to all men; ... . We bless thee for our creation, preservation, and all the blessings of this life; but above all, for thine inestimable love in the redemption of the world by our Lord Jesus Christ; for the means of grace, and for the hope of glory. And, we beseech thee, give us that due sense of all thy mercies, that our hearts may be unfeignedly thankful, and that we shew forth thy praise, not only with our lips, but in our lives; by giving up ourselves to thy service, and by walking before thee in holiness and righteousness all our days; through Jesus Christ our Lord, to whom with thee and the Holy Ghost be all honour and glory, world without end. Amen.</p>`;

        //Ember Days
        result += getEmberDayPrayer(week, now.getMonth(), now.getDate(), day);

        //Passiontide
        if (['L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'Maundy', 'GF', 'EE'].includes(week))
            result += `Blessèd Jesus, the only thing greater than the pain and anguish of your Passion was your mercy toward mankind, even to me. All this deserves more love than I have to give. Therefore, Lord, I beseech you to turn me all into love, and all my love into obedience, and let my obedience be without interruption. Make me to be something you delight in, that I may offer you all that I am, and all that I have. Clothe my soul in your garment, hide my sins in your wounds, and bury them in your grave, and then let me rise in the life of grace, and abide and grow in it, till I arrive at the kingdom of glory. Amen.<i>⸺Jeremy Taylor</i>`;

        //Grace
        result += "<p>The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. Amen.</p>";

    return result;
}

function getMorningCanticle(week, feast) {
    //Benedictus Dominus
    if (['A1', 'A2', 'A3', 'A4'].includes(week) || feast === "JohnBaptist") return `<p class="dropcap" style='margin-bottom: 0;'>BLESSED be the Lord God of Israel; * for he hath visited and redeemed his people;<br>
        And hath raised up a mighty salvation for us, * in the house of his servant David;<br>
        As he spake by the mouth of his holy Prophets, * which have been since the world began;<br>
        That we should be saved from our enemies, * and from the hand of all that hate us.<br>
        To perform the mercy promised to our forefathers, * and to remember his holy covenant;<br>
        To perform the oath which he sware to our forefather Abraham, * that he would give us;<br>
        That we being delivered out of the hand of our enemies * might serve him without fear;<br>
        In holiness and righteousness before him, * all the days of our life.</p>
        <p style='text-align: center; margin-bottom: 0;'>✠&#9;✠&#9;✠</p>
        <p>And thou, child, shalt be called the prophet of the Highest: * for thou shalt go before the face of the Lord to prepare his ways;<br>
        To give knowledge of salvation unto his people * for the remission of their sins,<br>
        Through the tender mercy of our God; * whereby the day-spring from on high hath visited us;<br>
        To give light to them that sit in darkness, and in the shadow of death, * and to guide our feet into the way of peace.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;
    
    //Pascha Nostrum
    if (['Easter', 'EasterMon', 'EasterTue'].includes(week) && [0, 1, 2].includes (new Date().getDay())) return `<p class="dropcap">CHRIST our passover is sacrificed for us, * therefore let us keep the feast;<br>
          Not with the old leaven, nor with the leaven of malice and wickedness, * but with the unleavened bread of sincerity and truth. <i>1 Cor. 5:7, 8</i></p>
        <p>Christ being raised from the dead dieth no more, * death hath no more dominion over him.<br>
          For in that he died, he died unto sin once, * but in that he liveth, he liveth unto God.<br>
          Likewise reckon ye also yourselves to be dead indeed unto sin, * but alive unto God through Jesus Christ our Lord. <i>Rom. 6:9-11</i></p>
        <p>Christ is risen from the dead, * and become the first-fruits of them that slept.<br>
          For since by man came death, * by man came also the resurrection of the dead.<br>
          For as in Adam all die, * even so in Christ shall all be made alive. <i>1 Cor. 15:20-22</i></p>
        <p>Glory be to the Father, and to the Son * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be * world without end. Amen.</p>`;
    
    //Benedictus Es
    if (['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week) && !(feast === 'Annunciation' && (new Date()).getDay() !== 0)) return `<p class="dropcap">BLESSED art thou, O Lord God of our fathers: * praised and exalted above all for ever.<br>
        Blessed art thou for the Name of thy Majesty: * praised and exalted above all for ever.<br>
        Blessed art thou in the temple of thy holiness: * Praised and exalted above all for ever.<br>
        Blessed art thou that beholdest the depths, and dwellest between the Cherubim: * praised and exalted above all for ever.<br>
        Blessed art thou on the glorious throne of thy Kingdom: * praised and exalted above all for ever.<br>
        Blessed art thou in the firmament of heaven: * praised and exalted above all for ever.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;

    //Te Deum
    if (['Xmas', 'X1', 'Whitsun', 'Whitmon', 'WhitTue'].includes(week) || feast === 'Annunciation') return `<p style='margin-bottom: 0;' class="dropcap">WE praise thee, O God; we acknowledge thee to be the Lord.<br>
        All the earth doth worship thee, the Father everlasting.<br>
        To thee all Angels cry aloud; the Heavens, and all the Powers therein;<br>
        To thee Cherubim and Seraphim continually do cry,<br>
        Holy, Holy, Holy, Lord God of Sabaoth;<br>
        Heaven and earth are full of the Majesty of thy glory.<br>
        The glorious company of the Apostles praise thee.<br>
        The goodly fellowship of the Prophets praise thee.<br>
        The noble army of Martyrs praise thee.<br>
        The holy Church throughout all the world doth acknowledge thee;<br>
        The Father of an infinite Majesty;<br>
        Thine adorable, true and only Son;<br>
        Also the Holy Ghost the Comforter.</p>
        <p>THOU art the King of Glory, O Christ.<br>
        Thou art the everlasting Son of the Father.<br>
        When thou tookest upon thee to deliver man, thou didst not abhor the Virgin's womb.<br>
        When thou hadst overcome the sharpness of death, thou didst open the Kingdom of Heaven to all believers.<br>
        Thou sittest at the right hand of God, in the glory of the Father.<br>
        We believe that thou shalt come to be our Judge.<br>
        We therefore pray thee, help thy servants, whom thou hast redeemed with thy precious blood.<br>
        Make them to be numbered with thy Saints, in glory everlasting.</p>
        <p style='text-align: center; margin-bottom: 0;'>✠&#9;✠&#9;✠</p>
        <p>O Lᴏʀᴅ, save thy people, and bless thine heritage.<br>
        Govern them and lift them up for ever.<br>
        Day by day we magnify thee;<br>
        And we worship thy Name ever, world without end.<br>
        Vouchsafe, O Lord, to keep us this day without sin.<br>
        O Lord, have mercy upon us, have mercy upon us.<br>
        O Lord, let thy mercy be upon us, as our trust is in thee.<br>
        O Lord, in thee have I trusted; let me never be confounded.</p>`;

    //Thanksgiving
    if (feast === "ThanksgivingDay") return `<p class="dropcap">O PRAISE the Lord, for it is a good thing to sing praises unto our God; * yea, a joyful and pleasant thing it is to be thankful.<br>
        The Lord doth build up Jerusalem, * and gather together the outcasts of Israel.<br>
        He healeth those that are broken in heart, * and giveth medicine to heal their sickness.<br>
        O sing unto the Lord with thanksgiving; * sing praises upon the harp unto our God:<br>
        Who covereth the heaven with clouds, and prepareth rain for the earth; * and maketh the grass to grow upon the mountains, and herb for the use of men;<br>
        Who giveth fodder unto the cattle, * and feedeth the young ravens that call upon him.<br>
        Praise the Lord, O Jerusalem; * praise thy God, O Sion.<br>
        For he hath made fast the bars of thy gates, * and hath blessed thy children within thee.<br>
        He maketh peace in thy borders, * and filleth thee with the flour of wheat.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;
    
    //Psalm 100;
    return `<p class="dropcap">O BE joyful in the Lord, all ye lands: * serve the Lord with gladness, and come before his presence with a song.
        Be ye sure that the Lord he is God; it is he that hath made us, and not we ourselves; * we are his people, and the sheep of his pasture.
        O go your way into his gates with thanksgiving, and into his courts with praise; * be thankful unto him, and speak good of his Name.
        For the Lord is gracious, his mercy is everlasting; * and his truth endureth from generation to generation.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;
}

function getEveningCanticle(isFeast, week) {
    if (isFeast && !['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week)) return `<p class="dropcap">GLORY be to God on high, and on earth peace, good will towards men. We praise thee, we bless thee, we worship thee, we glorify thee, we give thanks to thee for thy great glory, O Lord God, heavenly King, God the Father Almighty.<br>
        O Lord, the only-begotten Son, Jesus Christ; O Lord God, Lamb of God, Son of the Father, that takest away the sins of the world, have mercy upon us. Thou that takest away the sins of the world, receive our prayer. Thou that sittest at the right hand of God the Father, have mercy upon us.<br>
        For thou only art holy; thou only art the Lord; thou only, O Christ, with the Holy Ghost, art most high in the glory of God the Father. Amen.</p>`;

    return `<p class="dropcap">MY soul doth magnify the Lord, * and my spirit hath rejoiced in God my Saviour.<br>
        For he hath regarded * the lowliness of his handmaiden.<br>
        For behold, from henceforth * all generations shall call me blessed.<br>
        For he that is mighty hath magnified me; * and holy is his Name.<br>
        And his mercy is on them that fear him * throughout all generations.<br>
        He hath showed strength with his arm; * he hath scattered the proud in the imagination of their hearts.<br>
        He hath put down the mighty from their seat, * and hath exalted the humble and meek.<br>
        He hath filled the hungry with good things; * and the rich he hath sent empty away.<br>
        He remembering his mercy hath holpen his servant Israel; * as he promised to our forefathers, Abraham and his seed, for ever.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;
}

async function getLessonFromFile(liturgicalDay, filePath, fallbackFilePath = "") {
    try {
        var day = liturgicalDay;
        let response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();

        if(fallbackFilePath && !data[day].cit)
        {
            response = await fetch(fallbackFilePath);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            data = await response.json();
        }
        
        if (day === "T25") day = "E6";
        else if (day === "T26") day = "E5";
        const lessonText = await handleBibleReference(data[day].cit);
        return { "cit": data[day].cit, "txt": lessonText } || ""; // Return the actual value for the liturgicalDay or an empty string if not found
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return error;
    }
}

const commination = `<H1>A Penitential Office</H1>
<p class="devo">¶Before beginning, choose one or more of the lists below to examine and interrogate the welfare of your soul.</p>
    <p class='dropcap'>Have mercy upon me, O God, after thy great goodness; * according to the multitude of thy mercies do away mine offences.<br>
Wash me throughly from my wickedness, * and cleanse me from my sin.<br>
For I acknowledge my faults, * and my sin is ever before me.<br>
Against thee only have I sinned, and done this evil in thy sight; * that thou mightest be justified in thy saying, and clear when thou art judged.<br>
Behold, I was shapen in wickedness, * and in sin hath my mother conceived me.<br>
But lo, thou requirest truth in the inward parts, * and shalt make me to understand wisdom secretly.<br>
Thou shalt purge me with hyssop, and I shall be clean; * thou shalt wash me, and I shall be whiter than snow.<br>
Thou shalt make me hear of joy and gladness, * that the bones which thou hast broken may rejoice.<br>
Turn thy face from my sins, * and put out all my misdeeds.<br>
Make me a clean heart, O God, * and renew a right spirit within me.<br>
Cast me not away from thy presence, * and take not thy holy Spirit from me.<br>
O give me the comfort of thy help again, * and stablish me with thy free Spirit.<br>
Then shall I teach thy ways unto the wicked, * and sinners shall be converted unto thee.<br>
Deliver me from blood-guiltiness, O God, thou that art the God of my health; * and my tongue shall sing of thy righteousness.<br>
Thou shalt open my lips, O Lord, * and my mouth shall show thy praise.<br>
For thou desirest no sacrifice, else would I give it thee; but thou delightest not in burnt-offerings.<br>
The sacrifice of God is a troubled spirit: * a broken and contrite heart, O God, shalt thou not despise.</p>
<p>Glory be to the Father, and to the Son, * and to the Holy Ghost;
As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>
<hr>
<p>Lord, have mercy upon us.<br>
<b>Christ, have mercy upon us.</b><br>
Lord, have mercy upon us.</p>

<p>Our Father, who art in heaven, Hallowed be thy Name. Thy kingdom come. Thy will be done, On earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, As we forgive those who trespass against us. And lead us not into temptation, But deliver us from evil. Amen.</p>
<hr>
<p>O Lord, save thy servants;<br>
<b>That put their trust in thee.</b><br>
Send unto them help from above.<br>
<b>And evermore mightily defend them.</b><br>
Help us, O God our Saviour.<br>
<b>And for the glory of thy Name deliver us; be merciful to us sinners, for thy Name’s sake.</b><br>
O Lord, hear our prayer.<br>
<b>And let our cry come unto thee.</b></p>

<p class='dropcap'>O LORD, we beseech thee, mercifully hear our prayers, and spare all those who confess their sins unto thee; that they, whose consciences by sin are accused, by thy merciful pardon may be absolved; through Christ our Lord. Amen.</p>
<p>O Most mighty God, and merciful Father, who hast compassion upon all men, and who wouldest not the death of a sinner, but rather that he should turn from his sin, and be saved; Mercifully forgive us our trespasses; receive and comfort us, who are grieved and wearied with the burden of our sins. Thy property is always to have mercy; to thee only it appertaineth to forgive sins. Spare us therefore, good Lord, spare thy people, whom thou hast redeemed; enter not into judgment with thy servants; but so turn thine anger from us, who meekly acknowledge our transgressions, and truly repent us of our faults, and so make haste to help us in this world, that we may ever live with thee in the world to come; through Jesus Christ our Lord. Amen.</p>
<p><b>Turn thou us, O good Lord, and so shall we be turned. Be favourable, O Lord, Be favourable to thy people, Who turn to thee in weeping, fasting, and praying. For thou art a merciful God, Full of compassion, Long-suffering, and of great pity. Thou sparest when we deserve punishment, And in thy wrath thinkest upon mercy. Spare thy people, good Lord, spare them, And let not thine heritage be brought to confusion. Hear us, O Lord, for thy mercy is great, And after the multitude of thy mercies look upon us; Through the merits and mediation of thy blessed Son, Jesus Christ our Lord. Amen.</b></p>

<p class="dropcap">O GOD, whose nature and property is ever to have mercy and to forgive; Receive our humble petitions; and though we be tied and bound with the chain of our sins, yet let the pitifulness of thy great mercy loose us; for the honour of Jesus Christ, our Mediator and Advocate. Amen.</p>
<p>The Lord bless us, and keep us. The Lord make his face to shine upon us, and be gracious unto us. The Lord lift up his countenance upon us, and give us peace, both now and evermore. Amen.</p>

<p style='text-align: center;'>✠&#9;✠&#9;✠</p>
    
    <H2>The Seven Deadly Sins</H2>
      <H3>Pride</H3> <!--lion-->
        <p>Vainglory, or a high opinion of one’s achievements. ❦ Indignation at perceived injustices. ❦ Hypocrisy. ❦ Presumption and meddling. ❦ Disobedience. ❦ Loquacity. ❦ Blasphemy. ❦ Impatience. ❦ Stubbornness.</p>
        <p style="text-align: center;"><i>Pride can spring from countless sources, as wealth and prosperity, high descent, fine clothes, wit, beauty, strength, even extraordinary piety and pure morals.</i></p>
      <H3>Envy</H3><!--snake-->
      <p>Ingratitude. ❦ Hatred. ❦ Grieving at the good of another.  ❦ Enjoying or dismissing the misfortune of another. ❦ Exposing faults. ❦ Backbiting. ❦ Upbraiding.</p>
      <H3>Wrath</H3> <!--unicorn-->
        <p>Contention or strife. ❦ Rage. ❦ Abusive reproach. ❦ Cursing.  ❦ Violence.  ❦ Wishing evil upon another.</p>
      <h3>Sloth</h3> <!--bear-->
        <p>A lukewarm heart, which does not light up with love for God. ❦ Faintheartedness or reluctance to undertake anything arduous in the hope of help from God, and in confidence of His grace. ❦ Sluggishness and dullness of heart in doing good. ❦ Idleness.  ❦ Grudging and grumbling.  ❦ Sorrow for loss or displeasure. ❦ Negligence, whether in saying, doing, providing, or caring for anything. ❦ Despair.</p>
      <h3>Greed</h3> <!--fox-->
        <p>Treachery and guile. ❦ Theft. ❦ Rapine, or taking things by violence. ❦ Extortion, or taking things by force or threat. ❦ Perjury, or false testimony. ❦ Simony, or taking payment for religious service. ❦ Usury, or charging interest. ❦ Unwillingness to give or lend. ❦ Murder.</p>
        <p style="text-align: center;"><i>All that man or woman desires more than is sufficient for leading life comfortably, according to their station, is covetousness, and the root of mortal sin. This is true religion – that every one, according to his station, should borrow from this frail world as little as possible of food, clothes, goods, and of all worldly things.</i></p>
      <h3>Gluttony</h3> <!--swine-->
        <p>Eating too early. ❦ Eating too luxuriously, and being picky. ❦ Eating too voraciously. ❦ Eating too much. ❦ Eating too often.</p>
      <h3>Lust</h3> <!--Scorpion-->
        <p>Most fruits and consequences of this sin are obvious, and so need not be listed in detail. These less-obvious ones, however, must also be considered:</p>
        <p>Lecherous thoughts. ❦ Precursors such as flirting, indecency, and immodesty.</p>

    <H2>The Five Senses</H2>
    <h3>Sight</h3>
    <p style="text-align: center;"><i>Love your windows as little as possible.</i>&mdash;The Ancrene Riwle</p>
    <ul>
      <li>Have I turned lustful, envious, or wrathful eyes on anyone?</li>
      <li>Have I given anyone occasion to do the same?</li>
      <li>Have I desired that any would?</li>
      <li>Have I looked with greed at anything; or innocently, but at the expense of better things, especially my duties?</li>
    </ul>
    <h3>Hearing</h3>
    <p style="text-align: center;"><i>A man full of words shall not prosper upon the earth.</i>&mdash;Ps. 140:11</p>
    <ul>
      <li>Have I spoken seldom and little, or rather  often and long? </li>
      <li>Have I desired to be heard more than to listen?</li>
      <li>Have I spoken evil, or consented to evil speech by listening, namely:
        <ul>
          <li>That which serves no good and is unnecessary?</li>
          <li>That which concerns lechery and other uncleanness?</li> 
          <li>Heresies, lies, backbiting, flattery, or that which instigates men to evil deeds?</li>
        </ul></li>
    </ul>
    <h3>Smell</h3>
    <ul>
      <li>Have I followed any pleasing aroma to gluttony, luxury, or any other sinful thought or deed?</li>
      <li>Have I avoided the good that I ought to do, or thought less of anyone, because my senses were offended?</li>
    </ul>
    <h3>Taste</h3>
    <ul>
      <li>Have I eaten or drunk to excess?</li>
      <li>Have I refused or complained about food set before me because it was not to my liking?</li>
    </ul>
    <h3>Touch</h3>
    <p>Have I done evil, or neglected good, whether in the pursuit of enjoyment and comfort or the avoidance of pain and irritation?</p>
    
    <H2>The Ten Commandments</H2>
    <P class='dropcap'>GOD spake these words, and said:</P>
    <ol type="I">
      <li>I am the Lord thy God; Thou shalt have none other gods but me.</li>
      <li>Thou shalt not make to thyself any graven image, nor the likeness
      of any thing that is in heaven above, or in the earth beneath,
      or in the water under the earth; thou shalt not bow down to them,
      nor worship them,<br>
      <span style="font-size: 75%;">for I the Lᴏʀᴅ thy God am a jealous God, and visit the sins
      of the fathers upon the children, unto the third and fourth generation
      of them that hate me; and show mercy unto thousands in them that
      love me and keep my commandments.</span></li>
      <li>Thou shalt not take the Name of the Lord thy God in vain,<br>
      <span style="font-size: 75%;">for the Lᴏʀᴅ will not hold him guiltless, that taketh his Name in vain.</span></li>
      <li>Remember that thou keep holy the Sabbath-day.<br>
      <span style="font-size: 75%;">Six days shalt thou labour, and do all that thou hast to
      do; but the seventh day is the Sabbath of the Lᴏʀᴅ thy God. In
      it thou shalt do no manner of work; thou, and thy son, and thy
      daughter, thy man-servant, and thy maid-servant, thy cattle,
      and the stranger that is within thy gates. For in six days the
      Lᴏʀᴅ made heaven and earth, the sea, and all that in them is,
      and rested the seventh day: wherefore the Lᴏʀᴅ blessed the seventh
      day, and hallowed it.</span></li>
      <li>Honour thy father and thy mother.<br>
      <span style="font-size: 75%;">that thy days may be long in the land which the Lᴏʀᴅ thy God giveth thee.</span></li>
      <li>Thou shalt do no murder.</li>
      <li>Thou shalt not commit adultery.</li>
      <li>Thou shalt not steal.</li>
      <li>Thou shalt not bear false witness against thy neighbour.</li>
      <li>Thou shalt not covet<br>
      <span style="font-size: 75%;">thy neighbour’s house, thou shalt not covet thy neighbour’s
      wife, nor his servant, nor his maid, nor his ox, nor his ass, nor any thing that is his.</span></li>
    </ol>

    <h2>The Works of Mercy</h2>
    <p>Feed the hungry. ❦ Give drink to the thirsty. ❦ Clothe the naked. ❦ Shelter the homeless. ❦ Visit the sick. ❦ Ransom the captive. ❦ Bury the dead.</p>

    <h2>The Gifts of the Holy Ghost</h2>
    <p>Wisdom ❦ Understanding ❦ Counsel ❦ Fortitude ❦ Knowledge ❦ Piety ❦ Fear of the Lord</p>

    <h2>The Fruit of the Spirit</h2>
    <p>Love ❦ Joy ❦ Peace ❦ Longsuffering ❦ Gentleness ❦ Goodness ❦ Faith ❦ Meekness ❦ Temperance</p>

    <h2>The Beatitudes</h2>
    <ol type="I">
      <li>Blessed are the poor in spirit: for theirs is the kingdom of heaven.</li>
      <li>Blessed are they that mourn: for they shall be comforted.</li>
      <li>Blessed are the meek: for they shall inherit the earth.</li>
      <li>Blessed are they which do hunger and thirst after righteousness: for they shall be filled.</li>
      <li>Blessed are the merciful: for they shall obtain mercy.</li>
      <li>Blessed are the pure in heart: for they shall see God.</li>
      <li>Blessed are the peacemakers: for they shall be called the children of God.</li>
      <li>Blessed are they which are persecuted for righteousness’ sake: for theirs is the kingdom of heaven.</li>
    </ol>`;
