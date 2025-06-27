function getOffice(now, week, feast) {
    const day = now.getDay();
    //------------------ALL SOULS
    if (now.getMonth() === 10 && now.getDate() === 2) document.getElementById("tab-0").innerHTML = getMemorial();
    //------------------COMMINATION
    else if (week === "AW" && day === 3 || //Ash Wednesday
        week === "GF" || //Good Friday
        now.getDate() < 8 && day === 5) //first Friday of the month
        document.getElementById("tab-0").innerHTML = commination;

    else if (//isEmberDay(week, now.getMonth(), now.getDate(), day) || //ember days
        isRogationDay(week, day) || //rogation days
        week === "GF" || //good friday
        week === "AW" && (day === 3 || day === 5) || //ash wednesday, friday thereafter
        (week === "L2" || week === "L3" || week === "L4" || week === "L5") && day === 5) //other fridays in lent
        document.getElementById("tab-0").innerHTML = litany;
    
    else {
        try {
        //------------------DAILY PRAYERS
        //officeType: 1=MP, 2=EP, 3=Compline
        var officeType = 0;
        if (now.getHours() >= 5 && now.getHours() < 12) officeType = 1;
        else if (now.getHours() < 21) officeType = 2;
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
                if (!canticle.startsWith(`<span class="drop-cap">W</span>E`))
                    document.getElementById("creed-or-suffrages").innerHTML = `<p><span class='drop-cap'>I</span> BELIEVE in God the Father Almighty, Maker of heaven and earth: <br>
                        And in Jesus Christ his only Son our Lord: Who was conceived by the Holy Ghost, Born of the Virgin Mary: Suffered under Pontius Pilate, Was crucified, dead, and buried: He descended into hell; The third day he rose again from the dead: He ascended into heaven, And sitteth on the right hand of God the Father Almighty: From thence he shall come to judge the quick and the dead.<br>
                        I believe in the Holy Ghost: The holy Catholic Church; The Communion of Saints: The Forgiveness of sins: The Resurrection of the body, And the Life everlasting. Amen.</p>`;
                getLessonFromFile(feast || week, "./lessons/morning.json").then(lessonContent => {
                    document.getElementById('lesson').innerHTML = `<h2>${lessonContent.cit}</h2><p>${makeDropCap(lessonContent.txt)}</p>`;
                });
                document.getElementById("office-collect").innerHTML = "<p><span class='drop-cap'>O</span> LORD, our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings, being ordered by thy governance, may be righteous in thy sight; through Jesus Christ our Lord. Amen.</p>";
                
                const cantMarg = getOfficeMargin2(now, feast || week);
                if (cantMarg) document.getElementById("cantMarg").src = cantMarg;
                else document.getElementById("cantMarg").style.display = "none";
                break;
            case 2:
                else document.getElementById("topMarg").style.display = "none";
                document.getElementById("office-name").textContent = "Evening Prayer";
                document.getElementById("canticle").innerHTML = getEveningCanticle(feast, week);
                document.getElementById("creed-or-suffrages").innerHTML = `<p><span class="drop-cap">O</span> LORD, show thy mercy upon us.<br>
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
                //getLessonFromFile(feast || week, "./lessons/evening.json").then(lessonContent => {
                //    document.getElementById('lesson').innerHTML = `<h2>${lessonContent.cit}</h2><p>${makeDropCap(lessonContent.txt)}</p>`;
                //});
                document.getElementById('lesson').style.display = "none";
                
                document.getElementById("office-collect").innerHTML = "<p><span class='drop-cap'>O</span> GOD, from whom all holy desires, all good counsels, and all just works do proceed; Give unto thy servants that peace which the world cannot give; that both our hearts may be set to obey thy commandments, and also that by thee, we, being defended from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Saviour. Amen.</p>";
                break;
            case 3:
                document.getElementById("office-name").textContent = "Night Prayer";
                document.getElementById("lp").innerHTML = "<span class='drop-cap'>A</span>LMIGHTY and most merciful Father; We have erred, and strayed from thy ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against thy holy laws. We have left undone those things which we ought to have done; And we have done those things which we ought not to have done; And there is no health in us. But thou, O Lord, have mercy upon us, miserable offenders. Spare thou them, O God, who confess their faults. Restore thou them that are penitent; According to thy promises declared unto mankind in Christ Jesu our Lord. And grant, O most merciful Father, for his sake; That we may hereafter live a godly, righteous, and sober life, To the glory of thy holy Name. Amen.";
                document.getElementById("canticle").innerHTML = `<p><span class='drop-cap'>L</span>ORD, now lettest thou thy servant depart in peace * according to thy word.<br>
                    For mine eyes have seen * thy salvation,<br>
                    Which thou hast prepared * before the face of all people;<br>
                    To be a light to lighten the Gentiles * and to be the glory of thy people Israel.</p>
                    <p>Glory be to the Father, and to the Son * and to the Holy Ghost;<br>
                    As it was in the beginning, is now, and ever shall be * world without end. Amen.</p>`;
                document.getElementById("office-collect").innerHTML = "<p><span class='drop-cap'>L</span>IGHTEN our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Saviour, Jesus Christ. Amen.</p>";
                document.getElementById('sentence').style.display = "none";
                break;
            default:
                document.getElementById("office-name").textContent = "Error";
                break;
            }

            document.getElementById("sentence").innerHTML = makeP(makeDropCap(getSentence(feast || week, officeType)));
        } catch (e) {
            document.getElementById('creed-or-suffrages').innerHTML = `<p>I AM ERROR ${e}</p>`;
        }
    
        //All Conditions
        var additionalPrayers = `<p>BLESS thy servant <i>N.</i> with health of body and of spirit. Let the hand of thy blessing be upon her head night and day, and support her in all necessities, strengthen her in all temptations, comfort her in all sorrows, and let her be thy servant in all changes; and make us both to dwell with thee for ever in thy favour, in the light of thy countenance, and in thy glory. Amen.<i>⸺Jeremy Taylor</i></p>
            <p>ALMIGHTY God, heavenly Father, who hast blessed us with the joy and care of children; Give us light and strength so to train them, that they may love whatsoever things are true and pure and lovely and of good report, following the example of their Saviour Jesus Christ. Amen.</p>
            <p>O GOD, Giver of life, hear our prayer for <I>N.</i> and for the child she hath conceived, that, by thy grace, they both may come in safety to a timely and healthy birth, and rejoice in thy gracious providence, through Jesus Christ, who liveth and reigneth with thee and the Holy Spirit, one God, world without end. Amen.</p>
            <p>O HEAVENLY Father, who in thy Word hast given us a vision of that holy City to which the nations of the world bring their glory: Behold and visit, we beseech thee, the <I>City</i> of <I>N.</i>. Renew the bonds of charity that uphold our civic life. Send us honest and able leaders. Deliver us from poverty, prejudice, and oppression, that peace may prevail with righteousness, and justice with mercy. And at the last, bring us to thy Holy City, the new Jerusalem, where we shall know perfect unity and peace; through Jesus Christ our Lord. Amen.</p>`;
        if ((day === 3 || day === 5) && officeType == 1) //All Conditions on W & F Morning
            additionalPrayers += `<h2>A Prayer for All Conditions of Men</h2>
                <p><span class="drop-cap">O</span> GOD, the Creator and Preserver of all mankind, we humbly beseech thee for all sorts and conditions of men: that thou wouldest be pleased to make thy ways known unto them, thy saving health unto all nations. More especially, we pray for thy holy Church universal; that it may be so guided and governed by thy good Spirit, that all who profess and call themselves Christians may be led into the way of truth, and hold the faith in unity of spirit, in the bond of peace, and in righteousness of life. Finally, we commend to thy fatherly goodness all those, who are any ways afflicted, or distressed, in mind, body, or estate; <i>[especially ________,]</i> that it may please thee to comfort and relieve them, according to their several necessities, giving them patience under their sufferings, and a happy issue out of all their afflictions. And this we beg for Jesus Christ's sake. Amen.</p>`;
        
        //General Thanks
        if (day === 0 || day === 4) //General Thanksgiving on Su & Th
            additionalPrayers += `<h2>A General Thanksgiving</h2>
                <p><span class="drop-cap">A</span>LMIGHTY God, Father of all mercies, we thine unworthy servants do give thee most humble and hearty thanks for all thy goodness and loving-kindness to us, and to all men; <i>[particularly ________.]</i> We bless thee for our creation, preservation, and all the blessings of this life; but above all, for thine inestimable love in the redemption of the world by our Lord Jesus Christ; for the means of grace, and for the hope of glory. And, we beseech thee, give us that due sense of all thy mercies, that our hearts may be unfeignedly thankful, and that we shew forth thy praise, not only with our lips, but in our lives; by giving up ourselves to thy service, and by walking before thee in holiness and righteousness all our days; through Jesus Christ our Lord, to whom with thee and the Holy Ghost be all honour and glory, world without end. Amen.</p>`;

        //Ember Days
        additionalPrayers += getEmberDayPrayer(week, now.getMonth(), now.getDate(), day);

        //Passiontide
        if (['L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'Maundy', 'GF', 'EE'].includes(week))
            additionalPrayers += `Blessèd Jesus, the only thing greater than the pain and anguish of your Passion was your mercy toward mankind, even to me. All this deserves more love than I have to give. Therefore, Lord, I beseech you to turn me all into love, and all my love into obedience, and let my obedience be without interruption. Make me to be something you delight in, that I may offer you all that I am, and all that I have. Clothe my soul in your garment, hide my sins in your wounds, and bury them in your grave, and then let me rise in the life of grace, and abide and grow in it, till I arrive at the kingdom of glory. Amen. <i>Jeremy Taylor</i>`;

        //Grace
        additionalPrayers += "<p><span class='drop-cap'>T</span>HE grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. Amen.</p>";
        
        document.getElementById("additional-prayers").innerHTML = additionalPrayers;
    }
}

function getMorningCanticle(week, feast) {
    //Benedictus Dominus
    if (['A1', 'A2', 'A3', 'A4'].includes(week) || feast === "JohnBaptist") return `<p style='margin-bottom: 0;'><span class="drop-cap">B</span>LESSED be the Lord God of Israel; * for he hath visited and redeemed his people;<br>
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
    if (['Easter', 'EasterMon', 'EasterTue'].includes(week) && [0, 1, 2].includes (new Date().getDay())) return `<p><span class="drop-cap">C</span>HRIST our passover is sacrificed for us, * therefore let us keep the feast;<br>
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
    if (['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week) && !(feast === 'Annunciation' && (new Date()).getDay() !== 0)) return `<p><span class="drop-cap">B</span>LESSED art thou, O Lord God of our fathers: * praised and exalted above all for ever.<br>
        Blessed art thou for the Name of thy Majesty: * praised and exalted above all for ever.<br>
        Blessed art thou in the temple of thy holiness: * Praised and exalted above all for ever.<br>
        Blessed art thou that beholdest the depths, and dwellest between the Cherubim: * praised and exalted above all for ever.<br>
        Blessed art thou on the glorious throne of thy Kingdom: * praised and exalted above all for ever.<br>
        Blessed art thou in the firmament of heaven: * praised and exalted above all for ever.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;

    //Te Deum
    if (['Xmas', 'X1', 'Whitsun', 'Whitmon', 'WhitTue'].includes(week) || feast === 'Annunciation') return `<p style='margin-bottom: 0;'><span class="drop-cap">W</span>E praise thee, O God; we acknowledge thee to be the Lord.<br>
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
        <p>O LORD, save thy people, and bless thine heritage.<br>
        Govern them and lift them up for ever.<br>
        Day by day we magnify thee;<br>
        And we worship thy Name ever, world without end.<br>
        Vouchsafe, O Lord, to keep us this day without sin.<br>
        O Lord, have mercy upon us, have mercy upon us.<br>
        O Lord, let thy mercy be upon us, as our trust is in thee.<br>
        O Lord, in thee have I trusted; let me never be confounded.</p>`;

    //Thanksgiving
    if (feast === "Thanksgiving") return `<p><span class="drop-cap">O</span> PRAISE the Lord, for it is a good thing to sing praises unto our God; * yea, a joyful and pleasant thing it is to be thankful.<br>
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
    return `<p><span class="drop-cap">O</span> BE joyful in the Lord, all ye lands: * serve the Lord with gladness, and come before his presence with a song.
        Be ye sure that the Lord he is God; it is he that hath made us, and not we ourselves; * we are his people, and the sheep of his pasture.
        O go your way into his gates with thanksgiving, and into his courts with praise; * be thankful unto him, and speak good of his Name.
        For the Lord is gracious, his mercy is everlasting; * and his truth endureth from generation to generation.</p>
        <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>`;
}

function getEveningCanticle(isFeast, week) {
    if (isFeast && !['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week)) return `<p><span class="drop-cap">G</span>LORY be to God on high, and on earth peace, good will towards men. We praise thee, we bless thee, we worship thee, we glorify thee, we give thanks to thee for thy great glory, O Lord God, heavenly King, God the Father Almighty.<br>
        O Lord, the only-begotten Son, Jesus Christ; O Lord God, Lamb of God, Son of the Father, that takest away the sins of the world, have mercy upon us. Thou that takest away the sins of the world, receive our prayer. Thou that sittest at the right hand of God the Father, have mercy upon us.<br>
        For thou only art holy; thou only art the Lord; thou only, O Christ, with the Holy Ghost, art most high in the glory of God the Father. Amen.</p>`;

    return `<p><span class="drop-cap">M</span>Y soul doth magnify the Lord, * and my spirit hath rejoiced in God my Saviour.<br>
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

async function getLessonFromFile(liturgicalDay, filePath) {
    try {
        var day = liturgicalDay;
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (day === "T25") day = "E6";
        else if (day === "T26") day = "E5";
        const lessonText = await handleBibleReference(data[day].cit);
        return { "cit": data[day].cit, "txt": lessonText } || ""; // Return the actual value for the liturgicalDay or an empty string if not found
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return error;
    }
}

const litany = `<H1>The Litany</H1>
        <P>O GOD the Father, Creator of heaven and earth; <B><BR>
            Have mercy upon us. </B><BR>
        O God the Son, Redeemer of the world...<BR>
        O God the Holy Ghost, Sanctifier of the faithful...<BR>
        O holy, blessed, and glorious Trinity, one God...
    </P>
    <p>
        REMEMBER not, Lord, our offences, nor the offences of our forefathers; neither take thou vengeance of our sins:<BR>
        Spare us, good Lord, spare thy people, whom thou hast redeemed with thy most precious blood, and be not angry with us for ever.<br>
            <B>Spare us, good Lord.</B><BR>
        From all evil and mischief; from sin; from the crafts and assaults of the devil; from thy wrath, and from everlasting damnation,<BR>
            <B>Good Lord, deliver us.</B><BR>
        From all blindness of heart; from pride, vainglory, and hypocrisy; from envy, hatred, and malice, and all uncharitableness...<BR>
        From all inordinate and sinful affections; and from all the deceits of the world, the flesh, and the devil...<BR>
        From lightning and tempest; from earthquake, fire, and flood; from plague, pestilence, and famine; from battle and murder, and from sudden death...<BR>
        From all sedition, privy conspiracy, and rebellion; from all false doctrine, heresy, and schism; from hardness of heart, and contempt of thy Word and Commandment...<BR>
        By the mystery of thy holy Incarnation; by thy holy Nativity and Circumcision; by thy Baptism, Fasting, and Temptation...<BR>
        By thine Agony and Bloody Sweat; by thy Cross and Passion; by thy precious Death and Burial; by thy glorious Resurrection and Ascension, and by the Coming of the Holy Ghost...<BR>
        In all time of our tribulation; in all time of our prosperity; in the hour of death, and in the day of judgment...<BR>
    </p>
    <p>
        WE sinners do beseech thee to hear us, O Lord God; and that it may please thee to rule and govern thy holy Church universal in the right way;<BR>
            <B>We beseech thee to hear us, good Lord.</B><BR>
        That it may please thee so to rule the heart of thy servant the President of the United States, that he may above all things seek thy honour and glory...<BR>
        That it may please thee to bless and preserve all Christian Rulers and Magistrates, giving them grace to execute justice, and to maintain truth...<BR>
        That it may please thee to illuminate all Bishops, Priests, and Deacons, with true knowledge and understanding of thy Word; and that both by their preaching and living they may set it forth, and show it accordingly...<BR>
        That it may please thee to send forth labourers into thy harvest...<BR>
        That it may please thee to bless and keep all thy people...<BR>
        That it may please thee to give to all nations unity, peace, and concord...<BR>
        That it may please thee to give us an heart to love and fear thee, and diligently to live after thy commandments...<BR>
        That it may please thee to give to all thy people increase of grace to hear meekly thy Word, and to receive it with pure affection, and to bring forth the fruits of the Spirit...<BR>
        That it may please thee to bring into the way of truth all such as have erred, and are deceived...<BR>
        That it may please thee to strengthen such as do stand; and to comfort and help the weak-hearted; and to raise up those who fall; and finally to beat down Satan under our feet...<BR>
        That it may please thee to succour, help, and comfort, all who are in danger, necessity, and tribulation...<BR>
        That it may please thee to preserve all who travel by land, by water, or by air, all women in child-birth, all sick persons, and young children; and to show thy pity upon all prisoners and captives...<BR>
        That it may please thee to defend, and provide for, the fatherless children, and widows, and all who are desolate and oppressed...<BR>
        That it may please thee to have mercy upon all mankind...<BR>
        That it may please thee to forgive our enemies, persecutors, and slanderers, and to turn their hearts...<BR>
        That it may please thee to give and preserve to our use the kindly fruits of the earth, so that in due time we may enjoy them...<BR>
        That it may please thee to give us true repentance; to forgive us all our sins, negligences, and ignorances; and to endue us with the grace of thy Holy Spirit to amend our lives according to thy holy Word...<BR><p>

        <p>SON of God, we beseech thee to hear us.<BR>
            <B>Son of God, we beseech thee to hear us.</B><BR>
        O Lamb of God, who takest away the sins of the world;<BR>
            <B>Grant us thy peace.</B><BR>
        O Lamb of God, who takest away the sins of the world;<BR>
            <B>Have mercy upon us.</B><BR>
        O Christ, hear us.<BR>
            <B>O Christ, hear us.</B><BR>
        Lord, have mercy upon us.<BR>
            <B>Lord, have mercy upon us.</B><BR>
        Christ, have mercy upon us.<BR>
            <B>Christ, have mercy upon us.</B><BR>
        Lord, have mercy upon us.<BR>
            <B>Lord, have mercy upon us.</B>
        </P>

    <p>OUR Father, who art in heaven, Hallowed be thy Name. Thy kingdom come. Thy will be done, On earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, As we forgive those who trespass against us. And lead us not into temptation, But deliver us from evil. Amen.</p>
    <hr>
    <P>
        O Lord, deal not with us according to our sins.<br>
        <B>Neither reward us according to our iniquities.</B>
    </p>
    
    <p> O God, merciful Father, who despisest not the sighing of a contrite
        heart, nor the desire of such as are sorrowful; Mercifully assist
        our prayers which we make before thee in all our troubles and
        adversities, whensoever they oppress us; and graciously hear us,
        that those evils which the craft and subtilty of the devil or
        man worketh against us, may, by thy good providence, be brought
        to nought; that we thy servants, being hurt by no persecutions,
        may evermore give thanks unto thee in thy holy Church; through
        Jesus Christ our Lord. Amen.<BR></p>
        
    <p><B>O Lord, arise, help us, and deliver us for thy Name's sake.</B><BR>
        O God, we have heard with our ears, and our fathers have declared unto us, the noble works that thou didst in their days, and in the old time before them.<BR>
            <B>O Lord, arise, help us, and deliver us for thine honour.</B><BR>
        Glory be to the Father, and to the Son, and to the Holy Ghost;<BR>
            <B>As it was in the beginning, is now, and ever shall be, world without end. Amen. </B><BR>
        From our enemies defend us, O Christ. <B><BR>
            Graciously look upon our afflictions.</B><BR>
        With pity behold the sorrows of our hearts. <B><BR>
            Mercifully forgive the sins of thy people.</B><BR>
        Favourably with mercy hear our prayers. <B><BR>
            O Son of David, have mercy upon us. </B><BR>
        Both now and ever vouchsafe to hear us, O Christ. <B><BR>
            Graciously hear us, O Christ; graciously hear us, O Lord Christ.</B><BR>
        O Lord, let thy mercy be showed upon us;<BR>
            <B>As we do put our trust in thee.</B>
    </p>
    <hr>
    <p>We humbly beseech thee, O Father, mercifully to look upon our
        infirmities; and, for the glory of thy Name, turn from us all
        those evils that we most justly have deserved; and grant, that
        in all our troubles we may put our whole trust and confidence
        in thy mercy, and evermore serve thee in holiness and pureness
        of living, to thy honour and glory; through our only Mediator
        and Advocate, Jesus Christ our Lord. Amen.</p>`;

const commination = `<H1>A Penitential Office</H1>
    <P>GOD spake these words, and said:<BR>
      I. &emsp; I am the Lord thy God; Thou shalt have none other gods but me.<br>
      II. &emsp; Thou shalt not make to thyself any graven image, nor the likeness
      of any thing that is in heaven above, or in the earth beneath,
      or in the water under the earth; thou shalt not bow down to them,
      nor worship them.<br>
      III. &emsp; Thou shalt not take the Name of the Lord thy God in vain.<br>
      IV. &emsp; Remember that thou keep holy the Sabbath-day.<br>
        <b>Lord, have mercy upon us, and incline our hearts to keep this law.</b></p>
      <p>V. &emsp; Honour thy father and thy mother.<br>
      VI. &emsp; Thou shalt do no murder.<br>
      VII. &emsp; Thou shalt not commit adultery.<br>
      VIII. &emsp; Thou shalt not steal.<br>
      IX. &emsp; Thou shalt not bear false witness against thy neighbour.<br>
      X. &emsp; Thou shalt not covet.<br>
        <b>Lord, have mercy upon us, and write all these thy laws in our hearts, we beseech thee.</b>
    </P>
    
    <P>Hear what our Lord Jesus Christ saith.<br>
      THOU shalt love the Lord thy God with all thy heart, and with
      all thy soul, and with all thy mind. This is the first and great
      commandment. And the second is like unto it; Thou shalt love
      thy neighbour as thyself. On these two commandments hang all the Law and the Prophets.
    </P>

    <p>ALMIGHTY God, Father of our Lord Jesus Christ,<BR>
    Maker of all things, judge of all men;<BR>
    We acknowledge and bewail our manifold sins and wickedness,<BR>
    Which we, from time to time, most grievously have committed,<BR>
    By thought, word, and deed,<BR>
    Against thy Divine Majesty,<BR>
    Provoking most justly thy wrath and indignation against us.<BR>
    We do earnestly repent, <BR>
    And are heartily sorry for these our misdoings; <BR>
    The remembrance of them is grievous unto us; <BR>
    The burden of them is intolerable. <BR>
    Have mercy upon us, <BR>
    Have mercy upon us, most merciful Father; <BR>
    For thy Son our Lord Jesus Christ's sake, <BR>
    Forgive us all that is past; <BR>
    And grant that we may ever hereafter <BR>
    Serve and please thee <BR>
    In newness of life, <BR>
    To the honour and glory of thy Name; <BR>
    Through Jesus Christ our Lord. Amen.</p>
    
    <p>Hear what comfortable words our Saviour Christ saith unto all that truly turn to him.<br>
      COME unto me all that travail and are heavy laden, and I will refresh you. <i>&mdash;St. Matthew 11:28</i><br>
      So God loved the world, that he gave his only-begotten Son, to the end that all that believe in him should not perish, but have everlasting life. <i>&mdash;St. John 3:16</i></p>

    <p>Hear also what Saint Paul saith.<br>
      This is a true saying, and worthy of all men to be received, that Christ Jesus came into the world to save sinners. <i>&mdash;1 St. Timothy 1:15</i></p>

    <p>Hear also what Saint John saith.<br>
      If any man sin, we have an Advocate with the Father, Jesus Christ the righteous; and he is the propitiation for our sins. <i>&mdash;1 St. John 2:1</i></p>

    <p>BLESSED is he whose unrighteousness is forgiven, * and whose sin is covered.<BR>
    Blessed is the man unto whom the Lord imputeth no sin, * and in whose spirit there is no guile.<BR>
    I said, I will confess my sins unto the Lord; * and so thou forgavest the wickedness of my sin.</p>
    <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
        As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>
    
    <p>THE Lord bless us, and keep us. The Lord make his face to shine upon us, and be gracious unto us. The Lord lift up his countenance upon us, and give us peace, both now and evermore. Amen.</p>`;
