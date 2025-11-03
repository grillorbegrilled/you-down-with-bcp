function getSentence(lit, officeType) {
    if (officeType === 1)
      switch (lit) {
          case "A1":
          case "A2":
          case "A3":
          case "A4":
            return getRandomSentence(["Repent ye, for the Kingdom of heaven is at hand.  <i>Matthew 3:2</i>",
              "Prepare ye the way of the Lord, make straight in the desert a highway for our God.  <i>Isaiah 40:3</i>"]);
            break;
          case "Xmas":
          case "Stephen":
          case "JohnEvangelist":
          case "Innocents":
          case "X1":
          case "Circ":
              return "Behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.  <i>Luke 2:10, 11</i>";
              break;
          case "AW":
          case "L1":
          case "L2":
          case "L3":
          case "L4":
          case "Patrick":
          case "Joseph":
          case "L5":
          case "Palm":
          case "HW-Mon":
          case "HW-Tue":
          case "HW-Wed":
          case "HW-Thu":
          case "EE":
            return getRandomSentence(["Rend your heart, and not your garments, and turn unto the Lord your God: for he is gracious and merciful, slow to anger, and of great kindness, and repenteth him of the evil.  <i>Joel 2:13</i>",
              "The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise.  <i>Psalm 51:17</i>",
              "I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, and am no more worthy to be called thy son.  <i>Luke 15:18, 19.</i>"]);
            break;
          case "GF":
              return getRandomSentence(["Is it nothing to you, all ye that pass by? behold, and see if there be any sorrow like unto my sorrow which is done unto me, wherewith the Lord hath afflicted me.  <i>Lamentations 1:12</i>",
                "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace.  <i>Ephesians 1:7</i>"]);
              break;
          case "Easter":
          case "EasterMon":
          case "EasterTue":
            return "Christ is risen. He is risen indeed.";
            break;
          case "Ea1":
          case "Ea2":
          case "Ea3":
          case "Ea4":
          case "Ea5":
            return "This is the day which the Lord hath made; we will rejoice and be glad in it.  <i>Psalm 118:24</i>";
            break;
          case "Ascension":
          case "Asc1":
            return "Seeing that we have a great High Priest, that is passed into the heavens, Jesus the Son of God, let us come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.  <i>Hebrews 4:14, 16</i>";
            break;
          case "Trinity":
            return "Holy, holy, holy, Lord God Almighty, which was, and is, and is to come.  <i>Revelation 4:8</i>";
          case "ThanksgivingDay":
              return "Honour the Lord with thy substance, and with the first-fruits of all thine increase: so shall thy barns be filled with plenty, and thy presses shall burst out with new wine.  <i>Proverbs 3:9, 10</i>";
              break;
          case "Whitsun":
          case "Whitmon":
          case "WhitTue":
            return getRandomSentence(["Ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judæa, and in Samaria, and unto the uttermost part of the earth.  <i>Acts 1:8</i>",
              "Because ye are sons, God hath sent forth the Spirit of his Son into your hearts, crying, Abba, Father.  <i>Galatians 4:6</i>"]);
          case "Epiphany":
          case "Candlemas":
          case "E1":
          case "E2":
          case "E3":
          case "E4":
          case "E5":
          case "E6":
            return getRandomSentence(["From the rising of the sun even unto the going down of the same my Name shall be great among the Gentiles; and in every place incense shall be offered unto my Name, and a pure offering: for my Name shall be great among the heathen, saith the Lord of hosts.  <i>Malachi 1:11</i>",
              "Awake, awake; put on thy strength, O Zion; put on thy beautiful garments, O Jerusalem.  <i>Isaiah 52:1</i>"]);
            break;
          default:
              return getRandomSentence(["The Lord is in his holy temple: let all the earth keep silence before him.  <i>Habakkuk 2:20</i>",
                "I was glad when they said unto me, We will go into the house of the Lord.  <i>Psalm 122:1</i>",
                "Let the words of my mouth, and the meditation of my heart, be alway acceptable in thy sight, O Lord, my strength and my redeemer.  <i>Psalm 19:14</i>",
                "O send out thy light and thy truth, that they may lead me, and bring me unto thy holy hill, and to thy dwelling.  <i>Psalm 43:3</i>",
                "Thus saith the high and lofty One that inhabiteth eternity, whose name is Holy; I dwell in the high and holy place, with him also that is of a contrite and humble spirit, to revive the spirit of the humble, and to revive the heart of the contrite ones.  <i>Isaiah 57:15</i>",
                "The hour cometh, and now is, when the true worshippers shall worship the Father in spirit and in truth: for the Father seeketh such to worship him.  <i>John 4:23</i>"]);
      }
  else if (officeType === 2)
      switch (lit) {
          case "A1":
          case "A2":
          case "A3":
          case "A4":
            return "Watch ye, for ye know not when the master of the house cometh, at even, or at midnight, or at the cock-crowing, or in the morning: lest coming suddenly he find you sleeping.  <i>Mark 13:35, 36</i>";
            break;
          case "Xmas":
          case "Stephen":
          case "JohnEvangelist":
          case "Innocents":
          case "X1":
          case "Circ":
              return "Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.  <i>Revelation 21:3</i>";
              break;
          case "AW":
          case "L1":
          case "L2":
          case "L3":
          case "L4":
          case "Patrick":
          case "Joseph":
          case "L5":
          case "Palm":
          case "HW-Mon":
          case "HW-Tue":
          case "HW-Wed":
          case "HW-Thu":
          case "EE":
            return getRandomSentence(["I acknowledge my transgressions: and my sin is ever before me.  <i>Psalm 51:3</i>",
              "To the Lord our God belong mercies and forgivenesses, though we have rebelled against him; neither have we obeyed the voice of the Lord our God, to walk in his laws which he set before us.  <i>Daniel 9:9, 10</i>",
              "If we say that we have no sin, we deceive ourselves, and the truth is not in us; but if we confess our sins, God is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.  <i>1 John 1:8, 9</i>"]);
            break;
          case "GF":
              return "All we like sheep have gone astray; we have turned every one to his own way; and the Lord hath laid on him the iniquity of us all. <i>Isaiah 53:6</i>";
              break;
          case "Easter":
          case "EasterMon":
          case "EasterTue":
          case "Ea1":
          case "Ea2":
          case "Ea3":
          case "Ea4":
          case "Ea5":
            return getRandomSentence(["Thanks be to God, which giveth us the victory through our Lord Jesus Christ.  <i>1 Corinthians 15:57</i>",
              "If ye then be risen with Christ, seek those things which are above, where Christ sitteth on the right hand of God.  <i>Colossians 3:1</i>"]);
            break;
          case "Ascension":
          case "Asc1":
            return "Christ is not entered into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us.  <i>Hebrews 9:24</i>";
            break;
          case "Trinity":
            return "Holy, holy, holy, is the Lord of hosts: the whole earth is full of his glory.  <i>Isaiah 6:3</i>";
          case "ThanksgivingDay":
              return "The Lord by wisdom hath founded the earth; by understanding hath he established the heavens. By his knowledge the depths are broken up, and the clouds drop down the dew.  <i>Proverbs 3:19, 20</i>";
              break;
          case "Whitsun":
          case "Whitmon":
          case "WhitTue":
            return getRandomSentence(["There is a river, the streams whereof shall make glad the city of God, the holy place of the tabernacles of the Most High.  <i>Psalm 46:4</i>",
              "The Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely. <i>Revelation 22:17</i>"]);
          case "Epiphany":
          case "Candlemas":
          case "E1":
          case "E2":
          case "E3":
          case "E4":
          case "E5":
          case "E6":
            return "The Gentiles shall come to thy light, and kings to the brightness of thy rising.  <i>Isaiah 60:3</i>";
            break;
          default:
              return getRandomSentence(["THE Lord is in his holy temple: let all the earth keep silence before him.  <i>Habakkuk 2:20</i>",
                "Lord, I have loved the habitation of thy house, and the place where thine honour dwelleth.  <i>Psalm 26:8</i>",
                "Let my prayer be set forth in thy sight as the incense; and let the lifting up of my hands be an evening sacrifice.  <i>Psalm 116:2</i>",
                "O worship the Lord in the beauty of holiness; let the whole earth stand in awe of him.  <i>Psalm 96:9</i>",
                "Let the words of my mouth, and the meditation of my heart, be alway acceptable in thy sight, O Lord, my strength and my redeemer.  <i>Psalm 19:14, 15</i>"]);
      }

  return "";
}

const getRandomSentence = collection => collection[Math.floor(Math.random() * collection.length)];
