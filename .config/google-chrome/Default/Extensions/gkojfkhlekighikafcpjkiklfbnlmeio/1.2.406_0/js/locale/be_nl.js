'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Djibouti"},
    "JM": {message: "Jamaica"},
    "AT": {message: "Oostenrijk"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Hola ook op andere apparaten? (Xbox, PS, Apple TV, iPhone ...). Klik hier"},
    "SZ": {message: "Swaziland"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunei"},
    "ZM": {message: "Zambia"},
    "app_desc": {message: "Access ALL of the Internet! Go to blocked site -> click Hola icon -> change country flag -> ENJOY!"},
    "Improve translation": {message: "Verbeter vertaling"},
    "more...": {message: "meer..."},
    "PR": {message: "Puerto Rico"},
    "SH": {message: "Sint-Helena"},
    "There seems to be an error": {message: "Er lijkt een fout te zijn"},
    "MA": {message: "Marokko"},
    "MT": {message: "Malta"},
    "SV": {message: "El Salvador"},
    "MP": {message: "Noordelijke Marianeneilanden"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Toegang tot elke site vanuit elk land, gratis"},
    "Try to <span>reload</span>": {message: "Probeer <span>opnieuw te laden</span>"},
    "PW": {message: "Palau"},
    "UZ": {message: "Oezbekistan"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Liberia"},
    "TN": {message: "Tunesië"},
    "EE": {message: "Estland"},
    "CK": {message: "Cookeilanden"},
    "BY": {message: "Wit-Rusland"},
    "KR": {message: "Zuid-Korea"},
    "NO": {message: "Noorwegen"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Armenië"},
    "SR": {message: "Suriname"},
    "MG": {message: "Madagaskar"},
    "ON": {message: "AAN"},
    "BT": {message: "Bhutan"},
    "CF": {message: "Centraal-Afrikaanse Republiek"},
    "AE": {message: "Verenigde Arabische Emiraten"},
    "BA": {message: "Bosnië en Herzegovina"},
    "TH": {message: "Thailand"},
    "Author:": {message: "Author:"},
    "CC": {message: "Cocoseilanden"},
    "NC": {message: "Nieuw-Caledonië"},
    "TO": {message: "Tonga"},
    "SE": {message: "Zweden"},
    "AZ": {message: "Azerbeidzjan"},
    "AF": {message: "Afghanistan"},
    "NG": {message: "Nigeria"},
    "KE": {message: "Kenia"},
    "BJ": {message: "Benin"},
    "Turn on to get started": {message: "Schakel in om aan de slag te gaan"},
    "OM": {message: "Oman"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonesië"},
    "FM": {message: "Micronesië"},
    "(some Hola features are not available on your version)": {message: "(sommige functies van Hola zijn niet beschikbaar in deze versie)"},
    "GM": {message: "Gambia"},
    "LV": {message: "Letland"},
    "RU": {message: "Rusland"},
    "FI": {message: "Finland"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Neem Hola Plus voor een ononderbroken, dienst, zonder advertenties."},
    "LU": {message: "Luxemburg"},
    "VE": {message: "Venezuela"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "Amerikaanse Maagdeneilanden"},
    "SN": {message: "Senegal"},
    "MX": {message: "Mexico"},
    "IL": {message: "Israël"},
    "GG": {message: "Guernsey"},
    "Author site:": {message: "Author site:"},
    "HU": {message: "Hongarije"},
    "DO": {message: "Dominicaanse Republiek"},
    "OFF": {message: "UIT"},
    "KH": {message: "Cambodja"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "ola kan niet correct werken, omdat een andere extensie je proxyinstellingen beheert. Schakel de andere extentie die waarschijnlijk je proxyinstellingen beheert uit in <a>Extensies</a> (bijvoorbeeld ad-blockers, andere VPN-services, etc.)."},
    "BB": {message: "Barbados"},
    "JE": {message: "Jersey"},
    "DK": {message: "Denemarken"},
    "PA": {message: "Panama"},
    "QA": {message: "Qatar"},
    "CV": {message: "Kaapverdië"},
    "Reload": {message: "Vernieuwen"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Number of users that use this option"},
    "MO": {message: "Macao SAR van China"},
    "MF": {message: "Sint-Maarten"},
    "HR": {message: "Kroatië"},
    "CZ": {message: "Tsjechië"},
    "BL": {message: "Saint Barthélemy"},
    "ST": {message: "Sao Tomé en Principe"},
    "AU": {message: "Australië"},
    "IR": {message: "Iran"},
    "CG": {message: "Congo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Guinee-Bissau"},
    "MK": {message: "Macedonië"},
    "GR": {message: "Griekenland"},
    "AG": {message: "Antigua en Barbuda"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Nederlandse Antillen"},
    "UA": {message: "Oekraïne"},
    "EH": {message: "Westelijke Sahara"},
    "KN": {message: "Saint Kitts en Nevis"},
    "SC": {message: "Seychellen"},
    "NL": {message: "Nederland"},
    "MS": {message: "Montserrat"},
    "EC": {message: "Ecuador"},
    "HK": {message: "Hongkong SAR van China"},
    "MY": {message: "Maleisië"},
    "CR": {message: "Costa Rica"},
    "VA": {message: "Vaticaanstad"},
    "IO": {message: "Britse Gebieden in de Indische Oceaan"},
    "SD": {message: "Soedan"},
    "RS": {message: "Servië"},
    "CN": {message: "China"},
    "UY": {message: "Uruguay"},
    "PY": {message: "Paraguay"},
    "MU": {message: "Mauritius"},
    "CH": {message: "Zwitserland"},
    "LI": {message: "Liechtenstein"},
    "GH": {message: "Ghana"},
    "KG": {message: "Kirgizië"},
    "NU": {message: "Niue"},
    "US": {message: "Verenigde Staten"},
    "PE": {message: "Peru"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fiji"},
    "ER": {message: "Eritrea"},
    "IQ": {message: "Irak"},
    "AS": {message: "Amerikaans Samoa"},
    "TZ": {message: "Tanzania"},
    "LY": {message: "Libië"},
    "GT": {message: "Guatemala"},
    "BM": {message: "Bermuda"},
    "BV": {message: "Bouveteiland"},
    "LT": {message: "Litouwen"},
    "SG": {message: "Singapore"},
    "PM": {message: "Saint Pierre en Miquelon"},
    "Initializing...": {message: "Inschakelen..."},
    "TT": {message: "Trinidad en Tobago"},
    "SY": {message: "Syrië"},
    "SK": {message: "Slowakije"},
    "GL": {message: "Groenland"},
    "PG": {message: "Papoea-Nieuw-Guinea"},
    "KI": {message: "Kiribati"},
    "CD": {message: "Congo-Kinshasa"},
    "AO": {message: "Angola"},
    "BW": {message: "Botswana"},
    "ZW": {message: "Zimbabwe"},
    "VC": {message: "Saint Vincent en de Grenadines"},
    "JP": {message: "Japan"},
    "NA": {message: "Namibië"},
    "TJ": {message: "Tadzjikistan"},
    "LC": {message: "Saint Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongolië"},
    "Hola site list": {message: "Hola sitelijst"},
    "IT": {message: "Italië"},
    "RE": {message: "Réunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Inschakelen"},
    "Loading": {message: "Aan het laden"},
    "EG": {message: "Egypte"},
    "FR": {message: "Frankrijk"},
    "start": {message: "start"},
    "RW": {message: "Rwanda"},
    "BE": {message: "België"},
    "UM": {message: "Amerikaanse kleinere afgelegen eilanden"},
    "Accelerator": {message: "Versneller"},
    "LS": {message: "Lesotho"},
    "SA": {message: "Saoedi-Arabië"},
    "ZA": {message: "Zuid-Afrika"},
    "PT": {message: "Portugal"},
    "CA": {message: "Canada"},
    "Starting...": {message: "Opstarten..."},
    "CM": {message: "Kameroen"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "De gratis versie van Hola moet om de 4 uur opnieuw worden ingeschakeld en wordt gesponsord door advertenties."},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepal"},
    "PL": {message: "Polen"},
    "GA": {message: "Gabon"},
    "TM": {message: "Turkmenistan"},
    "KY": {message: "Caymaneilanden"},
    "Verify you have Internet": {message: "Controleer je internetverbinding"},
    "LA": {message: "Laos"},
    "PH": {message: "Filipijnen"},
    "NI": {message: "Nicaragua"},
    "TF": {message: "Franse Gebieden in de zuidelijke Indische Oceaan"},
    "GU": {message: "Guam"},
    "KZ": {message: "Kazachstan"},
    "SJ": {message: "Svalbard en Jan Mayen"},
    "MM": {message: "Myanmar"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominica"},
    "NE": {message: "Niger"},
    "AD": {message: "Andorra"},
    "MR": {message: "Mauritanië"},
    "changing...": {message: "veranderen..."},
    "GS": {message: "Zuid-Georgië en Zuidelijke Sandwicheilanden"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Zeer oude versie van Chrome, <a>update</a> Chrome om Hola te gebruiken"},
    "ME": {message: "Montenegro"},
    "AX": {message: "Alandeilanden"},
    "VG": {message: "Britse Maagdeneilanden"},
    "VN": {message: "Vietnam"},
    "DZ": {message: "Algerije"},
    "CI": {message: "Ivoorkust"},
    "YE": {message: "Jemen"},
    "GE": {message: "Georgië"},
    "CX": {message: "Christmaseiland"},
    "LB": {message: "Libanon"},
    "FK": {message: "Falklandeilanden"},
    "DE": {message: "Duitsland"},
    "even more...": {message: "meer..."},
    "MV": {message: "Maldiven"},
    "PN": {message: "Pitcairn"},
    "BH": {message: "Bahrein"},
    "GI": {message: "Gibraltar"},
    "RO": {message: "Roemenië"},
    "WF": {message: "Wallis en Futuna"},
    "AR": {message: "Argentinië"},
    "GP": {message: "Guadeloupe"},
    "IN": {message: "India"},
    "AW": {message: "Aruba"},
    "FO": {message: "Faeröer"},
    "CS": {message: "Servië en Montenegro"},
    "BR": {message: "Brazilië"},
    "HN": {message: "Honduras"},
    "MC": {message: "Monaco"},
    "Translate to your language": {message: "Vertaal naar jouw taal"},
    "SB": {message: "Salomonseilanden"},
    "NZ": {message: "Nieuw-Zeeland"},
    "PS": {message: "Palestijns Gebied"},
    "UG": {message: "Oeganda"},
    "GB": {message: "Verenigd Koninkrijk"},
    "HT": {message: "Haïti"},
    "GF": {message: "Frans-Guyana"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Oude versie van Firefox. Klik <a>hier</a> om te upgraden."},
    "ZZ": {message: "Onbekend of onjuist gebied"},
    "KM": {message: "Comoren"},
    "KW": {message: "Koeweit"},
    "MQ": {message: "Martinique"},
    "TC": {message: "Turks- en Caicoseilanden"},
    "MZ": {message: "Mozambique"},
    "ES": {message: "Spanje"},
    "BO": {message: "Bolivia"},
    "AL": {message: "Albanië"},
    "MD": {message: "Moldavië"},
    "TR": {message: "Turkije"},
    "GN": {message: "Guinee"},
    "CO": {message: "Colombia"},
    "SI": {message: "Slovenië"},
    "Settings": {message: "Instellingen"},
    "AQ": {message: "Antarctica"},
    "JO": {message: "Jordanië"},
    "SM": {message: "San Marino"},
    "CU": {message: "Cuba"},
    "CL": {message: "Chili"},
    "ML": {message: "Mali"},
    "ET": {message: "Ethiopië"},
    "IS": {message: "IJsland"},
    "Reload Hola": {message: "Start Hola opnieuw"},
    "back to": {message: "terug naar"},
    "BG": {message: "Bulgarije"},
    "MH": {message: "Marshalleilanden"},
    "BS": {message: "Bahama’s"},
    "TL": {message: "Oost-Timor"},
    "BZ": {message: "Belize"},
    "CY": {message: "Cyprus"},
    "IM": {message: "Isle of Man"},
    "IE": {message: "Ierland"},
    "Get help from engineer over skype:": {message: "Krijg hulp van een expert via Skype:"},
    "TW": {message: "Taiwan"},
    "KP": {message: "Noord-Korea"},
    "PF": {message: "Frans-Polynesië"},
    "app_name": {message: "Hola beter internet"},
    "Update": {message: "Bijwerken"},
    "MW": {message: "Malawi"},
    "GY": {message: "Guyana"},
    "Unblocker is disabled": {message: "Unblocker is uitgeschakeld"},
    "PK": {message: "Pakistan"},
    "GQ": {message: "Equatoriaal-Guinea"},
    "Number of users that pressed not working": {message: "Number of users that pressed \"not working\""},
    "NF": {message: "Norfolkeiland"},
    "TD": {message: "Tsjaad"},
    "SO": {message: "Somalië"},
    "BD": {message: "Bangladesh"},
    "HM": {message: "Heard- en McDonaldeilanden"},

};
return E; });