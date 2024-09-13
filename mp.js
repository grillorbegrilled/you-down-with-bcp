function get office(now) {

if (now.getHours() < 10) {
        document.getElementById('canticle').innerHTML = makeP(getMorn(liturgicalDay));
        document.getElementById('collect').textContent = "O LORD, our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.";
        if (liturgicalDay === 'Whitsun' || liturgicalDay === 'Whitmon' || liturgicalDay === 'WhitTue' || liturgicalDay === 'Xmas' || liturgicalDay === 'Stephen' || liturgicalDay === 'JohnEvangelist' || liturgicalDay === 'Innocents')
          document.getElementById('creed').innerHTML = "";
    } else if (now.getHours() >= 15) {
      document.getElementById('officeName').textContent = "Evening Prayer";
      document.getElementById('canticle').innerHTML = makeP(getEve(liturgicalDay));  
      document.getElementById('collect').textContent = "O GOD, from whom all holy desires, all good counsels, and all just works do proceed; Give unto thy servants that peace which the world cannot give; that both our hearts may be set to obey thy commandments, and also that by thee, we, being defended from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Saviour. Amen.";
    } else if (now.getHours() < 21) {
        document.getElementById('compline').style.display = "none";
    }else document.getElementById('office').style.display = "none";

    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    document.getElementById('bookmark').src = "images/bookmarks/" + getBookmarkColor(liturgicalDay, month, date) + ".gif";
    
    document.getElementById("officeMarginalium").src = getOfficeMargin(now);

    if (day !== 3 && day !== 5) //All Conditions on W & F
        document.getElementById('pfac').style.display = "none";

    if (day !== 0 && day !== 4) //General Thanksgiving on Su & Th
        document.getElementById('genThanks').style.display = "none";

        <h1 id="officeName">Morning Prayer</h1>
         <p>OUR Father.</p>
        <div id='canticle'></div>
    
        <div id='creed'>
            <p>I BELIEVE in God.</p>
        </div>
    
        <p id='collect'></p>
    
        <div id='pfac'>
            <h2>A Prayer for All Conditions of Men</h2>
            <p>O GOD, the Creator and Preserver of all mankind, we humbly beseech thee for all sorts and conditions of men: that thou wouldest be pleased to make thy ways known unto them, thy saving health unto all nations. More especially, we pray for the good estate of the Catholick Church; that it may be so guided and governed by thy good Spirit, that all who profess and call themselves Christians may be led into the way of truth, and hold the faith in unity of spirit, in the bond of peace, and in righteousness of life. Finally, we commend to thy fatherly goodness all those, who are any ways afflicted, or distressed, in mind, body, or estate; <i>[especially ________,]</i> that it may please thee to comfort and relieve them, according to their several necessities, giving them patience under their sufferings, and a happy issue out of all their afflictions. And this we beg for Jesus Christ his sake. Amen.</p>
        </div>
    
        <div id='genThanks'>
            <h2>A General Thanksgiving</h2>
            <p>ALMIGHTY God, Father of all mercies, we thine unworthy servants do give thee most humble and hearty thanks for all thy goodness and loving-kindness to us, and to all men; <i>[particularly ________.]</i> We bless thee for our creation, preservation, and all the blessings of this life; but above all, for thine inestimable love in the redemption of the world by our Lord Jesus Christ; for the means of grace, and for the hope of glory. And, we beseech thee, give us that due sense of all thy mercies, that our hearts may be unfeignedly thankful, and that we shew forth thy praise, not only with our lips, but in our lives; by giving up ourselves to thy service, and by walking before thee in holiness and righteousness all our days; through Jesus Christ our Lord, to whom with thee and the Holy Ghost be all honour and glory, world without end. Amen.</p>
        </div>
            
        <p>THE grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. Amen.</p>
    </div>
}
