function getBlackletterCollect(month, date) {
  switch (month) {
    case 0: //January: 8 Lucian PM, 13 Hilary BpC, 18 Prisca VM, 20 Fabian BpM 21 Agnes VM 22 Vincent M
      switch (date) {
        case 1: return "January, New Year's Day";
      }
    case 1: //february: 5 agatha vm 14 valentine b
      switch (date) {
        case 14: return "February, Valentine's Day";
      }
    case 2: //march: 1 david abp 2 chad b 7 perpetua m 12 gregory mb 18 king edward 21 benedict a
      switch (date) {
        case 17: return "March, St. Patrick's Day";
      }
    case 3: //april 3 richard b 4 ambrose b 19 alphege abp 23 george m
      switch (date) {
        case 1: return "April, April Fool's Day";
      }
    case 4: //may 3 invent cross 6 john ante port lat 19 dunstan abp 26 augustine abp 27 bede p
      switch (date) {
        case 5: return "May, Cinco de Mayo";
      }
    case 5: return "June, Regular day in June"; //june 1 nicomede m 5 boniface b 11 barnabas ap 17 alban m 20 trans king edward
    case 6: //july 2 visitation 4 trans s martin 15 swithun b 20 margaret vm 22 mary magdalen 26 anne
      switch (date) {
        case 4: return "July, Independence Day";
      }
    case 7: return "August, Regular day in August"; //august 1 lammas 6 transfiguration 7 holy name 10 lawrence m 28 augustine b 29 beh john baptist
    case 8: return "September, Regular day in September"; //september 1 giles a 7 enurchus b 8 nat bvm 14 roodmas 17 lambert b 26 cyprian abp 30 jerome
    case 9: //october 1 remigius b 6 faith vm 9 denis b 13 trans k edw 17 etheldreda v 25 crispin m
      switch (date) {
        case 31: return "October, Halloween";
      }
    case 10: //november 2 allsouls 6 leonard c 11 martin b 13 britius b 15 machutus b 17 hugh b 20 king edmund 22 cecilia vm 23 clement b 25 catherine vm
      switch (date) {
        case 11: return "November, Veterans Day";
        case 25: return "November, Thanksgiving";
      }
    case 11: //december 6 nicholas b 8 conc bvm 13 lucy vm 16 o sapientia 31 silvester b
      switch (date) {
        case 25: return "December, Christmas";
      }
  }

  return "";
}
