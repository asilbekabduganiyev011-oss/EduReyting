// ═══════════════════════════════════════════
//  DATA.JS — Barcha ma'lumotlar
// ═══════════════════════════════════════════

// ── VILOYATLAR, SHAHARLAR, TUMANLAR ──
const GEO = {
  "Toshkent shahri": {
    type:"shahar",
    districts:["Bektemir","Chilonzor","Mirobod","Mirzo Ulug'bek","Olmazor","Sergeli","Shayxontohur","Uchtepa","Yakkasaroy","Yunusobod","Yashnobod"]
  },
  "Toshkent viloyati": {
    type:"viloyat",
    districts:["Angren","Bo'stonliq","Bo'ka","Chirchiq","Ohangaron","Olmaliq","Oqqo'rg'on","Parkent","Piskent","Qibray","Toshkent tumani","To'ytepa","Zangiota","Yuqorichirchiq","Quyi Chirchiq","O'rta Chirchiq"]
  },
  "Samarqand viloyati": {
    type:"viloyat",
    districts:["Samarqand shahri","Ishtixon","Jomboy","Kattaqo'rg'on","Narpay","Nurobod","Oqdaryo","Payariq","Pastdarg'om","Paxtachi","Toyloq","Urgut"]
  },
  "Buxoro viloyati": {
    type:"viloyat",
    districts:["Buxoro shahri","G'ijduvon","Jondor","Kogon","Qorovulbozor","Olot","Peshku","Romitan","Shofirkon","Vobkent"]
  },
  "Namangan viloyati": {
    type:"viloyat",
    districts:["Namangan shahri","Chortoq","Chust","Kosonsoy","Mingbuloq","Norin","Pop","To'raqo'rg'on","Uychi","Yangiqo'rg'on"]
  },
  "Andijon viloyati": {
    type:"viloyat",
    districts:["Andijon shahri","Asaka","Baliqchi","Bo'z","Buloqboshi","Jalolquduq","Izboskan","Qo'rg'ontepa","Marhamat","Oltinkol","Paxtaobod","Shahrixon","Ulug'nor","Xo'jaobod"]
  },
  "Farg'ona viloyati": {
    type:"viloyat",
    districts:["Farg'ona shahri","Qo'qon shahri","Marg'ilon shahri","Bog'dod","Buvayda","Dang'ara","Furqat","Quva","Qo'shtepa","Oltiariq","O'zbekiston","Rishton","So'x","Toshloq","Uchko'prik","Yozyovon"]
  },
  "Xorazm viloyati": {
    type:"viloyat",
    districts:["Urganch shahri","Bog'ot","Gurlan","Xiva","Xazorasp","Qo'shko'pir","Shovot","Tuproqqal'a","Yangiariq","Yangibozor"]
  },
  "Qashqadaryo viloyati": {
    type:"viloyat",
    districts:["Qarshi shahri","Chiroqchi","Dehqonobod","G'uzor","Kasbi","Kitob","Koson","Mirishkor","Muborak","Nishon","Qamashi","Shahrisabz","Yakkabog'"]
  },
  "Surxondaryo viloyati": {
    type:"viloyat",
    districts:["Termiz shahri","Angor","Boysun","Denov","Jarqo'rg'on","Muzrabot","Oltinsoy","Qiziriq","Qumqo'rg'on","Sariosiyо","Sherobod","Sho'rchi","Uzun"]
  },
  "Sirdaryo viloyati": {
    type:"viloyat",
    districts:["Guliston shahri","Boyovut","Mirzaobod","Oqoltin","Sardoba","Sayxunobod","Sirdaryo tumani","Xavos"]
  },
  "Jizzax viloyati": {
    type:"viloyat",
    districts:["Jizzax shahri","Arnasoy","Baxmal","Do'stlik","Forish","G'allaorol","Mirzacho'l","Paxtakor","Sharof Rashidov","Yangiobod","Zafarobod","Zarbdor","Zomin"]
  },
  "Navoiy viloyati": {
    type:"viloyat",
    districts:["Navoiy shahri","Zarafshon shahri","Karmana","Konimex","Navbahor","Nurota","Qiziltepa","Tomdi","Uchquduq","Xatirchi"]
  },
  "Qoraqalpog'iston Respublikasi": {
    type:"respublika",
    districts:["Nukus shahri","Amudaryo","Beruniy","Chimboy","Ellikkala","Kegeyli","Mo'ynoq","Nukus tumani","Qanliko'l","Qo'ng'irot","Qorao'zak","Shumanay","Taxtako'pir","To'rtko'l","Xo'jayli"]
  }
};

