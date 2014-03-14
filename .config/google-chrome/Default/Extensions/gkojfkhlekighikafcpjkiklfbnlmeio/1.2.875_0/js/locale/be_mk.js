'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Џибути"},
    "JM": {message: "Јамајка"},
    "AT": {message: "Австрија"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Сакате Hola на други уреди? (Xbox, PS, Apple TV, iPhone-от ...). Кликни тука"},
    "SZ": {message: "Свазиленд"},
    "YT": {message: "Мајоте"},
    "BN": {message: "Брунеи"},
    "ZM": {message: "Замбија"},
    "app_desc": {message: "Пристап до сите на интернет! Оди до блокирани сајт -> клик Hola икона -> Change земја знаме -> УЖИВАЈТЕ!"},
    "Improve translation": {message: "Подобрување на превод"},
    "more...": {message: "повеќе ..."},
    "PR": {message: "Порторико"},
    "SH": {message: "Света Елена"},
    "There seems to be an error": {message: "Се чини дека има грешка"},
    "MA": {message: "Мароко"},
    "MT": {message: "Малта"},
    "SV": {message: "Ел Салвадор"},
    "MP": {message: "Северни Маријанини Острови"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Пристапите на некој сајт од било која земја, бесплатно"},
    "Try to <span>reload</span>": {message: "Се обиде да <span> Вчитај ја страната повторно </span>"},
    "UZ": {message: "Узбекистан"},
    "PW": {message: "Палау"},
    "TK": {message: "Токелау"},
    "LR": {message: "Либерија"},
    "TN": {message: "Тунис"},
    "EE": {message: "Естонија"},
    "CK": {message: "Кукови Острови"},
    "BY": {message: "Белорусија"},
    "NO": {message: "Норвешка"},
    "KR": {message: "Јужна Кореја"},
    "BF": {message: "Буркина Фасо"},
    "AM": {message: "Ерменија"},
    "SR": {message: "Суринам"},
    "MG": {message: "Мадагаскар"},
    "ON": {message: "ЗА"},
    "BT": {message: "Бутан"},
    "CF": {message: "Централна Африканска Република"},
    "AE": {message: "Обединети Арапски Емирати"},
    "BA": {message: "Босна и Херцеговина"},
    "TH": {message: "Тајланд"},
    "Author:": {message: "Автор:"},
    "CC": {message: "Кокосови острови"},
    "NC": {message: "Нова Каледонија"},
    "TO": {message: "Тонга"},
    "SE": {message: "Шведска"},
    "AZ": {message: "Азербејџан"},
    "AF": {message: "Авганистан"},
    "NG": {message: "Нигерија"},
    "KE": {message: "Кенија"},
    "BJ": {message: "Бенин"},
    "Turn on to get started": {message: "Вклучете го за да започнете"},
    "OM": {message: "Оман"},
    "LK": {message: "Шри Ланка"},
    "ID": {message: "Индонезија"},
    "FM": {message: "Микронезија"},
    "(some Hola features are not available on your version)": {message: "(Некои Hola карактеристики не се достапни од вашата верзија)"},
    "GM": {message: "Гамбија"},
    "LV": {message: "Латвија"},
    "RU": {message: "Русија"},
    "FI": {message: "Финска"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Добие Hola Плус за ОН ја прекина, ад-бесплатна услуга."},
    "LU": {message: "Луксембург"},
    "VE": {message: "Венецуела"},
    "TV": {message: "Тувалу"},
    "VI": {message: "Девствени Острови на САД"},
    "SN": {message: "Сенегал"},
    "MX": {message: "Мексико"},
    "IL": {message: "Израел"},
    "GG": {message: "Гвернзи"},
    "Author site:": {message: "Авторот сајт:"},
    "HU": {message: "Унгарија"},
    "DO": {message: "Доминиканска Република"},
    "OFF": {message: "OFF"},
    "KH": {message: "Камбоџа"},
    "TG": {message: "Того"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola не може правилно да функционира бидејќи друга екстензија е контролирање на вашите поставувања за прокси. Ве молиме оневозможи други екстензии, кој мислите дека би можеле да го контролираат вашиот поставувања за прокси во <a> екстензии </a> (како ад-блокатори, други VPN услугите, итн.)"},
    "BB": {message: "Барбадос"},
    "JE": {message: "Џерси"},
    "DK": {message: "Данска"},
    "PA": {message: "Панама"},
    "CV": {message: "Зеленортски Острови"},
    "QA": {message: "Катар"},
    "Reload": {message: "Вчитај ја страната повторно"},
    "GD": {message: "Гренада"},
    "Number of users that use this option": {message: "Бројот на корисници кои ја користите оваа опција"},
    "MO": {message: "Макао С.А.Р Кина"},
    "MF": {message: "Сент Мартин"},
    "HR": {message: "Хрватска"},
    "CZ": {message: "Чешка Република"},
    "BL": {message: "Сент Бартоломеј"},
    "ST": {message: "Сао Томе и Принчипе"},
    "AU": {message: "Австралија"},
    "IR": {message: "Иран"},
    "CG": {message: "Конго"},
    "BI": {message: "Бурунди"},
    "GW": {message: "Гвинеа-Биса"},
    "MK": {message: "Македонија"},
    "GR": {message: "Грција"},
    "AG": {message: "Антигва и Барбуда"},
    "AI": {message: "Ангвила"},
    "AN": {message: "Холандски Антили"},
    "UA": {message: "Украина"},
    "EH": {message: "Западна Сахара"},
    "KN": {message: "Сент Кристофер и Невис"},
    "SC": {message: "Сејшели"},
    "NL": {message: "Холандија"},
    "MS": {message: "Монсерат"},
    "HK": {message: "Хонг Конг С.А.Р Кина"},
    "EC": {message: "Еквадор"},
    "MY": {message: "Малезија"},
    "CR": {message: "Костарика"},
    "VA": {message: "Ватикан"},
    "IO": {message: "Британско Индиско Океанска територија"},
    "SD": {message: "Судан"},
    "RS": {message: "Србија"},
    "CN": {message: "Кина"},
    "UY": {message: "Уругвај"},
    "PY": {message: "Парагвај"},
    "MU": {message: "Маурициус"},
    "CH": {message: "Швајцарија"},
    "LI": {message: "Лихтенштајн"},
    "GH": {message: "Гана"},
    "KG": {message: "Киргистан"},
    "NU": {message: "Ние"},
    "US": {message: "Соединети Американски Држави"},
    "PE": {message: "Перу"},
    "SL": {message: "Сиера Леоне"},
    "FJ": {message: "Фиџи"},
    "ER": {message: "Еритреја"},
    "IQ": {message: "Ирак"},
    "AS": {message: "Американска Самоа"},
    "TZ": {message: "Танзанија"},
    "LY": {message: "Либија"},
    "GT": {message: "Гватемала"},
    "BM": {message: "Бермуди"},
    "BV": {message: "Боувитови острови"},
    "LT": {message: "Литванија"},
    "SG": {message: "Сингапур"},
    "PM": {message: "Сент Пјер и Микелан"},
    "Initializing...": {message: "Иницијализацијата ..."},
    "TT": {message: "Тринидад и Тобаго"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola не функционира добро во Windows 8 на владата. Ве молиме да се префрлат на десктоп режим. Кликнете <a> тука </a> за инструкции"},
    "SK": {message: "Словачка"},
    "SY": {message: "Сирија"},
    "GL": {message: "Гренланд"},
    "PG": {message: "Папуа Нова Гвинеја"},
    "KI": {message: "Кирибати"},
    "CD": {message: "Демократска Република Конго"},
    "AO": {message: "Ангола"},
    "BW": {message: "Боцвана"},
    "ZW": {message: "Зимбабве"},
    "VC": {message: "Сент Винсент и Гренадините"},
    "JP": {message: "Јапонија"},
    "NA": {message: "Намибија"},
    "TJ": {message: "Таџикистан"},
    "LC": {message: "Света Лучија"},
    "VU": {message: "Ванату"},
    "MN": {message: "Монголија"},
    "Hola site list": {message: "Hola сајт листа"},
    "IT": {message: "Италија"},
    "RE": {message: "Ријунион"},
    "WS": {message: "Самоа"},
    "Enable": {message: "Овозможи"},
    "Loading": {message: "Вчитување"},
    "EG": {message: "Египет"},
    "FR": {message: "Франција"},
    "start": {message: "започне"},
    "RW": {message: "Руанда"},
    "BE": {message: "Белгија"},
    "UM": {message: "Американски територии во Пацификот"},
    "Accelerator": {message: "Педалот за гас"},
    "LS": {message: "Лесото"},
    "SA": {message: "Саудиска Арабија"},
    "ZA": {message: "Јужна Африка"},
    "PT": {message: "Португалија"},
    "CA": {message: "Канада"},
    "Starting...": {message: "Со почеток ..."},
    "CM": {message: "Камерун"},
    "Hola": {message: "Hola"},
    "NP": {message: "Непал"},
    "PL": {message: "Полска"},
    "GA": {message: "Габон"},
    "TM": {message: "Туркменистан"},
    "KY": {message: "Кајмански Острови"},
    "LA": {message: "Лаос"},
    "PH": {message: "Филипини"},
    "NI": {message: "Никарагва"},
    "GU": {message: "Гвам"},
    "TF": {message: "Француски Јужни територии"},
    "KZ": {message: "Казахстан"},
    "SJ": {message: "Свалбард и Жан Мејен"},
    "MM": {message: "Мјанмар"},
    "NR": {message: "Науру"},
    "DM": {message: "Доминика"},
    "NE": {message: "Нигер"},
    "AD": {message: "Андора"},
    "MR": {message: "Мавританија"},
    "changing...": {message: "менување на ..."},
    "GS": {message: "Јужна Грузија и Јужни Сендвич Острови"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Многу стара верзија на Chrome, <a> ажурирање </a> Хром да се користи Hola"},
    "ME": {message: "Црна Гора"},
    "AX": {message: "Аландски острови"},
    "VN": {message: "Виетнам"},
    "VG": {message: "Британски Девствени Острови"},
    "CI": {message: "Брегот на Слоновата Коска"},
    "YE": {message: "Јемен"},
    "DZ": {message: "Алжир"},
    "GE": {message: "Грузија"},
    "CX": {message: "Божиќни Острови"},
    "LB": {message: "Либан"},
    "FK": {message: "Фолкландски Острови"},
    "DE": {message: "Германија"},
    "even more...": {message: "дури и повеќе ..."},
    "MV": {message: "Малдиви"},
    "PN": {message: "Питкарн"},
    "BH": {message: "Бахреин"},
    "GI": {message: "Гибралтар"},
    "WF": {message: "Волис и Футуна острови"},
    "RO": {message: "Романија"},
    "GP": {message: "Гвадалупе"},
    "AR": {message: "Аргентина"},
    "IN": {message: "Индија"},
    "AW": {message: "Аруба"},
    "CS": {message: "Србија и Црна Гора"},
    "FO": {message: "Фарски Острови"},
    "BR": {message: "Бразил"},
    "MC": {message: "Монако"},
    "HN": {message: "Хондурас"},
    "Translate to your language": {message: "Преведете да јазик"},
    "SB": {message: "Соломоновите Острови"},
    "NZ": {message: "Нов Зеланд"},
    "PS": {message: "Палестинска Територија"},
    "UG": {message: "Уганда"},
    "GB": {message: "Велика Британија"},
    "HT": {message: "Хаити"},
    "GF": {message: "Француска Гвајана"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Старата верзија на Firefox. Прес <a> тука </a> за да се надополни."},
    "ZZ": {message: "Непознат регион"},
    "KM": {message: "Коморос"},
    "KW": {message: "Кувајт"},
    "MQ": {message: "Мартиник"},
    "TC": {message: "Турк и Каикос Острови"},
    "MZ": {message: "Мозамбик"},
    "ES": {message: "Шпанија"},
    "BO": {message: "Боливија"},
    "AL": {message: "Албанија"},
    "MD": {message: "Молдавија"},
    "TR": {message: "Турција"},
    "GN": {message: "Гвинеја"},
    "CO": {message: "Колумбија"},
    "SI": {message: "Словенија"},
    "Settings": {message: "Подесувања"},
    "AQ": {message: "Антарктик"},
    "JO": {message: "Јордан"},
    "SM": {message: "Сан Марино"},
    "CU": {message: "Куба"},
    "CL": {message: "Чиле"},
    "ML": {message: "Мали"},
    "ET": {message: "Етиопија"},
    "IS": {message: "Исланд"},
    "Reload Hola": {message: "Вчитај Hola"},
    "back to": {message: "се врати до"},
    "BG": {message: "Бугарија"},
    "MH": {message: "Маршалови острови"},
    "BS": {message: "Бахами"},
    "TL": {message: "Источен Тимор"},
    "BZ": {message: "Белизе"},
    "CY": {message: "Кипар"},
    "IM": {message: "Островот Ман"},
    "IE": {message: "Ирска"},
    "Get help from engineer over skype:": {message: "Добијат помош од инженер над Skype:"},
    "TW": {message: "Тајван"},
    "KP": {message: "Северна Кореја"},
    "PF": {message: "Француска Полинезија"},
    "app_name": {message: "Hola Подобро Интернет"},
    "Update": {message: "Ажурирање"},
    "MW": {message: "Малави"},
    "GY": {message: "Гвајана"},
    "Unblocker is disabled": {message: "Unblocker е исклучен"},
    "PK": {message: "Пакистан"},
    "GQ": {message: "Екваторска Гвинеја"},
    "Number of users that pressed not working": {message: "Бројот на корисници кои не притисне работат"},
    "NF": {message: "Нофролк Остров"},
    "TD": {message: "Чад"},
    "SO": {message: "Сомалија"},
    "HM": {message: "Хардови острови и Мекдоналд Острови"},
    "BD": {message: "Бангладеш"},

};
return E; });