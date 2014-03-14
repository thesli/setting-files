'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Djibouti"},
    "JM": {message: "Jamaica"},
    "AT": {message: "Àustria"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Voleu utilitzar Hola en altres dispositius (Xbox, PS, iPhone...)? Premeu aquí"},
    "SZ": {message: "Swazilàndia"},
    "YT": {message: "Mayotte"},
    "BN": {message: "Brunei"},
    "ZM": {message: "Zàmbia"},
    "app_desc": {message: "Accediu a TOT l'Internet! Aneu a un lloc bloquejat -> premeu la icona d'Hola -> canvieu la bandera del país -> DISFRUTEU!"},
    "Improve translation": {message: "Milloreu la traducció"},
    "more...": {message: "més..."},
    "PR": {message: "Puerto Rico"},
    "SH": {message: "Saint Helena"},
    "There seems to be an error": {message: "Sembla que s'ha produït un error"},
    "MA": {message: "Marroc"},
    "MT": {message: "Malta"},
    "SV": {message: "El Salvador"},
    "MP": {message: "Illes Mariannes del Nord"},
    "Unblocker": {message: "Besbloquejador"},
    "Access any site from any country, free": {message: "Accediu a qualsevol lloc web des de qualsevol país!"},
    "Try to <span>reload</span>": {message: "Proveu de <span>tornar a carregar</span>"},
    "UZ": {message: "Uzbekistan"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Libèria"},
    "TN": {message: "Tunísia"},
    "EE": {message: "Estònia"},
    "CK": {message: "Illes Cook"},
    "BY": {message: "Bielorússia"},
    "NO": {message: "Noruega"},
    "KR": {message: "Corea del Sud"},
    "BF": {message: "Burkina Faso"},
    "AM": {message: "Armènia"},
    "SR": {message: "Surinam"},
    "MG": {message: "Madagascar"},
    "ON": {message: "ACTIU"},
    "BT": {message: "Bhutan"},
    "CF": {message: "República Centreafricana"},
    "AE": {message: "Unió dels Emirats Àrabs"},
    "BA": {message: "Bòsnia i Hercegovina"},
    "TH": {message: "Tailàndia"},
    "Author:": {message: "Autor:"},
    "CC": {message: "Illes Cocos"},
    "NC": {message: "Nova Caledònia"},
    "TO": {message: "Tonga"},
    "SE": {message: "Suècia"},
    "AZ": {message: "Azerbaidjan"},
    "AF": {message: "Afganistan"},
    "NG": {message: "Nigèria"},
    "KE": {message: "Kenya"},
    "BJ": {message: "Benín"},
    "Turn on to get started": {message: "Activa per a començar"},
    "OM": {message: "Oman"},
    "LK": {message: "Sri Lanka"},
    "ID": {message: "Indonèsia"},
    "FM": {message: "Micronèsia"},
    "(some Hola features are not available on your version)": {message: "(algunes funcionalitat d'Hola no estan disponibles amb la vostra versió)"},
    "GM": {message: "Gàmbia"},
    "LV": {message: "Letònia"},
    "RU": {message: "Rússia"},
    "FI": {message: "Finlàndia"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "Obteniu Hola Plus per a un servei sense interrupcions ni publicitat."},
    "LU": {message: "Luxemburg"},
    "VE": {message: "Veneçuela"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "Illes Verges Nord-americanes"},
    "SN": {message: "Senegal"},
    "MX": {message: "Mèxic"},
    "IL": {message: "Israel"},
    "GG": {message: "Guernsey"},
    "Author site:": {message: "Lloc de l'autor:"},
    "DO": {message: "República Dominicana"},
    "HU": {message: "Hongria"},
    "OFF": {message: "DESACTIVAT"},
    "KH": {message: "Cambodja"},
    "TG": {message: "Togo"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola no pot funcionar correctament perquè una altre extensió està controlant la configuració de servidor intermediari. Desactiveu altres extensions que puguin estar controlant aquesta configuració <a>extensions</a> (com ara bloquejadors de publicitat, serveis VPN, etc)."},
    "BB": {message: "Barbados"},
    "JE": {message: "Jersey"},
    "DK": {message: "Dinamarca"},
    "PA": {message: "Panamà"},
    "QA": {message: "Qatar"},
    "CV": {message: "Cap Verd"},
    "Reload": {message: "Torna a carregar"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Quantitat d'usuaris que utilitzen aquesta opció"},
    "MO": {message: "Regió administrativa especial xinesa de Macau"},
    "MF": {message: "Saint Martin"},
    "HR": {message: "Croàcia"},
    "CZ": {message: "República Txeca"},
    "BL": {message: "Saint Barthélemy"},
    "ST": {message: "São Tomé i Príncipe"},
    "AU": {message: "Austràlia"},
    "IR": {message: "Iran"},
    "CG": {message: "Congo"},
    "BI": {message: "Burundi"},
    "GW": {message: "Guinea Bissau"},
    "MK": {message: "Macedònia"},
    "GR": {message: "Grècia"},
    "AG": {message: "Antigua i Barbuda"},
    "AI": {message: "Anguilla"},
    "AN": {message: "Antilles Neerlandeses"},
    "UA": {message: "Ucraïna"},
    "EH": {message: "Sàhara Occidental"},
    "KN": {message: "Saint Christopher i Nevis"},
    "SC": {message: "Seychelles"},
    "NL": {message: "Països Baixos"},
    "MS": {message: "Montserrat"},
    "HK": {message: "Regió administrativa especial xinesa de Hong Kong"},
    "EC": {message: "Equador"},
    "MY": {message: "Malàisia"},
    "CR": {message: "Costa Rica"},
    "VA": {message: "Vaticà"},
    "IO": {message: "Territori Britànic de l'Oceà Índic"},
    "RS": {message: "Sèrbia"},
    "SD": {message: "Sudan"},
    "CN": {message: "Xina"},
    "UY": {message: "Uruguai"},
    "PY": {message: "Paraguai"},
    "MU": {message: "Maurici"},
    "CH": {message: "Suïssa"},
    "LI": {message: "Liechtenstein"},
    "GH": {message: "Ghana"},
    "KG": {message: "Kirguizistan"},
    "NU": {message: "Niue"},
    "PE": {message: "Perú"},
    "US": {message: "Estats Units"},
    "SL": {message: "Sierra Leone"},
    "FJ": {message: "Fiji"},
    "ER": {message: "Eritrea"},
    "IQ": {message: "Iraq"},
    "AS": {message: "Samoa Americana"},
    "TZ": {message: "Tanzània"},
    "LY": {message: "Líbia"},
    "GT": {message: "Guatemala"},
    "BM": {message: "Bermudes"},
    "BV": {message: "Illa Bouvet"},
    "LT": {message: "Lituània"},
    "SG": {message: "Singapur"},
    "PM": {message: "Saint Pierre i Miquelon"},
    "Initializing...": {message: "Initializing..."},
    "TT": {message: "Trinitat i Tobago"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola no funciona bé en mode Windows 8. Si us plau, canvieu al mode escriptori. <a>Instruccions</a>"},
    "SY": {message: "Síria"},
    "SK": {message: "Eslovàquia"},
    "GL": {message: "Grenlàndia"},
    "PG": {message: "Papua Nova Guinea"},
    "KI": {message: "Kiribati"},
    "CD": {message: "República Democràtica del Congo"},
    "AO": {message: "Angola"},
    "BW": {message: "Botswana"},
    "ZW": {message: "Zimbabwe"},
    "VC": {message: "Saint Vincent i les Grenadines"},
    "JP": {message: "Japó"},
    "NA": {message: "Namíbia"},
    "TJ": {message: "Tadjikistan"},
    "LC": {message: "Saint Lucia"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongòlia"},
    "Hola site list": {message: "Llista de llocs a desbloquejar"},
    "IT": {message: "Itàlia"},
    "RE": {message: "Illa de la Reunió"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Activa"},
    "Loading": {message: "Loading"},
    "EG": {message: "Egipte"},
    "FR": {message: "França"},
    "start": {message: "comença"},
    "RW": {message: "Rwanda"},
    "BE": {message: "Bèlgica"},
    "UM": {message: "Illes Perifèriques Menors dels EUA"},
    "Accelerator": {message: "Accelerador"},
    "SA": {message: "Aràbia Saudita"},
    "LS": {message: "Lesotho"},
    "ZA": {message: "República de Sud-àfrica"},
    "PT": {message: "Portugal"},
    "CA": {message: "Canadà"},
    "Starting...": {message: "començant..."},
    "CM": {message: "Camerun"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "La versió gratuita d'Hola s'ha de tornar a activar cada 4 hores i és patrocinada amb publicitat."},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepal"},
    "PL": {message: "Polònia"},
    "GA": {message: "Gabon"},
    "TM": {message: "Turkmenistan"},
    "KY": {message: "Illes Caiman"},
    "Verify you have Internet": {message: "Comproveu que estigueu connectat a Internet"},
    "LA": {message: "Laos"},
    "PH": {message: "Filipines"},
    "NI": {message: "Nicaragua"},
    "GU": {message: "Guam"},
    "TF": {message: "Territoris Francesos del Sud"},
    "KZ": {message: "Kazakhstan"},
    "SJ": {message: "Svalbard i Jan Mayen"},
    "MM": {message: "Myanmar"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominica"},
    "NE": {message: "Níger"},
    "AD": {message: "Andorra"},
    "MR": {message: "Mauritània"},
    "changing...": {message: "s'està canviant..."},
    "GS": {message: "Illes Geòrgia del Sud i Sandwich del Sud"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Esteu utilitzant una versió molt antiga del Chrome, <a>actualitzeu</a> el Chrome per a utilitzar Hola"},
    "ME": {message: "Montenegro"},
    "AX": {message: "Illes Åland"},
    "VG": {message: "Illes Verges Britàniques"},
    "VN": {message: "Vietnam"},
    "CI": {message: "Costa d’Ivori"},
    "DZ": {message: "Algèria"},
    "YE": {message: "Iemen"},
    "GE": {message: "Geòrgia"},
    "CX": {message: "Illa Christmas"},
    "LB": {message: "Líban"},
    "FK": {message: "Illes Malvines"},
    "DE": {message: "Alemanya"},
    "even more...": {message: "encara més..."},
    "MV": {message: "Maldives"},
    "PN": {message: "Illes Pitcairn"},
    "BH": {message: "Bahrain"},
    "GI": {message: "Gibraltar"},
    "RO": {message: "Romania"},
    "WF": {message: "Wallis i Futuna"},
    "AR": {message: "Argentina"},
    "GP": {message: "Guadeloupe"},
    "IN": {message: "Índia"},
    "AW": {message: "Aruba"},
    "FO": {message: "Illes Fèroe"},
    "CS": {message: "Sèrbia i Montenegro"},
    "BR": {message: "Brasil"},
    "HN": {message: "Hondures"},
    "MC": {message: "Mònaco"},
    "Translate to your language": {message: "Traduïu a la vostra llengua"},
    "SB": {message: "Illes Salomó"},
    "NZ": {message: "Nova Zelanda"},
    "PS": {message: "Palestina"},
    "UG": {message: "Uganda"},
    "GB": {message: "Regne Unit"},
    "HT": {message: "Haití"},
    "GF": {message: "Guaiana Francesa"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Versió antiga del Firefox. Premeu <a>aquí</a> per a actualitzar-lo."},
    "ZZ": {message: "Regió desconeguda o no vàlida"},
    "KM": {message: "Comores"},
    "KW": {message: "Kuwait"},
    "TC": {message: "Illes Turks i Caicos"},
    "MQ": {message: "Martinica"},
    "ES": {message: "Espanya"},
    "MZ": {message: "Moçambic"},
    "BO": {message: "Bolívia"},
    "AL": {message: "Albània"},
    "MD": {message: "Moldàvia"},
    "TR": {message: "Turquia"},
    "GN": {message: "Guinea"},
    "SI": {message: "Eslovènia"},
    "CO": {message: "Colòmbia"},
    "Settings": {message: "Configuració"},
    "AQ": {message: "Antàrtida"},
    "JO": {message: "Jordània"},
    "SM": {message: "San Marino"},
    "CU": {message: "Cuba"},
    "CL": {message: "Xile"},
    "ML": {message: "Mali"},
    "ET": {message: "Etiòpia"},
    "IS": {message: "Islàndia"},
    "Reload Hola": {message: "Torna a carregar Hola"},
    "back to": {message: "torna a"},
    "MH": {message: "Illes Marshall"},
    "BG": {message: "Bulgària"},
    "BS": {message: "Bahames"},
    "TL": {message: "Timor Oriental"},
    "BZ": {message: "Belize"},
    "CY": {message: "Xipre"},
    "IM": {message: "Illa de Man"},
    "IE": {message: "Irlanda"},
    "Get help from engineer over skype:": {message: "Obteniu ajuda d'un enginyer via Skype:"},
    "TW": {message: "Taiwan"},
    "KP": {message: "Corea del Nord"},
    "PF": {message: "Polinèsia Francesa"},
    "app_name": {message: "Hola Internet millor"},
    "Update": {message: "Actualitza"},
    "MW": {message: "Malawi"},
    "GY": {message: "Guyana"},
    "Unblocker is disabled": {message: "El desbloquejador està desactivat"},
    "PK": {message: "Pakistan"},
    "GQ": {message: "Guinea Equatorial"},
    "Number of users that pressed not working": {message: "Quantitat d'usuaris que han indicat que no els funciona"},
    "NF": {message: "Illa Norfolk"},
    "TD": {message: "Txad"},
    "SO": {message: "Somàlia"},
    "BD": {message: "Bangla Desh"},
    "HM": {message: "Illa Heard i Illes McDonald"},

};
return E; });