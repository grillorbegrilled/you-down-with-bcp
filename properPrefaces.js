function getPreface(lit, month, date, day) {
  var properPreface = ".";
  
  if (month === 11 && date >= 25 || month === 0 && date === 1)
    properPreface = ", because thou didst give Jesus Christ, thine only Son, to be born as at this time for us; who, by the operation of the Holy Ghost, was made very man, of the substance of the Virgin Mary his mother; and that without spot of sin, to make us clean from all sin.";
  
  if (month === 0 && date >= 6 && date <= 13)
    properPreface = ", through Jesus Christ our Lord; who, in substance of our mortal flesh, manifested forth his glory; that he might bring us out of darkness into his own glorious light.";

  if (lit === "Candlemas" || lit === "Annunciation" || lit === "Transfiguration")
    properPreface =  ", because in the Mystery of the Word made flesh, thou hast caused a new light to shine in our hearts, to give the knowledge of thy glory in the face of thy Son Jesus Christ our Lord.";  

  if (lit === "Easter" || lit === "EasterMon" || lit === "EasterTue" || lit === "Ea1" && day === 0)
    properPreface = ", but chiefly are we bound to praise thee for the glorious Resurrection of thy Son Jesus Christ our Lord: for he is the very Paschal Lamb, which was offered for us, and hath taken away the sin of the world; who by his death hath destroyed death, and by his rising to life again hath restored to us everlasting life.";
  
  if (lit === "Ascension" || lit === "Asc1" && day <= 4)
    properPreface =  ", through thy most dearly beloved Son Jesus Christ our Lord; who, after his most glorious Resurrection, manifestly appeared to all his Apostles, and in their sight ascended up into heaven, to prepare a place for us; that where he is, thither we might also ascend, and reign with him in glory.";
  
  if (lit === "Whitsun" || lit === "Whitmon" || lit === "WhitTue")
    properPreface =  ", through Jesus Christ our Lord; according to whose most true promise, the Holy Ghost came down as at this time from heaven, lighting upon the disciples, to teach them, and to lead them into all truth; giving them boldness with fervent zeal constantly to preach the Gospel unto all nations; whereby we have been brought out of darkness and error into the clear light and true knowledge of thee, and of thy Son Jesus Christ.";
  
  if (lit === "Trinity" && day === 0)
    properPreface = ", who, with thine only-begotten Son, and the Holy Ghost, art one God, one Lord, in Trinity of Persons and in Unity of Substance. For that which we believe of thy glory, O Father, the same we believe of the Son, and of the Holy Ghost, without any difference of inequality.";

  if (month === 10 && date <= 8)
    properPreface = ", who, in the multitude of thy Saints, hast compassed us about with so great a cloud of witnesses that we, rejoicing in their fellowship, may run with patience the race that is set before us, and, together with them, may receive the crown of glory that fadeth not away.";

  return `<P><span class="drop-cap">I</span>T is very meet, right, and our bounden duty, that we should at all times, and in all places, give thanks unto thee, O Lord, Holy Father, Almighty, Everlasting God${properPreface}</p>`;
}
