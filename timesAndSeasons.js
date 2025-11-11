function synthDate(week, day, dayOfWeek) {
    if (week === "Palm" || week === "HW-Mon" || week === "HW-Tue" || week === "HW-Wed" || week === "HW-Thu" || week === "GF" || week === "EE"
        || week === "EasterMon" || week === "EasterTue"
        || week === "Whitmon" || week === "WhitTue"
        || (week === "AW" && dayOfWeek === 3) || (week === "Ascension" && dayOfWeek === 4)
        || ((week === "Easter" || week === "Ea1") && dayOfWeek === 0)
        || !day || day === "")
        return week;
    
    return day;
}

function isFast(now) {
    const day = now.getDay();
    const month = now.getMonth();
    const date = now.getDate();
    
    if (day === 0 || //never on sunday
        month === 11 && date === 25) //never on Christmas
        return false;

    if(day === 5 && getLiturgicalDate(now) === "") //always on Friday
        return true;

    //vigils
    if (month === 0 && date === 31 && day === 6) //vigil of candlemas, transferred to saturday
        return true;
    
    if(month === 1) { //feb
        if(day != 6) { 
            if (date === 1 || date === 23)
                return true;
        } else {
            if (date === 22)
                return true;
        }
    }
    if(month === 2) { //mar
        if(day != 6) { 
            if (date === 24)
                return true;
        } else {
            if (date === 23)
                return true;
        }
    }
    //no vigils in April or May
    if(month === 5) { //jun
        if(day != 6) { 
            if (date === 23 || date === 28)
                return true;
        } else {
            if (date === 22 || date === 27)
                return true;
        }
    }
    if(month === 6) { //jul
        if(day != 6) { 
            if (date === 24)
                return true;
        } else {
            if (date === 23)
                return true;
        }
    }
    if(month === 7) { //aug
        if(day != 6) { 
            if (date === 23)
                return true;
        } else {
            if (date === 22)
                return true;
        }
    }
    if(month === 8) { //sep
        if(day != 6) { 
            if (date === 20)
                return true;
        } else {
            if (date === 19)
                return true;
        }
    }
    if(month === 9) { //oct
        if(day != 6) { 
            if (date === 27 || date === 31)
                return true;
        } else {
            if (date === 26 || date === 30)
                return true;
        }
    }
    if(month === 10) { //nov
        if(day != 6) { 
            if (date === 29)
                return true;
        } else {
            if (date === 28)
                return true;
        }
    }
    if(month === 11) { //dec
        if(day != 6) { 
            if (date === 20 || date === 24)
                return true;
        } else {
            if (date === 19 || date === 23)
                return true;
        }
    }

    const liturgicalNow = synthDate(getWeek(now), getLiturgicalDate(now), day);

    switch (liturgicalNow) {
        case "AW":
        case "L1":
        case "L2":
        case "L3":
        case "L4":
        case "L5":
        case "Palm":
        case "HW-Mon":
        case "HW-Tue":
        case "HW-Wed":
        case "HW-Thu":
        case "GF":
        case "EE":
            return true;
            break;
    }
    
    //Pentecost vigil
    if (liturgicalNow === "Asc1" && day === 6)
        return true;

    if (isEmberDay(liturgicalNow, month, date, day))
        return true;

    if (isRogationDay(liturgicalNow, day))
        return true;

    return false;
}

function isEmberDay(lit, month, date, day) {
  if ((lit === "L1" || lit === "Whitsun") && (day === 3 || day === 5 || day === 6)) //Lent and Whitsun
    return true;
  if (month === 8) {
    const w = getEmberWednesday(month, 14); //Roodmas
    return (date === w || date === w + 2 || date === w + 3);
  }
  if (month === 11) {
    const w = getEmberWednesday(month, 13); //St. Lucy's Day
    return (date === w || date === w + 2 || date === w + 3);
  }

  return false;
}

function getEmberWednesday(month, anchorDate) {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, month, anchorDate);
    const dayOfWeek = startDate.getDay();
    const daysUntilWednesday = (3 - dayOfWeek + 7) % 7 || 7; // Calculate days until next Wednesday
    const firstWednesday = new Date(startDate);
    firstWednesday.setDate(startDate.getDate() + daysUntilWednesday);
    return firstWednesday.getDate();
}

function isRogationDay(lit, day) {
    if (lit === "Ea5" && day > 0)
        return true;

    return false;
}

function getTomorrow(today) {
    var result = new Date(today);
    result.setDate(result.getDate() + 1);
    return result;
}

