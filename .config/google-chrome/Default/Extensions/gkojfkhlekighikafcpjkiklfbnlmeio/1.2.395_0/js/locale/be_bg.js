'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Джибути"},
    "JM": {message: "Ямайка"},
    "AT": {message: "Австрия"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Искате Hola на други устройства? (Xbox, PS, Apple TV, iPhone ...). Щракнете тук"},
    "SZ": {message: "Суазиленд"},
    "YT": {message: "Мейот"},
    "BN": {message: "Бруней Дарусалам"},
    "ZM": {message: "Замбия"},
    "app_desc": {message: "Достъп до всички интернет! Отиди на блокирани сайт -> клик Hola иконата -> промяна на държавата на флага -> Наслаждавайте се!"},
    "Improve translation": {message: "Подобряване на превода"},
    "more...": {message: "още ..."},
    "PR": {message: "Пуерто Рико"},
    "SH": {message: "Света Елена"},
    "There seems to be an error": {message: "Изглежда има грешка"},
    "MA": {message: "Мароко"},
    "MT": {message: "Малта"},
    "SV": {message: "Ел Салвадор"},
    "MP": {message: "Северни Мариански Острови"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Достъп до някой сайт от всяка страна, без"},
    "Try to <span>reload</span>": {message: "Опитайте се да <span> презареди </span>"},
    "UZ": {message: "Узбекистан"},
    "PW": {message: "Палау"},
    "TK": {message: "Токелау"},
    "LR": {message: "Либерия"},
    "TN": {message: "Тунис"},
    "EE": {message: "Естония"},
    "CK": {message: "Острови Кук"},
    "BY": {message: "Беларус"},
    "NO": {message: "Норвегия"},
    "KR": {message: "Корея, Южна"},
    "BF": {message: "Буркина Фасо"},
    "AM": {message: "Армения"},
    "SR": {message: "Суринам"},
    "MG": {message: "Мадагаскар"},
    "ON": {message: "ON"},
    "BT": {message: "Бутан"},
    "CF": {message: "Централноафриканска Република"},
    "AE": {message: "Обединени арабски емирства"},
    "BA": {message: "Босна и Херцеговина"},
    "TH": {message: "Тайланд"},
    "Author:": {message: "Автор:"},
    "CC": {message: "Кокосови (Кийлинг) острови"},
    "NC": {message: "Нова Каледония"},
    "TO": {message: "Тонга"},
    "SE": {message: "Швеция"},
    "AZ": {message: "Азербайджан"},
    "AF": {message: "Афганистан"},
    "NG": {message: "Нигерия"},
    "KE": {message: "Кения"},
    "BJ": {message: "Бенин"},
    "Turn on to get started": {message: "Включете, за да започнете"},
    "OM": {message: "Оман"},
    "LK": {message: "Шри Ланка"},
    "ID": {message: "Индонезия"},
    "FM": {message: "Микронезия, Обединени Щати"},
    "(some Hola features are not available on your version)": {message: "(Някои Hola функции не са налични на вашия версия)"},
    "GM": {message: "Гамбия"},
    "LV": {message: "Латвия"},
    "RU": {message: "Руска федерация"},
    "FI": {message: "Финландия"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Вземи Hola Plus за не-прекъснато, без реклами услуга."},
    "LU": {message: "Люксембург"},
    "VE": {message: "Венецуела"},
    "TV": {message: "Тувалу"},
    "VI": {message: "САЩ, Вирджински острови"},
    "SN": {message: "Сенегал"},
    "MX": {message: "Мексико"},
    "GG": {message: "о. Гърнзи"},
    "IL": {message: "Израел"},
    "Author site:": {message: "Автор сайт:"},
    "HU": {message: "Унгария"},
    "DO": {message: "Доминиканска република"},
    "OFF": {message: "OFF"},
    "KH": {message: "Камбоджа"},
    "TG": {message: "Того"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola не може да работи правилно, тъй като друг разширение е контролирането на настройките на прокси сървъра. Моля, деактивирайте други разширения, които смятате, че може да контролира настройките на прокси в <a> разширения </a> (като Ad-блокери, други услуги, виртуални частни мрежи и др.)"},
    "BB": {message: "Барбадос"},
    "JE": {message: "о. Джързи"},
    "DK": {message: "Дания"},
    "PA": {message: "Панама"},
    "CV": {message: "Кабо Верде"},
    "QA": {message: "Катар"},
    "Reload": {message: "Презареди"},
    "GD": {message: "Гренада"},
    "Number of users that use this option": {message: "Брой на потребителите, които използват тази опция"},
    "MO": {message: "Макао О.А.Р. на Китай"},
    "MF": {message: "Сейнт Мартин"},
    "HR": {message: "Хърватска"},
    "CZ": {message: "Чешка република"},
    "BL": {message: "Сейнт Бартоломей"},
    "ST": {message: "Сао Томе и Принципе"},
    "AU": {message: "Австралия"},
    "IR": {message: "Иран, Ислямска република"},
    "CG": {message: "Конго"},
    "BI": {message: "Бурунди"},
    "GW": {message: "Гвинея-Бисау"},
    "MK": {message: "Македония, Република"},
    "GR": {message: "Гърция"},
    "AG": {message: "Антигуа и Барбуда"},
    "AI": {message: "Ангуила"},
    "AN": {message: "Холандски Антили"},
    "UA": {message: "Украйна"},
    "EH": {message: "Западна Сахара"},
    "KN": {message: "Сейнт Китс и Невис"},
    "SC": {message: "Сейшели"},
    "NL": {message: "Холандия"},
    "MS": {message: "Монсерат"},
    "HK": {message: "Хонг-Конг О.А.Р. на Китай"},
    "EC": {message: "Еквадор"},
    "MY": {message: "Малайзия"},
    "CR": {message: "Коста Рика"},
    "VA": {message: "Свещено море (Ватиканска държава)"},
    "IO": {message: "Британски територии в Индийския океан"},
    "RS": {message: "Сърбия"},
    "SD": {message: "Судан"},
    "CN": {message: "Китай"},
    "UY": {message: "Уругвай"},
    "PY": {message: "Парагвай"},
    "MU": {message: "Мавриций"},
    "CH": {message: "Швейцария"},
    "LI": {message: "Лихтенщайн"},
    "GH": {message: "Гана"},
    "KG": {message: "Киргизстан"},
    "NU": {message: "Ниуе"},
    "US": {message: "САЩ"},
    "PE": {message: "Перу"},
    "SL": {message: "Сиера Леоне"},
    "FJ": {message: "Фиджи"},
    "ER": {message: "Еритрея"},
    "IQ": {message: "Ирак"},
    "AS": {message: "Американско Самоа"},
    "TZ": {message: "Танзания"},
    "LY": {message: "Либийска арабска джамахирия"},
    "GT": {message: "Гватемала"},
    "BM": {message: "Бермуда"},
    "BV": {message: "Остров Буве"},
    "LT": {message: "Литва"},
    "SG": {message: "Сингапур"},
    "PM": {message: "Сен Пиер и Мигелон"},
    "Initializing...": {message: "Инициализиране ..."},
    "TT": {message: "Тринидад и Тобаго"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola не работи добре в Windows 8 режим. Моля, преминете към работния плот режим. Кликнете <a> тук </a> за инструкции"},
    "SK": {message: "Словакия"},
    "SY": {message: "Сирийска арабска република"},
    "GL": {message: "Гренландия"},
    "PG": {message: "Папуа Нова Гвинея"},
    "KI": {message: "Кирибати"},
    "CD": {message: "Демократична република Конго"},
    "AO": {message: "Ангола"},
    "BW": {message: "Ботсуана"},
    "ZW": {message: "Зимбабве"},
    "VC": {message: "Сейнт Винсънт и Гренадини"},
    "JP": {message: "Япония"},
    "NA": {message: "Намибия"},
    "TJ": {message: "Таджикистан"},
    "LC": {message: "Сейнт Лусия"},
    "VU": {message: "Вануату"},
    "MN": {message: "Монголия"},
    "Hola site list": {message: "Списък Hola сайт"},
    "IT": {message: "Италия"},
    "RE": {message: "Реюниън"},
    "WS": {message: "Самоа"},
    "Enable": {message: "Активирайте"},
    "Loading": {message: "Товарене"},
    "EG": {message: "Египет"},
    "FR": {message: "Франция"},
    "start": {message: "начало"},
    "RW": {message: "Руанда"},
    "BE": {message: "Белгия"},
    "UM": {message: "САЩ - външни острови"},
    "Accelerator": {message: "Ускорител"},
    "LS": {message: "Лесото"},
    "SA": {message: "Саудитска Арабия"},
    "ZA": {message: "Южна Африка"},
    "PT": {message: "Португалия"},
    "CA": {message: "Канада"},
    "Starting...": {message: "Като се започне ..."},
    "CM": {message: "Камерун"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "Безплатната версия на Hola трябва да бъде активиран отново на всеки 4 часа и се спонсорира от реклами."},
    "Hola": {message: "Hola"},
    "NP": {message: "Непал"},
    "PL": {message: "Полша"},
    "GA": {message: "Габон"},
    "TM": {message: "Туркменистан"},
    "KY": {message: "Кайманови острови"},
    "Verify you have Internet": {message: "Уверете се, че имате интернет"},
    "LA": {message: "Народна демократична република Лаос"},
    "PH": {message: "Филипини"},
    "NI": {message: "Никарагуа"},
    "GU": {message: "Гуам"},
    "TF": {message: "Френски южни територии"},
    "KZ": {message: "Казахстан"},
    "SJ": {message: "Свалбард и Ян Майен"},
    "MM": {message: "Мианмар"},
    "NR": {message: "Науру"},
    "DM": {message: "Доминика"},
    "NE": {message: "Нигер"},
    "AD": {message: "Андора"},
    "MR": {message: "Мавритания"},
    "changing...": {message: "промяна ..."},
    "GS": {message: "Южна Джорджия и Южни Сандвичеви Острови"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Много стара версия на Chrome, <a> Актуална </a> Chrome за използване Hola"},
    "ME": {message: "Черна гора"},
    "AX": {message: "Аландски о-ви"},
    "VN": {message: "Виетнам"},
    "VG": {message: "Британски Вирджински острони"},
    "CI": {message: "Бряг на слоновата кост"},
    "DZ": {message: "Алжир"},
    "YE": {message: "Йемен"},
    "GE": {message: "Грузия"},
    "CX": {message: "Остров Кристмас"},
    "LB": {message: "Ливан"},
    "FK": {message: "Фолклендски острови"},
    "DE": {message: "Германия"},
    "even more...": {message: "още повече ..."},
    "MV": {message: "Малдиви"},
    "PN": {message: "Питкайрн"},
    "BH": {message: "Бахрейн"},
    "GI": {message: "Гибралтар"},
    "RO": {message: "Румъния"},
    "WF": {message: "Уолис и Футуна"},
    "GP": {message: "Гваделупа"},
    "AR": {message: "Аржентина"},
    "IN": {message: "Индия"},
    "AW": {message: "Аруба"},
    "CS": {message: "Сърбия и Черна гора"},
    "FO": {message: "Фарьорски острови"},
    "BR": {message: "Бразилия"},
    "MC": {message: "Монако"},
    "HN": {message: "Хондурас"},
    "Translate to your language": {message: "Преведи на вашия език"},
    "SB": {message: "Соломонови острови"},
    "NZ": {message: "Нова Зеландия"},
    "PS": {message: "Палестински територии"},
    "UG": {message: "Уганда"},
    "GB": {message: "Обединено кралство"},
    "HT": {message: "Хаити"},
    "GF": {message: "Френска Гвиана"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Стара версия на Firefox. Натиснете <a> тук </a> за ъпгрейд."},
    "ZZ": {message: "Непозната или несъществуваща област"},
    "KM": {message: "Комори"},
    "KW": {message: "Кувейт"},
    "MQ": {message: "Мартиника"},
    "TC": {message: "Острови Туркс и Кайкос"},
    "MZ": {message: "Мозамбик"},
    "ES": {message: "Испания"},
    "BO": {message: "Боливия"},
    "AL": {message: "Албания"},
    "MD": {message: "Молдова, Република"},
    "TR": {message: "Турция"},
    "GN": {message: "Гвинея"},
    "CO": {message: "Колумбия"},
    "SI": {message: "Словения"},
    "Settings": {message: "Настройки"},
    "AQ": {message: "Антарктика"},
    "JO": {message: "Йордания"},
    "SM": {message: "Сан Марино"},
    "CU": {message: "Куба"},
    "CL": {message: "Чили"},
    "ML": {message: "Мали"},
    "ET": {message: "Етиопия"},
    "IS": {message: "Исландия"},
    "Reload Hola": {message: "Презареди Hola"},
    "back to": {message: "се върна до"},
    "MH": {message: "Маршалови острови"},
    "BG": {message: "България"},
    "BS": {message: "Бахами"},
    "TL": {message: "Източен Тимор"},
    "BZ": {message: "Белиз"},
    "CY": {message: "Кипър"},
    "IM": {message: "Острови Ман"},
    "IE": {message: "Ирландия"},
    "Get help from engineer over skype:": {message: "Получите помощ от инженер по Skype:"},
    "TW": {message: "Тайван"},
    "KP": {message: "Корея, Северна"},
    "PF": {message: "Френска Полинезия"},
    "app_name": {message: "Hola добро Интернет"},
    "Update": {message: "Обновете"},
    "MW": {message: "Малави"},
    "GY": {message: "Гвиана"},
    "Unblocker is disabled": {message: "Unblocker е забранено"},
    "PK": {message: "Пакистан"},
    "GQ": {message: "Екваториална Гвинея"},
    "Number of users that pressed not working": {message: "Брой на потребителите, че не е натиснат, работещи"},
    "NF": {message: "Остров Норфолк"},
    "TD": {message: "Чад"},
    "SO": {message: "Сомалия"},
    "HM": {message: "Остров Хърд и Острови Макдоналд"},
    "BD": {message: "Бангладеш"},

};
return E; });