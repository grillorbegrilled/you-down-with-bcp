function getLesson(liturgicalDay) {
    var lessons = Lessons[liturgicalDay];
    
    /*if (!result)
        result = nationalDaysUS[liturgicalDay];

    if (!result)
        result = otherSaints[liturgicalDay];

    if (!result)
        result = specialOccasions[liturgicalDay];*/

    var promises = lessons.map(async lesson => {
        const content = await handleBibleReference(lesson);
        return `<h2>${lesson}</h2><p>${content}</p>`;
    });

    return Promise.all(promises).then(results => results.join(''));
}

const Lessons = {
    "A1": ["Isaiah 1","Isaiah 2","Isaiah 4:2ff"],
    "A2": ["Isaiah 5","Isaiah 11:1-11","Isaiah 24"],
    "A3": ["Isaiah 25","Isaiah 26","Isaiah 28:5-19"],
    "A4": ["Isaiah 30:1-27","Isaiah 32","Isaiah 33:2-23"],
    "Xmas": ["Isaiah 9:1-8","Luke 2:1-15","Isaiah 7:10-17","Titus 3:4-9"],
    "Stephen": ["Genesis 4:1-11","Acts 6","2 Chronicles 14:15-23","Acts 8:1-9"],
    "JohnEvangelist": ["Exodus 33:9ff","John 13:23-36","Isaiah 6","Revelation 1"],
    "Innocents": ["Jeremiah 31:1-18","Baruch 4:21-31"],
    "X1": ["Isaiah 35","Isaiah 38","Isaiah 40"],
    "Circ": ["Genesis 17:9ff","Romans 2:17ff","Deuteronomy 10:12ff","Colossians 2:8-18"],
    "X2": ["Isaiah 42","Isaiah 43","Isaiah 44"],
    "Epiphany": ["Isaiah 60","Luke 3:15-23","Isaiah 49:13-24","John 2:1-12"],
    "E1": ["Isaiah 51","Isaiah 52:13-53:12","Isaiah 54"],
    "E2": ["Isaiah 55","Isaiah 57","Isaiah 61"],
    "E3": ["Isaiah 62","Isaiah 65","Isaiah 66"],
    "E4": ["Job 27","Job 28","Job 29"],
    "E5": ["Proverbs 1","Proverbs 3","Proverbs 8"],
    "E6": ["Proverbs 9","Proverbs 11","Proverbs 15"],
    "LXX": ["Genesis 1:1-2:4","Revelation 21:1-9","Genesis 2:4ff","Job 38","Revelation 21:9-22:6"],
    "LX": ["Genesis 3","Genesis 6","Genesis 8"],
    "L": ["Genesis 9:1-20","Genesis 12","Genesis 13"],
    "AW": ["Isaiah 58:1-13","Mark 2:13-23","Jonah 3","Hebrews 12:3-18"],
    "L1": ["Genesis 19:12-30","Genesis 22:1-20","Genesis 23"],
    "L2": ["Genesis 27:1-41","Genesis 28","Genesis 32"],
    "L3": ["Genesis 37","Genesis 39","Genesis 40"],
    "L4": ["Genesis 42","Genesis 43","Genesis 45"],
    "L5": ["Exodus 3","Exodus 5","Exodus 6:1-14"],
    "Palm": ["Exodus 9","Matthew 26","Exodus 10","Exodus 11","Luke 19:28ff","Luke 20:9-21"],
    "HW-Mon": ["Lamentations 1:1-15","John 14:1-15","Lamentations 2:13ff","John 14:15ff"],
    "HW-Tue": ["Lamentations 3:1-34","John 15:1-14","Lamentations 3:34ff","John 15:14ff"],
    "HW-Wed": ["Lamentations 4:1-21","John 16:1-16","Daniel 9:20ff","John 16:16ff"],
    "HW-Thu": ["Hosea 13:1-15","John 17","Hosea 14","John 13:1-36"],
    "GF": ["Genesis 22:1-20","John 18","Isaiah 52:13-53:12","1 Peter 2"],
    "EE": ["Zechariah 9","Luke 23:50ff","Hosea 5:8-6:4","Romans 6:1-14"],
    "Easter": ["Exodus 12:1-29","Revelation 1:10-19","Exodus 12:29ff","John 20:11-19","Exodus 14","Revelation 5"],
    "EasterMon": ["Exodus 15:1-22","Luke 24:13ff","Song of Songs 2:10ff","Matthew 28:1-10"],
    "EasterTue": ["2 Kings 13:14-22","John 21:1-15","Ezekiel 37:1-15","John 21:15ff"],
    "Ea1": ["Numbers 16:1-36","1 Corinthians 15:1-29","Numbers 16:36ff","Numbers 17:1-12","John 20:24-30"],
    "Ea2": ["Numbers 20:1-14","Numbers 20:14-21:10","Numbers 21:10ff"],
    "Ea3": ["Numbers 22","Numbers 23","Numbers 24"],
    "Ea4": ["Deuteronomy 4:1-23","Deuteronomy 4:23-41","Deuteronomy 5"],
    "Ea5": ["Deuteronomy 6","Deuteronomy 9","Deuteronomy 10"],
    "Ascension": ["Daniel 7:9-15","Luke 24:44ff","2 Kings 2:1-16","Hebrews 4"],
    "Asc1": ["Deuteronomy 30","Deuteronomy 34","Joshua 1"],
    "Whitsun": ["Deuteronomy 16:1-18","Romans 8:1-18","Isaiah 11","Galatians 5:16ff","Ezekiel 36:25ff","Acts 18:24-19:21"],
    "Whitmon": ["Genesis 11:1-10","1 Corinthians 12:1-14","Numbers 11:16-31","1 Corinthians 12:27-13:13"],
    "WhitTue": ["Joel 2:21ff","1 Thessalonians 5:12-24","Micah 4:8ff","1 John 4:1-14"],
    "Trinity": ["Isaiah 6:1-11","Revelation 1:1-9","Genesis 18","Ephesians 4:1-17","Genesis 1:1-2:4","Matthew 3"],
    "T1": ["Joshua 3:7-4:15","Joshua 5:13-6:21","Joshua 24"],
    "T2": ["Judges 4","Judges 5","Judges 6:11ff"],
    "T3": ["1 Samuel 2:1-27","1 Samuel 3","1 Samuel 4:1-19"],
    "T4": ["1 Samuel 12","1 Samuel 13","Ruth 1"],
    "T5": ["1 Samuel 15:1-24","1 Samuel 16","1 Samuel 17"],
    "T6": ["2 Samuel 1","2 Samuel 12:1-24","2 Samuel 18"],
    "T7": ["1 Chronicles 21","1 Chronicles 22","1 Chronicles 28:1-21"],
    "T8": ["1 Chronicles 29:9-29","2 Chronicles 1","1 Kings 3"],
    "T9": ["1 Kings 10:1-25","1 Kings 11:1-15","1 Kings 11:26ff"],
    "T10": ["1 Kings 12","1 Kings 13","1 Kings 17"],
    "T11": ["1 Kings 18","1 Kings 19","1 Kings 21"],
    "T12": ["1 Kings 22:1-41","2 Kings 2:1-16","2 Kings 4:8-38"],
    "T13": ["2 Kings 5","2 Kings 6:1-24","2 Kings 7"],
    "T14": ["2 Kings 9","2 Kings 10:1-32","2 Kings 13"],
    "T15": ["2 Kings 18","2 Kings 19","2 Kings 23:1-31"],
    "T16": ["2 Chronicles 36","Nehemiah 1:1-2:9","Nehemiah 8"],
    "T17": ["Jeremiah 5","Jeremiah 22","Jeremiah 35"],
    "T18": ["Jeremiah 36","Ezekiel 2","Ezekiel 13:1-17"],
    "T19": ["Ezekiel 14","Ezekiel 18","Ezekiel 24:15ff"],
    "T20": ["Ezekiel 34","Ezekiel 37","Daniel 1"],
    "T21": ["Daniel 3","Daniel 4","Daniel 5"],
    "T22": ["Daniel 6","Daniel 7:9ff","Daniel 12"],
    "T23": ["Hosea 14","Joel 2:1-21","Joel 3:9ff"],
    "T24": ["Amos 3","Amos 5","Amos 9"],
    "T25": ["Micah 4:1-5:8","Micah 6","Micah 7"],
    "T26": ["Habakkuk 2","Habakkuk 3","Zephaniah 3"],
    "SNBA": ["Ecclesiastes 11 & 12","Haggai 2:1-10","Malachi 3 & 4"],
    "Andrew": ["Isaiah 54","John 1:35-43","Isaiah 65:1-17","John 12:20-42"],
    "Thomas": ["Job 42:1-7","John 20:19-24","Isaiah 35","John 14:1-8"],
    "Paul": ["Isaiah 49:1-13","Galatians 1:11ff","Jeremiah 1:1-11","Acts 26:1-21"],
    "Candlemas": ["Exodus 13:1-17","Haggai 2:1-10"],
    "Matthias": ["1 Samuel 2:27-36","Isaiah 22:15ff"],
    "Annunciation": ["Genesis 3:1-16","Isaiah 52:7-13"],
    "Mark": ["Isaiah 62:6ff","Ezekiel 1:1-15"],
    "PhilipAndJames": ["Isaiah 61","John 1:43ff","Zechariah 4"],
    "Barnabas": ["Deuteronomy 33:1-12","Acts 4:31ff","Nahum 1","Acts 14:8ff"],
    "JohnBaptist": ["Malachi 3:1-7","Matthew 3","Malachi 4","Matthew 14:1-13"],
    "Peter": ["Ezekiel 3:4-15","John 21:15-23","Zechariah 3","Acts 4:8-23"],
    "James": ["2 Kings 1:1-16","Luke 9:51-57","Jeremiah 26:8-16"],
    "Bartholomew": ["Genesis 28:10-18","Deuteronomy 18:15ff"],
    "Matthew": ["1 Kings 19:15ff","1 Chronicles 29:1-20"],
    "Michael": ["Genesis 32","Acts 12:5-18","Daniel 10:4ff","Revelation 14:14ff"],
    "Luke": ["Isaiah 55","Ecclesiasticus 38:1-15"],
    "SimonAndJude": ["Isaiah 28:9-17","Jeremiah 3:12-19"],
    "AllSaints": ["Wisdom 3:1-10","Hebrews 11:33-12:7","Wisdom 3:10ff","Revelation 19:1-17"],
    "IndependenceDay": ["Deuteronomy 28:1-14","John 8:31-36"],
    "ThanksgivingDay": ["Deuteronomy 8","1 Thessalonians 5:12-23","Isaiah 12","Philippians 4:4-7"]
}