function getWeek(now) {
    //This is just the day of the week stuff. Specific dates, even Christmastide, are in getLiturgicalDay().
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    
    function weeksTill(targetDate) {
      const differenceMs = targetDate - now;
      return differenceMs / (1000 * 60 * 60 * 24 * 7);
    }
    
    function weeksSince(targetDate) {
      const differenceMs = now - targetDate;
      return differenceMs / (1000 * 60 * 60 * 24 * 7);
    }

    //Anchor dates
    const epiphany = new Date(year, 0, 6);
    const xmas = new Date(year, 11, 25);
    
    function getEaster(year) {
        let f = Math.floor,
            G = year % 19,
            C = f(year / 100),
            H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
            I = H - f(H / 28) * (1 - f(H / 28) * f(29 / (H + 1)) * f((21 - G) / 11)),
            J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
            L = I - J,
            month = 3 + f((L + 40) / 44),
            day = L + 28 - 31 * f(month / 4);
        return new Date(year, month - 1, day);
    }

    const easter = getEaster(year);
    
    //Xmas in January
    if (now < epiphany)
        return "Circ";
    
    const weeksTillEaster = weeksTill(easter);
    
    //Epiphanytide
    if (weeksTillEaster > 9 && now >= epiphany)
    {
        function getE1() {
          var dayOfWeek = epiphany.getDay();
          var daysToAdd = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
          return new Date(year, 0, 6 + daysToAdd);
        }
        
        const weeksAfterE1 = weeksSince(getE1());
        if (weeksAfterE1 < 0) return "Epiphany";
        else if (weeksAfterE1 < 1) return "E1";
        else if (weeksAfterE1 < 2) return "E2";
        else if (weeksAfterE1 < 3) return "E3";
        else if (weeksAfterE1 < 4) return "E4";
        else if (weeksAfterE1 < 5) return "E5";
        else if (weeksAfterE1 < 6) return "E6";
        else return "I AM ERROR";
    }
    
    //Pre-Lent and Lent
    if (weeksTillEaster <= 9 && now < easter)
    {
        if (weeksTillEaster > 8) return "LXX";
        else if (weeksTillEaster > 7) return "LX";
        else if (weeksTillEaster > 6) {
            if (day < 3)
                return "L";
            else
                return "AW";
        }
        else if (weeksTillEaster > 5) return "L1";
        else if (weeksTillEaster > 4) return "L2";
        else if (weeksTillEaster > 3) return "L3";
        else if (weeksTillEaster > 2) return "L4";
        else if (weeksTillEaster > 1) return "L5";
        else {
            if (day == 0) return "Palm";
            else if (day == 1) return "HW-Mon";
            else if (day == 2) return "HW-Tue";
            else if (day == 3) return "HW-Wed";
            else if (day == 4) return "HW-Thu";
            else if (day == 5) return "GF";
            else if (day == 6) return "EE";
            else return "ERROR";
        }
    }

function getA4() {
        for (let i = 17; i <= 24; i++) {
            let foo = new Date(year, 11, i);
            if (foo.getDay() === 0) {
                return foo;
            }
        }
        return "NONE";
}
    
    let weeksTillXmas = weeksTill(getA4());
    
    //Easter and the rest
    if (now >= easter && weeksTillXmas > 4)
    {
        const weeksSinceEaster = weeksSince(easter);
        
        if (weeksSinceEaster < 1) {
            if (day === 1) return "EasterMon";
            else if (day === 2) return "EasterTue";
            else return "Easter";
        }
        else if (weeksSinceEaster < 2) return "Ea1";
        else if (weeksSinceEaster < 3) return "Ea2";
        else if (weeksSinceEaster < 4) return "Ea3";
        else if (weeksSinceEaster < 5) return "Ea4";
        else if (weeksSinceEaster < 6) {
            if (day < 4) return "Ea5";
            else return "Ascension";
        }
        else if (weeksSinceEaster < 7) return "Asc1";
        else if (weeksSinceEaster < 8) {
            if (day === 1) return "Whitmon";
            else if (day === 2) return "WhitTue";
            else return "Whitsun";
        }
        else if (weeksSinceEaster < 9) return "Trinity";
        else if (weeksSinceEaster < 34) return "T" + (Math.ceil(weeksSinceEaster) - 9);
        else if (weeksSinceEaster < 35) return "E6";
        else if (weeksSinceEaster < 36) return "E5";
        else return "I AM ERROR";
    }
    
    function getSundayAfterXmas() {
        for (let i = 26; i <= 31; i++) {
            let foo = new Date(year, 11, i);
            if (foo.getDay() === 0) {
                return foo;
            }
        }
        return "NONE";
    }
    
    //Advent and Christmas
    if (weeksTillXmas <= 4)
    {
        if (weeksTillXmas > 3) return "SNBA";
        else if (weeksTillXmas > 2) return "A1";
        else if (weeksTillXmas > 1) return "A2";
        else if (weeksTillXmas > 0) return "A3";
        else if (date < 25) return "A4";
        else {
            const xmasSun = getSundayAfterXmas();
            
            if (xmasSun === "NONE" || now < xmasSun) return "Xmas";
            else return "X1";
        }
    }
    return "How did you get here, anyway?";
}

