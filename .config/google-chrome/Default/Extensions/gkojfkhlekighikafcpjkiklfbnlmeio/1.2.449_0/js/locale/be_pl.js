'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Dżibuti"},
    "JM": {message: "Jamajka"},
    "AT": {message: "Austria"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Potrzebujesz Hola na innych urządzeniach? (Xbox, PS, Apple TV, iPhone...). Kliknij tutaj."},
    "SZ": {message: "Suazi"},
    "YT": {message: "Majotta"},
    "BN": {message: "Brunei Darussalam"},
    "ZM": {message: "Zambia"},
    "app_desc": {message: "Dostęp do CAŁEGO internetu! Przejdź do blokowanej strony -> kliknij ikonkę Hola -> zmien flagę kraju -> ENJOY!"},
    "Improve translation": {message: "ulepsz tłumaczenie"},
    "more...": {message: "więcej..."},
    "PR": {message: "Portoryko"},
    "SH": {message: "Wyspa Świętej Heleny"},
    "There seems to be an error": {message: "Mamy problem"},
    "MA": {message: "Maroko"},
    "SV": {message: "Salwador"},
    "MT": {message: "Malta"},
    "MP": {message: "Mariany Północne"},
    "Unblocker": {message: "odblokować"},
    "Access any site from any country, free": {message: "Dostęp do każdej strony z każdego kraju, za darmo"},
    "Try to <span>reload</span>": {message: "Spróbuj <span>odświeżyć</span>"},
    "UZ": {message: "Uzbekistan"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Liberia"},
    "TN": {message: "Tunezja"},
    "EE": {message: "Estonia"},
    "CK": {message: "Wyspy Cooka"},
    "BY": {message: "Białoruś"},
    "NO": {message: "Norwegia"},
    "KR": {message: "Korea Południowa"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Armenia"},
    "SR": {message: "Surinam"},
    "MG": {message: "Madagaskar"},
    "ON": {message: "ON"},
    "BT": {message: "Bhutan"},
    "CF": {message: "Republika Środkowoafrykańska"},
    "AE": {message: "Zjednoczone Emiraty Arabskie"},
    "BA": {message: "Bośnia i Hercegowina"},
    "TH": {message: "Tajlandia"},
    "Author:": {message: "Autor:"},
    "CC": {message: "Wyspy Kokosowe"},
    "NC": {message: "Nowa Kaledonia"},
    "TO": {message: "Tonga"},
    "SE": {message: "Szwecja"},
    "AZ": {message: "Azerbejdżan"},
    "AF": {message: "Afganistan"},
    "NG": {message: "Nigeria"},
    "KE": {message: "Kenia"},
    "BJ": {message: "Benin"},
    "Turn on to get started": {message: "Uruchom by rozpocząć"},
    "OM": {message: "Oman"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonezja"},
    "FM": {message: "Federalne Stany Mikronezji"},
    "(some Hola features are not available on your version)": {message: "(niektóre funkcje Hola nie są dostępne w twojej wersji)"},
    "GM": {message: "Gambia"},
    "LV": {message: "Łotwa"},
    "RU": {message: "Rosja"},
    "FI": {message: "Finlandia"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Pobierz Hola Plus dla nieprzerwanej usługi bez reklam."},
    "LU": {message: "Luksemburg"},
    "VE": {message: "Wenezuela"},
    "VI": {message: "Wyspy Dziewicze Stanów Zjednoczonych"},
    "TV": {message: "Tuvalu"},
    "SN": {message: "Senegal"},
    "MX": {message: "Meksyk"},
    "GG": {message: "Wyspa Guernsey"},
    "IL": {message: "Izrael"},
    "Author site:": {message: "Autor strony:"},
    "HU": {message: "Węgry"},
    "DO": {message: "Republika Dominikańska"},
    "OFF": {message: "OFF"},
    "KH": {message: "Kambodża"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "ola nie może działać prawidłowo, ponieważ inne rozszerzenie kontroluje twoje ustawienia proxy. Wyłącz proszę inne rozszerzenia, które mogą kontrolować ustawienia proxy <a>rozszerzenia</a> (takie jak ad-blocki lub inne VPNy itp)"},
    "BB": {message: "Barbados"},
    "JE": {message: "Wyspa Jersey"},
    "DK": {message: "Dania"},
    "PA": {message: "Panama"},
    "CV": {message: "Republika Zielonego Przylądka"},
    "QA": {message: "Katar"},
    "Reload": {message: "Przeładuj"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Ilość użytkowników korzystających z tej opcji"},
    "MO": {message: "Makau, Specjalny Region Administracyjny Chin"},
    "MF": {message: "Sint Maarten"},
    "HR": {message: "Chorwacja"},
    "CZ": {message: "Czechy"},
    "BL": {message: "Saint Barthélemy"},
    "ST": {message: "Wyspy Świętego Tomasza i Książęca"},
    "AU": {message: "Australia"},
    "IR": {message: "Iran"},
    "CG": {message: "Kongo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Gwinea Bissau"},
    "MK": {message: "Macedonia"},
    "GR": {message: "Grecja"},
    "AG": {message: "Antigua i Barbuda"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Antyle Holenderskie"},
    "UA": {message: "Ukraina"},
    "EH": {message: "Sahara Zachodnia"},
    "KN": {message: "Saint Kitts i Nevis"},
    "SC": {message: "Seszele"},
    "MS": {message: "Montserrat"},
    "NL": {message: "Holandia"},
    "EC": {message: "Ekwador"},
    "HK": {message: "Hongkong, Specjalny Region Administracyjny Chin"},
    "MY": {message: "Malezja"},
    "CR": {message: "Kostaryka"},
    "VA": {message: "Watykan"},
    "IO": {message: "Terytorium Brytyjskie Oceanu Indyjskiego"},
    "SD": {message: "Sudan"},
    "RS": {message: "Serbia"},
    "CN": {message: "Chiny"},
    "UY": {message: "Urugwaj"},
    "PY": {message: "Paragwaj"},
    "MU": {message: "Mauritius"},
    "CH": {message: "Szwajcaria"},
    "LI": {message: "Liechtenstein"},
    "GH": {message: "Ghana"},
    "KG": {message: "Kirgistan"},
    "NU": {message: "Niue"},
    "US": {message: "Stany Zjednoczone"},
    "PE": {message: "Peru"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fidżi"},
    "ER": {message: "Erytrea"},
    "IQ": {message: "Irak"},
    "AS": {message: "Samoa Amerykańskie"},
    "TZ": {message: "Tanzania"},
    "LY": {message: "Libia"},
    "GT": {message: "Gwatemala"},
    "BM": {message: "Bermudy"},
    "BV": {message: "Wyspa Bouveta"},
    "LT": {message: "Litwa"},
    "SG": {message: "Singapur"},
    "PM": {message: "Saint-Pierre i Miquelon"},
    "Initializing...": {message: "Inicjalizacja..."},
    "TT": {message: "Trynidad i Tobago"},
    "SK": {message: "Słowacja"},
    "SY": {message: "Syria"},
    "GL": {message: "Grenlandia"},
    "PG": {message: "Papua Nowa Gwinea"},
    "KI": {message: "Kiribati"},
    "CD": {message: "Demokratyczna Republika Konga"},
    "AO": {message: "Angola"},
    "BW": {message: "Botswana"},
    "ZW": {message: "Zimbabwe"},
    "VC": {message: "Saint Vincent i Grenadyny"},
    "JP": {message: "Japonia"},
    "NA": {message: "Namibia"},
    "TJ": {message: "Tadżykistan"},
    "LC": {message: "Saint Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongolia"},
    "Hola site list": {message: "Strony które możesz odblokować"},
    "IT": {message: "Włochy"},
    "RE": {message: "Reunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Uruchom"},
    "Loading": {message: "Ładowanie"},
    "EG": {message: "Egipt"},
    "FR": {message: "Francja"},
    "start": {message: "rozpocznij"},
    "RW": {message: "Rwanda"},
    "BE": {message: "Belgia"},
    "UM": {message: "Dalekie Wyspy Mniejsze Stanów Zjednoczonych"},
    "Accelerator": {message: "Akcelerator"},
    "SA": {message: "Arabia Saudyjska"},
    "LS": {message: "Lesotho"},
    "ZA": {message: "Republika Południowej Afryki"},
    "PT": {message: "Portugalia"},
    "CA": {message: "Kanada"},
    "Starting...": {message: "rozpoczynam..."},
    "CM": {message: "Kamerun"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "Darmowa wersja dodatku Hola musi być ponownie uruchamiana co 4 godziny i jest sponsorowana przez reklamy."},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepal"},
    "PL": {message: "Polska"},
    "GA": {message: "Gabon"},
    "TM": {message: "Turkmenistan"},
    "KY": {message: "Kajmany"},
    "Verify you have Internet": {message: "Sprawdź czy masz dostęp do internetu"},
    "LA": {message: "Laos"},
    "PH": {message: "Filipiny"},
    "NI": {message: "Nikaragua"},
    "TF": {message: "Francuskie Terytoria Południowe"},
    "GU": {message: "Guam"},
    "KZ": {message: "Kazachstan"},
    "SJ": {message: "Svalbard i Jan Mayen"},
    "MM": {message: "Birma"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominika"},
    "NE": {message: "Niger"},
    "AD": {message: "Andora"},
    "MR": {message: "Mauretania"},
    "changing...": {message: "uwalniam..."},
    "GS": {message: "Georgia Południowa i Sandwich Południowy"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Bardzo stara wersja Google Chrome, <a>zaktualizuj</a> Chrome by móc używać Hola"},
    "ME": {message: "Czarnogóra"},
    "AX": {message: "Wyspy Alandzkie"},
    "VG": {message: "Brytyjskie Wyspy Dziewicze"},
    "VN": {message: "Wietnam"},
    "DZ": {message: "Algieria"},
    "YE": {message: "Jemen"},
    "CI": {message: "Wybrzeże Kości Słoniowej"},
    "GE": {message: "Gruzja"},
    "CX": {message: "Wyspa Bożego Narodzenia"},
    "LB": {message: "Liban"},
    "FK": {message: "Falklandy"},
    "DE": {message: "Niemcy"},
    "even more...": {message: "jeszcze więcej..."},
    "MV": {message: "Malediwy"},
    "PN": {message: "Pitcairn"},
    "BH": {message: "Bahrajn"},
    "GI": {message: "Gibraltar"},
    "RO": {message: "Rumunia"},
    "WF": {message: "Wallis i Futuna"},
    "AR": {message: "Argentyna"},
    "GP": {message: "Gwadelupa"},
    "IN": {message: "Indie"},
    "AW": {message: "Aruba"},
    "CS": {message: "Serbia i Czarnogóra"},
    "FO": {message: "Wyspy Owcze"},
    "BR": {message: "Brazylia"},
    "HN": {message: "Honduras"},
    "MC": {message: "Monako"},
    "SB": {message: "Wyspy Salomona"},
    "NZ": {message: "Nowa Zelandia"},
    "PS": {message: "Terytoria Palestyńskie"},
    "UG": {message: "Uganda"},
    "GB": {message: "Wielka Brytania"},
    "HT": {message: "Haiti"},
    "GF": {message: "Gujana Francuska"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Stara wersja Firefoxa. Kliknij <a>tutaj</a> by go zaktualizować."},
    "ZZ": {message: "Nieznany lub nieprawidłowy region"},
    "KM": {message: "Komory"},
    "KW": {message: "Kuwejt"},
    "MQ": {message: "Martynika"},
    "TC": {message: "Turks i Caicos"},
    "ES": {message: "Hiszpania"},
    "MZ": {message: "Mozambik"},
    "BO": {message: "Boliwia"},
    "AL": {message: "Albania"},
    "MD": {message: "Mołdawia"},
    "TR": {message: "Turcja"},
    "GN": {message: "Gwinea"},
    "CO": {message: "Kolumbia"},
    "SI": {message: "Słowenia"},
    "Settings": {message: "Ustawienia"},
    "AQ": {message: "Antarktyka"},
    "JO": {message: "Jordania"},
    "SM": {message: "San Marino"},
    "CU": {message: "Kuba"},
    "CL": {message: "Chile"},
    "ML": {message: "Mali"},
    "ET": {message: "Etiopia"},
    "IS": {message: "Islandia"},
    "Reload Hola": {message: "Przeładuj Hola"},
    "back to": {message: "powrót do"},
    "BG": {message: "Bułgaria"},
    "MH": {message: "Wyspy Marshalla"},
    "BS": {message: "Bahamy"},
    "TL": {message: "Timor Wschodni"},
    "BZ": {message: "Belize"},
    "CY": {message: "Cypr"},
    "IM": {message: "Wyspa Man"},
    "IE": {message: "Irlandia"},
    "Get help from engineer over skype:": {message: "Uzyskaj pomoc poprzez od inżyniera Skype:"},
    "TW": {message: "Tajwan"},
    "KP": {message: "Korea Północna"},
    "PF": {message: "Polinezja Francuska"},
    "app_name": {message: "Hola - lepszy internet"},
    "Update": {message: "Aktualizuj"},
    "MW": {message: "Malawi"},
    "GY": {message: "Gujana"},
    "Unblocker is disabled": {message: "Hola jest wyłączony"},
    "PK": {message: "Pakistan"},
    "GQ": {message: "Gwinea Równikowa"},
    "Number of users that pressed not working": {message: "Ilość użytkowników, którzy wybrali \"nie działa\""},
    "NF": {message: "Norfolk"},
    "SO": {message: "Somalia"},
    "TD": {message: "Czad"},
    "HM": {message: "Wyspy Heard i McDonalda"},
    "BD": {message: "Bangladesz"},

};
return E; });