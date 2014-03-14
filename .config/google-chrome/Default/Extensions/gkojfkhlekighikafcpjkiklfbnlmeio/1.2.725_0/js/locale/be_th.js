'use strict'; /*jshint -W100, browser:true, es5:true*/
define(function(){
var E = {
    "DJ": {message: "จิบูตี"},
    "JM": {message: "จาเมกา"},
    "AT": {message: "ออสเตรีย"},
    "Want Hola on other devices? (Xbox, PS, Apple TV, iPhone...). Click here": {message: "ต้องการ Hola บนอุปกรณ์อื่น ๆ ? (Xbox, PS, Apple TV, iPhone ... ) คลิกที่นี่"},
    "SZ": {message: "สวาซิแลนด์"},
    "YT": {message: "มายอต"},
    "BN": {message: "บรูไน"},
    "ZM": {message: "แซมเบีย"},
    "app_desc": {message: "เข้าถึงทั้งหมดของอินเทอร์เน็ต! ไปยังหน้าเว็บไซต์ที่ถูกบล็อก -> คลิกที่ไอคอน Hola -> ธงเปลี่ยนประเทศ -> ENJOY!"},
    "Improve translation": {message: "ปรับปรุงการแปล"},
    "more...": {message: "รายละเอียดเพิ่มเติม ..."},
    "PR": {message: "เปอร์โตริโก"},
    "SH": {message: "เซนต์เฮเลนา"},
    "There seems to be an error": {message: "ดูเหมือนจะมีข้อผิดพลาด"},
    "MA": {message: "โมร็อกโก"},
    "SV": {message: "เอลซัลวาดอร์"},
    "MT": {message: "มอลตา"},
    "MP": {message: "หมู่เกาะนอร์เทิร์นมาเรียนา"},
    "Unblocker": {message: "Unblocker"},
    "Access any site from any country, free": {message: "เข้าถึงเว็บไซต์จากประเทศใด ๆ , ฟรี,"},
    "Try to <span>reload</span>": {message: "<span> พยายามที่จะโหลด </span>"},
    "UZ": {message: "อุซเบกิสถาน"},
    "PW": {message: "ปาเลา"},
    "LR": {message: "ไลบีเรีย"},
    "TK": {message: "โตเกเลา"},
    "TN": {message: "ตูนิเซีย"},
    "EE": {message: "เอสโตเนีย"},
    "CK": {message: "หมู่เกาะคุก"},
    "BY": {message: "เบลารุส"},
    "KR": {message: "เกาหลีใต้"},
    "NO": {message: "นอร์เวย์"},
    "BF": {message: "บูร์กินาฟาโซ"},
    "AM": {message: "อาร์เมเนีย"},
    "MG": {message: "มาดากัสการ์"},
    "SR": {message: "ซูรินาเม"},
    "ON": {message: "ON"},
    "BT": {message: "ภูฏาน"},
    "CF": {message: "สาธารณรัฐแอฟริกากลาง"},
    "AE": {message: "สหรัฐอาหรับเอมิเรตส์"},
    "BA": {message: "บอสเนียและเฮอร์เซโกวีนา"},
    "TH": {message: "ไทย"},
    "Author:": {message: "ผู้เขียนหัวข้อ:"},
    "CC": {message: "หมู่เกาะโคโคส"},
    "NC": {message: "นิวแคลิโดเนีย"},
    "TO": {message: "ตองกา"},
    "SE": {message: "สวีเดน"},
    "AZ": {message: "อาเซอร์ไบจาน"},
    "AF": {message: "อัฟกานิสถาน"},
    "NG": {message: "ไนจีเรีย"},
    "BJ": {message: "เบนิน"},
    "KE": {message: "เคนยา"},
    "Turn on to get started": {message: "เปิดการเริ่มต้น"},
    "OM": {message: "โอมาน"},
    "LK": {message: "ศรีลังกา"},
    "ID": {message: "อินโดนีเซีย"},
    "FM": {message: "ไมโครนีเซีย"},
    "(some Hola features are not available on your version)": {message: "(บางคุณสมบัติ Hola ไม่สามารถใช้ได้กับรุ่นของคุณ)"},
    "GM": {message: "แกมเบีย"},
    "LV": {message: "ลัตเวีย"},
    "RU": {message: "รัสเซีย"},
    "FI": {message: "ฟินแลนด์"},
    "Get Hola Plus for un-interrupted, ad-free service.": {message: "รับ Hola พลัสสำหรับการยกเลิกการขัดจังหวะบริการโฆษณาฟรี"},
    "LU": {message: "ลักเซมเบิร์ก"},
    "VE": {message: "เวเนซุเอลา"},
    "VI": {message: "หมู่เกาะยูเอสเวอร์จิน"},
    "TV": {message: "ตูวาลู"},
    "MX": {message: "เม็กซิโก"},
    "SN": {message: "เซเนกัล"},
    "GG": {message: "เกิร์นซีย์"},
    "IL": {message: "อิสราเอล"},
    "Author site:": {message: "เว็บไซต์ผู้เขียนหัวข้อ:"},
    "HU": {message: "ฮังการี"},
    "DO": {message: "สาธารณรัฐโดมินิกัน"},
    "OFF": {message: "OFF"},
    "KH": {message: "กัมพูชา"},
    "TG": {message: "โตโก"},
    "Hola cannot work properly because another extension is controlling your proxy settings. Please disable other extensions that you think might control your proxy settings in <a>extensions</a> (such as ad-blockers, other VPN services, etc.).": {message: "Hola ไม่สามารถทำงานได้อย่างถูกต้องเพราะการขยายอีกคือการควบคุมการตั้งค่าพร็อกซี่ของคุณ โปรดปิดใช้งานส่วนขยายที่อื่น ๆ ที่คุณคิดว่าอาจจะควบคุมการตั้งค่าพร็อกซี่ของคุณใน <a> การขยาย </a> (เช่นโฆษณา-blockers, บริการ VPN อื่น ๆ ฯลฯ )"},
    "BB": {message: "บาร์เบโดส"},
    "JE": {message: "เจอร์ซีย์"},
    "DK": {message: "เดนมาร์ก"},
    "PA": {message: "ปานามา"},
    "CV": {message: "เคปเวิร์ด"},
    "QA": {message: "กาตาร์"},
    "Reload": {message: "โหลด"},
    "GD": {message: "เกรเนดา"},
    "Number of users that use this option": {message: "จำนวนของผู้ใช้ที่ใช้ตัวเลือกนี้"},
    "MO": {message: "มาเก๊า เขตปกครองพิเศษประเทศจีน"},
    "MF": {message: "เซนต์มาติน"},
    "HR": {message: "โครเอเชีย"},
    "CZ": {message: "สาธารณรัฐเช็ก"},
    "BL": {message: "เซนต์บาร์เธเลมี"},
    "ST": {message: "เซาตูเมและปรินซิปี"},
    "AU": {message: "ออสเตรเลีย"},
    "IR": {message: "อิหร่าน"},
    "CG": {message: "คองโก-บราซซาวิล"},
    "GW": {message: "กินี-บิสเซา"},
    "BI": {message: "บุรุนดี"},
    "MK": {message: "มาซิโดเนีย"},
    "GR": {message: "กรีซ"},
    "AG": {message: "แอนติกาและบาร์บูดา"},
    "AI": {message: "แองกวิลลา"},
    "AN": {message: "เนเธอร์แลนด์แอนทิลลิส"},
    "UA": {message: "ยูเครน"},
    "EH": {message: "ซาฮาราตะวันตก"},
    "KN": {message: "เซนต์คิตส์และเนวิส"},
    "SC": {message: "เซเชลส์"},
    "NL": {message: "เนเธอร์แลนด์"},
    "MS": {message: "มอนต์เซอร์รัต"},
    "EC": {message: "เอกวาดอร์"},
    "HK": {message: "ฮ่องกง เขตปกครองพิเศษประเทศจีน"},
    "MY": {message: "มาเลเซีย"},
    "CR": {message: "คอสตาริกา"},
    "VA": {message: "วาติกัน"},
    "IO": {message: "บริติชอินเดียนโอเชียนเทร์ริทอรี"},
    "RS": {message: "เซอร์เบีย"},
    "SD": {message: "ซูดาน"},
    "CN": {message: "จีน"},
    "UY": {message: "อุรุกวัย"},
    "PY": {message: "ปารากวัย"},
    "MU": {message: "มอริเชียส"},
    "LI": {message: "ลิกเตนสไตน์"},
    "CH": {message: "สวิตเซอร์แลนด์"},
    "KG": {message: "คีร์กีซสถาน"},
    "GH": {message: "กานา"},
    "NU": {message: "นีอูเอ"},
    "PE": {message: "เปรู"},
    "US": {message: "สหรัฐอเมริกา"},
    "SL": {message: "เซียร์ราลีโอน"},
    "FJ": {message: "ฟิจิ"},
    "ER": {message: "เอริเทรีย"},
    "IQ": {message: "อิรัก"},
    "AS": {message: "อเมริกันซามัว"},
    "TZ": {message: "แทนซาเนีย"},
    "LY": {message: "ลิเบีย"},
    "GT": {message: "กัวเตมาลา"},
    "BM": {message: "เบอร์มิวดา"},
    "BV": {message: "เกาะบูเวต"},
    "LT": {message: "ลิทัวเนีย"},
    "PM": {message: "แซงปีแยร์และมีเกอลง"},
    "SG": {message: "สิงคโปร์"},
    "Initializing...": {message: "เริ่มต้น ..."},
    "TT": {message: "ตรินิแดดและโตเบโก"},
    "Hola does not work well in Windows 8 mode. Please switch to desktop mode. Click <a>here</a> for instructions": {message: "Hola ไม่ทำงานได้ดีใน Windows 8 โหมด กรุณาสลับไปยังโหมดสก์ท็อป คลิกที่ <a> นี่ </a> สำหรับคำแนะนำ"},
    "SY": {message: "ซีเรีย"},
    "SK": {message: "สโลวะเกีย"},
    "GL": {message: "กรีนแลนด์"},
    "PG": {message: "ปาปัวนิวกินี"},
    "KI": {message: "คิริบาส"},
    "CD": {message: "คองโก-กินชาซา"},
    "BW": {message: "บอตสวานา"},
    "AO": {message: "แองโกลา"},
    "ZW": {message: "ซิมบับเว"},
    "VC": {message: "เซนต์วินเซนต์และเกรนาดีนส์"},
    "JP": {message: "ญี่ปุ่น"},
    "NA": {message: "นามิเบีย"},
    "TJ": {message: "ทาจิกิสถาน"},
    "LC": {message: "เซนต์ลูเซีย"},
    "VU": {message: "วานูอาตู"},
    "MN": {message: "มองโกเลีย"},
    "Hola site list": {message: "รายการเว็บไซต์ Hola"},
    "IT": {message: "อิตาลี"},
    "RE": {message: "เรอูนียง"},
    "WS": {message: "ซามัว"},
    "Enable": {message: "เปิดใช้งาน"},
    "Loading": {message: "กำลังโหลด"},
    "FR": {message: "ฝรั่งเศส"},
    "EG": {message: "อียิปต์"},
    "start": {message: "เริ่มต้น"},
    "RW": {message: "รวันดา"},
    "UM": {message: "หมู่เกาะสหรัฐไมเนอร์เอาต์ไลอิง"},
    "BE": {message: "เบลเยียม"},
    "Accelerator": {message: "คันเร่ง"},
    "SA": {message: "ซาอุดีอาระเบีย"},
    "LS": {message: "เลโซโท"},
    "ZA": {message: "แอฟริกาใต้"},
    "PT": {message: "โปรตุเกส"},
    "CA": {message: "แคนาดา"},
    "Starting...": {message: "เริ่มต้น ..."},
    "CM": {message: "แคเมอรูน"},
    "Hola": {message: "Hola"},
    "NP": {message: "เนปาล"},
    "PL": {message: "โปแลนด์"},
    "GA": {message: "กาบอง"},
    "TM": {message: "เติร์กเมนิสถาน"},
    "KY": {message: "หมู่เกาะเคย์แมน"},
    "LA": {message: "ลาว"},
    "PH": {message: "ฟิลิปปินส์"},
    "NI": {message: "นิการากัว"},
    "GU": {message: "กวม"},
    "TF": {message: "เฟรนช์เซาเทิร์นเทร์ริทอรีส์"},
    "KZ": {message: "คาซัคสถาน"},
    "SJ": {message: "สฟาลบาร์และยานไมเอน"},
    "MM": {message: "พม่า"},
    "NR": {message: "นาอูรู"},
    "DM": {message: "โดมินิกา"},
    "NE": {message: "ไนเจอร์"},
    "MR": {message: "มอริเตเนีย"},
    "AD": {message: "อันดอร์รา"},
    "changing...": {message: "การเปลี่ยนแปลง ..."},
    "GS": {message: "เกาะเซาท์จอร์เจียและหมู่เกาะเซาท์แซนด์วิช"},
    "Very old version of Chrome, <a>update</a> Chrome to use Hola": {message: "รุ่นเก่ามากของ Chrome, <a> ปรับปรุง </a> Chrome เพื่อใช้ Hola"},
    "ME": {message: "มอนเตเนโกร"},
    "AX": {message: "หมู่เกาะโอลันด์"},
    "VG": {message: "หมู่เกาะบริติชเวอร์จิน"},
    "VN": {message: "เวียดนาม"},
    "YE": {message: "เยเมน"},
    "DZ": {message: "แอลจีเรีย"},
    "CI": {message: "ไอวอรี่โคสต์"},
    "GE": {message: "จอร์เจีย"},
    "CX": {message: "เกาะคริสต์มาส"},
    "LB": {message: "เลบานอน"},
    "FK": {message: "หมู่เกาะฟอล์กแลนด์"},
    "DE": {message: "เยอรมนี"},
    "even more...": {message: "มากยิ่งขึ้น ..."},
    "MV": {message: "มัลดีฟส์"},
    "PN": {message: "พิตแคร์น"},
    "BH": {message: "บาห์เรน"},
    "GI": {message: "ยิบรอลตาร์"},
    "WF": {message: "วาลลิสและฟุตูนา"},
    "RO": {message: "โรมาเนีย"},
    "GP": {message: "กวาเดอลูป"},
    "AR": {message: "อาร์เจนตินา"},
    "IN": {message: "อินเดีย"},
    "FO": {message: "หมู่เกาะแฟโร"},
    "AW": {message: "อารูบา"},
    "CS": {message: "เซอร์เบียและมอนเตเนโกร"},
    "BR": {message: "บราซิล"},
    "HN": {message: "ฮอนดูรัส"},
    "MC": {message: "โมนาโก"},
    "Translate to your language": {message: "แปลเป็​​นภาษาของคุณ"},
    "SB": {message: "หมู่เกาะโซโลมอน"},
    "NZ": {message: "นิวซีแลนด์"},
    "PS": {message: "ปาเลสไตน์"},
    "UG": {message: "ยูกันดา"},
    "GB": {message: "สหราชอาณาจักร"},
    "HT": {message: "เฮติ"},
    "GF": {message: "เฟรนช์เกียนา"},
    "Old version of Firefox. Press <a>here</a> to upgrade.": {message: "รุ่นเก่าของ Firefox กด <a> ที่นี่ </a> เพื่ออัพเกรด"},
    "ZZ": {message: "ไม่ทราบ"},
    "KM": {message: "คอโมโรส"},
    "KW": {message: "คูเวต"},
    "MQ": {message: "มาร์ตินีก"},
    "TC": {message: "หมู่เกาะเติกส์และหมู่เกาะเคคอส"},
    "ES": {message: "สเปน"},
    "MZ": {message: "โมซัมบิก"},
    "BO": {message: "โบลิเวีย"},
    "AL": {message: "แอลเบเนีย"},
    "MD": {message: "มอลโดวา"},
    "TR": {message: "ตุรกี"},
    "GN": {message: "กินี"},
    "SI": {message: "สโลวีเนีย"},
    "CO": {message: "โคลอมเบีย"},
    "Settings": {message: "การตั้งค่า"},
    "AQ": {message: "แอนตาร์กติกา"},
    "JO": {message: "จอร์แดน"},
    "SM": {message: "ซานมารีโน"},
    "CU": {message: "คิวบา"},
    "CL": {message: "ชิลี"},
    "ML": {message: "มาลี"},
    "ET": {message: "เอธิโอเปีย"},
    "IS": {message: "ไอซ์แลนด์"},
    "Reload Hola": {message: "โหลด Hola"},
    "back to": {message: "กลับไปยัง"},
    "MH": {message: "หมู่เกาะมาร์แชลล์"},
    "BG": {message: "บัลแกเรีย"},
    "BS": {message: "บาฮามาส"},
    "TL": {message: "ติมอร์ตะวันออก"},
    "BZ": {message: "เบลีซ"},
    "CY": {message: "ไซปรัส"},
    "IM": {message: "เกาะแมน"},
    "IE": {message: "ไอร์แลนด์"},
    "Get help from engineer over skype:": {message: "ขอความช่วยเหลือจากวิศวกรกว่า Skype:"},
    "TW": {message: "ไต้หวัน"},
    "KP": {message: "เกาหลีเหนือ"},
    "PF": {message: "เฟรนช์โปลินีเซีย"},
    "app_name": {message: "อินเทอร์เน็ต Hola ที่ดีขึ้น"},
    "Update": {message: "ปรับปรุง"},
    "MW": {message: "มาลาวี"},
    "GY": {message: "กายอานา"},
    "Unblocker is disabled": {message: "Unblocker ถูกปิดใช้งาน"},
    "GQ": {message: "อิเควทอเรียลกินี"},
    "PK": {message: "ปากีสถาน"},
    "Number of users that pressed not working": {message: "จำนวนของผู้ใช้ที่กดไม่ทำงาน"},
    "NF": {message: "เกาะนอร์ฟอล์ก"},
    "SO": {message: "โซมาเลีย"},
    "TD": {message: "ชาด"},
    "HM": {message: "เกาะเฮิร์ดและหมู่เกาะแมกดอนัลด์"},
    "BD": {message: "บังกลาเทศ"},

};
return E; });