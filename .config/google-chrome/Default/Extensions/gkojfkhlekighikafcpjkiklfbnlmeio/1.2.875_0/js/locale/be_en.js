'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Djibouti"},
    "JM": {message: "Jamaica"},
    "AT": {message: "Austria"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here"},
    "SZ": {message: "Swaziland"},
    "locale_en_ta": {message: "TA தமிழ்"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunei"},
    "ZM": {message: "Zambia"},
    "app_desc": {message: "Access ALL of the Internet! Go to blocked site -> click Hola icon -> change country flag -> ENJOY!"},
    "Improve translation": {message: "Improve translation"},
    "more...": {message: "more..."},
    "PR": {message: "Puerto Rico"},
    "locale_el": {message: "Greek"},
    "locale_sv": {message: "Swedish"},
    "SH": {message: "Saint Helena"},
    "locale_en_sv": {message: "SV Svenska"},
    "There seems to be an error": {message: "There seems to be an error"},
    "MA": {message: "Morocco"},
    "SV": {message: "El Salvador"},
    "MT": {message: "Malta"},
    "locale_en_tl": {message: "TL Filipino"},
    "MP": {message: "Northern Mariana Islands"},
    "locale_ga": {message: "Irish"},
    "locale_en_he": {message: "HE עברית"},
    "Unblocker": {message: "Unblocker"},
    "Support Hola": {message: "Support Hola"},
    "Version": {message: "Version"},
    "locale_en_is": {message: "IS Íslenska"},
    "Access any site from any country, free": {message: "Access any site from any country, free"},
    "Try to <span>reload</span>": {message: "Try to <span>reload</span>"},
    "locale_ur": {message: "Urdu"},
    "$1 $2": {message: "$1 $2"},
    "locale_en_cs": {message: "CS Český"},
    "PW": {message: "Palau"},
    "UZ": {message: "Uzbekistan"},
    "FX": {message: "Metropolitan France"},
    "locale_ja": {message: "Japanese"},
    "LR": {message: "Liberia"},
    "TK": {message: "Tokelau"},
    "Premium": {message: "Premium"},
    "Language:": {message: "Language:"},
    "Apply settings...": {message: "Apply settings..."},
    "Get Unlimited Unblocking": {message: "Get Unlimited Unblocking"},
    "TN": {message: "Tunisia"},
    "EE": {message: "Estonia"},
    "CK": {message: "Cook Islands"},
    "locale_ru": {message: "Russian"},
    "BY": {message: "Belarus"},
    "NO": {message: "Norway"},
    "KR": {message: "South Korea"},
    "locale_en_da": {message: "DA Dansk"},
    "BF": {message: "Burkina Faso"},
    "More countries": {message: "More countries"},
    "UUID": {message: "UUID"},
    "AM": {message: "Armenia"},
    "NT": {message: "Neutral Zone"},
    "locale_no": {message: "Norwegian"},
    "locale_mr": {message: "Marathi"},
    "MG": {message: "Madagascar"},
    "SR": {message: "Suriname"},
    "ON": {message: "ON"},
    "BT": {message: "Bhutan"},
    "DD": {message: "East Germany"},
    "CF": {message: "Central African Republic"},
    "BA": {message: "Bosnia and Herzegovina"},
    "AE": {message: "United Arab Emirates"},
    "not working?": {message: "not working?"},
    "TH": {message: "Thailand"},
    "SU": {message: "Union of Soviet Socialist Republics"},
    "Author:": {message: "Author:"},
    "Get Premium support": {message: "Get Premium support"},
    "CC": {message: "Cocos [Keeling] Islands"},
    "locale_en_zh_TW": {message: "ZH_TW 繁體中文"},
    "NC": {message: "New Caledonia"},
    "Go Hola Premium": {message: "Go Hola Premium"},
    "locale_en_sr": {message: "SR Srpski"},
    "Service": {message: "Service"},
    "locale_ko": {message: "Korean"},
    "locale_hr": {message: "Croatian"},
    "locale_sk": {message: "Slovak"},
    "Get the Fastest Servers": {message: "Get the Fastest Servers"},
    "locale_en_pt_PT": {message: "PT Português"},
    "FQ": {message: "French Southern and Antarctic Territories"},
    "TO": {message: "Tonga"},
    "SE": {message: "Sweden"},
    "CID": {message: "CID"},
    "locale_sq": {message: "Albanian"},
    "AZ": {message: "Azerbaijan"},
    "locale_en_ur": {message: "UR اردو"},
    "NQ": {message: "Dronning Maud Land"},
    "AF": {message: "Afghanistan"},
    "Love Hola?": {message: "Love Hola?"},
    "NG": {message: "Nigeria"},
    "BJ": {message: "Benin"},
    "KE": {message: "Kenya"},
    "Turn on to get started": {message: "Turn on to get started"},
    "OM": {message: "Oman"},
    "locale_en": {message: "English"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonesia"},
    "FM": {message: "Micronesia"},
    "(some Hola features are not available on your version)": {message: "(some Hola features are not available on your version)"},
    "locale_en_ms": {message: "MS Melayu"},
    "GM": {message: "Gambia"},
    "$1 VPN Premium": {message: "$1 VPN Premium"},
    "LV": {message: "Latvia"},
    "locale_pt_BR": {message: "Portuguese"},
    "RU": {message: "Russia"},
    "locale_vi": {message: "Vietnamese"},
    "Working?": {message: "Working?"},
    "FI": {message: "Finland"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Get Hola Plus for un-interrupted, ad-free service."},
    "LU": {message: "Luxembourg"},
    "VE": {message: "Venezuela"},
    "<strong>$1</strong> via Hola": {message: "<strong>$1</strong> via Hola"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "U.S. Virgin Islands"},
    "MX": {message: "Mexico"},
    "SN": {message: "Senegal"},
    "locale_az": {message: "Azerbaijani"},
    "GG": {message: "Guernsey"},
    "IL": {message: "Israel"},
    "more options...": {message: "more options..."},
    "Author site:": {message: "Author site:"},
    "DO": {message: "Dominican Republic"},
    "HU": {message: "Hungary"},
    "OFF": {message: "OFF"},
    "locale_en_el": {message: "EL Ελληνικά"},
    "BQ": {message: "British Antarctic Territory"},
    "KH": {message: "Cambodia"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.)."},
    "locale_en_sk": {message: "SK Slovenčina"},
    "BB": {message: "Barbados"},
    "JE": {message: "Jersey"},
    "DK": {message: "Denmark"},
    "PA": {message: "Panama"},
    "CV": {message: "Cape Verde"},
    "QA": {message: "Qatar"},
    "Reload": {message: "Reload"},
    "GD": {message: "Grenada"},
    "My favorites": {message: "My favorites"},
    "Number of users that use this option": {message: "Number of users that use this option"},
    "MO": {message: "Macau SAR China"},
    "MF": {message: "Saint Martin"},
    "HR": {message: "Croatia"},
    "locale_mk": {message: "Macedonian"},
    "locale_en_ht": {message: "HT Kreyòl ayisyen"},
    "CZ": {message: "Czech Republic"},
    "BL": {message: "Saint Barthélemy"},
    "VPN": {message: "VPN"},
    "Never be a peer": {message: "Never be a peer"},
    "Log out": {message: "Log out"},
    "AU": {message: "Australia"},
    "ST": {message: "São Tomé and Príncipe"},
    "Get Hola for Android": {message: "Get Hola for Android"},
    "PU": {message: "U.S. Miscellaneous Pacific Islands"},
    "Browser": {message: "Browser"},
    "locale_en_es_419": {message: "es_419 Español, América Latina"},
    "locale_en_hi": {message: "HI हिंदी"},
    "IR": {message: "Iran"},
    "Try another server": {message: "Try another server"},
    "locale_it": {message: "Italian"},
    "locale_en_tr": {message: "TR Tϋrkçe"},
    "locale_en_te": {message: "TE తెలుగు"},
    "locale_en_kn": {message: "KN ಕನ್ನಡ"},
    "CG": {message: "Congo - Brazzaville"},
    "More...": {message: "More..."},
    "GW": {message: "Guinea-Bissau"},
    "BI": {message: "Burundi"},
    "MK": {message: "Macedonia"},
    "locale_en_af": {message: "AF Afrikaans"},
    "GR": {message: "Greece"},
    "AG": {message: "Antigua and Barbuda"},
    "locale_en_bg": {message: "BG Български"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Netherlands Antilles"},
    "locale_en_be": {message: "BE Беларуская мова"},
    "Not working?": {message: "Not working?"},
    "UA": {message: "Ukraine"},
    "EH": {message: "Western Sahara"},
    "locale_cs": {message: "Czech"},
    "KN": {message: "Saint Kitts and Nevis"},
    "SC": {message: "Seychelles"},
    "Server": {message: "Server"},
    " via ": {message: " via "},
    "locale_en_fa": {message: "FA فارسی"},
    "locale_en_lt": {message: "LT Lietuviškai"},
    "MS": {message: "Montserrat"},
    "NL": {message: "Netherlands"},
    "HK": {message: "Hong Kong SAR China"},
    "EC": {message: "Ecuador"},
    "locale_eu": {message: "Basque"},
    "MY": {message: "Malaysia"},
    "locale_sr": {message: "Serbian"},
    "CR": {message: "Costa Rica"},
    "not working? try another server": {message: "not working? try another server"},
    "locale_en_pt_BR": {message: "PT_BR Português (Brasil)"},
    "VA": {message: "Vatican City"},
    "locale_lv": {message: "Latvian"},
    "IO": {message: "British Indian Ocean Territory"},
    "locale_en_ga": {message: "GA Gaeilge"},
    "RS": {message: "Serbia"},
    "SD": {message: "Sudan"},
    "locale_en_fil": {message: "FIL Filipino"},
    "CN": {message: "China"},
    "UY": {message: "Uruguay"},
    "PY": {message: "Paraguay"},
    "MU": {message: "Mauritius"},
    "LI": {message: "Liechtenstein"},
    "CH": {message: "Switzerland"},
    "KG": {message: "Kyrgyzstan"},
    "GH": {message: "Ghana"},
    "locale_sw": {message: "Swahili"},
    "locale_en_mt": {message: "MT Malti"},
    "NU": {message: "Niue"},
    "PE": {message: "Peru"},
    "US": {message: "United States"},
    "Stop Hola": {message: "Stop Hola"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fiji"},
    "locale_en_bn": {message: "BN বাংলা"},
    "VPN Premium": {message: "VPN Premium"},
    "Get Hola Premium": {message: "Get Hola Premium"},
    "locale_tl": {message: "Filipino"},
    "Popular in $1": {message: "Popular in $1"},
    "Choose<br>Country": {message: "Choose<br>Country"},
    "locale_en_hy": {message: "HY Հայերեն"},
    "Tell friends about $1": {message: "Tell friends about $1"},
    "locale_km": {message: "Khmer"},
    "ER": {message: "Eritrea"},
    "locale_en_es": {message: "ES Español"},
    "IQ": {message: "Iraq"},
    "AS": {message: "American Samoa"},
    "TZ": {message: "Tanzania"},
    "LY": {message: "Libya"},
    "GT": {message: "Guatemala"},
    "locale_en_bs": {message: "BS Bosanski"},
    "locale_fi": {message: "Finnish"},
    "BM": {message: "Bermuda"},
    "locale_en_it": {message: "IT Italiana"},
    "BV": {message: "Bouvet Island"},
    "LT": {message: "Lithuania"},
    "PM": {message: "Saint Pierre and Miquelon"},
    "SG": {message: "Singapore"},
    "locale_en_zh_CN": {message: "ZH_CN 简体中文"},
    "Initializing...": {message: "Initializing..."},
    "TT": {message: "Trinidad and Tobago"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions"},
    "locale_da": {message: "Danish"},
    "SK": {message: "Slovakia"},
    "SY": {message: "Syria"},
    "locale_cy": {message: "Welsh"},
    "GL": {message: "Greenland"},
    "locale_bs": {message: "Bosnian"},
    "Invite friends - free Premium.": {message: "Invite friends - free Premium."},
    "PG": {message: "Papua New Guinea"},
    "locale_en_en": {message: "EN English"},
    "KI": {message: "Kiribati"},
    "Account": {message: "Account"},
    "locale_en_de": {message: "DE Deutsch"},
    "CD": {message: "Congo - Kinshasa"},
    "locale_en_km": {message: "KM ភាសាខ្មែរ"},
    "BW": {message: "Botswana"},
    "AO": {message: "Angola"},
    "ZW": {message: "Zimbabwe"},
    "Finding peers...": {message: "Finding peers..."},
    "VC": {message: "Saint Vincent and the Grenadines"},
    "JP": {message: "Japan"},
    "locale_gl": {message: "Galician"},
    "NA": {message: "Namibia"},
    "Sign up": {message: "Sign up"},
    "TJ": {message: "Tajikistan"},
    "locale_uk": {message: "Ukrainian"},
    "LC": {message: "Saint Lucia"},
    "locale_ht": {message: "Haitian Creole"},
    "Access <strong>$1</strong>?": {message: "Access <strong>$1</strong>?"},
    "VU": {message: "Vanuatu"},
    "locale_en_gl": {message: "GL Galego"},
    "Invite friends. Get Premium.": {message: "Invite friends. Get Premium."},
    "MN": {message: "Mongolia"},
    "Hola site list": {message: "Hola site list"},
    "IT": {message: "Italy"},
    "locale_en_cy": {message: "CY Cymraeg"},
    "locale_en_fi": {message: "FI suomi"},
    "RE": {message: "Réunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Enable"},
    "locale_en_hu": {message: "HU Magyar"},
    "Loading": {message: "Loading"},
    "FR": {message: "France"},
    "EG": {message: "Egypt"},
    "locale_en_mr": {message: "MR मराठी"},
    "locale_ar": {message: "Arabic"},
    "start": {message: "start"},
    "Changing country...": {message: "Changing country..."},
    "RW": {message: "Rwanda"},
    "UM": {message: "U.S. Minor Outlying Islands"},
    "BE": {message: "Belgium"},
    "Popular in the world": {message: "Popular in the world"},
    "Accelerator": {message: "Accelerator"},
    "SA": {message: "Saudi Arabia"},
    "LS": {message: "Lesotho"},
    "locale_be": {message: "Belarusian"},
    "ZA": {message: "South Africa"},
    "CT": {message: "Canton and Enderbury Islands"},
    "locale_en_pt": {message: "PT Português"},
    "PT": {message: "Portugal"},
    "$1 VPN": {message: "$1 VPN"},
    "CA": {message: "Canada"},
    "Starting...": {message: "Starting..."},
    "CM": {message: "Cameroon"},
    "locale_lt": {message: "Lithuanian"},
    "locale_et": {message: "Estonian"},
    "NP": {message: "Nepal"},
    "locale_en_sl": {message: "SL Slovenščina"},
    "Hola": {message: "Hola"},
    "locale_en_vi": {message: "VI Tiếng Việt"},
    "locale_en_ar": {message: "AR العربية"},
    "My Account": {message: "My Account"},
    "PL": {message: "Poland"},
    "locale_sl": {message: "Slovenian"},
    "TM": {message: "Turkmenistan"},
    "GA": {message: "Gabon"},
    "locale_en_fr": {message: "FR Française"},
    "Start Hola": {message: "Start Hola"},
    "locale_en_gu": {message: "GU ગુજરાતી"},
    "KY": {message: "Cayman Islands"},
    "locale_en_zh": {message: "ZH 中文"},
    "LA": {message: "Laos"},
    "locale_he": {message: "Hebrew"},
    "PH": {message: "Philippines"},
    "locale_es": {message: "Spanish"},
    "NI": {message: "Nicaragua"},
    "locale_fr": {message: "French"},
    "locale_zh_CN": {message: "Chinese Simplified"},
    "GU": {message: "Guam"},
    "TF": {message: "French Southern Territories"},
    "locale_ca": {message: "Catalan"},
    "KZ": {message: "Kazakhstan"},
    "locale_en_ro": {message: "RO Română"},
    "Report a problem": {message: "Report a problem"},
    "SJ": {message: "Svalbard and Jan Mayen"},
    "MM": {message: "Myanmar [Burma]"},
    "locale_en_et": {message: "ET Eesti"},
    "NR": {message: "Nauru"},
    "locale_en_ca": {message: "CA Català"},
    "NE": {message: "Niger"},
    "DM": {message: "Dominica"},
    "locale_en_az": {message: "AZ azərbaycan"},
    "locale_en_ja": {message: "JA 日本語"},
    "locale_en_mk": {message: "MK Македонски"},
    "MR": {message: "Mauritania"},
    "AD": {message: "Andorra"},
    "changing...": {message: "changing..."},
    "locale_iw": {message: "Hebrew"},
    "GS": {message: "South Georgia and the South Sandwich Islands"},
    "locale_ro": {message: "Romanian"},
    "Access more sites": {message: "Access more sites"},
    "ME": {message: "Montenegro"},
    "locale_af": {message: "Afrikaans"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Very old version of Chrome, <a>update</a> Chrome to use Hola"},
    "AX": {message: "Åland Islands"},
    "locale_mt": {message: "Maltese"},
    "locale_en_id": {message: "ID Indonesia"},
    "VG": {message: "British Virgin Islands"},
    "VN": {message: "Vietnam"},
    "DZ": {message: "Algeria"},
    "CI": {message: "Côte d’Ivoire"},
    "YE": {message: "Yemen"},
    "locale_id": {message: "Indonesian"},
    "GE": {message: "Georgia"},
    "CX": {message: "Christmas Island"},
    "My Settings": {message: "My Settings"},
    "LB": {message: "Lebanon"},
    "locale_pl": {message: "Polish"},
    "locale_is": {message: "Icelandic"},
    "locale_en_th": {message: "TH ภาษาไทย"},
    "locale_gu": {message: "Gujarati"},
    "FK": {message: "Falkland Islands"},
    "DE": {message: "Germany"},
    "Back to $1": {message: "Back to $1"},
    "MV": {message: "Maldives"},
    "even more...": {message: "even more..."},
    "locale_en_ceb": {message: "CEB Sinugboanon"},
    "PN": {message: "Pitcairn Islands"},
    "MI": {message: "Midway Islands"},
    "BH": {message: "Bahrain"},
    "GI": {message: "Gibraltar"},
    "locale_de": {message: "German"},
    "RO": {message: "Romania"},
    "WF": {message: "Wallis and Futuna"},
    "locale_en_sw": {message: "SW Kiswahili"},
    "locale_zh_TW": {message: "Chinese Traditional"},
    "IN": {message: "India"},
    "GP": {message: "Guadeloupe"},
    "AR": {message: "Argentina"},
    "Configuring...": {message: "Configuring..."},
    "CS": {message: "Serbia and Montenegro"},
    "FO": {message: "Faroe Islands"},
    "AW": {message: "Aruba"},
    "MC": {message: "Monaco"},
    "HN": {message: "Honduras"},
    "BR": {message: "Brazil"},
    "Get Free Premium": {message: "Get Free Premium"},
    "SB": {message: "Solomon Islands"},
    "Translate to your language": {message: "Translate to your language"},
    "PS": {message: "Palestinian Territories"},
    "NZ": {message: "New Zealand"},
    "working? remember": {message: "working? remember"},
    "UG": {message: "Uganda"},
    "locale_ms": {message: "Malay"},
    "GB": {message: "United Kingdom"},
    "locale_en_uk": {message: "UK Українська"},
    "HT": {message: "Haiti"},
    "locale_hu": {message: "Hungarian"},
    "GF": {message: "French Guiana"},
    "ZZ": {message: "Unknown or Invalid Region"},
    "locale_hi": {message: "Hindi"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Old version of Firefox. Press <a>here</a> to upgrade."},
    "KM": {message: "Comoros"},
    "locale_en_pl": {message: "PL Polish"},
    "PC": {message: "Pacific Islands Trust Territory"},
    "KW": {message: "Kuwait"},
    "locale_en_hr": {message: "HR Hrvatski"},
    "TC": {message: "Turks and Caicos Islands"},
    "MQ": {message: "Martinique"},
    "locale_ka": {message: "Georgian"},
    "ES": {message: "Spain"},
    "MZ": {message: "Mozambique"},
    "BO": {message: "Bolivia"},
    "locale_en_ko": {message: "KO 한국어"},
    "locale_en_ka": {message: "KA ქართული"},
    "AL": {message: "Albania"},
    "VD": {message: "North Vietnam"},
    "TR": {message: "Turkey"},
    "MD": {message: "Moldova"},
    "GN": {message: "Guinea"},
    "locale_en_sq": {message: "SQ shqip"},
    "SI": {message: "Slovenia"},
    "CO": {message: "Colombia"},
    "Settings": {message: "Settings"},
    "locale_en_nl": {message: "NL Nederlandse"},
    "AQ": {message: "Antarctica"},
    "Stopping peer routing...": {message: "Stopping peer routing..."},
    "JO": {message: "Jordan"},
    "locale_tr": {message: "Turkish"},
    "locale_bg": {message: "Bulgarian"},
    "SM": {message: "San Marino"},
    "CL": {message: "Chile"},
    "CU": {message: "Cuba"},
    "ML": {message: "Mali"},
    "locale_en_lv": {message: "LV Latviešu"},
    "Get 24/7 Unblocking": {message: "Get 24/7 Unblocking"},
    "ET": {message: "Ethiopia"},
    "IS": {message: "Iceland"},
    "Platform": {message: "Platform"},
    "Reload Hola": {message: "Reload Hola"},
    "back to": {message: "back to"},
    "Connecting...": {message: "Connecting..."},
    "Product": {message: "Product"},
    "YD": {message: "People's Democratic Republic of Yemen"},
    "locale_en_eu": {message: "EU euskera"},
    "MH": {message: "Marshall Islands"},
    "BG": {message: "Bulgaria"},
    "Log in": {message: "Log in"},
    "locale_th": {message: "Thai"},
    "BS": {message: "Bahamas"},
    "Check your Internet connection": {message: "Check your Internet connection"},
    "TL": {message: "Timor-Leste"},
    "locale_fa": {message: "Persian"},
    "locale_en_no": {message: "NO Norsk"},
    "locale_bn": {message: "Bengali"},
    "Upgrade": {message: "Upgrade"},
    "BZ": {message: "Belize"},
    "CY": {message: "Cyprus"},
    "IM": {message: "Isle of Man"},
    "IE": {message: "Ireland"},
    "Get help from engineer over skype:": {message: "Get help from engineer over skype:"},
    "TW": {message: "Taiwan"},
    "KP": {message: "North Korea"},
    "locale_pt": {message: "Portuguese"},
    "PF": {message: "French Polynesia"},
    "app_name": {message: "Hola Better Internet"},
    "locale_nl": {message: "Dutch"},
    "locale_te": {message: "Telugu"},
    "Remember server": {message: "Remember server"},
    "Update": {message: "Update"},
    "MW": {message: "Malawi"},
    "locale_cz": {message: "Czech"},
    "locale_es_419": {message: "Spanish, Latin America"},
    "GY": {message: "Guyana"},
    "Unblocker is disabled": {message: "Unblocker is disabled"},
    "PZ": {message: "Panama Canal Zone"},
    "PK": {message: "Pakistan"},
    "GQ": {message: "Equatorial Guinea"},
    "locale_en_ru": {message: "RU Русский"},
    "WK": {message: "Wake Island"},
    "Number of users that pressed not working": {message: "Number of users that pressed not working"},
    "NF": {message: "Norfolk Island"},
    "locale_kn": {message: "Kannada"},
    "SO": {message: "Somalia"},
    "TD": {message: "Chad"},
    "JT": {message: "Johnston Island"},
    "locale_ta": {message: "Tamil"},
    "BD": {message: "Bangladesh"},
    "HM": {message: "Heard Island and McDonald Islands"},

};
return E; });