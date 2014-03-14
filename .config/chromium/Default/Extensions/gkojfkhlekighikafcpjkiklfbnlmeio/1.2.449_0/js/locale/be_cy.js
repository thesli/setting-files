'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Djibouti"},
    "JM": {message: "Jamaica"},
    "AT": {message: "Awstria"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Eisiau Hola ar ddyfeisiau eraill? (Xbox, PS, Apple TV, iPhone ...). Cliciwch yma"},
    "SZ": {message: "Swaziland"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunei"},
    "ZM": {message: "Sambia"},
    "app_desc": {message: "Mynediad HOLL ar y Rhyngrwyd! Ewch i wefan blocio -> cliciwch Hola icon -> Newid baner gwlad -> MWYNHEWCH!"},
    "Improve translation": {message: "Gwella cyfieithu"},
    "more...": {message: "mwy ..."},
    "PR": {message: "Puerto Rico"},
    "SH": {message: "Saint Helena"},
    "There seems to be an error": {message: "Mae'n ymddangos i fod yn gamgymeriad"},
    "MA": {message: "Moroco"},
    "MT": {message: "Malta"},
    "SV": {message: "El Salfador"},
    "MP": {message: "Ynysoedd Gogledd Mariana"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Mynediad unrhyw safle o unrhyw wlad, rhad ac am ddim"},
    "Try to <span>reload</span>": {message: "Ceisiwch <span> ail-lwytho </span>"},
    "UZ": {message: "Wsbecistan"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Liberia"},
    "TN": {message: "Tiwnisia"},
    "EE": {message: "Estonia"},
    "CK": {message: "Ynysoedd Cook"},
    "BY": {message: "Belarws"},
    "NO": {message: "Norwy"},
    "KR": {message: "De Corea"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Armenia"},
    "SR": {message: "Swrinam"},
    "MG": {message: "Madagascar"},
    "ON": {message: "AR"},
    "BT": {message: "Bhwtan"},
    "CF": {message: "Gweriniaeth Canol Affrica"},
    "AE": {message: "Emiraethau Arabaidd Unedig"},
    "BA": {message: "Bosnia a Herzegovina"},
    "TH": {message: "Gwlad Thai"},
    "Author:": {message: "Awdur:"},
    "CC": {message: "Ynysoedd Cocos (Keeling)"},
    "NC": {message: "Caledonia Newydd"},
    "TO": {message: "Tonga"},
    "SE": {message: "Sweden"},
    "AZ": {message: "Azerbaijan"},
    "AF": {message: "Affganistan"},
    "NG": {message: "Nigeria"},
    "BJ": {message: "Benin"},
    "KE": {message: "Cenia"},
    "Turn on to get started": {message: "Trowch ymlaen i ddechrau arni"},
    "OM": {message: "Oman"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonesia"},
    "FM": {message: "Micronesia"},
    "(some Hola features are not available on your version)": {message: "(Nid yw rhai nodweddion Hola ar gael ar eich fersiwn)"},
    "GM": {message: "Gambia"},
    "LV": {message: "Latfia"},
    "RU": {message: "Rwsia"},
    "FI": {message: "Y Ffindir"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Cael Hola a Mwy ar gyfer heb dor wasanaeth, rhad ac am ddim-ad."},
    "LU": {message: "Lwcsembwrg"},
    "VE": {message: "Venezuela"},
    "VI": {message: "Ynysoedd Americanaidd y Wyryf"},
    "TV": {message: "Twfalw"},
    "SN": {message: "Senegal"},
    "MX": {message: "Mecsico"},
    "IL": {message: "Israel"},
    "Author site:": {message: "Awdur site:"},
    "DO": {message: "Y Weriniaeth Ddominicaidd"},
    "HU": {message: "Hwngari"},
    "OFF": {message: "OFF"},
    "KH": {message: "Cambodia"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Ni all hola weithio'n iawn oherwydd estyniad arall yn rheoli eich gosodiadau dirprwy. Os gwelwch yn dda analluoga estyniadau eraill yr ydych yn meddwl y gallai reoli eich gosodiadau dirprwy yn <a> estyniadau </a> (fel ad-atalyddion, gwasanaethau VPN eraill, ac ati)."},
    "BB": {message: "Barbados"},
    "DK": {message: "Denmarc"},
    "PA": {message: "Panama"},
    "QA": {message: "Qatar"},
    "CV": {message: "Cape Verde"},
    "Reload": {message: "Ail-lwytho"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Nifer y defnyddwyr sy'n defnyddio'r opsiwn hwn"},
    "MO": {message: "Macao S.A.R., Tseina"},
    "HR": {message: "Croatia"},
    "CZ": {message: "Gweriniaeth Tsiec"},
    "ST": {message: "Sao Tome a Principe"},
    "AU": {message: "Awstralia"},
    "IR": {message: "Iran"},
    "CG": {message: "Congo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Guinea-Bissau"},
    "MK": {message: "Macedonia"},
    "GR": {message: "Gwlad Groeg"},
    "AG": {message: "Antigwa a Barbuda"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Ynysoedd Caribî yr Iseldiroedd"},
    "UA": {message: "Wcráin"},
    "EH": {message: "Gorllewin Sahara"},
    "KN": {message: "Saint Kitts a Nevis"},
    "SC": {message: "Seychelles"},
    "NL": {message: "Yr Iseldiroedd"},
    "MS": {message: "Montserrat"},
    "EC": {message: "Ecwador"},
    "HK": {message: "Hong Kong S.A.R., Tseina"},
    "MY": {message: "Malaysia"},
    "CR": {message: "Costa Rica"},
    "VA": {message: "Y Fatican"},
    "IO": {message: "Tiriogaeth Cefnfor India Prydain"},
    "SD": {message: "Y Swdan"},
    "CN": {message: "Tseina"},
    "UY": {message: "Uruguay"},
    "PY": {message: "Paraguay"},
    "MU": {message: "Mawrisiws"},
    "CH": {message: "Y Swistir"},
    "LI": {message: "Liechtenstein"},
    "GH": {message: "Ghana"},
    "KG": {message: "Cirgistan"},
    "NU": {message: "Niue"},
    "US": {message: "Yr Unol Daleithiau"},
    "PE": {message: "Perw"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fiji"},
    "ER": {message: "Eritrea"},
    "IQ": {message: "Irac"},
    "AS": {message: "Samoa Americanaidd"},
    "TZ": {message: "Tansanïa"},
    "LY": {message: "Libia"},
    "GT": {message: "Guatemala"},
    "BM": {message: "Bermwda"},
    "BV": {message: "Ynys Bouvet"},
    "LT": {message: "Lithwania"},
    "SG": {message: "Singapore"},
    "PM": {message: "Saint Pierre a Miquelon"},
    "Initializing...": {message: "Ymgychwyn ..."},
    "TT": {message: "Trinidad a Thobago"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Nid Hola yn gweithio'n dda mewn Ffenestri 8 modd. Os gwelwch yn dda newid i ddull bwrdd gwaith. Cliciwch <a> yma </a> am gyfarwyddiadau"},
    "SY": {message: "Syria"},
    "SK": {message: "Slofacia"},
    "GL": {message: "Yr Ynys Las"},
    "PG": {message: "Papua Gini Newydd"},
    "KI": {message: "Kiribati"},
    "CD": {message: "Gweriniaeth Ddemocrataidd y Congo"},
    "AO": {message: "Angola"},
    "BW": {message: "Botswana"},
    "ZW": {message: "Simbabwe"},
    "VC": {message: "Saint Vincent a’r Grenadines"},
    "JP": {message: "Siapan"},
    "NA": {message: "Namibia"},
    "TJ": {message: "Tajicistan"},
    "LC": {message: "Saint Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongolia"},
    "Hola site list": {message: "Restr y safle Unblocker"},
    "IT": {message: "Yr Eidal"},
    "RE": {message: "Réunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Galluogi"},
    "Loading": {message: "Llwytho"},
    "FR": {message: "Ffrainc"},
    "EG": {message: "Yr Aifft"},
    "start": {message: "dechrau"},
    "RW": {message: "Rwanda"},
    "BE": {message: "Gwlad Belg"},
    "UM": {message: "Mân Ynysoedd Pellenig yr Unol Daleithiau"},
    "Accelerator": {message: "Cyflymydd"},
    "LS": {message: "Lesotho"},
    "SA": {message: "Sawdi-Arabia"},
    "ZA": {message: "De Affrica"},
    "PT": {message: "Portiwgal"},
    "CA": {message: "Canada"},
    "Starting...": {message: "Dechrau ..."},
    "CM": {message: "Y Camerŵn"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "Mae angen ail-alluogi bob 4 awr ac fe'i noddir gan hysbysebion Mae'r fersiwn rhad ac am Hola."},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepal"},
    "PL": {message: "Gwlad Pwyl"},
    "GA": {message: "Gabon"},
    "TM": {message: "Tyrcmenistan"},
    "KY": {message: "Ynysoedd Cayman"},
    "Verify you have Internet": {message: "Gwirio bod gennych Rhyngrwyd"},
    "LA": {message: "Laos"},
    "PH": {message: "Philipinau"},
    "NI": {message: "Nicaragwa"},
    "GU": {message: "Guam"},
    "TF": {message: "Tiriogaethau Ffrengig y De"},
    "KZ": {message: "Kazakhstan"},
    "SJ": {message: "Svalbard a Jan Mayen"},
    "MM": {message: "Myanmar"},
    "NR": {message: "Nawrw"},
    "DM": {message: "Dominica"},
    "NE": {message: "Niger"},
    "AD": {message: "Andorra"},
    "MR": {message: "Mawritania"},
    "changing...": {message: "newid ..."},
    "GS": {message: "Ynysoedd De Georgia a De Sandwich"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Hen iawn fersiwn o Chrome, <a> diweddaraf </a> Chrome i ddefnyddio Hola"},
    "AX": {message: "Ynysoedd Aland"},
    "VN": {message: "Fietnam"},
    "VG": {message: "Ynysoedd Prydeinig y Wyryf"},
    "CI": {message: "Côte d’Ivoire"},
    "DZ": {message: "Algeria"},
    "YE": {message: "Yemen"},
    "GE": {message: "Georgia"},
    "CX": {message: "Ynys y Nadolig"},
    "LB": {message: "Libanus"},
    "FK": {message: "Ynysoedd y Falkland"},
    "DE": {message: "Yr Almaen"},
    "even more...": {message: "hyd yn oed mwy ..."},
    "MV": {message: "Maldives"},
    "PN": {message: "Pitcairn"},
    "BH": {message: "Bahrain"},
    "GI": {message: "Gibraltar"},
    "RO": {message: "Rwmania"},
    "WF": {message: "Wallis a Futuna"},
    "GP": {message: "Guadeloupe"},
    "IN": {message: "India"},
    "AR": {message: "Yr Ariannin"},
    "AW": {message: "Aruba"},
    "FO": {message: "Ynysoedd Ffaröe"},
    "BR": {message: "Brasil"},
    "HN": {message: "Hondwras"},
    "MC": {message: "Monaco"},
    "Translate to your language": {message: "Cyfieithu i eich iaith"},
    "SB": {message: "Ynysoedd Solomon"},
    "NZ": {message: "Seland Newydd"},
    "PS": {message: "Tiriogaeth Palesteina"},
    "UG": {message: "Uganda"},
    "GB": {message: "Prydain Fawr"},
    "HT": {message: "Haiti"},
    "GF": {message: "Giana Ffrengig"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Hen fersiwn o Firefox. Press <a> yma </a> i uwchraddio."},
    "KM": {message: "Comoros"},
    "KW": {message: "Coweit"},
    "MQ": {message: "Martinique"},
    "TC": {message: "Ynysoedd Turks a Caicos"},
    "MZ": {message: "Mozambique"},
    "ES": {message: "Sbaen"},
    "BO": {message: "Bolifia"},
    "AL": {message: "Albania"},
    "MD": {message: "Moldofa"},
    "TR": {message: "Twrci"},
    "GN": {message: "Gini"},
    "CO": {message: "Colombia"},
    "SI": {message: "Slofenia"},
    "Settings": {message: "Gosodiadau"},
    "AQ": {message: "Antarctica"},
    "JO": {message: "Yr Iorddonen"},
    "SM": {message: "San Marino"},
    "CU": {message: "Ciwba"},
    "CL": {message: "Chile"},
    "ML": {message: "Mali"},
    "ET": {message: "Ethiopia"},
    "IS": {message: "Gwlad yr Iâ"},
    "Reload Hola": {message: "Ail-lwytho Hola"},
    "back to": {message: "yn ôl i"},
    "BG": {message: "Bwlgaria"},
    "MH": {message: "Ynysoedd Marshall"},
    "BS": {message: "Y Bahamas"},
    "TL": {message: "Timor-Leste"},
    "BZ": {message: "Belize"},
    "CY": {message: "Cyprus"},
    "IM": {message: "Ynys Manaw"},
    "IE": {message: "Iwerddon"},
    "Get help from engineer over skype:": {message: "Cael help gan beiriannydd dros skype:"},
    "TW": {message: "Taiwan"},
    "KP": {message: "Gogledd Corea"},
    "PF": {message: "Polynesia Ffrainc"},
    "app_name": {message: "Hola Gwell Rhyngrwyd"},
    "Update": {message: "Diweddariad"},
    "MW": {message: "Malawi"},
    "GY": {message: "Guyana"},
    "Unblocker is disabled": {message: "Unblocker yn anabl"},
    "PK": {message: "Pacistan"},
    "GQ": {message: "Gini Gyhydeddol"},
    "Number of users that pressed not working": {message: "Nifer y defnyddwyr nad oedd yn pwyso gweithio"},
    "NF": {message: "Ynys Norfolk"},
    "SO": {message: "Somalia"},
    "TD": {message: "Chad"},
    "HM": {message: "Ynys Heard ac Ynysoedd McDonald"},
    "BD": {message: "Bangladesh"},

};
return E; });