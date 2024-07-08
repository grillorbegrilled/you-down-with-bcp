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
  if ((lit === "L1" || lit === "Whitsun") && (day === 3 || day === 5 || day === 6) || //Whitsun
        month === 8 && date >= 15 && date <= 24 && (day === 3 || day === 5 || day === 6) || //September... is this accurate?
        month === 11 && date >= 14 && date <= 23 && (day === 3 || day === 5 || day === 6)) //December... is THIS accurate?
        return true;

    return false;
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
    
    const weeksTillXmas = weeksTill(xmas);
    
    //Easter and the rest
    if (now >= easter && weeksTillXmas > 5)
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
        for (let day = 26; day <= 31; day++) {
            let date = new Date(year, 11, day);
            if (date.getDay() === 0) {
                return date;
            }
        }
        return "NONE";
    }
    
    //Advent and Christmas
    if (weeksTillXmas <= 5)
    {
        if (weeksTillXmas > 4) return "SNBA";
        else if (weeksTillXmas > 3) return "A1";
        else if (weeksTillXmas > 2) return "A2";
        else if (weeksTillXmas > 1) return "A3";
        else if (weeksTillXmas > 0) return "A4";
        else if (weeksTillXmas > -1) {
            const xmasSun = getSundayAfterXmas();
            
            if (xmasSun === "NONE" || now < xmasSun) return "Xmas";
            else return "X1";
        }
        else return "I AM ERROR";
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
        if (day === 24) return "Bartholomew";
    } else if (month === 8) { //sep
        if (day === 21) return "Matthew";
        if (day === 29) return "Michael";
    } else if (month === 9) { //oct
        if (day === 18) return "Luke";
        if (day === 29) return "SimonAndJude";
    } else if (month === 10) { //nov
        if (day === 1) return "AllSaints";
        if (day === 30) return "Andrew";
    } else { //dec
        if (day === 21) return "Thomas";
        //if (day === 25) return "Xmas";
        if (day === 26) return "Stephen";
        if (day === 27) return "JohnEvangelist";
        if (day === 28) return "Innocents";
    }
    
    return "";
}

function getBlackletterDay() {
    //TODO
}
