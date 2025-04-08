function getIntercessions() {
    return `<p>BLESS thy servant <i>N.</i> with health of body and of spirit. Let the hand of thy blessing be upon her head night and day, and support her in all necessities, strengthen her in all temptations, comfort her in all sorrows, and let her be thy servant in all changes; and make us both to dwell with thee for ever in thy favour, in the light of thy countenance, and in thy glory. Amen.<i>⸺Jeremy Taylor</i></p>
    <p>ALMIGHTY God, heavenly Father, who hast blessed us with the joy and care of children; Give us light and strength so to train them, that they may love whatsoever things are true and pure and lovely and of good report, following the example of their Saviour Jesus Christ. Amen.</p>
    <p>O GOD, Giver of life, hear our prayer for <I>N.</i> and for the child she hath conceived, that, by thy grace, they both may come in safety to a timely and healthy birth, and rejoice in thy gracious providence, through Jesus Christ, who liveth and reigneth with thee and the Holy Spirit, one God, world without end. Amen.</p>
    <p>O HEAVENLY Father, who in thy Word hast given us a vision of that holy City to which the nations of the world bring their glory: 
        Behold and visit, we beseech thee, the <I>City</i> of <I>N.</i>. 
        Renew the bonds of charity that uphold our civic life. Send 
        us honest and able leaders. Deliver us from poverty, prejudice, 
        and oppression, that peace may prevail with righteousness, and 
        justice with mercy. And at the last, bring us to thy Holy City, 
        the new Jerusalem, where we shall know perfect unity and peace; 
        through Jesus Christ our Lord. Amen.</p>

<p>And now, brethren, summing up all our petitions, and all our thanksgivings, in the words which Christ hath taught us, we make bold to say,</p>
<p>OUR Father, who art in heaven, Hallowed be thy Name. Thy kingdom come. Thy will be done on earth, As it is in heaven. Give us this day our daily bread. And forgive us our trespasses, As we forgive those who trespass against us. And lead us not into temptation; But deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever and ever. Amen.</p>

    <p>ASSIST us mercifully, O Lord, in these our supplications and prayers, and dispose the way of thy servants towards the attainment of everlasting salvation; that, among all the changes and chances of this mortal life, they may ever be defended by thy most gracious and ready help; through Jesus Christ our Lord. Amen.</p>`;
}

function getAddlPrayers(lit) {
    if (["AW", "L1", "L2", "L3", "L4", "L5", "Palm", "HW-Mon", "HW-Tue", "HW-Wed", "Maundy", "GF"].includes(lit))
        return getStations();

    return litOfHum;
}

const litOfHum = `<h1>A Litany of Humility</h1>
    <p>Lord Jesus, meek and humble of heart,<br>
    <b>Hear me.</b><br>
    From the desire to be esteemed,<br>
    <b>Deliver me, Jesus.</b><br>
    From the desire to be loved...<br>
    From the desire to be extolled...<br>
    From the desire to be honored...<br>
    From the desire to be praised...<br>
    From the desire to be preferred to others...<br>
    From the desire to be consulted...<br>
    From the desire to be approved...<br>
    From the fear of being humiliated...<br>
    From the fear of being despised...<br>
    From the fear of being rebuked...<br>
    From the fear of being slandered...<br>
    From the fear of being forgotten...<br>
    From the fear of being ridiculed...<br>
    From the fear of being wronged...<br>
    From the fear of being suspected...</p>
    <p>That others may be loved more than I,<br>
    <b>Jesus, grant me the grace to desire it.</b><br>
    That others may be esteemed more than I...<br>
    That (in the opinion of the world) others may increase and I may decrease...<br>
    That others may be chosen and I set aside...<br>
    That others may be praised and I unnoticed...<br>
    That others may be preferred to me in everything...<br>
    That others may become holier than I, provided that I may become as holy as I should...<span style="display: block; text-align: right; font-style: italic;">⸺after Card. Merry del Val</span></p>`;