function getLiturgicalDate(now) {
    const month = now.getMonth();
    const day = now.getDate();
    
    if (month === 0) { //jan
        //if (day === 1) return "Circ";
        //if (day === 6) return "Epiphany";
        if (day === 25) return "Paul";
    } else if (month === 1) { //feb
        if (day === 2) return "Candlemas";
        if (day === 24) return "Matthias";
    } else if (month === 2) { //mar
        if (day === 25) return "Annunciation";
        if (day === 17 && now.getDay() !== 0 || day == 18 && now.getDay() === 1) return "Patrick";
        if (day === 19 && now.getDay() !== 0 || day == 20 && now.getDay() === 1) return "Joseph";
    } else if (month === 3) { //apr
        if (day === 25) return "Mark";
    } else if (month === 4) { //may
        if (day === 1) return "PhilipAndJames";
    } else if (month === 5) { //jun
        if (day === 11) return "Barnabas";
        if (day === 24) return "JohnBaptist";
        if (day === 29) return "Peter";
    } else if (month === 6) { //jul
        if (day === 4) return "IndependenceDay";
        if (day === 25) return "James";
    } else if (month === 7) { //aug
        if (day === 6) return "Transfiguration";
        if (day === 24) return "Bartholomew";
    } else if (month === 8) { //sep
        if (day === 21) return "Matthew";
        if (day === 29) return "Michael";
    } else if (month === 9) { //oct
        if (day === 18) return "Luke";
        if (day === 28) return "SimonAndJude";
    } else if (month === 10) { //nov
        if (day === 1 || day > 1 && day <= 8) return "AllSaints";
        if (day === 16) return "Hugh";
        if (day >= 22 && day <= 28 && now.getDay() >= 4 || day === 29 && now.getDay() === 5) return "ThanksgivingDay";
        if (day === 30) return "Andrew";
    } else { //dec
        if (day === 21) return "Thomas";
        if (day === 25) return "Xmas";
        if (day === 26) return "Stephen";
        if (day === 27) return "JohnEvangelist";
        if (day === 28) return "Innocents";
    }
    
    return "";
}

