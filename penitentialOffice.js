function getPenitentialOffice(lit, date, weekday) {
  if (lit === "AW" && weekday === 3 || //Ash Wednesday
      lit === "GF" || //Good Friday
      date < 8 && weekday === 5) {//first Friday of each month
    return `<H1>A Penitential Office</H1>
    <P>GOD spake these words, and said:<BR>
      I. &emsp; I am the Lord thy God; Thou shalt have none other gods but me.<br>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      II. &emsp; Thou shalt not make to thyself any graven image, nor the likeness
      of any thing that is in heaven above, or in the earth beneath,
      or in the water under the earth; thou shalt not bow down to them,
      nor worship them.<br>
      <!--<H5>for I the LORD thy God am a jealous God, and visit the sins
      of the fathers upon the children, unto the third and fourth generation
      of them that hate me; and show mercy unto thousands in them that
      love me and keep my commandments.</H5>-->
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      III. &emsp; Thou shalt not take the Name of the Lord thy God in vain.<br>
      <!--<H5>for the LORD will not hold him guiltless, that taketh his
      Name in vain.</H5>-->
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      IV. &emsp; Remember that thou keep holy the Sabbath-day.<br>
      <!--<H5>Six days shalt thou labour, and do all that thou hast to
      do; but the seventh day is the Sabbath of the LORD thy God. In
      it thou shalt do no manner of work; thou, and thy son, and thy
      daughter, thy man-servant, and thy maid-servant, thy cattle,
      and the stranger that is within thy gates. For in six days the
      LORD made heaven and earth, the sea, and all that in them is,
      and rested the seventh day: wherefore the LORD blessed the seventh
      day, and hallowed it.</H5>-->
        <b>Lord, have mercy upon us, and incline our hearts to keep this law.</b></p>
      <p>V. &emsp; Honour thy father and thy mother.<br>
      <!--<H5>that thy days may be long in the land which the LORD thy
      God giveth thee.</H5>-->
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      VI. &emsp; Thou shalt do no murder.<br>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      VII. &emsp; Thou shalt not commit adultery.<br>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      VIII. &emsp; Thou shalt not steal.<br>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      IX. &emsp; Thou shalt not bear false witness against thy neighbour.<br>
        <!--<b>Lord, have mercy upon us, and incline our hearts to keep this law.</b><br>-->
      X. &emsp; Thou shalt not covet.<br>
      <!--<H5>thy neighbour's house, thou shalt not covet thy neighbour's
      wife, nor his servant, nor his maid, nor his ox, nor his ass,
      nor any thing that is his.</H5>-->
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

<p>BLESSED is he whose unrighteousness is forgiven : and whose sin is covered.<BR>
Blessed is the man unto whom the Lord imputeth no sin : and in whose spirit there is no guile.<BR>
I said, I will confess my sins unto the Lord : and so thou forgavest the wickedness of my sin.</p>
    <p>Glory be.</P>
    
    <p>THE Lord bless us, and keep us. The Lord make his face to shine upon us, and be gracious unto us. The Lord lift up his countenance upon us, and give us peace, both now and evermore. Amen.</p>`;
  }

  return "";
}
