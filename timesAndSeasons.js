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
        else if (weeksTillXmas > -1) return "A4";
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
        if (day === 28) return "SimonAndJude";
    } else if (month === 10) { //nov
        if (day === 1 || day > 1 && day <= 8 && now.getDay() !== 0) return "AllSaints";
        if (day >= 22 && day <= 28 && now.getDay() >= 4 || day === 29 && now.getDay() === 5) return "ThanksgivingDay";
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
    //January: 8 Lucian PM, 13 Hilary BpC, 18 Prisca VM, 20 Fabian BpM 21 Agnes VM 22 Vincent M
    //february: 5 agatha vm 14 valentine b
    //march: 1 david abp 2 chad b 7 perpetua m 12 gregory mb 18 king edward 21 benedict a
    //april 3 richard b 4 ambrose b 19 alphege abp 23 george m
    //may 3 invent cross 6 john ante port lat 19 dunstan abp 26 augustine abp 27 bede p
    //june 1 nicomede m 5 boniface b 11 barnabas ap 17 alban m 20 trans king edward
    //july 2 visitation 4 trans s martin 15 swithun b 20 margaret vm 22 mary magdalen 26 anne
    //august 1 lammas 6 transfiguration 7 holy name 10 lawrence m 28 augustine b 29 beh john baptist
    //september 1 giles a 7 enurchus b 8 nat bvm 14 roodmas 17 lambert b 26 cyprian abp 30 jerome
    //october 1 remigius b 6 faith vm 9 denis b 13 trans k edw 17 etheldreda v 25 crispin m
    //november 2 allsouls 6 leonard c 11 martin b 13 britius b 15 machutus b 17 hugh b 20 king edmund 22 cecilia vm 23 clement b 25 catherine vm
    //december 6 nicholas b 8 conc bvm 13 lucy vm 16 o sapientia 31 silvester b
}
