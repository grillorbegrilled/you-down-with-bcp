function getHymns(liturgicalDay) {
    return hymns[liturgicalDay];
}

const hymns = {
    "A1": ["Creator of the starry height,<br>thy people's everlasting light,<br>Jesus, Redeemer, save us all,<br>hear thou thy servants when they call.<br></p><p>Thou, sorr'wing at the helpless cry<br>of all creation doomed to die,<br>didst save our sick and helpless race<br>by healing gifts of heav'nly grace.<br></p><p>Thou cam'st, the Bridegroom of the bride,<br>as drew the world to eventide;<br>proceeding from a virgin shrine,<br>the spotless Victim all divine.<br></p><p>At thy great Name, exalted now,<br>all knees in lowly homage bow;<br>al things in heaven and earth adore,<br>and own thee King for evermore.<br></p><p>To thee, O Holy One, we pray,<br>our Judge in that tremendous day,<br>ward off, while yet we dwell below,<br>the weapons of our crafty foe.<br></p><p>To God the Father, God the Son,<br>and God the Spirit, Three in One,<br>laud, honor, might and glory be<br>from age to age eternally."],    "A2": [""],
    "A3": [""],
    "A4": ["On Jordan's bank the Baptist's cry<br>announces that the Lord is nigh;<br>awake and hearken, for he brings<br>glad tidings of the King of kings.<br></p><p>Then cleansed be every breast from sin;<br>make straight the way for God within,<br>prepare we in our hearts a home<br>where such a mighty Guest may come.<br></p><p>For thou art our salvation, Lord,<br>our refuge and our great reward;<br>without thy grace we waste away<br>like flowers that wither and decay.<br></p><p>To heal the sick stretch out thine hand,<br>and bid the fallen sinner stand;<br>shine forth and let thy light restore<br>earth's own true loveliness once more.<br></p><p>All praise, eternal Son, to thee,<br>whose advent doth thy people free;<br>whom with the Father we adore<br>and Holy Ghost for evermore."],
    "Xmas": [""],
    "Stephen": [""],
    "JohnEvangelist": [""],
    "Innocents": [""],
    "X1": [""],
    "Circ": [""],
    "Epiphany": [""],
    "E1": [""],
    "E2": [""],
    "E3": [""],
    "E4": [""],
    "E5": [""],
    "E6": [""],
    "LXX": [""],
    "LX": [""],
    "L": [""],
    "AW": [""],
    "L1": [""],
    "L2": [""],
    "L3": [""],
    "L4": [""],
    "L5": [""],
    "Palm": [""],
    "HW-Mon": [""],
    "HW-Tue": [""],
    "HW-Wed": [""],
    "HW-Thu": [""],
    "GF": [""],
    "EE": [""],
    "Easter": [""],
    "EasterMon": [""],
    "EasterTue": [""],
    "Ea1": [""],
    "Ea2": [""],
    "Ea3": [""],
    "Ea4": [""],
    "Ea5": [""],
    "Ascension": [""],
    "Asc1": [""],
    "Whitsun": [""],
    "Whitmon": [""],
    "WhitTue": [""],
    "Trinity": [""],
    "T1": [""],
    "T2": [""],
    "T3": [""],
    "T4": ["There's a wideness in God's mercy<br>like the wideness of the sea;<br>there's a kindness in his justice,<br>which is more than liberty.<br>There is welcome for the sinner,<br>and more graces for the good;<br>there is mercy with the Savior; <br>there is healing in his blood.<br></p><p>There is no place where earth's sorrows<br>are more felt than in heaven;<br>there is no place where earth's failings<br>have such kind judgment given.<br>There is plentiful redemption<br>in the blood that has been shed;<br>there is joy for all the members<br>in the sorrows of the Head.<br></p><p>For the love of God is broader<br>than the measure of man's mind;<br>and the heart of the Eternal<br>is most wonderfully kind.<br>If our love were but more faithful,<br>we should take him at his word;<br>and our life would be thanksgiving<br>for the goodness of the Lord."],
    "T5": ["Forth in thy Name, O Lord, I go,<br>my daily labor to pursue;<br>thee, only thee, resolved to know<br>in all I think or speak or do.<br></p><p>The task thy wisdom hath assigned,<br>O let me cheerfully fulfill;<br>in all my works thy presence find,<br>and prove thy good and perfect will.<br></p><p>Thee may I set at my right hand,<br>whose eyes mine inmost substance see,<br>and labor on at thy command,<br>and offer all my works to thee.<br></p><p>Give me to bear thy easy yoke,<br>and every moment watch and pray,<br>and still to things eternal look,<br>and hasten to thy glorious day.<br></p><p>For thee delightfully employ<br>whate'er thy bounteous grace hath giv'n;<br>and run my course with even joy,<br>and closely walk with thee to heav'n."],
    "T6": ["O Jesus, I have promised <br>to serve thee to the end:<br>be thou ever near me, <br>my Master and my friend;<br>I shall not fear the battle<br>if thou art by my side,<br>nor wander from the pathway<br>if thou wilt be my guide.</p><p>O let me feel thee near me! <br>The world is ever near;<br>I see the sights that dazzle, <br>the tempting sounds I hear;<br>my foes are ever near me, <br>around me and within;<br>but Jesus, draw thou nearer, <br>and shield my soul from sin.</p><p>O let me hear thee speaking <br>in accents clear and still,<br>above the storms of passion, <br>the murmurs of self-will;<br>O speak to reassure me, <br>to hasten or control;<br>O speak, and make me listen, <br>thou guardian of my soul.</p><p>O let me see thy features,<br>the look that once could make<br>so many a true disciple<br>leave all things for thy sake:<br>the look that beamed on Peter<br>when he thy name denied;<br>the look that draws thy lovers<br>close to thy piercèd side.</p><p>O Jesus, thou hast promised <br>to all who follow thee,<br>that where thou art in glory <br>there shall thy servant be;<br>and, Jesus, I have promised <br>to serve thee to the end;<br>O give me grace to follow, <br>my Master and my friend.</p><p>O let me see thy footmarks, <br>and in them plant mine own;<br>My hope to follow duly <br>is in thy strength alone.<br>O guide me, call me, draw me, <br>uphold me to the end;<br>and then in heaven receive me, <br>my Savior and my Friend."],
    "T7": [`Take my life, and let it be<br>
            consecrated, Lord, to thee;<br>
            take my moments and my days,<br>
            let them flow in ceaseless praise.</p>
        <p>Take my hands, and let them move<br>
            at the impulse of thy love;<br>
            take my feet, and let them be<br>
            swift and beautiful for thee.</p>
        <p>Take my voice, and let me sing<br>
            always, only, for my King;<br>
            take my lips, and let them be<br>
            filled with messages from thee.</p>
        <p>Take my silver and my gold,<br>
            not a mite would I withhold;<br>
            take my intellect, and use<br>
            every power as thou shalt choose.</p>
        <p>Take my will and make it thine;<br>
            it shall be no longer mine.<br>
            take my heart, it is thine own;<br>
            it shall be thy royal throne.</p>
        <p>Take my love; my Lord, I pour<br>
            at thy feet its treasure store;<br>
            take my self, and I will be<br>
            ever, only, all for thee.`],
    "T8": [`Blessèd are the sons of God,<br>
            They are bought with Christ’s own blood;<br>
            They are ransomed from the grave,<br>
            Life eternal they shall have:<br>
            With them numbered may we be<br>
            Here and in eternity!</p>
        <p>They are justified by grace,<br>
            They enjoy the Savior’s peace;<br>
            All their sins are washed away,<br>
            They shall stand in God’s great Day;<br>
            With them numbered may we be<br>
            Here and in eternity!</p>
        <p>They are lights upon the earth,<br>
            Children of a heav'nly birth;<br>
            One with God, with Jesus one;<br>
            Glory is in them begun:<br>
            With them numbered may we be<br>
            Here and in eternity!`],
    "T9": [`A charge to keep I have,<br>
            A God to glorify,<br>
            A never-dying soul to save,<br>
            And fit it for the sky;</p>
        <p>From youth to hoary age,<br>
            My calling to fulfil;<br>
            O may it all my pow'rs engage<br>
            To do my Master's will.</p>
        <p>Arm me with jealous care,<br>
            As in Thy sight to live;<br>
            And oh, Thy servant, Lord, prepare<br>
            A strict account to give.</p>
        <p>Help me to watch and pray,<br>
            And on Thyself rely;<br>
            And let me ne'er thy trust betray,<br>
            But press to realms on high.`],
    "T10": [`Forward through the ages, in unbroken line,<br>
            move the faithful spirits, at the call divine;<br>
            gifts in different measure, hearts of one accord,<br>
            manifold the service, one the sure reward.</p>
        <p>Forward through the ages, in unbroken line<br>
            move the faithful spirits at the call divine.</p>
        <p>Wider grows the kingdom, reign of love and light;<br>
            for it we must labor, till our faith is sight.<br>
            prophets have proclaimed it, martyrs testified.<br>
            poets sung its glory, heroes for it died.</p>
        <p>Forward through the ages, in unbroken line<br>
            move the faithful spirits at the call divine.</p>
        <p>Not alone we conquer, not alone we fall;<br>
            in each loss or triumph lose or triumph all.<br>
            bound by God's far purpose in one living whole,<br>
            move we on together to the shining goal.</p>
        <p>Forward through the ages, in unbroken line<br>
            move the faithful spirits at the call divine.</p>`],
    "T11": [`With broken heart and contrite sigh,<br>
            a trembling sinner, Lord, I cry;<br>
            thy pard'ning grace is rich and free:<br>
            O God, be merciful to me.</p>
        <p>I smite upon my troubled breast,<br>
            with deep and conscious guilt oppressed,<br>
            Christ and his cross my only plea:<br>
            O God, be merciful to me.</p>
        <p>Far off I stand with tearful eyes,<br>
            nor dare uplift them to the skies;<br>
            but thou dost all my anguish see:<br>
            O God, be merciful to me.</p>
        <p>Nor alms, nor deeds that I have done,<br>
            can for a single sin atone;<br>
            to Calvary alone I flee:<br>
            O God, be merciful to me.</p>
        <p>And when, redeemed from sin and hell,<br>
            with all the ransomed throng I dwell,<br>
            my raptured song shall ever be,<br>
            God has been merciful to me.`],
    "T12": [`Through the love of God, our Savior, <br>
            all will be well;<br>
            free and changeless is his favor, <br>
            all will be well;<br>
            precious is the blood that healed us, <br>
            perfect is the grace that sealed us,<br>
            strong the hand stretched out to shield us, <br>
            all will be well.</p>
        <p>Though we pass through tribulation, <br>
            all will be well;<br>
            ours is such a full salvation, <br>
            all will be well.<br>
            happy when in God confiding, <br>
            fruitful if in Christ abiding,<br>
            holy through the Spirit's guiding, <br>
            all will be well.</p>
        <p>We expect a bright tomorrow; <br>
            all will be well;<br>
            faith can sing through days of sorrow, <br>
            all will be well;<br>
            on our Father's love relying, <br>
            Jesus every need supplying<br>
            in our living, in our dying, <br>
            all will be well.`],
    "T13": [`Lord of Glory, who hast bought us<br>
with Thy lifeblood as the price,<br>
Never grudging for the lost ones<br>
that tremendous sacrifice;<br>
And with that hast freely given<br>
blessings countless as the sand,<br>
To the unthankful and the evil<br>
with Thine own unsparing hand.</p>
        <p>Grant us hearts, dear Lord, to yield Thee<br>
gladly, freely, of Thine own.<br>
With the sunshine of Thy goodness<br>
melt our thankless hearts of stone.<br>
Till our cold and selfish natures,<br>
warmed by Thee, at length believe<br>
That more happy and more blessed <br>
’tis to give than to receive.</p>
        <p>Wondrous honor hast Thou given<br>
to our humblest charity.<br>
In Thine own mysterious sentence,<br>
"Ye have done it unto Me."<br>
Can it be, O gracious Master,<br>
Thou dost deign for alms to sue,<br>
Saying by Thy poor and needy,<br>
"Give as I have given you?"</p>
        <p>Yes: the sorrow and the suffering,<br>
which on every hand we see,<br>
Channels are for tithes and offerings<br>
due by solemn right to Thee;<br>
Right of which we may not rob Thee,<br>
debt we may not choose but pay,<br>
Lest that face of love and pity<br>
turn from us another day.</p>
        <p>Lord of Glory, who hast bought us<br>
with Thy lifeblood as the price,<br>
Never grudging for the lost ones<br>
that tremendous sacrifice;<br>
Give us faith, to trust Thee boldly;<br>
hope, to stay our souls on Thee;<br>
But O, best of all Thy graces,<br>
give us Thine own charity.`],
    "T14": [`Come down, O love divine,<br>
seek thou this soul of mine,<br>
and visit it with thine own ardor glowing;<br>
O Comforter, draw near,<br>
within my heart appear,<br>
and kindle it, thy holy flame bestowing.</p>
        <p>O let it freely burn,<br>
till earthly passions turn<br>
to dust and ashes in its heat consuming;<br>
and let thy glorious light<br>
shine ever on my sight,<br>
and clothe me round, the while my path illuming.</p>
        <p>Let holy charity<br>
mine outward vesture be,<br>
and lowliness become mine inner clothing;<br>
true lowliness of heart,<br>
which takes the humbler part,<br>
and o'er its own shortcomings weeps with loathing.</p>
        <p>And so the yearning strong,<br>
with which the soul will long,<br>
shall far outpass the power of human telling;<br>
for none can guess its grace,<br>
till Love create a place<br>
wherein the Holy Spirit makes a dwelling.`],
    "T15": [""],
    "T16": [""],
    "T17": [""],
    "T18": [""],
    "T19": [""],
    "T20": [""],
    "T21": [""],
    "T22": [""],
    "T23": [""],
    "T24": [""],
    "SNBA": [""],
    "Andrew": [""],
    "Thomas": [""],
    "Paul": [""],
    "Candlemas": [""],
    "Matthias": [""],
    "Annunciation": [""],
    "Mark": [""],
    "PhilipAndJames": [""],
    "Barnabas": [""],
    "JohnBaptist": [""],
    "Peter": [""],
    "James": [`Lord, who shall sit beside thee,<br>
            Enthroned on either hand,<br>
            when clouds no longer hide thee,<br>
            mid all thy faithful band?</p>
        <p>Who drinks the cup of sorrow<br>
            thy Father gave to thee<br>
            neath shows of the morrow<br>
            in dark Gethsemane;</p>
        <p>Who on thy passion thinking<br>
            can find in loss a gain,<br>
            and dare to meet unshrinking<br>
            thy baptism of pain.</p>
        <p>O Jesus, form within us<br>
            thy likeness clear and true;<br>
            by thine example win us<br>
            to suffer or to do.</p>
        <p>This law itself fulfilleth,<br>
            Christlike to Christ is nigh,<br>
            and, where the Father willeth,<br>
            shall sit with Christ on high.`],
    "Bartholomew": [""],
    "Matthew": [""],
    "Michael": [""],
    "Luke": [""],
    "SimonAndJude": [""],
    "AllSaints": [""],
    "ThanksgivingDay": ["O PRAISE the Lord, for it is a good thing to sing praises unto our God; * yea, a joyful and pleasant thing it is to be thankful.<br>The Lord doth build up Jerusalem, * and gather together the outcasts of Israel.<br>He healeth those that are broken in heart, * and giveth medicine to heal their sickness.<br>O sing unto the Lord with thanksgiving; * sing praises upon the harp unto our God:<br>Who covereth the heaven with clouds, and prepareth rain for the earth; * and maketh the grass to grow upon the mountains, and herb for the use of men;<br>Who giveth fodder unto the cattle, * and feedeth the young ravens that call upon him.<br>Praise the Lord, O Jerusalem; * praise thy God, O Sion.<br>For he hath made fast the bars of thy gates, * and hath blessed thy children within thee.<br>He maketh peace in thy borders, * and filleth thee with the flour of wheat.<br>Glory be to the Father, and to the Son, * and to the Holy Ghost;<br>As it was in the beginning, is now, and ever shall be, * world without end. Amen."],
    "WeddingAnniversary": [`O FATHER, all creating,<br>
            whose wisdom, love, and power<br>
            first bound two lives together<br>
            in Eden’s primal hour,<br>
            today to us thy children<br>
            thine earliest gifts renew,<br>
            a home by thee made happy,<br>
            a love by thee kept true.</p>
        <p>O Savior, Guest most bounteous<br>
            of old in Galilee,<br>
            vouchsafe today thy presence<br>
            with us who call on thee;<br>
            our store of earthly gladness<br>
            transform to heav’nly wine,<br>
            and teach us, in the tasting,<br>
            to know the gift is thine.</p>
        <p>O Spirit of the Father,<br>
            breathe on us from above,<br>
            so mighty in thy pureness,<br>
            so tender in thy love;<br>
            that, guarded by thy presence,<br>
            from sin and strife kept free,<br>
            our lives may own thy guidance,<br>
            our hearts be ruled by thee.</p>
        <p>Except thou build it, Father,<br>
            the house is built in vain;<br>
            except thou, Savior, bless it,<br>
            the joy will turn to pain;<br>
            but naught can break the union<br>
            of hearts in thee made one;<br>
            and love thy Spirit hallows<br>
            is endless love begun.`]
};
