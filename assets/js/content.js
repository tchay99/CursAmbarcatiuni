/*
 * content.js — Conținutul cursului "Conducător de ambarcațiune cu motor"
 * -----------------------------------------------------------------------
 * Curs video de 10 zile, organizat în 4 module, narat de Cpt. Paul Dicu.
 * Lecțiile video sunt de sine stătătoare (se pot asculta ca un audiobook);
 * antrenamentul pentru examen este un modul separat (teste de 20 de întrebări
 * extrase aleator din banca oficială de antrenament — vezi questions-anr.js).
 *
 * Structura unei lecții:
 *   { id, day, module, title, summary, slides:[{title, art, bullets, narration}] }
 *
 * `art` indică ilustrația scenei: un fișier tools/art/<art>.png|svg (grafică de
 * designer) sau o diagramă programatică din tools/visuals.mjs cu aceeași cheie.
 *
 * Dacă există un fișier videos/dayNN.mp4, player-ul îl folosește automat în
 * locul diapozitivelor narate (vezi player.js).
 */

const MODULES = [
  { id: 1, title: "Modul 1 — Ambarcațiunea și motorul", color: "#2563eb", days: [1, 2] },
  { id: 2, title: "Modul 2 — Marinărie și manevre", color: "#0891b2", days: [3, 4, 5] },
  { id: 3, title: "Modul 3 — Siguranță și comunicații", color: "#dc2626", days: [6, 7, 8] },
  { id: 4, title: "Modul 4 — Navigație și reguli de drum", color: "#16a34a", days: [9, 10] },
];

