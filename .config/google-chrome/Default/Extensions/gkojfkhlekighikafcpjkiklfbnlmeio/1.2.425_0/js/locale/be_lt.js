'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "Džibutis"},
    "JM": {message: "Jamaika"},
    "AT": {message: "Austrija"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "Norite gauti Hola kituose prietaisuose? (Xbox, PS, \"Apple TV\", \"iPhone\" ...). Spauskite čia"},
    "SZ": {message: "Svazilendas"},
    "YT": {message: "Mayotte’as"},
    "BN": {message: "Brunėjus"},
    "ZM": {message: "Zambija"},
    "app_desc": {message: "Priėjimas prie viso interneto! Įeikite į užblokuotą svetainę -> spustelėkite Hola piktograma -> Pakeiskite šalies vėliavą -> MĖGAUKITĖS!"},
    "Improve translation": {message: "Pagerinti vertimą"},
    "more...": {message: "daugiau ..."},
    "PR": {message: "Puerto Rikas"},
    "SH": {message: "Šventoji Elena"},
    "There seems to be an error": {message: "Atrodo, kad atsitiko klaida"},
    "MA": {message: "Marokas"},
    "SV": {message: "Salvadoras"},
    "MT": {message: "Malta"},
    "MP": {message: "Marianos šiaurinės salos"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "Prisijunkite prie bet kokios svetainę iš bet kurios šalies, nemokamai"},
    "Try to <span>reload</span>": {message: "Pabandykite <span> perkrauti </span>"},
    "UZ": {message: "Uzbekistanas"},
    "PW": {message: "Palau"},
    "TK": {message: "Tokelau"},
    "LR": {message: "Liberija"},
    "TN": {message: "Tunisas"},
    "EE": {message: "Estija"},
    "CK": {message: "Kuko salos"},
    "BY": {message: "Baltarusija"},
    "KR": {message: "Pietų Korėja"},
    "NO": {message: "Norvegija"},
    "BF": {message: "Burkina Fasas"},
    "AM": {message: "Armėnija"},
    "SR": {message: "Surinamas"},
    "MG": {message: "Madagaskaras"},
    "ON": {message: "Įjungta"},
    "BT": {message: "Butanas"},
    "CF": {message: "Centrinės Afrikos Respublika"},
    "AE": {message: "Jungtiniai Arabų Emyratai"},
    "BA": {message: "Bosnija ir Hercegovina"},
    "TH": {message: "Tailandas"},
    "Author:": {message: "Autorius:"},
    "CC": {message: "Kokosų salos"},
    "NC": {message: "Naujoji Kaledonija"},
    "TO": {message: "Tonga"},
    "SE": {message: "Švedija"},
    "AZ": {message: "Azerbaidžanas"},
    "AF": {message: "Afganistanas"},
    "NG": {message: "Nigerija"},
    "KE": {message: "Kenija"},
    "BJ": {message: "Beninas"},
    "Turn on to get started": {message: "Įjunkite, jei norite pradėti"},
    "OM": {message: "Omanas"},
    "LK": {message: "Šri Lanka"},
    "ID": {message: "Indonezija"},
    "FM": {message: "Mikronezija"},
    "(some Hola features are not available on your version)": {message: "(Kai kurios Hola funkcijos yra neprieinamos jūsų versijoje)"},
    "GM": {message: "Gambija"},
    "LV": {message: "Latvija"},
    "RU": {message: "Rusijos Federacija"},
    "FI": {message: "Suomija"},
    "LU": {message: "Liuksemburgas"},
    "VE": {message: "Venesuela"},
    "TV": {message: "Tuvalu"},
    "VI": {message: "Mergelių salos (JAV)"},
    "SN": {message: "Senegalas"},
    "MX": {message: "Meksika"},
    "IL": {message: "Izraelis"},
    "GG": {message: "Guernsis"},
    "Author site:": {message: "Autoriaus svetainė:"},
    "HU": {message: "Vengrija"},
    "DO": {message: "Dominikos Respublika"},
    "OFF": {message: "Išjungta"},
    "KH": {message: "Kambodža"},
    "TG": {message: "Togas"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola negali tinkamai veikti, nes kitas plėtinys kontroliuoja jūsų proxy nustatymus. Prašome išjungti kitus plėtinius, kurie jūsų manymu, gali kontroliuoti jūsų proxy nustatymus <a> plėtiniuose </a> (pvz., Ad-Blocker, kitos VPN paslaugos ir pan.)"},
    "BB": {message: "Barbadosas"},
    "JE": {message: "Džersis"},
    "DK": {message: "Danija"},
    "PA": {message: "Panama"},
    "CV": {message: "Žaliasis Kyšulys"},
    "QA": {message: "Kataras"},
    "Reload": {message: "Perkrauti"},
    "GD": {message: "Grenada"},
    "Number of users that use this option": {message: "Vartotojų skaičius, kurie naudoja šią parinktį,"},
    "MO": {message: "Macao"},
    "MF": {message: "Saint-Martin"},
    "HR": {message: "Kroatija"},
    "CZ": {message: "Čekija"},
    "BL": {message: "Švento Baltramiejaus sala"},
    "ST": {message: "San Tomė ir Principė"},
    "AU": {message: "Australija"},
    "IR": {message: "Iranas"},
    "CG": {message: "Kongas"},
    "GW": {message: "Bisau Gvinėja"},
    "BI": {message: "Burundis"},
    "MK": {message: "Makedonija"},
    "GR": {message: "Graikija"},
    "AG": {message: "Antigva ir Barbuda"},
    "AI": {message: "Angilija"},
    "AN": {message: "Olandijos Antilai"},
    "UA": {message: "Ukraina"},
    "EH": {message: "Vakarų Sachara"},
    "KN": {message: "Sent Kitsas ir Nevis"},
    "SC": {message: "Seišeliai"},
    "NL": {message: "Nyderlandai"},
    "MS": {message: "Montserratas"},
    "EC": {message: "Ekvadoras"},
    "HK": {message: "Kinijos S.A.R.Honkongas"},
    "MY": {message: "Malaizija"},
    "CR": {message: "Kosta Rika"},
    "VA": {message: "Vatikanas"},
    "IO": {message: "Indijos vandenyno britų sritis"},
    "SD": {message: "Sudanas"},
    "RS": {message: "Serbija"},
    "CN": {message: "Kinija"},
    "UY": {message: "Urugvajus"},
    "PY": {message: "Paragvajus"},
    "MU": {message: "Mauricijus"},
    "CH": {message: "Šveicarija"},
    "LI": {message: "Lichtenšteinas"},
    "GH": {message: "Gana"},
    "KG": {message: "Kirgiztanas"},
    "NU": {message: "Niue"},
    "PE": {message: "Peru"},
    "US": {message: "Jungtinės Valstijos"},
    "SL": {message: "Siera Leonė"},
    "FJ": {message: "Fidžis"},
    "ER": {message: "Eritrėja"},
    "IQ": {message: "Irakas"},
    "AS": {message: "Amerikos Samoa"},
    "TZ": {message: "Tanzanija"},
    "LY": {message: "Libija"},
    "GT": {message: "Gvatemala"},
    "BM": {message: "Bermuda"},
    "BV": {message: "Bouvet sala"},
    "LT": {message: "Lietuva"},
    "SG": {message: "Singapūras"},
    "PM": {message: "Sen Pjeras ir Mikelonas"},
    "Initializing...": {message: "Inicijuojama ..."},
    "TT": {message: "Trinidadas ir Tobagas"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola gali netinkamai veikti \"Windows 8\" režime. Prašome įjungti darbalaukio režimą. Spauskite <a> čia </a> kad gautumėte instrukcijas"},
    "SK": {message: "Slovakija"},
    "SY": {message: "Sirija"},
    "GL": {message: "Grenlandija"},
    "PG": {message: "Papua Naujoji Gvinėja"},
    "KI": {message: "Kiribatis"},
    "CD": {message: "Kongo Demokratinė Respublika"},
    "AO": {message: "Angola"},
    "BW": {message: "Botsvana"},
    "ZW": {message: "Zimbabvė"},
    "VC": {message: "Šventasis Vincentas ir Grenadinai"},
    "JP": {message: "Japonija"},
    "NA": {message: "Namibija"},
    "TJ": {message: "Tadžikistanas"},
    "LC": {message: "Šventoji Liucija"},
    "VU": {message: "Vanuatu"},
    "MN": {message: "Mongolija"},
    "Hola site list": {message: "Hola svetainių sąrašas"},
    "IT": {message: "Italija"},
    "RE": {message: "Reunionas"},
    "WS": {message: "Samoa"},
    "Enable": {message: "Leisti"},
    "Loading": {message: "Kraunama"},
    "EG": {message: "Egiptas"},
    "FR": {message: "Prancūzija"},
    "start": {message: "pradėti"},
    "RW": {message: "Ruanda"},
    "BE": {message: "Belgija"},
    "UM": {message: "Jungtinių Valstijų mažosios aplinkinės salos"},
    "Accelerator": {message: "Greitintuvas"},
    "LS": {message: "Lesotas"},
    "SA": {message: "Saudo Arabija"},
    "ZA": {message: "Pietų Afrika"},
    "PT": {message: "Portugalija"},
    "CA": {message: "Kanada"},
    "Starting...": {message: "Pradedama ..."},
    "CM": {message: "Kamerūnas"},
    "The free version of Hola needs to be re-enabled every 4 hours and is sponsored by ads.": {message: "Nemokamą Hola versiją reikia išnaujo įjungti kas 4 valandas ir yra remiama reklamų."},
    "Hola": {message: "Hola"},
    "NP": {message: "Nepalas"},
    "PL": {message: "Lenkija"},
    "GA": {message: "Gabonas"},
    "TM": {message: "Turkmėnistanas"},
    "KY": {message: "Kaimanų salos"},
    "Verify you have Internet": {message: "Patikrinkite, ar turite interneto prieigą"},
    "LA": {message: "Laosas"},
    "PH": {message: "Filipinai"},
    "NI": {message: "Nikaragva"},
    "GU": {message: "Guamas"},
    "TF": {message: "Prancūzijos Pietų sritys"},
    "KZ": {message: "Kazachstanas"},
    "SJ": {message: "Svalbardo ir Jan Majen salos"},
    "MM": {message: "Mianmaras"},
    "NR": {message: "Nauru"},
    "DM": {message: "Dominika"},
    "NE": {message: "Nigeris"},
    "AD": {message: "Andora"},
    "MR": {message: "Mauritanija"},
    "changing...": {message: "keičiasi ..."},
    "GS": {message: "Pietų Džordžija ir Pietų Sandvičo salos"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "Labai sena Chrome versija, <a> atnaujinkite </a>, kad galėtumėte naudoti Hola"},
    "ME": {message: "Juodkalnija"},
    "AX": {message: "Alandų salos"},
    "VG": {message: "Didžiosios Britanijos Mergelių salos"},
    "VN": {message: "Vietnamas"},
    "CI": {message: "Dramblio Kaulo Krantas"},
    "DZ": {message: "Alžyras"},
    "YE": {message: "Jemenas"},
    "GE": {message: "Gruzija"},
    "CX": {message: "Kalėdų sala"},
    "LB": {message: "Libanas"},
    "FK": {message: "Falklando salos"},
    "DE": {message: "Vokietija"},
    "even more...": {message: "dar daugiau ..."},
    "MV": {message: "Maldivai"},
    "PN": {message: "Pitkernas"},
    "BH": {message: "Bahreinas"},
    "GI": {message: "Gibraltaras"},
    "RO": {message: "Rumunija"},
    "WF": {message: "Wallisas ir Futuna"},
    "AR": {message: "Argentina"},
    "GP": {message: "Gvadelupė"},
    "IN": {message: "Indija"},
    "FO": {message: "Farerų salos"},
    "AW": {message: "Aruba"},
    "CS": {message: "Serbija ir Juodkalnija"},
    "BR": {message: "Brazilija"},
    "HN": {message: "Hondūras"},
    "MC": {message: "Monakas"},
    "Translate to your language": {message: "Versti į jūsų kalbą"},
    "SB": {message: "Saliamono salos"},
    "NZ": {message: "Naujoji Zelandija"},
    "PS": {message: "Palestinos teritorija"},
    "UG": {message: "Uganda"},
    "GB": {message: "Didžioji Britanija"},
    "HT": {message: "Haitis"},
    "GF": {message: "Prancūzijos Gviana"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "Sena  Firefox versija. Paspauskite <a> čia </a>, kad atnaujintumėte."},
    "ZZ": {message: "Nežinoma ar neteisinga sritis"},
    "KM": {message: "Komorai"},
    "KW": {message: "Kuveitas"},
    "MQ": {message: "Martinika"},
    "TC": {message: "Turkso ir Caicoso salos"},
    "ES": {message: "Ispanija"},
    "MZ": {message: "Mozambikas"},
    "BO": {message: "Bolivija"},
    "AL": {message: "Albanija"},
    "MD": {message: "Moldova"},
    "TR": {message: "Turkija"},
    "GN": {message: "Gvinėja"},
    "CO": {message: "Kolumbija"},
    "SI": {message: "Slovėnija"},
    "Settings": {message: "Nustatymai"},
    "AQ": {message: "Antarktis"},
    "JO": {message: "Jordanija"},
    "SM": {message: "San Marinas"},
    "CU": {message: "Kuba"},
    "CL": {message: "Čilė"},
    "Get 24/7 Unblocking": {message: "Gaukite 24/7 Atblokavimą"},
    "ML": {message: "Malis"},
    "ET": {message: "Etiopija"},
    "IS": {message: "Islandija"},
    "Reload Hola": {message: "Perkrauti Hola"},
    "back to": {message: "atgal į"},
    "BG": {message: "Bulgarija"},
    "MH": {message: "Maršalo Salos"},
    "BS": {message: "Bahamos"},
    "TL": {message: "Rytų Timoras"},
    "BZ": {message: "Belizas"},
    "CY": {message: "Kipras"},
    "IM": {message: "Meino sala"},
    "IE": {message: "Airija"},
    "Get help from engineer over skype:": {message: "Gaukite pagalbos iš inžinieriaus per skype:"},
    "TW": {message: "Taivanas"},
    "KP": {message: "Šiaurės Korėja"},
    "PF": {message: "Prancūzų Polinezija"},
    "app_name": {message: "Hola geresnis internetas"},
    "Update": {message: "Atnaujinti"},
    "MW": {message: "Malavis"},
    "GY": {message: "Gajana"},
    "Unblocker is disabled": {message: "Unblocker yra išjungtas"},
    "GQ": {message: "Pusiaujo Gvinėja"},
    "PK": {message: "Pakistanas"},
    "Number of users that pressed not working": {message: "Vartotojų skaičius, kurie paspaudė \"Neveikia\""},
    "NF": {message: "Norfolko sala"},
    "TD": {message: "Čadas"},
    "SO": {message: "Somalis"},
    "BD": {message: "Bangladešas"},
    "HM": {message: "Heardo ir McDonaldo Salų Sritis"},

};
return E; });