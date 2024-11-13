function getLitany(lit, month, date, day) {
    if (//isEmberDay(lit, month, date, day) || //ember days REMOVED and replaced by other.
       isRogationDay(lit, day) || //rogation days
       lit === "GF" || //good friday
       lit === "AW" && (day === 3 || day === 5) || //ash wednesday, friday thereafter
       (lit === "L2" || lit === "L3" || lit === "L4" || lit === "L5") && day === 5) //other fridays in lent
        return `<H1>The Litany</H1>
        <P>O GOD the Father, Creator of heaven and earth; <B><BR>
            Have mercy upon us. </B><BR>
        O God the Son, Redeemer of the world...<BR>
        O God the Holy Ghost, Sanctifier of the faithful...<BR>
        O holy, blessed, and glorious Trinity, one God...
    </P>
    <p>
        Remember not, Lord, our offences, nor the offences of our forefathers; neither take thou vengeance of our sins:<BR>
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
        We sinners do beseech thee to hear us, O Lord God; and that it may please thee to rule and govern thy holy Church universal in the right way;<BR>
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
        That it may please thee to give us true repentance; to forgive us all our sins, negligences, and ignorances; and to endue us with the grace of thy Holy Spirit to amend our lives according to thy holy Word...<BR>
        Son of God, we beseech thee to hear us.<BR>
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

    <p>OUR Father.</p>
    <hr>
    <P>
        O Lord, deal not with us according to our sins.<br>
        <B>Neither reward us according to our iniquities.</B>
    </p>
    <p> Let us pray.<BR>
        O God, merciful Father, who despisest not the sighing of a contrite
        heart, nor the desire of such as are sorrowful; Mercifully assist
        our prayers which we make before thee in all our troubles and
        adversities, whensoever they oppress us; and graciously hear us,
        that those evils which the craft and subtilty of the devil or
        man worketh against us, may, by thy good providence, be brought
        to nought; that we thy servants, being hurt by no persecutions,
        may evermore give thanks unto thee in thy holy Church; through
        Jesus Christ our Lord. Amen.<BR>
        <B>O Lord, arise, help us, and deliver us for thy Name's sake.</B><BR>
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
    <p>
        Let us pray.<BR>
        We humbly beseech thee, O Father, mercifully to look upon our
        infirmities; and, for the glory of thy Name, turn from us all
        those evils that we most justly have deserved; and grant, that
        in all our troubles we may put our whole trust and confidence
        in thy mercy, and evermore serve thee in holiness and pureness
        of living, to thy honour and glory; through our only Mediator
        and Advocate, Jesus Christ our Lord. Amen.</p>`;

return "";
}