const LESSONS = [
  /* ===================== MODUL 1 ===================== */
  {
    id: "day01", day: 1, module: 1,
    title: "Ambarcațiunea și limbajul mării",
    summary: "Tipuri de ambarcațiuni, orientarea la bord și corpul bărcii.",
    slides: [
      {
        title: "Bun venit la bord",
        art: "day01-s1",
        bullets: [
          "10 zile de curs video — se ascultă liber, ca un audiobook",
          "Antrenament de examen separat: teste de 20 de întrebări din banca oficială",
          "La final: simularea completă a examenului",
        ],
        narration: "Bine ai venit la bord. Eu sunt căpitanul Paul Dicu și, înainte de orice, hai să ne înțelegem asupra unui lucru: pe mare nu există întrebări prostești, există doar oameni care nu au întrebat la timp. Cursul acesta ține zece zile, iar fiecare zi este o poveste pe care ți-o spun ca și cum am sta amândoi în cocpit, cu o cafea în mână. Primul modul îți arată barca și motorul. Al doilea te învață marinăria adevărată: parâme, noduri, manevre, acostare și ancorare. Al treilea este despre siguranță și comunicații, adică despre cum ne întoarcem toți acasă. Iar al patrulea despre navigație și regulile de drum, codul rutier al apei. Lecțiile le poți asculta în ce ordine vrei și de câte ori vrei, ca pe un audiobook; nimeni nu te încuie afară. Iar când vrei să te măsori cu examenul, ai secțiunea de antrenament: teste de câte douăzeci de întrebări, extrase la întâmplare din banca oficială de pregătire, exact felul de întrebări pe care le vei primi la examen. Sfatul meu de om pățit: o zi pe rând, un caiet lângă tine, iar termenii noi spune-i cu voce tare. Marinăria se învață cu urechea și cu mâna, nu doar cu ochii. Hai să pornim.",
      },
      {
        title: "Tipuri de ambarcațiuni de agrement",
        art: "day01-s2",
        bullets: [
          "Bărci cu motor: cabinate, open, semi-rigide (RIB)",
          "Ambarcațiuni cu vele, jet-ski, bărci pneumatice",
          "Categoria de proiectare = condițiile de vânt și val admise",
        ],
        narration: "Prima întrebare pe care mi-o pune orice cursant sună la fel: care e barca cea mai bună? Iar răspunsul meu e mereu același: cea potrivită cu apa pe care navighezi și cu ce vrei să faci pe ea. Ambarcațiunea cabinată are un spațiu închis, adăpost de vreme, poți dormi la bord; e barca ieșirilor lungi. Barca deschisă, open, e calul de povară al agrementului: plimbare, pescuit, o zi pe lac, întreținere simplă. Semi-rigida, ribul, combină o carenă tare cu tuburi gonflabile pe margini; e atât de stabilă și de iertătoare încât o folosesc echipele de salvare, și nu întâmplător. Velierul merge în primul rând cu vântul, dar aproape întotdeauna are și un motor auxiliar, pentru port și pentru zilele în care vântul doarme. Motocicleta acvatică, jet-ski-ul, e rapidă și agilă, dar cere cap limpede, pentru că viteza iartă cel mai puțin. Și acum partea pe care mulți o află abia la examen: fiecare ambarcațiune are o categorie de proiectare, scrisă în actele ei, care spune în ce condiții de vânt și de valuri a fost gândită să navigheze. Barca de lac scoasă pe mare agitată e ca sandaua pe munte: se poate, dar nu se termină bine. Verifică ce categorie ai sub picioare înainte să te lupți cu vremea.",
      },
      {
        title: "Orientarea la bord: prova, pupa, babord, tribord",
        art: "day01-s3",
        bullets: [
          "Prova = partea din față; Pupa = partea din spate",
          "Babord = stânga (lumină roșie); Tribord = dreapta (lumină verde)",
          "Denumirile NU se schimbă după cum te întorci tu la bord",
        ],
        narration: "Astăzi înveți primele patru cuvinte din limba mării, și îți spun de ce există ele. Dacă pe barcă strigi la echipaj să tragă frânghia din stânga, fiecare om înțelege stânga lui, și barca ta devine un teatru de comedie. De aceea marinarii vorbesc în termeni legați de barcă, nu de om. Prova este partea din față, cea care taie apa. Vei auzi în cărți și proră, dar ăla e cuvânt de poezie; pe punte se spune prova. Pupa este partea din spate, unde stă de obicei motorul. Privind spre provă, dreapta se numește tribord, stânga babord. Și acum frumusețea acestor denumiri: ele nu se schimbă niciodată, oricum te-ai întoarce tu. Poți sta cu spatele, cu fața, în cap dacă vrei: babordul rămâne babord. De-asta nu există confuzie pe o punte disciplinată. Ca să le ții minte, un truc simplu: babord și stânga sunt amândouă cuvinte mai scurte; tribord și dreapta, mai lungi. Noaptea, bordurile își spun singure numele prin lumini: roșu la babord, verde la tribord. Nu e decor: după aceste culori citești, pe întuneric, încotro merge orice navă din jur și cine trebuie să cedeze. Repetă cele patru cuvinte până îți intră în reflex, pentru că la examen apar aproape în fiecare grilă, iar pe apă în fiecare minut.",
      },
      {
        title: "Corpul ambarcațiunii: carenă, punte, etravă, etambou",
        art: "day01-s4",
        bullets: [
          "Carena — deplasament sau planare; linia de plutire, bordul liber",
          "Puntea, cocpitul, santina (punctul cel mai de jos)",
          "Etrava = muchia provei · Etamboul = piesa structurală a pupei",
        ],
        narration: "Hai să luăm barca la puricat, din lateral. Partea care stă în apă se numește carenă, iar forma ei îi dă caracterul: o carenă de deplasament împinge apa în lături și merge lent dar economic, ca un om așezat; o carenă planantă se ridică deasupra apei la viteză, cum fac bărcile sportive. Linia până la care barca se scufundă se numește linia de plutire. De la ea până la marginea punții se măsoară bordul liber, iar bordul liber este, pe românește, rezerva ta de uscat: cu cât încarci barca mai mult, cu atât scade, și primul val mai obraznic îți intră în casă. Puntea acoperă corpul; cocpitul este zona deschisă de la pupă din care se conduce; iar dedesubt, în punctul cel mai de jos, stă santina, locul unde se adună orice strop de apă din barcă. O vizităm serios în lecția despre instalații. Și acum două cuvinte cu care examenul îi desparte pe pregătiți de nepregătiți. Muchia din provă care taie apa se numește etravă. Piesa structurală din capătul pupei se numește etambou. Am auzit pe pontoane spunându-i-se fustă; e simpatic, dar în grilă scrie etambou, iar comisia nu gustă folclorul. Ține minte perechea: etrava în față, etamboul în spate, și jumătate din întrebările de terminologie sunt ale tale.",
      },
      {
        title: "Stabilitatea și flotabilitatea",
        art: "day01-s5",
        bullets: [
          "Centrul de greutate jos = barca revine singură la poziția dreaptă",
          "Greutățile și pasagerii, distribuiți uniform; fără apă liberă în santină",
          "Capacitatea maximă: pe plăcuța constructorului",
        ],
        narration: "Stabilitatea este darul bărcii de a se ridica singură la loc după ce un val a înclinat-o. Secretul nu e magie, e fizică: centrul de greutate. Privește cele două desene. În stânga, greutatea stă jos și împărțită egal, iar barca se leagănă și revine, ca un om cu picioarele bine înfipte. În dreapta, oamenii stau în picioare, bagajele îngrămădite într-un singur bord, și aceeași înclinare devine dintr-odată poveste de spus la căpitănie. De aceea pasagerii stau jos și greutățile se împart pe ambele borduri. Un dușman ascuns: apa liberă din santină. Câțiva centimetri de apă care aleargă dintr-un bord în altul lucrează împotriva ta exact în momentul în care barca e deja înclinată. Și o întâmplare din practica mea, ca s-o ții minte: am avut odată o cursantă care, în plin exercițiu, a lăsat cârma din mână ca să se certe cu partenerul că nu-i face fotografii. Barca nu s-a supărat; barca doar și-a văzut de drum, spre geamandură. Apa nu iartă neatenția, doar o amână. Iar cifra care închide lecția: pe fiecare ambarcațiune există plăcuța constructorului, cu numărul maxim de persoane și greutatea maximă admisă. Nu sunt sugestii, sunt limite calculate de proiectant. La examen, întrebarea unde găsești capacitatea maximă are un singur răspuns: pe plăcuța constructorului.",
      },
    ],
  },
  {
    id: "day02", day: 2, module: 1,
    title: "Motorul și instalațiile de bord",
    summary: "Tipuri de motoare, elicea, răcirea, combustibilul, electricitatea și guvernarea.",
    slides: [
      {
        title: "Tipuri de motoare: outboard, inboard, sterndrive",
        art: "day02-s1",
        bullets: [
          "Motor exterior (outboard) — pe oglinda pupei, orientabil",
          "Motor interior (inboard) — în corp, cu arbore și cârmă separată",
          "Sterndrive (Z-drive) — motor interior + coloană orientabilă",
        ],
        narration: "Astăzi intrăm în sala mașinilor. Și încep cu o lecție de limbă: marinarii bătrâni nu spun motor, spun mașină. Vei auzi comenzile mașina pe înainte, mașina pe înapoi, și e bine să nu faci ochii mari când le auzi prima dată. Există trei feluri mari de a pune o mașină pe o barcă. Motorul exterior, autbordul, se prinde pe oglinda pupei, peretele din spate al bărcii. Când virezi, se rotește tot motorul și direcționezi direct jetul de împingere; e ușor de ridicat din apă, ușor de dus la service, și de-asta e regele agrementului. Motorul interior, inbordul, stă în burta bărcii și învârte o elice fixă printr-un arbore; direcția o face o cârmă separată, ca la navele adevărate. Îl găsești pe șalupe clasice și bărci mari. Iar sterndraivul e copilul celor două: motorul înăuntru, lângă pupă, iar afară o coloană orientabilă care e și elice, și cârmă. Oricare ar fi așezarea, principiul nu se schimbă de o sută de ani: mașina învârte o elice, elicea împinge apa înapoi, iar apa, drept mulțumire, împinge barca înainte. Restul sunt detalii; dar detaliile, pe mare, fac diferența dintre o zi frumoasă și o remorcare.",
      },
      {
        title: "Doi timpi, patru timpi, electric",
        art: "day02-s2",
        bullets: [
          "2 timpi: ușor, ulei amestecat cu benzina, mai poluant",
          "4 timpi: silențios, economic, baie de ulei separată",
          "Electric: instant, silențios — uneori singurul permis pe lacuri protejate",
        ],
        narration: "Să punem motoarele față în față, ca la un concurs de tractări. Motorul în doi timpi e cel simplu și ușor, dar are un nărav: uleiul se amestecă cu benzina. Uiți uleiul, motorul se gripează și te lasă în mijlocul lacului; pui prea mult, scoate fum ca un remorcher bătrân și îți ancrasează bujiile. E gălăgios și poluant, așa că la motoarele noi îl vezi tot mai rar. Motorul în patru timpi funcționează ca al mașinii tale: baie de ulei separată, consum mai mic, mers liniștit și curat. E alegerea standard de azi, cu o singură condiție: schimburile de ulei la timp. Un motor în patru timpi îngrijit te duce și te aduce douăzeci de ani. Iar electricul vine tare din urmă: pornește instantaneu, nu face zgomot, nu lasă nimic în apă, și pe unele lacuri protejate e singurul pe care legea îl lasă să înoate. Slăbiciunea lui e bateria: autonomia se planifică precum combustibilul, doar că priza e mai greu de găsit pe apă decât pompa. Pentru examen, diferența de ținut minte e una singură și cade des: doi timpi înseamnă ulei amestecat cu benzina, patru timpi înseamnă ungere separată. Restul e alegere de portofel și de ureche.",
      },
      {
        title: "Elicea: pas, diametru și capcane",
        art: "day02-s3",
        bullets: [
          "Elicea transformă rotația în împingere; pas mare = viteză, pas mic = tracțiune",
          "Parâme, sfori, plase — blochează elicea într-o secundă",
          "La elice te apropii DOAR cu motorul oprit și cheia scoasă",
        ],
        narration: "Elicea e o piesă modestă la vedere și genială la treabă: transformă rotația mașinii în drum prin apă. Palele ei sunt înclinate; când se rotesc, aruncă apa spre înapoi, iar barca pleacă înainte. Două mărimi o definesc. Diametrul, lățimea cercului pe care îl descrie. Și pasul, distanța teoretică pe care ar înainta-o la o rotație completă, ca un șurub în lemn. Elice cu pas mare: viteză de vârf frumoasă, dar pornire leneșă, ca o treaptă lungă de viteză. Elice cu pas mic: trage ca un tractor de pe loc, dar își atinge repede plafonul. De-asta elicea se alege după viața ta pe apă: plimbare, schi nautic sau marfă multă. Și acum să-ți spun de ce am văzut oameni în toată firea plângând pe ponton. O parâmă uitată în apă, o sfoară de la o plasă, o pungă zdravănă: elicea le înfășoară într-o secundă și se strangulează. Dacă ți se întâmplă, legea mea e de fier: oprești complet mașina și scoți cheia din contact înainte să te apropii de elice. Nu există grabă care să merite degete. Apoi cureți palele cu răbdare. Și fă-ți un obicei: privește elicea periodic. O pală îndoită de la o piatră vibrează, iar vibrația aia mică macină, cu lunile, tot motorul.",
      },
      {
        title: "Răcirea, nivelurile și întreținerea",
        art: "day02-s4",
        bullets: [
          "Jetul de control (telltale) curge = răcirea funcționează",
          "Supraîncălzire → oprești imediat, verifici prizele de apă",
          "După apă sărată: clătire cu apă dulce; anodul de zinc, schimbat la uzură",
        ],
        narration: "Motorul face căldură, iar pe barcă răcirea se face de obicei chiar cu apa pe care plutești: o pompă cu rotor de cauciuc trage apă prin prizele de sub linia de plutire, o plimbă prin motor și o dă afară. La motoarele exterioare, evacuarea o vezi cu ochiul liber: un firicel de apă care țâșnește vesel dintr-o parte a motorului. În engleză îi spune telteil; eu îi spun pulsul motorului. Dacă firicelul curge, inima bate. Obișnuiește-te să-l cauți cu privirea în primele secunde după fiecare pornire, așa cum te uiți în oglinzi când pleci cu mașina. Dacă jetul lipsește sau alarma de temperatură sună, oprești imediat. Nu mai încet, nu până la mal: imediat. Cauzele sunt aproape mereu banale: o pungă de plastic pe priza de apă, nisip după o trecere prin apă mică, un rotor de pompă bătrân. Dar un motor care merge fără răcire moare în câteva minute, și moare scump. Restul întreținerii e disciplină măruntă care se plătește regește: după apă sărată, clătești circuitul cu apă dulce, altfel sarea zidește cruste; bujiile aruncate un ochi, filtrul de combustibil schimbat la termen; și anodul de zinc, pastila aceea de metal pusă special să moară ea în locul pieselor scumpe: coroziunea o mănâncă pe ea, iar când s-a dus jumătate din ea, o înlocuiești. Statistica de pe apă e simplă: majoritatea remorcărilor pleacă de la întreținere neglijată. Nu fi statistică.",
      },
      {
        title: "Combustibilul și santina",
        art: "day03-s1",
        bullets: [
          "Vaporii de benzină sunt mai grei ca aerul — se adună în santină: risc de explozie",
          "Alimentare: motor oprit, fără flacără, ventilație; verifici capacul corect al tancului",
          "Pompa de santină, testată înainte de plecare; uleiul NU se pompează în apă",
        ],
        narration: "Acum lecția pe care ți-o spun cu vocea coborâtă, pentru că aici se ascunde cel mai urât accident posibil pe o barcă de agrement. Traseul combustibilului e simplu: rezervor, robinet, filtru, pompă, motor. Verifici furtunurile și colierele cu ochiul: benzina nu are voie să picure nicăieri, iar mirosul de benzină la bord nu e un inconvenient, e o sirenă de alarmă. De ce atâta severitate? Pentru că vaporii de benzină sunt mai grei decât aerul. Nu se ridică să plece în cer, cum crede lumea; curg în jos, ca o apă nevăzută, și se adună în santină, unde așteaptă cuminți o scânteie. De aceea alimentarea are ritual: mașina oprită, consumatorii electrici opriți, nicio flacără, nicio țigară, iar după alimentare aerisești compartimentele înainte de pornire. Și încă o pățanie clasică de ponton: pe punte sunt mai multe capace de tancuri, unul de motorină, unul de apă dulce. Citește ce scrie pe capac înainte să bagi pistolul. Apa în tancul de combustibil sau motorina în tancul de apă îți strică săptămâna, nu ziua. Cât despre santină: puțină apă acolo e normală; multă apă e un semn de întrebare, iar apa cu irizații de ulei e o interdicție. Pompa de santină o testezi înainte de plecare, pe manual și pe automat, pentru că o pompă îți dovedește că merge doar când o încerci. Iar amestecul cu ulei sau motorină nu se pompează niciodată peste bord: se colectează și se predă la mal. Marea ne dă totul; măcar să nu-i dăm înapoi otravă.",
      },
      {
        title: "Instalația electrică și kill switch-ul",
        art: "day03-s2",
        bullets: [
          "Bateria: borne curate, fixare solidă, nivel verificat; siguranțe de rezervă",
          "O baterie de rezervă la bord = comunicații chiar dacă barca rămâne fără curent",
          "Kill switch: șnurul care oprește motorul dacă ești aruncat de la comandă",
        ],
        narration: "Electricitatea pe barcă pleacă de la baterie, iar bateria e ca prietenii adevărați: o vezi cât valorează abia când ai nevoie de ea. Ea pornește mașina, aprinde luminile de navigație, ține în viață stația radio, pompa de santină și instrumentele. Îngrijirea e simplă: borne curate și strânse, fixare zdravănă să nu joace la valuri, nivel de încărcare verificat înainte de plecare. Întrerupătorul general taie tot curentul când lași barca singură, iar siguranțele își fac datoria doar dacă ai și rezerve la bord. Și un sfat pe care îl dau la fiecare serie de cursanți: când pleci pe mare, ia-ți și o baterie de rezervă. Dacă barca rămâne complet fără energie, stația aia de radio alimentată din rezervă e vocea ta către lume, și pe mare vocea contează mai mult decât motorul. Iar acum piesa mea de suflet: întrerupătorul de siguranță cu șnur, kill switch-ul. O brățară legată printr-un șnur de un buton de pe consolă; o porți la încheietură sau prinsă de vestă. Dacă un val te aruncă de la comandă, șnurul smulge capsa și mașina moare pe loc. Fără el, știi ce face o barcă rămasă fără om la comandă? Nu se oprește. Se învârte în cercuri, cu elicea vie, exact în jurul locului unde ai căzut. Am văzut imaginile astea și nu le mai vreau. Poartă șnurul. De fiecare dată. Mai ales când ești singur.",
      },
      {
        title: "Guvernarea: timonă, safran și manșă",
        art: "day03-s3",
        bullets: [
          "Timonă → sistem de translație (troțe/lanțuri/țevi) → safran",
          "Comenzi: «bandă babord/tribord» (unghi maxim ~40–45°), «cârma în ax»",
          "Manșa mașinii: click – accelerare progresivă – click – neutru; NICIODATĂ direct din marș înainte în marș înapoi",
        ],
        narration: "Guvernarea e tot ce se întâmplă între palmele tale și direcția bărcii. Componentele, așa cum le cere și examenul: timona, roata pe care o ții în mâini; sistemul de translație, care duce mișcarea mai departe prin cabluri numite troțe, prin lanțuri sau prin țevi rigide cu levier; și safranul, pana cârmei care stă în apă și face de fapt toată treaba. Safranul poate fi compensat, semicompensat sau necompensat, după cum e împărțită suprafața lui față de axul de rotație; reține cele trei denumiri. Două comenzi clasice de timonă: bandă tribord sau bandă babord înseamnă cârma rotită la unghiul maxim constructiv, undeva la patruzeci, patruzeci și cinci de grade; mai mult de-atât nu există, oricât ai forța. Iar cârma în ax, sau în mijloc, înseamnă safranul drept, pe centru. Și acum manșa mașinii, pe care te rog s-o asculți ca pe o predică. Manșa cuplează transmisia: împingi, auzi un click, treapta e cuplată, accelerezi progresiv; la revenire, înapoi la click, apoi în neutru. Ce nu se face niciodată, dar niciodată: trecerea direct din mers înainte în mers înapoi, fără oprire în neutru. Sincronizatoarele transmisiei nu iartă asemenea maniere: se duc, și factura pe care am văzut-o eu era cam de douăsprezece mii de euro. Douăsprezece mii, pentru o secundă de nerăbdare. Mâna calmă pe manșă e cea mai ieftină asigurare de pe apă.",
      },
    ],
  },

  /* ===================== MODUL 2 ===================== */
  {
    id: "day03", day: 3, module: 2,
    title: "Parâme, noduri și legături",
    summary: "Construcția parâmelor, legăturile de acostare, nodul de gașă și siguranța.",
    slides: [
      {
        title: "Parâma: de la fir la garlin",
        art: "v4-parama",
        bullets: [
          "Construcția: fir → sfilață → șuviță → lanțană → cordon → garlin",
          "Mnemotehnic: «Fiecare Seară Ștefan Leagă Câte-un Garlin»",
          "Manevre curente = parâmele mobile, de lucru · Manevre fixe = susținere (catarg)",
        ],
        narration: "Ziua a treia e ziua marinăriei adevărate, și începe cu obiectul cel mai vechi și mai subestimat de pe orice barcă: parâma. Întâi, cum e construită, pentru că ordinea asta se cere la examen și pică mulți pe ea. Totul pleacă de la fir, firul simplu de material. Firele răsucite împreună dau sfilața. Sfilațele răsucite dau șuvița. Șuvițele răsucite dau lanțana, care e parâma simplă, de toate zilele. Lanțanele răsucite dau cordonul. Iar cordoanele împletite dau garlinul, parâma groasă cât brațul, cu care se remorchează nave. Fir, sfilață, șuviță, lanțană, cordon, garlin. Ca să nu le încurci în ziua examenului, ține propoziția mea: Fiecare Seară Ștefan Leagă Câte-un Garlin. Inițialele îți dau seria întreagă. Pe vremuri, la școală, se învățau și parâmele metalice de remorcher, garantate la nouă mii sau șaisprezece mii de ore; ție nu-ți trebuie pe barca de agrement, dar e bine să știi că există. Ce-ți trebuie în schimb e împărțirea după rol. Manevrele curente sunt toate parâmele mobile, cu care lucrezi activ: legături, școte, tot ce trece prin mâinile tale. Manevrele fixe sunt cablurile care doar susțin, de pildă catargul unui velier: sarturile îl țin lateral, straiurile în lungul bărcii. Pe veliere mai auzi și de fungi, parâmele care ridică velele, și școte, cele care le reglează. Nu-ți face griji că-s multe: limba mării se învață cuvânt cu cuvânt, ca orice limbă în care merită să spui ceva.",
      },
      {
        title: "Legăturile de acostare: provă, pupă, spring, traversă",
        art: "day06-s4",
        bullets: [
          "Parâma de provă și cea de pupă țin barca lângă ponton",
          "Springurile opresc mișcarea înainte/înapoi — nu le scăpa niciodată necontrolat",
          "Traversa, perpendiculară pe barcă: stabilitate la vânt din travers",
        ],
        narration: "O barcă legată prost e o barcă doar amânată de la belea. Schema completă de legare la ponton are patru feluri de parâme, fiecare cu meseria ei. Parâma de provă și parâma de pupă țin barca aproape de ponton, una în față, una în spate. Springurile sunt parâmele încrucișate din desen, și ele au cea mai importantă meserie: opresc mișcarea în lungul pontonului. Springul de provă nu lasă barca să avanseze, cel de pupă n-o lasă să dea înapoi. Și ascultă aici o lecție pe care am văzut-o predată dur, pe viu: springul nu se molează niciodată necontrolat. Scapi springul cu vânt din spate, barca țâșnește în lungul pontonului și lovește ce găsește în drum. L-am văzut o dată rupând un pupitru de ponton, și ziua aia n-a mai fost frumoasă pentru nimeni. A patra parâmă e traversa, întinsă perpendicular pe axul bărcii; o folosești când bate vânt puternic din travers, care ar vrea să-ți smulgă barca de la post. Împreună, legăturile formează o cușcă elastică în care barca respiră pe valuri fără să se plimbe. La ape cu nivel schimbător lași puțin joc, altfel dimineața îți găsești barca spânzurată de parâme când apa a scăzut. Și oriunde parâma freacă de o muchie, îmbrac-o într-un manșon sau o bucată de furtun; parâma care roade toată noaptea e parâma care cedează în furtuna următoare. O barcă bine legată doarme, iar cu ea dormi și tu.",
      },
      {
        title: "Punctele de legare și comenzile: mola, fila, vira",
        art: "v4-babale",
        bullets: [
          "Tacheți, babale (o «babă», două «babale»), ținte (varianta mică), urechi de ghidaj",
          "MOLA = eliberezi complet · FILA = dai drumul controlat, puțin câte puțin · VIRA = tragi spre tine",
          "Trei cuvinte scurte în loc de strigăte și confuzie",
        ],
        narration: "Parâma trebuie legată de ceva zdravăn, iar puntea și cheiul au piesele lor dedicate. Tachetul e piesa cu două coarne de pe barcă, pe care se ia parâma în opturi. Pe cheiurile mari vezi babalele, ciupercile acelea metalice, solide ca niște nicovale; și aici o subtilitate de limbă care amuză toate seriile mele de cursanți: una singură se numește babă, iar perechea, babale. Da, exact așa. Pe ambarcațiunile mici, rolul lor îl joacă țintele, aceleași ciuperci, doar la scară de jucărie. Iar urechile de ghidaj sunt piesele prin care parâma e condusă peste bord fără să frece unde nu trebuie. Acum, comenzile. La manevră nu e timp de fraze; marinarii au trei cuvinte, lustruite de sute de ani, și cine le știe lucrează în liniște. Mola înseamnă: eliberează complet, scoate parâma de pe tachet, las-o liberă. Fila înseamnă: dă drumul controlat, puțin câte puțin, cu parâma încă în mână; filezi cum ai coborî o găleată în fântână. Vira înseamnă: trage parâma spre tine, recupereaz-o cu forță. Mola, fila, vira. Spune-le cu voce tare de câteva ori. Când căpitanul strigă fila springul, tot echipajul știe exact ce se întâmplă și cu ce viteză; când cineva strigă dă-i drumul la aia, se întâmplă orice, de obicei ce nu trebuie. Limbajul precis nu e fudulie de marinar; e felul în care o manevră rămâne plictisitoare. Și pe apă, plictisitor înseamnă perfect.",
      },
      {
        title: "Nodurile marinărești și nodul de gașă (bowline)",
        art: "v4-nod",
        bullets: [
          "Un nod marinăresc: se face repede, ține bine, se desface repede — toate trei",
          "Gașa (bowline): buclă fixă — «iepurele iese din vizuină, ocolește copacul, intră înapoi»",
          "Pe un tachet ocupat: parâma ta trece pe DEDESUBT, prin gașa existentă",
        ],
        narration: "Circulă mitul că un marinar adevărat știe cincizeci de noduri. Ți-l spulber cu drag: alea erau vremurile corăbiilor cu pânze. Marinarul de azi care știe trei, maximum patru noduri, dar le face cu ochii închiși, pe întuneric și cu mâinile ude, ăla e marinarul care-ți trebuie lângă tine. Și există o definiție, pe care ți-o dau ca pe o lege: un nod e marinăresc dacă îndeplinește trei condiții deodată. Se face repede. Ține bine. Se desface repede. Dacă una singură lipsește, nu e nod marinăresc, e încurcătură cu pretenții. Regele nodurilor e nodul de gașă, pe englezește baulain: face o buclă care nu se strânge și nu alunecă, bucla cu care legi barca de orice. Se învață cu o poveste, povestea iepurelui și a copacului. Faci pe parâma lungă o buclă mică: asta e vizuina, cu gura în sus. Capătul liber e iepurele. Iepurele iese din vizuină de jos în sus, ocolește copacul, adică parâma lungă, pe la spate, și intră înapoi în vizuină. Strângi de toate capetele, și gata gașa. Un metru de parâmă acasă, pe canapea, și în două seri îl faci fără să te uiți; ăsta e și îndemnul meu oficial: ia-ți un metru de parâmă și joacă-te cu el. Și un rafinament de om umblat: când vrei să pui gașa ta pe o baba pe care stă deja gașa altuia, n-o trânti deasupra, că i-o blochezi și nu mai poate pleca omul când vrea. Treci parâma ta pe dedesubt, prin interiorul gașei lui, și abia apoi o așezi. În porturile din Grecia asta e lege nescrisă: oricine poate pleca oricând, fără să dezlege pe nimeni. Marinăria bună e, până la urmă, politețe cu funii.",
      },
      {
        title: "Vinciuri, cabestane și blocatoare",
        art: "v4-vinci",
        bullets: [
          "Ax orizontal = vinci · Ax vertical = cabestan (pe punte li se spune tuturor «vinci»)",
          "Tamburul se rotește DOAR în sens orar; maneta are două viteze (forță/viteză)",
          "Blocatorul ține parâma sub tensiune și eliberează vinciul; fiecare blocator, eticheta lui",
        ],
        narration: "Când forța mâinilor nu mai ajunge, intră în scenă mecanica. Aparatul cu tambur care înfășoară parâma se numește vinci dacă are axul orizontal și cabestan dacă are axul vertical; asta e diferența tehnică, bună de știut la examen. În viața de zi cu zi pe punte, toată lumea le spune la amândouă vinci, și nimeni nu s-a supărat vreodată. Cum lucrezi cu el: tamburul are un sens unic de rotație, spre dreapta, în sens orar; încearcă invers și mecanismul te refuză politicos. Iei două, trei spire de parâmă pe tambur, în sensul bun, și învârți de manetă. Iar maneta ascunde o șmecherie frumoasă: rotită într-un sens îți dă viteză mică și forță mare, ca treapta întâi la deal; rotită în celălalt sens, viteză mare și forță mică, pentru recuperat repede parâma moale. Pe velierele moderne mai există și blocatoarele: niște fălci prin care trece parâma și care o țin blocată sub tensiune după ce ai terminat de tras, ca să eliberezi vinciul pentru următoarea treabă. Fiecare blocator e etichetat cu parâma lui, și eticheta aia se respectă: tragi de maneta greșită și eliberezi exact ce nu trebuia, în momentul în care nu trebuia. Mecanica de punte e un servitor minunat: îți înmulțește forța de zece ori. Doar ține minte că îți înmulțește tot de zece ori și greșelile.",
      },
      {
        title: "Siguranța la lucrul cu parâme",
        art: "v4-sig",
        bullets: [
          "Parâmele sub tensiune dezvoltă forțe de ordinul tonelor",
          "NICIODATĂ parâma înfășurată pe mână; NICIODATĂ piciorul în buclele de pe punte",
          "Spire «mușcate» pe vinci: nu băga degetele — eliberezi complet parâma",
        ],
        narration: "Închei ziua parâmelor cu lecția pe care aș vrea s-o ții minte și peste douăzeci de ani. O parâmă sub tensiune nu e o frânghie; e un animal. Pe un velier în vânt, în școte se adună forțe de ordinul tonelor, iar tonele alea nu se văd: parâma stă acolo, întinsă și cuminte, și așteaptă. De aici, trei interdicții absolute. Unu: nu înfășori niciodată parâma pe mână, pe încheietură sau pe degete, oricât de comod ar părea pentru o secundă. Dacă parâma pleacă, pleacă cu tot cu ce e înfășurat pe ea. Doi: nu calci niciodată în interiorul buclelor de parâmă lăsate pe punte. O buclă în care stă piciorul tău e un laț armat; la prima smucitură te culege de pe punte și te trece peste bord înainte să apuci să strigi. De-asta parâmele se strâng ordonat, colac lângă colac, ca un moș așezat pe punte, și puntea rămâne curată. Trei: dacă pe tamburul vinciului spirele s-au încălecat, s-au mușcat, cum spunem noi, nu bagi degetele să le descâlcești sub tensiune. Eliberezi complet parâma de pe vinci și o iei de la capăt. Degetele nu au piese de schimb. Și îți las vorba pe care le-o spun tuturor cursanților mei, aceeași pe care o spun și motocicliștii: există marinari bătrâni și marinari buni... adică îndrăzneți. Marinari bătrâni și îndrăzneți, foarte puțini. Eu îmi doresc să ajungi cu marinarii bătrâni. Prudența nu e frică; e meserie.",
      },
    ],
  },
  {
    id: "day04", day: 4, module: 2,
    title: "Manevre de bază și efectul elicei",
    summary: "Plecarea, virajele, efectul de evantai și oprirea.",
    slides: [
      {
        title: "Plecarea și viteza de siguranță",
        art: "day05-s1",
        bullets: [
          "Privește în jur, molează parâmele în ordinea potrivită, ferește-le de elice",
          "Viteza de siguranță: cea care îți permite să oprești și să eviți la timp",
          "Valul tău de etravă = responsabilitatea ta legală",
        ],
        narration: "Ziua a patra: punem mâna pe manșă. Dar înainte de a atinge gazul, un obicei de căpitan bătrân: rotește o dată privirea de jur împrejur, complet. Alte bărci în mișcare, înotători, o sfoară care atârnă în apă, un copil pe ponton. Abia apoi molează parâmele, în ordinea potrivită vântului, și ține-le strânse la bord: o parâmă care atârnă peste bord la plecare e o invitație scrisă pentru elice. Pleci cu mișcări blânde de manșă, ca și cum ai duce o tavă cu pahare pline. În port și lângă mal mergi cu viteza de siguranță. Nu e o cifră din regulament, e o definiție: viteza de la care poți opri și evita orice apare în cale. Uneori sunt cinci noduri, alteori doi, iar pe lângă plaje, geamandurile și panourile îți impun limite fixe pe care le respecți fără comentarii. Și mai e ceva de care răspunzi chiar dacă niciun panou nu ți-o spune: valul de etravă pe care îl lasă barca ta. Valul tău leagănă violent bărcile ancorate, umple caiacul unui om, sperie un înotător. Legea e limpede și pică la examen: ești responsabil de efectele valului produs de ambarcațiunea ta. Marinarul bun se cunoaște după pupa lui: lasă în urmă apă liniștită și oameni liniștiți.",
      },
      {
        title: "Virajele: barca pivotează, pupa mătură",
        art: "day05-s2",
        bullets: [
          "Barca virează în jurul unui punct de pivot aflat spre provă",
          "În viraj, pupa alunecă lateral — verifică spațiul din spate, nu doar din față",
          "Fără viteză prin apă nu există guvernare eficientă",
        ],
        narration: "Prima surpriză a oricărui începător, fără excepție: barca nu virează ca mașina. Mașina își schimbă direcția cu roțile din față. Barca pivotează în jurul unui punct aflat cam la o treime de la provă, iar împingerea de direcție vine de la pupă. Consecința o vezi în desen și o simți în prima ta manevră de port: când virezi la dreapta, prova se duce frumos spre dreapta, dar pupa alunecă lateral spre stânga, măturând un arc surprinzător de larg. Lângă ponton, pupa e cea care lovește, nu prova. Ai impresia că te-ai îndepărtat, pentru că prova s-a îndepărtat; între timp spatele bărcii se apropie de obstacol ca un cot neatent într-o bucătărie aglomerată. Regula practică, bătută în cuie: înainte de orice viraj strâns, uită-te unde va mătura pupa, nu doar unde va merge prova. A doua lecție a zilei: fără viteză prin apă, cârma e doar o decorațiune. Elicea și safranul au nevoie de curent de apă ca să lucreze; o barcă aproape oprită nu ascultă de nimeni. De aceea manevrele fine se fac cu impulsuri scurte de mașină, care dau cârmei apă de lucru exact cât trebuie. Ieși în larg, departe de orice, și joacă-te o oră: viraje largi, viraje strânse, la viteze diferite, până simți în palme pe unde trece pupa ta. Ora aia face cât zece lecții.",
      },
      {
        title: "Efectul de evantai al elicei",
        art: "day05-s3",
        bullets: [
          "Elicea împinge pupa lateral, mai ales la marșarier",
          "Elice rotire dreapta: la marșarier, pupa fuge spre babord",
          "Nu te lupta cu efectul — folosește-l la acostare",
        ],
        narration: "Astăzi îți prezint un personaj care încurcă pe toți începătorii și devine cel mai bun prieten al celor care-l înțeleg: efectul de evantai. Pe lângă împingerea principală, înainte sau înapoi, elicea mai produce o forță ascunsă, laterală, care împinge pupa într-o parte, ca și cum palele s-ar sprijini o idee pe apă, cum se sprijină o roată pe pământ. La mers înainte efectul abia se simte. La marșarier devine serios. Regula pentru elicea care se rotește spre dreapta, cazul cel mai des: la mers înapoi, pupa fuge spre babord, spre stânga. Și acum întrebarea corectă nu e cum scap de efectul ăsta, ci cum îl pun la treabă. Dacă știi dinainte încotro se va așeza pupa când dai înapoi, alegi bordul de acostare și unghiul de apropiere așa încât natura să lucreze pentru tine. Exemplu clasic: acostezi cu babordul la ponton; un impuls scurt de marșarier nu doar că oprește barca, dar îi și lipește pupa de ponton, elegant, de parcă ai fi exersat de o sută de ori. Fiecare barcă are personalitatea ei: unele trag mai tare, altele abia șoptesc. Testul e simplu și ți-l recomand din prima zi: în larg, oprit, dai marșarier la ralanti și te uiți încotro pleacă pupa. Cinci minute de test, și ai aflat despre barca ta un secret pe care unii proprietari nu-l află în cinci ani.",
      },
      {
        title: "Oprirea: pe apă nu există frâne",
        art: "day05-s4",
        bullets: [
          "Reduci gazul din timp; barca alunecă mult după tăierea gazului",
          "Marșarier corect: manșa în neutru, o secundă, apoi înapoi cu gaz moderat",
          "Trei sunete scurte = «mașina mea lucrează pe înapoi»",
        ],
        narration: "Să vorbim despre frânat, adică despre lucrul care lipsește cu desăvârșire pe barcă: pedala de frână. Tai gazul, și barca își continuă drumul, alunecând pe inerție; cu cât mai grea, mai încărcată și mai împinsă de vânt din spate, cu atât mai departe. Prima frână e anticiparea: reduci viteza din timp, treptat, cu mult înaintea punctului unde vrei să oprești, și lași apa să-și facă treaba de frână naturală. A doua frână e marșarierul, folosit ca la carte, cum am învățat la lecția despre manșă: aduci manșa în neutru, lași o secundă mașina să răsufle la ralanti, apoi cuplezi înapoi cu gaz moderat. Marșarierul trântit de la viteză mare e rețeta cu care se rup transmisii și se aruncă pasagerii din locuri. Nu uita nici de vechiul nostru cunoscut, efectul de evantai: la marșarier pupa va trage lateral, deci corectezi din timp, nu te miri la final. Și o piesă de limbaj sonor pe care o vei învăța pe deplin în modulul de navigație, dar ți-o dau de pe acum, că ține de manevră: trei sunete scurte din fluier sau sirenă înseamnă mașina mea lucrează pe înapoi. Așa anunți, regulamentar, că frânezi sau dai înapoi. Tema ta practică: în larg, măsoară din ochi câte lungimi de barcă îți trebuie de la viteza de croazieră până la oprire completă. Cifra aia, înmulțită cu doi pentru zilele cu valuri, e distanța sub care nu te apropii cu viteză de nimic. Nici de ponton, nici de altă barcă, nici de orgoliul tău.",
      },
    ],
  },
  {
    id: "day05", day: 5, module: 2,
    title: "Acostarea și ancorarea",
    summary: "Acostarea pe vânt, springul la plecare, ancore și procedura completă.",
    slides: [
      {
        title: "Pregătirea acostării",
        art: "day06-s1",
        bullets: [
          "Baloane de acostare legate din timp, la înălțimea pontonului",
          "Parâme pregătite la provă și pupă; roluri împărțite clar",
          "Dacă apropierea nu iese: te retragi și reiei. Fără orgoliu.",
        ],
        narration: "Acostarea e manevra care desparte pasagerii de marinari, și vestea bună e că are rețetă, nu talent. Rețeta începe cu pregătirea, făcută din timp, nu în ultimii zece metri cu strigăte. Scoți baloanele de acostare, tampoanele gonflabile, și le legi pe bordul care va atinge pontonul, la înălțimea potrivită marginii lui; un balon legat la înălțimea greșită e o decorațiune, nu o protecție. Pregătești parâmele: una la provă, una la pupă, conduse pe sub balustradă, cu capetele libere, gata de dat la mal. Împarți rolurile cu glas calm: cine coboară pe ponton, cine dă parâma, cine rămâne la mașină. O manevră în care fiecare își știe treaba e o manevră tăcută; strigătele apar exact acolo unde planul a lipsit. Apoi citești vântul și curentul, pentru că ei sunt coautorii oricărei acostări, cum vei vedea în scenele următoare. Apropierea în sine: încet, sub un unghi de douăzeci, treizeci de grade, cu corecții mici. Viteza ideală de acostare e aceea la care, dacă totuși atingi pontonul, atingerea e o îmbrățișare, nu o lovitură. Și legea de aur, pe care ți-o spun cu toată greutatea celor treizeci de ani ai mei pe apă: dacă apropierea nu iese, nu o forța. Te retragi, faci un cerc, respiri și încerci din nou. Nimeni nu ține scorul încercărilor; toată lumea ține minte pontonul rupt. Manevra întreruptă la timp e semnul marinarului, nu al începătorului.",
      },
      {
        title: "Acostarea cu vântul dinspre apă (spre ponton)",
        art: "day06-s2",
        bullets: [
          "Vântul te împinge spre ponton: apropiere paralelă, la o lățime de barcă",
          "Oprești elanul și lași vântul să facă acostarea",
          "Fixezi întâi prova sau springul, apoi restul",
        ],
        narration: "Primul scenariu e cel prietenos: vântul sau curentul te împinge dinspre apă către ponton. Aici tot secretul e să lași natura să lucreze și să nu te bagi peste ea cu motorul. Te așezi paralel cu pontonul, la o distanță cam de o lățime de barcă, și oprești complet elanul. Atât. Vântul preia manevra: împinge barca lateral, ușurel, ca o palmă mare și moale, până când baloanele ating pontonul pe toată lungimea deodată. Tu doar corectezi fin din mașină ca barca să rămână paralelă, să nu intre cu prova sau cu pupa înainte. Greșeala clasică pe care o văd sezon de sezon: apropierea sub unghi mare, cu vântul în spate. Barca ia viteză spre ponton mai repede decât te aștepți, iar rezultatul e o lovitură de provă și un proprietar care dă vina pe vânt. Vântul n-are nicio vină; el doar a făcut ce face vântul. Odată lipit de ponton, fixezi repede prima parâmă, de regulă prova sau springul, ca rafalele să nu mai poată roti barca, și apoi legi restul fără grabă. Reține principiul, că apare și în grile: vânt spre ponton înseamnă apropiere paralelă și lentă; vântul face acostarea în locul tău. Marinarul deștept nu e cel care se luptă cu natura, e cel care o angajează.",
      },
      {
        title: "Acostarea cu vântul dinspre ponton + plecarea pe spring",
        art: "day06-s3",
        bullets: [
          "Vântul te împinge la larg: unghi mare (40–50°), apropiere fermă",
          "Fixezi întâi springul de provă; motor încet înainte, cârma de la ponton → pupa se lipește",
          "La plecare, aceeași parâmă lucrată invers scoate barca în vânt",
        ],
        narration: "Al doilea scenariu cere meserie: vântul suflă dinspre ponton și te împinge la larg. Apropierea timidă și paralelă aici nu funcționează; până apuci să legi ceva, vântul te-a mutat înapoi în larg, și tot filmul se reia. Planul e altul. Vii sub un unghi mare, patruzeci, cincizeci de grade, cu prova spre punctul de acostare și cu hotărâre calmă în manșă. Obiectivul numărul unu: adu prova destul de aproape încât echipierul să fixeze springul de provă pe ponton. Din clipa în care springul e prins, ai câștigat, și acum vine partea de scamatorie care îmi place să o predau: cuplezi mașina încet înainte, cu cârma întoarsă de la ponton. Barca vrea să plece înainte, springul n-o lasă, și din această ceartă între motor și parâmă se naște o rotație: pupa se lipește de ponton, împotriva vântului, fără să o atingi. Fizica lucrează pentru tine, cu leafa zero. Fără spring, aceeași manevră e o luptă de putere cu vântul, din care se iese de obicei cu manevre bruște și cu vopsea lipsă. Și ține minte că scamatoria merge și invers, la plecare: cu vântul care te ține lipit de ponton, același spring lucrat invers, mașina încet înainte cu cârma spre ponton, scoate pupa în vânt; molezi springul și pleci curat, cu pupa înainte spre larg. Springul e cel mai deștept metru de parâmă de pe barca ta. Poartă-te frumos cu el.",
      },
      {
        title: "Ancorele și instalația de ancorare",
        art: "day07-s1",
        bullets: [
          "Plug (nisip/mâl), Danforth (putere mare la greutate mică), Bruce (funduri mixte), grapnel",
          "Instalația: ancoră + lanț + vinci de ancoră + puțul lanțului",
          "«Nu ancora ține barca pe loc, ci ancora plus greutatea lanțului»",
        ],
        narration: "Ancorarea îți dă cea mai frumoasă libertate a agrementului: să oprești unde ți-e drag, într-un golf, la o baie, la un pescuit. Prima decizie e ancora, iar ancora se alege după fundul apei, nu după catalog. Ancora tip plug, în formă de brăzdar, ară fundul până se îngroapă; excelentă în nisip și mâl. Ancora Danfort, cu două palete late articulate, ține enorm raportat la cât cântărește, de aceea o vezi pe mai toate bărcile de agrement. Ancora tip gheară, Bruce, se așază repede pe funduri mixte și pietroase. Iar grapnelul, cu brațele lui multe, pliabile, e prietenul bărcilor mici și al jet-ski-urilor: agață pietre și stânci. La examen se cere componența instalației de ancorare, patru piese, ține-le ca pe o poezie: ancora, lanțul, vinciul de ancoră și puțul lanțului, adică compartimentul unde doarme lanțul. Și acum adevărul pe care ți-l spun ca pe o taină de breaslă, pentru că schimbă felul în care ancorezi: nu ancora ține barca pe loc. Ancora plus greutatea lanțului culcat pe fund, împreună, țin barca. La navele mari, tot calabrotul e lanț, tocmai pentru greutatea lui așezată pe fund; la o barcă ușoară ajunge parâmă textilă cu doi, trei metri de lanț la ancoră, care culcă tracțiunea la orizontală și apără parâma de pietrele care ar roade-o. Cine înțelege propoziția asta despre lanț nu mai smulge niciodată ancora degeaba și doarme liniștit la ancoraj.",
      },
      {
        title: "Alegerea locului de ancorare",
        art: "day07-s2",
        bullets: [
          "Fund care ține (nisip, mâl compact), loc adăpostit de vânt și val",
          "Departe de șenal, cabluri, conducte, zone interzise",
          "Cercul de balans: barca se rotește după vânt — nu te suprapune cu vecinii",
        ],
        narration: "Unde arunci ancora contează cât ancora însăși, și poate un pic mai mult. Cauți un loc adăpostit de vânt și de valuri, cu un fund care ține: nisipul și mâlul compact sunt aur; algele și piatra netedă sunt o minciună frumoasă, pentru că ancora alunecă peste ele fără să se îngroape, iar tu afli asta la trei dimineața. Harta și aplicația de navigație îți spun natura fundului și adâncimile; obișnuiește-te să le citești înainte, nu după. Ocolește cu sfințenie șenalul navigabil: o barcă ancorată pe culoarul navelor e ca un cort ridicat pe autostradă. Și ferește zonele marcate cu interdicții: cabluri submarine, conducte, perimetre de protecție. Acolo poți pierde și ancora, agățată definitiv, și banii de amendă, în aceeași zi. Apoi gândește în cercuri. Barca ancorată nu stă țintuită; se rotește în jurul ancorei după cum se rotește vântul, descriind cercul de balans, cu raza cam cât calabrotul filat. Cercul tău nu are voie să se intersecteze cu cercurile vecinilor, cu malul sau cu geamandurile, inclusiv la miezul nopții, când vântul se răsucește și toate bărcile din golf se rotesc împreună, ca la un dans comandat. Distanța care ți se pare exagerată la ora ancorării e exact distanța potrivită la ora trei. Am verificat personal, de mai multe ori decât aș fi vrut.",
      },
      {
        title: "Procedura de ancorare și protejarea vinciului",
        art: "day07-s3",
        bullets: [
          "Prova în vânt, oprit complet; ancora coborâtă controlat, nu aruncată grămadă",
          "Calabrot filat: 3–5 × adâncimea (până la 7× pe vreme rea)",
          "Vinciul de ancoră: reprize de max. 10 secunde + «click înainte, click înapoi» din mașină",
        ],
        narration: "Hai să ancorăm ca la carte. Te apropii de punctul ales cu prova în vânt, împotriva vântului, pentru că așa barca se oprește natural și rămâne ascultătoare la viteză mică. Oprești complet deasupra locului dorit. Cobori ancora controlat, mână peste mână sau din vinci, până atinge fundul. N-o arunci grămadă cu tot lanțul după ea; lanțul căzut peste ancoră o îmbracă precum o plasă și o împiedică să muște. În timp ce vântul împinge barca ușor înapoi, filezi calabrotul treptat. Și acum cifra de aur, nelipsită din grile: filezi de trei până la cinci ori adâncimea apei, iar pe vreme rea până la șapte ori. De ce atâta risipă de parâmă? Pentru că ancora ține doar dacă tracțiunea vine orizontal, culcată pe fund; un calabrot lung face exact asta. Cu calabrot scurt tragi ancora în sus și o smulgi singur, cu mâna ta. La final fixezi calabrotul la baba din provă, niciodată la pupă, și faci proba: marșarier scurt la ralanti; dacă barca se oprește ferm, ancora s-a înfipt. Două vorbe și despre vinciul de ancoră, că e un domn scump, cam trei mii de euro bucata, și se arde din nepricepere: nu ține apăsat pe telecomandă în continuu. Lucrezi în reprize de cel mult zece secunde, lași motorul electric să răsufle, iar la ridicare îl ajuți din mașină: click înainte, click înapoi, cum spunem noi, mici impulsuri care duc barca deasupra lanțului ca vinciul să nu tragă el toată barca. Omul de la provă urmărește lanțul și strigă direcția; omul de la cârmă dozează. Echipă, nu forță: asta e toată ancorarea.",
      },
      {
        title: "Veghea de ancoră și ridicarea",
        art: "day07-s4",
        bullets: [
          "Două repere fixe aliniate pe mal: dacă alinierea se schimbă, ancora ară",
          "Ancora care ară se ridică și se repoziționează — nu se negociază",
          "Ridicare: avansezi deasupra ancorei, tracțiune verticală, ancora spălată și amarată",
        ],
        narration: "Ancora e jos, proba de tracțiune a ținut. Un începător ar spune gata; marinarul spune abia acum verificăm. Metoda veche și fără baterii: alinierea reperelor. Alegi două obiecte fixe pe mal, cam pe aceeași linie de vedere, un far și un vârf de deal, un stâlp și un acoperiș, și memorezi cum se suprapun. Peste câteva minute te uiți iar: dacă alinierea s-a schimbat vizibil, barca se mută, adică ancora ară pe fund, târâtă ca un plug care nu s-a înfipt. Același verdict ți-l dă și GPS-ul, când poziția migrează încet și constant în aceeași direcție. Iar cu ancora care ară nu se negociază și nu se speră: o ridici complet și reiei manevra, în alt loc sau cu mai mult calabrot. Speranța nu e procedură de ancorare. La ancorările lungi și peste noapte se ține veghe de ancoră: cineva verifică periodic reperele, sau măcar pui o alarmă de ancoră pe GPS. Ridicarea, la plecare, se face cu mintea, nu cu spatele: nu tragi barca spre ancoră din brațe, ci avansezi ușor din mașină până ajungi deasupra ei, recuperând calabrotul pe măsură; ajuns la verticală, o smulgere scurtă în sus o desprinde. O speli de mâl bălăngănind-o la suprafață, că altfel îți cari golful în puțul lanțului, și o amarezi la locul ei. Cu asta, manevrele de bază sunt ale tale. De mâine trecem la partea despre care sper să n-ai nevoie niciodată și pe care trebuie s-o știi perfect: siguranța.",
      },
    ],
  },

  /* ===================== MODUL 3 ===================== */
  {
    id: "day06", day: 6, module: 3,
    title: "Documente și echipamentul de siguranță",
    summary: "Actele, dotările obligatorii, vestele, colacul, stingătorul și semnalele de primejdie.",
    slides: [
      {
        title: "Documentele de la bord",
        art: "day04-s1",
        bullets: [
          "Brevetul/certificatul tău, valabil pentru categoria ambarcațiunii",
          "Certificatul de înmatriculare al ambarcațiunii; asigurarea unde e cerută",
          "Compasul funcțional la bord — cerință pentru inspecția tehnică",
        ],
        narration: "Începem modulul de siguranță cu partea nespectaculoasă și obligatorie: hârtiile. Pe apă, ca și pe șosea, autoritatea te poate opri oricând pentru control, și controlul începe cu trei documente. Primul ești tu: brevetul sau certificatul de conducător, valabil pentru categoria ambarcațiunii pe care stai. Al doilea e barca: certificatul de înmatriculare sau documentul echivalent, care spune că ambarcațiunea există legal și ce are voie să facă. Al treilea e asigurarea, acolo unde legea o cere, și oricum o idee bună: pe apă, ca și în parcare, nu ești singur. Lipsa lor înseamnă sancțiuni și, uneori, voiaj încheiat pe loc, cu barca la mal. Sfaturi de om care a scotocit prin multe sertare pe valuri: ține actele într-o husă impermeabilă, într-un loc fix, pe care să-l găsești și pe întuneric; și verifică valabilitățile acasă, cu lunile înainte, nu pe apă, cu agentul lângă tine. Și o cerință mai puțin știută, dar cerută la inspecția tehnică a ambarcațiunii: compasul magnetic funcțional la bord. Da, chiar dacă ai trei GPS-uri și un telefon deștept. De ce insistă legea pe un instrument de acum două sute de ani, îți povestesc pe îndelete în ziua de navigație; îți spun doar atât: electronica are toane, magnetismul nu.",
      },
      {
        title: "Dotările obligatorii",
        art: "day04-s2",
        bullets: [
          "Veste pentru toți, colac cu saulă, stingător, semnalizare pirotehnică",
          "Ancoră cu parâmă, ispol/pompă de mână, trusă de prim ajutor, mijloc de comunicare",
          "Arată pasagerilor, la fiecare ieșire, unde stau vestele și colacul",
        ],
        narration: "Echipamentul de siguranță e lista scurtă de obiecte cu care nu se negociază, și ți-o dau ca pe o listă de zbor. Vestele de salvare: câte una de fiecare om de la bord, pe mărimea lui, la îndemână, nu îngropate sub sacoșele cu grătar. Colacul de salvare cu saulă, gata de aruncat. Stingătorul, verificat și neexpirat, în suportul lui. Mijloacele de semnalizare pirotehnică, rachete și fumigene, în termen și ferite de umezeală. Ancora cu parâma ei, dimensionate pentru barca ta, pentru că ancora e și echipament de urgență: e frâna de mână pe care o arunci când motorul te lasă lângă stânci. Ispolul sau pompa de mână, chiar dacă ai pompă electrică; electricitatea, ți-am mai spus, cedează prima. Trusa de prim ajutor completă. Și un mijloc de comunicare: stație radio, despre care facem mâine o zi întreagă, sau măcar telefonul într-o husă etanșă. Două obiceiuri transformă lista asta din hârtie în siguranță adevărată. Primul: verifică termenele de valabilitate la începutul fiecărui sezon; pirotehnia și stingătoarele expiră în liniște, fără să anunțe. Al doilea, și țin la el: la fiecare ieșire, primele două minute sunt instructajul pasagerilor. Unde sunt vestele, cum se închid, unde e colacul. În urgență nu există timp de căutat prin cufere, există doar reflexe pregătite dinainte. Oaspeții tăi zâmbesc la instructaj? Perfect. Mai bine să zâmbească la instructaj decât să plângă la căutat.",
      },
      {
        title: "Vestele: de salvare și de sprijin",
        art: "day08-s1",
        bullets: [
          "Vesta de salvare întoarce persoana inconștientă cu fața în sus",
          "Vesta de sprijin doar ajută la plutire — nu te întoarce",
          "Copiii: vestă pe mărime, cu chingă între picioare, purtată permanent",
        ],
        narration: "Obiectul care salvează cele mai multe vieți pe apă nu e nici radioul, nici racheta: e vesta. Și prima lecție e că vestă nu egal vestă. Vesta de salvare adevărată are flotabilitate mare și un guler gândit de oameni deștepți să facă un singur lucru esențial: să întoarcă un om inconștient cu fața în sus și să-i țină gura și nasul afară din apă, chiar dacă omul acela nu mai poate mișca un deget. Vesta de sprijin, cea subțire și comodă de la schi nautic și caiac, doar te ajută să plutești; câtă vreme ești treaz și înoți, e minunată; în clipa în care ți-ai pierdut cunoștința, nu mai e nimic. Diferența asta e întrebare de examen și, mult mai important, e diferența dintre două deznodăminte la același accident. Vesta se poartă pe mărime și încheiată complet: o vestă prea mare alunecă peste cap la intrarea în apă, exact în momentul în care aveai nevoie de ea; am văzut demonstrația în bazin și e neplăcut de convingătoare. Copiii poartă veste de copii, cu chingă între picioare, tot timpul, fără negociere și fără vacanțe de la regulă; la fel înotătorii slabi, și, sincer, toată lumea pe vreme rea, noaptea sau în apă rece. Îți las formula mea scurtă, s-o repeți musafirilor de pe barcă: vesta din cufăr n-a salvat pe nimeni, niciodată. Vesta purtată, pe foarte mulți.",
      },
      {
        title: "Colacul, saula de 30 de metri și scara",
        art: "day08-s2",
        bullets: [
          "Colacul: lumină automată + saulă plutitoare de 30 m (ajunge la victimă în manevră)",
          "Colac blocat? Aruncă imediat un fender — flotabilitate și sprijin psihologic",
          "Scara de urcare: un om obosit nu se ridică singur peste bordul liber",
        ],
        narration: "Când un om ajunge în apă lângă barcă, primul gest corect nu e săritul eroic după el, ci aruncatul unui lucru care plutește. Colacul de salvare e proiectat pentru asta, și dotările lui au fiecare o poveste cu tâlc. Lumina de aprindere automată: pentru că noaptea un cap de om printre valuri e invizibil, iar o luminiță care clipește se vede. Și saula, frânghia plutitoare legată de colac, cu lungimea standard de treizeci de metri. De ce fix treizeci? Pentru că o barcă de vreo doisprezece metri care execută întoarcerea de recuperare descrie un arc, iar treizeci de metri de saulă garantează că, aruncat corect, colacul cu funia lui ajunge la victimă din acel arc. Cineva a măsurat cu creionul ca tu să nu măsori cu inima în gât. Arunci colacul dincolo de om și îl tragi spre el, apoi omul spre barcă, iar tu rămâi pe punte, unde ești de zece ori mai util. Și un truc de meserie, pentru ziua în care colacul e blocat în suportul lui sau prins sub ceva: nu pierde secunde prețioase luptându-te cu suportul; smulge un fender, balonul de acostare, și aruncă-l imediat. Plutește admirabil și, la fel de important, îi dă omului din apă ceva de care să se țină și cu mâinile, și cu mintea: sprijinul psihologic contează aproape cât flotabilitatea. Ultima piesă, subestimată cronic: scara de urcare. Un om obosit și înfrigurat nu se poate ridica singur peste bordul liber, oricât l-ai trage de mâneci. Scară fixă sau agățabilă; în lipsă, o buclă de parâmă lăsată în apă devine treaptă. Recuperarea nu s-a terminat când omul a atins barca; s-a terminat când stă pe punte, învelit și cu ceva cald în mâini.",
      },
      {
        title: "Stingătorul: tehnica PASS",
        art: "day08-s3",
        bullets: [
          "Tip potrivit (combustibil + electric), presiune și valabilitate verificate",
          "Montat accesibil, pe calea de evacuare — nu deasupra motorului",
          "Scoți siguranța, țintești BAZA focului, apeși, baleiezi; apă pe benzină: NICIODATĂ",
        ],
        narration: "Focul la bord e rar, dar cu el nu există a doua șansă de a face impresie bună, așa că învățăm stingătorul ca la carte. Alegerea: un stingător potrivit pentru incendii de combustibil și instalații electrice, adică exact ce arde pe o barcă. Montarea, cu gândire de șahist: într-un suport accesibil, pe drumul tău natural de evacuare, dar nu chiar deasupra motorului, pentru că fix acolo nu vei putea băga mâna când motorul arde. Îl verifici periodic: acul manometrului în zona verde, termenul de valabilitate în viitor, nu în amintiri. Folosirea are patru pași, care se predau în toată lumea la fel: scoți siguranța, țintești baza focului, apeși mânerul, baleiezi dintr-o parte în alta. Mă opresc la pasul doi, pentru că e contraintuitiv și pică și la examen: nu stingi flăcările, care sunt doar spectacolul; stingi combustibilul care le hrănește, deci jetul merge jos, la baza focului. Te așezi cu spatele spre calea de retragere și, dacă poți, cu vântul în spate. Două legi de fier la final. Pe foc de benzină sau ulei nu se aruncă apă, niciodată: apa nu stinge benzina, o împrăștie aprinsă în toată barca, și din incendiu mic faci incendiu general. Și a doua: dacă focul e deja mai mare decât poate acoperi stingătorul tău, nu ești pompier și nu e ziua ta de eroism. Veste pe toată lumea, semnal de primejdie, pregătești abandonul. Barca se cumpără iar; oamenii, nu.",
      },
      {
        title: "Semnalele de primejdie",
        art: "day08-s4",
        bullets: [
          "Ziua: fumigenă portocalie, oglindă heliografică; Noaptea: rachetă roșie",
          "Fără pirotehnie: brațe ridicate/coborâte lent, sunet continuu",
          "Folosire nejustificată = sancțiune: trimiți salvatori adevărați după o alarmă falsă",
        ],
        narration: "Există un limbaj universal al primejdiei, pe care orice navigator de pe planetă îl citește fără dicționar, și azi îl înveți. Ziua, fumigena portocalie desenează pe cer o pată pe care n-o poți confunda cu nimic; oglinda heliografică, o bucată de metal lustruit cu găurică de vizare, aruncă sclipiri de soare vizibile de la kilometri, fără baterii și fără termen de expirare. Noaptea, racheta de semnalizare roșie urcă, arde și coboară lent, spunând tuturor celor care o văd: aici e nevoie de ajutor. Se lansează cu brațul întins, cu vântul în spate, și niciodată spre elicoptere sau spre alte nave; e un semnal, nu o armă. Dacă pirotehnia lipsește sau s-a terminat, corpul tău e semnalul: ridici și cobori lent, repetat, brațele întinse lateral, ca o pasăre obosită; ăsta e semnul internațional de primejdie, la fel ca un semnal sonor continuu. Toate acestea au o singură regulă de folosire, și e scrisă și în lege: numai la pericol real. Racheta trasă de amuzament la o aniversare pe lac trimite salvatori adevărați, cu costuri adevărate și cu riscuri adevărate, după o glumă; de-asta folosirea nejustificată se sancționează serios, și pe bună dreptate. Semnalele astea sunt vocabularul ultimei instanțe. Mâine îți dau instrumentul care face, de cele mai multe ori, ca ultima instanță să nu fie necesară: stația radio. O zi întreagă despre cum vorbește marea.",
      },
      {
        title: "Lista de control înainte de plecare",
        art: "day04-s4",
        bullets: [
          "Motor, telltale, ulei, combustibil (regula treimilor), direcție, lumini, pompă de santină",
          "Echipament complet, meteo verificată, persoană de contact anunțată",
          "Pregătirea serioasă a unui voiaj durează ~2 ore. Și merită fiecare minut.",
        ],
        narration: "Închid ziua de siguranță cu unealta care leagă tot: lista de control înainte de plecare. Piloții de avion, oameni cu mii de ore de experiență, o citesc cu degetul la fiecare zbor. Nu pentru că nu știu avionul; pentru că știu omul: memoria grăbită sare pași, iar pașii săriți se răzbună. Lista mea, punct cu punct. Mașina: pornește, jetul de control curge, uleiul la nivel. Combustibilul: după regula treimilor, o treime dus, o treime întors, o treime rezervă neatinsă; rezerva nu e pentru tine, e pentru vântul care se întețește la întoarcere. Direcția: timona rotită cap la cap, răspuns ferm, fără jocuri. Luminile de navigație și instrumentele: funcționale chiar dacă pleci la prânz, pentru că întoarcerile frumoase au obiceiul să prindă apusul. Pompa de santină: testată pe manual și pe automat. Echipamentul: veste, colac, stingător, pirotehnie, trusă, toate la post. Meteo: citită și înțeleasă, nu doar deschisă. Persoana de contact de pe mal: anunțată unde mergi și când te întorci; dacă rămâi fără semnal în pană, omul acela e cel care știe unde să trimită ajutorul. Și o cifră din viața reală, ca să-ți calibrezi așteptările: pregătirea serioasă a unui voiaj, cu verificări, meteo și avizele pentru navigatori, durează cam două ore. Două ore care par birocrație în port și valorează aur în larg. Marinarii spun că voiajul se câștigă la ponton, înainte de a se dezlega prima parâmă. Au dreptate.",
      },
    ],
  },
  {
    id: "day07", day: 7, module: 3,
    title: "Comunicații radio și unitățile mării",
    summary: "Stația VHF, canalul 16, protocolul radio, DSC, AIS, NAVTEX, mila și nodul.",
    slides: [
      {
        title: "Stația VHF: cât bate cu adevărat",
        art: "v4-vhf",
        bullets: [
          "Undele VHF merg în linie dreaptă → raza practică ≈ orizontul (~10 Mm)",
          "Stație fixă ~25 W (din bateria bărcii) · Portabilă 3–5 W (2–3 Mm)",
          "NICIODATĂ emisie fără antenă conectată — arde etajul final",
        ],
        narration: "Azi vorbim despre vorbit, pentru că pe mare a ști să comunici e o abilitate de supraviețuire, nu un moft. Instrumentul de bază e stația radio VHF, iar prima lecție e despre fizica ei, ca să nu-ți faci iluzii. Undele VHF merg în linie dreaptă, ca privirea. Pământul însă e rotund, orice ar zice unii, așa că dincolo de orizont semnalul tău pur și simplu nu mai are cu cine vorbi. Producătorii scriu în prospect douăzeci și cinci, treizeci de mile marine; alea sunt condiții de laborator. În practică, o stație fixă bate cam până la limita orizontului, vreo zece mile marine, iar pe vreme urâtă, cu ploaie și burniță, și mai puțin. Am pățit-o și eu: n-am putut vorbi de la intrarea în port până la clădirea căpităniei, o distanță pe care o strigi. Stația fixă emite cu vreo douăzeci și cinci de wați și se hrănește din bateriile bărcii; de-asta ți-am tot spus de bateria de rezervă. Stația portabilă, cu trei până la cinci wați, bate două, trei mile în zilele ei bune; e un instrument de buzunar, nu o gură mare. Și un avertisment tehnic pe care ți-l dau o singură dată, că doare la buzunar: nu apăsa niciodată pe emisie dacă antena nu e fizic conectată. Puterea aia nu are unde să plece și se întoarce în stație, arzând etajul final de amplificare. Verifică și conectorii antenei periodic: sarea, praful și vântul îi rod în tăcere, iar o stație cu antenă oxidată e un om care strigă cu palma la gură.",
      },
      {
        title: "Canalul 16 și cele trei feluri de mesaje",
        art: "v4-canal16",
        bullets: [
          "Canalul 16 = primejdie, urgență, securitate; veghe permanentă obligatorie",
          "MAYDAY = viața în pericol · urgență = situație gravă fără pericol de viață · securitate = avertizări (obiecte plutitoare etc.)",
          "Căpităniile pot aloca și canale locale de trafic",
        ],
        narration: "Dacă din toată ziua de azi reții un singur număr, să fie șaisprezece. Canalul șaisprezece VHF e canalul universal de primejdie, urgență și securitate, iar toate stațiile au un buton roșu marcat șaisprezece care te aruncă instant pe el. Pe mare, stația stă pornită, cu veghea pe șaisprezece: nu e o politețe, e o obligație a tuturor participanților la trafic, pentru că un apel de ajutor pe care nu-l aude nimeni e doar vânt. Mesajele de pe acest canal au trei ranguri, și examenul le iubește. Primul rang: primejdia, distress. Viața omului în pericol: om la apă, incendiu, barca ia apă. Apelul vocal: meidei, meidei, meidei, urmat de numele ambarcațiunii, poziția cât mai precisă și natura necazului. Al doilea rang: urgența, pentru situații serioase în care viața nu e încă direct amenințată: o avarie care te lasă în derivă, un rănit stabil care are totuși nevoie de medic. Al treilea rang: securitatea, avertizările pentru ceilalți: un container plutitor, un buștean, o ladă frigorifică scăpată de pe o navă. Nu râde de exemple; un șezlong plutitor înfășurat pe elice sau o gaură făcută de un colț de container strică ziua oricărui motor. Auzi un asemenea anunț, notezi zona și mulțumești în gând. Mai știi de la mine și că autoritățile portuare pot aloca și canale locale de lucru: la Mangalia, de exemplu, traficul se coordonează pe canalul șaizeci și șapte. Le găsești în documentația portului. Iar la intrarea în apele altui stat, bună ziua se spune tot pe șaisprezece.",
      },
      {
        title: "Protocolul radio: «Teddy de Paul», over și out",
        art: "v4-protocol",
        bullets: [
          "VHF e simplex: vorbește unul singur — mesaje scurte, clare",
          "Apelul corect: numele chemat, «de», numele tău: «Teddy, Teddy, de Paul»",
          "Legătura pe 16 → conversația pe canal de lucru → înapoi la veghe · OVER = aștept · OUT = închid",
        ],
        narration: "Acum eticheta radioului, pentru că pe canalul pe care ascultă toată marea nu vorbim ca la telefon. Prima diferență e tehnică: stația VHF lucrează în regim simplex. Cât timp apeși pe emisie, vorbești tu și nu aude nimeni altceva; telefonul, care lasă ambele părți să vorbească deodată, e duplex. Concluzia practică: mesaje scurte, gândite înainte de apăsarea butonului, nu monologuri. A doua: formula de apel, standardizată de generații, e numele celui chemat, rostit o dată sau de două ori, apoi cuvântul de, apoi numele tău. Teddy, Teddy, de Paul. Atât. Nu Paul pentru Teddy, nu Paul îl caută pe Teddy; alea sunt improvizații care sună a stație de taximetrie, iar pe mare te arată cu degetul ca începător. În engleză, echivalentul lui de e this is. A treia regulă ține canalul de urgență liber: legătura se stabilește pe șaisprezece, dar conversația se mută imediat pe un canal de lucru, de pildă zece; la final, amândoi înapoi pe șaisprezece, la veghe. Șaisprezece e holul de la intrare, nu sufrageria. Terminologia: over înseamnă am terminat ce aveam de spus, aștept răspuns. Out înseamnă închei definitiv legătura. Iar celebrul over and out din filme e o contradicție în termeni, aștept răspuns și închid, pe care marinarii adevărați o lasă scenariștilor. Vrei să verifici că stația ta emite cum trebuie? Ceri o probă de auzire, un radio check, cu căpitănia sau cu altă stație. Treizeci de secunde care îți spun dacă vocea ta există.",
      },
      {
        title: "Butonul DISTRESS și obligațiile tale",
        art: "v4-dsc",
        bullets: [
          "Butonul roșu cu capac: transmite digital poziția + identitatea, automat, tuturor",
          "Numai la primejdie gravă (om la apă, incendiu) — nu pentru pană de combustibil",
          "Recepționezi un distress: asculți, notezi, răspunzi; la nevoie devii RELEU. Închiderea stației = infracțiune.",
        ],
        narration: "Stațiile moderne au, sub un căpăcel, un buton roșu pe care scrie distress, și el merită o scenă întreagă, pentru că apasă cineva pe el doar în ziua cea mai proastă din viața lui. Apăsat și ținut, butonul transmite automat, digital, un pachet cu poziția ta, identitatea ambarcațiunii și, dacă alegi din listă, natura necazului: abandon, incendiu, om la apă. Pachetul pleacă spre toate stațiile din zonă, care încep să sune strident, ca o alarmă de telefon la cutremur. Condiția ca minunea să funcționeze: datele bărcii să fi fost introduse în stație la instalare, iar stația să fie legată la GPS. Verifică asta o dată, într-o după-amiază liniștită, nu în noaptea în care contează. Și subliniez: butonul e pentru primejdie gravă. Ai rămas fără combustibil pe lac senin? Aia e o zi proastă, nu un distress; se rezolvă pe voce, cu răbdare și cu puțină jenă. Acum partea ta de contract, pentru că pe mare fiecare barcă e stația de salvare a celeilalte. Navighezi cu stația pornită; să o închizi tocmai când urlă un distress e infracțiune, nu figură de stil. La recepție: citești datele de pe ecran, comuți pe șaisprezece voce și încerci legătura cu nava în pericol. Răspunzi cu cine ești, că ai recepționat, unde ești și că te îndrepți spre ea. Dacă altă navă, mai aproape, confirmă că intervine, îți continui drumul cu urechea ciulită. Iar dacă nava în primejdie strigă spre coastă și coasta n-o aude, tu, care o auzi, devii releu: retransmiți mesajul mai departe. Pe mare nu există spectatori; există doar salvatori care încă n-au fost de serviciu.",
      },
      {
        title: "AIS, NAVTEX și raportarea la căpitănie",
        art: "v4-ais",
        bullets: [
          "AIS: transmite/recepționează poziția, viteza, datele navelor — te vede radarul de la 6 Mm, nu de la 3",
          "NAVTEX: mesaje scrise de la stațiile de coastă — meteo, avize, zone interzise",
          "La plecarea din porturi (mai ales comerciale/militare): anunți căpitănia — cine, câți, ce brevet",
        ],
        narration: "Trei instrumente moderne îți fac viața mai sigură, și le iei pe toate trei în bagajul de cunoștințe. Primul: AIS-ul, sistemul de identificare automată. E un transmițător-receptor care difuzează încontinuu poziția, viteza, dimensiunile și identitatea bărcii tale, și primește aceleași date de la toate navele din jur, desenându-le pe ecranul ploterului. De ce contează pentru o barcă mică? Aritmetică simplă de noapte: luminile tale de navigație se văd de la vreo trei mile; un cargou lansat are nevoie de mai mult de-atât ca să oprească, deci când te-a văzut, era deja târziu. Cu AIS, același cargou te are țintă pe ecran de la șase mile, adică de două ori mai devreme; dublezi distanța, dublezi timpul, dublezi șansele. Există și aplicații gratuite, gen Marine Traffic, unde vezi pe telefon toate navele cu AIS, inclusiv pe Dunăre și pe canal; distractiv acasă, util în voiaj. Al doilea instrument: NAVTEX-ul, un receptor de mesaje scrise de la stațiile de radiocoastă: buletine meteo, avize de furtună, exerciții militare, zone interzise cu coordonate. Verificarea avizelor face parte, obligatoriu, din pregătirea voiajului; ții minte cele două ore de pregătire? O parte din ele e cititul acestor telegrame de la mare. Al treilea nu e un aparat, ci un obicei: raportarea. La plecarea din porturi, mai ales din cele comerciale sau militare, anunți căpitănia prin stație: cine pleacă, câte persoane la bord, cine e conducătorul și ce brevet are. Nu e birocrație de dragul ștampilei: dacă la noapte dă bulăul peste tine, cum îi spunem noi furtunii zdravene, cineva pe mal știe deja că exiști, câți sunteți și unde v-ați dus. Anonimatul e romantic doar în cărți; pe mare, cel mai frumos lucru e să fii așteptat.",
      },
      {
        title: "Mila marină, nodul și cele două viteze",
        art: "v4-mila",
        bullets: [
          "Mila marină = 1852 m (un minut de arc de meridian); mila terestră ≈ 1600 m",
          "Nodul = o milă marină pe oră (~2 km/h)",
          "Viteza prin apă ≠ viteza deasupra fundului (GPS); diferența = curentul",
        ],
        narration: "Închei ziua cu unitățile de măsură ale mării, și îți promit că au mai multă poezie decât par. Mila marină are o mie opt sute cincizeci și doi de metri, aproape doi kilometri, și nu e o cifră scoasă din pălărie: Pământul are trei sute șaizeci de grade, fiecare grad are șaizeci de minute, iar lungimea unui minut de arc pe circumferința Pământului e cam o mie opt sute cincizeci de metri. Mila marină e, deci, un minut de planetă. Când navighezi o milă, ai mai bifat un minut din cercul lumii; mie și după treizeci de ani mi se pare frumos. Nu o confunda cu mila terestră de o mie șase sute de metri, aia a rămas de la romani și de la englezi. Viteza se măsoară în noduri, iar nodul înseamnă o milă marină pe oră; cinci noduri, cinci mile într-o oră, cam zece kilometri. Se spune barca merge cu cinci noduri, niciodată cinci noduri pe oră, că aia ar fi mile pe oră pe oră și te arăți iar cu degetul. Și acum subtilitatea care pică la examen și se simte în elice: barca are două viteze în același timp. Viteza prin apă, pe care o arată instrumentele clasice: cât de repede aluneci față de apa din jur. Și viteza deasupra fundului, pe care o dă GPS-ul: cât de repede te miști cu adevărat față de planetă. Diferența dintre ele e curentul. Exemplul meu preferat, trăit pe pielea mea în Bosfor, unde curge un curent de doi, trei noduri de la nord la sud: la dus, instrumentele arătau șase noduri prin apă, iar GPS-ul opt deasupra fundului; curentul ne ducea în brațe. La întors, tot șase prin apă, dar numai trei deasupra fundului: aceeași barcă, același motor, jumătate din drum. Cine își planifică voiajul doar cu viteza prin apă ajunge la cină cu o zi întârziere.",
      },
    ],
  },
  {
    id: "day08", day: 8, module: 3,
    title: "Urgențe pe apă și primul ajutor",
    summary: "Om la apă, incendiu, avarii, remorcaj, hipotermie, înec, RCP și trusa.",
    slides: [
      {
        title: "Om la apă: nimeni nu sare",
        art: "day09-s1",
        bullets: [
          "Strigi «Om la apă!», arăți permanent spre persoană, arunci ceva plutitor",
          "Apropiere cu prova în vânt; la preluare, motorul la punct mort/oprit",
          "«Nimeni nu sare după cel căzut. În loc de o victimă, ai avea două.»",
        ],
        narration: "Începem ziua urgențelor cu scenariul clasic al agrementului: om la apă. Se rezolvă cu roluri, nu cu eroism, și ți le dau în ordinea în care se joacă. Secunda unu: cine a văzut căderea strigă tare om la apă și ridică brațul spre omul din apă, și nu-l mai scapă din ochi orice ar fi. Arătătorul ăsta uman e cel mai important instrument de pe barcă în acel moment: printre valuri, un cap de om dispare din vedere în câteva secunde, iar cine l-a pierdut nu-l mai găsește ușor. Simultan, zboară spre om colacul sau orice plutește: fender, vestă, lada frigorifică; îi dă sprijin și marchează locul. Conducătorul reduce viteza și întoarce. Apropierea finală: cu prova în vânt, împotriva vântului, ca barca să rămână ascultătoare la viteză mică și să nu fie împinsă de rafale peste omul din apă. Iar la contact, legea absolută: mașina la punct mort sau oprită de tot. Elicea care se învârte lângă un om în apă transformă salvarea în tragedie; nu există grabă care să justifice elicea vie. Recuperarea, pe bordul de sub vânt, pe la scară sau peste pupă. Și acum regula pe care o predau cu vocea cea mai serioasă pe care o am: nimeni nu sare în apă după cel căzut. Nimeni. Pentru că în condițiile alea, în loc de o victimă, o să ai două. Știu ce spune instinctul, și știu că la propriul copil mic niciun părinte de pe lume nu ascultă de regulă, și n-o să-i cer eu asta. Dar pentru adulți, treaba skipperului e uneori să-i țină fizic pe ceilalți în barcă și să facă manevra. Barca întoarsă și colacul aruncat salvează. Săritul în apă adaugă un nume pe lista de căutați.",
      },
      {
        title: "Incendiu la bord",
        art: "day09-s2",
        bullets: [
          "Tai sursele: motor oprit, robinet de combustibil închis, curent întrerupt",
          "Orientezi barca: fumul și flăcările duse de vânt peste bord, nu peste oameni",
          "Focul crește? MAYDAY, veste, abandon organizat — contra vântului",
        ],
        narration: "Dacă izbucnește foc la bord, primele zece secunde valorează cât următoarele zece minute. Pasul unu: îi tai focului mâncarea. Oprești mașina, închizi robinetul de combustibil, scoți de sub tensiune circuitele electrice. Un foc fără hrană e un foc care slăbește singur, încă înainte să ridici stingătorul. Pasul doi: folosești vântul ca pe un membru al echipajului. Orientezi barca astfel încât fumul și flăcările să fie duse peste bord, în afara ei, nu peste cocpit și peste oameni; câteva grade de cârmă schimbă complet geografia incendiului. Pasul trei: stingătorul, cu tehnica de ieri: baza focului, baleiere, spatele spre calea de retragere. Pasagerii trec în partea opusă focului și își pun vestele; nu e panică, e procedură, și tocmai calmul cu care o ceri o face să pară banală. Dacă focul cedează, nu pleci de lângă locul lui: benzina și materialele bărcii au obiceiul urât de a se reaprinde din jar; îl păzești până e rece. Dacă focul crește în ciuda stingătorului, nu te încăpățâna, că nu e concurs: meidei pe șaisprezece, cu poziția, abandon organizat, iar în apă sau în barca de serviciu te îndepărtezi contra vântului, ca să nu plutești în combustibilul care se poate scurge și aprinde pe apă. Ordinea valorilor nu se negociază: întâi oamenii, apoi povestea, și abia la urmă barca. Bărci se mai fac; din oameni, fiecare e unicat.",
      },
      {
        title: "Gaura de apă și eșuarea",
        art: "day09-s3",
        bullets: [
          "Infiltrație: găsești, astupi (dopuri conice, cârpe), pompezi — și ceri ajutor din timp",
          "Eșuare: STOP elicea imediat, evaluează; nu forța motorul înapoi orbește",
          "Uneori soluția e răbdarea: greutate mutată, cange, apă care crește",
        ],
        narration: "Două avarii clasice îți testează calmul, și amândouă se câștigă cu capul, nu cu mușchii. Prima: intră apă în barcă. Ordinea e găsește, astupă, evacuează. Cauți sursa, și de cele mai multe ori nu e o gaură spectaculoasă de film, ci un furtun sărit de pe ștuț sau o presetupă slăbită; de-asta primul drum e la santină și la instalații. Astupi cu ce ai: dopurile conice de lemn sau cauciuc, care se țin la bord exact pentru ziua asta, cârpe presate, o pernă proptită cu genunchiul. Apoi pompa de santină pe automat, ispolul în mâna cuiva, și o echipă care evacuează organizat face față unei infiltrații surprinzător de mari. Un singur lucru nu amâni: chematul ajutorului. Radioul se folosește când apa e la gleznă, nu când e la genunchi; un apel anulat pentru că te-ai descurcat e o victorie, un apel întârziat e o statistică. A doua avarie: eșuarea, când barca pune fundul pe nisip sau pe pietre. Reflexul care salvează mii de euro: oprești elicea în aceeași secundă. Elicea care bate în fund se distruge pe loc, și odată cu ea uneori și transmisia. Apoi respiri și evaluezi: unde e apa adâncă, ce spune carena, intră apă? Nu forța motorul înapoi orbește: poți săpa barca mai adânc în banc sau poți rupe ce nu era rupt. Uneori ieși mutând greutatea oamenilor în bordul dinspre adânc, împingând cu cangea, sau pur și simplu așteptând apa care crește; alteori cel mai ieftin remorcher e răbdarea, iar al doilea cel mai ieftin e telefonul la asistență. Graba la eșuare are un singur tarif fix: o elice nouă.",
      },
      {
        title: "Remorcajul fără accidente",
        art: "day09-s4",
        bullets: [
          "Parâma doar pe puncte structurale solide (babale, tacheți zdraveni) — nu balustrade",
          "Pornire fără smucituri, viteză mică; pe valuri, ambele bărci pe același ritm de val",
          "NIMENI în prelungirea parâmei întinse — parâma ruptă biciuiește",
        ],
        narration: "Remorcajul pare cel mai banal capitol: două bărci și o funie, ce poate merge prost? Aproape totul, și de obicei din același motiv: lumea uită că parâma întinsă e ditamai arcul armat. Începem cu prinderea: parâma de remorcaj se leagă numai de puncte structurale solide, baba de remorcă, tacheții zdraveni din provă, elementele prinse în corpul bărcii. Niciodată de balustrade, de mânerele de plastic sau de piciorul scaunului: se smulg din prima smucitură și pleacă prin aer împreună cu parâma, ca o praștie cu bagaje. Garlinul de la lecția parâmelor, dacă îl ai, aici își câștigă pâinea. Lungimea parâmei: generoasă, iar pe valuri o reglezi așa încât ambele ambarcațiuni să urce și să coboare pe val în același ritm; dacă una urcă în timp ce alta coboară, fiecare val e o smucitură, și smuciturile rup. Pornirea: la pas, întinzi parâma încet până ia tensiune, fără șocuri, apoi crești viteza gradual și rămâi la viteză mică; remorcajul nu e curse. Cel remorcat ține cârma pe urma remorcherului, nu doarme. Și zona interzisă, pe care în desen o vezi hașurată cu roșu: nimeni nu stă în prelungirea parâmei întinse sau lângă ea. O parâmă care cedează sub tensiune reculează ca un bici, cu putere de fractură; pasagerii stau jos și în afara planului ei. Stabiliți dinainte, între bărci, semne simple: mai încet, stop, mola. Iar în port, pe apă calmă, remorcajul la ureche, cu bărcile legate bord la bord, îți dă control fin de bijutier. Remorcajul reușit e cel despre care nu ai ce povesti.",
      },
      {
        title: "Hipotermia",
        art: "day10-s1",
        bullets: [
          "Apa fură căldura de ~25 de ori mai repede decât aerul",
          "Semn grav: frisoanele ÎNCETEAZĂ; apar confuzia și apatia",
          "Încălzire treptată: haine uscate, pături, băuturi calde — fără frecții, fără alcool",
        ],
        narration: "Trecem la capitolul medical, și începem cu dușmanul tăcut al apelor noastre: hipotermia. Apa fură căldura corpului de vreo douăzeci și cinci de ori mai repede decât aerul; de-asta poți face hipotermie în plină vară, într-un lac de munte de optsprezece grade, după o oră de plutit. Filmul arată așa: primele minute în apă rece aduc șocul termic, respirație scăpată de sub control, puls urcat, panică; aici vesta îți ține capul afară cât corpul se dezmeticește. Apoi frigul amorțește mușchii, întâi degetele, apoi brațele, și înotul devine imposibil cu mult înainte de pierderea cunoștinței; omul care striga acum cinci minute că se descurcă începe să tacă. Semnele le citești de pe punte: frisoane puternice la început, asta e faza bună, corpul încă se luptă. Semnalul cu adevărat rău e când frisoanele încetează și apar confuzia, vorbirea încâlcită, apatia: corpul a trecut la economie de avarie. Ce faci: scoți omul din apă cu blândețe, îi dai jos hainele ude, îl învelești în pături sau folie termică, inclusiv capul, și îl încălzești treptat, adăpost, băuturi calde și dulci dacă e perfect conștient. Ce nu faci, și aici pică multă lume de bună-credință: frecții energice, mișcări bruște, alcool. Toate trei împing sângele rece de la margini spre inimă dintr-odată, și inima rece nu iubește surprizele; colapsul vine exact de la graba de a ajuta. Încălzirea corectă e lentă și plictisitoare, ca mai toate lucrurile care funcționează.",
      },
      {
        title: "Înecul și resuscitarea (RCP 30:2)",
        art: "day10-s3",
        bullets: [
          "Ierarhia salvării: întinde → aruncă → vâslește → (abia la urmă) înoată",
          "Nu respiră? Ajutor chemat + compresii: centrul pieptului, 5–6 cm, 100–120/min",
          "30 compresii : 2 ventilații; nu te opri; orice înecat ajunge apoi la medic",
        ],
        narration: "La înec, regula zero am spus-o la om la apă și o repet, pentru că e mama tuturor regulilor: nu transformi o victimă în două. Salvatorii profesioniști au o ierarhie pe care o preiei ca atare, patru trepte: întinde, aruncă, vâslește, înoată. Întinzi o cange, o vâslă, un braț de pe punte. Arunci colacul cu saulă. Te apropii cu barca. Și doar dacă absolut nimic altceva nu există și ești înotător serios, intri în apă, cu un obiect plutitor între tine și victimă, pentru că un om care se îneacă se agață de salvator cu o forță care îi scufundă pe amândoi. Omul e la bord: acum ești medic de ocazie, și ai un algoritm scurt. Îl întinzi pe spate, îi deschizi căile respiratorii cu capul lăsat ușor pe spate, și verifici respirația maximum zece secunde: privești pieptul, asculți, simți aerul pe obraz. Respiră normal: poziția laterală de siguranță, îl acoperi, îl supraveghezi fără pauză. Nu respiră sau doar horcăie: chemi ajutorul prin radio sau telefon și începi resuscitarea. Podul palmei în centrul pieptului, cealaltă mână deasupra, degetele împletite, brațele întinse, umerii deasupra mâinilor. Apeși tare și repede: cinci, șase centimetri, o sută până la o sută douăzeci pe minut; dacă vrei un metronom, e exact ritmul piesei Staying Alive, și nu, nu e o glumă, așa se predă în toată lumea. După treizeci de compresii, două ventilații: capul pe spate, nasul strâns, sufli o secundă până se ridică pieptul. Treizeci la două, iar și iar. Nu poți cu gura? Compresiile singure, fără oprire, sunt de o sută de ori mai bune decât nimic. Te schimbi cu cineva la două minute, că e muncă de salahor. Și frica de a apăsa prea tare las-o pe ponton: o coastă fisurată se vindecă în șase săptămâni; un creier fără oxigen nu se mai vindecă deloc. Ultima regulă, absolută: orice om scos din apă după un episod de înec merge la medic, chiar dacă râde și zice că e bine. Apa ajunsă în plămâni lucrează și la ore după incident.",
      },
      {
        title: "Răni frecvente și trusa de prim ajutor",
        art: "day10-s4",
        bullets: [
          "Sângerare: presiune directă, strat peste strat; Arsuri: apă 10–20 min, fără gheață",
          "Insolație: umbră, lichide, comprese; Rău de mare: orizont, aer, mijlocul bărcii",
          "Trusa: pansamente, dezinfectant, foarfecă, mănuși, folie termică — verificată anual",
        ],
        narration: "Închidem ziua medicală cu rănile mărunte ale vieții pe apă, alea care nu ajung la știri dar strică vacanțe. Sângerarea: presiune directă, comprese sau orice textil curat apăsat ferm pe rană, minute în șir, fără ridicat la fiecare zece secunde să vezi dacă s-a oprit, că nu s-a oprit tocmai pentru că ridici. Dacă sângele trece prin pansament, pui alt strat peste, nu-l scoți pe primul; primul strat a început deja cheagul, și cheagul nu se dărâmă. Arsurile, de la soare, de la eșapament, de la grătarul entuziast: apă curată peste, zece până la douăzeci de minute, apoi acoperit lejer. Fără gheață direct pe piele, fără unguenturi miraculoase de la rude pe arsuri deschise. Insolația se anunță cu durere de cap, amețeală, greață: omul la umbră, lichide, comprese reci, și ziua lui de căpitan s-a încheiat. Răul de mare se previne mai ușor decât se tratează, și rețeta e verificată pe generații de cursanți: privirea la orizont, nu în telefon; aer proaspăt, nu cabină; locul de la mijlocul bărcii, unde legănarea e mai mică; mâncare ușoară înainte de plecare, nu șaorma eroică. Iar trusa de prim ajutor, obligatorie la bord, are inventar minim: pansamente sterile, fașe, plasturi, dezinfectant, foarfecă, mănuși, folie termică de supraviețuire. O deschizi la începutul fiecărui sezon: dezinfectantul expiră în tăcere, plasturii migrează misterios spre buzunarele copiilor, iar foarfeca a împrumutat-o cineva anul trecut. Trusa completă în ziua în care ai nevoie de ea, asta e toată definiția pregătirii. Mâine schimbăm registrul: ieșim la drum, printre geamanduri și reguli de circulație. Navigația te așteaptă.",
      },
    ],
  },

  /* ===================== MODUL 4 ===================== */
  {
    id: "day09", day: 9, module: 4,
    title: "Balizajul și regulile de drum",
    summary: "Geamandurile IALA, mărcile cardinale și regulile de evitare a coliziunilor.",
    slides: [
      {
        title: "Balizajul: indicatoarele apei",
        art: "day11-s1",
        bullets: [
          "Geamandurile marchează șenalul, pericolele și zonele speciale",
          "Sistemul IALA, Regiunea A (Europa)",
          "Citirea: formă + culoare + semn de vârf + lumină (noaptea)",
        ],
        narration: "Bine ai ajuns în modulul de navigație, partea în care apa capătă indicatoare. Pe șosea ai semne, marcaje și sensuri; pe apă ai geamandurile, balizele, care fac exact aceeași treabă pentru cine știe să le citească, și sunt doar apă colorată pentru cine nu știe. Geamandurile delimitează șenalul navigabil, fâșia de apă sigură și adâncă; avertizează asupra pericolelor punctuale, o epavă, o stâncă; și marchează zonele speciale, de la perimetre de înot la cabluri submarine. La noi, ca în toată Europa, se aplică sistemul internațional iala, regiunea A; reține denumirea, pentru că apare sec în grile: în ce sistem de balizaj navigăm. Fiecare geamandură vorbește prin patru caractere, ca un om prin haine, față, gesturi și voce: forma corpului, cilindrică, conică, sferică; culoarea; semnul de vârf, silueta mică montată deasupra, care e semnătura ei; și, noaptea, ritmul și culoarea luminii. Împreună îți spun, fără niciun cuvânt, pe unde e drumul și pe unde e necazul. Convenția de citire, ține-o bine: sensul de referință e dinspre larg spre port, iar pe fluvii din aval spre amonte, adică împotriva curgerii. Toate regulile pe care le înveți în scenele următoare se citesc în acest sens, și jumătate din greșelile de examen la balizaj vin din uitarea acestei convenții. În ilustrație vezi principiul: șenalul spre port, încadrat de roșu pe o parte și verde pe cealaltă, ca bordurile unui drum. Hai să învățăm să citim drumul ăsta.",
      },
      {
        title: "Mărcile laterale",
        art: "day11-s2",
        bullets: [
          "La INTRARE (dinspre larg): roșu cilindric la babord, verde conic la tribord",
          "Truc: culorile geamandurilor = culorile luminilor tale de navigație",
          "La ieșire totul se citește invers; pe fluvii, sensul = din aval spre amonte",
        ],
        narration: "Mărcile laterale sunt soldații de rând ai balizajului, cele pe care le vezi cel mai des: ele țin marginile șenalului. Regula pentru regiunea A, spusă o dată rar și clar: la intrarea dinspre larg spre port, lași geamandurile roșii la babord, în stânga ta, și geamandurile verzi la tribord, în dreapta ta. Forma le întărește culoarea, pentru daltoniști și pentru contre-lumină: marca roșie de babord e cilindrică, o cutie de conserve; marca verde de tribord e conică, cu vârful în sus, o căpiță. Noaptea, fiecare clipește în culoarea ei. Și acum trucul de memorare pe care mi-l mulțumesc toți cursanții la examen: culorile geamandurilor corespund luminilor de navigație ale propriei tale bărci. Roșul tău de babord salută roșul geamandurii; verdele tău de tribord salută verdele ei. Barca intră în port dând mâna cu geamandurile de aceeași culoare, stânga cu stânga, dreapta cu dreapta. Atenție însă la sens, aici cad cei grăbiți: la ieșirea din port, aceeași geografie se citește invers, roșul îți rămâne acum pe dreapta. De-asta orice întrebare de examen precizează sensul: la intrare sau la ieșire; citește cuvântul ăla de două ori înainte să răspunzi. Pe fluvii, pe Dunărea noastră, sensul convențional e din aval spre amonte, contra curgerii; intri în fluviu dinspre mare, aceeași logică. Ține imaginea simplă: barca intrând între roșu la stânga și verde la dreapta. Cu ea în minte, jumătate din balizaj e rezolvat.",
      },
      {
        title: "Mărcile cardinale",
        art: "day11-s3",
        bullets: [
          "Spun în ce parte e apa SIGURĂ față de pericol: N, E, S, V",
          "Negru + galben; conurile de vârf sunt cheia: N = ambele sus, S = ambele jos",
          "E = bazele apropiate (ou), V = vârfurile apropiate (pahar cu picior, W de la Wine)",
        ],
        narration: "Mărcile cardinale rezolvă altă problemă decât lateralele: nu-ți arată marginea drumului, ci cum să ocolești un pericol punctual, folosind busola. Numele mărcii spune unde e apa sigură. Marca de nord stă la nord de pericol și-ți cere să treci pe la nord de ea. La fel sud, est și vest. Simplu ca bună ziua, dacă știi să identifici marca, și aici intră în scenă costumația: toate cardinalele sunt vopsite în negru cu galben, iar cheia de citire rapidă e semnul de vârf, două conuri negre suprapuse. La nord, ambele conuri arată în sus, cum e nordul pe orice hartă. La sud, ambele în jos. Până aici, intuiția duce singură. La est, conurile stau cu bazele apropiate și vârfurile în afară, ca un ou; ține minte oul de la Est. La vest, vârfurile stau față în față, ca un pahar cu picior; iar litera W de la vest e prima literă de la Wine, vinul care se bea din exact paharul ăla. Rețeta de memorare e veche de când lumea marinărească și funcționează pentru că e puțin caraghioasă; creierul ține minte caraghioslâcurile. Benzile negre și galbene urmează și ele conurile: negrul stă în partea în care arată vârfurile. Algoritmul complet, când vezi în larg o geamandură galben cu negru: identifici conurile, rostești punctul cardinal, treci de partea aceea a mărcii și lași pericolul de partea opusă. Cardinalele sunt subiect garantat la examen, și sunt și subiectul la care se pierd puncte gratuite. Tu nu le mai pierzi: tu ai oul și paharul de vin.",
      },
      {
        title: "Pericol izolat, ape sigure, mărci speciale",
        art: "day11-s4",
        bullets: [
          "Pericol izolat: negru cu bandă roșie, DOUĂ SFERE negre — ocolești pe oricare parte, la distanță",
          "Ape sigure: dungi VERTICALE roșu-alb, sferă roșie — poți trece pe oricare parte",
          "Marcă specială: galbenă cu X galben — zonă cu destinație specială (afli din hartă)",
        ],
        narration: "Trei personaje mai are alfabetul balizajului, și cu ele îl închei. Primul: marca de pericol izolat. Se ancorează fix deasupra unui pericol mic, o epavă, o stâncă singuratică, în rest înconjurat de apă bună. O recunoști după corpul negru cu una sau mai multe benzi late roșii și, semnătura care nu se poate confunda, două sfere negre suprapuse în vârf, ca doi ochi de tuci. Mesajul ei e scurt: fix sub mine e necazul; ocolește-mă la distanță sigură, pe oricare parte vrei, doar nu peste mine. Al doilea personaj spune exact invers: marca de ape sigure. E singura marcă din tot sistemul cu dungi verticale roșii și albe, poartă o sferă roșie în vârf, și anunță: în jurul meu, de jur împrejur, totul e navigabil. O găsești la mijlocul șenalelor largi și ca punct de aterizare la intrarea în porturi, prima geamandură pe care o cauți când vii din larg. Poți trece pe oricare parte a ei; ea nu marchează un pericol, ci o certitudine, și e singura geamandură care există ca să te liniștească. Al treilea personaj e marca specială: complet galbenă, cu semn de vârf în formă de X galben. Ea nu vorbește despre navigație, ci despre destinație: perimetre de înot, zone militare, prize de apă, cabluri, ferme de agrement nautic. Ce anume păzește o afli din hartă sau din avizele pentru navigatori, cele de pe NAVTEX, mai știi. Recapitularea familiei complete, într-o suflare: laterale pentru marginile drumului, cardinale pentru ocolit pericole cu busola, pericol izolat cu două sfere, ape sigure cu dungi verticale, speciale galbene pentru restul mesajelor. Apa a devenit un drum cu indicatoare. Acum să învățăm regulile de circulație pe el.",
      },
      {
        title: "Regulile de drum: cele trei temelii",
        art: "day12-s1",
        bullets: [
          "Veghe permanentă — cu ochii și cu urechile",
          "Viteza de siguranță — cea care lasă timp de evitare și oprire",
          "Manevra de evitare: din timp, amplă, vizibilă",
        ],
        narration: "Intrăm în regulile de drum, colregul internațional, la noi ripam: codul rutier al apei. Înainte de cazurile concrete, trei temelii pe care stă tot restul. Prima: veghea permanentă. Conducătorul urmărește continuu, cu ochii și cu urechile, tot ce mișcă și tot ce sună: nave, înotători, geamanduri, un nor care crește. Pe apă nu există oglinzi retrovizoare și nici claxonul vecinului care să te trezească; ochii tăi sunt tot sistemul de siguranță. Muzica dată tare și telefonul din mână sunt, pe barcă, echivalentul condusului legat la ochi, și le spun cursanților mei pe șleau: pe apă se ascultă marea, nu notificările. A doua temelie: viteza de siguranță. Nu e o cifră, e o judecată: viteza corectă depinde de vizibilitate, de aglomerație, de cât de repede oprește barca ta și de starea mării, și e întotdeauna aceea care îți lasă timp să eviți și să oprești. Aceeași barcă are viteza de siguranță treizeci de noduri în larg pustiu și trei noduri în port aglomerat. A treia temelie: manevra de evitare se face din timp, amplu și vizibil. O corecție mică și târzie îl lasă pe celălalt să ghicească ce vrei, și pe apă ghicitul e sport periculos; o schimbare de drum clară, făcută devreme, se citește de la o milă și liniștește pe toată lumea. Și un gram de înțelepciune peste litera legii: regulile îți pot da prioritate, dar un cargou de două sute de metri fizic nu poate opri în kilometrul lui de drum. Ai prioritate și în fața trenului, teoretic. Prudența față de cei mari și greoi nu e slăbiciune; e semnul că ai înțeles despre ce e vorba pe mare.",
      },
      {
        title: "Față în față: amândoi la tribord",
        art: "day12-s2",
        bullets: [
          "Două ambarcațiuni cu motor din sensuri opuse: FIECARE virează la tribord",
          "Se trec babord la babord, ca mașinile pe un drum cu circulație pe dreapta",
          "Noaptea o recunoști: vezi roșu ȘI verde simultan + alb de catarg",
        ],
        narration: "Primul caz concret e cel mai simplu și cel mai des greșit de începători: întâlnirea față în față, două ambarcațiuni cu motor venind una spre cealaltă pe drumuri opuse. Regula e simetrică, fără excepții și fără negocieri: fiecare schimbă de drum spre tribord, spre dreapta, și navele se încrucișează lăsându-și una alteia bordul babord. Exact ca două mașini pe un drum cu circulație pe dreapta; nimic exotic. Cum recunoști situația noaptea, când din celălalt nu vezi decât becuri? Vezi ambele lui lumini laterale deodată, roșie și verde, cu lumina albă de catarg deasupra: asta înseamnă că îl privești exact în prova, deci vine spre tine. Ziua vezi prova lui și valul despicat simetric în două mustăți albe. Manevra corectă se face devreme și cu unghi generos, ca s-o vadă și el fără binoclu; iar dacă ai vreo îndoială că te-a înțeles, un sunet scurt anunță regulamentar: schimb de drum la tribord. Și acum greșeala clasică, pe care ți-o spun ca s-o recunoști în tine și s-o tai din rădăcină: virajul instinctiv la stânga, pe logică de pieton care se ferește din drum. Doar că și celălalt e pieton cu aceeași logică, vă feriți amândoi în aceeași parte, și traiectoriile se întâlnesc din nou, de data asta mai aproape și cu mai puțin timp. Pe trotuar dansul ăsta e comic; pe apă nu e. Gravează regula: față în față înseamnă amândoi la dreapta, trecere babord la babord, și fiecare pleacă la treaba lui.",
      },
      {
        title: "Drumuri care se încrucișează",
        art: "day12-s3",
        bullets: [
          "Cine vede cealaltă navă venind din TRIBORD cedează trecerea",
          "Cedezi vizibil: reduci viteza sau treci prin PUPA celuilalt — nu prin prova",
          "Nava privilegiată: menține drumul și viteza (ca manevra ta să fie calculabilă)",
        ],
        narration: "Al doilea caz: drumurile se încrucișează, intersecția fără semafor a apei. Regula colreg: ambarcațiunea care o vede pe cealaltă venind din tribordul ei, din dreapta, e cea care cedează trecerea. Ține minte cu roșul: dacă noaptea vezi lumina roșie a celuilalt traversându-ți drumul, roșul îți spune ție stop, cedezi tu; ziua, pur și simplu cine vine din dreapta are prioritate, ca în intersecțiile de acasă. Obligațiile sunt împărțite cu înțelepciune între cele două nave, și amândouă jumătățile pică la examen. Tu, cel care cedezi, acționezi din timp și vizibil: reduci viteza sau schimbi de drum astfel încât să treci prin pupa celuilalt, pe la spatele lui. Prin pupa, subliniez, nu prin prova: tăiatul prin fața celuilalt, pe ideea că mai am timp, e mama coliziunilor de agrement, pentru că distanțele pe apă se apreciază prost și bărcile nu frânează. Celălalt, nava privilegiată, nu e liberă să facă ce vrea: obligația ei, des uitată în grile, e să își mențină drumul și viteza constante. De ce? Ca manevra ta de evitare să aibă un punct fix de calcul; dacă privilegiatul o ia și el la zigzag, nimeni nu mai poate evita pe nimeni. Iar dacă privilegiatul vede că tu dormi la comandă și coliziunea devine iminentă, atunci e obligat să manevreze el însuși: prioritatea nu e un drept de a închide ochii. Pe apă, prioritatea e doar o împărțire de roluri ca totul să fie predictibil. Predictibil, adică plictisitor. Adică perfect.",
      },
      {
        title: "Depășirea și ierarhia priorităților",
        art: "day12-s4",
        bullets: [
          "Cine depășește cedează ÎNTOTDEAUNA — până a trecut complet și liber",
          "Motorul cedează velelor, pescuitului cu unelte, navelor greu manevrabile",
          "În șenal îngust: navele mari au prioritate practică — nu le stânjeni",
        ],
        narration: "Ultimele două piese și ai codul rutier al apei complet. Depășirea, întâi: oricine ajunge din urmă o altă ambarcațiune și vrea să treacă de ea e obligat să se țină departe de drumul ei pe toată durata manevrei, până a trecut complet și liber. Nu contează cine e mai mare, mai rapid, cu motor sau cu vele: cel care depășește cedează, punct, fără procese. Depășești pe unde e spațiu sigur, cu marjă largă și cu un ochi la valul tău de etravă, care se duce să legene barca depășită; am vorbit despre politețea pupei. Apoi ierarhia priorităților între categorii, pentru când drumurile se întâlnesc: ambarcațiunea cu motor cedează navelor cu vele, celor angajate în pescuit cu unelte care le țintuiesc manevra, și navelor cu capacitate de manevră redusă sau nestăpâne pe manevră. Logica nu e aristocrație navală, e fizică pură: cedează cel care poate manevra cel mai ușor, iar barca ta de agrement cu motor e aproape întotdeauna cea mai sprintenă ființă de pe apă. Cu agilitatea vine responsabilitatea; așa e și în viață, nu doar pe lac. Excepția pragmatică de ținut minte: în șenalele înguste, navele mari care fizic nu pot ieși din șenal au prioritate practică, iar ambarcațiunile mici nu au voie să le stânjenească trecerea; regula ta de drept se topește în fața pescajului lor de fapt. Recapitularea întregului cod, într-o singură suflare de reținut pe viață: față în față, amândoi la dreapta; la încrucișare, cedezi celui din dreapta; la depășire, cedezi mereu; iar motorul cedează velelor. Patru propoziții. Cine le știe pe de rost nu se mai întâlnește urât cu nimeni pe apă.",
      },
    ],
  },
  {
    id: "day10", day: 10, module: 4,
    title: "Lumini, sunete, meteo și voiajul",
    summary: "Luminile de navigație, semnalele sonore, vremea, compasul și planificarea.",
    slides: [
      {
        title: "Luminile de navigație",
        art: "day13-s1",
        bullets: [
          "Roșu babord + verde tribord (câte 112,5°), alb pupa (135°), alb catarg",
          "Se aprind de la apus la răsărit și pe vizibilitate redusă",
          "La ancoră noaptea: lumină albă circulară de ancoră",
        ],
        narration: "Ultima zi de curs, și o începem pe întuneric, pentru că noaptea navele vorbesc prin lumini, iar tu pleci de aici știind să le citești. Fiecare navă cu motor în marș poartă același costum luminos, standardizat pe toată planeta: lumina roșie la babord și verde la tribord, fiecare acoperind un sector de o sută doisprezece grade și jumătate spre înainte; lumina albă de pupă, care acoperă cele o sută treizeci și cinci de grade dinspre înapoi; și una sau două lumini albe de catarg, sus, vizibile din față. Adună sectoarele și obții exact cercul complet, trei sute șaizeci de grade, și asta nu e un accident de proiectare, e geniul sistemului: din orice punct ai privi o navă, combinația de lumini pe care o vezi e unică și îți spune fără cuvinte cum e orientată și încotro merge. Luminile se aprind de la apus la răsărit și oricând vizibilitatea scade, pe ceață, pe ploaie deasă. Iar înainte de orice ieșire care s-ar putea lungi spre seară, verifică-ți becurile: o lumină arsă te face invizibil dintr-o direcție întreagă, și celelalte nave manevrează după ce văd la tine, sau după ce nu văd. Un detaliu care se uită și se punctează la examen: noaptea, la ancoră în afara porturilor, nu stai pe întuneric ca huhurezul; arborezi lumina albă circulară de ancoră, vizibilă de jur împrejur, care spune tuturor: aici stă cineva pe loc, ocoliți-l. În scena următoare învățăm să traducem luminile celorlalți, tabloul cu tablou.",
      },
      {
        title: "Ce spun luminile celuilalt",
        art: "day13-s2",
        bullets: [
          "Roșu + verde + alb = vine spre tine → amândoi la tribord",
          "Doar verde = îi vezi tribordul; doar roșu = STOP, cedezi tu",
          "Doar alb, jos = pupa cuiva (ești în depășire) sau navă la ancoră",
        ],
        narration: "Acum traducerea simultană: patru tablouri luminoase pe care trebuie să le citești fără dicționar, pentru că noaptea pe apă nu e timp de silabisit. Tabloul unu: vezi roșu și verde deodată, cu alb de catarg deasupra. Ambele lumini laterale vizibile înseamnă că privești nava fix în prova: vine spre tine. E întâlnirea față în față de ieri, și știi rețeta: amândoi la tribord, trecere babord la babord. Tabloul doi: vezi doar verde. Sectorul verde acoperă tribordul celeilalte nave, deci îi privești latura dreaptă; drumurile voastre probabil se încrucișează, iar din geometria asta tu ești, de regulă, cel privilegiat. Verifică, dar verde înseamnă, de obicei, poți menține. Tabloul trei: vezi doar roșu. Îi privești babordul, adică ea îți vine din tribordul tău, și roșul funcționează exact ca la semafor: stop, cedezi tu, treci prin pupa ei. De aici zicala veche a navigatorilor, pe care ți-o las moștenire: verde, drum liber; roșu, oprește-te și gândește. Tabloul patru, discret și frecvent: o singură lumină albă, joasă. Două traduceri posibile, și ambele cer respect: ori e pupa unei nave pe care o ajungi din urmă, și atunci ești în depășire cu toate obligațiile ei, cedezi până ai trecut complet; ori e o navă la ancoră, cu lumina ei circulară. Diferența o face mișcarea relativă: pupa se mișcă odată cu tine, ancoratul stă. Exersează cele patru tablouri cu cartonașe, cu aplicații, cu ce vrei, până devin reflex de o secundă. La examen apar garantat, iar pe apă noaptea, reflexul ăsta e diferența dintre o veghe liniștită și o poveste urâtă.",
      },
      {
        title: "Semnalele sonore",
        art: "day13-s3",
        bullets: [
          "1 scurt = virez la tribord · 2 scurte = virez la babord · 3 scurte = mașina pe înapoi",
          "5+ scurte = «nu îți înțeleg intențiile / atenție!»",
          "1 lung = ies dintr-un cot/bazin; pe ceață: 1 lung la max. 2 min (în marș)",
        ],
        narration: "Când navele se văd, manevrele se anunță cu sunete scurte, un cod morse minimal emis din fluier sau sirenă; un mijloc de semnalizare sonoră e de altfel obligatoriu la bord, și acum vezi de ce. Un sunet scurt, cam o secundă: îmi schimb drumul spre tribord, spre dreapta. Două sunete scurte: spre babord, spre stânga. Trei sunete scurte, le știi deja din ziua manevrelor: mașina mea lucrează pe înapoi, frânez sau dau înapoi. Memorarea e aritmetică simplă: dreapta e prima opțiune, un semnal; stânga a doua, două semnale; iar cele trei bipuri de marșarier sună exact ca marșarierul camioanelor, bip-bip-bip, doar că pe apă l-au inventat cu vreo sută de ani mai devreme. Aceste semnale nu cer voie și nu pun întrebări: anunță o manevră pe care o execuți, ca semnalizatorul la mașină, și se emit la momentul manevrei, nu cu cinci minute înainte, ca să nu deruteze. Apoi semnalul de îndoială, pe care îl vei auzi în porturi aglomerate: cinci sau mai multe sunete scurte și rapide înseamnă nu îți înțeleg intențiile sau, pe românește, hei, trezește-te, manevra ta mă bagă în belea. Îl emiți când manevra altuia te amenință și nu pricepi ce vrea. Un sunet lung, de patru până la șase secunde, anunță prezența: îl dai când ieși dintr-un bazin portuar sau te apropii de un cot fără vizibilitate; cine vine din partea opusă răspunde la fel, și v-ați aflat unul pe altul înainte să vă vedeți. Iar pe ceață, regulile devin de fier: viteză redusă drastic, veghe dublată, urechea la pândă, și semnale periodice: nava cu motor în marș, un sunet lung la cel mult două minute; oprită din marș, două lungi. Radarul ajută, dar pe barca mică urechea rămâne senzorul șef. Și sinceritatea de la capătul lecției: dacă prognoza anunță ceață serioasă, cea mai bună manevră a unei ambarcațiuni de agrement e să rămână legată la ponton, cu skipperul la cafea. Curajul pe ceață se numește altfel.",
      },
      {
        title: "Meteorologia navigatorului",
        art: "day14-s1",
        bullets: [
          "Barometru în scădere rapidă = vreme rea în drum spre tine",
          "Cumulonimbus cu nicovală = furtună, rafale, vânt rotitor",
          "Buletine meteo marine înainte ȘI în timpul ieșirii; amânarea nu se rușinează",
        ],
        narration: "Penultima lecție e despre singurul membru al echipajului pe care nu-l poți instrui: vremea. Poți doar s-o asculți, și îți dau instrumentele de tras cu urechea. Barometrul măsoară presiunea atmosferică, iar secretul lui e că valoarea contează mai puțin decât tendința: o scădere rapidă, câțiva milibari în câteva ore, anunță aproape fără greș vânt și ploaie; acul care cade e degetul vremii arătând spre port. Pe cer, personajul de urmărit e cumulonimbusul, turnul acela alb-vinețiu cu vârf lățit ca o nicovală de fierar: sub el se nasc furtunile, rafalele violente și schimbările bruște de direcție. O linie întunecată care avansează pe apă e chiar rafala, vizibilă cu ochiul liber; când o vezi, ai un minut, nu zece. Un efect local de ținut minte pe fluvii și în strâmtori: vântul care bate împotriva curentului ridică valuri scurte și abrupte, mult mai rele decât ar sugera cifra vitezei vântului; Dunărea supărată pe vânt e o altă Dunăre. Sursa ta de bază rămân buletinele meteo marine și aplicațiile dedicate navigației, nu emisiunea de la televizor cu soare peste litoral: le citești obligatoriu înainte de plecare, iar în ieșirile lungi le verifici și pe parcurs, plus avizele de pe NAVTEX, mai știi, telegramele de la mare. Și decizia cea grea, pe care ți-o spun ca unul care a luat-o de multe ori: amânarea plecării. Ia-o fără orgoliu. Avertizările pentru ambarcațiuni mici sunt scrise fix pentru barca ta, nu pentru vecinii cu iaht de patruzeci de metri. Pe apă nu există nicio întâlnire, nicio rezervare la restaurant și niciun apus de fotografiat care să merite o furtună. Marea e acolo și mâine; grija ta e să fii și tu.",
      },
      {
        title: "Compasul: instrumentul rece",
        art: "v4-compas",
        bullets: [
          "Linie de credință, pivot, lichid amortizor — zero electricitate",
          "Electronica minte uneori: chartplotter care te «mută în Peru», viteze de 100 Nd",
          "Compas funcțional = cerință legală la inspecție; învață să-l folosești ÎNAINTE să ai nevoie",
        ],
        narration: "Ți-am promis în ziua documentelor povestea compasului, și a venit vremea s-o auzi. Compasul magnetic e un instrument aproape jenant de simplu: o roză care plutește în lichid amortizor, un pivot, și o linie de credință, semnul fix pe care citești capul compas. Fără baterii, fără abonament, fără actualizări de soft. Eu îi spun instrumentul rece: nu-i pasă dacă barca are curent, dacă satelitul are chef sau dacă softul are o zi proastă. Arată nordul, cu încăpățânarea aia liniștită a lucrurilor simple. De ce insistă legea să-l ai funcțional la bord, când puntea ți-e plină de ecrane? Pentru că ecranele au toane, și îți spun o întâmplare trăită, nu citită. Veneam odată din Grecia, mare frumoasă, nimic special, când chartploterul, lochul și ceasul au luat-o razna de două ori în aceeași oră: poziția noastră sărise vesel în Peru, iar viteza afișată depășea o sută de noduri. O sută de noduri, pe un velier. Am navigat mai departe pe compas și pe hartă, ca bunicii, și am ajuns exact unde trebuia. De-atunci le spun tuturor cursanților mei fraza pe care ți-o las și ție: v-am învățat compasul ca, atunci când nu mai avem curent pe barcă sau instrumentele ne mint, să nu ne pierdem și să dăm cu barca în gard doar pentru că n-am știut să folosim un instrument de două sute de ani. Electronica e minunată, s-o folosim; dar navigatorul care depinde de ea în proporție de sută la sută e la un fuzibil distanță de a fi pasager. Compasul, harta de hârtie și mintea limpede sunt planul B care nu se descarcă niciodată.",
      },
      {
        title: "Planificarea voiajului",
        art: "day14-s2",
        bullets: [
          "Rută pe waypointuri la vedere de repere; timp = distanță / viteză (cu marjă)",
          "Combustibil: regula treimilor; adăposturi = planul B marcat pe hartă",
          "NAVTEX + meteo + persoana de contact: pregătirea completă ~2 ore",
        ],
        narration: "Planificarea voiajului e locul unde tot cursul se leagă într-o singură foaie de hârtie. Pe hartă, reală sau în aplicație, trasezi ruta prin puncte de drum, waypointuri, alese cu un criteriu de om practic: la vedere de repere ușor de recunoscut, un far, o geamandură mare, un promontoriu; naveghezi din reper în reper, nu din speranță în speranță. Măsori distanțele în mile marine, le împarți la viteza de croazieră în noduri, și obții timpul de marș; îl compari cu orele de lumină rămase, cu marjă serioasă, pentru că pe apă totul durează mai mult decât în plan, e o lege a naturii. Din timp și consum iese combustibilul, cu regula treimilor pe care o știi ca pe propriul nume: o treime dus, o treime întors, o treime rezervă neatinsă. Apoi cauți pe hartă adăposturile: porturi, golfuri, pontoane intermediare unde te poți trage dacă vremea sau tehnica te trădează; ele sunt planul B, și un plan B marcat pe hartă înainte de plecare valorează de zece ori mai mult decât unul inventat pe valuri. Notezi particularitățile rutei: ape mici, curenți, trafic comercial, zonele interzise din avizele NAVTEX. La final, planul se spune cu voce tare unei persoane de pe mal, cu ora estimată de întoarcere și cu înțelegerea clară că, dacă nu dai semn, ea sună autoritățile și le spune unde să caute. Adună tot: meteo citită, avize verificate, barca controlată pe lista de ieri, planul comunicat, și ai exact cele două ore de pregătire de care vorbeam. Vorba veche a breslei, pe care o semnez și eu: voiajul bun se câștigă la masa din bucătărie, cu harta întinsă și cu creionul în mână. Pe apă doar îl încasezi.",
      },
      {
        title: "Conducător responsabil: alcool, valuri, mediu",
        art: "day14-s3",
        bullets: [
          "Alcool la comandă: interzis — soarele și legănarea amplifică orice pahar",
          "Zone de înot, scafandri semnalizați, faună: distanță și viteză mică",
          "Nimic peste bord: deșeuri, combustibil, ape uzate — totul la mal",
        ],
        narration: "Înainte de rămas-bun, o lecție despre statutul pe care ți-l dă brevetul: acela de om responsabil pe apă. Prima temă: alcoolul la comandă. E interzis, exact ca la volan, și tratat de lege ca atare, dar vreau să înțelegi și fizica, nu doar paragraful: soarele, deshidratarea și legănarea continuă amplifică efectul oricărui pahar; berea care pe terasă te face vesel, pe punte îți fură echilibrul și judecata exact când barca ți le cere pe amândouă. Skipperul bea apă; poveștile bune se spun seara, la ponton, cu parâmele legate. A doua temă: ceilalți. Perimetrele de înot marcate cu geamanduri galbene sunt sanctuare: motorul tău n-are ce căuta acolo nici tăiat. Scafandrii se semnalizează cu baliză cu steag: distanță mare, viteză mică. Caiacele, hidrobicicletele, pescarii de pe mal: toți au același drept la apă ca tine, doar că tu ai motor și val de etravă, deci tu porți responsabilitatea; am spus-o și o repet, pentru că e adevărul cel mai des uitat pe lacurile noastre vara. Fauna: păsările, peștii, broaștele țestoase n-au unde depune plângere, dar elicea și valurile repetate le strică singurul habitat pe care îl au. A treia temă, simplă și nenegociabilă: nimic peste bord. Nici gunoi, nici combustibil, nici ape uzate; totul se aduce la mal, la instalațiile de colectare. O pată de ulei de un litru se întinde pe o suprafață de apă cât un teren de fotbal. Apa curată pe care navighezi azi e moștenirea pe care o lași celor care învață să navigheze mâine, poate chiar copiilor tăi. Iar la examen, întrebările de legislație și mediu punctează exact aceste obligații: le știi de-acum nu pentru grilă, ci pentru că așa se poartă un căpitan.",
      },
      {
        title: "Rămas-bun și drumul spre examen",
        art: "day14-s4",
        bullets: [
          "Ai parcurs: ambarcațiunea, motorul, marinăria, manevrele, siguranța, comunicațiile, navigația",
          "Antrenamentul: teste de 20 de întrebări din banca oficială + simularea de examen",
          "Vânt bun din pupa, căpitane!",
        ],
        narration: "Ei bine, camarade, am ajuns la capătul celor zece zile, și dă-mi voie să mă uit o clipă în urmă ca un căpitan la siajul lui. Știi barca: prova, pupa, babord, tribord, etrava și etamboul, carena și bordul liber. Știi mașina: telltale-ul care pulsează, manșa care nu se trântește, elicea de care te apropii doar cu cheia în buzunar. Știi marinăria: fir, sfilață, șuviță, lanțană, cordon, garlin, gașa cu iepurele și copacul, springul care face scamatorii la ponton, ancora care ține împreună cu lanțul ei. Știi să nu sari după omul căzut și să arunci colacul cu saula lui de treizeci de metri; știi meidei pe șaisprezece, Teddy de Paul, over fără out; citești geamandurile ca pe indicatoare, luminile ca pe propoziții, și porți în buzunar cele patru reguli: față în față la dreapta, cedezi celui din dreapta, cedezi când depășești, motorul cedează velelor. Nu e puțin. E o meserie mică, și e a ta. De aici încolo, drumul spre examen trece prin secțiunea de antrenament: teste de câte douăzeci de întrebări, trase la sorți din banca oficială de pregătire, apoi simularea de examen, cu ceas și cu emoții, ca la cel adevărat. Fă teste până când nota nu te mai surprinde nici pe tine; greșelile de acolo sunt cele mai ieftine greșeli pe care le vei face vreodată pe apă, folosește-le. Și după ce iei brevetul, primul sezon navighează cu smerenie: vreme bună, ape cunoscute, marje mari. Experiența nu se ia la examen; se adună milă cu milă. Îți mulțumesc că am făcut împreună drumul ăsta de zece zile. A fost onoarea mea de instructor și, dă-mi voie să cred, începutul unei prietenii lungi între tine și apă. Vânt bun din pupa, mare liniștită, și ne vedem în larg, căpitane!",
      },
    ],
  },
];

/* ============ CONFIGURĂRI ANTRENAMENT ȘI EXAMEN ============ */
/* Teste de antrenament: 20 de întrebări aleatoare din banca oficială ANR. */
const PRACTICE_CONFIG = { count: 20, pass: 0.75 };
/* Simularea de examen: 24 de întrebări, echilibrate pe categorii, contra cronometru. */
const EXAM_CONFIG = { count: 24, pass: 0.75, minutes: 30 };

// Expune datele către restul aplicației
window.COURSE = { MODULES, LESSONS, PRACTICE_CONFIG, EXAM_CONFIG };
