function getHymns(liturgicalDay) {
    var day = liturgicalDay;
    if (day === "T25") day = "E6";
    else if (day === "T26") day = "E5";
    
    const items = hymns[day];
    var result = '';
    
    if (items) result = items.map(item => `<p>${item}</p>`).join("<p style='text-align: center;'>✠&#9;✠&#9;✠</p>");

    return {"hymns": result, "multiple": items.length > 1};
}

const hymns = {
    "A1": ["Creator of the starry height,<br>thy people's everlasting light,<br>Jesus, Redeemer, save us all,<br>hear thou thy servants when they call.<br></p><p>Thou, sorr'wing at the helpless cry<br>of all creation doomed to die,<br>didst save our sick and helpless race<br>by healing gifts of heav'nly grace.<br></p><p>Thou cam'st, the Bridegroom of the bride,<br>as drew the world to eventide;<br>proceeding from a virgin shrine,<br>the spotless Victim all divine.<br></p><p>At thy great Name, exalted now,<br>all knees in lowly homage bow;<br>al things in heaven and earth adore,<br>and own thee King for evermore.<br></p><p>To thee, O Holy One, we pray,<br>our Judge in that tremendous day,<br>ward off, while yet we dwell below,<br>the weapons of our crafty foe.<br></p><p>To God the Father, God the Son,<br>and God the Spirit, Three in One,<br>laud, honor, might and glory be<br>from age to age eternally."],    "A2": [""],
    "A3": [""],
    "A4": ["On Jordan's bank the Baptist's cry<br>announces that the Lord is nigh;<br>awake and hearken, for he brings<br>glad tidings of the King of kings.<br></p><p>Then cleansed be every breast from sin;<br>make straight the way for God within,<br>prepare we in our hearts a home<br>where such a mighty Guest may come.<br></p><p>For thou art our salvation, Lord,<br>our refuge and our great reward;<br>without thy grace we waste away<br>like flowers that wither and decay.<br></p><p>To heal the sick stretch out thine hand,<br>and bid the fallen sinner stand;<br>shine forth and let thy light restore<br>earth's own true loveliness once more.<br></p><p>All praise, eternal Son, to thee,<br>whose advent doth thy people free;<br>whom with the Father we adore<br>and Holy Ghost for evermore."],
//--------------------------------------------------------------------
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
    "E6": [`Great God, what do I see and hear?<br>
The end of things created!<br>
The Judge of all men doth appear,<br>
on clouds of glory seated.<br>
The trumpet sounds, the graves restore,<br>
the dead which they contained before!<br>
Prepare, my soul, to meet him.</p>
<p>
The dead in Christ shall first arise<br>
at that last trumpet's sounding.<br>
caught up to meet him in the skies,<br>
with joy their Lord surrounding.<br>
No gloomy fears their souls dismay,<br>
his presence sheds eternal day<br>
on those prepared to meet him.</p>
<p>
Th'ungodly, filled with guilty fears,<br>
behold his wrath prevailing.<br>
In woe they rise, but all their tears<br>
and sighs are unavailing.<br>
The day of grace is past and gone;<br>
trembling they stand before his throne,<br>
all unprepared to meet him.</p>
<p>
Great God, to thee my spirit clings,<br>
thy boundless love declaring.<br>
One wondrous sight my comfort brings,<br>
the Judge my nature wearing.<br>
Beneath his cross I view the day<br>
when heaven and earth shall pass away,<br>
and thus prepare to meet him.`],
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
//--------------------------------------------------------------------
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
    "T15": [`O God of Jacob, by whose hand<br>
Thy people still are fed;<br>
Who, through this weary pilgrimage,<br>
Hast all our fathers led!</p>
        </p> To Thee our humble vows we raise,<br>
To Thee address our prayer;<br>
And in Thy kind and faithful breast<br>
Deposit all our care.</p>
        <p>Through each perplexing path of life<br>
Our wandering footsteps guide;<br>
Give us each day our daily bread,<br>
And raiment fit provide.</p>
        <p>O spread Thy cov'ring wings around,<br>
Till all our wand'rings cease,<br>
And at our Father's loved abode<br>
Our souls arrive in peace!`],
    "T16": [`Through all the changing scenes of life,<br>
in trouble and in joy,<br>
the praises of my God shall still<br>
my heart and tongue employ.</p>
        <p>O magnify the Lord with me,<br>
with me exalt his Name;<br>
when in distress to him I called,<br>
he to my rescue came.</p>
        <p>The hosts of God encamp around<br>
the dwellings of the just;<br>
deliverance he affords to all<br>
who on his succor trust.</p>
        <p>O make but trial of his love;<br>
experience will decide<br>
how blest are they, and only they<br>
who in his truth confide.</p>
        <p>Fear him, ye saints, and you will then<br>
have nothing else to fear;<br>
make you his service your delight;<br>
your wants shall be his care.</p>
        <p>For God preserves the souls of those<br>
who on his truth depend;<br>
to them and their posterity<br>
his blessing shall descend.`],
    "T17": [`Blest are the pure in heart,<br>
for they shall see our God;<br>
the secret of the Lord is theirs,<br>
their soul is Christ's abode.</p>
        <p>The Lord, who left the heavens<br>
our life and peace to bring,<br>
to dwell in lowliness with men,<br>
their Pattern and their King;</p>
        <p>still to the lowly soul<br>
he doth himself impart<br>
and for his dwelling and his throne<br>
chooseth the pure in heart.</p>
        <p>Lord, we thy presence seek;<br>
may ours this blessing be;<br>
give us a pure and lowly heart,<br>
a temple meet for thee.`],
    "T18": [`Where cross the crowded ways of life,<br>
Where sound the cries of race and clan,<br>
Above the noise of selfish strife,<br>
We hear Thy voice, O Son of man.</p>
        <p>In haunts of wretchedness and need,<br>
On shadowed thresholds dark with fears,<br>
From paths where hide the lures of greed,<br>
We catch the vision of Thy tears.</p>
        <p>From tender childhood's helplessness,<br>
From woman's grief, man's burdened toil,<br>
From famished souls, from sorrow's stress,<br>
Thy heart hath never known recoil.</p>
        <p>The cup of water given for Thee<br>
Still holds the freshness of Thy grace;<br>
Yet long these multitudes to see<br>
The sweet compassion of Thy face.</p>
        <p>O Master, from the mountainside,<br>
Make haste to heal these hearts of pain;<br>
Among these restless throngs abide,<br>
O tread the city's streets again;</p>
        <p>Till sons of men shall learn Thy love,<br>
And follow where Thy feet have trod;<br>
Till glorious from Thy heaven above,<br>
Shall come the City of our God.`],
    "T19": [`Breathe on me, Breath of God,<br>
fill me with life anew,<br>
that I may love what thou dost love,<br>
and do what thou wouldst do.</p>
        <p>Breathe on me, Breath of God,<br>
until my heart is pure,<br>
until my will is one with thine,<br>
to do and to endure.</p>
        <p>Breathe on me, Breath of God,<br>
till I am wholly thine,<br>
until this earthly part of me<br>
glows with thy fire divine.</p>
        <p>Breathe on me, Breath of God,<br>
so shall I never die;<br>
but live with thee the perfect life<br>
of thine eternity.`],
    "T20": [`All people that on earth do dwell,<br>
sing to the Lord with cheerful voice:<br>
him serve with mirth, his praise forth tell,<br>
come ye before him and rejoice.</p>
        <p>The Lord, ye know,  is God indeed;<br>
without our aid he did us make:<br>
we are his folk, he doth us feed,<br>
and for his sheep he doth us take.</p>
        <p>O enter then his gates with praise,<br>
approach with joy his courts unto;<br>
praise, laud, and bless his Name always,<br>
for it is seemly so to do.</p>
        <p>For why? the Lord our God is good,<br>
his mercy is for ever sure;<br>
his truth at all times firmly stood,<br>
and shall from age to age endure.</p>
        <p>To Father, Son, and Holy Ghost,<br>
the God whom heaven and earth adore,<br>
from men and from the angel host<br>
be praise and glory evermore.`],
    "T21": [`Soldiers of Christ, arise,<br>
and put your armor on,<br>
strong in the strength which God supplies<br>
through his eternal Son;</p>
        <p>Strong in the Lord of hosts,<br>
and in his mighty power:<br>
who in the strength of Jesus trusts <br>
is more than conqueror.</p>
        <p>Stand then in his great might,<br>
with all his strength endured,<br>
and take, to arm you for the fight,<br>
the panoply of God.</p>
        <p>From strength to strength go on,<br>
wrestle and fight and pray:<br>
tread all the powers of darkness down,<br>
and win the well-fought day.</p>
        <p>That, having all things done,<br>
and all your conflicts past,<br>
ye may obtain, through Christ alone,<br>
a crown of joy at last.</p>
        <p>Jesus, eternal Son,<br>
we praise thee and adore,<br>
who art with God the Father one,<br>
and Spirit evermore.`],
    "T22": [`Lord, with glowing heart I'd praise thee,<br>
for the bliss thy love bestows,<br>
for the pardoning grace that saves me,<br>
and the peace that from it flows:<br>
help, O God, my weak endeavor;<br>
this dull soul to rapture raise:<br>
thou must light the flame, or never<br>
can my love be warmed to praise.</p>
        <p>Praise, my soul, the God that sought thee,<br>
wretched wanderer, far astray;<br>
found thee lost, and kindly brought thee<br>
from the paths of death away;<br>
praise, with love's devoutest feeling,<br>
him who saw thy guilt-born fear,<br>
and, since words can never measure,<br>
let my life show forth thy praise.</p>
        <p>Lord, this bosom's ardent feeling<br>
vainly would my lips express.<br>
Llw before thy footstool kneeling,<br>
deign thy suppliant's prayer to bless:<br>
let thy grace, my soul's chief treasure,<br>
love's pure flame within me raise;<br>
and, since words can never measure,<br>
let my life show forth thy praise.`],
    "T23": [`Blessed city, heavenly Salem,<br>
vision dear of peace and love,<br>
who of living stones art builded<br>
in the height of heaven above,<br>
and, with angel hosts encircled,<br>
as a bride dost earthward move;</p>
        <p>from celestial realms descending,<br>
bridal glory round thee shed,<br>
meet for him whose love espoused thee,<br>
to thy Lord shalt thou be led;<br>
all thy streets and all thy bulwarks<br>
of pure gold are fashioned.</p>
        <p>Bright thy gates of pearl are shining;<br>
they are open evermore;<br>
and by virtue of his merits<br>
thither faithful souls do soar,<br>
who for Christ's dear Name in this world<br>
pain and tribulation bore.</p>
        <p>Many a blow and biting sculpture<br>
polished well those stones elect,<br>
in their places now compacted<br>
by the heavenly Architect,<br>
who therewith hath willed for ever<br>
that his palace should be decked.</p>
        <p>Laud and honor to the Father,<br>
laud and honor to the Son,<br>
laud and honor to the Spirit,<br>
ever Three, and ever One,<br>
consubstantial, coeternal,<br>
while unending ages run.`],
    "T24": [`Rock of ages, cleft for me,<br>
Let me hide myself in Thee;<br>
Let the water and the blood<br>
From Thy side, a healing flood,<br>
Be of sin the double cure,<br>
Save from wrath, and make me pure.</p>
        <p>Should my tears for ever flow,<br>
Should my zeal no languor know,<br>
All for sin could not atone,<br>
Thou must save, and Thou alone;<br>
In my hand no price I bring,<br>
Simply to Thy cross I cling.</p>
        <p>While I draw this fleeting breath,<br>
When mine eyelids close in death,<br>
When I rise to worlds unknown,<br>
And behold thee on thy throne,<br>
Rock of ages, cleft for me,<br>
Let me hide myself in Thee.`],

    "SNBA": [`"Thy kingdom come!" on bended knee<br>
the passing ages pray;<br>
and faithful souls have yearned to see<br>
on earth that kingdom's day.</p>
        <p>But the slow watches of the night<br>
not less to God belong;<br>
and for the everlasting right<br>
the silent stars are strong.</p>
        <p>And lo, already on the hills<br>
the flags of dawn appear;<br>
gird up your loins, ye prophet souls,<br>
proclaim the day is near:</p>
        <p>The day to whose clear shining light<br>
all wrong shall stand revealed,<br>
when justice shall be throned in might,<br>
and every heart be healed;</p>
        <p>When knowledge, hand in hand with peace,<br>
shall walk the earth abroad;<br>
the day of perfect righteousness,<br>
the promised day of God.`],
    "Andrew": [`Jesus calls us; o'er the tumult<br>
of our life's wild, restless sea,<br>
day by day his clear voice soundeth,<br>
saying, "Christian, follow me;"</p>
        <p>as, of old, Saint Andrew heard it<br>
by the Galilean lake,<br>
turned from home and toil and kindred,<br>
leaving all for his dear sake.</p>
        <p>Jesus calls us from the worship<br>
of the vain world's golden store;<br>
from each idol that would keep us,<br>
saying, "Christian, love me more."</p>
        <p>In our joys and in our sorrows,<br>
days of toil and hours of ease,<br>
still he calls, in cares and pleasures,<br>
"Christian, love me more than these."</p>
        <p>Jesus calls us!  By thy mercies,<br>
Savior, may we hear thy call,<br>
give our hearts to thine obedience,<br>
serve and love thee best of all.`],
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
    
    "Matthew": [`He sat to watch o'er customs paid,<br>
a man of scorned and hardening trade,<br>
alike the symbol and the tool<br>
of foreign masters' hated rule.</p>
        <p>But grace within his heart had stirred,<br>
there needed but the timely word;<br>
it came, true Lord of souls, from thee,<br>
that royal summons, "Follow me."</p>
        <p>Enough, when thou wert passing by,<br>
to hear thy voice, to meet thine eye;<br>
he rose, responsive to the call,<br>
and left his task, his gains, his all.</p>
        <p>O wise exchange! with these to part,<br>
and lay up treasures in the heart;<br>
with twofold crown of light to shine<br>
amid thy servants' foremost line.</p>
        <p>Come, Savior, as in days of old;<br>
pass where the world has strongest hold,<br>
and faithless care and selfish greed<br>
are thorns that choke the holy seed.</p>
        <p>Who keeps thy gifts, O bid them claim<br>
the steward's, not the owner's name;<br>
who yield up all for thy dear sake.<br>
let them of Matthew's wealth partake.`],
    "Michael": [`Round the Lord in glory seated,<br>
cherubim and seraphim<br>
filled his temple, and repeated<br>
each to each the alternate hymn:<br>
"Lord, thy glory fills the heaven,<br>
earth is with its fulness stored;<br>
unto thee be glory given,<br>
holy, holy, holy Lord!"</p>
        <p>Heav'n is still with glory ringing,<br>
earth takes up the angels' cry,<br>
"Holy, holy, holy," singing,<br>
"Lord of Hosts, the Lord most high."<br>
With his seraph train before Him,<br>
with his holy church below,<br>
thus conspire we to adore him,<br>
bid we thus our anthem flow.</p>
        <p>"Lord, thy glory fills the heaven,<br>
earth is with its fulness stored;<br>
unto thee be glory given,<br>
holy, holy, holy Lord!"<br>
Thus thy glorious Name confessing,<br>
we adopt thine angels' cry,<br>
"Holy, holy, holy," blessing<br>
thee, the Lord of Hosts most high.`],
    
    "Luke": [""],
    
    "SimonAndJude": [`Thou Who sentest Thine apostles<br>
Two by two before Thy face,<br>
Partners in the night of toiling,<br>
Heirs together of Thy grace,<br>
Throned at length, their labors ended,<br>
Each in his appointed place;</p>
        <p>Praise to Thee for those Thy champions<br>
Whom our hymns to-day proclaim;<br>
One, whose zeal by Thee enlightened<br>
Burned anew with nobler flame;<br>
One, the kinsman of Thy childhood,<br>
Brought at last to know Thy Name.</p>
        <p>Praise to Thee! Thy fire within them<br>
Spake in love, and wrought in power;<br>
Seen in mighty stars and wonders<br>
In Thy Church's mourning hour;<br>
Heard in tones of sternest warning<br>
When the storms began to lower.</p>
        <p>Once again those storms are breaking;<br>
Hearts are failing, love grows cold;<br>
Faith is darkened, sin abounding;<br>
Grievous wolves assail Thy fold:<br>
Save us, Lord, our one Salvation;<br>
Save the faith revealed of old.</p>
        <p>Call the erring by Thy pity;<br>
Warn the tempted by Thy fear;<br>
Keep us true to Thine allegiance,<br>
Counting life itself less dear;<br>
Standing firmer, holding faster,<br>
As we see the end draw near:</p>
        <p>Till with holy Jude and Simon<br>
And the thousand faithful more,<br>
We, the good confession witnessed<br>
And the lifelong conflict o'er,<br>
On the sea of fire and crystal<br>
Stand, and wonder, and adore.`],
    "AllSaints": [`For all the saints, who from their labors rest,<br>
who thee by faith before the world confessed,<br>
thy Name, O Jesus, be forever blessed.<br>
Alleluia, Alleluia!</p>
        <p>Thou wast their Rock, their Fortress and their Might;<br>
thou, Lord, their Captain in the well fought fight;<br>
thou, in the darkness drear, their one true Light.<br>
Alleluia, Alleluia!</p>
        <p>For the apostles' glorious company,<br>
who bearing forth the cross o'er land and sea,<br>
shook all the mighty world, we sing to Thee:<br>
Alleluia, Alleluia!</p>
        <p>For the Evangelists, by whose blest word,<br>
like fourfold streams, the garden of the Lord,<br>
is fair and fruitful, be thy Name adored.<br>
Alleluia, Alleluia!</p>
        <p>For Martyrs, who with rapture kindled eye,<br>
saw the bright crown descending from the sky,<br>
and seeing, grasped it, thee we glorify.<br>
Alleluia, Alleluia!</p>
        <p>O may thy soldiers, faithful, true, and bold,<br>
fight as the saints who nobly fought of old,<br>
and win, with them the victor's crown of gold.<br>
Alleluia, Alleluia!</p>
        <p>O blest communion, fellowship divine!<br>
we feebly struggle, they in glory shine;<br>
all are one in thee, for all are thine.<br>
Alleluia, Alleluia!</p>
        <p>And when the strife is fierce, the warfare long,<br>
steals on the ear the distant triumph song,<br>
and hearts are brave, again, and arms are strong.<br>
Alleluia, Alleluia!</p>
        <p>The golden evening brightens in the west;<br>
soon, soon to faithful warriors comes their rest;<br>
sweet is the calm of paradise the blessed.<br>
Alleluia, Alleluia!</p>
        <p>But lo! there breaks a yet more glorious day;<br>
the saints triumphant rise in bright array;<br>
the King of glory passes on his way.<br>
Alleluia, Alleluia!</p>
        <p>From earth's wide bounds, from ocean's farthest coast,<br>
through gates of pearl streams in the countless host,<br>
and singing to Father, Son and Holy Ghost:<br>
Alleluia, Alleluia!`,
`I sing a song of the saints of God,<br>
patient and brave and true,<br>
who toiled and fought and lived and died<br>
for the Lord they loved and knew.<br>
And one was a doctor, and one was a queen,<br>
and one was a shepherdess on the green:<br>
they were all of them saints of God—and I mean,<br>
God helping, to be one too.</p>
        <p>They loved their Lord so dear, so dear,<br>
and his love made them strong;<br>
and they followed the right, for Jesus' sake,<br>
the whole of their good lives long.<br>
And one was a soldier, and one was a priest,<br>
and one was slain by a fierce wild beast:<br>
and there's not any reason, no, not the least,<br>
why I shouldn't be one too.</p>
        <p>They lived not only in ages past,<br>
there are hundreds of thousands still,<br>
the world is bright with the joyous saints<br>
who love to do Jesus' will.<br>
You can meet them in school, or in lanes, or at sea,<br>
in church, or in trains, or in shops, or at tea,<br>
for the saints of God are just folk like me,<br>
and I mean to be one too.`,
`Ye watchers and ye holy ones,<br>
bright seraphs, cherubim, and thrones,<br>
raise the glad strain! Alleluia!<br>
Cry out, dominions, princedoms, powers,<br>
virtues, archangels, angels’ choirs,<br>
Alleluia! alleluia! alleluia!<br>
Alleluia! alleluia!</p>
<p>O higher than the cherubim,<br>
more glorious than the seraphim,<br>
lead their praises, Alleluia!<br>
Thou bearer of th’eternal Word,<br>
most gracious, magnify the Lord,<br>
Alleluia! alleluia! alleluia!<br>
Alleluia! alleluia!</p>
<p>Respond, ye souls in endless rest,<br>
ye patriarchs and prophets blest,<br>
Alleluia, alleluia!<br>
Ye holy twelve, ye martyrs strong,<br>
all saints triumphant, raise the song, <br>
Alleluia! alleluia! alleluia!<br>
Alleluia! alleluia!</p>
<p>O friends, in gladness let us sing,<br>
supernal anthems echoing,<br>
Alleluia, alleluia!<br>
To God the Father, God the Son,<br>
and God the Spirit, Three in One, <br>
Alleluia! alleluia! alleluia!<br>
Alleluia! alleluia!`,
`Jerusalem, my happy home,<br>
when shall I come to thee?<br>
When shall my sorrows have an end?<br>
Thy joys when shall I see?<br>
Thy saints are crowned with glory great;<br>
they see God face to face;<br>
they triumph still, they still rejoice<br>
most happy is their case.</p>
<p>There David stands with harp in hand<br>
as master of the choir:<br>
ten thousand times that man were blessed<br>
that might this music hear.<br>
Our Lady sings Magnificat<br>
with tune surpassing sweet,<br>
and all the virgins bear their part,<br>
sitting at her feet.</p>
<p>There Magdalen hath left her moan,<br>
and cheerfully doth sing<br>
with blessèd saints, whose harmony<br>
in every street doth ring.<br>
Jerusalem, Jerusalem,<br>
God grant that I may see<br>
thine endless joy, and of the same<br>
partaker ever be!`,
`Lo! what a cloud of witnesses<br>
encompass us around!<br>
Men once like us with suff’ring tried,<br>
but now with glory crowned.</p>
<p>Let us, with zeal like theirs inspired,<br>
strive in the Christian race;<br>
and, freed from every weight of sin,<br>
their holy footsteps trace.</p>
<p>Behold a Witness nobler still,<br>
who trod affliction’s path:<br>
Jesus, the author, finisher,<br>
rewarder of our faith.</p>
<p>He, for the joy before him set,<br>
and moved by pitying love,<br>
endured the cross, despised the shame,<br>
and now he reigns above.</p>
<p>Thither, forgetting things behind,<br>
press we to God’s right hand;<br>
there, with the Savior and his saints,<br>
triumphantly to stand.`,
`YE holy angels bright,<br>
who wait at God’s right hand,<br>
or through the realms of light<br>
fly at your Lord’s command,<br>
assist our song,<br>
for else the theme<br>
too high doth seem<br>
for mortal tongue.</p>
<p>Ye blessèd souls at rest,<br>
who ran this earthly race<br>
and now, from sin released,<br>
behold your Savior’s face,<br>
his praises sound,<br>
as in his sight<br>
with sweet delight<br>
ye do abound.</p>
<p>Ye saints, who toil below,<br>
adore your heav’nly King,<br>
and onward as ye go<br>
some joyful anthem sing;<br>
take what he gives<br>
and praise him still,<br>
through good or ill,<br>
who ever lives!</p>
<p>My soul, bear thou thy part,<br>
triumph in God above:<br>
and with a well-tuned heart<br>
sing thou the songs of love!<br>
Let all thy days<br>
till life shall end,<br>
whate’er he send,<br>
be filled with praise!`
],
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
