/*
 * content.js — Conținutul cursului "Conducător de ambarcațiune cu motor"
 * -----------------------------------------------------------------------
 * Bazat pe planul de studiu de 14 zile, organizat în 4 module.
 * Fiecare zi = o "lecție video": o serie de diapozitive cu narațiune în
 * limba română (voice-over prin Web Speech API) + o verificare de cunoștințe.
 *
 * Structura unei lecții:
 *   { id, day, module, title, summary, slides:[{title, bullets, narration}],
 *     quiz:[{q, options:[...], answer:index, explain}] }
 *
 * Dacă există un fișier videos/dayNN.mp4, player-ul îl folosește automat în
 * locul diapozitivelor narate (vezi player.js).
 */

const MODULES = [
  { id: 1, title: "Modul 1 — Ambarcațiunea și motorul", color: "#2563eb", days: [1, 2, 3, 4] },
  { id: 2, title: "Modul 2 — Manevre și ancorare", color: "#0891b2", days: [5, 6, 7] },
  { id: 3, title: "Modul 3 — Siguranță și prim ajutor", color: "#dc2626", days: [8, 9, 10] },
  { id: 4, title: "Modul 4 — Navigație și reguli de drum", color: "#16a34a", days: [11, 12, 13, 14] },
];

const LESSONS = [
  /* ===================== MODUL 1 ===================== */
  {
    id: "day01", day: 1, module: 1,
    title: "Ambarcațiunea: tipuri și terminologie",
    summary: "Părțile componente ale ambarcațiunii și limbajul marinăresc de bază.",
    slides: [
      {
        title: "Bun venit la cursul de conducător de ambarcațiune",
        bullets: [
          "14 zile de pregătire, 4 module tematice",
          "Fiecare zi: o lecție scurtă + o verificare de cunoștințe",
          "La final: o simulare completă de examen",
        ],
        narration: "Bine ai venit la cursul de pregătire pentru permisul de conducător de ambarcațiune cu motor pentru agrement. În următoarele paisprezece zile vei parcurge patru module: ambarcațiunea și motorul, manevrele și ancorarea, siguranța și primul ajutor, și în final navigația și regulile de drum. La sfârșitul fiecărei lecții vei răspunde la o verificare de cunoștințe, iar la final vei susține o simulare de examen.",
      },
      {
        title: "Tipuri de ambarcațiuni de agrement",
        bullets: [
          "Bărci cu motor: cabinate, open, semi-rigide (RIB)",
          "Ambarcațiuni cu vele, jet-ski, bărci pneumatice",
          "Clasificarea după lungime și zona de navigație autorizată",
        ],
        narration: "Ambarcațiunile de agrement se împart în mai multe categorii: bărci cu motor cabinate sau deschise, ambarcațiuni semi-rigide numite RIB, bărci pneumatice, ambarcațiuni cu vele și motociclete de apă. Fiecare ambarcațiune are o categorie de proiectare care stabilește condițiile de vânt și de valuri în care poate naviga în siguranță.",
      },
      {
        title: "Terminologia de bază — orientarea la bord",
        bullets: [
          "Prova (prora) = partea din față; Pupa = partea din spate",
          "Tribord = dreapta (lumină verde); Babord = stânga (lumină roșie)",
          "Chila = axul longitudinal de jos; Copastia = marginea de sus a bordului",
        ],
        narration: "Orientarea la bord folosește termeni specifici. Prova este partea din față, iar pupa este partea din spate a ambarcațiunii. Privind spre prova, tribordul este partea dreaptă, marcată cu lumină verde, iar babordul este partea stângă, marcată cu lumină roșie. Chila este structura de la baza ambarcațiunii, iar copastia este marginea superioară a bordului.",
      },
      {
        title: "Structura corpului ambarcațiunii",
        bullets: [
          "Corpul (carena) — deplasament, planare sau semi-planare",
          "Puntea, cabina, cocpitul, santina (fundul interior)",
          "Bordul liber = înălțimea de la linia de plutire la punte",
        ],
        narration: "Corpul ambarcațiunii, numit și carenă, poate fi de tip deplasament, semi-planant sau planant, în funcție de forma sa și de viteza pe care o atinge. Deasupra se află puntea și cocpitul, iar în interior santina, adică fundul unde se adună apa. Bordul liber reprezintă înălțimea de la linia de plutire până la punte și influențează stabilitatea și siguranța pe valuri.",
      },
      {
        title: "Stabilitatea și flotabilitatea",
        bullets: [
          "Flotabilitatea = capacitatea de a pluti; centrul de greutate jos = stabilitate mai bună",
          "Distribuția uniformă a greutății și a pasagerilor",
          "Respectă capacitatea maximă (persoane și kg) de pe plăcuța constructorului",
        ],
        narration: "Stabilitatea ambarcațiunii depinde de forma carenei și de poziția centrului de greutate. Cu cât greutatea este mai jos și mai bine distribuită, cu atât ambarcațiunea este mai stabilă. Nu depăși niciodată numărul maxim de persoane și greutatea maximă indicate pe plăcuța constructorului, iar pasagerii trebuie să stea așezați și echilibrat.",
      },
    ],
    quiz: [
      { q: "Care este partea din față a ambarcațiunii?", options: ["Pupa", "Prova", "Tribord", "Chila"], answer: 1, explain: "Prova (prora) este partea din față; pupa este partea din spate." },
      { q: "Ce culoare are lumina de navigație de la tribord?", options: ["Roșu", "Alb", "Verde", "Galben"], answer: 2, explain: "Tribordul (dreapta) are lumină verde, babordul (stânga) are lumină roșie." },
      { q: "Ce este bordul liber?", options: ["Marginea de sus a bordului", "Înălțimea de la linia de plutire la punte", "Fundul interior al bărcii", "Axul longitudinal de jos"], answer: 1, explain: "Bordul liber = distanța verticală de la linia de plutire până la punte." },
      { q: "Unde găsești capacitatea maximă de persoane admise?", options: ["Pe plăcuța constructorului", "În jurnalul de bord", "Pe vestă", "Nu este specificată"], answer: 0, explain: "Plăcuța constructorului indică numărul maxim de persoane și greutatea maximă." },
    ],
  },
  {
    id: "day02", day: 2, module: 1,
    title: "Motorul: tipuri, propulsie și întreținere",
    summary: "Cum funcționează motorul de ambarcațiune și verificările esențiale.",
    slides: [
      {
        title: "Tipuri de motoare",
        bullets: [
          "Motor exterior (outboard) — montat pe pupa, ușor de manevrat",
          "Motor interior (inboard) — în corpul bărcii, cu arbore și elice",
          "Sisteme sterndrive (Z-drive) — combinație interior + coloană orientabilă",
        ],
        narration: "Motoarele de ambarcațiune se împart în trei mari categorii. Motorul exterior, sau outboard, este montat pe oglinda pupei și se rotește pentru a direcționa barca. Motorul interior, sau inboard, este montat în corpul ambarcațiunii și transmite mișcarea printr-un arbore la o elice fixă. Sistemul sterndrive combină un motor interior cu o coloană de propulsie orientabilă la pupa.",
      },
      {
        title: "Motoare în doi timpi și în patru timpi",
        bullets: [
          "2 timpi: mai ușor, amestec ulei-benzină, mai poluant",
          "4 timpi: mai silențios, mai economic, ulei separat",
          "Motoare electrice — tot mai frecvente, silențioase, ecologice",
        ],
        narration: "Motoarele termice pot fi în doi timpi sau în patru timpi. Cele în doi timpi sunt mai ușoare și mai simple, dar necesită un amestec de ulei cu benzină și sunt mai poluante. Cele în patru timpi sunt mai silențioase, mai economice și au ungere separată. Tot mai des se folosesc și motoare electrice, care sunt silențioase și nepoluante.",
      },
      {
        title: "Sistemul de propulsie și elicea",
        bullets: [
          "Elicea transformă rotația în forță de împingere",
          "Pasul și diametrul elicei influențează viteza și tracțiunea",
          "Atenție la obiecte în apă: parâme, plase, sfori — pot bloca elicea",
        ],
        narration: "Elicea transformă mișcarea de rotație a motorului în forță de împingere prin apă. Diametrul și pasul elicei determină echilibrul dintre viteză și forța de tracțiune. Fii mereu atent la obiectele plutitoare precum parâme, plase sau sfori, deoarece se pot înfășura pe elice și pot bloca propulsia.",
      },
      {
        title: "Verificarea nivelurilor și a răcirii",
        bullets: [
          "Verifică uleiul, combustibilul și lichidul de răcire",
          "Sistemul de răcire cu apă: verifică jetul de control (telltale)",
          "Supraîncălzirea = oprește motorul imediat și verifică prizele de apă",
        ],
        narration: "Înainte de plecare verifică nivelul de ulei, cantitatea de combustibil și, dacă este cazul, lichidul de răcire. Multe motoare se răcesc cu apă din exterior; urmărește jetul de control, un fir de apă care confirmă că sistemul de răcire funcționează. Dacă motorul se supraîncălzește, oprește-l imediat și verifică prizele de apă să nu fie înfundate.",
      },
      {
        title: "Întreținerea de bază",
        bullets: [
          "Curăță și spală motorul după apă sărată",
          "Verifică bujiile, filtrul de combustibil, anodul de zinc",
          "Respectă intervalele de service recomandate de producător",
        ],
        narration: "Întreținerea regulată prelungește viața motorului. După navigația în apă sărată, spală motorul cu apă dulce. Verifică periodic bujiile, filtrul de combustibil și anodul de zinc, care protejează metalele împotriva coroziunii. Respectă întotdeauna intervalele de service recomandate de producător.",
      },
    ],
    quiz: [
      { q: "Ce este un motor 'outboard'?", options: ["Motor montat în corpul bărcii", "Motor exterior montat pe pupa", "Un tip de elice", "Un sistem de răcire"], answer: 1, explain: "Outboard = motor exterior, montat pe oglinda pupei, orientabil." },
      { q: "Ce confirmă jetul de control (telltale) al unui motor?", options: ["Nivelul de combustibil", "Că sistemul de răcire funcționează", "Viteza bărcii", "Presiunea uleiului"], answer: 1, explain: "Firul de apă evacuat confirmă circulația apei de răcire." },
      { q: "Ce faci dacă motorul se supraîncălzește?", options: ["Accelerezi ca să răcească", "Îl oprești imediat și verifici prizele de apă", "Continui până la mal", "Torni apă rece pe el"], answer: 1, explain: "Oprești motorul și verifici prizele/răcirea pentru a evita avaria." },
      { q: "Ce rol are anodul de zinc?", options: ["Crește viteza", "Protejează metalele împotriva coroziunii", "Filtrează combustibilul", "Răcește motorul"], answer: 1, explain: "Anodul de zinc (sacrificial) se corodează în locul metalelor importante." },
    ],
  },
  {
    id: "day03", day: 3, module: 1,
    title: "Sistemele de bord",
    summary: "Combustibil, sistemul electric, guvernarea și santina.",
    slides: [
      {
        title: "Sistemul de combustibil",
        bullets: [
          "Rezervor, conducte, filtru, pompă, robinet de închidere",
          "Alimentarea: motor oprit, fără flacără, ventilație bună",
          "Verifică scurgerile și mirosul de benzină în santină",
        ],
        narration: "Sistemul de combustibil cuprinde rezervorul, conductele, filtrul, pompa și un robinet de închidere. La alimentare, oprește motorul, interzice orice flacără sau fumat și asigură ventilația. Vaporii de benzină sunt mai grei decât aerul și se pot acumula în santină, de aceea verifică întotdeauna scurgerile și mirosul înainte de a porni.",
      },
      {
        title: "Sistemul electric",
        bullets: [
          "Bateria alimentează pornirea, luminile, pompele, instrumentele",
          "Verifică bornele, siguranțele și nivelul de încărcare",
          "Întrerupătorul principal (kill switch) oprește motorul în urgențe",
        ],
        narration: "Sistemul electric este alimentat de baterie și susține pornirea motorului, luminile de navigație, pompele și instrumentele de bord. Verifică periodic bornele bateriei, siguranțele și starea de încărcare. Multe ambarcațiuni au un întrerupător de siguranță, prins cu o brățară de mâna conducătorului, care oprește imediat motorul dacă acesta cade peste bord.",
      },
      {
        title: "Sistemul de guvernare",
        bullets: [
          "Cârma sau motorul orientabil schimbă direcția",
          "Transmisie mecanică, hidraulică sau electrică",
          "Verifică jocul volanului și buna funcționare înainte de plecare",
        ],
        narration: "Guvernarea se face fie printr-o cârmă, fie prin orientarea motorului exterior. Comanda de la volan ajunge la cârmă printr-un sistem mecanic, hidraulic sau electric. Înainte de plecare, verifică jocul volanului și asigură-te că ambarcațiunea răspunde corect la comenzi, rotind volanul dintr-o parte în alta.",
      },
      {
        title: "Santina și pompa de santină",
        bullets: [
          "Santina colectează apa infiltrată în corpul bărcii",
          "Pompa de santină o evacuează — verifică funcționarea",
          "Nivel ridicat de apă = pericol de instabilitate sau scufundare",
        ],
        narration: "Santina este spațiul de la fundul ambarcațiunii unde se adună apa infiltrată. Pompa de santină evacuează această apă; verifică întotdeauna că funcționează, manual și automat. Un nivel ridicat de apă în santină afectează stabilitatea și, în cazuri grave, poate duce la scufundare, așa că trebuie monitorizat permanent.",
      },
    ],
    quiz: [
      { q: "De ce sunt periculoși vaporii de benzină în santină?", options: ["Sunt mai ușori decât aerul și se ridică", "Sunt mai grei decât aerul și se acumulează, risc de explozie", "Nu prezintă niciun risc", "Răcesc motorul"], answer: 1, explain: "Vaporii de benzină sunt mai grei decât aerul, se strâng jos și pot exploda." },
      { q: "La ce folosește kill switch-ul (întrerupătorul de siguranță)?", options: ["Pornește luminile", "Oprește imediat motorul dacă operatorul cade peste bord", "Încarcă bateria", "Reglează viteza"], answer: 1, explain: "Brățara prinsă de operator oprește motorul dacă acesta cade în apă." },
      { q: "Ce face pompa de santină?", options: ["Alimentează motorul cu combustibil", "Evacuează apa acumulată în corpul bărcii", "Răcește motorul", "Umflă barca pneumatică"], answer: 1, explain: "Evacuează apa din santină, menținând barca stabilă și pe linia de plutire." },
      { q: "Ce trebuie făcut înainte de alimentarea cu combustibil?", options: ["Se pornește motorul", "Se oprește motorul și se interzice orice flacără", "Se aprinde o țigară", "Se închid toate ferestrele"], answer: 1, explain: "Motor oprit, fără flacără/fum, cu ventilație — pentru a evita explozia." },
    ],
  },
  {
    id: "day04", day: 4, module: 1,
    title: "Documente, dotări obligatorii și verificări pre-plecare",
    summary: "Ce trebuie să ai la bord și lista de control înainte de a pleca.",
    slides: [
      {
        title: "Documente necesare",
        bullets: [
          "Permisul (brevetul) de conducător valabil pentru categoria ambarcațiunii",
          "Documentele de înmatriculare / certificatul ambarcațiunii",
          "Asigurarea, acolo unde este obligatorie",
        ],
        narration: "La bord trebuie să ai întotdeauna documentele în regulă: permisul sau brevetul de conducător valabil pentru categoria și puterea ambarcațiunii, documentele de înmatriculare sau certificatul ambarcațiunii și, unde este cazul, asigurarea. Autoritățile pot solicita aceste documente la control.",
      },
      {
        title: "Dotările de siguranță obligatorii",
        bullets: [
          "Veste de salvare pentru fiecare persoană la bord",
          "Colac de salvare, stingător, dispozitiv de semnalizare",
          "Ancoră cu parâmă, ispol/pompă, trusă de prim ajutor, mijloc de comunicare",
        ],
        narration: "Dotările de siguranță obligatorii includ câte o vestă de salvare pentru fiecare persoană aflată la bord, un colac de salvare, un stingător de incendiu, mijloace de semnalizare, o ancoră cu parâmă corespunzătoare, un dispozitiv de evacuare a apei, o trusă de prim ajutor și un mijloc de comunicare. Verifică valabilitatea stingătorului și a rachetelor de semnalizare.",
      },
      {
        title: "Planificarea ieșirii pe apă",
        bullets: [
          "Verifică prognoza meteo și starea apei",
          "Anunță pe cineva de la mal: rută, ora estimată de întoarcere",
          "Verifică autonomia de combustibil (regula treimilor)",
        ],
        narration: "Înainte de a ieși pe apă, verifică prognoza meteo și starea mării sau a fluviului. Anunță pe cineva de la mal despre ruta ta și ora estimată de întoarcere. Calculează combustibilul după regula treimilor: o treime pentru dus, o treime pentru întors și o treime rezervă pentru situații neprevăzute.",
      },
      {
        title: "Lista de control pre-plecare",
        bullets: [
          "Motor, combustibil, ulei, răcire — verificate",
          "Dotări de siguranță la locul lor și funcționale",
          "Luminile, instrumentele și pompa de santină — testate",
        ],
        narration: "Chiar înainte de plecare, parcurge o listă de control: motorul pornește și se răcește corect, ai suficient combustibil și ulei, dotările de siguranță sunt la locul lor și funcționale, luminile de navigație și instrumentele merg, iar pompa de santină funcționează. O verificare disciplinată previne majoritatea incidentelor.",
      },
    ],
    quiz: [
      { q: "Câte veste de salvare trebuie să existe la bord?", options: ["Una de rezervă", "Câte una pentru fiecare persoană la bord", "Doar pentru conducător", "Depinde de motor"], answer: 1, explain: "Fiecare persoană la bord trebuie să aibă o vestă de salvare potrivită." },
      { q: "Ce presupune 'regula treimilor' pentru combustibil?", options: ["1/3 dus, 1/3 întors, 1/3 rezervă", "Tot rezervorul pentru dus", "Jumătate dus, jumătate întors", "Nu contează consumul"], answer: 0, explain: "O treime dus, o treime întors și o treime rezervă de siguranță." },
      { q: "Ce ar trebui să faci înainte de a ieși pe apă?", options: ["Nimic special", "Verifici meteo și anunți pe cineva despre rută și ora de întoarcere", "Pleci fără să anunți", "Umpli barca la maxim de persoane"], answer: 1, explain: "Prognoza + plan de navigație anunțat = siguranță crescută." },
      { q: "Care document NU poate lipsi la un control?", options: ["Chitanța de combustibil", "Permisul/brevetul de conducător valabil", "Un ziar", "Harta orașului"], answer: 1, explain: "Brevetul valabil pentru categoria ambarcațiunii este obligatoriu." },
    ],
  },

  /* ===================== MODUL 2 ===================== */
  {
    id: "day05", day: 5, module: 2,
    title: "Manevre de bază și efectul elicei",
    summary: "Plecare, oprire, viraje și efectul de evantai al elicei.",
    slides: [
      {
        title: "Pornirea și plecarea în siguranță",
        bullets: [
          "Verifică zona din jur, molează parâmele treptat",
          "Viteză mică în port/zone aglomerate ('viteză de siguranță')",
          "Respectă distanța față de înotători, maluri, alte ambarcațiuni",
        ],
        narration: "La plecare, verifică mai întâi zona din jur pentru alte ambarcațiuni, înotători sau obstacole. Molează parâmele treptat și pornește cu viteză mică. În porturi și zone aglomerate menține o viteză de siguranță, care îți permite să oprești la timp și să eviți valul de etravă ce poate deranja alte ambarcațiuni.",
      },
      {
        title: "Guvernarea și virajele",
        bullets: [
          "Ambarcațiunea virează în jurul unui punct de pivot",
          "Pupa se deplasează lateral în viraj — atenție la spațiul din spate",
          "Curentul și vântul influențează traiectoria reală",
        ],
        narration: "Spre deosebire de o mașină, ambarcațiunea nu virează în jurul roților din față, ci în jurul unui punct de pivot situat mai spre prova. Când virezi, pupa se deplasează lateral în direcția opusă, așa că trebuie să ai grijă la spațiul din spate. Vântul și curentul modifică traiectoria reală, de aceea trebuie anticipate.",
      },
      {
        title: "Efectul elicei (efectul de evantai)",
        bullets: [
          "Elicea împinge pupa lateral, mai ales la marșarier",
          "Elice pe dreapta: pupa tinde spre babord la marșarier",
          "Folosește acest efect în avantajul tău la acostare",
        ],
        narration: "Elicea nu produce doar împingere înainte, ci și un efect lateral asupra pupei, numit efect de evantai, resimțit mai ales la marșarier. La o elice cu rotație pe dreapta, pupa tinde să se deplaseze spre babord când dai înapoi. Un conducător experimentat folosește acest efect în avantajul său la manevrele de acostare.",
      },
      {
        title: "Oprirea și controlul vitezei",
        bullets: [
          "Ambarcațiunea nu are frâne — reduci gazul din timp",
          "Marșarierul (reversul) ajută la oprire, dar cu prudență",
          "Anticipează distanța de oprire, mai mare pe valuri/curent",
        ],
        narration: "O ambarcațiune nu are frâne, așa că oprirea se face reducând din timp accelerația și, la nevoie, folosind marșarierul cu prudență. Distanța de oprire depinde de viteză, de încărcătură, de curent și de valuri. Anticipează întotdeauna și lasă spațiu suficient, mai ales în apropierea pontoanelor și a altor ambarcațiuni.",
      },
    ],
    quiz: [
      { q: "În jurul cărui element virează ambarcațiunea?", options: ["Roților din față", "Unui punct de pivot spre prova", "Elicei", "Ancorei"], answer: 1, explain: "Ambarcațiunea pivotează în jurul unui punct situat spre prova; pupa se mișcă lateral." },
      { q: "Ce este 'efectul de evantai' al elicei?", options: ["Vibrația motorului", "Deplasarea laterală a pupei produsă de elice", "Consumul de combustibil", "Zgomotul elicei"], answer: 1, explain: "Elicea împinge pupa lateral, mai ales la marșarier." },
      { q: "De ce trebuie să reduci viteza din timp la oprire?", options: ["Ca să economisești combustibil", "Pentru că ambarcațiunea nu are frâne", "Ca să faci zgomot mai puțin", "Nu este necesar"], answer: 1, explain: "Fără frâne, oprirea se anticipează prin reducerea gazului și eventual revers." },
      { q: "Ce este 'viteza de siguranță'?", options: ["Viteza maximă a bărcii", "O viteză care permite oprirea la timp și evitarea pericolelor", "Viteza motorului la ralanti", "Viteza curentului"], answer: 1, explain: "Viteza adaptată la condiții, care permite manevre de evitare și oprire la timp." },
    ],
  },
  {
    id: "day06", day: 6, module: 2,
    title: "Acostarea și plecarea de la ponton",
    summary: "Manevre de acostare pe vânt și curent, folosirea parâmelor.",
    slides: [
      {
        title: "Pregătirea acostării",
        bullets: [
          "Pregătește parâmele și baloanele (tampoane) din timp",
          "Evaluează direcția vântului și a curentului",
          "Apropie-te încet, sub un unghi controlat",
        ],
        narration: "Înainte de acostare, pregătește parâmele și baloanele de acostare, numite și tampoane, care protejează bordul. Evaluează direcția vântului și a curentului, deoarece acestea influențează puternic manevra. Apropie-te de ponton încet, sub un unghi de aproximativ douăzeci până la treizeci de grade, gata să corectezi.",
      },
      {
        title: "Acostarea cu vânt/curent dinspre ponton",
        bullets: [
          "Vântul te împinge spre ponton — apropiere paralelă, lentă",
          "Lasă natura să apropie ambarcațiunea, corectează fin",
          "Fixează întâi parâma din prova sau un spring",
        ],
        narration: "Când vântul sau curentul bate dinspre apă spre ponton, te va împinge natural către mal. În acest caz apropie-te paralel și foarte încet, lăsând vântul să apropie ambarcațiunea, și corectează fin cu motorul. Fixează mai întâi o parâmă, de obicei din prova sau un spring, pentru a controla mișcarea.",
      },
      {
        title: "Acostarea cu vânt/curent dinspre mal",
        bullets: [
          "Vântul te împinge departe de ponton — unghi mai mare",
          "Apropiere mai fermă, fixează rapid prova",
          "Folosește un spring pentru a aduce pupa la ponton",
        ],
        narration: "Când vântul bate dinspre ponton spre apă, te împinge departe de mal. În acest caz apropie-te sub un unghi mai mare și mai ferm, apoi fixează rapid parâma din prova. Folosind o parâmă spring și un ușor impuls de motor, poți aduce pupa lângă ponton, controlând întreaga ambarcațiune.",
      },
      {
        title: "Parâmele de acostare",
        bullets: [
          "Parâma din prova și cea din pupa țin ambarcațiunea la ponton",
          "Springurile împiedică deplasarea înainte/înapoi",
          "Noduri utile: nodul de tachet, cap de berbec, ocheți",
        ],
        narration: "Ambarcațiunea se fixează la ponton cu parâme: una din prova, una din pupa și una sau două parâme spring care împiedică deplasarea înainte și înapoi. Învață câteva noduri esențiale, cum ar fi nodul de tachet pentru fixarea rapidă și nodul cap de berbec pentru a lega ambarcațiunea de un stâlp. O legare corectă rezistă valurilor și vântului.",
      },
    ],
    quiz: [
      { q: "La ce folosesc baloanele (tampoanele) de acostare?", options: ["La creșterea vitezei", "La protejarea bordului împotriva frecării de ponton", "La ancorare", "La semnalizare"], answer: 1, explain: "Tampoanele protejează corpul ambarcațiunii la contactul cu pontonul." },
      { q: "Când vântul te împinge dinspre mal spre apă, cum acostezi?", options: ["Paralel și foarte încet", "Sub un unghi mai mare și fixezi rapid prova", "Nu mai acostezi", "Cu spatele mereu"], answer: 1, explain: "Vântul te îndepărtează, deci abordare mai fermă și fixarea rapidă a prova." },
      { q: "Ce rol are o parâmă 'spring'?", options: ["Ține doar prova", "Împiedică deplasarea înainte/înapoi la ponton", "Ridică ancora", "Semnalizează pericol"], answer: 1, explain: "Springurile controlează mișcarea longitudinală față de ponton." },
      { q: "Cum te aproprii ideal de ponton?", options: ["Cu viteză maximă", "Încet, sub un unghi controlat, cu parâmele pregătite", "Perpendicular și rapid", "Fără să privești vântul"], answer: 1, explain: "Apropiere lentă, unghi controlat, parâme și tampoane pregătite." },
    ],
  },
  {
    id: "day07", day: 7, module: 2,
    title: "Ancorarea",
    summary: "Tipuri de ancore, procedura de ancorare și menținerea poziției.",
    slides: [
      {
        title: "Tipuri de ancore",
        bullets: [
          "Ancoră tip plug (CQR), Danforth (fluke), Bruce/claw, grapnel",
          "Alegerea depinde de fundul apei: nisip, mâl, pietre, alge",
          "Lanțul/parâma (calabrot) + eventual o lungime de lanț la ancoră",
        ],
        narration: "Există mai multe tipuri de ancore: ancora tip plug, ancora Danforth cu palete late, ancora tip gheară și ancora grapnel cu brațe multiple. Alegerea depinde de natura fundului apei: nisip, mâl, pietre sau alge. Ancora este legată printr-un calabrot, adesea cu o porțiune de lanț lângă ancoră, care ajută la prinderea în fund.",
      },
      {
        title: "Alegerea locului de ancorare",
        bullets: [
          "Fund bun de agățare, adăpostit de vânt și valuri",
          "Departe de șenal navigabil, cabluri, conducte submarine",
          "Verifică adâncimea și lasă spațiu de balans (swing)",
        ],
        narration: "Alege un loc de ancorare cu fund bun de agățare, adăpostit de vânt și valuri și departe de șenalul navigabil, de cabluri sau conducte submarine. Verifică adâncimea și ține cont că ambarcațiunea se va roti în jurul ancorei odată cu vântul, deci lasă spațiu suficient de balans față de alte ambarcațiuni și obstacole.",
      },
      {
        title: "Procedura de ancorare",
        bullets: [
          "Oprește ambarcațiunea deasupra locului ales, cu prova în vânt",
          "Filează ancora controlat — nu o arunca peste tot lanțul deodată",
          "Lungimea calabrotului: de 3–5 ori adâncimea (până la 7x pe vreme rea)",
        ],
        narration: "Pentru a ancora, oprește ambarcațiunea deasupra locului ales, cu prova orientată în vânt. Filează ancora controlat, lăsând-o să coboare pe măsură ce ambarcațiunea derivă ușor înapoi. Lungimea calabrotului trebuie să fie de trei până la cinci ori adâncimea apei, iar pe vreme rea chiar de șapte ori, pentru ca ancora să se prindă bine.",
      },
      {
        title: "Verificarea prinderii și ridicarea ancorei",
        bullets: [
          "Verifică repere pe mal — dacă rămân fixe, ancora ține",
          "Ancoră care 'ară' (derapă) = ridici și repoziționezi",
          "Ridicare: te apropii deasupra ancorei, apoi o desprinzi vertical",
        ],
        narration: "După ce ai ancorat, verifică dacă ancora ține: alege două repere fixe pe mal și urmărește dacă poziția rămâne constantă. Dacă ancora arează, adică derapă pe fund, ridic-o și repoziționează. Pentru ridicare, apropie ambarcațiunea deasupra ancorei folosind motorul, apoi trage calabrotul vertical pentru a o desprinde din fund.",
      },
    ],
    quiz: [
      { q: "Cât de lung ar trebui să fie calabrotul (lanțul/parâma) în raport cu adâncimea?", options: ["Egal cu adâncimea", "De 3–5 ori adâncimea (mai mult pe vreme rea)", "De 10 ori mai scurt", "Nu contează"], answer: 1, explain: "Un raport de 3:1 până la 5:1 (chiar 7:1 pe furtună) asigură prinderea." },
      { q: "Cum verifici că ancora ține?", options: ["Oprești motorul și pleci", "Urmărești două repere fixe pe mal", "Arunci încă o ancoră", "Nu se poate verifica"], answer: 1, explain: "Repere fixe pe mal: dacă poziția rămâne constantă, ancora ține." },
      { q: "Cum orientezi ambarcațiunea la ancorare?", options: ["Cu pupa în vânt", "Cu prova în vânt", "Perpendicular pe vânt", "Nu contează"], answer: 1, explain: "Cu prova în vânt te oprești controlat și filezi ancora în timp ce derivi înapoi." },
      { q: "Ce înseamnă că ancora 'ară'?", options: ["Se prinde perfect", "Derapă pe fund fără să țină", "Se ridică singură", "E ruginită"], answer: 1, explain: "Ancora care ară derapă pe fund; trebuie ridicată și repoziționată." },
    ],
  },

  /* ===================== MODUL 3 ===================== */
  {
    id: "day08", day: 8, module: 3,
    title: "Echipamentul de siguranță",
    summary: "Veste, colaci, stingătoare și mijloace de semnalizare.",
    slides: [
      {
        title: "Vestele și mijloacele de flotabilitate",
        bullets: [
          "Vestă de salvare (întoarce persoana pe spate) vs. vestă de sprijin",
          "Trebuie să fie de mărimea corectă și îmbrăcată corect",
          "Copiii și înotătorii slabi: vestă purtată permanent",
        ],
        narration: "Vestele de salvare adevărate sunt concepute să întoarcă o persoană inconștientă cu fața în sus, spre deosebire de vestele de sprijin, folosite doar de înotători. Vesta trebuie să fie de mărimea corectă, îmbrăcată și încheiată corect. Copiii, înotătorii slabi și toți pasagerii pe vreme rea ar trebui să poarte vesta permanent.",
      },
      {
        title: "Colacul și dispozitivele de salvare",
        bullets: [
          "Colacul de salvare cu saulă (frânghie) — aruncat spre persoana în apă",
          "Bară/cârlig de salvare, scară de urcare la bord",
          "Dispozitiv de localizare (fluier, lumină, geamandură luminoasă)",
        ],
        narration: "Colacul de salvare, prevăzut cu o saulă, se aruncă spre persoana căzută în apă pentru a o menține la suprafață și a o trage la bord. Utile sunt și cârligul de salvare, scara de urcare și dispozitivele de localizare precum fluierul, o lumină sau o geamandură luminoasă, care ajută la găsirea persoanei, mai ales noaptea.",
      },
      {
        title: "Stingătoarele de incendiu",
        bullets: [
          "Verifică tipul potrivit și presiunea/valabilitatea",
          "Amplasare accesibilă, nu lângă motor",
          "Tehnica PASS: scoți siguranța, țintești baza focului, apeși, baleiezi",
        ],
        narration: "Stingătorul de incendiu trebuie să fie de tipul potrivit ambarcațiunii și verificat ca presiune și valabilitate. Amplasează-l într-un loc accesibil, dar nu chiar lângă motor, unde ar putea izbucni focul. Folosește tehnica cunoscută: scoți siguranța, țintești baza flăcării, apeși mânerul și baleiezi de la o parte la alta.",
      },
      {
        title: "Semnale de primejdie",
        bullets: [
          "Rachete de semnalizare (roșii), fumigene, oglindă heliografică",
          "Semnal sonor continuu, brațe ridicate și coborâte lateral",
          "Radio VHF: apel MAYDAY pe canalul 16",
        ],
        narration: "Pentru a cere ajutor există mai multe semnale de primejdie: rachete de semnalizare roșii, fumigene portocalii, o oglindă heliografică pentru a reflecta soarele, un semnal sonor continuu sau mișcarea lentă a brațelor întinse, ridicate și coborâte lateral. Cel mai eficient este apelul MAYDAY prin radio VHF pe canalul șaisprezece.",
      },
    ],
    quiz: [
      { q: "Ce face o vestă de salvare adevărată pentru o persoană inconștientă?", options: ["O ține pe burtă", "O întoarce cu fața în sus", "Nu are efect", "O scufundă"], answer: 1, explain: "Vesta de salvare întoarce persoana pe spate, cu fața la suprafață." },
      { q: "Care este tehnica corectă de folosire a stingătorului?", options: ["Țintești vârful flăcării", "Scoți siguranța, țintești baza focului, apeși, baleiezi", "Îl arunci în foc", "Îl golești în aer"], answer: 1, explain: "Se țintește baza focului (nu flacăra) și se baleiază lateral." },
      { q: "Pe ce canal VHF se transmite un apel de primejdie MAYDAY?", options: ["Canalul 6", "Canalul 16", "Canalul 72", "Orice canal"], answer: 1, explain: "Canalul 16 VHF este canalul internațional de primejdie și apel." },
      { q: "Cum se folosește colacul de salvare?", options: ["Se poartă pe cap", "Se aruncă spre persoana din apă, legat cu o saulă", "Se pune sub motor", "Se folosește ca ancoră"], answer: 1, explain: "Colacul cu saulă se aruncă spre persoană pentru flotabilitate și tractare." },
    ],
  },
  {
    id: "day09", day: 9, module: 3,
    title: "Situații de urgență",
    summary: "Om la apă, incendiu, avarie, eșuare și remorcaj.",
    slides: [
      {
        title: "Om la apă (MOB)",
        bullets: [
          "Strigă 'Om la apă!', arată permanent spre persoană",
          "Aruncă un obiect plutitor, întoarce ambarcațiunea spre ea",
          "Apropiere pe partea din vânt, motor la ralanti/oprit la preluare",
        ],
        narration: "Dacă o persoană cade peste bord, strigă imediat om la apă și pune pe cineva să arate permanent spre ea, fără să o piardă din ochi. Aruncă un obiect plutitor pentru a marca locul și pentru flotabilitate, apoi întoarce ambarcațiunea. Apropie-te dinspre partea din vânt și, la preluare, pune motorul la ralanti sau oprește-l, pentru a nu răni persoana cu elicea.",
      },
      {
        title: "Incendiu la bord",
        bullets: [
          "Oprește motorul și sursa de combustibil, îndepărtează barca de vânt",
          "Folosește stingătorul pe baza focului",
          "Dacă nu poți controla focul: veste, semnal de primejdie, abandon",
        ],
        narration: "În caz de incendiu, oprește motorul și sursa de combustibil și orientează ambarcațiunea astfel încât vântul să îndepărteze flăcările de pasageri. Folosește stingătorul, țintind baza focului. Dacă focul nu poate fi controlat, pune-le tuturor vestele, transmite un semnal de primejdie și pregătește abandonarea ambarcațiunii în siguranță.",
      },
      {
        title: "Avarie, infiltrații și eșuare",
        bullets: [
          "Infiltrație: localizezi, oprești/reduci intrarea apei, pompezi santina",
          "Eșuare (rămâi pe fund): oprești elicea, evaluezi avaria",
          "Nu forța motorul dacă rișți să afectezi corpul sau elicea",
        ],
        narration: "În caz de avarie cu infiltrație de apă, încearcă să localizezi și să reduci intrarea apei, apoi pornește pompa de santină și evacuează manual. Dacă ambarcațiunea eșuează, adică rămâne pe fund, oprește imediat elicea și evaluează avaria. Nu forța motorul dacă rișți să deteriorezi corpul sau elicea; uneori e mai sigur să aștepți ajutor sau creșterea nivelului apei.",
      },
      {
        title: "Remorcajul",
        bullets: [
          "Parâmă de remorcaj rezistentă, prinsă de puncte solide",
          "Pornire lentă, fără smucituri, viteză redusă",
          "Comunicare clară între ambarcațiuni, atenție la parâma sub tensiune",
        ],
        narration: "Când remorchezi sau ești remorcat, folosește o parâmă rezistentă, prinsă de puncte solide de structură. Pornește lent, fără smucituri, și menține o viteză redusă. Comunicați clar între ambarcațiuni și stați la distanță de parâma aflată sub tensiune, deoarece, dacă se rupe, poate provoca răni grave prin biciuire.",
      },
    ],
    quiz: [
      { q: "Ce faci imediat când cineva cade peste bord?", options: ["Accelerezi și pleci", "Strigi 'om la apă', arăți spre persoană și arunci un obiect plutitor", "Oprești și nu faci nimic", "Sari după el fără vestă"], answer: 1, explain: "Alarma, supravegherea vizuală permanentă și marcarea locului sunt esențiale." },
      { q: "La preluarea persoanei din apă, ce faci cu motorul?", options: ["Îl accelerezi", "Îl pui la ralanti sau îl oprești", "Îl lași la turație mare", "Nu contează"], answer: 1, explain: "Motor la ralanti/oprit pentru a evita rănirea cu elicea." },
      { q: "De ce trebuie să stai departe de parâma de remorcaj sub tensiune?", options: ["Face zgomot", "Dacă se rupe, poate provoca răni grave prin biciuire", "Consumă combustibil", "Nu are importanță"], answer: 1, explain: "O parâmă întinsă care cedează se retrage violent și poate lovi." },
      { q: "În caz de incendiu, spre ce țintești cu stingătorul?", options: ["Vârful flăcărilor", "Baza focului", "Fumul", "Cerul"], answer: 1, explain: "Se stinge de la baza focului, unde este combustibilul care arde." },
    ],
  },
  {
    id: "day10", day: 10, module: 3,
    title: "Primul ajutor pe apă",
    summary: "Hipotermie, înec, resuscitare și răni frecvente.",
    slides: [
      {
        title: "Hipotermia",
        bullets: [
          "Apa rece scade rapid temperatura corpului",
          "Semne: frisoane, confuzie, amorțeală, apatie",
          "Încălzire treptată, haine uscate, evită mișcările bruște",
        ],
        narration: "Hipotermia apare când corpul pierde căldură mai repede decât o poate produce, iar apa rece accelerează acest proces. Semnele includ frisoane, confuzie, amorțeală și apatie. Scoate persoana din apă, înlătură hainele ude, învel-o în ceva uscat și încălzește-o treptat. Evită mișcările bruște și frecarea agresivă, care pot fi periculoase.",
      },
      {
        title: "Înecul și degajarea căilor respiratorii",
        bullets: [
          "Scoate victima din apă în siguranță",
          "Verifică starea de conștiență și respirația",
          "Dacă nu respiră: începe resuscitarea, cere ajutor",
        ],
        narration: "În caz de înec, scoate victima din apă cât mai repede și în siguranță, fără a te pune pe tine în pericol. Verifică dacă este conștientă și dacă respiră. Dacă nu respiră normal, eliberează căile respiratorii și începe imediat manevrele de resuscitare, cerând în paralel ajutor prin radio sau telefon.",
      },
      {
        title: "Resuscitarea cardio-pulmonară (RCP)",
        bullets: [
          "30 de compresii toracice : 2 ventilații",
          "Ritm ~100–120 compresii/minut, apăsare 5–6 cm",
          "Continui până sosește ajutorul sau victima își revine",
        ],
        narration: "Resuscitarea cardio-pulmonară se face alternând treizeci de compresii toracice cu două ventilații. Apasă în centrul pieptului, la o adâncime de cinci până la șase centimetri, într-un ritm de aproximativ o sută până la o sută douăzeci de compresii pe minut. Continuă neîntrerupt până sosește ajutorul specializat sau până când victima începe să respire.",
      },
      {
        title: "Răni frecvente și trusa de prim ajutor",
        bullets: [
          "Tăieturi, arsuri, insolație, rău de mare, mușcături",
          "Oprești sângerarea prin presiune directă, protejezi rana",
          "Trusa: pansamente, dezinfectant, foarfecă, folie termică, mănuși",
        ],
        narration: "La bord pot apărea tăieturi, arsuri, insolație, rău de mare sau mușcături. O sângerare se oprește prin presiune directă pe rană, iar rana se protejează cu un pansament curat. Trusa de prim ajutor ar trebui să conțină pansamente, dezinfectant, o foarfecă, o folie termică de supraviețuire și mănuși de protecție. Verifică periodic conținutul și valabilitatea.",
      },
    ],
    quiz: [
      { q: "Care este raportul corect compresii:ventilații la RCP pentru adult?", options: ["15:2", "30:2", "5:1", "10:2"], answer: 1, explain: "Standardul este 30 de compresii urmate de 2 ventilații." },
      { q: "Cum tratezi hipotermia?", options: ["Frecție agresivă și alcool", "Haine uscate și încălzire treptată", "O bagi din nou în apă", "Nu faci nimic"], answer: 1, explain: "Scoți din apă, haine uscate, încălzire treptată, fără mișcări bruște." },
      { q: "Cum oprești o sângerare externă?", options: ["O speli cu apă de mare", "Aplici presiune directă pe rană", "O lași descoperită", "Aplici gheață direct pe rană"], answer: 1, explain: "Presiunea directă oprește sângerarea; apoi protejezi rana." },
      { q: "Ce faci întâi cu o victimă scoasă din apă care nu respiră?", options: ["Îi dai apă", "Eliberezi căile respiratorii și începi resuscitarea", "O lași să se odihnească", "O întorci pe burtă și aștepți"], answer: 1, explain: "Fără respirație normală → RCP imediat + chemarea ajutorului." },
    ],
  },

  /* ===================== MODUL 4 ===================== */
  {
    id: "day11", day: 11, module: 4,
    title: "Semnalizarea pe apă și balizajul",
    summary: "Sistemul de balizaj IALA, geamanduri laterale și cardinale.",
    slides: [
      {
        title: "Rolul balizajului",
        bullets: [
          "Marchează șenalul navigabil, pericolele și zonele speciale",
          "Sistemul internațional IALA — Regiunea A (Europa)",
          "Geamanduri (balize) plutitoare, cu formă, culoare și lumină",
        ],
        narration: "Balizajul marchează șenalul navigabil, pericolele și zonele speciale de pe apă. În Europa se folosește sistemul internațional IALA, Regiunea A. Semnele plutitoare, numite geamanduri sau balize, se disting prin formă, culoare, marca de vârf și, noaptea, prin caracteristica luminii lor.",
      },
      {
        title: "Mărcile laterale (Regiunea A)",
        bullets: [
          "Babord: roșu, formă cilindrică (can) — o lași la stânga la intrare",
          "Tribord: verde, formă conică — o lași la dreapta la intrare",
          "'Intrare' = dinspre mare spre port / în sensul curentului de flux",
        ],
        narration: "Mărcile laterale indică marginile șenalului. În Regiunea A, marca de babord este roșie și cilindrică, iar marca de tribord este verde și conică. La intrarea în port, dinspre mare, lași marca roșie la stânga și marca verde la dreapta. Sensul convențional de intrare este dinspre mare spre uscat sau în sensul curentului de flux.",
      },
      {
        title: "Mărcile cardinale",
        bullets: [
          "Indică unde este apa sigură față de un pericol: N, E, S, V",
          "Negru-galben, cu conuri de vârf orientate specific",
          "Treci prin partea indicată (ex. marca Nord: treci pe la nord de ea)",
        ],
        narration: "Mărcile cardinale arată în ce direcție se află apa sigură față de un pericol, folosind punctele cardinale nord, est, sud și vest. Sunt vopsite în negru și galben și au două conuri de vârf orientate în mod specific fiecărei direcții. Treci prin partea indicată de marcă: pe la nord de o marcă Nord, pe la est de o marcă Est și așa mai departe.",
      },
      {
        title: "Alte mărci utile",
        bullets: [
          "Pericol izolat: negru cu bandă roșie, două sfere negre — ocolește",
          "Ape sigure: roșu-alb vertical, sferă roșie — poți trece pe oricare parte",
          "Marcă specială: galbenă (zone de agrement, cabluri, etc.)",
        ],
        narration: "Mai există și alte mărci importante. Marca de pericol izolat este neagră cu o bandă roșie și are două sfere negre; se ancorează chiar deasupra pericolului, deci trebuie ocolită. Marca de ape sigure, cu dungi roșii și albe verticale și o sferă roșie la vârf, indică apă navigabilă de jur împrejur. Mărcile speciale, de culoare galbenă, semnalează zone de agrement, cabluri sau alte amenajări.",
      },
    ],
    quiz: [
      { q: "În sistemul IALA Regiunea A, ce culoare are marca de babord?", options: ["Verde", "Roșu", "Galben", "Negru"], answer: 1, explain: "Regiunea A: babord = roșu (cilindric), tribord = verde (conic)." },
      { q: "La intrarea în port (dinspre mare), pe ce parte lași marca verde?", options: ["La stânga", "La dreapta", "O ignori", "Depinde de vânt"], answer: 1, explain: "Marca verde de tribord se lasă la dreapta la intrare." },
      { q: "Ce indică o marcă cardinală Nord?", options: ["Pericol la nord", "Că apa sigură e la nord — treci pe la nord de ea", "Un port", "O zonă de pescuit"], answer: 1, explain: "Marca cardinală Nord: apa sigură/adâncă e la nord de marcă." },
      { q: "Ce reprezintă o marcă neagră cu bandă roșie și două sfere negre?", options: ["Ape sigure", "Pericol izolat — se ocolește", "Zonă de agrement", "Marcă de babord"], answer: 1, explain: "Marca de pericol izolat stă deasupra unui pericol punctual; se ocolește." },
    ],
  },
  {
    id: "day12", day: 12, module: 4,
    title: "Regulile de drum (RIPAM/COLREG)",
    summary: "Reguli de întâlnire, prioritate și evitarea coliziunilor.",
    slides: [
      {
        title: "Principii generale",
        bullets: [
          "Veghe permanentă (vizuală și auditivă) + viteză de siguranță",
          "Evită coliziunea din timp, cu manevre clare și vizibile",
          "Regulile se aplib tuturor; ai grijă și de nave mai mari/lente",
        ],
        narration: "Regulile de evitare a coliziunilor, cunoscute ca RIPAM sau COLREG, cer în primul rând o veghe permanentă, vizuală și auditivă, și o viteză de siguranță adaptată condițiilor. Coliziunea se evită din timp, prin manevre clare și vizibile, făcute devreme și amplu. Regulile se aplică tuturor, dar trebuie să ții cont de navele mari sau greu manevrabile.",
      },
      {
        title: "Întâlnirea față în față",
        bullets: [
          "Două ambarcațiuni cu motor din sens opus: fiecare vireze la tribord",
          "Se trec pe partea babord (stânga) una față de cealaltă",
          "Manevră timpurie și clară",
        ],
        narration: "Când două ambarcațiuni cu motor se apropie din sensuri opuse, față în față, fiecare trebuie să vireze la tribord, adică la dreapta. Astfel se vor trece una pe lângă cealaltă pe partea babord, ca pe un drum cu circulație pe dreapta. Manevra trebuie făcută din timp și suficient de amplu pentru a fi ușor de înțeles de cealaltă ambarcațiune.",
      },
      {
        title: "Drumuri care se intersectează",
        bullets: [
          "Ambarcațiunea care vine din tribord (dreapta) are prioritate",
          "Cel obligat să cedeze: reduce viteza sau trece prin spatele celeilalte",
          "Nava privilegiată își menține drumul și viteza",
        ],
        narration: "Când drumurile a două ambarcațiuni cu motor se intersectează, are prioritate cea care vine din tribord, adică din dreapta ta. Ambarcațiunea obligată să cedeze trebuie să manevreze din timp, reducând viteza sau trecând prin spatele celeilalte. Nava care are prioritate, numită privilegiată, își menține în general drumul și viteza, pentru a fi previzibilă.",
      },
      {
        title: "Depășirea și ierarhia priorităților",
        bullets: [
          "Cel care depășește cedează întotdeauna trecerea celui depășit",
          "Ambarcațiunile cu motor cedează celor cu vele, de pescuit, greu manevrabile",
          "Excepție: în șenal îngust, navele mari au prioritate practică",
        ],
        narration: "Ambarcațiunea care depășește o alta trebuie întotdeauna să se ferească și să cedeze trecerea celei depășite, indiferent de tip. Există și o ierarhie a priorităților: ambarcațiunile cu motor cedează, de regulă, celor cu vele, celor angajate în pescuit sau navelor greu manevrabile. Totuși, în șenaluri înguste, navele mari care nu pot ieși din șenal au prioritate practică.",
      },
    ],
    quiz: [
      { q: "Două bărci cu motor se întâlnesc față în față. Ce fac?", options: ["Fiecare vireze la babord", "Fiecare vireze la tribord (dreapta)", "Ambele opresc", "Cea mai rapidă trece prima"], answer: 1, explain: "Față în față: fiecare la tribord, se trec pe babord (ca pe dreapta)." },
      { q: "La drumuri care se intersectează, cine are prioritate?", options: ["Cel care vine din babord", "Cel care vine din tribord (dreapta)", "Cel mai mare", "Cel mai rapid"], answer: 1, explain: "Ambarcațiunea care vine din tribord este privilegiată." },
      { q: "Cine cedează la o depășire?", options: ["Cel depășit", "Cel care depășește", "Nimeni", "Cel cu motor mai mare"], answer: 1, explain: "Ambarcațiunea care depășește se ferește mereu de cea depășită." },
      { q: "De regulă, o barcă cu motor cedează în fața...", options: ["Unui jet-ski", "Unei ambarcațiuni cu vele / de pescuit / greu manevrabile", "Unei bărci mai mici cu motor", "Nimănui"], answer: 1, explain: "Ierarhia: motorul cedează velelor, pescuitului, navelor greu manevrabile." },
    ],
  },
  {
    id: "day13", day: 13, module: 4,
    title: "Lumini, semne și semnale sonore",
    summary: "Luminile de navigație pe timp de noapte și semnalele sonore.",
    slides: [
      {
        title: "Luminile de navigație de bază",
        bullets: [
          "Babord: roșu; Tribord: verde (fiecare 112,5°)",
          "Pupa: lumină albă (135°); Catarg/pe deasupra: alb",
          "Se aprind de la apus la răsărit și pe vizibilitate redusă",
        ],
        narration: "Noaptea și pe vizibilitate redusă, ambarcațiunile poartă lumini de navigație. Lumina roșie marchează babordul, iar cea verde tribordul, fiecare acoperind un sector de o sută doisprezece grade și jumătate. La pupa se află o lumină albă, iar navele cu motor poartă și o lumină albă de catarg. Aceste lumini se aprind de la apus până la răsărit.",
      },
      {
        title: "Interpretarea luminilor altei nave",
        bullets: [
          "Vezi roșu ȘI verde + alb = vine spre tine (din față)",
          "Vezi doar verde = o vezi pe tribordul ei; doar roșu = pe babordul ei",
          "Vezi doar alb (pupa) = o ajungi din urmă / merge în fața ta",
        ],
        narration: "Luminile altei nave îți spun cum se mișcă. Dacă vezi simultan roșu și verde, plus o lumină albă deasupra, nava vine direct spre tine. Dacă vezi doar verde, o privești dinspre tribordul ei; dacă vezi doar roșu, dinspre babordul ei. Dacă vezi doar o lumină albă de pupa, înseamnă că o ajungi din urmă și trebuie să te fereștii ca cel care depășește.",
      },
      {
        title: "Semnale sonore de manevră",
        bullets: [
          "Un sunet scurt = 'vireze la tribord (dreapta)'",
          "Două sunete scurte = 'vireze la babord (stânga)'",
          "Trei sunete scurte = 'dau înapoi (marșarier)'",
        ],
        narration: "Semnalele sonore comunică intențiile de manevră, mai ales când navele se văd. Un sunet scurt înseamnă vireze la tribord, adică la dreapta. Două sunete scurte înseamnă vireze la babord, la stânga. Trei sunete scurte înseamnă că nava dă înapoi, folosind marșarierul. Aceste semnale ajută la evitarea neînțelegerilor.",
      },
      {
        title: "Semnale de atenție și de vizibilitate redusă",
        bullets: [
          "Cinci sau mai multe sunete scurte = 'nu îți înțeleg intențiile / atenție'",
          "Un sunet lung = 'ies dintr-un cot/port' sau semnal la vizibilitate redusă",
          "Pe ceață: semnale sonore periodice pentru a fi auzit",
        ],
        narration: "Cinci sau mai multe sunete scurte și rapide reprezintă un semnal de atenție sau de îndoială, însemnând că nu înțelegi intențiile celeilalte nave sau că manevra ei te îngrijorează. Un sunet lung se folosește la ieșirea dintr-un cot de râu sau dintr-un port. Pe ceață și în vizibilitate redusă, navele emit semnale sonore periodice pentru a fi auzite de celelalte.",
      },
    ],
    quiz: [
      { q: "Ce culoare are lumina de navigație de la babord?", options: ["Verde", "Roșu", "Alb", "Galben"], answer: 1, explain: "Babord = roșu, tribord = verde, pupa = alb." },
      { q: "Vezi noaptea și roșu, și verde, și o lumină albă deasupra. Ce înseamnă?", options: ["Nava se îndepărtează", "Nava vine direct spre tine", "Nava e ancorată", "Nava pescuiește"], answer: 1, explain: "Ambele lumini laterale + alb de catarg = navă cu motor venind din față." },
      { q: "Ce înseamnă două sunete scurte?", options: ["Vireze la tribord", "Vireze la babord (stânga)", "Dau înapoi", "Pericol"], answer: 1, explain: "1 scurt = tribord, 2 scurte = babord, 3 scurte = marșarier." },
      { q: "Ce semnalizezi cu cinci (sau mai multe) sunete scurte?", options: ["Salut", "Atenție / nu înțeleg intențiile tale", "Vireze la dreapta", "Opresc motorul"], answer: 1, explain: "Semnal de atenție/îndoială: intențiile celeilalte nave nu sunt clare." },
    ],
  },
  {
    id: "day14", day: 14, module: 4,
    title: "Meteo, planificare și recapitulare",
    summary: "Vremea, planificarea navigației și recapitularea finală.",
    slides: [
      {
        title: "Meteorologia pentru navigatori",
        bullets: [
          "Vânt, valuri, vizibilitate, presiune (barometru scade = vreme rea)",
          "Semne: nori cumulonimbus, rafale, schimbare bruscă de vânt",
          "Buletine meteo marine înainte și în timpul ieșirii",
        ],
        narration: "Vremea influențează direct siguranța pe apă. Urmărește vântul, valurile, vizibilitatea și presiunea atmosferică: o scădere rapidă a barometrului anunță adesea vreme rea. Norii cumulonimbus înalți, rafalele și schimbările bruște de vânt semnalează furtuni. Ascultă buletinele meteo marine înainte de plecare și, dacă se poate, și în timpul navigației.",
      },
      {
        title: "Planificarea navigației",
        bullets: [
          "Traseu, distanțe, puncte de reper, adăposturi pe rută",
          "Maree/curenți, ore de lumină, autonomie de combustibil",
          "Plan alternativ dacă vremea se strică",
        ],
        narration: "O navigație sigură începe cu un plan bun. Stabilește traseul, distanțele, punctele de reper și adăposturile posibile pe rută. Ține cont de curenți, de orele de lumină și de autonomia de combustibil. Pregătește întotdeauna un plan alternativ, ca să te poți adăposti rapid dacă vremea se strică sau apare o problemă tehnică.",
      },
      {
        title: "Conduită responsabilă și mediul",
        bullets: [
          "Fără alcool la comandă; respectă vitezele și zonele reglementate",
          "Nu deranja înotătorii, fauna, alte ambarcațiuni (valul de etravă)",
          "Fără deversări; colectează deșeurile și combustibilul uzat",
        ],
        narration: "Un conducător responsabil nu consumă alcool la comandă, respectă limitele de viteză și zonele reglementate și nu deranjează înotătorii, fauna sau alte ambarcațiuni prin valul de etravă. Protejează mediul: nu deversa combustibil sau deșeuri în apă, colectează gunoiul și folosește instalațiile portuare pentru reziduuri. Apa curată este responsabilitatea tuturor.",
      },
      {
        title: "Recapitulare — ești pregătit pentru examen",
        bullets: [
          "Modul 1: ambarcațiunea și motorul; Modul 2: manevre și ancorare",
          "Modul 3: siguranță și prim ajutor; Modul 4: navigație și reguli de drum",
          "Urmează simularea de examen — succes!",
        ],
        narration: "Ai parcurs toate cele patru module: ambarcațiunea și motorul, manevrele și ancorarea, siguranța și primul ajutor, navigația și regulile de drum. Recapitulează termenii-cheie, regulile de prioritate, luminile și semnalele. Urmează simularea de examen, care combină întrebări din toate modulele. Ai încredere în ceea ce ai învățat. Mult succes la examen!",
      },
    ],
    quiz: [
      { q: "Ce anunță adesea o scădere rapidă a presiunii (barometru)?", options: ["Vreme frumoasă", "Vreme rea / furtună", "Nimic", "Creșterea vizibilității"], answer: 1, explain: "Scăderea barometrului = deteriorarea vremii, adesea furtună." },
      { q: "Ce trebuie să conțină un plan de navigație bun?", options: ["Doar destinația", "Traseu, repere, adăposturi, curenți, autonomie și plan alternativ", "Numai ora de plecare", "Nimic, se improvizează"], answer: 1, explain: "Un plan complet include rută, repere, adăposturi, curenți și rezerve." },
      { q: "Este permis consumul de alcool la comanda ambarcațiunii?", options: ["Da, în cantități mici", "Nu, este interzis și periculos", "Doar noaptea", "Doar în port"], answer: 1, explain: "Alcoolul la comandă este interzis; afectează reacțiile și judecata." },
      { q: "De ce trebuie să limitezi valul de etravă lângă mal?", options: ["Ca să economisești combustibil", "Ca să nu deranjezi/pui în pericol înotătorii și alte ambarcațiuni", "Nu are importanță", "Ca să mergi mai repede"], answer: 1, explain: "Valul mare poate răsturna bărci mici și pune în pericol înotătorii." },
    ],
  },
];

