function getOffice(now, week, feast) {

    //------------------COMMINATION
    if (week === "AW" && now.getDay() === 3 || //Ash Wednesday
      week === "GF" || //Good Friday
      now.getDate() < 8 && now.getDay() === 5) //first Friday of the month
        return "penitentialOffice.html";
        
    /*const day = now.getDay();
    
    var result = "";
    //------------------LITANY
    result += getLitany(liturgicalDay, now.getMonth(), now.getDate(), day);

    //------------------ALL SOULS
    if (now.getMonth() === 10 && now.getDate() === 2) result = getMemorial();
    */
    //------------------DAILY PRAYERS
    //officeType: 1=MP, 2=EP, 3=Compline
    var officeType = 0;
    if (now.getHours() >= 5 && now.getHours() < 12)
        if (['A1', 'A2', 'A3', 'A4'].includes(week) || feast === "JohnBaptist") return "advent/mp.html";
        else if (['Xmas', 'X1'].includes(week)) return "xmas/mp.html";
        else if (['AW', 'L1', 'L2', 'L3', 'L4', 'L5', 'Palm', 'HW-Mon', 'HW-Tue', 'HW-Wed', 'HW-Thu', 'GF', 'EE'].includes(week)) return "lent/mp.html";
        else if (['Easter', 'EasterMon', 'EasterTue'].includes(week)) return "easter/mp.html";
        else if (['Whitsun', 'Whitmon', 'WhitTue'].includes(week)) return "whitsun/mp.html";
        else if (feast === "Thanksgiving") return "harvest/mp.html";
        else return "ordinary/mp.html";
    else if (now.getHours() < 21)
        if (feast !== "") return "ordinary/ep_festal.html";
        else return "ordinary/ep.html";
        //week in A1 A2 A3 A4 =>
            //feast !== "" => "advent/ep_festal.html"
            //else => "advent/ep.html"
        //week in AW L1 L2 L3 L4 L5 Palm HW-Mon HW-Tue HW-Wed HW-Thu GF EE =>
            //feast !== "" => "lent/ep_festal.html"
            //else => "lent/ep.html"
        //week in Easter EasterMon EasterTue => "easter/ep.html"
        //week in Xmas X1 => "xmas/ep.html"
        //week in Whitsun Whitmon WhitTue || feast !== "" => "ordinary/ep_festal.html"
    else return "compline.html";
    
    /*  
    //All Conditions
    if (day === 3 || day === 5) //All Conditions on W & F
        result += `<h2>A Prayer for All Conditions of Men</h2>
            <p>O GOD, the Creator and Preserver of all mankind, we humbly beseech thee for all sorts and conditions of men: that thou wouldest be pleased to make thy ways known unto them, thy saving health unto all nations. More especially, we pray for the good estate of the Catholick Church; that it may be so guided and governed by thy good Spirit, that all who profess and call themselves Christians may be led into the way of truth, and hold the faith in unity of spirit, in the bond of peace, and in righteousness of life. Finally, we commend to thy fatherly goodness all those, who are any ways afflicted, or distressed, in mind, body, or estate; <i>[especially ________,]</i> that it may please thee to comfort and relieve them, according to their several necessities, giving them patience under their sufferings, and a happy issue out of all their afflictions. And this we beg for Jesus Christ his sake. Amen.</p>`;
    
    //General Thanks
    if (day === 0 || day === 4) //General Thanksgiving on Su & Th
        result += `<h2>A General Thanksgiving</h2>
            <p>ALMIGHTY God, Father of all mercies, we thine unworthy servants do give thee most humble and hearty thanks for all thy goodness and loving-kindness to us, and to all men; <i>[particularly ________.]</i> We bless thee for our creation, preservation, and all the blessings of this life; but above all, for thine inestimable love in the redemption of the world by our Lord Jesus Christ; for the means of grace, and for the hope of glory. And, we beseech thee, give us that due sense of all thy mercies, that our hearts may be unfeignedly thankful, and that we shew forth thy praise, not only with our lips, but in our lives; by giving up ourselves to thy service, and by walking before thee in holiness and righteousness all our days; through Jesus Christ our Lord, to whom with thee and the Holy Ghost be all honour and glory, world without end. Amen.</p>`;
    */
}
