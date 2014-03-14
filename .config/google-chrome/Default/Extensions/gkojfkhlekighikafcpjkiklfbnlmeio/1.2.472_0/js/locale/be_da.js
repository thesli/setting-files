'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Djibouti"},
    "JM": {message: "Jamaica"},
    "AT": {message: "Østrig"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Hola pÃ¥ flere enheder? (Android, Xbox, PS, Apple TV, iPhone...). Klik her"},
    "SZ": {message: "Swaziland"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunei Darussalam"},
    "ZM": {message: "Zambia"},
    "app_desc": {message: "Få adgang til HELE Internettet! Gå til ønsket internetside -> klik på Hola ikonet -> skift nationalflag -> NYD DET!"},
    "Improve translation": {message: "Forbedrer oversættelse"},
    "more...": {message: "mere..."},
    "PR": {message: "Puerto Rico"},
    "SH": {message: "St. Helena"},
    "There seems to be an error": {message: "Der opstod desværre en fejl"},
    "MA": {message: "Marokko"},
    "MT": {message: "Malta"},
    "SV": {message: "El Salvador"},
    "MP": {message: "Nordmarianerne"},
    "Unblocker": {message: "Deblokering"},
    "Access any site from any country, free": {message: "Få adgang til enhver side, fra ethvert land, gratis"},
    "Try to <span>reload</span>": {message: "ForsÃ¸g at <span>genindlÃ¦se</span>"},
    "UZ": {message: "Usbekistan"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Liberia"},
    "TN": {message: "Tunesien"},
    "EE": {message: "Estland"},
    "CK": {message: "Cook-øerne"},
    "BY": {message: "Hviderusland"},
    "KR": {message: "Sydkorea"},
    "NO": {message: "Norge"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Armenien"},
    "SR": {message: "Surinam"},
    "MG": {message: "Madagaskar"},
    "ON": {message: "TIL"},
    "BT": {message: "Bhutan"},
    "CF": {message: "Centralafrikanske Republik"},
    "AE": {message: "Forenede Arabiske Emirater"},
    "BA": {message: "Bosnien-Hercegovina"},
    "TH": {message: "Thailand"},
    "CC": {message: "Cocosøerne"},
    "NC": {message: "Ny Caledonien"},
    "TO": {message: "Tonga"},
    "SE": {message: "Sverige"},
    "AZ": {message: "Aserbajdsjan"},
    "AF": {message: "Afghanistan"},
    "NG": {message: "Nigeria"},
    "KE": {message: "Kenya"},
    "BJ": {message: "Benin"},
    "Turn on to get started": {message: "Slå til"},
    "OM": {message: "Oman"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonesien"},
    "FM": {message: "Mikronesiens Forenede Stater"},
    "(some Hola features are not available on your version)": {message: "nogle Hola funktioner er ikke tilgængelige for denne version"},
    "GM": {message: "Gambia"},
    "LV": {message: "Letland"},
    "RU": {message: "Rusland"},
    "FI": {message: "Finland"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Få Hola Plus for uafbrudt, annonce-fri service."},
    "LU": {message: "Luxembourg"},
    "VE": {message: "Venezuela"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "De amerikanske jomfruøer"},
    "SN": {message: "Senegal"},
    "MX": {message: "Mexico"},
    "IL": {message: "Israel"},
    "GG": {message: "Guernsey"},
    "HU": {message: "Ungarn"},
    "DO": {message: "Den Dominikanske Republik"},
    "OFF": {message: "FRA"},
    "KH": {message: "Cambodja"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola kan ikke fungere optimalt da andre tilføjelser styrer dine proxyindstillinger. Vær venlig at deaktivere andre tilfÃ¸jelser du mener kan styre dine proxyindstillinger i <a>tilfÃ¸jelser</a> (som annonce-blokkere, andre VPN tjenester, mv.)."},
    "BB": {message: "Barbados"},
    "JE": {message: "Jersey"},
    "DK": {message: "Danmark"},
    "PA": {message: "Panama"},
    "QA": {message: "Qatar"},
    "CV": {message: "Kap Verde"},
    "Reload": {message: "Genindlæs"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Antal af brugere der bruger denne indstilling"},
    "MO": {message: "SAR Macao"},
    "MF": {message: "Saint Martin"},
    "HR": {message: "Kroatien"},
    "CZ": {message: "Tjekkiet"},
    "BL": {message: "Saint Barthélemy"},
    "ST": {message: "Sao Tome og Principe"},
    "AU": {message: "Australien"},
    "IR": {message: "Iran"},
    "CG": {message: "Congo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Guinea-Bissau"},
    "MK": {message: "Republikken Makedonien"},
    "GR": {message: "Grækenland"},
    "AG": {message: "Antigua og Barbuda"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Hollandske Antiller"},
    "UA": {message: "Ukraine"},
    "EH": {message: "Vestsahara"},
    "KN": {message: "Saint Kitts og Nevis"},
    "SC": {message: "Seychellerne"},
    "MS": {message: "Montserrat"},
    "NL": {message: "Holland"},
    "HK": {message: "SAR Hongkong"},
    "EC": {message: "Ecuador"},
    "MY": {message: "Malaysia"},
    "CR": {message: "Costa Rica"},
    "VA": {message: "Vatikanstaten"},
    "IO": {message: "Det Britiske Territorium i Det Indiske Ocean"},
    "SD": {message: "Sudan"},
    "RS": {message: "Serbien"},
    "CN": {message: "Kina"},
    "UY": {message: "Uruguay"},
    "PY": {message: "Paraguay"},
    "MU": {message: "Mauritius"},
    "CH": {message: "Schweiz"},
    "LI": {message: "Liechtenstein"},
    "GH": {message: "Ghana"},
    "KG": {message: "Kirgisistan"},
    "NU": {message: "Niue"},
    "US": {message: "USA"},
    "PE": {message: "Peru"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fiji-øerne"},
    "ER": {message: "Eritrea"},
    "IQ": {message: "Irak"},
    "AS": {message: "Amerikansk Samoa"},
    "TZ": {message: "Tanzania"},
    "LY": {message: "Libyen"},
    "GT": {message: "Guatemala"},
    "BM": {message: "Bermuda"},
    "BV": {message: "Bouvetø"},
    "LT": {message: "Litauen"},
    "SG": {message: "Singapore"},
    "PM": {message: "Saint Pierre og Miquelon"},
    "Initializing...": {message: "Initialiserer..."},
    "TT": {message: "Trinidad og Tobago"},
    "SY": {message: "Syrien"},
    "SK": {message: "Slovakiet"},
    "GL": {message: "Grønland"},
    "PG": {message: "Papua Ny Guinea"},
    "KI": {message: "Kiribati"},
    "CD": {message: "Congo-Kinshasa"},
    "AO": {message: "Angola"},
    "BW": {message: "Botswana"},
    "ZW": {message: "Zimbabwe"},
    "VC": {message: "St. Vincent og Grenadinerne"},
    "JP": {message: "Japan"},
    "NA": {message: "Namibia"},
    "TJ": {message: "Tadsjikistan"},
    "LC": {message: "Saint Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongoliet"},
    "Hola site list": {message: "Fjern blokering af side liste"},
    "IT": {message: "Italien"},
    "RE": {message: "Reunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Aktiver"},
    "Loading": {message: "Indlæser"},
    "EG": {message: "Egypten"},
    "FR": {message: "Frankrig"},
    "start": {message: "start"},
    "RW": {message: "Rwanda"},
    "BE": {message: "Belgien"},
    "UM": {message: "De Mindre Amerikanske Oversøiske Øer"},
    "Accelerator": {message: "Accelerator"},
    "LS": {message: "Lesotho"},
    "SA": {message: "Saudi-Arabien"},
    "ZA": {message: "Sydafrika"},
    "PT": {message: "Portugal"},
    "$1 VPN": {message: "$1 VPN"},
    "CA": {message: "Canada"},
    "Starting...": {message: "Starter..."},
    "CM": {message: "Cameroun"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "Gratis versionen af Hola skal genaktiveres hver 4. time og er sponsoreret af annoncer."},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepal"},
    "PL": {message: "Polen"},
    "GA": {message: "Gabon"},
    "TM": {message: "Turkmenistan"},
    "KY": {message: "Caymanøerne"},
    "Verify you have Internet": {message: "Verificer at du har forbindelse"},
    "LA": {message: "Laos"},
    "PH": {message: "Filippinerne"},
    "NI": {message: "Nicaragua"},
    "TF": {message: "Franske Besiddelser i Det Sydlige Indiske Ocean"},
    "GU": {message: "Guam"},
    "KZ": {message: "Kasakhstan"},
    "SJ": {message: "Svalbard og Jan Mayen"},
    "MM": {message: "Myanmar"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominica"},
    "NE": {message: "Niger"},
    "AD": {message: "Andorra"},
    "MR": {message: "Mauretanien"},
    "changing...": {message: "skifter..."},
    "GS": {message: "South Georgia og De Sydlige Sandwichøer"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Gammel version af Chrome, <a>opdater</a> Chrome for at bruge Hola"},
    "ME": {message: "Montenegro"},
    "AX": {message: "Åland"},
    "VG": {message: "De britiske jomfruøer"},
    "VN": {message: "Vietnam"},
    "CI": {message: "Elfenbenskysten"},
    "DZ": {message: "Algeriet"},
    "YE": {message: "Yemen"},
    "GE": {message: "Georgien"},
    "CX": {message: "Juleøen"},
    "LB": {message: "Libanon"},
    "FK": {message: "Falklandsøerne"},
    "DE": {message: "Tyskland"},
    "even more...": {message: "endnu flere..."},
    "MV": {message: "Maldiverne"},
    "PN": {message: "Pitcairn"},
    "BH": {message: "Bahrain"},
    "GI": {message: "Gibraltar"},
    "RO": {message: "Rumænien"},
    "WF": {message: "Wallis og Futunaøerne"},
    "AR": {message: "Argentina"},
    "GP": {message: "Guadeloupe"},
    "IN": {message: "Indien"},
    "AW": {message: "Aruba"},
    "FO": {message: "Færøerne"},
    "CS": {message: "Serbien og Montenegro"},
    "BR": {message: "Brasilien"},
    "HN": {message: "Honduras"},
    "MC": {message: "Monaco"},
    "Translate to your language": {message: "Oversæt til dit eget sprog"},
    "SB": {message: "Salomonøerne"},
    "PS": {message: "De palæstinensiske områder"},
    "NZ": {message: "New Zealand"},
    "UG": {message: "Uganda"},
    "GB": {message: "Storbritannien"},
    "HT": {message: "Haiti"},
    "GF": {message: "Fransk Guyana"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Gammel version af Firefox. Klik <a>her</a> for at opgradere."},
    "ZZ": {message: "Ukendt eller ugyldigt område"},
    "KM": {message: "Comorerne"},
    "KW": {message: "Kuwait"},
    "MQ": {message: "Martinique"},
    "TC": {message: "Turks- og Caicosøerne"},
    "MZ": {message: "Mozambique"},
    "ES": {message: "Spanien"},
    "BO": {message: "Bolivia"},
    "AL": {message: "Albanien"},
    "MD": {message: "Republikken Moldova"},
    "TR": {message: "Tyrkiet"},
    "GN": {message: "Guinea"},
    "CO": {message: "Colombia"},
    "SI": {message: "Slovenien"},
    "Settings": {message: "Indstillinger"},
    "AQ": {message: "Antarktis"},
    "JO": {message: "Jordan"},
    "SM": {message: "San Marino"},
    "CU": {message: "Cuba"},
    "CL": {message: "Chile"},
    "ML": {message: "Mali"},
    "ET": {message: "Etiopien"},
    "IS": {message: "Island"},
    "Reload Hola": {message: "Genindlæs Hola"},
    "BG": {message: "Bulgarien"},
    "MH": {message: "Marshalløerne"},
    "BS": {message: "Bahamas"},
    "TL": {message: "Timor-Leste"},
    "BZ": {message: "Belize"},
    "CY": {message: "Cypern"},
    "IM": {message: "Isle of Man"},
    "IE": {message: "Irland"},
    "TW": {message: "Taiwan"},
    "KP": {message: "Nordkorea"},
    "PF": {message: "Fransk Polynesien"},
    "app_name": {message: "Hola Bedre Internet"},
    "Update": {message: "Opdater"},
    "MW": {message: "Malawi"},
    "GY": {message: "Guyana"},
    "Unblocker is disabled": {message: "Deblokering er deaktiveret"},
    "GQ": {message: "Ækvatorialguinea"},
    "PK": {message: "Pakistan"},
    "Number of users that pressed not working": {message: "Antal af brugere der trykkede virker ikke"},
    "NF": {message: "Norfolk Island"},
    "TD": {message: "Tchad"},
    "SO": {message: "Somalia"},
    "BD": {message: "Bangladesh"},
    "HM": {message: "Heard- og McDonald-øerne"},

};
return E; });