/* ============ BANCA DE ÎNTREBĂRI — SIMULAREA DE EXAMEN ============ */
/* Se extrag aleator EXAM_CONFIG.count întrebări; prag de promovare EXAM_CONFIG.pass. */
const EXAM_CONFIG = { count: 20, pass: 0.7, minutes: 30 };

const EXAM_BANK = [
  // Modul 1
  { m: 1, q: "Cum se numește partea din spate a ambarcațiunii?", options: ["Prova", "Pupa", "Tribord", "Copastia"], answer: 1 },
  { m: 1, q: "Lumina de navigație de la babord este de culoare:", options: ["Verde", "Roșie", "Albă", "Galbenă"], answer: 1 },
  { m: 1, q: "Vaporii de benzină în santină sunt periculoși pentru că:", options: ["Sunt inofensivi", "Sunt mai grei decât aerul și pot exploda", "Răcesc motorul", "Se ridică repede"], answer: 1 },
  { m: 1, q: "Numărul maxim de persoane admise la bord se găsește:", options: ["Pe plăcuța constructorului", "Pe vestă", "În orice ghid", "Nu este reglementat"], answer: 0 },
  { m: 1, q: "Jetul de control (telltale) al motorului confirmă:", options: ["Nivelul de ulei", "Funcționarea răcirii cu apă", "Viteza", "Nivelul bateriei"], answer: 1 },
  { m: 1, q: "La alimentarea cu combustibil trebuie să:", options: ["Lași motorul pornit", "Oprești motorul și eviți orice flacără", "Fumezi liniștit", "Închizi ventilația"], answer: 1 },
  { m: 1, q: "Kill switch-ul (întrerupătorul de siguranță) servește la:", options: ["Pornirea luminilor", "Oprirea motorului dacă operatorul cade peste bord", "Creșterea vitezei", "Încărcarea bateriei"], answer: 1 },
  { m: 1, q: "Bordul liber reprezintă:", options: ["Marginea de sus a bordului", "Înălțimea de la linia de plutire la punte", "Fundul bărcii", "Un tip de motor"], answer: 1 },

  // Modul 2
  { m: 2, q: "Ambarcațiunea virează în jurul:", options: ["Roților din față", "Unui punct de pivot spre prova", "Ancorei", "Elicei"], answer: 1 },
  { m: 2, q: "Efectul de evantai al elicei se manifestă mai ales:", options: ["La ralanti", "La marșarier (revers)", "Când e oprit motorul", "Doar pe vânt"], answer: 1 },
  { m: 2, q: "La ce servesc baloanele (tampoanele) de acostare?", options: ["La ancorare", "La protejarea bordului de ponton", "La semnalizare", "La răcire"], answer: 1 },
  { m: 2, q: "O parâmă 'spring' împiedică:", options: ["Rotația elicei", "Deplasarea înainte/înapoi la ponton", "Scufundarea", "Coroziunea"], answer: 1 },
  { m: 2, q: "Lungimea recomandată a calabrotului la ancorare este de:", options: ["1x adâncimea", "3–5x adâncimea (mai mult pe vreme rea)", "0,5x adâncimea", "Nu contează"], answer: 1 },
  { m: 2, q: "La ancorare, orientezi ambarcațiunea:", options: ["Cu pupa în vânt", "Cu prova în vânt", "Perpendicular pe vânt", "Aleatoriu"], answer: 1 },
  { m: 2, q: "Verifici că ancora ține urmărind:", options: ["Nivelul de combustibil", "Două repere fixe pe mal", "Turația motorului", "Culoarea apei"], answer: 1 },

  // Modul 3
  { m: 3, q: "O vestă de salvare adevărată:", options: ["Ține persoana pe burtă", "Întoarce persoana inconștientă cu fața în sus", "Nu are efect", "E doar pentru înotători"], answer: 1 },
  { m: 3, q: "Apelul de primejdie MAYDAY se transmite pe canalul VHF:", options: ["6", "16", "72", "9"], answer: 1 },
  { m: 3, q: "Cu stingătorul țintești:", options: ["Vârful flăcării", "Baza focului", "Fumul", "Tavanul"], answer: 1 },
  { m: 3, q: "Raportul compresii:ventilații la RCP (adult) este:", options: ["15:2", "30:2", "5:1", "10:1"], answer: 1 },
  { m: 3, q: "La preluarea unui om căzut peste bord, motorul trebuie:", options: ["Accelerat", "Pus la ralanti sau oprit", "Lăsat la turație mare", "Ignorat"], answer: 1 },
  { m: 3, q: "O sângerare externă se oprește prin:", options: ["Spălare cu apă de mare", "Presiune directă pe rană", "Lăsarea descoperită", "Gheață direct pe rană"], answer: 1 },
  { m: 3, q: "Hipotermia se tratează prin:", options: ["Frecție agresivă", "Haine uscate și încălzire treptată", "Reintroducere în apă", "Nimic"], answer: 1 },

  // Modul 4
  { m: 4, q: "În IALA Regiunea A, marca de tribord este:", options: ["Roșie cilindrică", "Verde conică", "Galbenă", "Neagră"], answer: 1 },
  { m: 4, q: "Două bărci cu motor față în față trebuie:", options: ["Să vireze fiecare la babord", "Să vireze fiecare la tribord (dreapta)", "Să oprească", "Să accelereze"], answer: 1 },
  { m: 4, q: "La drumuri care se intersectează, prioritate are cel care vine din:", options: ["Babord (stânga)", "Tribord (dreapta)", "Spate", "Față"], answer: 1 },
  { m: 4, q: "La o depășire, cine cedează?", options: ["Cel depășit", "Cel care depășește", "Nimeni", "Cel mai mare"], answer: 1 },
  { m: 4, q: "Vezi noaptea roșu + verde + alb deasupra. Nava:", options: ["Se îndepărtează", "Vine direct spre tine", "E ancorată", "Pescuiește"], answer: 1 },
  { m: 4, q: "Două sunete scurte înseamnă:", options: ["Vireze la tribord", "Vireze la babord (stânga)", "Marșarier", "Pericol"], answer: 1 },
  { m: 4, q: "Cinci sau mai multe sunete scurte înseamnă:", options: ["Salut", "Atenție / nu înțeleg intențiile tale", "Vireze la dreapta", "Ancorez"], answer: 1 },
  { m: 4, q: "O marcă neagră cu bandă roșie și două sfere negre indică:", options: ["Ape sigure", "Pericol izolat (se ocolește)", "Zonă de agrement", "Un port"], answer: 1 },
  { m: 4, q: "O scădere rapidă a presiunii atmosferice anunță:", options: ["Vreme frumoasă", "Vreme rea / furtună", "Nimic", "Vizibilitate mai bună"], answer: 1 },
  { m: 4, q: "Consumul de alcool la comanda ambarcațiunii este:", options: ["Permis moderat", "Interzis", "Permis noaptea", "Permis în port"], answer: 1 },
];

// Expune datele către restul aplicației
window.COURSE = { MODULES, LESSONS, EXAM_CONFIG, EXAM_BANK };
