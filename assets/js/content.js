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
        narration: "Bine ai venit la cursul de pregătire pentru permisul de conducător de ambarcațiune cu motor pentru agrement. Eu sunt căpitanul Paul Dicu și te voi însoți pe tot parcursul acestor paisprezece zile. Cursul este împărțit în patru module. În primul modul vei cunoaște ambarcațiunea și motorul ei. În al doilea vei învăța manevrele și ancorarea. Al treilea modul este dedicat siguranței și primului ajutor, iar al patrulea navigației și regulilor de drum. Fiecare zi are o lecție video urmată de o verificare de cunoștințe, care include și întrebări din setul oficial de antrenament pentru examen. Dacă nu treci verificarea, revezi lecția și încerci din nou. La final te așteaptă o simulare completă de examen. Sfatul meu: parcurge o singură lecție pe zi, notează-ți termenii noi și lasă-i să se așeze. Să începem călătoria.",
      },
      {
        title: "Tipuri de ambarcațiuni de agrement",
        bullets: [
          "Bărci cu motor: cabinate, open, semi-rigide (RIB)",
          "Ambarcațiuni cu vele, jet-ski, bărci pneumatice",
          "Clasificarea după lungime și zona de navigație autorizată",
        ],
        narration: "Să vedem cu ce fel de ambarcațiuni ne putem întâlni pe apă. Ambarcațiunea cabinată are un spațiu închis care oferă adăpost de vreme și permite ieșiri mai lungi, chiar cu înnoptare. Barca deschisă, numită și open, este cea mai răspândită pentru plimbări și pescuit de o zi, ușoară și simplu de întreținut. Ambarcațiunea semi-rigidă, cunoscută drept rib, combină o carenă rigidă cu tuburi gonflabile pe margini. Este foarte stabilă și iartă greșelile, motiv pentru care o folosesc și echipele de salvare. Velierul folosește în primul rând forța vântului, dar are de obicei și motor auxiliar. Motocicleta acvatică, jet-ski-ul, este agilă și rapidă, dar cere atenție sporită. Fiecare ambarcațiune are o categorie de proiectare, care spune în ce condiții de vânt și valuri poate naviga în siguranță. Verifică întotdeauna categoria înainte să ieși pe o apă mai agitată.",
      },
      {
        title: "Terminologia de bază — orientarea la bord",
        bullets: [
          "Prova (prora) = partea din față; Pupa = partea din spate",
          "Tribord = dreapta (lumină verde); Babord = stânga (lumină roșie)",
          "Chila = axul longitudinal de jos; Copastia = marginea de sus a bordului",
        ],
        narration: "Pe apă nu vorbim de stânga și dreapta ca pe uscat, pentru că ele s-ar schimba după cum te întorci. Folosim termeni ficși, raportați la ambarcațiune. Prova este partea din față, cea care taie apa. Pupa este partea din spate, unde stă de obicei motorul. Acum, privind spre provă, partea dreaptă se numește tribord, iar partea stângă babord. Ca să le ții minte, iată un truc: babord și stânga sunt amândouă cuvinte mai scurte decât tribord și dreapta. Noaptea, aceste borduri sunt marcate prin lumini: verde la tribord și roșu la babord. Nu este doar o convenție decorativă. Când vezi luminile altei nave, culorile îți spun imediat în ce direcție se deplasează și cine trebuie să cedeze trecerea. Vom folosi acești patru termeni pe tot parcursul cursului, iar la examen apar aproape în fiecare subiect, deci repetă-i până devin reflex.",
      },
      {
        title: "Structura corpului ambarcațiunii",
        bullets: [
          "Corpul (carena) — deplasament, planare sau semi-planare",
          "Puntea, cabina, cocpitul, santina (fundul interior)",
          "Bordul liber = înălțimea de la linia de plutire la punte",
          "Etrava = muchia provei · Etamboul = piesa structurală a pupei",
        ],
        narration: "Să privim acum corpul ambarcațiunii din lateral. Partea care stă în apă se numește carenă. Forma ei decide comportamentul: o carenă de deplasament împinge apa și merge lent dar economic, în timp ce o carenă planantă se ridică deasupra apei la viteză, cum fac majoritatea bărcilor sportive cu motor. Linia până la care ambarcațiunea se scufundă în apă se numește linia de plutire. Deasupra ei, până la marginea punții, se măsoară bordul liber, distanța pe care o vezi marcată cu roșu în imagine. Un bord liber generos ține valurile afară; dacă încarci barca prea mult, bordul liber scade și apa poate intra la primul val mai serios. Puntea acoperă corpul, cocpitul este zona deschisă unde stau oamenii, iar santina este spațiul cel mai de jos din interior, unde se adună inevitabil apa. Vom vorbi despre santină și pompa ei într-o lecție viitoare, pentru că verificarea ei face parte din rutina oricărui conducător atent. Mai reține două denumiri cerute la examen: muchia din provă care taie apa se numește etravă, iar piesa structurală din capătul pupei se numește etambou. Așa apar în grile: nu partea din față, ci etrava; nu coada bărcii, ci etamboul.",
      },
      {
        title: "Stabilitatea și flotabilitatea",
        bullets: [
          "Flotabilitatea = capacitatea de a pluti; centrul de greutate jos = stabilitate mai bună",
          "Distribuția uniformă a greutății și a pasagerilor",
          "Respectă capacitatea maximă (persoane și kg) de pe plăcuța constructorului",
        ],
        narration: "Stabilitatea este capacitatea ambarcațiunii de a reveni în poziție dreaptă după ce un val sau o mișcare o înclină. Secretul stă în centrul de greutate. Uită-te la cele două desene: în stânga, greutatea este jos și distribuită uniform, iar barca revine singură la poziția inițială. În dreapta, greutatea este sus, oamenii stau în picioare sau bagajele sunt îngrămădite într-un singur bord, iar aceeași înclinare devine periculoasă. De aceea pasagerii stau așezați, iar greutățile se împart egal între borduri. Atenție și la apa liberă din santină: câțiva centimetri de apă care se mută dintr-un bord în altul pot amplifica orice înclinare. Fiecare ambarcațiune are o plăcuță a constructorului, pe care scrie numărul maxim de persoane și greutatea maximă admisă. Cifrele acelea nu sunt orientative, sunt o limită de siguranță calculată de proiectant. La examen se întreabă des unde găsești aceste informații: răspunsul este întotdeauna plăcuța constructorului.",
      },
    ],
    quiz: [
      { q: "Care este partea din față a ambarcațiunii?", options: ["Pupa", "Prova", "Tribord", "Chila"], answer: 1, explain: "Prova (prora) este partea din față; pupa este partea din spate." },
      { q: "Ce culoare are lumina de navigație de la tribord?", options: ["Roșu", "Alb", "Verde", "Galben"], answer: 2, explain: "Tribordul (dreapta) are lumină verde, babordul (stânga) are lumină roșie." },
      { q: "Ce este bordul liber?", options: ["Marginea de sus a bordului", "Înălțimea de la linia de plutire la punte", "Fundul interior al bărcii", "Axul longitudinal de jos"], answer: 1, explain: "Bordul liber = distanța verticală de la linia de plutire până la punte." },
      { q: "Unde găsești capacitatea maximă de persoane admise?", options: ["Pe plăcuța constructorului", "În jurnalul de bord", "Pe vestă", "Nu este specificată"], answer: 0, explain: "Plăcuța constructorului indică numărul maxim de persoane și greutatea maximă." },
      { q: "Cum se numește muchia din provă care taie apa?", options: ["Etambou", "Etravă", "Chilă", "Copastie"], answer: 1, explain: "Etrava e muchia din provă; etamboul este piesa structurală de la pupă." },
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
        narration: "Astăzi intrăm în sala motoarelor. Există trei mari moduri de a monta un motor pe o ambarcațiune. Motorul exterior, numit autbord, se prinde pe oglinda pupei, adică pe peretele din spate al bărcii. Întregul motor se rotește când virezi, deci direcționezi direct jetul de împingere. Este ușor de ridicat din apă, ușor de dus la service și rămâne cea mai populară alegere pentru ambarcațiunile de agrement. Motorul interior, inbord, stă în corpul bărcii, de obicei la mijloc, și transmite mișcarea printr-un arbore către o elice fixă; direcția o dă o cârmă separată. Îl întâlnești la bărci mai mari și la șalupe clasice. Sterndraivul este soluția hibridă: motorul stă înăuntru, lângă pupă, iar în afara bordajului se află o coloană orientabilă care combină rolul elicei și al cârmei. Indiferent de așezare, principiul rămâne același: motorul rotește o elice, iar elicea împinge apa înapoi ca să mişte barca înainte.",
      },
      {
        title: "Motoare în doi timpi și în patru timpi",
        bullets: [
          "2 timpi: mai ușor, amestec ulei-benzină, mai poluant",
          "4 timpi: mai silențios, mai economic, ulei separat",
          "Motoare electrice — tot mai frecvente, silențioase, ecologice",
        ],
        narration: "Să comparăm acum tipurile de motoare după modul de funcționare. Motorul în doi timpi este simplu și ușor, dar are o particularitate: uleiul se amestecă cu benzina, fie manual în rezervor, fie automat. Dacă uiți de ulei, motorul se gripează; dacă pui prea mult, scoate fum și ancrasează bujiile. Fiind mai zgomotos și mai poluant, este tot mai rar la motoarele noi. Motorul în patru timpi funcționează ca cel de automobil: are baie de ulei separată, consumă mai puțin, merge mai silențios și mai curat. Este alegerea standard modernă, cu mențiunea că cere schimburi de ulei la intervalele prescrise. Motorul electric câștigă teren rapid: pornește instantaneu, nu face zgomot și nu poluează apa, fiind uneori singura variantă permisă pe lacurile protejate. Limita lui rămâne autonomia bateriei, deci planifici traseul după energia disponibilă. La examen reține diferența esențială: doi timpi înseamnă ulei amestecat cu benzină, patru timpi înseamnă ungere separată.",
      },
      {
        title: "Sistemul de propulsie și elicea",
        bullets: [
          "Elicea transformă rotația în forță de împingere",
          "Pasul și diametrul elicei influențează viteza și tracțiunea",
          "Atenție la obiecte în apă: parâme, plase, sfori — pot bloca elicea",
        ],
        narration: "Elicea este piesa care transformă rotația motorului în mișcare prin apă. Palele ei sunt înclinate, iar când se rotesc împing apa spre înapoi; reacția împinge barca înainte. Două mărimi o definesc: diametrul, adică lățimea cercului descris de pale, și pasul, adică distanța teoretică parcursă la o rotație completă. O elice cu pas mare dă viteză maximă, dar accelerează leneș, ca o treaptă de viteză lungă la mașină. O elice cu pas mic trage puternic de pe loc, dar își atinge repede plafonul. De aceea elicea se alege după cum folosești barca: agrement lejer, schi nautic sau încărcături mari. Acum, un pericol foarte concret: parâmele, sforile și plasele plutitoare. Elicea le înfășoară într-o secundă și se blochează. Dacă se întâmplă, oprește complet motorul înainte să te apropii de elice, altfel risipa devine tragedie. Scoate cheia din contact, apoi curăță palele. Verifică elicea periodic și de lovituri sau îndoituri, pentru că o elice deformată vibrează și obosește întregul motor.",
      },
      {
        title: "Verificarea nivelurilor și a răcirii",
        bullets: [
          "Verifică uleiul, combustibilul și lichidul de răcire",
          "Sistemul de răcire cu apă: verifică jetul de control (telltale)",
          "Supraîncălzirea = oprește motorul imediat și verifică prizele de apă",
        ],
        narration: "Motorul produce multă căldură, iar pe apă răcirea se face cel mai adesea chiar cu apa în care navighezi. O pompă cu rotor de cauciuc aspiră apă prin prizele de sub linia de plutire, o plimbă prin cămășile motorului și o evacuează. La motoarele exterioare vei vedea evacuarea sub forma unui firicel de apă care țâșnește dintr-o parte a motorului. Acest jet de control, numit în engleză telltale, este cel mai bun prieten al tău: dacă el curge, răcirea funcționează. Fă-ți un obicei din a-l verifica la fiecare pornire, în primele secunde. Dacă jetul lipsește sau motorul dă alarmă de temperatură, oprește imediat. Cauzele frecvente sunt banale: o pungă de plastic aspirată pe priza de apă, nisip după o trecere prin apă mică sau rotorul pompei uzat. Continuarea funcționării cu răcirea căzută distruge motorul în câteva minute. Deci regula pentru examen și pentru viață: supraîncălzire înseamnă oprire imediată și verificarea prizelor de apă.",
      },
      {
        title: "Întreținerea de bază",
        bullets: [
          "Curăță și spală motorul după apă sărată",
          "Verifică bujiile, filtrul de combustibil, anodul de zinc",
          "Respectă intervalele de service recomandate de producător",
        ],
        narration: "Un motor îngrijit pornește când ai nevoie de el, iar pe apă asta înseamnă siguranță, nu doar confort. Rutina de întreținere nu este complicată. După fiecare ieșire în apă sărată, clătește circuitul de răcire cu apă dulce, altfel sarea depune cruste și corodează. Verifică periodic bujiile: o bujie ancrasată spune ceva despre amestec sau despre uleiul folosit. Filtrul de combustibil reține apa și impuritățile din rezervor; îl schimbi la intervalele recomandate sau imediat ce observi apă în paharul lui. Un element aparte este anodul de zinc, o pastilă de metal montată pe motor special ca să se sacrifice: coroziunea galvanică atacă zincul în locul pieselor scumpe din aluminiu. Când anodul s-a consumat cam pe jumătate, îl înlocuiești. Respectă orele de service din manualul motorului, la fel cum respecți reviziile la mașină. Toate acestea par mărunte, dar statistica defecțiunilor pe apă arată că majoritatea remorcărilor pleacă de la întreținere neglijată sau combustibil murdar.",
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
        narration: "Sistemul de combustibil merită o lecție întreagă, pentru că aici se ascunde cel mai serios risc de incendiu și explozie la bord. Traseul este simplu: rezervorul păstrează benzina, un robinet permite închiderea circuitului, filtrul reține impuritățile și apa, pompa împinge combustibilul, iar motorul îl arde. Verifică vizual furtunurile și colierele: benzina nu are voie să picure nicăieri, iar mirosul de benzină în barcă este un semnal de alarmă, nu un inconvenient. Acum partea critică: vaporii de benzină sunt mai grei decât aerul. Nu se ridică și nu se risipesc singuri; curg în jos și se adună în santină, unde o singură scânteie îi poate aprinde. De aceea alimentarea se face după un ritual strict: motorul oprit, consumatorii electrici opriți, nicio flacără și nicio țigară în preajmă, iar după alimentare aerisești bine compartimentele înainse de a porni motorul. Dacă ambarcațiunea are ventilator de cală, îl lași să meargă câteva minute. Ștergi imediat orice picătură vărsată. Sunt gesturi de treizeci de secunde care previn accidentele cele mai grave de pe apă.",
      },
      {
        title: "Sistemul electric",
        bullets: [
          "Bateria alimentează pornirea, luminile, pompele, instrumentele",
          "Verifică bornele, siguranțele și nivelul de încărcare",
          "Întrerupătorul principal (kill switch) oprește motorul în urgențe",
        ],
        narration: "Instalația electrică a unei ambarcațiuni pleacă de la baterie. Ea pornește motorul și alimentează luminile de navigație, pompa de santină, stația radio și instrumentele. Îngrijirea ei este simplă: bornele curate și strânse, fixarea solidă ca să nu se plimbe la valuri și verificarea nivelului de încărcare înainte de plecare. Întrerupătorul general îți permite să tai tot curentul când lași barca nesupravegheată, iar siguranțele protejează fiecare circuit; păstrează câteva siguranțe de rezervă la bord. Piesa despre care vreau să vorbim serios este întrerupătorul de siguranță cu șnur, cunoscut ca kill switch. Este o brățară legată printr-un șnur la un buton de pe consolă. O porți la încheietură sau prinsă de vestă ori de picior. Dacă ești aruncat de la comandă, șnurul smulge capsa și motorul se oprește instantaneu. Fără el, o barcă rămasă fără conducător continuă să se rotească în cerc, cu elicea în funcțiune, spre omul căzut în apă. Poartă-l de fiecare dată, mai ales când ești singur la bord. La examen și în controale este considerat echipament esențial de siguranță.",
      },
      {
        title: "Sistemul de guvernare",
        bullets: [
          "Cârma sau motorul orientabil schimbă direcția",
          "Transmisie mecanică, hidraulică sau electrică",
          "Verifică jocul volanului și buna funcționare înainte de plecare",
        ],
        narration: "Guvernarea înseamnă tot ce se întâmplă între mâinile tale pe volan și direcția în care merge barca. La motoarele exterioare și la sterndraivuri, întregul motor sau coloana se rotește și orientează jetul de apă. La motoarele interioare clasice, o cârmă montată în pupa deviază curentul de apă creat de elice. Comanda de la volan ajunge acolo printr-o transmisie mecanică cu cablu, printr-un circuit hidraulic sau, la ambarcațiunile moderne, electric. Ce trebuie să faci tu practic: înainte de fiecare plecare, rotește volanul dintr-o extremă în alta și urmărește motorul sau cârma cum răspunde. Mișcarea trebuie să fie continuă, fără joc excesiv, fără puncte în care înțepenește, fără zgomote de frecare. Un joc mare la volan sau o direcție care merge greu anunță un cablu pe cale să cedeze sau aer în circuitul hidraulic. Pe apă, în manevră de acostare sau la viteză, o direcție care cedează te lasă complet fără control, deci acest test de zece secunde nu se sare niciodată.",
      },
      {
        title: "Santina și pompa de santină",
        bullets: [
          "Santina colectează apa infiltrată în corpul bărcii",
          "Pompa de santină o evacuează — verifică funcționarea",
          "Nivel ridicat de apă = pericol de instabilitate sau scufundare",
        ],
        narration: "Coborâm acum în punctul cel mai de jos al bărcii, santina. Aici se scurge tot: stropii de la valuri, apa de ploaie, condensul, micile infiltrații de la presetupa arborelui. O cantitate mică de apă este normală. Problema apare când apa se acumulează: îngreunează barca, iar prin efectul de suprafață liberă, apa care aleargă dintr-un bord în altul destabilizează ambarcațiunea exact când ai mai mare nevoie de stabilitate. Soluția este pompa de santină, care evacuează apa peste bord. Multe pompe au un plutitor care le pornește automat când nivelul crește; ambele funcții, manuală și automată, se verifică înainte de plecare, pentru că o pompă îți dovedește că funcționează doar când o testezi, nu când te bazezi pe ea. Obișnuiește-te să arunci un ochi în santină înainte de plecare și periodic în timpul ieșirii. Și o regulă de mediu importantă: dacă în santină a ajuns combustibil sau ulei, amestecul nu se pompează în apă; se colectează și se predă la mal, în instalațiile portuare.",
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
        narration: "Înainte de a dezlega parâmele, hai să facem ordine în acte. Primul document ești chiar tu: brevetul sau certificatul de conducător, valabil pentru categoria ambarcațiunii pe care o conduci. Al doilea este ambarcațiunea: certificatul de înmatriculare sau documentul echivalent, care atestă că barca este înregistrată legal și îi confirmă caracteristicile. Al treilea este asigurarea, acolo unde legea o cere, și oricum o idee bună pentru răspunderea față de terți. Autoritatea navală poate opri ambarcațiunea pentru control oricând, exact ca poliția rutieră pe șosea, iar lipsa documentelor înseamnă sancțiuni și, în unele cazuri, întreruperea voiajului. Un sfat practic: ține documentele într-o husă impermeabilă, într-un loc fix pe care îl știi și pe întuneric. Și verifică din timp valabilitatea lor; un brevet expirat descoperit pe apă transformă o zi frumoasă într-un proces-verbal. La examen, întrebările din legislație insistă exact pe aceste obligații: cine, ce document și când trebuie să îl aibă asupra sa.",
      },
      {
        title: "Dotările de siguranță obligatorii",
        bullets: [
          "Veste de salvare pentru fiecare persoană la bord",
          "Colac de salvare, stingător, dispozitiv de semnalizare",
          "Ancoră cu parâmă, ispol/pompă, trusă de prim ajutor, mijloc de comunicare",
        ],
        narration: "Echipamentul de siguranță este lista scurtă de obiecte care nu negociază. Vestele de salvare: câte una pentru fiecare persoană de la bord, în mărimea potrivită fiecăruia, accesibile imediat, nu îngropate sub bagaje. Colacul de salvare cu saulă, gata de aruncat spre un om în apă. Stingătorul de incendiu, verificat și neexpirat, montat la îndemână. Mijloacele de semnalizare pirotehnice, rachete și fumigene, în termen de valabilitate și ferite de umezeală. Ancora cu parâma ei, dimensionate pentru ambarcațiunea ta. Un ispol sau o pompă de mână pentru evacuarea apei, chiar dacă ai pompă electrică, pentru că electricitatea cedează prima. Trusa de prim ajutor completă. Și un mijloc de comunicare: stație radio sau măcar telefonul într-o husă etanșă. Două obiceiuri fac diferența: verifică periodic termenele de valabilitate și arată-le pasagerilor, la începutul fiecărei ieșiri, unde stau vestele și colacul. În urgență nu există timp de căutat prin cufere.",
      },
      {
        title: "Planificarea ieșirii pe apă",
        bullets: [
          "Verifică prognoza meteo și starea apei",
          "Anunță pe cineva de la mal: rută, ora estimată de întoarcere",
          "Verifică autonomia de combustibil (regula treimilor)",
        ],
        narration: "O ieșire reușită pe apă se decide în mare parte înainte de a pleca de acasă. Primul pas: prognoza meteo, din surse dedicate navigației, nu doar aplicația de vreme generală. Te interesează vântul, în special rafalele, starea valurilor, vizibilitatea și tendința pentru orele următoare. Al doilea pas: spune cuiva de pe mal unde mergi și când estimezi că te întorci. Pare exagerat pentru o plimbare de două ore, dar dacă rămâi în pană fără semnal, acel om este cel care alertează salvarea și le spune unde să caute. Al treilea pas: combustibilul, calculat după regula treimilor. O treime pentru dus, o treime pentru întors și o treime rezervă intactă. Rezerva acoperă vântul care se întețește la întoarcere, curentul potrivnic sau ocolul neprevăzut. Adaugă la calcul orele de lumină rămase și un plan de rezervă: un adăpost sau un punct de acostare intermediar în caz că vremea se strică. Navigatorii bătrâni spun că planul bun este cel care include și planul de renunțare.",
      },
      {
        title: "Lista de control pre-plecare",
        bullets: [
          "Motor, combustibil, ulei, răcire — verificate",
          "Dotări de siguranță la locul lor și funcționale",
          "Luminile, instrumentele și pompa de santină — testate",
        ],
        narration: "A sosit momentul plecării, iar aici intră în scenă lista de control. Sună birocratic, dar piloții de avion o folosesc tocmai pentru că memoria omului obosit sau grăbit sare pași. Parcurge-o metodic. Motorul: pornește, jetul de control al răcirii curge, nivelul de ulei este corect. Combustibil: suficient după regula treimilor. Direcția: volanul rotit cap la cap, răspuns ferm. Luminile de navigație și instrumentele: funcționale, chiar dacă pleci ziua, pentru că întoarcerea poate prinde întunericul. Pompa de santină: testată manual și automat, santina uscată. Echipamentul de siguranță: veste, colac, stingător, semnalizare, toate la locul lor. Meteo verificată, persoana de contact anunțată. Iar la final, un scurt instructaj pentru pasageri: unde sunt vestele, cum se stă în barcă, ce nu se atinge. Cinci minute de disciplină înainte de plecare previn nouăzeci la sută din incidentele care se termină cu remorcaj sau mai rău. Cu asta, primul modul este complet: cunoști barca, motorul, sistemele și pregătirea. De mâine, trecem la manevre.",
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
        narration: "Începem modulul de manevre cu plecarea de la ponton și primele reguli de conduită. Înainte de a atinge maneta de gaze, privește în jur: alte ambarcațiuni în mișcare, înotători, obstacole plutitoare. Molează parâmele în ordinea potrivită vântului, ține-le strânse la bord ca să nu ajungă în elice și pleacă cu mișcări blânde de manetă. În port și în apropierea malului menții viteza de siguranță, adică acea viteză care îți permite să oprești și să eviți în timp util orice apare în cale. Multe zone au limitări stricte, marcate pe geamanduri sau panouri, de exemplu cinci kilometri pe oră lângă plaje. Există și un aspect de care ești responsabil chiar fără indicator: valul de etravă pe care îl lasă barca ta. El poate legăna violent bărcile ancorate, poate răsturna un caiac sau poate pune în dificultate un înotător. Legea este simplă și apare la examen: răspunzi de efectele valului produs de ambarcațiunea ta. Deci lângă maluri, pontoane și alte ambarcațiuni: viteză mică și priviri în toate direcțiile.",
      },
      {
        title: "Guvernarea și virajele",
        bullets: [
          "Ambarcațiunea virează în jurul unui punct de pivot",
          "Pupa se deplasează lateral în viraj — atenție la spațiul din spate",
          "Curentul și vântul influențează traiectoria reală",
        ],
        narration: "Prima surpriză a oricărui începător: barca nu virează ca o mașină. Automobilul își schimbă direcția cu roțile din față; ambarcațiunea pivotează în jurul unui punct aflat cam la o treime de la provă, iar impulsul de direcție vine de la pupa. Consecința o vezi în desen: când virezi dreapta, prova se duce spre dreapta, dar pupa alunecă lateral spre stânga, măturând un arc surprinzător de larg. Lângă un ponton, această mișcare a pupei este cea care lovește: ai impresia că te-ai îndepărtat cu prova, iar spatele bărcii se apropie de obstacol. Regula practică: înainte de orice viraj strâns, verifică spațiul de lângă pupa, nu doar drumul din față. A doua consecință: nu poți vira eficient fără puțină viteză prin apă, pentru că elicea și cârma au nevoie de curent de apă ca să lucreze. Exersează în larg, departe de obstacole: viraje largi, viraje strânse, la viteze diferite, până când simți instinctiv pe unde trece pupa ta.",
      },
      {
        title: "Efectul elicei (efectul de evantai)",
        bullets: [
          "Elicea împinge pupa lateral, mai ales la marșarier",
          "Elice pe dreapta: pupa tinde spre babord la marșarier",
          "Folosește acest efect în avantajul tău la acostare",
        ],
        narration: "Astăzi îți prezint un fenomen care încurcă pe toată lumea la început și devine cel mai bun aliat după ce îl înțelegi: efectul de evantai al elicei. Pe lângă împingerea principală înainte sau înapoi, elicea generează și o forță laterală care împinge pupa într-o parte, ca o roată care se sprijină pe apă. Efectul este slab la mers înainte, dar devine pronunțat la marșarier. La o elice care se rotește spre dreapta, regula este: la mers înapoi, pupa fuge spre babord, adică spre stânga. Ce faci cu informația asta? În loc să te lupți cu ea corectând permanent din volan, o folosești: știi dinainte în ce parte se va așeza pupa când dai înapoi, deci alegi partea de acostare și unghiul de apropiere în avantajul tău. De exemplu, la acostarea cu babordul la ponton, un scurt impuls de marșarier nu doar oprește barca, ci și lipește frumos pupa de ponton. Fiecare barcă are personalitatea ei: ieși în larg, dă înapoi la ralanti și observă în ce parte trage pupa ta. Cinci minute de test valorează cât o oră de teorie.",
      },
      {
        title: "Oprirea și controlul vitezei",
        bullets: [
          "Ambarcațiunea nu are frâne — reduci gazul din timp",
          "Marșarierul (reversul) ajută la oprire, dar cu prudență",
          "Anticipează distanța de oprire, mai mare pe valuri/curent",
        ],
        narration: "Să vorbim despre oprire, pentru că pe apă nu există pedală de frână. O barcă la care tai gazul continuă să alunece, iar distanța de alunecare crește cu viteza, cu încărcătura și cu vântul sau curentul din spate. Prima tehnică este anticiparea: reduci viteza din timp, treptat, cu mult înainte de punctul unde vrei să oprești, și lași apa să frâneze barca. A doua tehnică este marșarierul, folosit corect: aduci întâi maneta la punctul mort, lași motorul să revină la ralanti o secundă, apoi cuplezi înapoi cu gaz moderat. Cuplarea brutală a marșarierului de la viteză mare solicită violent transmisia și poate arunca pasagerii din locuri. Ține cont și de efectul de evantai de care am vorbit: la marșarier pupa va trage lateral, deci corectezi din timp. Recomandarea mea: în prima ieșire, exersează opriri de urgență în larg. Măsoară din ochi câte lungimi de barcă îți trebuie de la viteza de croazieră până la oprire completă. Cifra aceea, înmulțită cu doi pentru zile cu valuri, este distanța minimă la care ai voie să te apropii de orice cu viteză.",
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
        narration: "Acostarea este manevra care desparte începătorii de conducătorii stăpâni pe barcă, și vestea bună este că are rețetă. Totul începe cu pregătirea, făcută din timp, nu în ultimii metri. Scoate baloanele de acostare, tampoanele acelea gonflabile, și leagă-le pe bordul cu care vei atinge pontonul, la înălțimea potrivită marginii lui. Pregătește parâmele: una la provă, una la pupă, conduse pe sub balustradă și cu capetele libere, gata de dat la mal. Stabilește dinainte cine ce face: cine sare pe ponton, cine dă parâma, cine stă la motor. Apoi evaluează vântul și curentul, pentru că ele decid planul de apropiere, cum vei vedea în scenele următoare. Apropierea în sine se face încet, sub un unghi de douăzeci, treizeci de grade față de ponton, cu corecții fine. Viteza ideală de acostare este cea la care o atingere de ponton ar fi doar o îmbrățișare, nu o lovitură. Și ultima regulă, poate cea mai importantă: dacă apropierea nu iese bine, nu o forța. Te retragi, faci un cerc și încerci din nou. Nimeni nu punctează eleganța primei încercări, dar toți văd pontonul lovit. Și pentru că la acostare lucrezi cu echipajul, învață cele trei comenzi clasice pentru parâme. Mola înseamnă eliberezi complet parâma. Fila înseamnă dai drumul controlat, puțin câte puțin. Vira înseamnă tragi parâma spre tine. Trei cuvinte scurte care fac manevra limpede pentru toată lumea, fără strigăte și confuzii.",
      },
      {
        title: "Acostarea cu vânt/curent dinspre ponton",
        bullets: [
          "Vântul te împinge spre ponton — apropiere paralelă, lentă",
          "Lasă natura să apropie ambarcațiunea, corectează fin",
          "Fixează întâi parâma din prova sau un spring",
        ],
        narration: "Primul scenariu de acostare: vântul sau curentul te împinge dinspre apă către ponton. Este situația cea mai iertătoare, cu o singură condiție: să lași natura să lucreze în locul motorului. Apropie-te paralel cu pontonul, la o distanță de aproximativ o lățime de barcă, și oprește complet elanul. Vântul va prelua de acolo: împinge barca lateral, uşor, până când baloanele ating pontonul pe toată lungimea. Tu doar corectezi fin din motor ca barca să rămână paralelă. Greșeala tipică aici este să te apropii sub unghi mare cu vântul în spate: barca accelerează spre ponton mai repede decât te aștepți și lovești cu prova. Odată lipit de ponton, fixează repede prima parâmă, de regulă cea de la provă sau springul, ca barca să nu mai poată fi rotită de rafale. Apoi, fără grabă, leagă restul. Reține principiul, pentru că apare și la examen: cu vânt spre ponton, apropiere paralelă și lentă, vântul face acostarea în locul tău.",
      },
      {
        title: "Acostarea cu vânt/curent dinspre mal",
        bullets: [
          "Vântul te împinge departe de ponton — unghi mai mare",
          "Apropiere mai fermă, fixează rapid prova",
          "Folosește un spring pentru a aduce pupa la ponton",
        ],
        narration: "Al doilea scenariu este mai tehnic: vântul suflă dinspre ponton și te împinge la larg. Aici o apropiere paralelă și timidă nu funcționează, pentru că vântul te îndepărtează înainte să apuci să legi ceva. Planul este altul: te apropii sub un unghi mai mare, de patruzeci, cincizeci de grade, cu prova către punctul de acostare și cu puțin mai multă hotărâre în manetă. Primul obiectiv este să aduci prova suficient de aproape încât echipierul să fixeze parâma de provă sau springul prova pe ponton. Odată prinsă acea parâmă, jocul este câștigat: cuplezi motorul încet înainte cu cârma întoarsă de la ponton, iar barca, ținută de spring, își rotește pupa lipind-o de ponton împotriva vântului. Este exact manevra desenată în ilustrație. Fără spring, ai lupta cu vântul din pură putere de motor, ceea ce se termină de obicei cu manevre bruște. Cu spring, folosești fizica în avantajul tău. Notează și varianta inversă: la plecarea cu vânt dinspre ponton, aceeași parâmă lucrată invers scoate elegant pupa sau prova în vânt.",
      },
      {
        title: "Parâmele de acostare",
        bullets: [
          "Parâma din prova și cea din pupa țin ambarcațiunea la ponton",
          "Springurile împiedică deplasarea înainte/înapoi",
          "Noduri utile: nodul de tachet, cap de berbec, ocheți",
          "Construcția parâmei: fir → sfilață → șuviță → lanțană → cordon → garlin",
        ],
        narration: "Barca a atins pontonul; acum trebuie să și rămână acolo, indiferent de vânt, valuri sau trecerea altor ambarcațiuni. Schema completă de legare folosește patru parâme, fiecare cu rolul ei. Parâma de provă și parâma de pupă țin barca aproape de ponton. Springurile, parâmele încrucișate din desen, opresc mișcarea de-a lungul pontonului: springul de provă împiedică barca să avanseze, cel de pupă o împiedică să dea înapoi. Împreună, cele patru formează o cușcă elastică în care barca poate respira pe valuri fără să se plimbe. La ape cu variații de nivel, lași parâmelor puțin joc, altfel barca rămâne atârnată când apa scade. Capetele se leagă la tacheți cu nodul de tachet, acel opt culcat încheiat cu o jumătate de ochi, care ține ferm și se desface ușor chiar și sub tensiune. Merită să înveți și nodul cap de berbec pentru stâlpi și inele. Verifică și protecția la frecare: acolo unde parâma atinge muchii, un manșon sau o bucată de furtun îi prelungește viața. O barcă bine legată doarme liniștită și noaptea în furtună. Pe cheiurile mari, parâmele se leagă și de babale, ciupercile metalice de acostare; o singură piesă se numește babă, iar pe ambarcațiunile mici rolul lor îl joacă țintele. Merită să știi și cum este construită o parâmă vegetală, pentru că ordinea se cere la examen. Totul pleacă de la fir. Firele răsucite formează sfilața. Mai multe sfilațe răsucite dau șuvița. Șuvițele răsucite alcătuiesc lanțana, parâma simplă. Mai multe lanțane răsucite formează cordonul, iar mai multe cordoane împletite dau garlinul, parâma groasă de remorcaj. Fir, sfilață, șuviță, lanțană, cordon, garlin. Ca să ții minte ordinea, spune-ți propoziția: Fiecare Seară Ștefan Leagă Câte-un Garlin — inițialele cuvintelor îți dau exact seria.",
      },
    ],
    quiz: [
      { q: "La ce folosesc baloanele (tampoanele) de acostare?", options: ["La creșterea vitezei", "La protejarea bordului împotriva frecării de ponton", "La ancorare", "La semnalizare"], answer: 1, explain: "Tampoanele protejează corpul ambarcațiunii la contactul cu pontonul." },
      { q: "Când vântul te împinge dinspre mal spre apă, cum acostezi?", options: ["Paralel și foarte încet", "Sub un unghi mai mare și fixezi rapid prova", "Nu mai acostezi", "Cu spatele mereu"], answer: 1, explain: "Vântul te îndepărtează, deci abordare mai fermă și fixarea rapidă a prova." },
      { q: "Ce rol are o parâmă 'spring'?", options: ["Ține doar prova", "Împiedică deplasarea înainte/înapoi la ponton", "Ridică ancora", "Semnalizează pericol"], answer: 1, explain: "Springurile controlează mișcarea longitudinală față de ponton." },
      { q: "Cum te aproprii ideal de ponton?", options: ["Cu viteză maximă", "Încet, sub un unghi controlat, cu parâmele pregătite", "Perpendicular și rapid", "Fără să privești vântul"], answer: 1, explain: "Apropiere lentă, unghi controlat, parâme și tampoane pregătite." },
      { q: "Care este ordinea corectă a elementelor unei parâme vegetale, de la subțire la gros?", options: ["Fir, sfilață, șuviță, lanțană, cordon, garlin", "Fir, șuviță, sfilață, cordon, lanțană, garlin", "Sfilață, fir, șuviță, garlin, cordon, lanțană", "Garlin, cordon, lanțană, șuviță, sfilață, fir"], answer: 0, explain: "Fiecare Seară Ștefan Leagă Câte-un Garlin: fir → sfilață → șuviță → lanțană → cordon → garlin." },
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
          "Instalația de ancorare: ancoră + lanț + vinci de ancoră + puțul lanțului",
        ],
        narration: "Ancorarea îți dă libertatea de a opri oriunde: într-un golf pentru o baie, la pescuit sau în așteptarea unei ecluze. Prima decizie este ancora potrivită, iar aici contează fundul apei mai mult decât orice. Ancora tip plug, în formă de brăzdar de plug, ară până se îngroapă și ține excelent în nisip și mâl. Ancora Danfort, cu două palete late articulate, are putere mare de ținere în nisip raportat la greutatea ei mică, de aceea este atât de răspândită pe ambarcațiunile de agrement. Ancora tip gheară, cunoscută și ca Bruce, se așază repede în poziție pe funduri mixte și pietroase, chiar dacă ține ceva mai puțin în nisip fin. Grapnelul, cu brațele lui multiple, agață pietre și stânci și rămâne favoritul bărcilor mici și al jet-ski-urilor, fiind pliabil. Între ancoră și parâmă se montează, ideal, câțiva metri de lanț: greutatea lui culcă ancora pe fund la unghiul corect de agățare și preia frecarea de pietre care ar tăia o parâmă textilă. Ansamblul complet, lanț plus parâmă, poartă numele de calabrot, un termen care apare des la examen. La examen se cere și componența instalației de ancorare, patru elemente: ancora, lanțul, vinciul de ancoră și puțul lanțului, compartimentul în care se depozitează lanțul. Și o subtilitate de marinar adevărat: nu ancora singură ține barca pe loc, ci ancora împreună cu greutatea lanțului culcat pe fundul apei.",
      },
      {
        title: "Alegerea locului de ancorare",
        bullets: [
          "Fund bun de agățare, adăpostit de vânt și valuri",
          "Departe de șenal navigabil, cabluri, conducte submarine",
          "Verifică adâncimea și lasă spațiu de balans (swing)",
        ],
        narration: "Unde arunci ancora contează la fel de mult ca ancora însăși. Caută un loc adăpostit de vânt și de valuri, cu un fund care ține bine: nisipul și mâlul compact sunt ideale, algele și piatra netedă sunt înșelătoare, pentru că ancora alunecă peste ele fără să se îngroape. Harta sau aplicația de navigație îți arată natura fundului și adâncimile. Evită categoric șenalul navigabil, pentru că o barcă ancorată pe culoarul navelor este un pericol public, precum și zonele marcate cu interdicții: cabluri submarine, conducte, zone de protecție. Aici greșeala poate însemna și o ancoră pierdută, agățată iremediabil, și o contravenție serioasă. Apoi gândește în cercuri: barca ancorată nu stă pe loc, ci se rotește în jurul ancorei după vânt, descriind cercul de balans pe care îl vezi în ilustrație. Raza lui este aproape cât lungimea calabrotului filat. Asigură-te că cercul tău nu se intersectează cu al vecinilor, cu malul sau cu geamandurile, inclusiv dacă vântul se rotește peste noapte. Distanța care pare exagerată la ancorare devine exact suficientă la miezul nopții.",
      },
      {
        title: "Procedura de ancorare",
        bullets: [
          "Oprește ambarcațiunea deasupra locului ales, cu prova în vânt",
          "Filează ancora controlat — nu o arunca peste tot lanțul deodată",
          "Lungimea calabrotului: de 3–5 ori adâncimea (până la 7x pe vreme rea)",
        ],
        narration: "Să executăm ancorarea pas cu pas. Te apropii de punctul ales cu prova în vânt, adică împotriva vântului, pentru că așa barca se oprește natural și rămâne controlabilă la viteză mică. Oprești complet deasupra locului dorit. Cobori ancora controlat, mână peste mână sau cu vinciul, până atinge fundul; nu o arunci grămadă cu tot lanțul după ea, pentru că lanțul căzut peste ancoră o încurcă și o împiedică să lucreze. În timp ce vântul împinge barca ușor înapoi, filezi calabrotul treptat. Și acum cifra de aur, nelipsită la examen: lungimea filată trebuie să fie de trei până la cinci ori adâncimea apei, iar pe vreme rea chiar de șapte ori. De ce atât de mult? Pentru că ancora ține doar dacă tracțiunea vine orizontal, iar un calabrot lung și lăsat face exact asta: culcă smucitura pe fund. Cu calabrot scurt, tragi ancora în sus și o smulgi. La final, fixezi calabrotul la babaua din provă, niciodată la pupa, și cuplezi scurt marșarierul la ralanti: dacă barca se oprește ferm, ancora s-a înfipt. Această probă de tracțiune încheie manevra corectă.",
      },
      {
        title: "Verificarea prinderii și ridicarea ancorei",
        bullets: [
          "Verifică repere pe mal — dacă rămân fixe, ancora ține",
          "Ancoră care 'ară' (derapă) = ridici și repoziționezi",
          "Ridicare: te apropii deasupra ancorei, apoi o desprinzi vertical",
        ],
        narration: "Ancora este jos, dar treaba nu s-a terminat: acum verifici că ține cu adevărat. Metoda clasică este alinierea reperelor, exact ca în desen: alegi două obiecte fixe pe mal, aflate aproximativ pe aceeași linie de vedere, de pildă un far și un vârf de deal, și memorezi cum se suprapun. Dacă peste câteva minute alinierea s-a schimbat vizibil, barca derapează, adică ancora ară pe fund fără să fie înfiptă. Același lucru îl vezi și pe GPS, dacă poziția migrează constant în aceeași direcție. Ancora care ară nu se repară de la distanță: o ridici complet și repeți manevra, eventual în alt loc sau cu mai mult calabrot. La ancorări lungi sau peste noapte se ține un veghe de ancoră, verificări periodice ale poziției. Ridicarea se face inteligent: în loc să tragi barca spre ancoră din brațe, avansezi ușor cu motorul până ajungi deasupra ei, recuperând calabrotul pe măsură; apoi o desprinzi cu o tracțiune verticală scurtă. Speli ancora de mâl înainte să o urci la bord și o amarezi la locul ei. Cu asta stăpânești ancorarea, iar modulul de manevre este complet.",
      },
    ],
    quiz: [
      { q: "Cât de lung ar trebui să fie calabrotul (lanțul/parâma) în raport cu adâncimea?", options: ["Egal cu adâncimea", "De 3–5 ori adâncimea (mai mult pe vreme rea)", "De 10 ori mai scurt", "Nu contează"], answer: 1, explain: "Un raport de 3:1 până la 5:1 (chiar 7:1 pe furtună) asigură prinderea." },
      { q: "Cum verifici că ancora ține?", options: ["Oprești motorul și pleci", "Urmărești două repere fixe pe mal", "Arunci încă o ancoră", "Nu se poate verifica"], answer: 1, explain: "Repere fixe pe mal: dacă poziția rămâne constantă, ancora ține." },
      { q: "Cum orientezi ambarcațiunea la ancorare?", options: ["Cu pupa în vânt", "Cu prova în vânt", "Perpendicular pe vânt", "Nu contează"], answer: 1, explain: "Cu prova în vânt te oprești controlat și filezi ancora în timp ce derivi înapoi." },
      { q: "Ce înseamnă că ancora 'ară'?", options: ["Se prinde perfect", "Derapă pe fund fără să țină", "Se ridică singură", "E ruginită"], answer: 1, explain: "Ancora care ară derapă pe fund; trebuie ridicată și repoziționată." },
      { q: "Care sunt componentele instalației de ancorare?", options: ["Ancora, lanțul, vinciul de ancoră și puțul lanțului", "Ancora, parâma, tachetul și baba", "Ancora, cârma, safranul și lanțul", "Doar ancora și lanțul"], answer: 0, explain: "Cele patru componente: ancoră + lanț + vinci de ancoră (windlass) + puțul lanțului." },
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
        narration: "Începem modulul de siguranță cu obiectul care salvează cele mai multe vieți pe apă: vesta. Și primul lucru de lămurit este că nu toate vestele sunt egale. Vesta de salvare propriu-zisă are flotabilitate mare și un guler special conceput să întoarcă o persoană inconștientă cu fața în sus, ținându-i căile respiratorii afară din apă chiar dacă nu mai poate înota deloc. Vesta de sprijin, cea subțire folosită la schi nautic sau caiac, doar ajută la plutire: este comodă, dar nu te întoarce și nu te ține cu fața sus dacă ți-ai pierdut cunoștința. Diferența dintre ele apare la examen și, mai important, contează în realitate. Vesta trebuie să fie pe mărimea purtătorului și încheiată corect: o vestă prea mare pur și simplu alunecă peste cap la intrarea în apă. Copiii au nevoie de veste pe măsura lor, cu chingă între picioare, și le poartă tot timpul, fără negociere. La fel înotătorii slabi și, sincer, toată lumea pe vreme rea, noaptea sau la temperaturi mici ale apei. Vesta din cufăr nu a salvat pe nimeni; vesta purtată, pe foarte mulți.",
      },
      {
        title: "Colacul și dispozitivele de salvare",
        bullets: [
          "Colacul de salvare cu saulă (frânghie) — aruncat spre persoana în apă",
          "Bară/cârlig de salvare, scară de urcare la bord",
          "Dispozitiv de localizare (fluier, lumină, geamandură luminoasă)",
        ],
        narration: "Când cineva ajunge în apă lângă barcă, primul reflex corect nu este săritul după el, ci aruncatul unui obiect plutitor. Colacul de salvare este proiectat exact pentru asta, iar detaliul care îl face cu adevărat util este saula, frânghia legată de el. Arunci colacul dincolo de persoană și îl tragi spre ea, apoi o tragi pe ea spre barcă, fără ca tu să părăsești puntea. Tehnica de aruncare merită exersată o dată pe sezon: picioarele bine proptite, aruncare pe deasupra sau pendulară, ținând capătul saulei sub talpă sau legat de barcă. Urcarea la bord este partea subestimată: un om obosit sau înfrigurat nu se poate ridica singur peste bordul liber. Scara de urcare, fixă sau agățabilă, rezolvă problema; în lipsa ei, o buclă de parâmă lăsată în apă poate servi drept treaptă. Completează echipamentul cu mijloace de localizare: un fluier atașat vestei se aude mult mai departe decât strigătul unui om epuizat, iar o lumină intermitentă pe vestă face vizibilă noaptea o siluetă pe care ochiul altfel nu ar găsi-o niciodată printre valuri.",
      },
      {
        title: "Stingătoarele de incendiu",
        bullets: [
          "Verifică tipul potrivit și presiunea/valabilitatea",
          "Amplasare accesibilă, nu lângă motor",
          "Tehnica PASS: scoți siguranța, țintești baza focului, apeși, baleiezi",
        ],
        narration: "Focul la bord este rar, dar nu iartă improvizația, așa că hai să învățăm stingătorul ca la carte. Alege un stingător potrivit pentru incendii de combustibil și instalații electrice, montează-l într-un suport accesibil, pe drumul tău natural de evacuare, dar nu chiar deasupra motorului, pentru că exact acolo nu vei putea ajunge când arde. Verifică-i periodic presiunea pe manometru și termenul de valabilitate. Tehnica de folosire are patru pași, ușor de memorat: scoți siguranța, țintești baza focului, apeși mânerul și baleiezi dintr-o parte în alta. Subliniez pasul doi, pentru că este contraintuitiv: nu stingi flăcările, stingi combustibilul care le hrănește, deci jetul merge la baza focului. Poziționează-te cu spatele la calea de retragere și cu vântul în spate dacă se poate. Încă două reguli de aur: pe foc de benzină sau ulei nu se aruncă niciodată apă, pentru că împrăștie combustibilul aprins; și dacă focul este deja mai mare decât poate acoperi stingătorul tău, nu ești pompier: veste pe toată lumea, semnal de primejdie și pregătește abandonul. Barca se poate înlocui.",
      },
      {
        title: "Semnale de primejdie",
        bullets: [
          "Rachete de semnalizare (roșii), fumigene, oglindă heliografică",
          "Semnal sonor continuu, brațe ridicate și coborâte lateral",
          "Radio VHF: apel MAYDAY pe canalul 16",
          "Apel: numele lui, «de», numele tău · OVER = aștept · OUT = închid",
        ],
        narration: "Să trecem în revistă limbajul universal al primejdiei, semnalele pe care orice navigator le recunoaște. Pe timp de zi, fumigena portocalie desenează pe cer o pată imposibil de confundat, iar oglinda heliografică aruncă sclipiri de soare vizibile de la kilometri. Noaptea, racheta de semnalizare roșie urcă și cade lent, anunțând tuturor că cineva are nevoie de ajutor; se lansează cu brațul întins, cu vântul în spate, niciodată spre elicoptere sau alte nave. Fără pirotehnie, ridicarea și coborârea lentă și repetată a brațelor întinse lateral este semnalul internațional de primejdie, la fel și un semnal sonor continuu. Iar cel mai eficient instrument rămâne radioul: pe canalul șaisprezece VHF rostești de trei ori meidei, apoi transmiți cine ești, unde ești, ce s-a întâmplat și câte persoane sunt la bord. Structura asta scurtă, cine, unde, ce, câți, este exact ce au nevoie salvatorii ca să pornească spre tine. Important de reținut și pentru examen: semnalele de primejdie se folosesc numai în pericol real; folosirea lor nejustificată este sancționată, pentru că trimite salvatori adevărați după o alarmă falsă. Câteva reguli de radiotelefonie pe care le cere examenul și le cere marea. Stația VHF lucrează în regim simplex: vorbește unul singur o dată, deci mesajele se țin scurte și clare, iar pe mare stația stă pornită, cu veghea pe canalul șaisprezece. Apelul corect: rostești numele stației chemate, apoi cuvântul de, apoi numele tău — de exemplu: Delfinul, Delfinul, de Pescărușul. După ce ați stabilit legătura pe șaisprezece, mutați conversația pe un canal de lucru și reveniți apoi la veghe. La finalul unei transmisii spui over, adică aștept răspuns; când închizi definitiv spui out. Over și out împreună nu există decât în filme. Iar stațiile moderne au butonul roșu de distress: apăsat, transmite automat, digital, pe canalul șaptezeci, poziția și identitatea ambarcațiunii către toate navele din zonă — și se folosește numai la primejdie reală.",
      },
    ],
    quiz: [
      { q: "Ce face o vestă de salvare adevărată pentru o persoană inconștientă?", options: ["O ține pe burtă", "O întoarce cu fața în sus", "Nu are efect", "O scufundă"], answer: 1, explain: "Vesta de salvare întoarce persoana pe spate, cu fața la suprafață." },
      { q: "Care este tehnica corectă de folosire a stingătorului?", options: ["Țintești vârful flăcării", "Scoți siguranța, țintești baza focului, apeși, baleiezi", "Îl arunci în foc", "Îl golești în aer"], answer: 1, explain: "Se țintește baza focului (nu flacăra) și se baleiază lateral." },
      { q: "Pe ce canal VHF se transmite un apel de primejdie MAYDAY?", options: ["Canalul 6", "Canalul 16", "Canalul 72", "Orice canal"], answer: 1, explain: "Canalul 16 VHF este canalul internațional de primejdie și apel." },
      { q: "Cum se folosește colacul de salvare?", options: ["Se poartă pe cap", "Se aruncă spre persoana din apă, legat cu o saulă", "Se pune sub motor", "Se folosește ca ancoră"], answer: 1, explain: "Colacul cu saulă se aruncă spre persoană pentru flotabilitate și tractare." },
      { q: "Ce înseamnă OVER la finalul unei transmisii radio?", options: ["Închid definitiv stația", "Am terminat transmisia și aștept răspuns", "Pericol la bord", "Schimb canalul"], answer: 1, explain: "OVER = aștept răspuns; OUT = am încheiat definitiv. Împreună, doar în filme." },
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
          "NIMENI nu sare în apă după persoana căzută!",
          "Apropiere pe partea din vânt, motor la ralanti/oprit la preluare",
        ],
        narration: "Om la apă este urgența clasică a navigației de agrement și se rezolvă prin roluri clare, jucate fără panică. În secunda în care cineva cade peste bord, oricine a văzut strigă tare om la apă și arată cu brațul întins spre persoana din apă, fără să o scape din ochi. Acest arătător uman este vital: printre valuri, un cap de om dispare din vedere în câteva secunde, iar cine îl pierde nu îl mai găsește ușor. Simultan, aruncă spre el colacul sau orice obiect plutitor: îi dă sprijin și marchează locul. Conducătorul reduce imediat viteza și întoarce ambarcațiunea. Apropierea finală se face împotriva vântului, cu prova în vânt, astfel încât barca să rămână controlabilă la viteză mică și să nu fie împinsă de rafale peste omul din apă. Iar regula absolută a momentului de contact: motorul la punct mort sau complet oprit. O elice care se rotește lângă un om în apă transformă salvarea în tragedie. Recuperarea se face pe bordul de sub vânt, pe la scară sau peste pupa, cu motorul oprit. Exersează scenariul cu echipajul tău pe vreme bună, cu o găleată drept victimă: trei minute de joc care pot valora o viață. Și regula de aur, valabilă oricât de dramatic ar părea momentul: nimeni nu sare în apă după cel căzut. În loc de o victimă, ai avea două. Barca întoarsă și obiectul plutitor salvează; eroismul improvizat îneacă.",
      },
      {
        title: "Incendiu la bord",
        bullets: [
          "Oprește motorul și sursa de combustibil, îndepărtează barca de vânt",
          "Folosește stingătorul pe baza focului",
          "Dacă nu poți controla focul: veste, semnal de primejdie, abandon",
        ],
        narration: "Dacă izbucnește foc la bord, primele zece secunde decid totul. Pasul unu: taie sursele. Oprești motorul, închizi robinetul de combustibil și scoți de sub tensiune circuitele electrice; focul fără hrană slăbește de la sine. Pasul doi: folosește vântul. Orientează ambarcațiunea astfel încât fumul și flăcările să fie duse de vânt peste bord, departe de oameni și de restul bărcii, nu peste cocpit. Pasul trei: atacă baza focului cu stingătorul, în mișcări de baleiere, exact cum am învățat ieri. Pasagerii se mută în partea opusă focului și își pun vestele, nu ca gest de panică, ci ca procedură standard. Dacă focul răspunde, continui până la stingere completă și apoi supraveghezi locul, pentru că benzina reaprinde ușor. Dacă focul crește în ciuda stingătorului, nu te încăpățâna: transmite meidei pe canalul șaisprezece cu poziția ta, pregătește abandonul organizat al ambarcațiunii și îndepărtează-te de ea pe direcția opusă vântului, ca să nu plutești în combustibilul care se poate scurge și aprinde pe apă. Oamenii se salvează întotdeauna înaintea bărcii.",
      },
      {
        title: "Avarie, infiltrații și eșuare",
        bullets: [
          "Infiltrație: localizezi, oprești/reduci intrarea apei, pompezi santina",
          "Eșuare (rămâi pe fund): oprești elicea, evaluezi avaria",
          "Nu forța motorul dacă rișți să afectezi corpul sau elicea",
        ],
        narration: "Două avarii clasice îți pot testa calmul: gaura în barcă și eșuarea. La o infiltrație de apă, ordinea este: găsește, astupă, evacuează. Cauți sursa, care de multe ori este un furtun sărit sau o presetupă slăbită, nu neapărat o gaură spectaculoasă în bordaj. Astupi cu ce ai: dopuri conice de lemn sau cauciuc, ținute la bord exact pentru asta, cârpe presate, chiar și o pernă proptită. Apoi pornești pompa de santină și completezi cu ispolul; o echipă care evacuează organizat face față unei infiltrații surprinzător de mari. Dacă apa câștigă totuși teren, transmite din timp poziția și cere ajutor, nu când puntea este deja la nivelul apei. La eșuare, adică atunci când barca pune fundul pe bancul de nisip sau pe pietre, primul gest este oprirea imediată a elicei, care altfel se distruge în contact cu fundul. Evaluezi apoi situația: unde e adâncimea, ce spune carena, intră apă? Nu forța motorul înapoi orbește: poți agrava avaria sau înfige barca mai adânc. Uneori soluția este să muți greutatea, să împingi cu cangea sau să aștepți creșterea apei; alteori, cel mai înțelept este să ceri asistență. Grabă furioasă la eșuare înseamnă, de regulă, elice nouă.",
      },
      {
        title: "Remorcajul",
        bullets: [
          "Parâmă de remorcaj rezistentă, prinsă de puncte solide",
          "Pornire lentă, fără smucituri, viteză redusă",
          "Comunicare clară între ambarcațiuni, atenție la parâma sub tensiune",
        ],
        narration: "Remorcajul pare banal, două bărci și o frânghie, dar parâma sub tensiune este una dintre cele mai subestimate surse de accidente pe apă. Regulile bune încep de la puncte de prindere: parâma se leagă doar de elemente structurale solide, baba de remorcă, tacheții prova dimensionați corespunzător, niciodată de balustrade sau mânere, care se smulg. Lungimea parâmei se alege generos, iar pe valuri se reglează astfel încât ambele ambarcațiuni să urce și să coboare pe val în același ritm, altfel smuciturile rup. Pornirea se face la pas: întinzi parâma încet, fără șocuri, apoi crești gradual viteza, care rămâne moderată pe tot parcursul. Cârmaciul remorcat ține prova pe urma remorcherului. Și acum zona hașurată cu roșu din desen: nimeni nu stă în prelungirea parâmei întinse sau lângă ea. O parâmă care cedează sub tensiune reculează ca un bici, cu putere de fractură. Pasagerii stau jos, în afara planului parâmei. Stabiliți dinainte semnale simple de comunicare între bărci: mai încet, stop, molează. Pe apă calmă, remorcajul la ureche, cu bărcile legate bord la bord, oferă mai mult control la manevre fine în port.",
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
        narration: "Apa fură căldura corpului de aproximativ douăzeci și cinci de ori mai repede decât aerul, iar asta face din hipotermie un pericol real chiar vara, pe lacurile de munte sau după o oră de plutit în apă de optsprezece grade. Primele minute în apă rece aduc șocul termic: respirație necontrolată, puls urcat, panică; deja aici vesta face diferența, ținând capul afară cât corpul se obișnuiește. Apoi frigul amorțește treptat mușchii, iar înotul devine imposibil cu mult înainte ca victima să își piardă cunoștința. Semnele hipotermiei se citesc ușor: frisoane puternice la început, apoi, mai grav, frisoanele încetează, apar confuzia, vorbirea încâlcită, apatia. Ce faci: scoți persoana din apă cu blândețe, îi dai jos hainele ude, o învelești în pături sau folie termică, inclusiv capul, și o încălzești treptat, din interior spre exterior: adăpost, băuturi calde și dulci dacă este perfect conștientă. Ce nu faci: frecții energice, mișcări bruște, alcool. Toate acestea împing sângele rece de la periferie spre inimă și pot declanșa exact colapsul pe care încerci să îl eviți. Încălzirea corectă este lentă și răbdătoare.",
      },
      {
        title: "Înecul și degajarea căilor respiratorii",
        bullets: [
          "Scoate victima din apă în siguranță",
          "Verifică starea de conștiență și respirația",
          "Dacă nu respiră: începe resuscitarea, cere ajutor",
        ],
        narration: "La un incident de înec, regula zero este să nu transformi o victimă în două. Salvatorii profesioniști au o ierarhie pe care o preiei ca atare: întinde, aruncă, vâslește, și abia la urmă înoată. Adică întinzi o cange, o vâslă, un braț de pe punte; arunci colacul cu saulă; te apropii cu barca; și doar dacă nu există altă cale și ești un înotător antrenat, intri în apă, ideal cu un obiect plutitor între tine și victimă, pentru că un om care se îneacă se agață cu o forță care scufundă și salvatorul. Odată victima la bord, treci pe modul prim ajutor: o întinzi pe spate, îi deschizi căile respiratorii cu capul lăsat ușor pe spate și verifici respirația cel mult zece secunde: privești pieptul, asculți, simți aerul pe obraz. Dacă respiră normal, o așezi în poziția laterală de siguranță, o acoperi și o supraveghezi continuu, pentru că starea se poate schimba. Dacă nu respiră sau doar horcăie ocazional, chemi ajutor prin radio sau telefon și începi imediat resuscitarea, despre care vorbim în scena următoare. Orice persoană scoasă din apă după un episod de înec ajunge la medic, chiar dacă pare complet refăcută: apa ajunsă în plămâni poate face probleme la ore după incident.",
      },
      {
        title: "Resuscitarea cardio-pulmonară (RCP)",
        bullets: [
          "30 de compresii toracice : 2 ventilații",
          "Ritm ~100–120 compresii/minut, apăsare 5–6 cm",
          "Continui până sosește ajutorul sau victima își revine",
        ],
        narration: "Resuscitarea cardio-pulmonară este abilitatea pe care speri să nu o folosești niciodată și care trebuie să fie automată dacă momentul vine. Schema pentru adult: victima nu respiră, ai chemat ajutorul, începi compresiile. Poziționezi podul palmei în centrul pieptului, pe jumătatea inferioară a sternului, cealaltă mână deasupra, degetele împletite, brațele întinse, umerii deasupra mâinilor. Apeși tare și repede: cinci, șase centimetri adâncime, într-un ritm de o sută până la o sută douăzeci pe minut, cadenţa piesei Staying Alive, și lași pieptul să revină complet între apăsări. După treizeci de compresii, două ventilații: capul pe spate, bărbia ridicată, strângi nasul și sufli un secundă până se ridică pieptul. Și tot așa, treizeci la două, fără pauze mai lungi de câteva secunde. Dacă nu poți sau nu vrei să faci ventilații, compresiile continue singure sunt incomparabil mai bune decât nimic. Nu te opri până sosește ajutorul calificat, până victima începe să respire sau până te epuizezi și te schimbă altcineva; schimbul la două minute menține calitatea. Frica de a apăsa prea tare este cel mai mare dușman: coastele fisurate se vindecă, creierul fără oxigen nu.",
      },
      {
        title: "Răni frecvente și trusa de prim ajutor",
        bullets: [
          "Tăieturi, arsuri, insolație, rău de mare, mușcături",
          "Oprești sângerarea prin presiune directă, protejezi rana",
          "Trusa: pansamente, dezinfectant, foarfecă, folie termică, mănuși",
        ],
        narration: "Închidem modulul de siguranță cu rănile frecvente ale vieții pe apă și cu trusa care le răspunde. Sângerarea se oprește prin presiune directă: comprese sau orice textil curat apăsat ferm pe rană, minute în șir, fără să ridici mereu să verifici; dacă sângele trece prin pansament, adaugi alt strat peste, nu îl scoți pe primul. Arsurile, de la soare sau de la eșapament, se răcesc imediat cu apă, zece până la douăzeci de minute, apoi se acoperă lejer; fără gheață direct pe piele și fără creme miraculoase pe arsuri deschise. Insolația se anunță prin durere de cap, amețeală, greață: mută omul la umbră, hidratează-l, răcorește-l cu comprese. Răul de mare se previne mai ușor decât se tratează: privirea la orizont, aer proaspăt, poziție spre mijlocul bărcii unde mișcarea e mai mică, mâncare ușoară înainte de plecare. Iar trusa de prim ajutor, obligatorie la bord, conține minim: pansamente sterile și fașe, plasturi, dezinfectant, foarfecă, mănuși, folie termică de supraviețuire. Verific-o la începutul fiecărui sezon: dezinfectantul expiră, plasturii dispar misterios, iar trusa completă în ziua în care ai nevoie de ea este definiția pregătirii.",
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
        narration: "Bine ai venit în modulul de navigație. Începem cu balizajul, sistemul de semne plutitoare care transformă apa necunoscută într-un drum marcat. Geamandurile, numite și balize, delimitează șenalul navigabil, adică fâșia de apă sigură și suficient de adâncă, avertizează asupra pericolelor izolate și marchează zonele speciale. Ca peste tot în Europa, la noi se aplică sistemul internațional iala, regiunea A; rețин denumirea, pentru că apare la examen. Fiecare geamandură comunică prin patru caractere: forma corpului, culoarea, semnul de vârf, adică silueta mică montată deasupra, și, pe timp de noapte, ritmul și culoarea luminii. Împreună, ele îți spun fără cuvinte pe unde să treci. În ilustrație vezi principiul general: șenalul spre port, încadrat de geamandurile roșii pe o parte și verzi pe cealaltă, ca niște borduri ale drumului pe apă. Convenția de citire funcționează în sensul de intrare dinspre larg spre port sau din aval spre amonte pe fluvii. În scenele următoare luăm pe rând fiecare familie de mărci: laterale, cardinale și speciale.",
      },
      {
        title: "Mărcile laterale (Regiunea A)",
        bullets: [
          "Babord: roșu, formă cilindrică (can) — o lași la stânga la intrare",
          "Tribord: verde, formă conică — o lași la dreapta la intrare",
          "'Intrare' = dinspre mare spre port / în sensul curentului de flux",
        ],
        narration: "Mărcile laterale sunt cele mai des întâlnite și marchează cele două margini ale șenalului. În regiunea A regula sună așa: la intrarea dinspre larg spre port, lași geamandurile roșii la babord, adică pe stânga ta, și geamandurile verzi la tribord, pe dreapta ta. Forma le întărește mesajul: marca roșie de babord este cilindrică, precum o cutie de conserve, iar marca verde de tribord este conică, cu vârful în sus. Noaptea, fiecare aprinde lumină în propria culoare: roșie, respectiv verde. Un truc de memorare care funcționează: la intrare, culorile geamandurilor corespund luminilor de navigație ale bărcii tale: roșul tău de babord salută roșul geamandurii, verdele tău de tribord salută verdele ei. Atenție însă la sensul de mers: la ieșirea din port, totul se citește invers, roșul rămâne acum pe dreapta ta. De aceea întrebările de examen precizează întotdeauna sensul: intrare sau ieșire. Pe fluvii, precum Dunărea, sensul convențional de referință este din aval spre amonte, adică împotriva curgerii. Dacă ții minte imaginea cu barca intrând între roșu la stânga și verde la dreapta, ai rezolvat jumătate din întrebările de balizaj.",
      },
      {
        title: "Mărcile cardinale",
        bullets: [
          "Indică unde este apa sigură față de un pericol: N, E, S, V",
          "Negru-galben, cu conuri de vârf orientate specific",
          "Treci prin partea indicată (ex. marca Nord: treci pe la nord de ea)",
        ],
        narration: "Mărcile cardinale rezolvă o problemă diferită: nu îți arată marginea unui șenal, ci în ce parte să ocolești un pericol punctual, folosind punctele cardinale. Numele mărcii spune unde este apa sigură: marca de nord se pune la nord de pericol și îți cere să treci pe la nord de ea; la fel pentru sud, est și vest. Toate sunt vopsite în combinații de negru și galben, iar cheia de citire rapidă este semnul de vârf, format din două conuri negre. La nord, ambele conuri arată în sus; la sud, ambele în jos, intuitiv ca pe hartă. La est, conurile stau cu bazele apropiate și vârfurile în afară, ca un ou; la vest, cu vârfurile față în față, ca un pahar cu picior, iar litera W de la vest îți amintește de paharul de vin. Poziția benzilor negre și galbene urmează aceeași logică: negrul stă acolo unde arată vârfurile conurilor. Când vezi în larg o geamandură galben-negru, algoritmul este: identifici conurile, îți spui numele punctului cardinal și treci de partea aceea a mărcii, lăsând pericolul de partea opusă. Simplu, elegant și obligatoriu de știut, pentru că mărcile cardinale sunt subiect garantat la examen.",
      },
      {
        title: "Alte mărci utile",
        bullets: [
          "Pericol izolat: negru cu bandă roșie, două sfere negre — ocolește",
          "Ape sigure: roșu-alb vertical, sferă roșie — poți trece pe oricare parte",
          "Marcă specială: galbenă (zone de agrement, cabluri, etc.)",
        ],
        narration: "Mai rămân trei semne speciale care completează alfabetul balizajului. Marca de pericol izolat se ancorează direct deasupra unui pericol de dimensiuni mici, o epavă, o stâncă, înconjurat de altfel de apă navigabilă. O recunoști după corpul negru cu una sau mai multe benzi late roșii și, semnul distinctiv absolut, două sfere negre suprapuse în vârf. Mesajul ei: nu te apropia, ocolește-o la distanță sigură pe oricare parte. Marca de ape sigure spune exact contrariul: în jurul meu totul este navigabil. Este singura marcă în dungi verticale roșii și albe, poartă o sferă roșie în vârf și marchează de obicei mijlocul unui șenal larg sau punctul de aterizare la intrarea în porturi. Poți trece pe oricare parte a ei. Marca specială, complet galbenă, cu semn de vârf în formă de X galben, nu vorbește despre pericole de navigație, ci delimitează zone cu destinație specială: perimetre de înot, zone militare, prize de apă, cabluri, parcuri de agrement nautic. Semnificația exactă o afli din hartă sau din avizele către navigatori. Recapitulând familia completă: laterale pentru marginile drumului, cardinale pentru ocolirea pericolelor, pericol izolat, ape sigure și speciale pentru restul mesajelor. Cu ele, apa devine un drum cu indicatoare.",
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
        narration: "Intrăm în regulile de drum, colregul internațional, numit la noi și ripam: codul rutier al apei. Înainte de cazurile concrete, trei principii de temelie. Primul: veghea permanentă. Conducătorul urmărește continuu, cu ochii și cu urechile, tot ce se întâmplă în jur: nave, înotători, geamanduri, schimbări de vreme. Muzica dată tare sau telefonul din mână sunt, pe apă, echivalentul condusului cu ochii închiși. Al doilea: viteza de siguranță. Nu există o cifră universală; viteza corectă depinde de vizibilitate, de aglomerație, de manevrabilitatea bărcii tale și de starea mării, și este întotdeauna aceea care îți lasă timp să eviți și să oprești. Al treilea: acțiunea de evitare se face din timp, amplu și vizibil. O schimbare mică și târzie de drum îl lasă pe celălalt să ghicească intențiile tale; o întoarcere clară, făcută devreme, se citește de departe și liniștește pe toată lumea. Mai adaugă un gram de realism marinăresc: regulile îți pot da prioritate, dar un cargou de două sute de metri nu poate opri în kilometrul lui de drum. Prudența față de navele mari și greu manevrabile nu este slăbiciune, este buna practică a mării.",
      },
      {
        title: "Întâlnirea față în față",
        bullets: [
          "Două ambarcațiuni cu motor din sens opus: fiecare vireze la tribord",
          "Se trec pe partea babord (stânga) una față de cealaltă",
          "Manevră timpurie și clară",
        ],
        narration: "Primul caz concret: întâlnirea față în față, două ambarcațiuni cu motor venind una spre cealaltă pe drumuri opuse. Regula este simetrică și fără excepții: fiecare schimbă de drum spre tribord, adică spre dreapta, iar navele se încrucișează lăsându-și reciproc bordul babord, exact ca două mașini pe un drum cu circulație pe dreapta. Cum recunoști situația noaptea? Vezi ambele lumini laterale ale celuilalt, roșie și verde simultan, plus lumina albă de catarg deasupra: semn că prova lui este îndreptată fix spre tine. Ziua, vezi prova lui și valurile despicate simetric. Manevra corectă se face devreme și cu un unghi suficient de mare încât celălalt să o observe fără dubiu; dacă există vreo îndoială că te-a văzut sau că a înțeles, un semnal sonor scurt anunță: schimb de drum la tribord. Greșeala clasică a începătorilor este virajul la stânga, pe logica de pieton: te ferești din calea celuilalt exact în direcția în care se ferește și el, și traiectoriile se încrucișează din nou. Deci gravează regula: față în față înseamnă amândoi la dreapta, trecere babord la babord.",
      },
      {
        title: "Drumuri care se intersectează",
        bullets: [
          "Ambarcațiunea care vine din tribord (dreapta) are prioritate",
          "Cel obligat să cedeze: reduce viteza sau trece prin spatele celeilalte",
          "Nava privilegiată își menține drumul și viteza",
        ],
        narration: "Al doilea caz: drumurile se încrucișează, ca într-o intersecție fără semafor. Regula colreg: ambarcațiunea care o vede pe cealaltă venind din tribordul ei, adică din dreapta, este cea care cedează trecerea. În desen, tu ești barca din stânga-jos: celălalt îți vine din dreapta, deci tu ești nava care se ferește, iar el este nava privilegiată. Obligațiile sunt împărțite clar. Tu, cel care cedezi, acționezi din timp și vizibil: reduci viteza sau schimbi de drum astfel încât să treci prin pupa celuilalt, pe la spatele lui, cum arată săgeata galbenă. Evită să tai prin prova lui, chiar dacă pare că ai avea loc: este manevra care produce cele mai multe coliziuni. Celălalt, nava privilegiată, are și el o obligație, des uitată la examen: să își mențină drumul și viteza constante, ca manevra ta să se poată calcula; iar dacă vede că tu nu faci nimic și coliziunea devine iminentă, este obligat să manevreze el însuși pentru evitare. Prioritatea pe apă nu este un drept de a închide ochii, ci o împărțire a rolurilor pentru predictibilitate. Truc de memorare nocturn: dacă vezi lumina roșie a altei nave în drum de încrucișare, roșul îți spune stop, cedezi tu.",
      },
      {
        title: "Depășirea și ierarhia priorităților",
        bullets: [
          "Cel care depășește cedează întotdeauna trecerea celui depășit",
          "Ambarcațiunile cu motor cedează celor cu vele, de pescuit, greu manevrabile",
          "Excepție: în șenal îngust, navele mari au prioritate practică",
        ],
        narration: "Ultimele două piese ale regulilor de drum. Depășirea: oricine ajunge din urmă o altă ambarcațiune și vrea să o depășească este obligat să se țină la distanță de drumul ei, pe toată durata manevrei, până a trecut complet și liber. Nu contează cine e mai mare, mai rapid sau cu ce fel de propulsie merge fiecare: cel care depășește cedează, punct. Depășirea se face pe oricare bord este spațiu sigur, cu marjă generoasă și cu atenție la valul propriu. Apoi, ierarhia priorităților între categorii de nave, valabilă când drumurile se întâlnesc: ambarcațiunea cu motor cedează în fața navelor cu vele, a celor angajate în pescuit cu unelte care le limitează manevra și a navelor cu capacitate de manevră redusă sau nestăpâne pe manevră. Logica este pură fizică: cedează cel care poate manevra cel mai ușor, iar barca ta de agrement cu motor este aproape întotdeauna cea mai agilă de pe apă. Excepția pragmatică: în șenale înguste, navele mari care nu pot ieși din șenal au prioritate de facto, iar ambarcațiunile mici nu trebuie să le stânjenească trecerea. Recapitulare într-o frază: la dreapta când vii față în față, cedezi celui din dreapta la încrucișare, cedezi mereu când depășești, iar motorul cedează velelor.",
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
        narration: "Noaptea, navele vorbesc prin lumini, iar lecția de azi te învață să le citești. Fiecare navă cu motor în marș poartă un set standard: lumina roșie la babord și verde la tribord, fiecare acoperind un sector de o sută doisprezece grade și jumătate spre înainte; lumina albă de pupa, acoperind sectorul de o sută treizeci și cinci de grade dinspre înapoi; și una sau două lumini albe de catarg, vizibile de dinainte, deasupra celor laterale. Adunate, sectoarele acoperă exact cercul complet, iar asta nu e un accident: din orice direcție ai privi o navă, combinația de lumini pe care o vezi este unică și îți dezvăluie orientarea ei. Luminile se aprind de la apus până la răsărit și oricând vizibilitatea scade, pe ceață sau ploaie deasă. Înainte de orice ieșire care s-ar putea prelungi după lăsarea serii, verifică-ți luminile: un bec ars te face invizibil dintr-o direcție întreagă, iar celelalte nave decid manevrele lor pe baza a ceea ce văd, sau nu văd, la tine. Ancorat pe timp de noapte în afara porturilor, arborezi lumina albă circulară de ancoră, vizibilă de jur împrejur.",
      },
      {
        title: "Interpretarea luminilor altei nave",
        bullets: [
          "Vezi roșu ȘI verde + alb = vine spre tine (din față)",
          "Vezi doar verde = o vezi pe tribordul ei; doar roșu = pe babordul ei",
          "Vezi doar alb (pupa) = o ajungi din urmă / merge în fața ta",
        ],
        narration: "Acum aplicăm teoria: trei tablouri luminoase pe care trebuie să le decodezi instantaneu. Primul: vezi simultan roșu și verde, cu alb de catarg deasupra. Ambele lumini laterale vizibile înseamnă că privești nava exact din prova: vine spre tine. Este scenariul de întâlnire față în față, deci amândoi schimbați la tribord. Al doilea tablou: vezi doar verde. Sectorul verde acoperă bordul tribord al celeilalte nave, deci îi privești latura dreaptă; drumurile voastre probabil se încrucișează, iar culoarea verde îți dă indiciul: pentru el tu vii din babord... verifică geometria, dar verde tinde să însemne că poți menține. Al treilea: vezi doar roșu. Îi privești bordul babord, iar roșul funcționează ca un semafor: ea îți vine din tribordul tău, tu cedezi trecerea. De aici zicala navigatorilor: verde, drum liber; roșu, oprește-te și gândește. Al patrulea tablou, discret dar frecvent: o singură lumină albă joasă. Este pupa unei nave pe care o ajungi din urmă, iar cine ajunge din urmă cedează: ești în depășire cu toate obligațiile ei. Tot o singură lumină albă poartă și nava ancorată; diferența o face mișcarea relativă. Exersează aceste patru tablouri până devin reflex: la examen apar constant, iar pe apă noaptea nu ai timp de dicționar.",
      },
      {
        title: "Semnale sonore de manevră",
        bullets: [
          "Un sunet scurt = 'vireze la tribord (dreapta)'",
          "Două sunete scurte = 'vireze la babord (stânga)'",
          "Trei sunete scurte = 'dau înapoi (marșarier)'",
        ],
        narration: "Când navele se văd una pe alta, manevrele se anunță prin semnale sonore scurte, un cod morse minimal pe care îl emiți cu fluierul sau sirena bărcii; un mijloc de semnalizare sonoră este de altfel obligatoriu la bord. Un sunet scurt, de circa o secundă: îmi schimb drumul spre tribord, spre dreapta. Două sunete scurte: îmi schimb drumul spre babord, spre stânga. Trei sunete scurte: mașinile mele lucrează înapoi, adică am cuplat marșarierul și frânez sau dau înapoi. Observă logica de memorare: dreapta este prima opțiune, un singur semnal; stânga a doua, două semnale; iar cele trei sunete pentru marș înapoi seamănă cu bip-bip-bip-ul camioanelor care dau cu spatele. Aceste semnale nu cer voie și nu răspund la întrebări: ele anunță o manevră pe care o execuți, ca semnalizatorul la mașină. Le folosești în special când altă navă este aproape și manevra ta o privește direct: la întâlniri față în față, în încrucișări, în porturi aglomerate. Emite-le clar și la momentul manevrei, nu cu minute înainte. Iar când auzi tu semnalele altuia, tradu-le imediat: un scurt, virează dreapta; două, stânga; trei, frânează. Ele apar la examen în forma exact inversă: ce înseamnă sunetele pe care le auzi.",
      },
      {
        title: "Semnale de atenție și de vizibilitate redusă",
        bullets: [
          "Cinci sau mai multe sunete scurte = 'nu îți înțeleg intențiile / atenție'",
          "Un sunet lung = 'ies dintr-un cot/port' sau semnal la vizibilitate redusă",
          "Pe ceață: semnale sonore periodice pentru a fi auzit",
        ],
        narration: "Două situații speciale completează limbajul sonor. Prima: îndoiala. Dacă nu înțelegi intențiile celeilalte nave sau manevra ei te pune în pericol, emiți cel puțin cinci sunete scurte și rapide: semnalul de atenție și alarmă, echivalentul unui hei, trezește-te. Îl auzi des în porturi, când cineva taie calea altuia. A doua: vizibilitatea limitată de coturi, diguri sau construcții. Când te apropii de un cot de râu fără vizibilitate sau ieși dintr-un bazin portuar, anunți cu un sunet lung, de patru până la șase secunde; cine vine din partea opusă răspunde la fel, și amândoi știți unul de altul înainte să vă vedeți. Iar pe ceață, regulile se schimbă fundamental: reduci viteza drastic, postezi veghe suplimentară, asculți, și emiți periodic semnalele de ceață; nava cu motor în marș dă un sunet lung la cel mult două minute, iar oprită din marș, două sunete lungi. Radarul și GPS-ul ajută, dar urechea rămâne senzorul principal al bărcilor mici pe ceață. Sinceritatea marinărească spune așa: dacă prognoza anunță ceață serioasă, cea mai bună manevră a unei ambarcațiuni de agrement este să rămână la ponton. Cu asta, ai parcurs luminile și sunetele; mâine încheiem cu vremea și planificarea.",
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
        narration: "Ultima zi de curs începe cu cel mai capricios membru al echipajului: vremea. Câteva instrumente de citit cerul te scutesc de surprize. Barometrul măsoară presiunea atmosferică, iar tendința lui contează mai mult decât valoarea: o scădere rapidă, de câțiva milibari în câteva ore, anunță aproape întotdeauna înrăutățirea vremii, vânt și ploaie. Pe cer, urmărește norii cumulonimbus, turnurile acelea uriașe cu vârf de nicovală: sub ei se nasc furtunile, rafalele violente și schimbările bruște de direcție a vântului. O linie întunecată care avansează pe apă îți arată chiar rafala venind. Mai ține cont de un efect local: vântul care bate împotriva curentului unui fluviu ridică valuri scurte și abrupte, mult mai neplăcute decât ar sugera viteza vântului. Sursa ta de bază rămân buletinele meteo marine și aplicațiile dedicate, consultate obligatoriu înainte de plecare și, la ieșiri lungi, verificate și pe parcurs. Iar decizia grea, amânarea plecării, ia-o fără orgoliu: avertizările pentru ambarcațiuni mici există exact pentru barca ta. Pe apă nu există întâlnire atât de importantă încât să merite o furtună.",
      },
      {
        title: "Planificarea navigației",
        bullets: [
          "Traseu, distanțe, puncte de reper, adăposturi pe rută",
          "Maree/curenți, ore de lumină, autonomie de combustibil",
          "Mila marină = 1852 m · nodul = o milă marină pe oră",
          "Plan alternativ dacă vremea se strică",
        ],
        narration: "Planificarea voiajului leagă tot ce ai învățat într-un singur document simplu. Pe hartă, reală sau în aplicație, trasezi ruta prin puncte de drum, waypointuri, alese la vedere de repere ușor de recunoscut: faruri, geamanduri, promontorii. Măsori distanțele și le împarți la viteza ta de croazieră: obții timpul de marș, pe care îl compari cu orele de lumină disponibile, cu o marjă serioasă, pentru că pe apă totul durează mai mult decât pare. Din timp și consum derivezi combustibilul necesar, calculat cu regula treimilor pe care o știi deja: o treime dus, o treime întors, o treime rezervă neatinsă. Apoi studiezi harta pentru adăposturi: porturi, golfuri sau pontoane intermediare unde te poți retrage dacă vremea sau tehnica te trădează; ele sunt planul B, marcat cu portocaliu în desen. Notezi și particularitățile rutei: zone cu adâncimi mici, curenți, trafic comercial. La final, comunici planul unei persoane de pe mal, cu ora estimată de întoarcere și înțelegerea clară că o va alerta pe autorități dacă nu dai semn. Un plan de voiaj bun încape pe o jumătate de pagină și transformă orice imprevizibil dintr-o criză într-o schimbare de plan. Tot la planificare stăpânești unitățile mării. Mila marină are o mie opt sute cincizeci și doi de metri, iar nodul înseamnă o milă marină pe oră. Instrumentele arată două viteze: viteza prin apă, față de apa în care plutești, și viteza deasupra fundului, cea reală, dată de GPS; diferența dintre ele este curentul. Și înainte de plecare verifică avizele pentru navigatori, de exemplu prin sistemul NAVTEX: meteo, zone interzise, exerciții militare.",
      },
      {
        title: "Conduită responsabilă și mediul",
        bullets: [
          "Fără alcool la comandă; respectă vitezele și zonele reglementate",
          "Nu deranja înotătorii, fauna, alte ambarcațiuni (valul de etravă)",
          "Fără deversări; colectează deșeurile și combustibilul uzat",
        ],
        narration: "Înainte de examen, să vorbim despre statutul tău pe apă: conducător responsabil. Alcoolul la comanda ambarcațiunii este interzis, exact ca la volan, și tratat de lege ca atare; reflexele, echilibrul și judecata sunt exact instrumentele de care depinde barca ta, iar soarele și legănarea amplifică orice pahar. Respectă limitele de viteză și zonele reglementate: perimetrele de înot marcate cu geamanduri galbene sunt sanctuare în care motorul tău nu are ce căuta, iar lângă plaje și pontoane valul tău de etravă rămâne responsabilitatea ta legală. Păstrează distanță de înotători, scafandri, semnalizați prin balize cu steag, caiace și fauna locului; păsările și peștii nu au unde depune plângere, dar colcăitul repetat al elicelor le distruge habitatul. Iar capitolul mediu este simplu și nenegociabil: nimic peste bord. Nici combustibil, nici ape uzate, nici gunoi; toate se aduc la mal, la instalațiile portuare de colectare. O pată de ulei de un litru acoperă o suprafață de apă uriașă. Apa curată pe care navighezi azi este moștenirea pe care o lași celor care navighează mâine, iar la examen, întrebările de legislație și mediu punctează exact aceste obligații.",
      },
      {
        title: "Recapitulare — ești pregătit pentru examen",
        bullets: [
          "Modul 1: ambarcațiunea și motorul; Modul 2: manevre și ancorare",
          "Modul 3: siguranță și prim ajutor; Modul 4: navigație și reguli de drum",
          "Urmează simularea de examen — succes!",
        ],
        narration: "Felicitări, marinare! Ai parcurs toate cele patru module ale cursului. Știi cum e construită ambarcațiunea și cum îi îngrijești motorul; stăpânești manevrele, de la plecarea de la ponton până la ancorarea cu calabrot filat de trei până la cinci ori adâncimea; ai în reflexe siguranța: vesta purtată, omul la apă, stingătorul țintit la baza focului, resuscitarea în ritmul treizeci la două; și citești apa ca pe un drum cu indicatoare: geamanduri laterale și cardinale, lumini roșii și verzi în noapte, sunete scurte și lungi, reguli de prioritate. Urmează simularea de examen: douăzeci și patru de întrebări extrase din toate categoriile reale de antrenament, cu prag de promovare de șaptezeci și cinci la sută, contra cronometru. Sfaturile mele de final: recitește o dată tabelele cu lumini și semnale sonore, cele mai punctate subiecte; citește fiecare întrebare până la capăt, pentru că variantele seamănă intenționat; și nu te grăbi, timpul ajunge. Dacă nu treci din prima, simularea se reia cu întrebări noi, iar fiecare încercare te face mai puternic. Îți mulțumesc că am navigat împreună aceste paisprezece zile. Vânt bun din pupa, mare liniștită și ne vedem pe apă, căpitane!",
      },
    ],
    quiz: [
      { q: "Ce anunță adesea o scădere rapidă a presiunii (barometru)?", options: ["Vreme frumoasă", "Vreme rea / furtună", "Nimic", "Creșterea vizibilității"], answer: 1, explain: "Scăderea barometrului = deteriorarea vremii, adesea furtună." },
      { q: "Ce trebuie să conțină un plan de navigație bun?", options: ["Doar destinația", "Traseu, repere, adăposturi, curenți, autonomie și plan alternativ", "Numai ora de plecare", "Nimic, se improvizează"], answer: 1, explain: "Un plan complet include rută, repere, adăposturi, curenți și rezerve." },
      { q: "Este permis consumul de alcool la comanda ambarcațiunii?", options: ["Da, în cantități mici", "Nu, este interzis și periculos", "Doar noaptea", "Doar în port"], answer: 1, explain: "Alcoolul la comandă este interzis; afectează reacțiile și judecata." },
      { q: "De ce trebuie să limitezi valul de etravă lângă mal?", options: ["Ca să economisești combustibil", "Ca să nu deranjezi/pui în pericol înotătorii și alte ambarcațiuni", "Nu are importanță", "Ca să mergi mai repede"], answer: 1, explain: "Valul mare poate răsturna bărci mici și pune în pericol înotătorii." },
      { q: "Cât măsoară o milă marină?", options: ["1609 metri", "1852 metri", "1000 de metri", "2000 de metri"], answer: 1, explain: "Mila marină = 1852 m (un minut de arc); nodul = o milă marină pe oră." },
    ],
  },
];

/* ============ BANCA DE ÎNTREBĂRI — SIMULAREA DE EXAMEN ============ */
/* Se extrag aleator EXAM_CONFIG.count întrebări; prag de promovare EXAM_CONFIG.pass. */
const EXAM_CONFIG = { count: 24, pass: 0.75, minutes: 30 };

/* Categoriile ANR din care se extrag întrebări reale pentru fiecare modul. */
const MODULE_CATS = {
  1: ["marinarie", "legislatie"],
  2: ["manevra", "marinarie"],
  3: ["prim-ajutor", "legislatie"],
  4: ["colreg", "navigatie", "rnd"],
};

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
window.COURSE = { MODULES, LESSONS, EXAM_CONFIG, EXAM_BANK, MODULE_CATS };
