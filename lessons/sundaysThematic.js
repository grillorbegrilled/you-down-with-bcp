async function getLesson(liturgicalDay) {
    var lessons = (liturgicalDay === "T25") ? sundaysThematic["E6"] : (liturgicalDay === "T26") ? sundaysThematic["E5"] : sundaysThematic[liturgicalDay];

    if (!lessons) lessons = redLetters[liturgicalDay];
    
    var promises = lessons.map(async lesson => {
        const content = await handleBibleReference(lesson.replace("*", "").replace("†", ""));
        return `<h2>${lesson}</h2><p>${content}</p>`;
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    
    // Join the results and return them
    return results.join('');
}

const sundaysThematic = {
"A1":[
"Malachi 3:1-6 & 4:4-6", "Luke 1:5-25",
"*Isaiah 28:14-22", "Hebrews 12:14ff",
"Isaiah 62", "Matthew 25:1-13",
"Isaiah 13:6-13", "1 Thessalonians 5:1-11"
],
"A2":[
"Isaiah 52:1-10", "Luke 1:26-56",
"*Isaiah 55", "2 Timothy 3",
"Amos 3:1-8", "1 Thessalonians 2:1-13",
"Isaiah 11:1-10", "John 5:30-40"
],
"A3":[
"Jeremiah 1:4-10,17-19", "Luke 1:57ff",
"*Isaiah 35", "1 Thessalonians 5:12-23",
"Nahum 1:3-8,15", "1 Corinthians 9:7-23",
"Isaiah 26:1-11", "Matthew 9:35-10:15"
],
"A4":[
"*Isaiah 40:1-11", "Luke 3:1-17",
"Jeremiah 33:7-16", "1 Thessalonians 1",
"Isaiah 40:12ff", "1 Thessalonians 3:7ff",
"Isaiah 42:1-16", "Matthew 11:11-24"
],
"X1":[
"*Isaiah 9:2-7", "Luke 2:1-20",
"Isaiah 49:8-13", "Hebrews 2",
"Isaiah 63:7-16", "2 Peter 1:1-12",
"Job 28:12ff", "Matthew 11:25ff"
],
"E1":[
"Isaiah 60:1-9†", "Isaiah 60:10ff", "Matthew 2:1-12",
"*Proverbs 8:22-35", "Colossians 1:9ff",
"1 Samuel 1:21ff", "Matthew 18:1-14",
"Isaiah 49:1-7", "1 John 1:1-9"
],
"E2":[
"*Zechariah 8:1-8, 20-23", "1 Corinthians 12:12-31",
"Exodus 34:29ff", "Mark 9:2-13",
"Isaiah 56:1-8", "John 2:13ff",
"Isaiah 54:1-8", "Romans 14:1-15:3"
],
"E3":[
"*Isaiah 41:8-10, 17-20", "John 4:1-14",
"Deuteronomy 16:18-20 & 17:8-11", "James 2:1-13",
"Daniel 10:10-19", "Mark 6:45ff"
],
"E4":[
"Isaiah 61", "Luke 4:16-32",
"*Deuteronomy 4:5-13, 32-40", "Ephesians 2",
"Isaiah 45:20ff", "Romans 10"
],
"E5":[
"Ruth 1:1-17", "Colossians 3:5-11",
"*Habakkuk 1:12-2:14", "Luke 12:35-48",
"Joel 3:9-17", "Matthew 13:36-52",
"Amos 5:14-24", "Galatians 6:1-10"
],
"E6":[
"Isaiah 2:6-19", "Matthew 25:14-29",
"*Isaiah 66", "2 Thessalonians 1",
"Genesis 19:1-3, 12-17, 24-28", "Luke 17:20ff",
"Deuteronomy 31:14-29", "2 Esdras 8:63-9:13", "2 Peter 3"
],
"LXX":[
"*Joshua 1:1-9", "2 Timothy 2:1-13",
"Ezekiel 3:4-11", "Matthew 5:1-16",
"Deuteronomy 4:1-13", "1 Maccabees 2:49-64", "1 Timothy 6:11-19",
"Isaiah 5:1-7", "Matthew 21:23-32"
],
"LX":[
"*Isaiah 50:4-10", "2 Corinthians 12:1-12",
"Isaiah 30:8-21", "Mark 4:26-34",
"Ecclesiastes 11:1-6", "John 4:31-38",
"Daniel 3:1-26", "Matthew 10:16-23,40-42"
],
"L":[
"Isaiah 5:1-16", "Wisdom 7:7-14", "John 15:1-17",
"*Deuteronomy 10:12-11:11", "John 2:1-17",
"Leviticus 19:1-2, 9-18", "1 John 4",
"Isaiah 51:1-8", "Mark 9:14-32"
],
"L1":[
"*Isaiah 58", "Matthew 6:1-18",
"Micah 7:1-9", "Ecclesiasticus 2", "Romans 7:14ff",
"Jeremiah 17:5-14", "1 Corinthians 10:1-13",
"Daniel 9:3-10", "Luke 5:33-6:10"
],
"L2":[
"*1 Kings 8:37-43", "Colossians 3:12-17",
"Ezekiel 18:1-4, 25-32", "Matthew 5:27-37",
"2 Samuel 12:1-14", "1 Corinthians 6:9ff",
"Habakkuk 2:1-14", "Ecclesiasticus 51:1-12", "Luke 18:1-8"
],
"L3":[
"*Deuteronomy 6:1-9,20-25", "1 Corinthians 3",
"Zechariah 1:1-6,12-17", "Mark 8:27-9:1",
"Amos 5:4-15", "Galatians 5:16-24",
"Proverbs 4:7-18", "Luke 11:29-36"
],
"L4":[
"Exodus 16:4-15", "John 6:27-40",
"*Ezekiel 39:21ff", "2 Corinthians 3:12ff",
"Isaiah 55", "John 6:41-51",
"Proverbs 3:1-26", "2 Esdras 2:15-32", "Revelation 3:1-12"
],
"L5":[
"*Isaiah 1:10-20", "1 Peter 4:12ff",
"Deuteronomy 18:15ff", "Luke 20:9-18",
"Hosea 6:1-6", "Hebrews 10:1-25",
"Jeremiah 14:7-21", "John 10:17-38"
],
"Palm":[
"*Zechariah 9:9-12", "Mark 11:1-11",
"Isaiah 52:13–53:12", "Matthew 26",
"Jeremiah 8:9-15,18-9:1", "1 Corinthians 1:17ff",
"Isaiah 59:1-3, 9-21", "John 12:20-36"
],
"Easter":[
"*Isaiah 25:1-9", "Matthew 28:1-10,16-20",
"Exodus 12:1-14", "Revelation 14:1-7,12-13",
"Isaiah 51:9-16", "Luke 24:13-35",
"Isaiah 12", "John 20:11-18"
],
"Ea1":[
"Deuteronomy 11:1-15", "Wisdom 2:23-3:9", "Romans 1:1-12",
"*Isaiah 43:1-12", "Luke 24:36-49",
"Zephaniah 3:14ff", "John 20:19ff",
"2 Kings 4:18-37", "2 Esdras 2:33ff", "Revelation 1:4-18"
],
"Ea2":[
"*Isaiah 40:1-11", "John 10:1-10",
"Ecclesiastes 9", "Baruch 4:21-30", "Philippians 3:7-16",
"Ezekiel 34:11-16,30-31", "John 21:1-19",
"Ezekiel 20:1-20", "2 Esdras 8:20-30, 46, 51-54", "1 Corinthians 15:12-23"
],
"Ea3":[
"2 Samuel 12:15b-23", "John 14:1-14",
"*1 Samuel 2:1b-10", "Acts 2:22-36",
"Isaiah 26:12-16,19", "2 Corinthians 5",
"Nehemiah 1", "Wisdom 5:1-6, 14-16", "Luke 20:27-39"
],
"Ea4":[
"*Job 19:21-27a", "John 12:44ff",
"Ezekiel 37:1-14", "Acts 3:1-21",
"Daniel 12:1-4,13", "1 Thessalonians 4:13ff",
"Isaiah 60:13ff", "John 8:12-30"
],
"Ea5":[
"*Ezekiel 34:25ff", "Luke 11:1-13",
"Deuteronomy 28:1-14", "2 Esdras 14:27-35", "Acts 4:1-13, 33",
"Isaiah 48:12-21", "Revelation 5",
"Ezekiel 36:25ff", "Mark 11:22-26"
],
"Asc1":[
"*Isaiah 33:5,17,20-22", "John 17",
"Isaiah 4:2ff", "Hebrews 4:14-5:10",
"Isaiah 65:17ff", "Revelation 21:1-14,21-27",
"Zephaniah 3:8-17", "Wisdom 9", "Ephesians 1",
"Isaiah 32:1-4,15-20", "John 3:16-21,31-36a",
"Daniel 7:9-10,13-14", "Revelation 22"
],
"Whitsun":[
"Numbers 11:16-29", "Wisdom 1:1-7", "John 4:19-26",
"*Joel 2:28", "Romans 8:1-11",
"Ezekiel 11:14-20", "Wisdom 7:22-8:1", "1 Corinthians 2",
"Isaiah 11:1-9", "John 6:53-69"
],
"Trinity":[
"*Isaiah 6:1-8", "1 Peter 1:1-12",
"Genesis 1:1-2:3", "John 1:1-18",
"Exodus 34:1-10", "Ecclesiasticus 43:1-12, 27-33", "Ephesians 4:1-16",
"Job 38:1-18 & 42:1-6", "John 1:29-34"
],
"T1":[
"*Jeremiah 23:23-32", "Matthew 7:13ff",
"Isaiah 5:8-24", "James 5",
"Deuteronomy 30:11ff", "John 13:1-17,34-35",
"Job 21:17-33"
],
"T2":[
"Job 31:13-28", "1 Corinthians 13",
"*Deuteronomy 20:1-9", "Luke 9:57",
"1 Samuel 20:1-7,12-42", "1 Peter 1:17",
"2 Kings 4:8-17"
],
"T3":[
"*Jer 31:1-14", "Matthew 9:9-13",
"Proverbs 16:18ff", "Philippians 1:27-2:4",
"Jeremiah 23:1-8", "Luke 19:2-10",
"Ezekiel 34:20-24"
],
"T4":[
"*Lamentations 3:22-33", "Matthew 10:24-39",
"Deuteronomy 32:1-4,34-39", "Romans 2:1-16",
"Isaiah 29:9-15", "Matthew 15:1-20",
"Proverbs 27:1,10-12"
],
"T5":[
"*Ecclesiastes 2:1-11,18-23", "Matthew 19:16ff",
"Proverbs 15:1-10,26", "James 3",
"Proverbs 3:1-7,11-12", "Luke 14:25ff",
"Judges 6:11-23"
],
"T6":[
"2 Samuel 19:16-23", "Matthew 5:38ff",
"*Isaiah 57:13b-19", "2 Timothy 2:7-13",
"Exodus 24:1-11,16-18", "Hebrews 9:18ff",
"Genesis 4:1-16"
],
"T7":[
"*Hosea 14", "Romans 6:12-18",
"2 Kings 22", "Ecclesiasticus 6:5-17", "John 15:12ff",
"Daniel 5:1-9,13-30", "Romans 1:17-32",
"Micah 7:14ff"
],
"T8":[
"*Proverbs 1:1-9", "Ecclesiasticus 1:18-27", "John 7:14-24",
"Zechariah 4:1-10", "Galatians 3:24-4:7",
"Genesis 18:20-33", "Ecclesiasticus 6:22ff", "Luke 10:38ff",
"Proverbs 11:24ff"
],
"T9":[
"Ezekiel 14:1-11", "1 Thessalonians 4:1-12",
],
"T10":[
"*Joshua 24:14-24", "Ecclesiasticus 1:1-10", "John 8:25-36",
"Jeremiah 26:1-7, 10-15", "Matthew 23:34ff",
"Isaiah 44:1-8, 21-23", "Romans 12:1-9",
"Lamentations 1:1-12"
],
"T11":[
"*Isaiah 26:12-16,19", "Romans 8:26ff",
"Job 5:8-18", "Matthew 23:13-31",
"Deuteronomy 15:7-18", "Ecclesiasticus 35:10-19", "Mark 12:38ff",
"Ecclesiastes 5:1-7"
],
"T12":[
"*Deuteronomy 11:8-21", "Ecclesiasticus 15:11ff", "Philippians 2:12-18",
"2 Chronicles 24:4-16", "Ecclesiasticus 38:1-14", "Luke 4:31ff",
"Exodus 15:1-18", "Tobit 13:1-5, 7-11", "Romans 15:14-21",
"Isaiah 29:18"
],
"T13":[
"*Joshua 24:14-28", "Ecclesiasticus 17:1-15", "Mark 3:20-21,31-35",
"Habakkuk 1:12-2:4,14", "Hebrews 10:35ff",
"Deuteronomy 15:7-15", "Matthew 26:6-13",
"Deuteronomy 24:10ff"
],
"T14":[
"*Micah 6:1-8", "Philippians 4:4-13",
"1 Chronicles 29:10-17", "Luke 17:5-10",
"Jeremiah 7:1-11", "Luke 13:18-30",
"Deuteronomy 8:1-14,17-20"
],
"T15":[
"*Proverbs 26:1-12", "Ecclesiasticus 5:1-10", "Luke 12:13-21",
"Deuteronomy 7:6-13", "Galatians 2:15-20",
"Ecclesiastes 5:8ff", "1 Timothy 6:1-10",
"Joel 2:21-27"
],
"T16":[
"*Isaiah 12", "John 11:21-44",
"Jeremiah 32:36-42", "Romans 11:25ff",
"Ezekiel 33:1-9", "Matthew 24:37ff",
"1 Kings 17:8ff"
],
"T17":[
"*Jeremiah 13:15-21", "Mark 10:35-45",
"Proverbs 26:13-28", "Ecclesiasticus 8:1-9", "2 Timothy 2:19ff",
"Malachi 2:1-10", "Luke 13:10-17",
"Proverbs 16:1-9, 16-19", "Ecclesiasticus 10:7-18"
],
"T18":[
"Proverbs 2:1-9", "1 Timothy 3:14-4:16",
"*Amos 8:4-12", "John 7:37ff",
"Deuteronomy 11:18ff", "Galatians 1:1-12",
"Deuteronomy 5:1-21"
],
"T19":[
"*Job 24:1-17", "Titus 2",
"Jeremiah 30:12-22", "John 5:1-16",
"Jeremiah 5:7-19", "2 Corinthians 13",
"Job 34:10-28", "Wisdom 12:12-19"
],
"T20":[
"Malachi 2:14ff", "Matthew 19:3-9a,13-15",
"*Ecclesiastes 9:4-10", "Ephesians 6:1-9",
"Jeremiah 31:31-37", "John 13:31-35",
"Jeremiah 2:1-9, 13"
],
"T21":[
"*Isaiah 59:15bff", "2 Corinthians 10:1-7,17-18",
"Proverbs 3:13-26", "Baruch 3:14-15, 29-37", "John 9:1-38",
"Genesis 15:1-6", "Romans 4:1-8",
"2 Kings 5:1-15"
],
"T22":[
"*Proverbs 25:8-24", "Ecclesiasticus 27:30-28:7", "Matthew 18:7-20",
"Zechariah 3", "Baruch 5", "1 John 2:24ff",
"1 Kings 8:46-53", "Luke 7:36ff",
"Zechariah 7:8ff"
],
"T23":[
"Jeremiah 29:1-14", "Titus 3:1-8",
"*Isaiah 64", "Matthew 23:1-12",
"Ezekiel 33:30ff", "1 Corinthians 4:8-16",
"Esther 6:10-7:10", "Wisdom 6:1-11"
],
"T24":[
"*Malachi 3:13-4:3", "Luke 10:17-24",
"Lamentations 3:21-33", "Ecclesiasticus 36:1-17", "1 Timothy 2:1-8",
"Deuteronomy 33:1-3, 26-29", "Jude 1-4, 17-25",
"2 Kings 4:18-37"
],
"SNBA":[
"Jeremiah 4:23ff", "Matthew 25:31ff",
"*Jeremiah 3:14-18", "1 Corinthians 11:17-32",
"Ecclesiastes 11:9-12:14", "Hebrews 13:1-21",
"Isaiah 25:1-9", "John 5:17-29"
]
};

const redLetters = {
        "Xmas": ["Isaiah 9:1-8","Luke 2:1-15","Isaiah 7:10-17","Titus 3:4-9"],
    "Stephen": ["Genesis 4:1-11","Acts 6","2 Chronicles 14:15-23","Acts 8:1-9"],
    "JohnEvangelist": ["Exodus 33:9ff","John 13:23-36","Isaiah 6","Revelation 1"],
    "Innocents": ["Jeremiah 31:1-18","Baruch 4:21-31"],
"Circ": ["Genesis 17:9ff","Romans 2:17ff","Deuteronomy 10:12ff","Colossians 2:8-18"],
"Epiphany": ["Isaiah 60","Luke 3:15-23","Isaiah 49:13-24","John 2:1-12"],
"AW": ["Isaiah 58:1-13","Mark 2:13-23","Jonah 3","Hebrews 12:3-18"],
    "L1": ["Genesis 19:12-30","Genesis 22:1-20","Genesis 23"],
"HW-Mon": ["Lamentations 1:1-15","John 14:1-15","Lamentations 2:13ff","John 14:15ff"],
    "HW-Tue": ["Lamentations 3:1-34","John 15:1-14","Lamentations 3:34ff","John 15:14ff"],
    "HW-Wed": ["Lamentations 4:1-21","John 16:1-16","Daniel 9:20ff","John 16:16ff"],
    "HW-Thu": ["Hosea 13:1-15","John 17","Hosea 14","John 13:1-36"],
    "GF": ["Genesis 22:1-20","John 18","Isaiah 52:13-53:12","1 Peter 2"],
    "EE": ["Zechariah 9","Luke 23:50ff","Hosea 5:8-6:4","Romans 6:1-14"],
"EasterMon": ["Exodus 15:1-22","Luke 24:13ff","Song of Songs 2:10ff","Matthew 28:1-10"],
    "EasterTue": ["2 Kings 13:14-22","John 21:1-15","Ezekiel 37:1-15","John 21:15ff"],
    "Ascension": ["Daniel 7:9-15","Luke 24:44ff","2 Kings 2:1-16","Hebrews 4"],
"Whitmon": ["Genesis 11:1-10","1 Corinthians 12:1-14","Numbers 11:16-31","1 Corinthians 12:27-13:13"],
    "WhitTue": ["Joel 2:21ff","1 Thessalonians 5:12-24","Micah 4:8ff","1 John 4:1-14"],
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
    "Patrick": ["Isaiah 8:19-9:2", "John 1:1-14", "Acts 16:6-10", "Isaiah 51:1-11", "2 Corinthians 4", "2 Corinthians 10"],
    "Joseph": [],
    "Hugh": []
};