// ── MAKTABLAR (har tumanда 5-8 ta) ──
// real-data imitatsiyasi — foydalanuvchi o'z maktabini qo'shishi mumkin
function getSchools(region, district) {
  return [
    `${district} 1-maktab`,
    `${district} 2-maktab`,
    `${district} 3-maktab`,
    `${district} 5-maktab`,
    `${district} 7-maktab`,
    `${district} 10-maktab`,
    `${district} 15-maktab`,
    `${district} 21-maktab`,
    `${district} ixtisoslashtirilgan maktab`,
    `${district} akademik litsey`,
    `Boshqa (qo'lda kiriting)`,
  ];
}

// ── FANLAR (5-11 sinf) ──
const GRADE_SUBJECTS = {
  5:  ["Matematika","O'zbek tili","Adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Tasviriy san'at","Musiqa","Jismoniy tarbiya","Texnologiya","Informatika"],
  6:  ["Matematika","O'zbek tili","Adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Fizika","Kimyo","Tasviriy san'at","Musiqa","Jismoniy tarbiya","Texnologiya","Informatika"],
  7:  ["Algebra","Geometriya","O'zbek tili","Adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Fizika","Kimyo","Informatika","Jismoniy tarbiya","Texnologiya"],
  8:  ["Algebra","Geometriya","O'zbek tili","Adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Fizika","Kimyo","Informatika","Jismoniy tarbiya","Texnologiya"],
  9:  ["Algebra","Geometriya","O'zbek tili","Adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Fizika","Kimyo","Informatika","Jismoniy tarbiya","Huquq","Iqtisodiyot"],
  10: ["Matematika","O'zbek tili va adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Fizika","Kimyo","Informatika","Jismoniy tarbiya","Astronomiya","Huquq","Iqtisodiyot"],
  11: ["Matematika","O'zbek tili va adabiyot","Ingliz tili","Tarix","Geografiya","Biologiya","Fizika","Kimyo","Informatika","Jismoniy tarbiya","Astronomiya","Huquq","Iqtisodiyot","Psixologiya"]
};

const SUBJECT_ICONS = {
  "Matematika":"📐","Algebra":"📐","Geometriya":"📏",
  "O'zbek tili":"📖","O'zbek tili va adabiyot":"📖","Adabiyot":"✍️",
  "Ingliz tili":"🇬🇧","Tarix":"🏛️","Geografiya":"🌍",
  "Biologiya":"🌿","Fizika":"⚡","Kimyo":"🧪",
  "Informatika":"💻","Jismoniy tarbiya":"🏃","Texnologiya":"🔧",
  "Tasviriy san'at":"🎨","Musiqa":"🎵","Huquq":"⚖️",
  "Iqtisodiyot":"💰","Astronomiya":"🔭","Psixologiya":"🧠"
};

