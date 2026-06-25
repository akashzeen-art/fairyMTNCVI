/**
 * Fairy Tale Video Portal — Full Dataset
 * All thumbnails use plain ASCII filenames (no accents/special chars).
 * Thumbnails served from /public/assets/thumbnails/
 */

const T = (name) => `/assets/thumbnails/${name}`

export const videos = [

  // ── Princess Tales ──────────────────────────────────────────────────────
  {
    id: 1,
    title: "Raiponce",
    thumbnail: T("raiponce.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/74289419-50d5-4f57-a9c2-7b2456c6977b/play_480p.mp4",
    category: "Contes de Princesses",
    duration: "12:45",
    description: "Enfermée dans une haute tour avec ses longs cheveux magiques, une princesse aspire à l'aventure jusqu'à ce qu'un gentil étranger monte la rejoindre.",
    featured: true,
  },
  {
    id: 2,
    title: "La Reine des Neiges",
    thumbnail: T("reine-neiges.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/26b1ce45-eb23-42eb-be00-20bca3a11d8f/play_480p.mp4",
    category: "Contes de Princesses",
    duration: "13:00",
    description: "Une reine aux pouvoirs glacés s'exile loin de son royaume. Sa courageuse sœur brave tempêtes et dangers pour la ramener à la maison.",
  },
  {
    id: 3,
    title: "La Petite Sirène",
    thumbnail: T("petite-sirene.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/860183a4-a0e2-4c20-b9ab-dceefe3c9e7a/play_480p.mp4",
    category: "Contes de Princesses",
    duration: "11:20",
    description: "Une jeune sirène rêve d'explorer le monde au-dessus de la mer et échange sa voix contre une chance de marcher sur la terre ferme.",
  },
  {
    id: 4,
    title: "La Princesse au Petit Pois",
    thumbnail: T("princesse-pois.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/11630e7c-77cb-455c-a401-20d0dcf35bd7/play_480p.mp4",
    category: "Contes de Princesses",
    duration: "7:30",
    description: "Une vraie princesse se reconnaît à sa sensibilité — même un minuscule pois caché sous vingt matelas ne lui laisse pas une nuit de repos.",
  },
  {
    id: 5,
    title: "Le Prince Heureux",
    thumbnail: T("prince-heureux.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/fa6876ae-c218-48dd-9310-4624aea2b457/play_480p.mp4",
    category: "Contes de Princesses",
    duration: "10:15",
    description: "Perché sur son piédestal, un prince doré demande à une petite hirondelle de distribuer ses joyaux aux plus pauvres de la ville.",
  },

  // ── Animal Tales ────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Le Lion et la Souris",
    thumbnail: T("lion-souris.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/209001b3-4c33-4449-a53b-01c87a0f6a50/play_480p.mp4",
    category: "Contes d'Animaux",
    duration: "5:30",
    description: "Un puissant lion épargne une petite souris — et un jour, c'est cette même souris qui viendra à son secours. La bonté n'est jamais perdue.",
  },
  {
    id: 7,
    title: "La Petite Poule Rousse",
    thumbnail: T("poule-rousse.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/3678ad42-1c96-40f3-bd9d-61b69c585b1a/play_480p.mp4",
    category: "Contes d'Animaux",
    duration: "8:00",
    description: "Une petite poule rousse travaille dur pour planter, récolter et cuire son pain. Mais qui l'aidera? Et qui voudra manger?",
  },
  {
    id: 8,
    title: "Boucle d'Or et les Trois Ours",
    thumbnail: T("boucle-dor.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/eb84db8e-a83c-4a57-adb9-180669381daf/play_480p.mp4",
    category: "Contes d'Animaux",
    duration: "9:45",
    description: "Une petite fille aux boucles dorées entre dans la maison des trois ours et teste leurs chaises, leur porridge et leurs lits.",
  },
  {
    id: 9,
    title: "Le Vilain Petit Canard",
    thumbnail: T("vilain-canard.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/43bc454b-eb09-4406-bc3c-1141e7f5e166/play_480p.mp4",
    category: "Contes d'Animaux",
    duration: "10:20",
    description: "Rejeté par tous pour sa laideur, un petit caneton grandit dans la tristesse — jusqu'au jour où il découvre ce qu'il est vraiment.",
  },

  // ── Magic Tales ─────────────────────────────────────────────────────────
  {
    id: 10,
    title: "Les Lutins et le Cordonnier",
    thumbnail: T("lutins.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/8fb23603-4f14-43d2-b15f-8a3c9c4cd79b/play_480p.mp4",
    category: "Contes De Fées",
    duration: "8:30",
    description: "Un vieux cordonnier pauvre reçoit chaque nuit l'aide mystérieuse de petits lutins qui cousent de magnifiques chaussures à sa place.",
  },
  {
    id: 11,
    title: "Le Chat Botté",
    thumbnail: T("chat-botte.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/f52f0266-d469-4ad0-a52c-80f080cfd7cd/play_480p.mp4",
    category: "Contes De Fées",
    duration: "11:00",
    description: "Un chat rusé chaussé de bottes aide son jeune maître à conquérir un royaume, grâce à son intelligence et ses tours ingénieux.",
  },
  {
    id: 12,
    title: "KALA et les Quarante Voleurs",
    thumbnail: T("kala.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/44c27e40-15da-4755-8797-833bef7d5075/play_480p.mp4",
    category: "Contes De Fées",
    duration: "14:00",
    description: "Un pauvre bûcheron découvre la caverne secrète de quarante voleurs et le mot magique qui ouvre ses portes : Sésame, ouvre-toi !",
  },
  {
    id: 13,
    title: "Rumpelstiltskin",
    thumbnail: T("rumpelstiltskin.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/322eda95-6159-44df-9440-10ca2ad5a0fe/play_480p.mp4",
    category: "Contes De Fées",
    duration: "10:45",
    description: "Un étrange petit homme transforme la paille en or en échange de promesses de plus en plus précieuses. Mais son nom est son secret.",
  },
  {
    id: 14,
    title: "Pinocchio",
    thumbnail: T("pinocchio.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/4cecda75-c6ec-4e13-990f-f57d3e60c9e2/play_480p.mp4",
    category: "Contes De Fées",
    duration: "15:00",
    description: "Une marionnette de bois rêve de devenir un vrai petit garçon. Chaque mensonge allonge son nez — et chaque bonne action rapproche son rêve.",
  },

  // ── Bedtime Stories ─────────────────────────────────────────────────────
  {
    id: 15,
    title: "Bonne Nuit",
    thumbnail: T("bonne-nuit.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/dbb8dc6b-1ac9-46c7-a7e2-b0f4acdd9f41/play_480p.mp4",
    category: "Histoires du Soir",
    duration: "6:00",
    description: "Une douce histoire du soir pour souhaiter bonne nuit à toutes les créatures de la forêt, des étoiles et des nuages avant de s'endormir.",
  },
  {
    id: 16,
    title: "Les Habits Neufs de l'Empereur",
    thumbnail: T("habits-neufs.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/a5b8cb33-3a11-46cd-9f02-c4f3e3c12e7f/play_480p.mp4",
    category: "Histoires du Soir",
    duration: "8:10",
    description: "Deux escrocs font croire à un empereur vaniteux qu'ils lui cousent des habits magnifiques — invisibles aux sots. Seul un enfant dit la vérité.",
  },
  {
    id: 17,
    title: "La Cinq Pois",
    thumbnail: T("la-cinq-pois.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/c59e88a1-5daa-4a1b-b07c-57d06a597e26/play_480p.mp4",
    category: "Histoires du Soir",
    duration: "7:00",
    description: "Par une nuit d'orage, une princesse frappe à la porte du château. La reine cache cinq petits pois sous ses matelas pour la mettre à l'épreuve.",
  },
  {
    id: 18,
    title: "Pouceline",
    thumbnail: T("poucelina.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/41f548dd-e753-4d99-ada5-e400659d084d/play_480p.mp4",
    category: "Histoires du Soir",
    duration: "9:30",
    description: "Née dans une fleur de tulipe, une minuscule petite fille vit mille aventures à travers un monde immense avant de trouver sa vraie maison.",
  },

  // ── Adventure Tales ─────────────────────────────────────────────────────
  {
    id: 19,
    title: "Jack et le Haricot Géant",
    thumbnail: T("jack-haricot.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/034a0e45-4957-4866-9ba3-ec505cc4c8f7/play_480p.mp4",
    category: "Contes d'Aventure",
    duration: "13:20",
    description: "Avec une poignée de haricots magiques, un garçon courageux grimpe jusqu'à un château flottant dans les nuages, habité par un géant terrible.",
  },
  {
    id: 20,
    title: "Heidi",
    thumbnail: T("heidi.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/56d1ab34-ac39-44e6-829a-d4d9b9bad170/play_480p.mp4",
    category: "Contes d'Aventure",
    duration: "14:00",
    description: "Une petite orpheline vit une vie libre et heureuse dans les Alpes avec son grand-père — jusqu'au jour où on l'emmène vivre en ville.",
  },
  {
    id: 21,
    title: "Le Prince Grenouille",
    thumbnail: T("prince-grenouille.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/5ad88cc0-7e68-41c7-8988-92ff32e86750/play_480p.mp4",
    category: "Contes d'Aventure",
    duration: "11:30",
    description: "Une grenouille qui récupère la balle d'or d'une princesse demande en échange d'être traitée comme une amie. Un baiser brisera-t-il le sortilège?",
  },
  {
    id: 22,
    title: "Le Petit Bonhomme de Pain",
    thumbnail: T("bonhomme-pain.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/eda7b6ee-14f1-4cd0-974e-877d3328737c/play_480p.mp4",
    category: "Contes d'Aventure",
    duration: "7:45",
    description: "Un petit bonhomme de pain d'épice sort du four en courant et crie à tous : Vous ne m'attraperez pas ! Mais le renard, lui, est plus malin.",
  },

  // ── Short Stories ───────────────────────────────────────────────────────
  {
    id: 23,
    title: "La Petite Fille aux Allumettes",
    thumbnail: T("allumettes.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/942d304e-0c28-4553-9974-9f2c509609f1/play_480p.mp4",
    category: "Histoires Courtes",
    duration: "6:20",
    description: "Par une nuit de neige, une petite fille pauvre craque ses allumettes une à une. Chaque flamme lui apporte une vision de chaleur et de bonheur.",
  },
  {
    id: 24,
    title: "Les Trois Petits Cochons",
    thumbnail: T("trois-cochons.jpg"),
    videoUrl: "https://vz-7431b15a-30f.b-cdn.net/de13e74d-6d8e-45a8-b065-f359c872bcc2/play_480p.mp4",
    category: "Histoires Courtes",
    duration: "8:50",
    description: "Trois frères construisent chacun leur maison — de paille, de bois, de briques. Quand le grand méchant loup arrive, qui sera en sécurité?",
  },
]

export const categories = ["Tout", ...new Set(videos.map((vid) => vid.category))]
export const featuredVideo = videos.find((vid) => vid.featured) ?? videos[0]
