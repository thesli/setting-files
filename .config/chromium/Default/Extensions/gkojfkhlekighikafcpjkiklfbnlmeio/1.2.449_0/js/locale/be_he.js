'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "ג׳יבוטי"},
    "JM": {message: "ג׳מייקה"},
    "AT": {message: "אוסטריה"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "רוצה הולה במכשירים אחרים? (Xbox, PS, Apple TV, אייפון ...). לחץ כאן"},
    "SZ": {message: "סווזילנד"},
    "YT": {message: "מאיוט"},
    "BN": {message: "ברוניי"},
    "ZM": {message: "זמביה"},
    "app_desc": {message: "גישה לכל האינטרנט! עבור לאתר חסום > לחץ על סמל Hola > שינוי דגל מדינה > תהנו!"},
    "more...": {message: "עוד..."},
    "PR": {message: "פורטו ריקו"},
    "SH": {message: "סנט הלנה"},
    "There seems to be an error": {message: "נראה שיש שגיאה"},
    "MA": {message: "מרוקו"},
    "MT": {message: "מלטה"},
    "SV": {message: "אל סלבדור"},
    "MP": {message: "איי מריאנה הצפוניים"},
    "Unblocker": {message: "מסיר חסימות"},
    "Access any site from any country, free": {message: "!לגשת לכל אתר מכל מדינה"},
    "Try to <span>reload</span>": {message: "נסה <span>לרענן</span>"},
    "PW": {message: "פאלאו"},
    "UZ": {message: "אוזבקיסטן"},
    "LR": {message: "ליבריה"},
    "TK": {message: "טוקלאו"},
    "TN": {message: "תוניסיה"},
    "EE": {message: "אסטוניה"},
    "CK": {message: "איי קוק"},
    "BY": {message: "בלארוס"},
    "NO": {message: "נורווגיה"},
    "KR": {message: "דרום קוריאה"},
    "BF": {message: "בורקינה פאסו"},
    "AM": {message: "ארמניה"},
    "SR": {message: "סורינם"},
    "MG": {message: "מדגסקר"},
    "ON": {message: "פועל"},
    "BT": {message: "בהוטן"},
    "CF": {message: "הרפובליקה של מרכז אפריקה"},
    "BA": {message: "בוסניה והרצגובינה"},
    "AE": {message: "איחוד האמירויות הערביות"},
    "TH": {message: "תאילנד"},
    "CC": {message: "איי קוקוס"},
    "NC": {message: "קלדוניה החדשה"},
    "TO": {message: "טונגה"},
    "SE": {message: "שוודיה"},
    "AZ": {message: "אזרביג'ן"},
    "AF": {message: "אפגניסטן"},
    "NG": {message: "ניגריה"},
    "KE": {message: "קניה"},
    "BJ": {message: "בנין"},
    "Turn on to get started": {message: "הפעל כדי להתחיל"},
    "OM": {message: "עומאן"},
    "LK": {message: "סרי לנקה"},
    "ID": {message: "אינדונזיה"},
    "FM": {message: "מיקרונזיה"},
    "(some Hola features are not available on your version)": {message: "(כמה תכונות Hola אינן זמינות בגרסה שלך)"},
    "GM": {message: "גמביה"},
    "LV": {message: "לטביה"},
    "RU": {message: "רוסיה"},
    "FI": {message: "פינלנד"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "קבל Hola פלוס עבור שירות בלתי מופרע, נטול מודעות"},
    "LU": {message: "לוקסמבורג"},
    "VE": {message: "ונצואלה"},
    "TV": {message: "טובלו"},
    "VI": {message: "איי הבתולה האמריקניים"},
    "SN": {message: "סנגל"},
    "MX": {message: "מקסיקו"},
    "IL": {message: "ישראל"},
    "GG": {message: "גרנסי"},
    "DO": {message: "הרפובליקה הדומיניקנית"},
    "HU": {message: "הונגריה"},
    "OFF": {message: "מכובה"},
    "KH": {message: "קמבודיה"},
    "TG": {message: "טוגו"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "הגדרות שרת  ה-proxy של הרשת מנוהלות על ידי שלוחה אחרת. <a>extensions</a> להשבית תוסף להמשיך עם Hola."},
    "BB": {message: "ברבדוס"},
    "JE": {message: "ג'רסי"},
    "DK": {message: "דנמרק"},
    "PA": {message: "פנמה"},
    "QA": {message: "קטאר"},
    "CV": {message: "כף ורדה"},
    "Reload": {message: "טען מחדש"},
    "GD": {message: "גרנדה"},
    "MO": {message: "מקאו (מחוז מנהלי מיוחד של סין)"},
    "MF": {message: "סנט מרטין"},
    "HR": {message: "קרואטיה"},
    "CZ": {message: "צ׳כיה"},
    "BL": {message: "סנט ברתולומיאו"},
    "ST": {message: "סאו טומה ופרינסיפה"},
    "AU": {message: "אוסטרליה"},
    "IR": {message: "איראן"},
    "CG": {message: "קונגו - ברזאויל"},
    "BI": {message: "בורונדי"},
    "GW": {message: "גיניאה-ביסאו"},
    "MK": {message: "מקדוניה"},
    "GR": {message: "יוון"},
    "AG": {message: "אנטיגואה וברבודה"},
    "AI": {message: "אנגילה"},
    "AN": {message: "אנטילים הולנדיים"},
    "UA": {message: "אוקראינה"},
    "EH": {message: "סהרה המערבית"},
    "KN": {message: "סנט קיטס ונוויס"},
    "SC": {message: "איי סיישל"},
    "MS": {message: "מונסראט"},
    "NL": {message: "הולנד"},
    "EC": {message: "אקוודור"},
    "HK": {message: "הונג קונג (מחוז מנהלי מיוחד של סין)"},
    "MY": {message: "מלזיה"},
    "CR": {message: "קוסטה ריקה"},
    "VA": {message: "הוותיקן"},
    "IO": {message: "טריטוריה בריטית באוקיאנוס ההודי"},
    "RS": {message: "סרביה"},
    "SD": {message: "סודן"},
    "CN": {message: "סין"},
    "UY": {message: "אורוגוואי"},
    "PY": {message: "פרגוואי"},
    "MU": {message: "מאוריציוס"},
    "CH": {message: "שווייץ"},
    "LI": {message: "ליכטנשטיין"},
    "KG": {message: "קירגיזסטן"},
    "GH": {message: "גאנה"},
    "NU": {message: "ניווה"},
    "PE": {message: "פרו"},
    "US": {message: "ארצות הברית"},
    "SL": {message: "סיירה לאונה"},
    "FJ": {message: "פיג׳י"},
    "ER": {message: "אריתראה"},
    "IQ": {message: "עיראק"},
    "AS": {message: "סמואה האמריקנית"},
    "TZ": {message: "טנזניה"},
    "LY": {message: "לוב"},
    "GT": {message: "גואטמלה"},
    "BM": {message: "ברמודה"},
    "BV": {message: "איי בובה"},
    "LT": {message: "ליטא"},
    "PM": {message: "סנט פייר ומיקלון"},
    "SG": {message: "סינגפור"},
    "Initializing...": {message: "מאתחל, אנא המתן..."},
    "TT": {message: "טרינידד וטובגו"},
    "SK": {message: "סלובקיה"},
    "SY": {message: "סוריה"},
    "GL": {message: "גרינלנד"},
    "PG": {message: "פפואה גיניאה החדשה"},
    "KI": {message: "קיריבאטי"},
    "CD": {message: "קונגו - קינשאסה"},
    "AO": {message: "אנגולה"},
    "BW": {message: "בוטסוואנה"},
    "ZW": {message: "זימבאבווה"},
    "VC": {message: "סנט וינסנט והגרנדינים"},
    "JP": {message: "יפן"},
    "NA": {message: "נמיביה"},
    "TJ": {message: "טג׳יקיסטן"},
    "LC": {message: "סנט לוסיה"},
    "VU": {message: "ונואטו"},
    "MN": {message: "מונגוליה"},
    "Hola site list": {message: "רשימת אתרים לפתיחה"},
    "IT": {message: "איטליה"},
    "RE": {message: "ראוניון"},
    "WS": {message: "סמואה"},
    "Enable": {message: "אפשר"},
    "Loading": {message: "טוען"},
    "EG": {message: "מצרים"},
    "FR": {message: "צרפת"},
    "start": {message: "התחל"},
    "RW": {message: "רואנדה"},
    "UM": {message: "איים קטנים שלחוף ארצות הברית"},
    "BE": {message: "בלגיה"},
    "Accelerator": {message: "מאיץ"},
    "LS": {message: "לסוטו"},
    "SA": {message: "ערב הסעודית"},
    "ZA": {message: "דרום אפריקה"},
    "PT": {message: "פורטוגל"},
    "CA": {message: "קנדה"},
    "Starting...": {message: "מתחיל ..."},
    "CM": {message: "קמרון"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "הגרסה החופשית של הולה צריכה להפעיל אותו מחדש כל 4 שעות והוא ממומן על ידי מודעות"},
    "NP": {message: "נפאל"},
    "PL": {message: "פולין"},
    "GA": {message: "גאבון"},
    "TM": {message: "טורקמניסטן"},
    "KY": {message: "איי קיימן"},
    "Verify you have Internet": {message: "בדוק את חיבור האינטרט שלך"},
    "LA": {message: "לאוס"},
    "PH": {message: "פיליפינים"},
    "NI": {message: "ניקרגואה"},
    "GU": {message: "גואם"},
    "TF": {message: "טריטוריות דרומיות של צרפת"},
    "KZ": {message: "קזחסטן"},
    "SJ": {message: "סוולבארד וז׳אן מאיין"},
    "MM": {message: "מייאנמאר"},
    "NR": {message: "נאורו"},
    "DM": {message: "דומיניקה"},
    "NE": {message: "ניז׳ר"},
    "AD": {message: "אנדורה"},
    "MR": {message: "מאוריטניה"},
    "changing...": {message: "משתנה..."},
    "GS": {message: "ג׳ורג׳יה הדרומית ואיי סנדוויץ׳ הדרומיים"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "גרסה מאוד ישנה של Chrome. <a>update</a> Chrome בשביל להשתמש ב Hola"},
    "ME": {message: "מונטנגרו"},
    "AX": {message: "איי אלנד"},
    "VG": {message: "איי הבתולה הבריטיים"},
    "VN": {message: "וייטנאם"},
    "DZ": {message: "אלג׳יריה"},
    "CI": {message: "חוף השנהב"},
    "YE": {message: "תימן"},
    "GE": {message: "גאורגיה"},
    "CX": {message: "איי כריסטמס"},
    "LB": {message: "לבנון"},
    "FK": {message: "איי פוקלנד"},
    "DE": {message: "גרמניה"},
    "even more...": {message: "אפילו יותר..."},
    "MV": {message: "מלדיבים"},
    "PN": {message: "פיטקרן"},
    "BH": {message: "בחריין"},
    "GI": {message: "גיברלטר"},
    "WF": {message: "איי ווליס ופוטונה"},
    "RO": {message: "רומניה"},
    "AR": {message: "ארגנטינה"},
    "GP": {message: "גוואדלופ"},
    "IN": {message: "הודו"},
    "AW": {message: "ארובה"},
    "FO": {message: "איי פארו"},
    "CS": {message: "סרביה ומונטנגרו"},
    "BR": {message: "ברזיל"},
    "HN": {message: "הונדורס"},
    "MC": {message: "מונקו"},
    "SB": {message: "איי שלמה"},
    "PS": {message: "הרשות הפלסטינית"},
    "NZ": {message: "ניו זילנד"},
    "UG": {message: "אוגנדה"},
    "GB": {message: "בריטניה"},
    "HT": {message: "האיטי"},
    "GF": {message: "גיאנה הצרפתית"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "גרסה הישנה של פיירפוקס. לחץ <a>כאן</a> לשדרוג."},
    "ZZ": {message: "אזור לא ידוע או לא תקין"},
    "KM": {message: "קומורוס"},
    "KW": {message: "כווית"},
    "TC": {message: "איי טורקס וקאיקוס"},
    "MQ": {message: "מרטיניק"},
    "MZ": {message: "מוזמביק"},
    "ES": {message: "ספרד"},
    "BO": {message: "בוליביה"},
    "AL": {message: "אלבניה"},
    "TR": {message: "טורקיה"},
    "MD": {message: "מולדובה"},
    "GN": {message: "גיניאה"},
    "SI": {message: "סלובניה"},
    "CO": {message: "קולומביה"},
    "Settings": {message: "הגדרות"},
    "AQ": {message: "אנטארקטיקה"},
    "JO": {message: "ירדן"},
    "SM": {message: "סן מרינו"},
    "CL": {message: "צ׳ילה"},
    "CU": {message: "קובה"},
    "ML": {message: "מאלי"},
    "ET": {message: "אתיופיה"},
    "IS": {message: "איסלנד"},
    "Reload Hola": {message: "רענן את הולה"},
    "back to": {message: "בחזרה אל"},
    "MH": {message: "איי מרשל"},
    "BG": {message: "בולגריה"},
    "BS": {message: "איי בהאמה"},
    "TL": {message: "מזרח טימור"},
    "BZ": {message: "בליז"},
    "CY": {message: "קפריסין"},
    "IM": {message: "האי מאן"},
    "IE": {message: "אירלנד"},
    "Get help from engineer over skype:": {message: "קבל עזרה ממהנדס בסקייפ:"},
    "TW": {message: "טייוואן"},
    "KP": {message: "צפון קוריאה"},
    "PF": {message: "פולינזיה הצרפתית"},
    "app_name": {message: "Hola אינטרנט טוב יותר"},
    "Update": {message: "עדכן"},
    "MW": {message: "מלאווי"},
    "GY": {message: "גיאנה"},
    "Unblocker is disabled": {message: "מסיר החסימות מנוטרל"},
    "PK": {message: "פקיסטן"},
    "GQ": {message: "גיניאה המשוונית"},
    "NF": {message: "איי נורפוק"},
    "TD": {message: "צ׳אד"},
    "SO": {message: "סומליה"},
    "BD": {message: "בנגלדש"},
    "HM": {message: "איי הרד ואיי מקדונלנד"},

};
return E; });