// ── SAVOLLAR (har fan uchun 10 ta) ──
const QUESTIONS = {
  "Matematika":[
    {q:"2x + 5 = 13 tenglamaning yechimi?", o:["x=3","x=4","x=5","x=6"], a:1},
    {q:"3² + 4² = ?", o:["20","25","30","49"], a:1},
    {q:"(3+2)² = ?", o:["10","25","30","55"], a:1},
    {q:"√144 = ?", o:["11","12","13","14"], a:1},
    {q:"15 ning 40%i = ?", o:["4","5","6","7"], a:2},
    {q:"Uchburchak burchaklari yig'indisi?", o:["90°","180°","270°","360°"], a:1},
    {q:"5! (5 faktorial) = ?", o:["20","60","120","240"], a:2},
    {q:"0,25 = ? kasri", o:["1/2","1/3","1/4","1/5"], a:2},
    {q:"log₂8 = ?", o:["2","3","4","8"], a:1},
    {q:"a=3, b=4 bo'lsa, a²+b²=?", o:["14","25","49","7"], a:1},
  ],
  "Algebra":[
    {q:"2x+3=11 — x=?", o:["3","4","5","6"], a:1},
    {q:"(a+b)² = ?", o:["a²+b²","a²+2ab+b²","a²-2ab+b²","2a+2b"], a:1},
    {q:"x²-9=0 — yechimlari?", o:["x=3","x=±3","x=9","x=±9"], a:1},
    {q:"3x-2=7 — x=?", o:["2","3","4","5"], a:1},
    {q:"a²-b²=(a-b)·?", o:["(a+b)","(a-b)","(2a)","(a²)"], a:0},
    {q:"√81=?", o:["7","8","9","10"], a:2},
    {q:"2⁵=?", o:["10","16","32","64"], a:2},
    {q:"y=2x+1, x=3 bo'lsa y=?", o:["5","6","7","8"], a:2},
    {q:"|−7|=?", o:["-7","0","7","49"], a:2},
    {q:"x²+5x+6=0 — ildizlar yig'indisi?", o:["-5","5","-6","6"], a:0},
  ],
  "Geometriya":[
    {q:"Doira yuzasi formulasi?", o:["2πr","πr²","πd","2πd"], a:1},
    {q:"To'g'ri to'rtburchak diagonali formulasi?", o:["a+b","2(a+b)","√(a²+b²)","a·b"], a:2},
    {q:"Shar hajmi formulasi?", o:["4πr²","(4/3)πr³","πr²h","2πr²"], a:1},
    {q:"Parallelogrammda qarama-qarshi burchaklar?", o:["Teng","Qo'shimcha","To'g'ri","90°"], a:0},
    {q:"Uchburchak tashqi burchagi = ?", o:["Qo'shni burchak","Ikki uzoq ichki burchak yig'indisi","90°","180°"], a:1},
    {q:"Muntazam olti burchak ichki burchagi?", o:["108°","120°","135°","150°"], a:1},
    {q:"Trapetsiya o'rta chizig'i = ?", o:["Asoslar yig'indisi","Asoslar yig'indisining yarmi","Yon tomonlar","Diagonal"], a:1},
    {q:"Piramida hajmi = (1/3)·S·h — bu qanday formula?", o:["Shar","Silindr","Konus","Piramida"], a:3},
    {q:"To'g'ri burchakli uchburchakda: a²+b²=c² — bu qanday teorem?", o:["Fales","Pifagor","Evklid","Menelays"], a:1},
    {q:"Aylana uzunligi formulasi?", o:["πr²","2πr","πd²","r²"], a:1},
  ],
  "O'zbek tili":[
    {q:"'Kitob' so'zining ko'pligi?", o:["Kitoblar","Kitobning","Kitobga","Kitobni"], a:0},
    {q:"Fe'l so'z turkumi nima bildiradi?", o:["Ism","Sifat","Harakat","Olmosh"], a:2},
    {q:"O'zbek tili qaysi til oilasiga kiradi?", o:["Hind-yevropa","Turkiy","Semit","Slavyan"], a:1},
    {q:"'Keldi' fe'lining asosi?", o:["Kel","Keldi","Keld","Kelgan"], a:0},
    {q:"Quyidagilardan qaysi biri ko'makchi so'z?", o:["Va","Ham","Uchun","Lekin"], a:2},
    {q:"Unli tovushlar soni o'zbek tilida?", o:["4","5","6","7"], a:2},
    {q:"Ot so'z turkumi nima bildiradi?", o:["Harakat","Belgi","Narsa va tushuncha","Miqdor"], a:2},
    {q:"'Yaxshi' so'zining so'z turkumi?", o:["Ot","Fe'l","Sifat","Ravish"], a:2},
    {q:"Sodda gapning asosiy qismlari?", o:["Ega va kesim","Aniqlovchi va to'ldiruvchi","Hol va kesim","Ega va aniqlovchi"], a:0},
    {q:"'Sevinmoq' fe'lining antonimi?", o:["Kulimoq","Yugurimoq","Xo'rsinimoq","Yig'lamoq"], a:3},
  ],
  "O'zbek tili va adabiyot":[
    {q:"Navoiyning 'Xamsa' asarida nechta doston bor?", o:["3","4","5","6"], a:2},
    {q:"G'azal necha misradan iborat bo'ladi?", o:["2-4","5-12","4-8","3-6"], a:1},
    {q:"'Keldi' fe'li qaysi zamonda?", o:["Hozirgi","O'tgan","Kelasi","Buyruq"], a:1},
    {q:"Mubtado gapda qaysi savollarga javob beradi?", o:["Kim? Nima?","Qanday? Qaysi?","Qachon? Qayerda?","Nechta?"], a:0},
    {q:"Adabiyot — bu nima?", o:["Fan","San'at turi","Texnologiya","Til"], a:1},
    {q:"Bobur qaysi asarni yozgan?", o:["Navoiy","Temur","Boburnoma","Xamsa"], a:2},
    {q:"She'riy satr nomi?", o:["Band","Misra","Bayt","Radif"], a:1},
    {q:"'Dunyoning eng go'zal shahar' iborasi qaysi shahar haqida?", o:["Buxoro","Samarqand","Toshkent","Xiva"], a:1},
    {q:"Hamza Hakimzoda Niyoziy kim?", o:["Matematik","Dramaturg","Fizik","Rassom"], a:1},
    {q:"Qofiya nima?", o:["Misralar oxirining uyg'unligi","She'r janri","Adabiy qurol","Roman turi"], a:0},
  ],
  "Adabiyot":[
    {q:"Alisher Navoiy qaysi asarni yozgan?", o:["Boburnoma","Xamsa","Zafarnoma","Rubaiyot"], a:1},
    {q:"'Don Kixot' muallifi?", o:["Dante","Servantes","Shekspir","Gyote"], a:1},
    {q:"Rubaiy necha misradan iborat?", o:["2","3","4","5"], a:2},
    {q:"'Romeo va Julyetta' muallifi?", o:["Balzak","Shekspir","Flober","Dyuma"], a:1},
    {q:"'Kecha va kunduz' romani muallifi?", o:["Qodiriy","Cho'lpon","Oybek","Fitrat"], a:2},
    {q:"Navoiy qaysi tilda asarlar yozgan?", o:["Fors","Arab","Chig'atoy","Rus"], a:2},
    {q:"Doston — bu?", o:["Kichik she'r","Katta epik she'riy asar","Roman","Hikoya"], a:1},
    {q:"'O'tkan kunlar' romani muallifi?", o:["Oybek","Qodiriy","Cho'lpon","Hamza"], a:1},
    {q:"Lirika — bu?", o:["Epik janr","His-tuyg'ularni ifodalovchi janr","Drama","Komediya"], a:1},
    {q:"Abdulla Qodiriy tug'ilgan yil?", o:["1890","1894","1900","1910"], a:1},
  ],
  "Ingliz tili":[
    {q:"'I ___ to school every day.' correct form?", o:["goes","go","went","gone"], a:1},
    {q:"'Happy' antonym?", o:["Joyful","Sad","Glad","Merry"], a:1},
    {q:"Passive: 'The cake ___ by Tom.'", o:["eat","eaten","was eaten","is eat"], a:2},
    {q:"'___ apple a day keeps the doctor away.'", o:["A","An","The","—"], a:1},
    {q:"'She ___ her homework.' Past Simple", o:["finish","finishes","finished","finishing"], a:2},
    {q:"'Improve' means?", o:["To worsen","To make better","To remove","To forget"], a:1},
    {q:"'They ___ already eaten.' correct?", o:["have","has","had","are"], a:0},
    {q:"Which is correct? 'She ___ since morning.'", o:["worked","work","has been working","works"], a:2},
    {q:"'He said he ___ tired.' Reported speech", o:["is","was","were","be"], a:1},
    {q:"Future tense: 'I ___ go tomorrow.'", o:["shall","will","would","am"], a:1},
  ],
  "Tarix":[
    {q:"O'zbekiston mustaqilligini qachon qo'lga kiritdi?", o:["1990","1991","1992","1993"], a:1},
    {q:"Amir Temur qachon tug'ilgan?", o:["1336","1345","1370","1405"], a:0},
    {q:"Ikkinchi jahon urushi qachon tugadi?", o:["1943","1944","1945","1946"], a:2},
    {q:"Birinchi jahon urushi boshlanish yili?", o:["1910","1912","1914","1916"], a:2},
    {q:"Qadimgi Misr yozuvi?", o:["Lotin","Ierogliflar","Kirill","Arab"], a:1},
    {q:"Mo'g'ul imperiyasini kim asos solgan?", o:["Chingizxon","Temur","Oqtemir","Hulogu"], a:0},
    {q:"Avitsenna asosiy asari?", o:["Rubaiyot","Tib qonunlari","Zafarnoma","Boburnoma"], a:1},
    {q:"Buyuk Ipak yo'li nimani bog'lagan?", o:["Yevropa-Afrika","Xitoy-Yevropa","Hindiston-Amerika","Rossiya-Xitoy"], a:1},
    {q:"O'zbekiston Konstitutsiyasi qachon qabul qilingan?", o:["1990","1991","1992","1993"], a:2},
    {q:"Al-Xorazmiy kim edi?", o:["Shoir","Matematik va astronom","Jangchi","Rassom"], a:1},
  ],
  "Geografiya":[
    {q:"Dunyoning eng baland tog'i?", o:["K2","Everest","Elbrus","Kilimanjaro"], a:1},
    {q:"O'zbekistonning eng uzun daryosi?", o:["Sirdaryo","Amudaryo","Zarafshon","Qashqadaryo"], a:1},
    {q:"Yer yuzasining qancha qismi suv?", o:["50%","61%","71%","81%"], a:2},
    {q:"Eng katta materik?", o:["Afrika","Amerika","Yevropa","Osiyo"], a:3},
    {q:"Toshkentning geografik joylashuvi?", o:["41°N 69°E","55°N 37°E","48°N 14°E","36°N 59°E"], a:0},
    {q:"Amazonka daryosi qaysi qit'ada?", o:["Afrika","Osiyo","Janubiy Amerika","Shimoliy Amerika"], a:2},
    {q:"Dunyo bo'yicha eng ko'p aholiga ega mamlakat?", o:["Hindiston","AQSh","Xitoy","Rossiya"], a:0},
    {q:"Sahara cho'li qaysi qit'ada?", o:["Osiyo","Afrika","Amerika","Avstraliya"], a:1},
    {q:"Qaysi okean eng katta?", o:["Atlantika","Hind","Tinch","Arktika"], a:2},
    {q:"Eng chuqur ko'l?", o:["Kaspiy","Baykal","Victoria","Titicaca"], a:1},
  ],
  "Biologiya":[
    {q:"Fotosintez qayerda kechadi?", o:["Mitoxondriya","Xloroplast","Yadro","Sitoplazma"], a:1},
    {q:"DNK nima?", o:["Oqsil","Irsiy ma'lumot tashuvchi","Uglevod","Lipid"], a:1},
    {q:"Qon guruhlari soni?", o:["2","3","4","5"], a:2},
    {q:"Inson tanasidagi suyaklar soni?", o:["186","206","256","300"], a:1},
    {q:"Mitoz nima?", o:["Jinsiy ko'payish","Hujayra bo'linishi","Oziqlantirish","Nafas olish"], a:1},
    {q:"Insonda nechta juft xromasoma bor?", o:["22","23","44","46"], a:0},
    {q:"Bakteriyalar qaysi guruhga kiradi?", o:["O'simliklar","Hayvonlar","Prokariotlar","Zamburug'lar"], a:2},
    {q:"Qaysi organ qon hosil qiladi?", o:["Jigar","Buyrak","Ko'mik","Yurak"], a:2},
    {q:"Vitamin C qaysi mahsulotda ko'p?", o:["Go'sht","Limon","Yog'","Guruch"], a:1},
    {q:"Inson hujayrasi necha xromasomaga ega?", o:["23","46","44","48"], a:1},
  ],
  "Fizika":[
    {q:"Tezlik formulasi?", o:["v=m/t","v=s/t","v=s·t","v=F/m"], a:1},
    {q:"Yorug'lik tezligi taxminan?", o:["300 km/s","3000 km/s","300000 km/s","30 km/s"], a:2},
    {q:"Og'irlik kuchi formulasi?", o:["P=mv","P=mg","P=ma","P=ms"], a:1},
    {q:"1 kVt = ? Vt", o:["10","100","1000","10000"], a:2},
    {q:"Nyutonning 1-qonuni?", o:["F=ma","Inersiya qonuni","Harakat qonuni","Ta'sir-reaksiya"], a:1},
    {q:"Elektr qarshilik birligi?", o:["Amper","Volt","Vatt","Om"], a:3},
    {q:"Ovoz tezligi havoda taxminan?", o:["340 m/s","3400 m/s","34 m/s","3,4 m/s"], a:0},
    {q:"Archimed kuchi nima?", o:["Og'irlik kuchi","Suyuqlik itarish kuchi","Ishqalanish kuchi","Tortishish kuchi"], a:1},
    {q:"Kinetik energiya formulasi?", o:["mgh","mv²/2","Fs","mv"], a:1},
    {q:"Elektr quvvati birligi?", o:["Amper","Volt","Vatt","Om"], a:2},
  ],
  "Kimyo":[
    {q:"Suvning kimyoviy formulasi?", o:["CO₂","H₂O","NaCl","O₂"], a:1},
    {q:"Osh tuzi formulasi?", o:["NaCl","KCl","MgCl₂","CaCl₂"], a:0},
    {q:"Eng yengil element?", o:["Geliy","Vodorod","Litiy","Uglerod"], a:1},
    {q:"Metanning formulasi?", o:["C₂H₄","CH₄","C₂H₆","C₃H₆"], a:1},
    {q:"Fe elementi nomi?", o:["Ftor","Fosfor","Temir","Feron"], a:2},
    {q:"Neytral eritma pH qiymati?", o:["0","7","14","3"], a:1},
    {q:"Atom yadrosi nimadan tashkil topgan?", o:["Elektron va proton","Proton va neytron","Neytron va elektron","Faqat proton"], a:1},
    {q:"Davriy jadval kim tomonidan tuzilgan?", o:["Einstein","Mendeleyev","Kyuri","Lavuaze"], a:1},
    {q:"Kislota va ishqor reaksiyasi?", o:["Yonish","Neytrallanish","Parchalanish","Qo'shilish"], a:1},
    {q:"O₂ elementi nomi?", o:["Azot","Vodorod","Kislorod","Uglerod"], a:2},
  ],
  "Informatika":[
    {q:"CPU nima?", o:["Xotira","Markaziy protsessor","Grafik karta","Qattiq disk"], a:1},
    {q:"1 Bayt = ? bit", o:["4","8","16","32"], a:1},
    {q:"Excel formulasi boshlanishi?", o:["#","@","=","$"], a:2},
    {q:"Python — bu nima?", o:["Brauzer","Dasturlash tili","Ma'lumotlar bazasi","Antivirus"], a:1},
    {q:"RAM nima?", o:["Doimiy xotira","Operativ xotira","Protsessor","Monitor"], a:1},
    {q:"1 GB = ? MB", o:["10","100","1000","1024"], a:3},
    {q:"HTML — bu nima?", o:["Dasturlash tili","Belgilash tili","Ma'lumotlar bazasi","OS"], a:1},
    {q:"Internet yaratilgan yil taxminan?", o:["1969","1979","1989","1999"], a:0},
    {q:"Fayl kengaytmasi .docx qaysi dastur?", o:["Excel","PowerPoint","Word","Notepad"], a:2},
    {q:"Binary: 1010 = ? (o'nlik)?", o:["8","9","10","12"], a:2},
  ],
  "Huquq":[
    {q:"O'zbekiston Konstitutsiyasi qachon qabul qilingan?", o:["1990","1991","1992","1993"], a:2},
    {q:"Prezident lavozimiga necha yoshdan?", o:["25","30","35","40"], a:2},
    {q:"Voyaga etish yoshi O'zbekistonda?", o:["16","17","18","21"], a:2},
    {q:"Bola huquqlari konventsiyasi qachon qabul qilingan?", o:["1959","1979","1989","1999"], a:2},
    {q:"O'zbekistonda parlament nomi?", o:["Majlis","Oliy Majlis","Kengash","Senat"], a:1},
    {q:"Advokat — bu kim?", o:["Sudya","Yuridik yordam beruvchi","Prokuror","Tergovchi"], a:1},
    {q:"Jinoyat kodeksi nimani tartibga soladi?", o:["Fuqarolik","Jinoiy munosabatlar","Tijorat","Ta'lim"], a:1},
    {q:"Prezumpsiya nima?", o:["Aybdorlik","Begunohlik kafolati","Jarima","Hukm"], a:1},
    {q:"Konstitutsiyaga kim rioya qilishi shart?", o:["Faqat fuqarolar","Faqat davlat","Barcha — fuqarolar va davlat","Faqat chet elliklar"], a:2},
    {q:"Oliy sud qayerda joylashgan?", o:["Samarqand","Buxoro","Toshkent","Namangan"], a:2},
  ],
  "Iqtisodiyot":[
    {q:"GDP nima?", o:["Byudjet daromadi","Yalpi ichki mahsulot","Tovar narxi","Savdo balansi"], a:1},
    {q:"Inflyatsiya nima?", o:["Narxlarning pasayishi","Narxlarning oshishi","Ish o'rinlari ko'payishi","Eksport o'sishi"], a:1},
    {q:"Eksport nima?", o:["Tovar import qilish","Tovar chiqarish","Ishlab chiqarish","Saqlash"], a:1},
    {q:"Monopoliya nima?", o:["Ko'p sotuvchi","Yagona sotuvchi","Ko'p xaridor","Erkin bozor"], a:1},
    {q:"Investitsiya nima?", o:["Xarajat","Foydali mablag' kiritish","Qarz olish","Tovar sotish"], a:1},
    {q:"Soliq nima uchun to'lanadi?", o:["Bankga","Davlat byudjetiga","Korxonaga","Xususiy fondga"], a:1},
    {q:"Bozor iqtisodiyotida narxni kim belgilaydi?", o:["Davlat","Talab va taklif","Faqat sotuvchi","Faqat xaridor"], a:1},
    {q:"Byudjet nima?", o:["Bank hisobi","Davlat daromad-xarajat rejasi","Tovar narxi","Kredit"], a:1},
    {q:"Raqobat nima?", o:["Hamkorlik","Bozorda kurash","Monopoliya","Subsidiya"], a:1},
    {q:"Import nima?", o:["Tovar chiqarish","Tovar kiritish","Tovar saqlash","Tovar ishlab chiqarish"], a:1},
  ],
  "Astronomiya":[
    {q:"Quyosh tizimidagi eng katta sayyora?", o:["Saturn","Neptun","Yupiter","Uran"], a:2},
    {q:"Galaktikamizning nomi?", o:["Andromeda","Somon yo'li","Magellanoviy","Virgo"], a:1},
    {q:"Yerdan Oyga bo'lgan masofa?", o:["~384 000 km","~1 500 000 km","~150 000 km","~10 000 km"], a:0},
    {q:"Quyosh sistemasidagi sayyoralar soni?", o:["7","8","9","10"], a:1},
    {q:"Yorug'lik yili nima o'lchaydi?", o:["Vaqt","Masofa","Massa","Harorat"], a:1},
    {q:"Qora tuynuk nima?", o:["Katta yulduz","Cheksiz tortishish obyekt","Sayyora","Komet"], a:1},
    {q:"Kometaning boshqa nomi?", o:["Asteroid","Meteor","Quyruqli yulduz","Galaktika"], a:2},
    {q:"Yer Quyosh atrofida bir marta aylanish muddati?", o:["300 kun","365 kun","400 kun","500 kun"], a:1},
    {q:"Quyosh tizimida eng ko'p halqali sayyora?", o:["Yupiter","Saturn","Uran","Neptun"], a:1},
    {q:"Yulduz — bu nima?", o:["Sayyora","Ravshanlik manbai","Gaz to'pi","Komet"], a:2},
  ],
  "Psixologiya":[
    {q:"Psixologiyaning predmeti?", o:["Inson tanasi","Inson psixikasi","Ijtimoiy munosabatlar","Til va nutq"], a:1},
    {q:"Introvert nima?", o:["Ochiq, muloqotchan","O'ziga yopiq","Agressiv","Faol"], a:1},
    {q:"Motivatsiya nima?", o:["Qo'rquv","Harakatga undovchi kuch","Xavotir","Tashvish"], a:1},
    {q:"Empatsiya nima?", o:["Kamsitish","Boshqa his-tuyg'ularni tushunish","Befarqlik","Raqobat"], a:1},
    {q:"IQ nima o'lchaydi?", o:["Jismoniy kuch","Intellektual salohiyat","Hissiyot","Xotira"], a:1},
    {q:"Stres nima?", o:["Baxt","Zo'riqish holati","Dam olish","Uyqu"], a:1},
    {q:"Xotira turlari?", o:["Qisqa va uzoq muddatli","Faqat qisqa","Faqat uzoq","Yo'q"], a:0},
    {q:"Sigmund Freyd kim edi?", o:["Fizik","Psixoanaliz asoschisi","Matematik","Shoir"], a:1},
    {q:"Pavlovning eksperimentlari mavzusi?", o:["Nutq","Reflekslar","Xotira","Uxlash"], a:1},
    {q:"Kognitiv — bu?", o:["Hissiy","Bilish jarayonlariga oid","Jismoniy","Ijtimoiy"], a:1},
  ],
  "Jismoniy tarbiya":[
    {q:"Olimpiya o'yinlari nechi yilda bir bo'ladi?", o:["2","3","4","5"], a:2},
    {q:"Voleybolda bir tomonda nechta o'yinchi?", o:["5","6","7","9"], a:1},
    {q:"Basketbolda o'yin vaqti?", o:["4×10 daqiqa","2×45 daqiqa","3×20 daqiqa","4×15 daqiqa"], a:0},
    {q:"Tennis kortiidagi to'r balandligi?", o:["0.5m","0.914m","1.2m","1.5m"], a:1},
    {q:"Futbolda jazo hududi masofasi?", o:["11m","16m","18m","22m"], a:1},
    {q:"Usain Bolt 100m rekord vaqti (2009)?", o:["9.58s","9.69s","9.81s","9.95s"], a:0},
    {q:"Olimpiada bayrog'idagi halqalar soni?", o:["4","5","6","7"], a:1},
    {q:"Suzish uslublaridan biri?", o:["Salto","Krol","Sprint","Boks"], a:1},
    {q:"Futbol to'pining og'irligi?", o:["350-400g","410-450g","500-550g","600-650g"], a:1},
    {q:"Gimnastikada eng yuqori ball?", o:["5","6","8","10"], a:3},
  ],
  "Texnologiya":[
    {q:"Metall qaysi usulda birlashtiriladi?", o:["Yelim","Payvandlash","Tikish","Bog'lash"], a:1},
    {q:"Texnik chizmada o'lchovlar birligi?", o:["mm","km","m","sm"], a:0},
    {q:"3D printer nima yaratadi?", o:["Rasm","Uch o'lchamli model","Audio","Video"], a:1},
    {q:"Burg'ulash mashinasi nima uchun?", o:["Kesish","Teshik ochish","Bo'yash","O'lchash"], a:1},
    {q:"Vint birikmasi qaysi tur?", o:["Harakatlanuvchi","Qattiq","Buralma","Payvand"], a:2},
    {q:"Elektr zanjiri qismlari?", o:["Manba, o'tkazgich, iste'molchi","Moy, gaz, suv","Temir, mis","Vint, gayka, bolt"], a:0},
    {q:"Sim kesuvchi asbob?", o:["Kalit","Kleshen","Arra","Bolg'a"], a:1},
    {q:"Yog'och qaysi tabiat materiali?", o:["Sun'iy","Tabiiy","Plastik","Sintetik"], a:1},
    {q:"Arra qanday asbob?", o:["Gidravlik","Kesuvchi","O'lchov","Siquvchi"], a:1},
    {q:"Qaysi plastmassa issiqlikka chidamli?", o:["Termoplast","Termoset","Kauchuk","Lateks"], a:1},
  ],
  "Tasviriy san'at":[
    {q:"Asosiy ranglar?", o:["Qizil, Sariq, Ko'k","Yashil, To'q sariq, Binafsha","Oq, Qora, Kulrang","Hamma rang"], a:0},
    {q:"Perspektiva nima?", o:["Rang aralashmasi","Hajmni ko'rsatish usuli","Chiziq turi","Bo'yoq turi"], a:1},
    {q:"Akvarell nima?", o:["Moy bo'yoq","Suv bo'yog'i","Grafik usul","Mozaika"], a:1},
    {q:"Natyurmort nima?", o:["Manzara","Portret","Jonsiz narsalar tasviri","Hayvon tasviri"], a:2},
    {q:"Van Gogh qaysi mamlakat rassomu?", o:["Belgiya","Frantsiya","Niderlandiya","Germaniya"], a:2},
    {q:"Monoxrom nima?", o:["Ko'p rangli","Bir rang turli to'yinish","Rangsiz","Qora-oq"], a:1},
    {q:"Picasso qaysi mamlakat rassomu?", o:["Italiya","Fransiya","Ispaniya","Gretsiya"], a:2},
    {q:"Simmetriya nima?", o:["Ranglar uyg'unligi","Ikki taraf tengligi","Chiziqlar soni","Shakl nomi"], a:1},
    {q:"Mozaika nima?", o:["Rangli bo'lakchalar rasmi","Suv bo'yog'i","Chiziq san'ati","Haykaltaroshlik"], a:0},
    {q:"Gvash bo'yog'i xususiyati?", o:["Shaffof","Yopiq (qoplaydigan)","Nur tarqatadi","Qurimaydi"], a:1},
  ],
  "Musiqa":[
    {q:"Do, Re, Mi, Fa, Sol, La, ___ – keyingi nota?", o:["Bo","Si","Ti","Za"], a:1},
    {q:"Piano nechi tugmadan iborat?", o:["76","88","96","100"], a:1},
    {q:"Mozart qaysi mamlakatdan?", o:["Germaniya","Avstriya","Italiya","Fransiya"], a:1},
    {q:"Gitara qaysi guruh asbob?", o:["Urma","Torli","Puflab chalinadigan","Elektron"], a:1},
    {q:"Do'mbira qaysi xalqning milliy asbobi?", o:["O'zbek","Qozoq","Tatar","Qirg'iz"], a:1},
    {q:"Opera nima?", o:["Balet","Musiqiy drama","Simfoniya","Konsert"], a:1},
    {q:"'Fortissimo' (ff) — bu?", o:["Juda sekin","Sekin","Baland","Juda baland"], a:3},
    {q:"Beethoven qaysi mamlakatdan?", o:["Avstriya","Germaniya","Italiya","Fransiya"], a:1},
    {q:"Doira — bu qanday cholg'u?", o:["Torli","Puflab chalinadigan","Urma","Elektron"], a:2},
    {q:"Musiqa alifbosida nechi nota bor?", o:["5","6","7","8"], a:2},
  ]
};

const APP_VERSION = "1.0.0";

