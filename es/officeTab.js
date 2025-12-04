function getOffice(now, week, feast) {
    const day = now.getDay();
    //------------------COMMINATION
    if (week === "AW" && day === 3 || //Ash Wednesday
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
        if (now.getHours() >= 3 && now.getHours() < 12) officeType = 1;
        else if (now.getHours() >= 12 && now.getHours() < 21) officeType = 2;
        else officeType = 3;
    const topMarg = getOfficeMargin1(now, feast || week);
                if (topMarg) document.getElementById("topMarg").src = topMarg;
                else document.getElementById("topMarg").style.display = "none";
        switch (officeType) {
            case 1:
                document.getElementById("office-name").textContent = "Oración Matutina";
                let antiphon = getAntiphon(synthDate(week, feast, day), day);
                if (antiphon) document.getElementById("antiphon").innerHTML = makeP(antiphon);
                let canticle = getMorningCanticle(week, feast);
                document.getElementById("canticle").innerHTML = canticle;
                if (!canticle.startsWith(`WE`))
                    document.getElementById("creed-or-suffrages").innerHTML = `<p class="dropcap">CREO en Dios Padre Todopoderoso, Creador del cielo y de la tierra:<br>
    Y en Jesucristo su único Hijo nuestro Señor: Que fué concebido por el Espíritu Santo, Nació de la Virgen María: Padeció bajo el poder de Poncio Pilato, Fué crucificado, muerto y sepultado: Descendió a los infiernos; Al tercer día resucitó de entre los muertos: Subió a los cielos, Y está sentado a la diestra de Dios Padre, Todopoderoso: De donde ha de venir a juzgar a los vivos y a los muertos.<br>
    Creo en el Espíritu Santo: La Santa Iglesia Católica; La Comunión de los Santos: El Perdón de los pecados: La Resurrección del Cuerpo: Y la Vida Perdurable. Amén.</p>`;
                getLessonFromFile(feast || week, "./lessons/morning.json").then(lessonContent => {
                    document.getElementById('lesson').innerHTML = `<h2>${lessonContent.cit}</h2>${makeP(lessonContent.txt)}`;
                });
                document.getElementById("office-collect").innerHTML = "<p>Oh Señor, nuestro Padre Celestial, Poderoso y Eterno Dios, que nos has conducido con seguridad al principio de este día; Defiéndenos con tu gran poder; y concede que no caigamos hoy en ningún pecado, ni incurramos en ningún peligro; sino que todas nuestras acciones, siendo dirigidas y gobernadas por ti, sean justas a tus ojos; mediante Jesucristo nuestro Señor. Amén.</p>";
                const cantMarg = getOfficeMargin2(now, feast || week);
                if (cantMarg) document.getElementById("cantMarg").src = cantMarg;
                else document.getElementById("cantMarg").style.display = "none";
                break;
            case 2:
                document.getElementById("office-name").textContent = "Oración Vespertina";
                document.getElementById("canticle").innerHTML = getEveningCanticle(feast, week);
                document.getElementById("creed-or-suffrages").innerHTML = `<p class="dropcap">OH Señor, muéstranos tu misericordia.<br>
                 	  <b>Y concédenos tu salvación.</b><br>
                 	  Oh Señor, salva al Estado.<br>
                 	  <b>Y óyenos misericordiosamente cuando te invocamos.</b><br>
                 	  Adorna a tus Ministros de rectitud.<br>
                 	  <b>Y alegra a tu pueblo escogido.</b><br>
                 	  Oh Señor, salva a tu pueblo.<br>
                 	  <b>Y bendice a tu heredad.</b><br>
                 	  Danos paz en nuestros días, oh Señor.<br>
                 	  <b>Porque sólo en ti, Señor, estamos seguros.</b><br>
                 	  Oh Dios, purifica nuestros corazones.<br>
                   	<b>Y no quites de nosotros tu Santo Espíritu.</b></p>`;
                document.getElementById("office-collect").innerHTML = "<p>Oh Dios, de quien proceden todos los deseos santos, todos los buenos consejos y todas las obras justas; Da tus siervos la paz que el mundo no les puede dar; a fin de que nuestros corazones se inclinen a cumplir tus mandamientos, y, amparados por ti, contra el temor de nuestros enemigos, podamos vivir en tranquila paz; por los méritos de Jesucristo nuestro Señor. Amén.</p>";
                getLessonFromFile(feast || week, "./lessons/evening.json", "./lessons/morning.json").then(lessonContent => {
                    document.getElementById('lesson').innerHTML = `<h2>${lessonContent.cit}</h2>${makeP(lessonContent.txt)}`;
                });
                //document.getElementById('lesson').style.display = "none";
                break;
            case 3:
                document.getElementById("office-name").textContent = "Oración de la Noche";
                document.getElementById("lp").innerHTML = "Omnipotente y misericordiosísimo Padre; Hemos errado, y nos hemos extraviado de tus caminos como ovejas perdidas. Hemos seguido demasiado los designios deseos de nuestro propio corazón. Hemos faltado a tus Santas leyes. Hemos dejado de hacer lo que debíamos haber hecho; Y hemos hecho lo que no debíamos hacer; Y en nosotros no hay salud. Mas Tú, Oh Señor, compadécete de nosotros, miserables pecadores. Libra, oh Dios, a los que confiesan sus culpas. Restaura a los que se arrepienten; Según tus promesas declaradas al género humano en Jesucristo nuestro Señor. Y concédenos, oh Padre misericordiosísimo, por su amor; Que de aquí en adelante vivamos una vida sobria, santa y justa, para gloria de tu Santo Nombre. Amén.";
                document.getElementById("lp").className = "dropcap";
                document.getElementById("canticle").innerHTML = `<p class='dropcap'>AHORA despides, Señor, a tu siervo, * conforme a tu palabra, en paz.<br>
    Porque han visto mis ojos * tu salvación,<br>
    La cual has aparejado * en presencia de todos los pueblos;<br>
    Luz para ser revelada a los Gentiles, * y la gloria de tu pueblo Israel.</p>
                    <p>Gloria al Padre, y al Hijo, y al Espíritu Santo.<br> Como era al principio, es ahora, y será siempre, por los siglos de los siglos. Amén.</p>`;
                document.getElementById("office-collect").innerHTML = "<p>Suplicamoste, Oh Señor, disipes nuestras tinieblas; y por tu gran misericordia guárdanos de todos los peligros y riesgos de esta noche; por amor de tu Hijo único nuestro Salvador Jesucristo. Amén.</p>";
                document.getElementById('sentence').style.display = "none";
                document.getElementById("additional-prayers").style.display = "none";
                break;
            default:
                document.getElementById("office-name").textContent = "Error";
                break;
            }

            document.getElementById("sentence").innerHTML = makeDropCap(getSentence(feast || week, officeType));
        } catch (e) {
            document.getElementById('creed-or-suffrages').innerHTML = `<p>I AM ERROR ${e}</p>`;
        }
    
        //All Conditions
        var additionalPrayers = //`<p>BLESS thy servant <i>N.</i> with health of body and of spirit. Let the hand of thy blessing be upon her head night and day, and support her in all necessities, strengthen her in all temptations, comfort her in all sorrows, and let her be thy servant in all changes; and make us both to dwell with thee for ever in thy favour, in the light of thy countenance, and in thy glory. Amen.<i>⸺Jeremy Taylor</i></p>
            //<p>ALMIGHTY God, heavenly Father, who hast blessed us with the joy and care of children; Give us light and strength so to train them, that they may love whatsoever things are true and pure and lovely and of good report, following the example of their Saviour Jesus Christ. Amen.</p>
            "<p>O God, merciful and gracious, who hast made my family, my friends, and my benefactors ministers of thy mercy and instruments of Providence to me, I humbly beg a blessing to descend upon the heads of <i>N, &c.</i> and all those who desire our prayers. Send thy holy angels to guard their persons, thy Holy Spirit to guide their souls, thy providence to minister to their necessities; and let thy grace and mercy preserve them from the bitter pains of hell, and bring them to everlasting life, through Jesus Christ. Amen.<i>⸺after Jeremy Taylor</i></p>" +
           // <p>PRESERVE, O Lord, we beseech thee, thy servant <i>N.</i> under the shield of thy protection. And as thou hast ordained of thy grace that she be with child, so when the time of her labour shall draw near, graciously deliver her and mercifully keep her, and her child, from all disquietude. Amen.</p>
            "<p>O heavenly Father, who in thy Word hast given us a vision of that holy City to which the nations of the world bring their glory: Behold and visit, we beseech thee, the <I>City</i> of <I>N.</i> Renew the bonds of charity that uphold our civic life. Send us honest and able leaders. Deliver us from poverty, prejudice, and oppression, that peace may prevail with righteousness, and justice with mercy. And at the last, bring us to thy Holy City, the new Jerusalem, where we shall know perfect unity and peace; through Jesus Christ our Lord. Amen.</p>";
        if ((day === 3 || day === 5) && officeType == 1) //All Conditions on W & F Morning
            additionalPrayers += `<h2>Oración por las Personas de todas Condiciones</h2>
                <p>Oh Dios, Creador y Conservador del género humano, te rogamos humildemente por los hombres de todas clases y condiciones; suplicándote que te dignes hacerles conocer tus caminos, y tu salud eterna a todas las naciones. Y más especialmente te rogamos por tu Santa Iglesia universal; para que sea dirigida y gobernada por tu Santo Espíritu, a fin de que todos los que profesan y se llaman Cristianos sean conducidos por el camino de la verdad, y guarden la fe en unidad de espíritu, en vínculo de paz y en rectitud de vida. Y, finalmente, encomendamos a tu bondad paternal a todos los que de cualquiera manera están afligidos, o angustiados, en mente, cuerpo o haberes; ... suplicándote les consueles y alivies, según sus diversas necesidades; dándoles paciencia en sus sufrimientos, y una feliz liberación de todas sus aflicciones. Y esto pedimos por amor de Jesucristo, nuestro Señor. Amén.</p>`;
        
        //General Thanks
        if (day === 0 || day === 4) //General Thanksgiving on Su & Th
            additionalPrayers += `<h2>Acción de Gracias en General</h2>
                <p>Omnipotente Dios, Padre de toda misericordia, nosotros, tus indignos siervos, te damos muy humildes y cordiales gracias por toda tu bondad, benignidad y favor para con nosotros y con todos los hombres; ... Te bendecimos por nuestra creación, preservación y todos los bienes de esta vida; mas sobre todo, por tu inestimable amor en la redención del mundo por nuestro Señor Jesucristo; por los medios de gracia, y la esperanza de gloria. Y te suplicamos nos des pleno conocimiento de todas tus misericordias, para que nuestros corazones sean llenos de pura gratitud; y te alabemos, no sólo con nuestros labios, sino también con nuestras vidas, entregándonos enteramente a tu servicio, y caminando ante tus ojos en santidad y justicia todos los días de nuestra vida; por Jesucristo nuestro Señor, a quien, contigo y el Espíritu Santo, sea todo honor y gloria eternamente. Amén.</p>`;

        //Ember Days
        additionalPrayers += getEmberDayPrayer(week, now.getMonth(), now.getDate(), day);

        //Passiontide
        if (['L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'Maundy', 'GF', 'EE'].includes(week))
            additionalPrayers += `Blessèd Jesus, the only thing greater than the pain and anguish of your Passion was your mercy toward mankind, even to me. All this deserves more love than I have to give. Therefore, Lord, I beseech you to turn me all into love, and all my love into obedience, and let my obedience be without interruption. Make me to be something you delight in, that I may offer you all that I am, and all that I have. Clothe my soul in your garment, hide my sins in your wounds, and bury them in your grave, and then let me rise in the life of grace, and abide and grow in it, till I arrive at the kingdom of glory. Amen.<i>⸺Jeremy Taylor</i>`;

        //Grace
        additionalPrayers += "<p>LA gracia de nuestro Señor Jesucristo, y el amor de Dios, y la comunión del Espíritu Santo, sea con todos nos otros, por siempre jamás. Amén.</p>";
        
        document.getElementById("additional-prayers").innerHTML = additionalPrayers;
    }
}

function getMorningCanticle(week, feast) {
    //Benedictus Dominus
    if (['A1', 'A2', 'A3', 'A4'].includes(week) || feast === "JohnBaptist") return `<p class="dropcap" style='margin-bottom: 0;'>BENDITO el Señor Dios de Israel, * que ha visitado y redimido a su pueblo;<br>
    Y nos alzó poderosa Salvación, * en la casa de David su siervo.<br>
    Como habló por boca de sus santos Profetas, * que existieron desde el principio del mundo.<br>
    Que nos libraría de nuestros enemigos, * y de la mano de los que nos aborrecen.<br><br>
    Para ejecutar la misericordia prometida a nuestros padres, * y recordar su santo pacto.<br>
    Para ejecutar el juramento que juró a nuestro padre Abrahán, * que se nos daría;<br>
    Que, siendo librados de la mano de nuestros enemigos * le serviríamos sin temor;<br>
    En santidad y justicia ante El, * todos los días de nuestra vida.<br>
    Y Tú, oh niño, profeta del Altísimo serás llamado: * porque andarás ante la faz del Señor, para preparar sus caminos,<br>
    Para dar a conocer la salvación a su pueblo * y la remisión de sus pecados,<br>
    Por la tierna misericordia de nuestro Dios: * por la cual la Aurora de lo Alto nos ha visitado,<br>
    Para dar luz a los que están en tinieblas, y en sombra de muerte, * y para guiar nuestros pies hacia el camino de paz.</p>
        <p>GLORIA al Padre, y al Hijo, * y al Espíritu Santo; <br> Como era al principio, es ahora, y será siempre, * por los siglos de los siglos. Amén.</p>`;
    
    //Pascha Nostrum
    if (['Easter', 'EasterMon', 'EasterTue'].includes(week) && [0, 1, 2].includes (new Date().getDay())) return `<p class="dropcap">CHRIST our passover is sacrificed for us, * therefore let us keep the feast;<br>
          Not with the old leaven, nor with the leaven of malice and wickedness, * but with the unleavened bread of sincerity and truth. <i>1 Cor. 5:7, 8</i></p>
        <p>Christ being raised from the dead dieth no more, * death hath no more dominion over him.<br>
          For in that he died, he died unto sin once, * but in that he liveth, he liveth unto God.<br>
          Likewise reckon ye also yourselves to be dead indeed unto sin, * but alive unto God through Jesus Christ our Lord. <i>Rom. 6:9-11</i></p>
        <p>Christ is risen from the dead, * and become the first-fruits of them that slept.<br>
          For since by man came death, * by man came also the resurrection of the dead.<br>
          For as in Adam all die, * even so in Christ shall all be made alive. <i>1 Cor. 15:20-22</i></p>
        <p>GLORIA al Padre, y al Hijo, * y al Espíritu Santo; <br> Como era al principio, es ahora, y será siempre, * por los siglos de los siglos. Amén.</p>`;
    
    //Benedictus Es
    if (['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week) && !(feast === 'Annunciation' && (new Date()).getDay() !== 0)) return `<p class="dropcap">BENDITO eres Tú, oh Señor Dios de nuestros padres: * Alabado y exaltado sobre todo para siempre.<br>
    Bendito eres Tú por el Nombre de tu Majestad: * Alabado y exaltado sobre todo para siempre.<br>
    Bendito eres Tú en el templo de tu Santidad: * Alabado y exaltado sobre todo para siempre.<br>
    Bendito eres Tú que contemplas los abismos, y habitas entre los Querubines: *Alabado y exaltado sobre todo para siempre.<br>
    Bendito eres Tú sobre el glorioso trono de tu Reino: * Alabado y exaltado sobre todo para siempre.<br>
    Bendito eres Tú, en el firmamento de los cielos: * Alabado y exaltado sobre todo para siempre.</p>
        <p>GLORIA al Padre, y al Hijo, * y al Espíritu Santo; <br> Como era al principio, es ahora, y será siempre, * por los siglos de los siglos. Amén.</p>`;

    //Te Deum
    if (['Xmas', 'X1', 'Whitsun', 'Whitmon', 'WhitTue'].includes(week) || feast === 'Annunciation') return `<p style='margin-bottom: 0;' class="dropcap">TE alabamos, oh Dios; Señor, Te confesamos. Toda la tierra Te adora, oh Padre eterno.<br>
    A Ti todos los Angeles; los cielos y todas las potestades;<br>
    Los Querubines y los Serafines con incesante voz Te proclaman,<br>
    Santo, Santo, Santo, Señor Dios de las Huestes;<br>
    Llenos están los cielos y la tierra: de la Majestad de tu gloria.<br>
    A Ti el glorioso coro de los Apóstoles.<br>
    El número laudable de los Profetas.<br>
    La blanca multitud de los Mártires: Te alaban.<br>
    La Iglesia por la extensión del orbe: Te confiesa:<br>
    Padre, de Majestad infinita;<br>
    A tu Hijo único, verdadero y adorable:<br>
    Y también al Espíritu Santo, Consolador.<br><br>
TU, Cristo, Rey de la gloria<br>
    Tú eres el Hijo sempiterno del Padre.<br>
    Tú, al emprender la redención del hombre, no temiste venir al seno de la Virgen.<br>
    Tú, al vencer el aguijón de la muerte, abriste a los creyentes el reino de los cielos.<br>
    Tú estás sentado a la diestra de Dios, en la gloria del Padre.<br>
    Creemos que eres el Juez que ha de venir.<br>
    Por tanto, te rogamos, socorras a tus siervos, a quienes redimiste con tu sangre preciosa.<br>
    Haz que sean contados con tus santos, en la gloria eterna.<br><br>
SALVA, Señor, a tu pueblo, y a tu heredad bendice. Gobiérnale, y ensálzale perpetuamente.<br>
    Todos los días Te bendecimos;<br>
    Y alabamos tu Nombre en los siglos, y por los siglos de los siglos.<br>
    Dígnate, Señor, guardarnos sin pecado en este día. Ten misericordia de nosotros, Señor, ten misericordia de nosotros.<br>
    Señor, sea tu misericordia sobre nosotros, según de ti hemos esperado.<br>
    En Ti, Señor, he confiado; jamás seré confundido.</p>`;

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
        <p>GLORIA al Padre, y al Hijo, * y al Espíritu Santo; <br> Como era al principio, es ahora, y será siempre, * por los siglos de los siglos. Amén.</p>`;
    
    //Psalm 100;
    return `<p class="dropcap">REGOCIJAOS en el SEÑOR, todas las naciones: * servid al SEÑOR con alegría, venid ante su presencia con cánticos.<br>
    Sabed que el SEÑOR es Dios; El nos hizo, y no nosotros mismos; * pueblo suyo somos, y ovejas de su rebaño.<br>
    Entrad por sus puertas con acción de gracias, y en sus atrios con alabanzas; *confesadle, y bendecid su Nombre.<br>
    Porque benigno es el SEÑOR, eterna es su misericordia; * y su verdad permanece de generación en generación.</p>
        <p>GLORIA al Padre, y al Hijo, * y al Espíritu Santo; <br> Como era al principio, es ahora, y será siempre, * por los siglos de los siglos. Amén.</p>`;
}

function getEveningCanticle(isFeast, week) {
    if (isFeast && !['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week)) return `<p class="dropcap">GLORIA a Dios en las alturas; y en la tierra paz; a los hombres buena voluntad. Te alabamos, Te bendecimos, Te adoramos; Te glorificamos; Te damos gracias por tu grande gloria, Oh Señor Dios, Rey Celestial, Dios Padre Omnipotente.<br>
    Oh Señor, Hijo Unigénito, Jesucristo; Oh Señor Dios, Cordero de Dios, Hijo del Padre, que quitas los pecados del mundo, ten misericordia de nosotros. Tú que quitas los pecados del mundo, acepta nuestra oración. Tú, que estás sentado a la diestra de Dios Padre, ten misericordia de nosotros.<br>
    Porque Tú sólo eres Santo; Tú sólo eres el Señor; Tú sólo eres Altísimo, oh Cristo, con el Espíritu Santo, en la gloria de Dios Padre. Amén.</p>`;

    return `<p class="dropcap">ENGRANDECE mi alma al Señor, * y mi espíritu se alegró en Dios mi Salvador.<br>
    Porque ha mirado * a la bajeza de su sierva.<br>
    Porque he aquí, desde ahora * me dirán bienaventurada todas las generaciones.<br>
    Porque me ha hecho grandes cosas el Poderoso; * y santo es su Nombre.<br>
    Y su misericordia de generación a generación * a los que le temen.<br>
    Hizo valentía con su brazo; * esparció los soberbios del pensamiento de su corazón.<br>
    Quitó los poderosos de los tronos, * y levantó a los humildes.<br>
    A los hambrientos hinchió de bienes; * y a los ricos envió vacíos.<br>
    Recibió a Israel su siervo, acordándose de la misericordia, * como habló a nuestros padres, a Abrahán y a su simiente para siempre.</p>
        <p>GLORIA al Padre, y al Hijo, * y al Espíritu Santo; <br> Como era al principio, es ahora, y será siempre, * por los siglos de los siglos. Amén.</p>`;
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
    <p class='dropcap'>BLESS the Lord, who forgiveth all our sins.<br>
    <b>His mercy endureth for ever.</b></p>
    
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
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Thou shalt not take the Name of the Lord thy God in vain,<br>
      <span style="font-size: 75%;">for the Lᴏʀᴅ will not hold him guiltless, that taketh his Name in vain.</span></li>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Remember that thou keep holy the Sabbath-day.<br>
      <span style="font-size: 75%;">Six days shalt thou labour, and do all that thou hast to
      do; but the seventh day is the Sabbath of the Lᴏʀᴅ thy God. In
      it thou shalt do no manner of work; thou, and thy son, and thy
      daughter, thy man-servant, and thy maid-servant, thy cattle,
      and the stranger that is within thy gates. For in six days the
      Lᴏʀᴅ made heaven and earth, the sea, and all that in them is,
      and rested the seventh day: wherefore the Lᴏʀᴅ blessed the seventh
      day, and hallowed it.</span></li>
    </ol>
    <p><b>Lord, have mercy upon us, and incline our hearts to keep this law.</b></p>
    <ol type="I" start="5">
      <li>Honour thy father and thy mother.<br>
      <span style="font-size: 75%;">that thy days may be long in the land which the Lᴏʀᴅ thy God giveth thee.</span></li>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Thou shalt do no murder.</li>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Thou shalt not commit adultery.</li>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Thou shalt not steal.</li>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Thou shalt not bear false witness against thy neighbour.</li>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      <li>Thou shalt not covet<br>
      <span style="font-size: 75%;">thy neighbour’s house, thou shalt not covet thy neighbour’s
      wife, nor his servant, nor his maid, nor his ox, nor his ass, nor any thing that is his.</span></li>
    </ol>
    <p><b>Lord, have mercy upon us, and write all these thy laws in our hearts, we beseech thee.</b></P>

    <h2>Confession</h2>
    <p class='dropcap'>ALMIGHTY God, Father of our Lord Jesus Christ,<BR>
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
    For thy Son our Lord Jesus Christ’s sake, <BR>
    Forgive us all that is past; <BR>
    And grant that we may ever hereafter <BR>
    Serve and please thee <BR>
    In newness of life, <BR>
    To the honour and glory of thy Name; <BR>
    Through Jesus Christ our Lord. Amen.</p>

    <p class='dropcap'>HEAR what comfortable words our Saviour Christ saith unto all that truly turn to him.<br>
      Come unto me all that travail and are heavy laden, and I will refresh you. <i>&mdash;St. Matthew 11:28</i><br>
      So God loved the world, that he gave his only-begotten Son, to the end that all that believe in him should not perish, but have everlasting life. <i>&mdash;St. John 3:16</i></p>

    <p>Hear also what Saint Paul saith.<br>
      This is a true saying, and worthy of all men to be received, that Christ Jesus came into the world to save sinners. <i>&mdash;1 St. Timothy 1:15</i></p>

    <p>Hear also what Saint John saith.<br>
      If any man sin, we have an Advocate with the Father, Jesus Christ the righteous; and he is the propitiation for our sins. <i>&mdash;1 St. John 2:1</i></p>

    <p class='dropcap'>BLESSED is he whose unrighteousness is forgiven * and whose sin is covered.<BR>
    Blessed is the man unto whom the Lᴏʀᴅ imputeth no sin * and in whose spirit there is no guile.<BR>
    I said, I will confess my sins unto the Lᴏʀᴅ * and so thou forgavest the wickedness of my sin.</p>
    <p>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>
    As it was in the beginning, is now, and ever shall be, * world without end. Amen.</p>

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
    </ol>

    <P class='dropcap'>O ALMIGHTY Lord, and everlasting God, vouchsafe, we beseech thee,
      to direct, sanctify, and govern, both our hearts and bodies,
      in the ways of thy laws, and in the works of thy commandments;
      that, through thy most mighty protection, both here and ever,
      we may be preserved in body and soul; through our Lord and Saviour
      Jesus Christ. Amen.</P>
    
    <p class='dropcap'>THE Lord bless us, and keep us. The Lord make his face to shine upon us, and be gracious unto us. The Lord lift up his countenance upon us, and give us peace, both now and evermore. Amen.</p>`;
