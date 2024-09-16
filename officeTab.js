function getOffice(now, liturgicalDay) {
    const day = now.getDay();
    
    var result = "";
    //------------------LITANY
    result = getLitany(liturgicalDay, now.getMonth(), now.getDate(), day);
    
    //------------------COMMINATION
    result += getPenitentialOffice(liturgicalDay, now.getDate(), day);
    
    //------------------DAILY PRAYERS
    if (result === "") {
        //officeType: 1=MP, 2=EP, 3=Compline
        var officeType = 0;
        if (now.getHours() >= 5 && now.getHours() < 10) officeType = 1;
        else if (now.getHours() >= 15 && now.getHours() < 21) officeType = 2;
        else if (now.getHours() >= 21 && now.getHours() < 5) officeType = 3;
    
        //Title
        if (officeType === 1) result += "<h1>Morning Prayer</h1>";
        else if (officeType === 2) result += "<h1>Evening Prayer</h1>";
        else if (officeType === 3) result += '<h1>Night Prayer</h1><p>ALMIGHTY and most merciful Father.</p>';
    
        //Our Father and first marginalium
        if (officeType > 0) result += "<p>OUR Father.</p><img class='leftMarg' src='" + getOfficeMargin1(now) + "'>";
    
        //Canticle
        var canticle = "";
        if (officeType === 1) canticle = makeP(getMorn(liturgicalDay));
        else if (officeType === 2) canticle = makeP(getEve(liturgicalDay));
        else if (officeType === 3) canticle = `<p>LORD, now lettest thou thy servant depart in peace : according to thy word.<br>
            For mine eyes have seen thy salvation : which thou hast prepared : before the face of all people;<br>
            To be a light to lighten the Gentiles : and to be the glory of thy people Israel.</p>
            <p>Glory be to the Father, and to the Son : and to the Holy Ghost;<br>
            Answer. As it was in the beginning, is now, and ever shall be : world without end. Amen.</p>`;
    
        result += canticle;
    
        //Creed when not Te Deum
        if (officeType !== 3 && !canticle.startsWith("WE praise")) result += "I BELIEVE in God.";
    
        //Collect(s)
        result += "<div><img class='rightMarg' src='" + getOfficeMargin2(now) + "'>";
        if (officeType === 1) result += "<p>O LORD, our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.</p>";
        else if (officeType === 2) result += "<p>O GOD, from whom all holy desires, all good counsels, and all just works do proceed; Give unto thy servants that peace which the world cannot give; that both our hearts may be set to obey thy commandments, and also that by thee, we, being defended from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Saviour. Amen.</p>";
        else if (officeType === 3) result += "<p>LIGHTEN our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Saviour, Jesus Christ. Amen.</p>";
        result += "</div>";
        
        //All Conditions
        if (day === 3 || day === 5) //All Conditions on W & F
            result += `<h2>A Prayer for All Conditions of Men</h2>
                <p>O GOD, the Creator and Preserver of all mankind, we humbly beseech thee for all sorts and conditions of men: that thou wouldest be pleased to make thy ways known unto them, thy saving health unto all nations. More especially, we pray for the good estate of the Catholick Church; that it may be so guided and governed by thy good Spirit, that all who profess and call themselves Christians may be led into the way of truth, and hold the faith in unity of spirit, in the bond of peace, and in righteousness of life. Finally, we commend to thy fatherly goodness all those, who are any ways afflicted, or distressed, in mind, body, or estate; <i>[especially ________,]</i> that it may please thee to comfort and relieve them, according to their several necessities, giving them patience under their sufferings, and a happy issue out of all their afflictions. And this we beg for Jesus Christ his sake. Amen.</p>`;
        
        //General Thanks
        if (day === 0 || day === 4) //General Thanksgiving on Su & Th
            result += `<h2>A General Thanksgiving</h2>
                <p>ALMIGHTY God, Father of all mercies, we thine unworthy servants do give thee most humble and hearty thanks for all thy goodness and loving-kindness to us, and to all men; <i>[particularly ________.]</i> We bless thee for our creation, preservation, and all the blessings of this life; but above all, for thine inestimable love in the redemption of the world by our Lord Jesus Christ; for the means of grace, and for the hope of glory. And, we beseech thee, give us that due sense of all thy mercies, that our hearts may be unfeignedly thankful, and that we shew forth thy praise, not only with our lips, but in our lives; by giving up ourselves to thy service, and by walking before thee in holiness and righteousness all our days; through Jesus Christ our Lord, to whom with thee and the Holy Ghost be all honour and glory, world without end. Amen.</p>`;
    
        //TODO additional prayers
        
        result += "<p>THE grace.</p>";
    }
    return result;
}
