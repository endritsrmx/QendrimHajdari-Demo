import type { Treatment } from './types';
import { treatmentSlugs } from './treatment-slugs';

/**
 * PRELIMINARY MEDICAL TEXTS – status "needs_medical_review".
 * Written in general, cautious terms. They do not describe the specific services offered by
 * Dr. Hajdari; the concrete surgical spectrum is marked as [SURGICAL_PROCEDURE_DETAILS_APPROVED].
 * No durations, success rates or return-to-sport timelines are stated as guaranteed values.
 */
export const treatments: Treatment[] = [
  {
    id: 'acl',
    number: '01',
    status: 'needs_medical_review',
    slug: treatmentSlugs['acl'],
    illustration: 'acl',
    title: {
      sq: 'Dëmtimet e ligamentit të kryqëzuar anterior',
      en: 'ACL Injuries',
    },
    cardText: {
      sq: 'Vlerësim dhe trajtim i dëmtimeve të ligamentit të kryqëzuar anterior, shpesh pas lëvizjeve të shpejta rrotulluese në sport.',
      en: 'Assessment and care for anterior cruciate ligament injuries, which often occur during sudden pivoting movements in sport.',
    },
    heroLead: {
      sq: 'Ligamenti i kryqëzuar anterior (ACL) ndihmon në stabilizimin e gjurit. Një dëmtim i tij kërkon vlerësim të kujdesshëm dhe një plan trajtimi të përshtatur.',
      en: 'The anterior cruciate ligament (ACL) helps to stabilise the knee. An injury to it calls for a careful assessment and a treatment plan tailored to the individual.',
    },
    seoDescription: {
      sq: 'Informacion i përgjithshëm për dëmtimet e ACL: simptomat, diagnostikimi dhe mundësitë e trajtimit. Konsultë ortopedike në Prishtinë dhe Gjilan.',
      en: 'General information on ACL injuries: symptoms, diagnosis and treatment options. Orthopaedic consultations in Prishtina and Gjilan, Kosovo.',
    },
    intro: {
      sq: 'Dëmtimet e ACL ndodhin shpesh gjatë ndryshimeve të papritura të drejtimit, ndalimeve të shpejta ose kërcimeve. Ato mund të prekin sportistë, por edhe njerëz në jetën e përditshme. Jo çdo dëmtim kërkon të njëjtin trajtim – vendimi varet nga lloji i dëmtimit, aktiviteti dhe qëllimet personale.',
      en: 'ACL injuries often happen during sudden changes of direction, abrupt stops or landings. They can affect athletes as well as people in everyday life. Not every injury requires the same treatment – the decision depends on the type of injury, activity level and personal goals.',
    },
    anatomy: {
      sq: 'ACL kalon diagonalisht në qendër të gjurit dhe lidh kockën e kofshës (femurin) me kockën e këmbës (tibian). Ai kufizon zhvendosjen e tibias përpara dhe kontribuon në stabilitetin rrotullues të gjurit.',
      en: 'The ACL runs diagonally through the centre of the knee, connecting the thigh bone (femur) to the shin bone (tibia). It limits forward movement of the tibia and contributes to the rotational stability of the knee.',
    },
    symptoms: {
      sq: [
        'Një ndjesi ose zhurmë “kërcitjeje” në momentin e dëmtimit',
        'Ënjtje e gjurit brenda orëve të para',
        'Ndjesi paqëndrueshmërie ose “dorëzimi” i gjurit',
        'Kufizim i lëvizjes dhe dhimbje gjatë ngarkesës',
      ],
      en: [
        'A “popping” sensation or sound at the moment of injury',
        'Swelling of the knee within the first hours',
        'A feeling of instability or the knee “giving way”',
        'Restricted movement and pain on weight-bearing',
      ],
    },
    diagnostics: {
      sq: [
        'Anamnezë e detajuar mbi mekanizmin e dëmtimit',
        'Ekzaminim klinik me teste specifike të stabilitetit',
        'Imazheri sipas nevojës, p.sh. rezonancë magnetike (MRI) ose radiografi',
      ],
      en: [
        'A detailed history of how the injury occurred',
        'Clinical examination with specific stability tests',
        'Imaging where indicated, e.g. magnetic resonance imaging (MRI) or X-ray',
      ],
    },
    conservative: {
      sq: [
        'Fizioterapi e strukturuar për forcë, koordinim dhe kontroll neuromuskular',
        'Menaxhim i dhimbjes dhe ënjtjes',
        'Përshtatje e aktiviteteve sipas ngarkesës së gjurit',
      ],
      en: [
        'Structured physiotherapy for strength, coordination and neuromuscular control',
        'Management of pain and swelling',
        'Adapting activities to the load the knee can tolerate',
      ],
    },
    operative: {
      sq: [
        'Në disa raste mund të diskutohet rindërtimi i ligamentit, zakonisht me teknikë artroskopike',
        'Vendimi merret individualisht, pasi të jenë vlerësuar dëmtimet shoqëruese dhe qëllimet e pacientit',
      ],
      en: [
        'In some cases, ligament reconstruction – usually performed arthroscopically – may be discussed',
        'The decision is made individually after assessing any associated injuries and the patient’s goals',
      ],
    },
    aftercare: {
      sq: 'Rehabilitimi zakonisht ndjek faza të qarta dhe përshtatet sipas progresit individual. Kthimi në sport bazohet në kritere funksionale dhe jo vetëm në kohë. Kohëzgjatja ndryshon nga pacienti te pacienti.',
      en: 'Rehabilitation usually follows clear phases and is adjusted to individual progress. Return to sport is based on functional criteria rather than time alone. The duration varies from patient to patient.',
    },
    risks: {
      sq: [
        'Si çdo ndërhyrje mjekësore, edhe trajtimi mund të shoqërohet me rreziqe, si infeksion, trombozë ose ngurtësi e gjurit',
        'Rreziqet individuale diskutohen gjithmonë personalisht para çdo vendimi',
      ],
      en: [
        'As with any medical intervention, treatment may carry risks such as infection, thrombosis or knee stiffness',
        'Individual risks are always discussed in person before any decision is made',
      ],
    },
    faq: [
      {
        id: 'acl-1',
        status: 'needs_medical_review',
        question: {
          sq: 'A duhet çdo dëmtim i ACL të operohet?',
          en: 'Does every ACL injury need surgery?',
        },
        answer: {
          sq: 'Jo domosdoshmërisht. Disa pacientë mund të trajtohen në mënyrë konservative. Vendimi varet nga stabiliteti i gjurit, dëmtimet shoqëruese dhe aktivitetet e planifikuara.',
          en: 'Not necessarily. Some patients can be treated conservatively. The decision depends on knee stability, associated injuries and planned activities.',
        },
      },
      {
        id: 'acl-2',
        status: 'needs_medical_review',
        question: {
          sq: 'Kur mund të kthehem në sport?',
          en: 'When can I return to sport?',
        },
        answer: {
          sq: 'Nuk ka një afat të njëjtë për të gjithë. Kthimi në sport planifikohet individualisht dhe bazohet në teste funksionale.',
          en: 'There is no single timeline for everyone. Return to sport is planned individually and based on functional testing.',
        },
      },
    ],
    related: ['meniscus', 'sports', 'knee-joint'],
  },
  {
    id: 'meniscus',
    number: '02',
    status: 'needs_medical_review',
    slug: treatmentSlugs['meniscus'],
    illustration: 'meniscus',
    title: { sq: 'Dëmtimet e meniskut', en: 'Meniscus Injuries' },
    cardText: {
      sq: 'Diagnostikim dhe këshillim për dëmtimet e meniskut – nga lëndimet sportive deri te ndryshimet degjenerative.',
      en: 'Diagnosis and guidance for meniscus injuries – from sports-related tears to degenerative changes.',
    },
    heroLead: {
      sq: 'Meniskët janë struktura kërcore që ndihmojnë në shpërndarjen e ngarkesës në gju. Dëmtimet e tyre mund të shkaktojnë dhimbje, ënjtje ose bllokim të lëvizjes.',
      en: 'The menisci are cartilage structures that help distribute load within the knee. Injuries to them can cause pain, swelling or catching of the joint.',
    },
    seoDescription: {
      sq: 'Informacion i përgjithshëm për dëmtimet e meniskut: shkaqet, simptomat, diagnostikimi dhe trajtimi. Konsultë ortopedike në Kosovë.',
      en: 'General information on meniscus injuries: causes, symptoms, diagnosis and treatment. Orthopaedic consultations in Kosovo.',
    },
    intro: {
      sq: 'Dëmtimet e meniskut mund të ndodhin pas një lëvizjeje rrotulluese të gjurit ose gradualisht me kalimin e moshës. Simptomat dhe trajtimi ndryshojnë sipas llojit dhe vendndodhjes së dëmtimit.',
      en: 'Meniscus injuries can occur after a twisting movement of the knee or develop gradually with age. Symptoms and treatment vary according to the type and location of the tear.',
    },
    anatomy: {
      sq: 'Çdo gju ka dy meniskë në formë gjysmëhëne – një të brendshëm (medial) dhe një të jashtëm (lateral). Ata veprojnë si amortizues dhe kontribuojnë në stabilitetin e nyjës.',
      en: 'Each knee has two crescent-shaped menisci – an inner (medial) and an outer (lateral) one. They act as shock absorbers and contribute to joint stability.',
    },
    symptoms: {
      sq: [
        'Dhimbje në vijën e nyjës, shpesh gjatë rrotullimit ose përkuljes',
        'Ënjtje e përsëritur',
        'Ndjesi bllokimi ose “ngecjeje” në gju',
        'Vështirësi në përkuljen ose shtrirjen e plotë',
      ],
      en: [
        'Pain along the joint line, often when twisting or bending',
        'Recurrent swelling',
        'A sensation of locking or catching',
        'Difficulty fully bending or straightening the knee',
      ],
    },
    diagnostics: {
      sq: [
        'Ekzaminim klinik dhe teste specifike për meniskun',
        'Rezonancë magnetike (MRI) kur është e indikuar',
        'Vlerësim i strukturave të tjera të gjurit',
      ],
      en: [
        'Clinical examination and specific meniscus tests',
        'Magnetic resonance imaging (MRI) where indicated',
        'Assessment of other structures within the knee',
      ],
    },
    conservative: {
      sq: [
        'Fizioterapi dhe ushtrime për forcimin e muskujve',
        'Përshtatje e përkohshme e ngarkesës',
        'Trajtim simptomatik i dhimbjes dhe ënjtjes',
      ],
      en: [
        'Physiotherapy and muscle-strengthening exercises',
        'Temporary adjustment of load',
        'Symptomatic management of pain and swelling',
      ],
    },
    operative: {
      sq: [
        'Në raste të caktuara mund të diskutohet artroskopia – me synimin për të ruajtur sa më shumë ind meniskal',
        'Përshtatshmëria e një ndërhyrjeje vlerësohet individualisht',
      ],
      en: [
        'In selected cases, arthroscopy may be discussed – with the aim of preserving as much meniscal tissue as possible',
        'Suitability for any procedure is assessed individually',
      ],
    },
    aftercare: {
      sq: 'Plani pas trajtimit varet nga lloji i dëmtimit dhe nga trajtimi i zgjedhur. Ngarkesa rritet gradualisht, në koordinim me mjekun dhe fizioterapeutin.',
      en: 'The aftercare plan depends on the type of tear and the chosen treatment. Load is increased gradually, in coordination with the doctor and physiotherapist.',
    },
    risks: {
      sq: [
        'Çdo trajtim mund të shoqërohet me rreziqe, të cilat diskutohen individualisht',
        'Simptomat mund të vazhdojnë pjesërisht edhe pas trajtimit',
      ],
      en: [
        'Any treatment may carry risks, which are discussed individually',
        'Symptoms may partly persist even after treatment',
      ],
    },
    faq: [
      {
        id: 'men-1',
        status: 'needs_medical_review',
        question: {
          sq: 'A shërohet menisku vetë?',
          en: 'Can a meniscus tear heal on its own?',
        },
        answer: {
          sq: 'Kjo varet nga vendndodhja dhe lloji i dëmtimit. Disa zona të meniskut kanë furnizim më të mirë me gjak se të tjerat. Një vlerësim mjekësor ndihmon në sqarimin e situatës individuale.',
          en: 'That depends on the location and type of tear. Some areas of the meniscus have a better blood supply than others. A medical assessment helps clarify the individual situation.',
        },
      },
    ],
    related: ['acl', 'knee-joint', 'sports'],
  },
  {
    id: 'joint-replacement',
    number: '03',
    status: 'needs_medical_review',
    slug: treatmentSlugs['joint-replacement'],
    illustration: 'joint-replacement',
    heroPhoto: 'orTeamKneeReplacement',
    title: { sq: 'Zëvendësimi i nyjeve', en: 'Joint Replacement' },
    cardText: {
      sq: 'Këshillim për pacientët me ndryshime të avancuara të nyjeve, kur masat konservative nuk mjaftojnë më.',
      en: 'Guidance for patients with advanced joint changes when conservative measures are no longer sufficient.',
    },
    heroLead: {
      sq: 'Kur ndryshimet degjenerative të një nyje kufizojnë ndjeshëm jetën e përditshme, zëvendësimi i nyjës mund të jetë një nga mundësitë që diskutohen.',
      en: 'When degenerative changes in a joint significantly limit daily life, joint replacement may be one of the options to discuss.',
    },
    seoDescription: {
      sq: 'Informacion i përgjithshëm për zëvendësimin e nyjeve: kur diskutohet, si përgatitet dhe çfarë përfshin rehabilitimi.',
      en: 'General information on joint replacement: when it is considered, how it is prepared and what rehabilitation involves.',
    },
    intro: {
      sq: 'Artroza (osteoartriti) mund të shkaktojë dhimbje, ngurtësi dhe kufizim të lëvizjes. Në fillim, zakonisht provohen masa konservative. Kur këto nuk ndihmojnë më mjaftueshëm, mund të vlerësohet një zëvendësim i pjesshëm ose i plotë i nyjës.',
      en: 'Osteoarthritis can cause pain, stiffness and restricted movement. Conservative measures are usually tried first. When these no longer help sufficiently, a partial or total joint replacement may be evaluated.',
    },
    anatomy: {
      sq: 'Në një nyje të shëndetshme, sipërfaqet e kockave janë të mbuluara me kërc të lëmuar. Në artrozë, ky kërc hollohet gradualisht, gjë që mund të çojë në fërkim dhe inflamacion.',
      en: 'In a healthy joint, the bone surfaces are covered with smooth cartilage. In osteoarthritis, this cartilage gradually thins, which can lead to friction and inflammation.',
    },
    symptoms: {
      sq: [
        'Dhimbje gjatë ngarkesës dhe më vonë edhe në qetësi',
        'Ngurtësi në mëngjes ose pas pushimit',
        'Kufizim i distancës së ecjes',
        'Deformim i dukshëm ose ndryshim i aksit të këmbës',
      ],
      en: [
        'Pain on weight-bearing and later also at rest',
        'Stiffness in the morning or after rest',
        'Reduced walking distance',
        'Visible deformity or change in leg alignment',
      ],
    },
    diagnostics: {
      sq: [
        'Vlerësim i historisë mjekësore dhe i kufizimeve në jetën e përditshme',
        'Ekzaminim klinik i lëvizshmërisë dhe stabilitetit',
        'Radiografi me ngarkesë dhe imazheri shtesë sipas nevojës',
      ],
      en: [
        'Review of medical history and limitations in daily life',
        'Clinical examination of mobility and stability',
        'Weight-bearing X-rays and additional imaging where needed',
      ],
    },
    conservative: {
      sq: [
        'Fizioterapi dhe aktivitet fizik i përshtatur',
        'Menaxhim i peshës trupore kur është e rëndësishme',
        'Trajtim medikamentoz dhe mjete ndihmëse sipas nevojës',
      ],
      en: [
        'Physiotherapy and adapted physical activity',
        'Body-weight management where relevant',
        'Medication and assistive devices where appropriate',
      ],
    },
    operative: {
      sq: [
        'Zëvendësim i pjesshëm ose i plotë i nyjës, sipas gjetjeve individuale',
        'Llojet konkrete të protezave dhe nyjet që trajtohen konfirmohen nga mjeku',
      ],
      en: [
        'Partial or total joint replacement, depending on individual findings',
        'The specific implant types and joints treated are to be confirmed by the doctor',
      ],
    },
    aftercare: {
      sq: 'Rehabilitimi fillon zakonisht herët dhe synon rikthimin gradual të lëvizshmërisë dhe forcës. Ritmi i rikuperimit ndryshon nga pacienti te pacienti.',
      en: 'Rehabilitation usually starts early and aims at a gradual return of mobility and strength. The pace of recovery varies between patients.',
    },
    risks: {
      sq: [
        'Rreziqet e mundshme përfshijnë infeksion, trombozë, lirim të protezës ose ngurtësi',
        'Përfitimet dhe rreziqet peshohen gjithmonë së bashku me pacientin',
      ],
      en: [
        'Possible risks include infection, thrombosis, implant loosening or stiffness',
        'Benefits and risks are always weighed together with the patient',
      ],
    },
    faq: [
      {
        id: 'jr-1',
        status: 'needs_medical_review',
        question: {
          sq: 'Kur është koha e duhur për një protezë?',
          en: 'When is the right time for a joint replacement?',
        },
        answer: {
          sq: 'Nuk ka një moshë apo një pikë të caktuar për të gjithë. Rëndësi kanë dhimbja, kufizimet në jetën e përditshme dhe efekti i trajtimeve të mëparshme.',
          en: 'There is no fixed age or point in time for everyone. What matters is pain, limitations in daily life and the effect of previous treatments.',
        },
      },
    ],
    related: ['knee-joint', 'trauma'],
  },
  {
    id: 'sports',
    number: '04',
    status: 'needs_medical_review',
    slug: treatmentSlugs['sports'],
    illustration: 'sports',
    title: { sq: 'Mjekësia sportive', en: 'Sports Medicine' },
    cardText: {
      sq: 'Kujdes për lëndimet sportive dhe këshillim për një rikthim të sigurt dhe të strukturuar në aktivitet.',
      en: 'Care for sports injuries and guidance towards a safe, structured return to activity.',
    },
    heroLead: {
      sq: 'Mjekësia sportive ndërthur diagnostikimin, trajtimin dhe parandalimin e lëndimeve – për sportistë amatorë dhe profesionistë.',
      en: 'Sports medicine combines the diagnosis, treatment and prevention of injuries – for recreational and competitive athletes alike.',
    },
    seoDescription: {
      sq: 'Mjekësia sportive në Kosovë: informacion i përgjithshëm për lëndimet sportive, diagnostikimin dhe rikthimin në aktivitet.',
      en: 'Sports medicine in Kosovo: general information on sports injuries, diagnosis and returning to activity.',
    },
    intro: {
      sq: 'Lëndimet sportive mund të jenë akute, si përdredhjet dhe këputjet e ligamenteve, ose të shkaktuara nga mbingarkesa. Qëllimi është një plan i qartë që merr parasysh sportin, nivelin dhe objektivat e secilit.',
      en: 'Sports injuries can be acute, such as sprains and ligament tears, or caused by overuse. The goal is a clear plan that considers each person’s sport, level and objectives.',
    },
    anatomy: {
      sq: 'Gjuri, kyçi i këmbës dhe shpatulla janë ndër nyjet që preken më shpesh në sport. Ligamentet, tendinat dhe muskujt punojnë së bashku për të siguruar lëvizje të kontrolluar.',
      en: 'The knee, ankle and shoulder are among the joints most frequently affected in sport. Ligaments, tendons and muscles work together to ensure controlled movement.',
    },
    symptoms: {
      sq: [
        'Dhimbje e papritur gjatë ose pas aktivitetit',
        'Ënjtje, mavijosje ose ndjesi paqëndrueshmërie',
        'Ulje e performancës ose dhimbje që përsëritet',
      ],
      en: [
        'Sudden pain during or after activity',
        'Swelling, bruising or a sense of instability',
        'Reduced performance or recurring pain',
      ],
    },
    diagnostics: {
      sq: [
        'Analizë e mekanizmit të lëndimit dhe e ngarkesës sportive',
        'Ekzaminim klinik dhe funksional',
        'Imazheri sipas indikacionit',
      ],
      en: [
        'Analysis of the injury mechanism and training load',
        'Clinical and functional examination',
        'Imaging where indicated',
      ],
    },
    conservative: {
      sq: [
        'Plan rehabilitimi i bazuar në faza',
        'Përshtatje e stërvitjes dhe e ngarkesës',
        'Bashkëpunim me fizioterapeutë dhe trajnerë, kur është e përshtatshme',
      ],
      en: [
        'Phase-based rehabilitation plan',
        'Adjustment of training and load',
        'Coordination with physiotherapists and coaches where appropriate',
      ],
    },
    operative: {
      sq: [
        'Disa lëndime sportive mund të kërkojnë ndërhyrje kirurgjikale; kjo vlerësohet rast pas rasti',
      ],
      en: ['Some sports injuries may require surgery; this is assessed case by case'],
    },
    aftercare: {
      sq: 'Rikthimi në sport ndjek kritere funksionale – forcë, stabilitet dhe kontroll i lëvizjes – dhe jo vetëm kalimin e kohës.',
      en: 'Returning to sport follows functional criteria – strength, stability and movement control – rather than the passage of time alone.',
    },
    risks: {
      sq: [
        'Rikthimi i parakohshëm mund të rrisë rrezikun e lëndimeve të reja',
        'Rreziqet e çdo trajtimi diskutohen individualisht',
      ],
      en: [
        'Returning too early may increase the risk of re-injury',
        'The risks of any treatment are discussed individually',
      ],
    },
    faq: [
      {
        id: 'sp-1',
        status: 'needs_medical_review',
        question: {
          sq: 'A duhet të ndaloj plotësisht stërvitjen pas një lëndimi?',
          en: 'Should I stop training completely after an injury?',
        },
        answer: {
          sq: 'Jo gjithmonë. Shpesh ngarkesa mund të përshtatet në vend që të ndërpritet plotësisht. Kjo duhet sqaruar pas një vlerësimi mjekësor.',
          en: 'Not always. Often training load can be adapted rather than stopped entirely. This should be clarified after a medical assessment.',
        },
      },
    ],
    related: ['acl', 'meniscus'],
  },
  {
    id: 'trauma',
    number: '05',
    status: 'needs_medical_review',
    slug: treatmentSlugs['trauma'],
    illustration: 'trauma',
    title: { sq: 'Traumatologjia ortopedike', en: 'Orthopaedic Trauma' },
    cardText: {
      sq: 'Vlerësim dhe trajtim i lëndimeve të kockave dhe nyjeve pas aksidenteve ose rrëzimeve.',
      en: 'Assessment and treatment of bone and joint injuries following accidents or falls.',
    },
    heroLead: {
      sq: 'Traumatologjia ortopedike merret me frakturat dhe lëndimet e sistemit lëvizës, nga trajtimi fillestar deri te rehabilitimi.',
      en: 'Orthopaedic trauma care addresses fractures and injuries of the musculoskeletal system, from initial treatment through to rehabilitation.',
    },
    seoDescription: {
      sq: 'Traumatologjia ortopedike: informacion i përgjithshëm për frakturat dhe lëndimet e nyjeve. Për urgjenca kontaktoni shërbimet lokale të urgjencës.',
      en: 'Orthopaedic trauma: general information on fractures and joint injuries. For emergencies, contact your local emergency services.',
    },
    intro: {
      sq: 'Pas një aksidenti ose rrëzimi mund të ndodhin fraktura, luksacione ose lëndime të indeve të buta. Trajtimi varet nga lloji, vendndodhja dhe stabiliteti i lëndimit. Kjo faqe nuk është menduar për raste urgjente.',
      en: 'Accidents or falls can result in fractures, dislocations or soft-tissue injuries. Treatment depends on the type, location and stability of the injury. This page is not intended for emergencies.',
    },
    anatomy: {
      sq: 'Kockat, nyjet, ligamentet dhe tendinat formojnë një sistem të ndërlidhur. Një lëndim në njërën strukturë mund të ndikojë edhe në të tjerat.',
      en: 'Bones, joints, ligaments and tendons form an interconnected system. An injury to one structure can also affect the others.',
    },
    symptoms: {
      sq: [
        'Dhimbje e fortë dhe ënjtje pas një trauma',
        'Deformim i dukshëm ose pozicion jonormal',
        'Pamundësi për të ngarkuar ose lëvizur pjesën e lënduar',
      ],
      en: [
        'Severe pain and swelling after trauma',
        'Visible deformity or abnormal position',
        'Inability to bear weight or move the injured area',
      ],
    },
    diagnostics: {
      sq: [
        'Ekzaminim klinik, përfshirë qarkullimin dhe ndjeshmërinë',
        'Radiografi dhe, sipas nevojës, tomografi e kompjuterizuar (CT)',
      ],
      en: [
        'Clinical examination including circulation and sensation',
        'X-ray and, where needed, computed tomography (CT)',
      ],
    },
    conservative: {
      sq: [
        'Imobilizim me gips, ortezë ose fashë sipas llojit të lëndimit',
        'Kontrolle të rregullta radiologjike kur është e nevojshme',
        'Fizioterapi pas fazës së imobilizimit',
      ],
      en: [
        'Immobilisation with a cast, brace or splint depending on the injury',
        'Regular radiological follow-up where necessary',
        'Physiotherapy after the immobilisation phase',
      ],
    },
    operative: {
      sq: [
        'Frakturat e paqëndrueshme ose të zhvendosura mund të kërkojnë stabilizim kirurgjikal',
        'Metodat konkrete zgjidhen individualisht',
      ],
      en: [
        'Unstable or displaced fractures may require surgical stabilisation',
        'Specific methods are chosen individually',
      ],
    },
    aftercare: {
      sq: 'Shërimi i kockave dhe rikthimi i funksionit ndryshojnë sipas lëndimit, moshës dhe shëndetit të përgjithshëm. Kontrollet pasuese janë pjesë e rëndësishme e procesit.',
      en: 'Bone healing and recovery of function vary by injury, age and general health. Follow-up appointments are an important part of the process.',
    },
    risks: {
      sq: [
        'Rreziqet mund të përfshijnë vonesë në shërim, infeksion ose ngurtësi të nyjeve',
        'Rreziqet individuale diskutohen gjithmonë personalisht',
      ],
      en: [
        'Risks may include delayed healing, infection or joint stiffness',
        'Individual risks are always discussed in person',
      ],
    },
    faq: [
      {
        id: 'tr-1',
        status: 'needs_medical_review',
        question: {
          sq: 'Çfarë duhet të bëj menjëherë pas një lëndimi të rëndë?',
          en: 'What should I do immediately after a serious injury?',
        },
        answer: {
          sq: 'Në rast urgjence kontaktoni menjëherë shërbimet lokale të urgjencës ose shkoni në repartin më të afërt të urgjencës. Kjo faqe dhe formularët e saj nuk janë për urgjenca.',
          en: 'In an emergency, contact your local emergency services immediately or go to the nearest emergency department. This website and its forms are not intended for emergencies.',
        },
      },
    ],
    related: ['joint-replacement', 'sports'],
  },
  {
    id: 'knee-joint',
    number: '06',
    status: 'needs_medical_review',
    slug: treatmentSlugs['knee-joint'],
    illustration: 'knee-consultation',
    title: {
      sq: 'Sëmundjet e gjurit dhe nyjeve',
      en: 'Knee & Joint Conditions',
    },
    cardText: {
      sq: 'Konsultë për dhimbje të gjurit dhe nyjeve, me vlerësim të kujdesshëm dhe shpjegim të qartë të mundësive.',
      en: 'Consultation for knee and joint pain, with a careful assessment and a clear explanation of the options.',
    },
    heroLead: {
      sq: 'Dhimbja e gjurit dhe e nyjeve mund të ketë shumë shkaqe. Një konsultë ortopedike ndihmon për të kuptuar burimin e problemit dhe hapat e mundshëm.',
      en: 'Knee and joint pain can have many causes. An orthopaedic consultation helps to understand the source of the problem and possible next steps.',
    },
    seoDescription: {
      sq: 'Konsultë ortopedike për dhimbjet e gjurit dhe nyjeve në Prishtinë dhe Gjilan. Informacion i përgjithshëm për shkaqet dhe trajtimin.',
      en: 'Orthopaedic consultation for knee and joint pain in Prishtina and Gjilan. General information on causes and treatment.',
    },
    intro: {
      sq: 'Shkaqet e dhimbjes mund të jenë lëndime, mbingarkesë, inflamacion ose ndryshime degjenerative. Një vlerësim i strukturuar është hapi i parë drejt një plani të përshtatshëm.',
      en: 'Pain may be caused by injury, overuse, inflammation or degenerative changes. A structured assessment is the first step towards an appropriate plan.',
    },
    anatomy: {
      sq: 'Gjuri është një nga nyjet më të ngarkuara të trupit. Ai përbëhet nga kockat, kërci, meniskët, ligamentet dhe tendinat që punojnë së bashku.',
      en: 'The knee is one of the most heavily loaded joints in the body. It consists of bones, cartilage, menisci, ligaments and tendons working together.',
    },
    symptoms: {
      sq: [
        'Dhimbje gjatë ecjes, ngjitjes së shkallëve ose uljes në gjunjë',
        'Ënjtje ose ndjesi nxehtësie',
        'Kërcitje, ngurtësi ose ulje e lëvizshmërisë',
      ],
      en: [
        'Pain when walking, climbing stairs or kneeling',
        'Swelling or a feeling of warmth',
        'Clicking, stiffness or reduced mobility',
      ],
    },
    diagnostics: {
      sq: [
        'Bisedë e detajuar për ankesat dhe historinë mjekësore',
        'Ekzaminim klinik i nyjës',
        'Imazheri vetëm kur ka indikacion të qartë',
      ],
      en: [
        'Detailed conversation about symptoms and medical history',
        'Clinical examination of the joint',
        'Imaging only when clearly indicated',
      ],
    },
    conservative: {
      sq: [
        'Ushtrime dhe fizioterapi',
        'Këshilla për ngarkesën dhe aktivitetin e përditshëm',
        'Trajtim medikamentoz ose infiltrime, kur është e përshtatshme',
      ],
      en: [
        'Exercise and physiotherapy',
        'Advice on load and daily activity',
        'Medication or injections where appropriate',
      ],
    },
    operative: {
      sq: ['Ndërhyrja kirurgjikale diskutohet vetëm kur ka indikacion të qartë mjekësor'],
      en: ['Surgery is discussed only when there is a clear medical indication'],
    },
    aftercare: {
      sq: 'Plani pasues përcaktohet sipas diagnozës. Kontrollet e rregullta ndihmojnë në vlerësimin e progresit.',
      en: 'The follow-up plan depends on the diagnosis. Regular reviews help to assess progress.',
    },
    risks: {
      sq: ['Çdo trajtim ka përfitime dhe rreziqe të mundshme, të cilat diskutohen hapur'],
      en: ['Every treatment has potential benefits and risks, which are discussed openly'],
    },
    faq: [
      {
        id: 'kj-1',
        status: 'needs_medical_review',
        question: {
          sq: 'Kur duhet të kërkoj një konsultë ortopedike?',
          en: 'When should I seek an orthopaedic consultation?',
        },
        answer: {
          sq: 'Kur dhimbja vazhdon, përsëritet, kufizon aktivitetet e përditshme ose shoqërohet me ënjtje apo paqëndrueshmëri.',
          en: 'When pain persists, recurs, limits daily activities or is accompanied by swelling or instability.',
        },
      },
    ],
    related: ['meniscus', 'joint-replacement', 'acl'],
  },
];

export const getTreatmentById = (id: string) => treatments.find((t) => t.id === id) ?? null;

export const getTreatmentBySlug = (locale: 'sq' | 'en', slug: string) =>
  treatments.find((t) => t.slug[locale] === slug) ?? null;

export { translateTreatmentSlug } from './treatment-slugs';
