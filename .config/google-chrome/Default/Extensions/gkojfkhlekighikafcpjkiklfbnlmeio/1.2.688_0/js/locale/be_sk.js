'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Džibuti"},
    "JM": {message: "Jamajka"},
    "AT": {message: "Rakúsko"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Chcete Hola na iných zariadeniach? (Xbox, PS, Apple TV, iPhone, ...). Kliknite tu"},
    "SZ": {message: "Svazijsko"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunej"},
    "ZM": {message: "Zambia"},
    "app_desc": {message: "Prístup ku všetkým internete! Prejsť na blokované stránky -> kliknite na ikonu Hola -> zmena krajiny vlajka -> Užite si to!"},
    "Improve translation": {message: "Zlepšiť preklad"},
    "more...": {message: "viac ..."},
    "PR": {message: "Portoriko"},
    "SH": {message: "Svätá Helena"},
    "There seems to be an error": {message: "Zdá sa, že došlo k chybe"},
    "MA": {message: "Maroko"},
    "SV": {message: "Salvador"},
    "MT": {message: "Malta"},
    "MP": {message: "Severné Mariány"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Prístup k akejkoľvek stránky z akejkoľvek krajiny, bez"},
    "Try to <span>reload</span>": {message: "Skúste <span> znova načítať </span>"},
    "UZ": {message: "Uzbekistan"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Libéria"},
    "TN": {message: "Tunisko"},
    "EE": {message: "Estónsko"},
    "CK": {message: "Cookove ostrovy"},
    "BY": {message: "Bielorusko"},
    "NO": {message: "Nórsko"},
    "KR": {message: "Kórejská republika"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Arménsko"},
    "SR": {message: "Surinam"},
    "MG": {message: "Madagaskar"},
    "ON": {message: "ON"},
    "BT": {message: "Bután"},
    "CF": {message: "Stredoafrická republika"},
    "AE": {message: "Spojené arabské emiráty"},
    "BA": {message: "Bosna a Hercegovina"},
    "TH": {message: "Thajsko"},
    "Author:": {message: "Autor:"},
    "CC": {message: "Kokosové ostrovy"},
    "NC": {message: "Nová Kaledónia"},
    "TO": {message: "Tonga"},
    "SE": {message: "Švédsko"},
    "AZ": {message: "Azerbajdžan"},
    "AF": {message: "Afganistan"},
    "NG": {message: "Nigéria"},
    "KE": {message: "Keňa"},
    "BJ": {message: "Benin"},
    "Turn on to get started": {message: "Zapnite začať"},
    "OM": {message: "Omán"},
    "LK": {message: "Srí Lanka"},
    "ID": {message: "Indonézia"},
    "FM": {message: "Mikronézia"},
    "(some Hola features are not available on your version)": {message: "(Niektoré Hola funkcie nie sú dostupné vo vašej verzii)"},
    "GM": {message: "Gambia"},
    "LV": {message: "Lotyšsko"},
    "RU": {message: "Ruská federácia"},
    "FI": {message: "Fínsko"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Získajte Hola Plus pre neprerušené, ad-bezplatnú službu."},
    "LU": {message: "Luxembursko"},
    "VE": {message: "Venezuela"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "Panenské ostrovy - USA"},
    "SN": {message: "Senegal"},
    "MX": {message: "Mexiko"},
    "IL": {message: "Izrael"},
    "GG": {message: "Guernsey"},
    "Author site:": {message: "Autor stránky:"},
    "HU": {message: "Maďarsko"},
    "DO": {message: "Dominikánska republika"},
    "OFF": {message: "OFF"},
    "KH": {message: "Kambodža"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola nemôže správne fungovať, pretože iná prípona je ovládanie nastavenia servera proxy. Prosím, zakázať ďalšie rozšírenie, ktoré si myslíte, že by mohli ovládať nastavenia proxy <a> rozšírenia </a> (ako ad-blokátory, ďalších VPN služby, atď)."},
    "BB": {message: "Barbados"},
    "JE": {message: "Jersey"},
    "DK": {message: "Dánsko"},
    "PA": {message: "Panama"},
    "CV": {message: "Kapverdy"},
    "QA": {message: "Katar"},
    "Reload": {message: "Aktualizuj"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Počet užívateľov, ktorí používajú túto možnosť"},
    "MO": {message: "Makao S.A.R. Číny"},
    "MF": {message: "Svätý Martin"},
    "HR": {message: "Chorvátsko"},
    "CZ": {message: "Česká republika"},
    "BL": {message: "Svätý Bartolomej"},
    "ST": {message: "Svätý Tomáš a Princove ostrovy"},
    "AU": {message: "Austrália"},
    "IR": {message: "Irán"},
    "CG": {message: "Kongo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Guinea-Bissau"},
    "MK": {message: "Macedónsko"},
    "GR": {message: "Grécko"},
    "AG": {message: "Antigua a Barbados"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Holandské Antily"},
    "UA": {message: "Ukrajina"},
    "EH": {message: "Západná Sahara"},
    "KN": {message: "Saint Kitts a Nevis"},
    "SC": {message: "Seychelské ostrovy"},
    "MS": {message: "Montserrat"},
    "NL": {message: "Holandsko"},
    "EC": {message: "Ekvádor"},
    "HK": {message: "Hong Kong S.A.R. Číny"},
    "MY": {message: "Malajzia"},
    "CR": {message: "Kostarika"},
    "VA": {message: "Vatikán"},
    "IO": {message: "Britské územie v Indickom oceáne"},
    "SD": {message: "Sudán"},
    "RS": {message: "Srbsko"},
    "CN": {message: "Čína"},
    "UY": {message: "Uruguaj"},
    "PY": {message: "Paraguaj"},
    "MU": {message: "Maurícius"},
    "CH": {message: "Švajčiarsko"},
    "LI": {message: "Lichtenštajnsko"},
    "GH": {message: "Ghana"},
    "KG": {message: "Kirgizsko"},
    "NU": {message: "Niue"},
    "US": {message: "Spojené štáty"},
    "PE": {message: "Peru"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fidži"},
    "ER": {message: "Eritrea"},
    "IQ": {message: "Irak"},
    "AS": {message: "Americká Samoa"},
    "TZ": {message: "Tanzánia"},
    "LY": {message: "Lýbijská arabská džamahírija"},
    "GT": {message: "Guatemala"},
    "BM": {message: "Bermudy"},
    "BV": {message: "Bouvetov ostrov"},
    "LT": {message: "Litva"},
    "SG": {message: "Singapur"},
    "PM": {message: "Saint Pierre a Miquelon"},
    "Initializing...": {message: "Inicializácia ..."},
    "TT": {message: "Trinidad a Tobago"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola nebude dobre fungovať v systéme Windows 8. režime. Prepnite prosím na stolnom režime. Kliknite <a> tu </a> pre inštrukcie"},
    "SY": {message: "Sýrska arabská republika"},
    "SK": {message: "Slovenská republika"},
    "GL": {message: "Grónsko"},
    "PG": {message: "Papua Nová Guinea"},
    "KI": {message: "Kiribati"},
    "CD": {message: "Konžská demokratická republika"},
    "AO": {message: "Angola"},
    "BW": {message: "Botswana"},
    "ZW": {message: "Zimbabwe"},
    "VC": {message: "Svätý Vincent a Grenadíny"},
    "JP": {message: "Japonsko"},
    "NA": {message: "Namíbia"},
    "TJ": {message: "Tadžikistan"},
    "LC": {message: "Svätá Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongolsko"},
    "Hola site list": {message: "Hola stránky Zoznam"},
    "IT": {message: "Taliansko"},
    "RE": {message: "Reunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Umožniť"},
    "Loading": {message: "Nakladanie"},
    "EG": {message: "Egypt"},
    "FR": {message: "Francúzsko"},
    "start": {message: "začiatok"},
    "RW": {message: "Rwanda"},
    "BE": {message: "Belgicko"},
    "UM": {message: "Menšie odľahlé ostrovy USA"},
    "Accelerator": {message: "Urýchľovač"},
    "LS": {message: "Lesotho"},
    "SA": {message: "Saudská Arábia"},
    "ZA": {message: "Južná Afrika"},
    "PT": {message: "Portugalsko"},
    "CA": {message: "Kanada"},
    "Starting...": {message: "Od ..."},
    "CM": {message: "Kamerun"},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepál"},
    "PL": {message: "Poľsko"},
    "GA": {message: "Gabon"},
    "TM": {message: "Turkménsko"},
    "KY": {message: "Kajmanské ostrovy"},
    "LA": {message: "Laoská ľudovodemokratická republika"},
    "PH": {message: "Filipíny"},
    "NI": {message: "Nikaragua"},
    "TF": {message: "Francúzske južné územia"},
    "GU": {message: "Guam"},
    "KZ": {message: "Kazachstan"},
    "SJ": {message: "Špicbergy a Jan Mayen"},
    "MM": {message: "Mjanmarsko"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominika"},
    "NE": {message: "Niger"},
    "AD": {message: "Andorra"},
    "MR": {message: "Mauritánia"},
    "changing...": {message: "mení ..."},
    "GS": {message: "Južná Georgia a Južné Sandwichove ostrovy"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Veľmi stará verzia Chrome, <a> update </a> Chrome používať Hola"},
    "ME": {message: "Čierna Hora"},
    "AX": {message: "Alandské ostrovy"},
    "VG": {message: "Britské panenské ostrovy"},
    "VN": {message: "Vietnam"},
    "DZ": {message: "Alžírsko"},
    "YE": {message: "Jemen"},
    "CI": {message: "Pobrežie Slonoviny"},
    "GE": {message: "Gruzínsko"},
    "CX": {message: "Vianočný ostrov"},
    "LB": {message: "Libanon"},
    "FK": {message: "Falklandské ostrovy"},
    "DE": {message: "Nemecko"},
    "even more...": {message: "ešte viac ..."},
    "MV": {message: "Maldivy"},
    "PN": {message: "Pitcairnove ostrovy"},
    "BH": {message: "Bahrajn"},
    "GI": {message: "Gibraltár"},
    "RO": {message: "Rumunsko"},
    "WF": {message: "Wallis a Futuna"},
    "AR": {message: "Argentína"},
    "GP": {message: "Guadeloupe"},
    "IN": {message: "India"},
    "FO": {message: "Faerské ostrovy"},
    "AW": {message: "Aruba"},
    "CS": {message: "Srbsko a Čierna Hora"},
    "BR": {message: "Brazília"},
    "HN": {message: "Honduras"},
    "MC": {message: "Monako"},
    "Translate to your language": {message: "Preložiť do svojho jazyka"},
    "SB": {message: "Šalamúnove ostrovy"},
    "NZ": {message: "Nový Zéland"},
    "PS": {message: "Palestínske územie"},
    "UG": {message: "Uganda"},
    "GB": {message: "Spojené kráľovstvo"},
    "HT": {message: "Haiti"},
    "GF": {message: "Francúzska Guayana"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Stará verzia Firefoxu. Stlačte <a> tu </a> upgrade."},
    "ZZ": {message: "Neznámy alebo neplatný región"},
    "KM": {message: "Komory"},
    "KW": {message: "Kuvajt"},
    "MQ": {message: "Martinik"},
    "TC": {message: "Turks a Caicos"},
    "MZ": {message: "Mozambik"},
    "ES": {message: "Španielsko"},
    "BO": {message: "Bolívia"},
    "AL": {message: "Albánsko"},
    "MD": {message: "Moldavsko"},
    "TR": {message: "Turecko"},
    "GN": {message: "Guinea"},
    "CO": {message: "Kolumbia"},
    "SI": {message: "Slovinsko"},
    "Settings": {message: "Nastavenie"},
    "AQ": {message: "Antarctica"},
    "JO": {message: "Jordánsko"},
    "SM": {message: "San Maríno"},
    "CU": {message: "Kuba"},
    "CL": {message: "Čile"},
    "ML": {message: "Mali"},
    "ET": {message: "Etiópia"},
    "IS": {message: "Island"},
    "Reload Hola": {message: "Obnoviť Hola"},
    "back to": {message: "späť na"},
    "MH": {message: "Marshallove ostrovy"},
    "BG": {message: "Bulharsko"},
    "BS": {message: "Bahamy"},
    "TL": {message: "Východný Timor"},
    "BZ": {message: "Belize"},
    "CY": {message: "Cyprus"},
    "IM": {message: "Ostrov Man"},
    "IE": {message: "Írsko"},
    "Get help from engineer over skype:": {message: "Získajte pomoc od inžiniera cez skype:"},
    "TW": {message: "Tajwan"},
    "KP": {message: "Kórejská ľudovodemokratická republika"},
    "PF": {message: "Francúzska Polynézia"},
    "app_name": {message: "Hola Lepšie Internet"},
    "Update": {message: "Aktualizovať"},
    "MW": {message: "Malawi"},
    "GY": {message: "Guayana"},
    "Unblocker is disabled": {message: "Unblocker je zakázaný"},
    "GQ": {message: "Rovníková Guinea"},
    "PK": {message: "Pakistan"},
    "Number of users that pressed not working": {message: "Počet užívateľov, ktorí stisku nefunguje"},
    "NF": {message: "Norfolkov ostrov"},
    "TD": {message: "Čad"},
    "SO": {message: "Somálsko"},
    "BD": {message: "Bangladéš"},
    "HM": {message: "Heardove ostrovy a McDonaldove ostrovy"},

};
return E; });