function getBlackletterDay(month, date) {
    switch (month) {
        case 0: //january
            switch (date) {
                case 8:
                    return {
                        name: "Lucian",
                        longName: "",
                        type: "PM",
                        gender: 0
                    };
                    break;
                case 13:
                    return {
                        name: "Hilary",
                        longName: "Hilary of Poitiers",
                        type: "BpC",
                        gender: 0
                    };
                    break;
                case 18:
                    return {
                        name: "Prisca",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 20:
                    return {
                        name: "Fabian",
                        longName: "",
                        type: "BpM",
                        gender: 0
                    };
                    break;
                case 21:
                    return {
                        name: "Agnes",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 22:
                    return {
                        name: "Vincent",
                        longName: "Vincent of Saragossa",
                        type: "M",
                        gender: 0
                    };
                    break;
            }  
            break;
        case 1: //feb
            switch (date) {
                case 5:
                    return {
                        name: "Agatha",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 14:
                    return {
                        name: "Valentine",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
            }
            break;
        case 2: //mar
            switch (date) {
                case 1:
                    return {
                        name: "David",
                        longName: "",
                        type: "Abp",
                        gender: 0
                    };
                    break;
                case 2:
                    return {
                        name: "Chad",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 7:
                    return {
                        name: "Perpetua",
                        longName: "",
                        type: "M",
                        gender: 1
                    };
                    break;
                case 12:
                    return {
                        name: "Gregory",
                        longName: "Gregory the Great",
                        type: "MB",
                        gender: 0
                    };
                    break;
                case 18:
                    return {
                        name: "Edward",
                        longName: "",
                        type: "",
                        gender: 0
                    };
                    break;
                case 21:
                    return {
                        name: "Benedict",
                        longName: "",
                        type: "A",
                        gender: 0
                    };
                    break;
            }
            break;
        case 3: //apr
    //april 3 richard b 4 ambrose b 19 alphege abp 23 george m
            switch (date) {
                case 3:
                    return {
                        name: "Richard",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 4:
                    return {
                        name: "Ambrose",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 19:
                    return {
                        name: "Alphege",
                        longName: "",
                        type: "Abp",
                        gender: 0
                    };
                    break;
                case 23:
                    return {
                        name: "George",
                        longName: "",
                        type: "M",
                        gender: 0
                    };
                    break;
            }
            break;
        case 4: //may
    //may 3 invent cross 6 john ante port lat
            switch (date) {
                case 19:
                    return {
                        name: "Dunstan",
                        longName: "",
                        type: "Abp",
                        gender: 0
                    };
                    break;
                case 26:
                    return {
                        name: "Augustine",
                        longName: "Augustine of Canterbury",
                        type: "Abp",
                        gender: 0
                    };
                    break;
                case 27:
                    return {
                        name: "Bede",
                        longName: "",
                        type: "P",
                        gender: 0
                    };
                    break;
            }
            break;
        case 5: //jun
    //20 trans king edward
            switch (date) {
                case 1:
                    return {
                        name: "Nicomede",
                        longName: "",
                        type: "M",
                        gender: 0
                    };
                    break;
                case 5:
                    return {
                        name: "Boniface",
                        longName: "",
                        title: "Apostle to the Germans",
                        type: "BM",
                        gender: 0
                    };
                    break;
                case 17:
                    return {
                        name: "Alban",
                        longName: "",
                        type: "M",
                        gender: 0
                    };
                    break;
            }
            break;
        case 6: //jul
    //july 2 visitation 4 trans s martin
            switch (date) {
                case 15:
                    return {
                        name: "Swithun",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 20:
                    return {
                        name: "Margaret",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 22:
                    return {
                        name: "Mary Magdalene",
                        longName: "",
                        type: "",
                        gender: 1
                    };
                    break;
                case 26:
                    return {
                        name: "Anne",
                        longName: "",
                        type: "",
                        gender: 1
                    };
                    break;
            }
            break;
        case 7: //aug
    //august 1 lammas 6 transfiguration 7 holy name 29 beh john baptist
            switch (date) {
                case 10:
                    return {
                        name: "Lawrence",
                        longName: "",
                        type: "M",
                        gender: 0
                    };
                    break;
                case 28:
                    return {
                        name: "Augustine",
                        longName: "Augustine of Hippo",
                        type: "B",
                        gender: 0
                    };
                    break;
            }
            break;
        case 8: //sep
    //september 8 nat bvm 14 roodmas
            switch (date) {
                case 1:
                    return {
                        name: "Giles",
                        longName: "",
                        type: "",
                        gender: 0
                    };
                    break;
                case 7:
                    return {
                        name: "Enurchus",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 17:
                    return {
                        name: "Lambert",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 26:
                    return {
                        name: "Cyprian",
                        longName: "",
                        type: "Abp",
                        gender: 0
                    };
                    break;
                case 30:
                    return {
                        name: "Jerome",
                        longName: "",
                        type: "P",
                        gender: 0
                    };
                    break;
            }
            break;
        case 9: //oct
    //october 13 trans k edw
            switch (date) {
                case 1:
                    return {
                        name: "Remigius",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 6:
                    return {
                        name: "Faith",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 9:
                    return {
                        name: "Denis",
                        longName: "",
                        type: "BM",
                        gender: 0
                    };
                    break;
                case 17:
                    return {
                        name: "Etheldreda",
                        longName: "",
                        type: "V",
                        gender: 1
                    };
                    break;
                case 25:
                    return {
                        name: "Crispin",
                        longName: "",
                        type: "M",
                        gender: 0
                    };
                    break;
            }
            break;
        case 10: //nov
            switch (date) {
                case 6:
                    return {
                        name: "Leonard",
                        longName: "",
                        type: "C",
                        gender: 0
                    };
                    break;
                case 11:
                    return {
                        name: "Martin",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 13:
                    return {
                        name: "Britius",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 15:
                    return {
                        name: "Machutus",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 20:
                    return {
                        name: "Edmund",
                        longName: "",
                        type: "",
                        gender: 0
                    };
                    break;
                case 22:
                    return {
                        name: "Cecilia",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 22:
                    return {
                        name: "Clement",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 25:
                    return {
                        name: "Catherine",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
            }
            break;
        case 11: //dec
    //december 8 conc bvm 16 o sapientia
            switch (date) {
                case 6:
                    return {
                        name: "Nicholas",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
                case 13:
                    return {
                        name: "Lucy",
                        longName: "",
                        type: "VM",
                        gender: 1
                    };
                    break;
                case 31:
                    return {
                        name: "Silvester",
                        longName: "",
                        type: "B",
                        gender: 0
                    };
                    break;
            }
            break;
    }

    return "";
}
