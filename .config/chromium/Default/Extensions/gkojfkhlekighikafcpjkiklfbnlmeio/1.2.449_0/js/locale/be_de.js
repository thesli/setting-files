'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Dschibuti"},
    "JM": {message: "Jamaika"},
    "AT": {message: "Österreich"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Möchten Sie Hola auch auf anderen Geräten benutzen?(Xbox, PS, Apple TV, iPhone ...). Klicken Sie bitte hier"},
    "SZ": {message: "Swasiland"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunei Darussalam"},
    "ZM": {message: "Sambia"},
    "app_desc": {message: "Zugang zu allen gesperrten Seiten im Internet! Rufe eine blockierte Seite auf > Klicke auf das Hola Icon > Ändere die Landesflagge > GENIEßE!"},
    "Improve translation": {message: "Übersetzung verbessern"},
    "more...": {message: "mehr..."},
    "PR": {message: "Puerto Rico"},
    "SH": {message: "St. Helena"},
    "There seems to be an error": {message: "Ein Fehler ist aufgetreten"},
    "MA": {message: "Marokko"},
    "MT": {message: "Malta"},
    "SV": {message: "El Salvador"},
    "MP": {message: "Nördliche Marianen"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Greifen Sie auf jede Seite aus jedem Land zu!"},
    "Try to <span>reload</span>": {message: "Versuchen Sie <span>reload</span>"},
    "UZ": {message: "Usbekistan"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Liberia"},
    "TN": {message: "Tunesien"},
    "EE": {message: "Estland"},
    "CK": {message: "Cookinseln"},
    "BY": {message: "Belarus"},
    "KR": {message: "Republik Korea"},
    "NO": {message: "Norwegen"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Armenien"},
    "SR": {message: "Suriname"},
    "MG": {message: "Madagaskar"},
    "ON": {message: "AN"},
    "BT": {message: "Bhutan"},
    "CF": {message: "Zentralafrikanische Republik"},
    "AE": {message: "Vereinigte Arabische Emirate"},
    "BA": {message: "Bosnien und Herzegowina"},
    "not working?": {message: "funktioniert nicht?"},
    "TH": {message: "Thailand"},
    "Author:": {message: "Autor:"},
    "CC": {message: "Kokosinseln"},
    "NC": {message: "Neukaledonien"},
    "TO": {message: "Tonga"},
    "SE": {message: "Schweden"},
    "AZ": {message: "Aserbaidschan"},
    "AF": {message: "Afghanistan"},
    "NG": {message: "Nigeria"},
    "KE": {message: "Kenia"},
    "BJ": {message: "Benin"},
    "Turn on to get started": {message: "Einschalten um loszulegen"},
    "OM": {message: "Oman"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonesien"},
    "FM": {message: "Mikronesien"},
    "(some Hola features are not available on your version)": {message: "(einige Hola Funktionen sind in Ihrer Version nicht Version verfügbar)"},
    "GM": {message: "Gambia"},
    "LV": {message: "Lettland"},
    "RU": {message: "Russische Föderation"},
    "FI": {message: "Finnland"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Holen sie Hola-Plus für un-unterbrochenen, werbungsfreien Service."},
    "LU": {message: "Luxemburg"},
    "VE": {message: "Venezuela"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "Amerikanische Jungferninseln"},
    "SN": {message: "Senegal"},
    "MX": {message: "Mexiko"},
    "IL": {message: "Israel"},
    "GG": {message: "Guernsey"},
    "more options...": {message: "mehr Einstellungen..."},
    "Author site:": {message: "Website des Autors:"},
    "HU": {message: "Ungarn"},
    "DO": {message: "Dominikanische Republik"},
    "OFF": {message: "AUS"},
    "KH": {message: "Kambodscha"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Ihre Netzwerk-Proxy-Einstellungen werden von einer anderen Erweiterung verwaltet. Bitte deaktivieren Sie Apps unter <a>extensions</a>, von denen Sie denken, dass sie die Proxy-Einstellungen verwalten könnten (Ad-Blocker, andere VPN-Services etc.)."},
    "BB": {message: "Barbados"},
    "JE": {message: "Jersey"},
    "DK": {message: "Dänemark"},
    "PA": {message: "Panama"},
    "CV": {message: "Kap Verde"},
    "QA": {message: "Katar"},
    "Reload": {message: "Neu laden"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Anzahl Benutzer, die diese Option nutzen"},
    "MO": {message: "Sonderverwaltungszone Macao"},
    "MF": {message: "St. Martin"},
    "HR": {message: "Kroatien"},
    "CZ": {message: "Tschechische Republik"},
    "BL": {message: "St. Barthélemy"},
    "ST": {message: "São Tomé und Príncipe"},
    "AU": {message: "Australien"},
    "IR": {message: "Iran"},
    "CG": {message: "Kongo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Guinea-Bissau"},
    "MK": {message: "Mazedonien"},
    "GR": {message: "Griechenland"},
    "AG": {message: "Antigua und Barbuda"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Niederländische Antillen"},
    "UA": {message: "Ukraine"},
    "EH": {message: "Westsahara"},
    "KN": {message: "St. Kitts und Nevis"},
    "SC": {message: "Seychellen"},
    "NL": {message: "Niederlande"},
    "MS": {message: "Montserrat"},
    "HK": {message: "Sonderverwaltungszone Hongkong"},
    "EC": {message: "Ecuador"},
    "MY": {message: "Malaysia"},
    "CR": {message: "Costa Rica"},
    "VA": {message: "Vatikanstadt"},
    "IO": {message: "Britisches Territorium im Indischen Ozean"},
    "SD": {message: "Sudan"},
    "RS": {message: "Serbien"},
    "CN": {message: "China"},
    "UY": {message: "Uruguay"},
    "PY": {message: "Paraguay"},
    "MU": {message: "Mauritius"},
    "CH": {message: "Schweiz"},
    "LI": {message: "Liechtenstein"},
    "GH": {message: "Ghana"},
    "KG": {message: "Kirgisistan"},
    "NU": {message: "Niue"},
    "US": {message: "Vereinigte Staaten"},
    "PE": {message: "Peru"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fidschi"},
    "ER": {message: "Eritrea"},
    "IQ": {message: "Irak"},
    "AS": {message: "Amerikanisch-Samoa"},
    "TZ": {message: "Tansania"},
    "LY": {message: "Libyen"},
    "GT": {message: "Guatemala"},
    "BM": {message: "Bermuda"},
    "BV": {message: "Bouvetinsel"},
    "LT": {message: "Litauen"},
    "PM": {message: "St. Pierre und Miquelon"},
    "SG": {message: "Singapur"},
    "Initializing...": {message: "Initialisiere, bitte warten..."},
    "TT": {message: "Trinidad und Tobago"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola funktioniert nicht gut im Windows 8-Modus. Bitte wechseln SIe in den Desktop-Modus. Clicken Sie <a>hier</a> für Anweisungen"},
    "SY": {message: "Syrien"},
    "SK": {message: "Slowakei"},
    "GL": {message: "Grönland"},
    "PG": {message: "Papua-Neuguinea"},
    "KI": {message: "Kiribati"},
    "CD": {message: "Demokratische Republik Kongo"},
    "AO": {message: "Angola"},
    "BW": {message: "Botsuana"},
    "ZW": {message: "Simbabwe"},
    "VC": {message: "St. Vincent und die Grenadinen"},
    "JP": {message: "Japan"},
    "NA": {message: "Namibia"},
    "TJ": {message: "Tadschikistan"},
    "LC": {message: "St. Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongolei"},
    "Hola site list": {message: "Hola Seitenliste"},
    "IT": {message: "Italien"},
    "RE": {message: "Réunion"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Aktivieren"},
    "Loading": {message: "Wird geladen"},
    "FR": {message: "Frankreich"},
    "EG": {message: "Ägypten"},
    "start": {message: "Start"},
    "RW": {message: "Ruanda"},
    "BE": {message: "Belgien"},
    "UM": {message: "Amerikanisch-Ozeanien"},
    "Accelerator": {message: "Beschleuniger"},
    "LS": {message: "Lesotho"},
    "SA": {message: "Saudi-Arabien"},
    "ZA": {message: "Südafrika"},
    "PT": {message: "Portugal"},
    "CA": {message: "Kanada"},
    "Starting...": {message: "Starte..."},
    "CM": {message: "Kamerun"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "Diese kostenlose Version von Hola muss alle 4 Stunden neu aktiviert werden und wird von Anzeigen gesponsert."},
    "NP": {message: "Nepal"},
    "PL": {message: "Polen"},
    "GA": {message: "Gabun"},
    "TM": {message: "Turkmenistan"},
    "KY": {message: "Kaimaninseln"},
    "Verify you have Internet": {message: "Stellen Sie sicher, dass Sie mit dem Internet verbunden sind"},
    "LA": {message: "Laos"},
    "PH": {message: "Philippinen"},
    "NI": {message: "Nicaragua"},
    "TF": {message: "Französische Süd- und Antarktisgebiete"},
    "GU": {message: "Guam"},
    "KZ": {message: "Kasachstan"},
    "Report a problem": {message: "Problem melden"},
    "SJ": {message: "Svalbard und Jan Mayen"},
    "MM": {message: "Myanmar"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominica"},
    "NE": {message: "Niger"},
    "AD": {message: "Andorra"},
    "MR": {message: "Mauretanien"},
    "changing...": {message: "Wechsle..."},
    "GS": {message: "Südgeorgien und die Südlichen Sandwichinseln"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Sehr alte Version von Chrome. <a>Aktualisieren</a> Sie Chrome um Hola verwenden zu können."},
    "ME": {message: "Montenegro"},
    "AX": {message: "Alandinseln"},
    "VG": {message: "Britische Jungferninseln"},
    "VN": {message: "Vietnam"},
    "CI": {message: "Côte d’Ivoire"},
    "DZ": {message: "Algerien"},
    "YE": {message: "Jemen"},
    "GE": {message: "Georgien"},
    "CX": {message: "Weihnachtsinsel"},
    "LB": {message: "Libanon"},
    "FK": {message: "Falklandinseln"},
    "DE": {message: "Deutschland"},
    "even more...": {message: "noch mehr..."},
    "MV": {message: "Malediven"},
    "PN": {message: "Pitcairn"},
    "BH": {message: "Bahrain"},
    "GI": {message: "Gibraltar"},
    "RO": {message: "Rumänien"},
    "WF": {message: "Wallis und Futuna"},
    "AR": {message: "Argentinien"},
    "GP": {message: "Guadeloupe"},
    "IN": {message: "Indien"},
    "FO": {message: "Färöer"},
    "AW": {message: "Aruba"},
    "CS": {message: "Serbien und Montenegro"},
    "BR": {message: "Brasilien"},
    "HN": {message: "Honduras"},
    "MC": {message: "Monaco"},
    "Translate to your language": {message: "In Ihre Sprache übersetzen"},
    "SB": {message: "Salomonen"},
    "NZ": {message: "Neuseeland"},
    "PS": {message: "Palästinensische Gebiete"},
    "UG": {message: "Uganda"},
    "GB": {message: "Vereinigtes Königreich"},
    "HT": {message: "Haiti"},
    "GF": {message: "Französisch-Guayana"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Veraltete Version von Firefox. Klicken Sie <a>hier</a> um zu aktualisieren."},
    "ZZ": {message: "Unbekannte oder ungültige Region"},
    "KM": {message: "Komoren"},
    "KW": {message: "Kuwait"},
    "MQ": {message: "Martinique"},
    "TC": {message: "Turks- und Caicosinseln"},
    "MZ": {message: "Mosambik"},
    "ES": {message: "Spanien"},
    "BO": {message: "Bolivien"},
    "AL": {message: "Albanien"},
    "MD": {message: "Republik Moldau"},
    "TR": {message: "Türkei"},
    "GN": {message: "Guinea"},
    "CO": {message: "Kolumbien"},
    "SI": {message: "Slowenien"},
    "Settings": {message: "Einstellungen"},
    "AQ": {message: "Antarktis"},
    "JO": {message: "Jordanien"},
    "SM": {message: "San Marino"},
    "CU": {message: "Kuba"},
    "CL": {message: "Chile"},
    "ML": {message: "Mali"},
    "ET": {message: "Äthiopien"},
    "IS": {message: "Island"},
    "Reload Hola": {message: "Hola neu laden"},
    "back to": {message: "Zurück zu"},
    "MH": {message: "Marshallinseln"},
    "BG": {message: "Bulgarien"},
    "BS": {message: "Bahamas"},
    "TL": {message: "Osttimor"},
    "BZ": {message: "Belize"},
    "CY": {message: "Zypern"},
    "IM": {message: "Isle of Man"},
    "IE": {message: "Irland"},
    "Get help from engineer over skype:": {message: "Holen Sie sich Hilfe von uns über Skype!:"},
    "TW": {message: "Taiwan"},
    "KP": {message: "Demokratische Volksrepublik Korea"},
    "PF": {message: "Französisch-Polynesien"},
    "app_name": {message: "Hola, besseres Internet"},
    "Update": {message: "Aktualisieren"},
    "MW": {message: "Malawi"},
    "GY": {message: "Guyana"},
    "Unblocker is disabled": {message: "Unblocker deaktiviert"},
    "GQ": {message: "Äquatorialguinea"},
    "PK": {message: "Pakistan"},
    "Number of users that pressed not working": {message: "Anzahl Benutzer, die Funktioniert nicht gedrückt haben"},
    "NF": {message: "Norfolkinsel"},
    "TD": {message: "Tschad"},
    "SO": {message: "Somalia"},
    "BD": {message: "Bangladesch"},
    "HM": {message: "Heard- und McDonald-Inseln"},

};
return E; });