function getStations() {
    return `<h1>Stations of the Cross</h1>
        <p>In the name of the Father, and of the Son, and of the Holy Ghost:<br>
        <b>Amen.</b></p>
        <h2>I. Jesus in the Garden of Gethsemane</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your lovingkindness, by which you neglected your own sorrows to comfort the sadness of your disciples, quickening their dullness, encouraging their duty, and arming their weakness against the day of trial.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>II. Jesus is betrayed by Judas and arrested</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your sorrow, that you, Lord of the angels, would yet need and receive comfort from an angel. You offered yourself to your persecutors and received the traitor’s kiss. You healed by a miracle the ear of a spiteful enemy, and reproved your zealous servant in his behalf, and went like a lamb to the slaughter, without noise or violence or resistance, when you could have commanded millions of angels for your guard and rescue.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>III. Jesus is condemned by the Sanhedrin</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your longsuffering when your disciples fled and you were left alone in the hands of cruel men. You were led to the house of Annas, and there asked ensnaring questions, and smitten on the face by him whose ear you had only just healed; and from thence were dragged to the house of Caiaphas; and there all night endured spitting, insults, scorn, beating, and intolerable abuse; and all this for Man, who was your enemy, and the cause of all your sorrows. You were accused before the high priest and railed against, and examined with evil purposes and designs of blood; and declared guilty of death for speaking a most necessary truth.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>IV. Jesus is denied by Peter</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your mercy when your servant Peter denied you and forsook you and forswore you, for when he had, then you looked back on him, and by that gracious and chiding look called him back to himself and to you.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>V. Jesus is judged by Pontius Pilate</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your innocence, for you were sent to Pilate and found blameless, and sent to Herod and still found without guilt, and were then sent back to Pilate, and examined again, and yet nothing but innocence was found in you, and malice round about you. You were more willing to lay down your life for them than they were to take it from you.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>VI. Jesus is scourged at the pillar and crowned with thorns</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be that patience and charity, by which for our sakes you allowed yourself to be beaten with canes, and your holy face, which angels behold with joy and wonder, to be spit on, and to be and scourged with unhallowed hands, and condemned to a sad and shameful, a public and painful death, and arrayed in scarlet and crowned with thorns to be mocked.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>VII. Jesus bears the cross</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O holy Jesus, and blessed be your strength when you were laden with the cross and bound hard with cords, and dragged through the streets, as if you had been a notorious criminal.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>VIII. Jesus is helped by Simon of Cyrene to carry the cross</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O holy Jesus, and blessed be your humility, for when the load of the cross was too great for you to bear because of your wounds, you were content to receive aid from Simon, teaching by his example that we must take up our own crosses and follow you.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>IX. Jesus meets the women of Jerusalem</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your compassion, who yet comforted the weeping women of Jerusalem, and had more pity for your persecutors than for yourself, and were more grieved for the miseries of Jerusalem to come forty years after than for your present passion. You were led outside the gates of the city, to become the sacrifice for those beyond the pale, even for all the world.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>X. Jesus is crucified</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, who were nailed upon the cross, and the cross, being set into a hole in the ground, did in the fall rend the wounds wider, and there, naked and bleeding, sick and faint, wounded and despised, didst hang upon the weight of the nails three long hours, praying for the forgiveness of your persecutors.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>XI. Jesus promises his Kingdom to the repentant thief</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your love, for, even in your agony, you did not ignore the faith of the penitent thief, a faith that all the ages of the Church could never match: for when he saw you condemned to the same fate as himself—crucified, accused, scorned, forsaken, dying, and distressed, with no miracles to prove your divinity or innocence—yet he confessed you a Lord, a King, and his Savior. He confessed his own shame and unworthiness, submitting to the death of the cross, and begging only for your remembrance, for he knew his own sins to be so great, he dared not ask for more. And you, holding the keys of Paradise in your hand, blessed the good thief with the promise to let him in.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>XII. Jesus speaks to his mother and the Beloved Disciple</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, and blessed be your holy Virgin Mother, upon whom old Simeon’s prophecy was now coming to pass. She now truly felt that sword passing through her very soul, and yet she stood by your side, without fleeing, without clamor or pity for herself, but silent in her grief, deep as the waters of the abyss, but smooth as the face of a pool, full of love, and patience, and sorrow, and hope. Now was her time to make use of all your excellent teachings, which you had given to build up her spirit and fortify it against this day, to exercise the strength of faith, to pass from the grief of the Passion to the hope of the Resurrection.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>XIII. Jesus dies on the cross</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, who, when the fullness of your suffering was accomplished, gave your soul into the hands of God, reconciling us, who for our sins have no right or claim before the Father.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        <h2>XIV. Jesus is placed in the tomb</h2>
        <p>We adore you, O Christ, and we praise you,<br>
        <b>For by your holy cross you have redeemed the world.</b></p>
        <p>Blessed be your name, O Jesus, for as your body was composed to burial, and dwelt in darkness three days and three nights, your soul descended to the place of the righteous dead, who waited long in expectation of this day, to loose the bonds of their imprisonment and deliver them with yourself into the presence of God.</p>
        <p>Crucified Lord Jesus,<br>
        <b>Have mercy on us.</b></p>
        
        The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore.
        <b>Amen.</b>`;
}
