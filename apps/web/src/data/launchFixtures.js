const categories = [
  { id: "essays", label: "Essays", slug: "essays", description: "Personal and cultural essays." },
  { id: "opinion", label: "Opinion Pieces", slug: "opinion", description: "Arguments, reflections, and first-person cultural commentary." },
  { id: "short-stories", label: "Short Stories", slug: "short-stories", description: "Creative essays, fiction, and short-form literary work." },
  { id: "reviews", label: "Reviews", slug: "reviews", description: "Books, culture, and media reviews." },
  { id: "interviews", label: "Interviews", slug: "interviews", description: "Conversations with artists and cultural voices." },
  { id: "artwork", label: "Artwork", slug: "artwork", description: "Photography, visual art, and media features." }
];

const profiles = [
  {
    id: "zubayr-charles",
    type: "creative_team",
    name: "Zubayr Charles",
    role: "Creative Director and Editor-in-Chief",
    slug: "zubayr-charles",
    email: "creativedirector@babasandbrasse.com",
    shortBio: "A multidisciplinary writer, theatre maker, published author, and creative lead shaping the Babas & Brasse editorial voice.",
    fullBio: "Zubayr Charles is not your average Creative Director and Editor-in-Chief. By putting his UCT Master's in Creative Writing degree to good use, he has built traction as a local theatre maker with productions such as The Battered Housewives' Club, Please, don't call me moffie, and this bra's a psycho. As a multidisciplinary writer and creative being, he is a published author of the novel Haram and the poetry collection the sad boy's starter pack and other poems. Beyond the page and stage, Zubayr can be found at Saunders Rocks, writing poetry, reading true crime threads, or listening to Indie Rock, SA House, or Yaadt music playlists.",
    image: { url: "/media/team/team-doc-image-1.png", altText: "Portrait of Zubayr Charles" },
    socialLinks: [
      { label: "Email", url: "mailto:creativedirector@babasandbrasse.com" },
      { label: "Submissions", url: "/contact" }
    ],
    submissions: [
      { id: "zubayr-editorial-direction", title: "Editorial direction and creative commissioning", type: "Editorial", status: "Open for submissions", href: "/contact" }
    ]
  },
  {
    id: "mia-lee-winter",
    type: "creative_team",
    name: "Mia-Lee Winter",
    role: "Junior Editor",
    slug: "mia-lee-winter",
    email: "submissions@babasandbrasse.com",
    shortBio: "An editor-in-training with sharp instinct, serious heart, and a focus on how lived experience becomes language.",
    fullBio: "Mia-Lee Winter is our resident editor-in-training. Raised between the mountains and the coast of the Western Cape, she brings sharp instinct and serious heart to everything she writes, reads, and edits. After spending a year abroad, Mia returned to Cape Town with a widened worldview and a fascination with the many ways people turn lived experience into language, art, and meaning. As part of UCT's class of 2027, majoring in English Literature and Linguistics, she is building towards a career in teaching, guided by her core belief in learning for life. She plays one of her six instruments, composes music, collects awards, reads, writes her own work, and advocates for human, animal, and world rights.",
    image: { url: "/media/team/team-doc-image-2.png", altText: "Portrait of Mia-Lee Winter" },
    socialLinks: [
      { label: "Email", url: "mailto:submissions@babasandbrasse.com" },
      { label: "Submissions", url: "/contact" }
    ],
    submissions: [
      { id: "mia-submissions-desk", title: "Submissions desk and editorial review", type: "Submissions", status: "Receiving pitches", href: "/contact" }
    ]
  },
  {
    id: "zoe-petersen",
    type: "creative_team",
    name: "Zo? Petersen",
    role: "Software Developer",
    slug: "zoe-petersen",
    email: "zoetylerhendricks@gmail.com",
    shortBio: "A Bonteheuwel-born developer building digital spaces that uplift communities and amplify South African voices.",
    fullBio: "Zo? Petersen is our software developer and tech enthusiast. Born and bred in Bonteheuwel, she is driven by curiosity, creativity, and a determination to turn her dreams into reality. Passionate about storytelling and the sharing of lived experiences in South Africa, she believes in creating digital spaces that uplift communities and amplify voices that deserve to be heard. Goal-driven and always eager to learn, Zo? will never stop asking why before accepting what. When she is not building websites or exploring new technologies, she is dancing to TikTok trends, chasing her next big idea, and finding inspiration in the stories that connect us all.",
    image: { url: "/media/team/team-doc-image-3.png", altText: "Portrait of Zo? Petersen" },
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/zoe_tyler_petersen" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/zoe-tyler-petersen" },
      { label: "Facebook", url: "https://www.facebook.com/share/17cux1uZkm/" },
      { label: "Email", url: "mailto:zoetylerhendricks@gmail.com" }
    ],
    submissions: [
      { id: "zoe-web-platform", title: "Babas & Brasse web platform", type: "Build", status: "In production", href: "/about" }
    ]
  },
  {
    id: "brick-mbekwa",
    type: "creative_team",
    name: "Brick Mbekwa",
    role: "Graphics Designer",
    slug: "brick-mbekwa",
    email: "brickmbekwa@gmail.com",
    shortBio: "A freelance photographer and self-taught graphic designer creating visuals rooted in community and lived experience.",
    fullBio: "Brick Mbekwa is a freelance photographer and self-taught graphic designer who lives life in full technicolor. Raised in Johannesburg, Brick draws from the richness of multiculturalism to create visuals rooted in community and lived experience. Currently a third-year UCT student, when not behind the lens or a desk, they are out with friends, drinking matcha, or deep in an anime binge. Pronouns: he, she, they.",
    image: { url: "/media/team/team-doc-image-4.png", altText: "Portrait of Brick Mbekwa" },
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/im.brickalicious" },
      { label: "Email", url: "mailto:brickmbekwa@gmail.com" },
      { label: "Media", url: "/featured" }
    ],
    submissions: [
      { id: "brick-visual-identity", title: "Visual identity, photography, and graphics", type: "Media", status: "In production", href: "/featured" }
    ]
  },
  {
    id: "visceral-contributor",
    type: "contributor",
    name: "Lerato Mokoena",
    role: "Culture Essayist",
    slug: "visceral-contributor",
    shortBio: "Writes intimate cultural essays about hospitality, daily rituals, and the changing shape of community.",
    socialLinks: [
      { label: "Read latest essay", url: "/visceral-mag/send-a-text-before-you-knock" },
      { label: "Contributor enquiries", url: "/contact" }
    ]
  },
  {
    id: "sihle-ndlovu",
    type: "contributor",
    name: "Sihle Ndlovu",
    role: "Theatre Critic",
    slug: "sihle-ndlovu",
    shortBio: "Covers rehearsal processes, performance, and the designers building South African stages.",
    socialLinks: [
      { label: "Theatre reviews", url: "/search?category=reviews&topic=theatre" },
      { label: "Pitch a performance", url: "/contact" }
    ]
  },
  {
    id: "mia-van-wyk",
    type: "contributor",
    name: "Mia van Wyk",
    role: "Books Editor",
    slug: "mia-van-wyk",
    shortBio: "Reviews fiction and criticism with particular attention to translation and multilingual craft.",
    socialLinks: [
      { label: "Book reviews", url: "/search?category=reviews&topic=books" },
      { label: "Recommend a book", url: "/contact" }
    ]
  },
  {
    id: "thando-jacobs",
    type: "contributor",
    name: "Thando Jacobs",
    role: "Essayist & Interviewer",
    slug: "thando-jacobs",
    shortBio: "Writes about belonging, language, and the creative communities making culture across the Cape.",
    socialLinks: [
      { label: "Read essays", url: "/search?category=essays" },
      { label: "Contributor profile", url: "/contributors" }
    ]
  }
];

const mediaItems = [
  {
    id: "editorial-theatre",
    title: "The Rehearsal Room",
    type: "image",
    url: "/media/editorial/editorial-theatre.jpg",
    altText: "A South African theatre ensemble rehearsing on a black-box stage",
    caption: "A new generation finding its voice in rehearsal.",
    credit: "Babas & Brasse / ImageGen"
  },
  {
    id: "editorial-books",
    title: "Between Languages",
    type: "image",
    url: "/media/editorial/editorial-books.jpg",
    altText: "A reader turning a page at a book-lined wooden table",
    caption: "Reading, translation, and the material life of books.",
    credit: "Babas & Brasse / ImageGen"
  },
  {
    id: "editorial-belonging",
    title: "On Belonging",
    type: "image",
    url: "/media/editorial/editorial-belonging.jpg",
    altText: "Neighbors talking in a colorful Cape Town residential street",
    caption: "Community, memory, and everyday ideas of home.",
    credit: "Babas & Brasse / ImageGen"
  },
  {
    id: "editorial-language",
    title: "The Language Workshop",
    type: "image",
    url: "/media/editorial/editorial-language.jpg",
    altText: "A diverse writing group discussing pages around a table",
    caption: "Multilingual cultural work built through conversation.",
    credit: "Babas & Brasse / ImageGen"
  },
  {
    id: "editorial-stagecraft",
    title: "Stagecraft and Storytelling",
    type: "image",
    url: "/media/editorial/editorial-stagecraft.jpg",
    altText: "A theatre designer adjusting a miniature stage model in a workshop",
    caption: "The craft and material imagination behind a performance.",
    credit: "Babas & Brasse / ImageGen"
  }
];

const mediaById = Object.fromEntries(mediaItems.map((item) => [item.id, item]));

const articles = [
  {
    id: "send-a-text-before-you-knock-legacy",
    title: "Send A Text Before You Knock",
    slug: "send-a-text-before-you-knock-legacy",
    dek: "On privacy, hospitality, and why arriving at someone's door now begins with a message.",
    status: "draft",
    categoryId: "short-stories",
    authorProfileId: "zoe-petersen",
    publishedAt: "2026-07-01",
    featuredImage: mediaById["editorial-belonging"],
    bodyBlocks: ["A knock at the door used to be ordinary. Now it can feel like a small interruption in a life coordinated by messages.", "This essay considers privacy, hospitality, and the changing rituals around arriving in someone else's space."],
    seo: {
      title: "Send A Text Before You Knock | Babas & Brasse",
      description: "An essay on privacy, hospitality, and the changing rituals of arrival.",
      ogTitle: "Send A Text Before You Knock",
      ogDescription: "Privacy, hospitality, and the changing rituals of arrival."
    }
  },
  {
    id: "baxter-new-voices-review",
    title: "Review: New Voices at the Baxter",
    slug: "baxter-new-voices-review",
    dek: "A draft review of an emerging theatre programme balancing formal ambition with raw new voices.",
    status: "draft",
    categoryId: "reviews",
    authorProfileId: "visceral-contributor",
    publishedAt: null,
    featuredImage: mediaById["editorial-theatre"],
    bodyBlocks: ["The programme puts emerging directors beside established makers and lets their differences remain visible.", "This draft considers where the evening finds a shared theatrical language and where it productively resists one."],
    seo: {
      title: "Review: New Voices at the Baxter | Babas & Brasse",
      description: "A draft review of the New Voices theatre programme at the Baxter.",
      ogTitle: "Review: New Voices at the Baxter",
      ogDescription: "Emerging theatre-makers test a shared stage language."
    }
  },
  {
    id: "inside-the-rehearsal-room",
    title: "Inside the Rehearsal Room",
    slug: "inside-the-rehearsal-room",
    dek: "Five theatre-makers talk about trust, process, and the difficult work of building an ensemble.",
    status: "published",
    categoryId: "interviews",
    authorProfileId: "sihle-ndlovu",
    publishedAt: "2026-07-02",
    featuredImage: mediaById["editorial-language"],
    bodyBlocks: ["A rehearsal room is built from attention before it is built from scenery.", "These theatre-makers describe the rituals, disagreements, and shared language behind an ensemble."],
    seo: {
      title: "Inside the Rehearsal Room | Babas & Brasse",
      description: "A conversation with South African theatre-makers.",
      ogTitle: "Inside the Rehearsal Room",
      ogDescription: "A conversation from the rehearsal room."
    }
  },
  {
    id: "afrikaans-theatre-revival",
    title: "The Revival of Afrikaans Theatre",
    slug: "afrikaans-theatre-revival",
    dek: "A new generation of playwrights is reimagining traditional narratives for contemporary South African stages.",
    status: "published",
    categoryId: "reviews",
    authorProfileId: "sihle-ndlovu",
    publishedAt: "2026-06-28",
    featuredImage: mediaById["editorial-theatre"],
    bodyBlocks: ["Young theatre-makers are bringing fresh perspectives to familiar forms.", "Their work joins tradition and experimentation without treating either as decoration."],
    seo: { title: "The Revival of Afrikaans Theatre | Babas & Brasse", description: "A look at a new generation on South African stages.", ogTitle: "The Revival of Afrikaans Theatre", ogDescription: "A new generation takes the stage." }
  },
  {
    id: "between-languages",
    title: "Between Languages: The Craft of a South African Novel",
    slug: "between-languages",
    dek: "On literary craftsmanship, translation, and the playful possibilities of language.",
    status: "published",
    categoryId: "reviews",
    authorProfileId: "mia-van-wyk",
    publishedAt: "2026-06-24",
    featuredImage: mediaById["editorial-books"],
    bodyBlocks: ["Language shapes both the rhythm and the reach of a novel.", "Reading between languages can reveal what a single vocabulary leaves unsaid."],
    seo: { title: "Between Languages | Babas & Brasse", description: "Literary craft across South African languages.", ogTitle: "Between Languages", ogDescription: "The playful possibilities of language." }
  },
  {
    id: "on-belonging",
    title: "On Belonging: Reflections from the Cape Flats",
    slug: "on-belonging",
    dek: "A personal essay about identity, community, memory, and the meaning of home.",
    status: "published",
    categoryId: "essays",
    authorProfileId: "thando-jacobs",
    publishedAt: "2026-06-20",
    featuredImage: mediaById["editorial-belonging"],
    bodyBlocks: ["Belonging is personal, communal, and political.", "The stories of home carry contradiction as honestly as they carry affection."],
    seo: { title: "On Belonging | Babas & Brasse", description: "Reflections from the Cape Flats.", ogTitle: "On Belonging", ogDescription: "Identity, community, and home." }
  },
  {
    id: "why-multilingualism-matters",
    title: "Why Multilingualism Matters",
    slug: "why-multilingualism-matters",
    dek: "An argument for cultural spaces that reflect the languages South Africans actually live in.",
    status: "published",
    categoryId: "essays",
    authorProfileId: "thando-jacobs",
    publishedAt: "2026-06-16",
    featuredImage: mediaById["editorial-language"],
    bodyBlocks: ["Multilingualism is a creative resource, not a problem to solve.", "Our cultural institutions should make room for the full texture of public language."],
    seo: { title: "Why Multilingualism Matters | Babas & Brasse", description: "A case for multilingual cultural spaces.", ogTitle: "Why Multilingualism Matters", ogDescription: "Language as a cultural resource." }
  },
  {
    id: "stagecraft-and-storytelling",
    title: "Stagecraft and Storytelling",
    slug: "stagecraft-and-storytelling",
    dek: "How set design shapes the emotional and physical world of a performance.",
    status: "published",
    categoryId: "reviews",
    authorProfileId: "sihle-ndlovu",
    publishedAt: "2026-06-12",
    featuredImage: mediaById["editorial-stagecraft"],
    bodyBlocks: ["A set is never only a backdrop.", "The best stagecraft reveals meaning through space, material, light, and movement."],
    seo: { title: "Stagecraft and Storytelling | Babas & Brasse", description: "The art of local set design.", ogTitle: "Stagecraft and Storytelling", ogDescription: "How design transforms performance." }
  },
  /* Imported content from Content.zip */
  {
    "id": "on-poets-delving-into-the",
    "title": "On Poets: delving into the",
    "slug": "on-poets-delving-into-the",
    "dek": "On Poets: delving into the ? mind of Shane Van Der Hoven",
    "status": "published",
    "categoryId": "interviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "On Poets: delving into the ? mind of Shane Van Der Hoven",
        "Jennifer Morris interviews Shane Van Der Hoven on their poetry collection, Kruiper- Crawler",
        "Publisher: uHlanga Press",
        "Date Released: December 2025",
        "Price (incl. VAT): +R 250.00",
        "Format: Soft cover, 90 pages",
        "Shane van der Hoven is a poet, scholar, and translator. They are completing their PhD at UCT’s School for Languages and Literatures and are a co-editor at the multilingual literary magazine, New Contrast.",
        "JENNIFER TO EDIT THE COLLECTION’S DESCRIPTION.",
        "Kruiper-Crawler is described as a collection of poetry unlike any other due to its queer, radical, multi-segmented subject matter. The collection’s thirty-something poems are presented both in Afrikaans and English, the translations differing, interfering with, or sometimes even contradicting each other. Kruiper-Crawler sees Shane van der Hoven explore both the sprawling lowveld and the decaying South African city through the metaphor of the Biblical crawler – the grotesque, misunderstood, and unfairly maligned creatures of the earth and scrubland. Infested with irony and literary allusion, Kruiper-Crawler’s exoskeleton may seem tough and spiny. But break through to its soft interior, and find yourself in a world of self-doubt and linguistic uncertainty, a deep love of the unknown, and, at its core, a young poet discovering what kind of creature they might be.",
        "With its rave reviews and ? , Kruiper-Crawler has been shortlisted for the University of Johannesburg Debut Prize for Afrikaans. In a particularly strong year for poetry, Shane has been shortlisted alongside Jennifer Pape and Klara du Plessis."
    ],
    "seo": {
        "title": "On Poets: delving into the | Babas & Brasse",
        "description": "On Poets: delving into the ? mind of Shane Van Der Hoven",
        "ogTitle": "On Poets: delving into the",
        "ogDescription": "On Poets: delving into the ? mind of Shane Van Der Hoven"
    },
    "featuredImage": mediaById["editorial-language"]
  },
  {
    "id": "on-writers-flying-cows-and-other-traumas-by-philisiwe-twijnstra",
    "title": "On Writers: Flying Cows and Other Traumas by Philisiwe Twijnstra",
    "slug": "on-writers-flying-cows-and-other-traumas-by-philisiwe-twijnstra",
    "dek": "Zubayr Charles and Philisiwe Twinjnstra chat about short story writing",
    "status": "published",
    "categoryId": "interviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Zubayr Charles and Philisiwe Twinjnstra chat about short story writing",
        "This is not a review.",
        "Now that that is out of the way, I want to say that there is something about a short story. Despite the name, I find that, when done correctly, a short story can be everlasting. Impactful. Insightful. There is something about a short story that draws me close. I",
        "There are short stories I still remember from high school. Then, being on the other end as a teacher of English for nine years, there are many, many, many short stories that still live rent-free in my mind.",
        "For as long as I can remember, I’ve always dreamed about being a short story writer, living a bohemian life at a seaside cottage, smoking menthol cigarettes, and writing short stories for a living. Not only did my life and writing career take a totally different turn, but little did I know that one obviously cannot make a living off of writing only short stories, let alone afford a seafront cottage. But, hey, what’s a man without dreams?",
        "Ironically, even though it's the shortest, I find it the most difficult medium to write in.",
        "I still love reading short stories, especially an entire short story collection. I love the effect one writer can create, so many different worlds within a few hundred pages of different short stories.",
        "Then, there is also the beauty of getting to travel through different locations in a short story collection. And there's just such a beautiful, vivid, almost tangible feeling that I have on the tips of my fingers to describe, but I can’t either. It's not to say that novels can't capture this experience, but there are very, very few short story writers who can do this. I would like to place Philisiwe Twijnstra in that category, but more on that later.",
        "When I first saw the cover Flying Cows and Other Traumas, not only was it the striking colours that drew me in, but it was, of course, the weird and catchy title. I am a sucker for anything weird.",
        "And then I started reading."
    ],
    "seo": {
        "title": "On Writers: Flying Cows and Other Traumas by Philisiwe Twijnstra | Babas & Brasse",
        "description": "Zubayr Charles and Philisiwe Twinjnstra chat about short story writing",
        "ogTitle": "On Writers: Flying Cows and Other Traumas by Philisiwe Twijnstra",
        "ogDescription": "Zubayr Charles and Philisiwe Twinjnstra chat about short story writing"
    },
    "featuredImage": mediaById["editorial-language"]
  },
  {
    "id": "who-is-theatre-actually-for",
    "title": "Who Is Theatre Actually For",
    "slug": "who-is-theatre-actually-for",
    "dek": "Who Is Theatre Actually For?",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Who Is Theatre Actually For?",
        "Zizi Masizana, emerging theatremaker and actress, explains the concept of “Peer Cheer”",
        "In January this year, I applied to Theatre Arts’ call-out for its inaugural “Developing Writers to Write on Theatre” workshop – a great opportunity for me as both a theatre-maker and actress to make sense of a growing concern within my own practice and observations around theatre. As part of the application, I was tasked to articulate my understanding of what the value of theatre reviewing. With that question in mind, I reflected on the absence of sustained, rigorous critical engagement within contemporary South African theatre on the part of audiences.",
        "I, thereafter, reflected on my observations as a university student and emerging theatre-maker, and coined the term “peer cheer” as a persistent, unexamined approval within theatre-making communities. I made sense of “peer cheer” as the reflexive affirmation that replaces true critique within theatre. Peer cheer refers to the generous applause and the obligatory standing ovations of audiences at the end of a performance. This is a language of support that often stops the true interrogation of theatre, and in many cases, it impedes any serious emotional or critical engagement at all.",
        "I am not describing the way audiences or “peer cheer” as being a malicious act. These reactions often come from care, scarcity, and the need for artists to hold one another up in an already fragile ecosystem. We show up for one another because we understand how difficult it is to make work at all. But this support becomes limiting when it replaces honest critical engagement. If artists, who are not lay spectators, respond only with affirmation, then the work is protected from the very critique that could help it grow.",
        "As an emerging artist, and as in my observations watching theatre, I have noticed that theatre is still predominantly inaccessible to many South Africans, thus resulting in those who do generally show up to productions doing so because they are supportive friends, family, and colleagues.",
        "Inadvertently, a ripple effect is created, and theatre is therefore made to please institutions and their overarching power structures, for peers, for industry insiders, for those already within. The audiences in these cases are familiar, predictable, and contained, resulting in the distortion of the role of the audience and consequently the integrity of the craft. Audiences don’t feel or behave as active witnesses or participants in meaning-making, but instead are extensions of the creative community. Audiences are too sympathetic toward the craft of theatre-makers and performers alike, whoever the individual they have shown up to support is. Oftentimes, applauding for the sake of applauding, without being thoroughly engaged or gripped by the work. More often than not, they are reluctant to disrupt the atmosphere, especially when audiences have already shown up to support the artists they came to see.",
        "Meanwhile, and on the opposite end of the spectrum, another audience is quietly taking precedence: funders, gatekeepers, selection panels, and institutional bodies. We are seemingly expected to orient our work toward gaining approval rather than actively engaging and encountering our craft. Each of us, in theatremaking, is indirectly auditioning for proximity to someone with a seat at the table, who will mention our names in rooms we are yet to enter. Applications, proposals, and theatre to its core then becomes a compliance framework, shaped by the aesthetic and conceptual direction of theatre corporately, more than the communities from which it emerges or the publics it seeks to engage.",
        "There is a dissonance.",
        "Theatre is a public art form. Particularly in the South African context: one which should reflect, challenge, and engage with our nuanced society – yet, much of the work circuits within limited loops of validation from other artists, funders, boards, and panels."
    ],
    "seo": {
        "title": "Who Is Theatre Actually For | Babas & Brasse",
        "description": "Who Is Theatre Actually For?",
        "ogTitle": "Who Is Theatre Actually For",
        "ogDescription": "Who Is Theatre Actually For?"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "women-should-decenter-men-jesca-nduna",
    "title": "Women should decenter men – Jesca Nduna",
    "slug": "women-should-decenter-men-jesca-nduna",
    "dek": "Women should decentre men",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Women should decentre men",
        "Jesca Nduna speaks directly to women, encouraging them to stop shrinking themselves for men.",
        "I’ve had countless conversations about decentring men, and often I’ve seen that we hop on these trends not fully knowing – or then actually grasping – the concept of what is being discussed.",
        "A perfect example is the “men are trash” discourse.",
        "Are all men actually trash?",
        "However, I believe women have encountered enough horrible men in their lives to justify this unfortunate generalisation. If a man knows he is not horrible, why should the “men are trash” statement offend him?",
        "Let’s talk about decentring men.",
        "What does this actually mean?",
        "Although Michael S. Kimmel appears to have used the phrase “decentering men” as early as 1992, he used it to argue that scholars should study men as gendered social actors rather than assuming that men’s experiences represent a universal human experience. In 2019, however, Sherese “Charlie” Taylor reconfigured the phrase into a contemporary feminist framework and self-help practice. According to her, the concept of “decentring men” refers to prioritising your own needs and happiness as a woman, and unlearning the societal conditioning that encourages women to alter their appearance, behaviour, and desires to accommodate men and prioritise male comfort and ego.",
        "Decentring men does not mean you should hate men, or should you spit in their faces when they speak – it just means that men are no longer the primary audience of our existence as women. To put it in simpler terms, decentring men is putting your needs above the needs of a man."
    ],
    "seo": {
        "title": "Women should decenter men – Jesca Nduna | Babas & Brasse",
        "description": "Women should decentre men",
        "ogTitle": "Women should decenter men – Jesca Nduna",
        "ogDescription": "Women should decentre men"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "finding-myself-finding-my-voice",
    "title": "Finding Myself. Finding My Voice",
    "slug": "finding-myself-finding-my-voice",
    "dek": "Finding Myself. Finding My Voice.",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Finding Myself. Finding My Voice.",
        "Shaheena Links Reflects on the Stories Missing from South African Bookshelves",
        "Tolkien. Bradbury. Atwood. Dahl. Blyton. Dickens.",
        "Growing up, I was an avid reader.",
        "I am fairly certain I slid out of my mother’s womb with a book in my cherubic little hands!",
        "Other versions say I started reading when I was four years old – this sounds more plausible.",
        "Needless to say, I grew up reading from a young age, mostly Eurocentric authors. I never questioned that and did not see a problem with it. I did not even think it was possible for authors not to be white.",
        "Luckily, in the early 2000s and my early twenties, I discovered Black, Indigenous, and People of Colour (BIPOC) authors, and I saw myself, or versions of myself, reflected on pages. Still, those rare moments were not nearly enough, because by that point, years of reading Eurocentric stories had already shaped my understanding of what kind of stories mattered.",
        "Recently, I started to question why.",
        "Why, in a post-apartheid South Africa, a country that is so diverse that it has eleven official written languages, do I still struggle to find stories that reflect experiences that are far removed from my own, my people, our cultures and communities?"
    ],
    "seo": {
        "title": "Finding Myself. Finding My Voice | Babas & Brasse",
        "description": "Finding Myself. Finding My Voice.",
        "ogTitle": "Finding Myself. Finding My Voice",
        "ogDescription": "Finding Myself. Finding My Voice."
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "coloured-mixed-jennifer",
    "title": "Coloured : mixed Jennifer",
    "slug": "coloured-mixed-jennifer",
    "dek": "Jennifer Morris reflects on the duality of being both mixed race and Coloured",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Jennifer Morris reflects on the duality of being both mixed race and Coloured",
        "The concept of having to clarify my race, as a mixed-race, Coloured woman, was not an experience I saw myself having before. Now, I am ready to have that conversation.",
        "In my early upbringing, I never had to explain who I was to my family; therefore, naturally, when I started primary school I began to question my identity more than ever. What I didn’t account for was the fact that in South Africa, it’s the norm to ask about race first, and then the other questions follow.",
        "Why do you sound like the coloured, but look like a South African black woman?",
        "You can speak your mother tongue?That's disappointing.",
        "I remember that nauseating feeling twisting inside when I saw children on the playground eyeing me up and down. The whispers lingered in the air as I approached their group. Their inside jokes and side eyes quickly reminded me I didn't belong even if people said I looked like a South African Black girl.Their snickering struck my confidence and forced me to confide in a persona that didn't care about what anyone had to say. The Lord alone knew how I craved acceptance and acknowledgement of my existence.",
        "Jennifer but you darker than us , you just sound Coloured",
        "Jennifa you not black you sound like a Coloured",
        "My mother is a Coloured, South African, born in George, and my father is Black, Zimbabwean man , born Zimbabwe. Without my knowledge, it seemed as though my mixed identity of being Coloured and Black was separated. Culturally, I identified as a Coloured woman, but due to my father’s prominent gene in my physical features , I am half black and I am mixed raced too.",
        "When individuals racially categorise themselves as Coloured, I assumed it meant that both paternal and maternal parties are Coloured too."
    ],
    "seo": {
        "title": "Coloured : mixed Jennifer | Babas & Brasse",
        "description": "Jennifer Morris reflects on the duality of being both mixed race and Coloured",
        "ogTitle": "Coloured : mixed Jennifer",
        "ogDescription": "Jennifer Morris reflects on the duality of being both mixed race and Coloured"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "dating-in-2026",
    "title": "Dating in 2026",
    "slug": "dating-in-2026",
    "dek": "The more we connect, the less certain we become",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "The more we connect, the less certain we become",
        "Abubakr Abels reflects on the impacts of dating in 2026",
        "Now, what is dating even?",
        "I could start with the definition. According to Cambridge University Press, dating refers to “the activity of regularly spending time with someone you are romantically interested in, with the aim of getting to know them better or developing a romantic relationship.” Sounds simple enough, right?",
        "Well, I hate to be the bearer of bad news, but in this day and age, the definition proves otherwise.",
        "Well, not to ruin the vibe, but in today’s dating landscape, the definition proves otherwise.",
        "Dating in 2026 is strangely contradictory.",
        "Although there are more ways for people to connect than in any other generation before us, I have never felt more uncertain of our standing with each other.",
        "I was ? when I dated my first bf. We met on ?",
        "Describe the relationship. Even if it was for three months."
    ],
    "seo": {
        "title": "Dating in 2026 | Babas & Brasse",
        "description": "The more we connect, the less certain we become",
        "ogTitle": "Dating in 2026",
        "ogDescription": "The more we connect, the less certain we become"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "essay-10-live-the-question",
    "title": "Essay 10 - Live the Question",
    "slug": "essay-10-live-the-question",
    "dek": "Live the Question. Navigate Uncertainty.",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Live the Question. Navigate Uncertainty.",
        "Luke Green Thompson reflects on art, life, and the lived experience.",
        "I have a love affair with art.",
        "I marvel at great literature, rejoice at exceptional music, indulge in film, and leave plays awestruck.",
        "I embrace the arts as my path to fulfilment and my bridge of connection with my fellow human beings.",
        "Most of all, I turn to art hoping that the end of some brilliant story will bring me greater clarity on how I should live my life.",
        "There are those films and novels, however few, that leave me changed afterwards, in ways that I can never anticipate. They provide perspective, broaden my world view and challenge my deeply held beliefs. In their splendour, they make Life feel like a kaleidoscope of human experience that I hope to learn from, yet they still lack the answers to Life’s questions that encircle my head constantly.",
        "Ironically, although I have a love affair with art, the Arts cannot provide the same life lessons that experience can, and some may argue",
        "In this tragic and ironic way, although I have a love affair with art, the Arts can also falls short // before the great teacher that is Experience and some may argue, as Oscar Wilde did, that “life imitates art far more than art imitates life”.",
        "I am not here to settle that debate, but rather say that it is in this tug-of-war between Art and Life that I find myself."
    ],
    "seo": {
        "title": "Essay 10 - Live the Question | Babas & Brasse",
        "description": "Live the Question. Navigate Uncertainty.",
        "ogTitle": "Essay 10 - Live the Question",
        "ogDescription": "Live the Question. Navigate Uncertainty."
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "my-hair-my-choice",
    "title": "My Hair. My Choice",
    "slug": "my-hair-my-choice",
    "dek": "I am obtuse, and I love it.",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "I am obtuse, and I love it.",
        "Jennifer Grace Morris reflects on her journey with finding her feet as a mixed race Coloured woman.",
        "I stand in front of my dresser mirror, picking out the edges of my brown-blackish afro, making sure that it looks like a fluffy cloud framing my face. I can't stand a deflated afro. My eyes glance to the primary school pictures of me in my maroon uniform framing the walls. Suddenly, pride fills my chest as my bedroom lights warm the room as the sun sets below the curtains.",
        "I can’t help but reminisce about a time when my hair wasn’t always this vast exploration of my identity.",
        "In 2016, I was at Mountain Road Primary School, and already I had the dysfunctional thought that Coloured girls had to have a specific hair type. At that time, children my age were talking about who they were going to be playing marbles with and what food they were going to eat at lunch. I'm spending my last period of lunch thinking about who I am going to sit with. The Cape Malay girls with shiny, sleek black hair sat in one corner, and the girls with braids and cornrows sat in another corner. The boys never seemed to be worried about hair; they were more concerned about who played soccer best.",
        "The girls never said anything, but who needed words when side eyes spoke the loudest? I remember as I walked out to the playground, a group of girls with middle parts in loose ponytails snickered as I walked towards them. I turned myself right around and received the same rejection from girls in tight cornrows. In that light, I received either not being Black enough or not being Coloured enough. My tight, coily curly hair was too thick to be considered Coloured, and my accent was too thick to be considered Black. That's when I resorted to the fat, racially obtuse character that kept everyone laughing or entertained instead of questioning where I belonged.",
        "After begging my mom for hair that blows in the wind, she took me to the salon for a fresh blowout and flat iron. As excited as I was, sitting in that black leather salon chair, I couldn’t help but stick out like a sore thumb. Looking in the mirror in front of me, with the shrinkage of my hair looking back at me, I turned over to the right and the left and realized I slapped me. All the women around me had a uniform look: they were all coloured with straight hair. It was at that moment that an unspoken standard stood out, and it was clear as day that I didn’t particularly fit that standard.",
        "My hair, in stark contrast to the flowy straight hair, was thick and tight 4c type coils in the back and 4b in the front. It took me years to understand these. In primary school, my hair was dik [thick] with heat-damaged hair from attempting to straighten my hair every morning for a couple of days.",
        "My mother had always been an advocate for the fact that there were different variations of Coloured. She reinforced that the term Coloured was not only about the texture of my hair, but also the culture that surrounded me. However, I still chased after acceptance. Even though yes, I was a mixed-race Coloured woman with a Coloured mother from ?, and a Black father from Zimbabwe – a long story for another published piece -- I never thought that my hair in its natural coily state screamed Coloured, so instead of thinking there were different types of Coloured, I just believed what I saw.",
        "In our Coloured community, there has always been this silent notion that hair was the gatekeeper of your identity. During the early 2000s, it was socially embedded that the way you style it, dye it, or even comb it spoke volumes about the image you wanted to portray – my flat-ironed hair, at the time, spoke to the representation that ???. Still, I was not satisfied."
    ],
    "seo": {
        "title": "My Hair. My Choice | Babas & Brasse",
        "description": "I am obtuse, and I love it.",
        "ogTitle": "My Hair. My Choice",
        "ogDescription": "I am obtuse, and I love it."
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "religion-is-my-coping-mechanism",
    "title": "Religion is my coping mechanism",
    "slug": "religion-is-my-coping-mechanism",
    "dek": "Religion is a coping mechanism",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Religion is a coping mechanism",
        "Jesca Nduna reflects on how she survived when life got difficult",
        "I would like to begin this by saying I am a believer in Christ, but my mind has been in a really dark place lately.",
        "I don't recall when it started, but somewhere in between losing my job, the raging daddy issues, or almost being homeless, I started questioning it all: my faith, the church, religion, and God himself.",
        "I started asking myself what the purpose of life is.",
        "Maybe the transition from high school to adulthood was a bit rough. Life quickly became overwhelming and I did not feel equipped to handle all the challenges, I soon realised I was not living the life I had envisioned for myself",
        "I started looking for comfort. And of course, I found comfort in the Bible, and the word of God.",
        "I did every prayer, fasting, and believed in a breakthrough.",
        "I would be so convicted that surely there was more for me than splitting rent with my mom. I look at my peers who have degrees while I don't and still haven't managed to change that. My job does not pay me enough and it often leaves me stuck. I believed no matter my current situation , the God I prayed to would hear my prayers and make my life better than it is",
        "After the days turned into months, and the months turned into years, I started questioning again. God, have I not prayed? Have I not fasted? Have I not sought you with all my heart? I felt deeply hurt, as if my prayers were going unheard and returning void. I began to feel that even God, the one I believed would help me navigate through this life, had abandoned me and that left me with a profound sense of loneliness."
    ],
    "seo": {
        "title": "Religion is my coping mechanism | Babas & Brasse",
        "description": "Religion is a coping mechanism",
        "ogTitle": "Religion is my coping mechanism",
        "ogDescription": "Religion is a coping mechanism"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "self-expression-edited-bulela",
    "title": "Self Expression Edited (Bulela)",
    "slug": "self-expression-edited-bulela",
    "dek": "Authenticity: The Disappearance of Something Real",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Authenticity: The Disappearance of Something Real",
        "Bulela Nxokwana reflects on the rising tension between authentic self-expression and conformity.",
        "In a world full of curated realities, performative identities, and pretentiousness, authentic self-expression remains endangered and queered. Still, authentic self-expression is questioned, and often made to feel strange. Underneath the layers of these false identities lies the heavy pressure of cultural expectations, digital surveillance, as well as the constant desire to be seen, heard, and considered, and we are being consumed by it. And as a result, the systems of society that govern us force us to pack away and limit our uniqueness and authenticity. We make ourselves palatable and small by hiding the parts that are deemed unacceptable.",
        "We are constantly told to be ourselves, to be confident, to be authentic, to be real, to be raw, and to never feel shame to be what and who we are meant to be – yet, at every corner we turn, there are terms and conditions to how this authenticity is to be expressed.There is an existing invisible script that dictates what authentic self-expression looks like: how we should walk, talk, dress, behave, and look. And anything that is not written in this script is seen as peculiar. People who rebel against what is supposed to be the norm are outcasted, sidelined, and made to feel like outsiders.",
        "What is it about being authentic that is so intimidating and unsettling?",
        "On the one hand, the institutions that govern us encourage authentic self-expression but limit it to what is palatable to society, and anything that does not follow the script is seen as some form of resistance. Those who dare to be different, dare to live in the truth of their difference, dare to refuse conformity and rebel against this invisible box are pushed to the sidelines and are silenced. They are vilified and are made to be seen as the very beings that somehow disrupt harmony.",
        "What is it about being authentic that is so intimidating and unsettling?",
        "From an early age, I'd like to think I've always known who I was meant to be. The younger version of me was always so expressive – an effeminate, little black boy from the outskirts of Mdantsane, Eastern Cape, who was never afraid to be himself despite being alienated by those who were around him. I have always been fascinated by movies, and everything to do with having to imagine and live in a world that was beyond reality. As a child, I always enjoyed recreating the worlds of all the cartoons and other kids tv shows I watched. I enjoyed it because it really allowed me to dream beyond what I was always told was possible, and it felt as though in those worlds, I could do and be anything I wanted to be. It also gave me a break from my actual reality of being bullied as a child, amoungst other traumatic events. I guess it was always a way to cope with it all. I had a very creative imagination, and in my primary school days, my teaches used to always tell me they enjoyed reading my creative writing because I was a very expressive learner, even externally. I was a smart child throughout my primary school days, always amongst the top 3 in the grade. I was often described me as creative, and very particular in how I spoke and carried myself. They always told me I carried this 'quiet' confidence that was subtle but very evident. Very disciplined, quiet and well-behaved and never without a smile. Life changed when I turned thirteen, and the pressure to conform became heavier, so heavy to the point where that little feminine boy was forced into hibernation for the duration of what was to be my high school and teenage years. This seemingly drasic shift for me came just before I had to enroll in high school.",
        "Being authentic and true to myself became dangerous because of the conservative environment that I had began to realize I was in, and it was all I had ever known at that time. I had never been outside of the Eastern Cape, except for the one time in grade seven, where we went to a week long marimba competition in Johannesburg, and the other time in grade 8 where i went on a marimba tour in Germany in the following year. High school was probably one of the most horrible and traumatic experiences I have ever had to date. The bullying was extremely brutal. It was physical, mental and emotional, and as a result, I was heavily depressed throughout. When I look back now, I always wonder how I managed to survive that environment. I was othered because I was skinny, feminine and I had a 'girly' voice. It felt as though I was thrown into the middle of the dessert and I had to find a way to survive, and somehow I managed. The high school I went to was in the suburbs of East London, most of the male teenagers there were very obsessed with sport, the gym, having a girlfriend and anything that kept their adrenaline high. Unfortunately for me, I ticked none of those boxes and it was very evident. And that was the thing put a target on my back.",
        "In the midst of all of it all, I tried to find extracurricular activities where I was hoping to meet like-minded individuals and drama club seems to be the one that resonated with me the most. It was a bit funny because all the other \"weird\" and socially awkward, and smart people were part of it. It became a safe space and it was truly a judgement free zone. I realized that I enjoyed portraying other people's realities, for the same reasons I enjoyed playing and becoming different characters as a child, but it also became a place where I could express myself, my thoughts and my feels through these embodiments of these different characters. I realized that it was liberating and freeing for me because I could say what I felt and what I was thinking, and no one would think it came from me because it was being said by the characters. I also realized that as humans, we experiences a lot of similar traumas and that we go through similar situations, and for me I thought embodying these different characters and telling these stories would make other people feel seen as well. It was for these reasons as well where I started imagining myself studying theatre, because of what we would learn in the drama club. I fell in love with it to the point where I did dramatic arts as a subject in Grade 11, after dropping physical sciences. But despite having had this safe space, I still could not be myself, outside of that environment."
    ],
    "seo": {
        "title": "Self Expression Edited (Bulela) | Babas & Brasse",
        "description": "Authenticity: The Disappearance of Something Real",
        "ogTitle": "Self Expression Edited (Bulela)",
        "ogDescription": "Authenticity: The Disappearance of Something Real"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "from-silence-to-spotlight",
    "title": "From Silence to Spotlight",
    "slug": "from-silence-to-spotlight",
    "dek": "Robyn Reid reflects on how the arts saved her life",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Robyn Reid reflects on how the arts saved her life",
        "Growing up, the arts and music were always part of my life.",
        "Sunday school revolved around music and drama. We would act, tap into character, learn lines, and sing songs.",
        "I started as this shy, introverted person, but when I needed to sing, it was as if something just sparked within my body. Music and performing made me feel warm inside and just helped me feel like a human being. Growing up, the arts and music were always part of my life.",
        "Sunday school revolved around music and drama. We would act, tap into character, learn lines, and sing songs.",
        "I started my journey through life as this shy, introverted four year old little girl, but when I needed to sing, it was as if something just sparked within myself. Music and performing made me feel warm inside and just helped me feel like a human being.",
        "Living in the Cape Flats and coming from a lower income household meant that resources such as transportation weren’t always easily accessible. However, we had a helping hand from our superintendent of the Sunday school, who would always provide his services. His name was Mr. Arthur Arries, a kind middle-aged man who was a father figure to everyone within the Sunday school. He was liked by all of us",
        "because of the kind things he did for us, such as buying us luxuries to make us feel special and included.",
        "Each day, after school, my cousins and I would gather at my grandparents’ place and do a pre-rehearsal. I would always opt for doing the lead singing, as I would pretend to be the diva. My alter ego burst into being, and strangely enough, my cousins never tried stopping me – they must’ve known back then what I never in my wildest dreams knew: that this should be my destiny.",
        "At the young age of just six years old, each day after school my cousins and I would gather at my grandparents’ place and do a pre-rehearsal. I would always opt for doing the lead singing, pretending to be the diva. My alter ego burst into being, and strangely enough, my cousins never tried stopping me—they must have known what I never dreamed: that this would become my destiny."
    ],
    "seo": {
        "title": "From Silence to Spotlight | Babas & Brasse",
        "description": "Robyn Reid reflects on how the arts saved her life",
        "ogTitle": "From Silence to Spotlight",
        "ogDescription": "Robyn Reid reflects on how the arts saved her life"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "to-may-favourite-customer",
    "title": "To May Favourite Customer",
    "slug": "to-may-favourite-customer",
    "dek": "Please know, it is with a heavy heart when I tell you that I am afraid of you.",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Please know, it is with a heavy heart when I tell you that I am afraid of you.",
        "I really wanted you to be a nice, sweet older man who had social anxiety and enjoyed talking to everyone. You certainly seemed that way.",
        "You asked me for coffee, and even though I thought maybe best not to, you asked me at my place of work. I have said, \"Yes, maybe sometime,\" to so many men. I say, \"maybe sometime,\" because I am afraid of you. Of all of you. I'd much prefer it if men only wanted to sleep with me. Not love me.",
        "I didn't think anyone made real plans these days. Not with girls at bookstores who are obliged to sit and talk to you for half an hour, because we are not allowed to say, \"Please leave me alone,\" when you were just being nice. I thought I was just being nice.",
        "I am scared that you might be watching me, as I say this. I am scared you will walk through the store doorway. And I have thought, over and over again, about how I would grab my phone and something sharp, and run to lock myself in the bathroom at the back. It's about five meters away. I could make it. But I saw you run once, and in that moment I knew something was not right. It was too frantic, too desperate. And your hands stayed by your sides, and splayed out. You scared me. I don’t know why but you scared me. And I know that you could catch up with me, if you tried.",
        "I think about the fact that the lock in the bathroom isn’t very strong. I think of you breaking down the door, or calling after me, just asking to talk. I think about calling all the men in my life who have said I must let them know if you ever come around. And I expect all of their phones to be on silent. They like the idea of being my protector. They like picturing it in their heads. Their strength, their intimidation tactics, their bravery. But I expect it will be too late when they check. What could be so urgent anyway?",
        "I think about what my father said: that I must remind you of your wife and family. And I must not ask for permission, and I must tell you that it has all gotten quite \"creepy.\"",
        "But I am scared of what you will do. I asked you to leave me alone, and you called me an hour later after your dramatic farewell. Please stay away from me. I have given you enough chances. Please.",
        "I keep thinking I've been such an awful person to you. Because what did you really do? What proof is there?",
        "I think, again, of being nice, and I hate myself for being nice. Yet I hate myself for being afraid of you. I know how men like you deal with rejection. But what did I do to make you think of me? I must have done something. Is it because I got so bored of you talking at me that I shared a little about myself?"
    ],
    "seo": {
        "title": "To May Favourite Customer | Babas & Brasse",
        "description": "Please know, it is with a heavy heart when I tell you that I am afraid of you.",
        "ogTitle": "To May Favourite Customer",
        "ogDescription": "Please know, it is with a heavy heart when I tell you that I am afraid of you."
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "the-body-as-a-living-archive",
    "title": "The Body as a Living Archive",
    "slug": "the-body-as-a-living-archive",
    "dek": "Jude Hunt reflects on ???",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Jude Hunt reflects on ???",
        "When you have tasted illness too often, and lived to smell the aftermath, the relationship you have with your body never really feels stable. But when I was eventually able to start taking testosterone, it felt like I was embodying my flesh for the very first time. I banked on having a full beard by the time I finished my first vial, but within two weeks my patience was obliterated. I wanted facial hair now, that very moment. I still do. No one really tells you how your features will emerge, just that it is ‘different for everyone’. My favourite facial feature is my nose; it’s finally as broad as my mother’s. The less delicate my features become, the more people stare at me. It is like I was being registered as myself for the very first time. Still, no matter how visibly myself I have become, at the end of each day I return home and face my ancestry in the mirror. The lineament on my brow is my fathers; this I can say without doubt. The hair on my toes hasn’t changed much, it’s always been there to remind me of my mother’s mother, of her androgynous divinity. When I smile, my eyes shine with the sun her soul left behind. Someone must carry the joy forward.",
        "I have acne mapped like stars along my jawline, which gets inflamed if I don’t get to take my dose each week as prescribed. As time passes, I realise it’s just the precursor to my facial hair. There are thick random stray strands, and then there are patches of thick hair that you can’t really see unless you’re up close to me. On my chin, there is a single black strand that curls and points back to my jugular. When I am thinking, I stroke my face and play with the fluff. I think back to how I would lather my face with my grandfather’s shaving cream in the shower before my first puberty ruptured my spirit. and with the backside of the razor, I drag streaks through the white foam and lean closer into the mirror as I scan my face for any changes. Nothing. Now when I shave, I look like a young teenage boy, even though I’ve just turned twenty-four and my spirit feels about sixty. I get asked for my ID when I’m trying to buy cigarettes at the Tops, or when I walk into a bar to play some pool. So, I leave my stache on my top lip and trim it as neat as I possibly can. Hair has started sprouting from my bottom lip and down my neck. It hurts my skin to shave, so I do it as seldom as possible now. Puberty still sucks, maybe just a little less than when you’re a teenager.",
        "Even with all the exterior changes, nothing splayed itself inside my mind more than what the testosterone was doing to the platelets in my blood. They say that joy lives in your blood, that it travels and makes itself at home in your bloodstream. The internet says that depo-testosterone increases platelet activity; this increases the chance of blood clots, but luckily for me I need this boost. After my first round of blood tests, my doctor tells me that the platelets are back up to 150 000 per microliter of my blood. I choke on my tongue when she breaks the news. It’s not been so high since I was diagnosed. Even after the chemotherapy treatment, my platelet counts never exceeded 80 000. It just so happened that I would start HRT, and stumble to discover a cure to my internal bleeding. The more joy I let myself express, the more I heal. I blossom from the inside out and carry my journey with pride. I wear my skin like a king, and I get to keep my spleen (for now).",
        "Every part of my flesh tells a story, and testosterone has further unsettled the sequence of these stories. What takes place in my body is not merely transformation, but a revival of the joy I lost in clumps and strands along the way. Where the stream of joy was intermittent before, it is robust now. This is chemical and spiritual, it is a testimony to all the little moments of joy which have survived with me to this point. My gender expression is a part of my retribution. My body is a living story of my illness and survivorship but also a living archive that demonstrates the spirituality of gender. But at first glance, this isn’t obvious. The entire world can have a series of full-frontals of my naked body, but no one will entirely understand the experiences marked inch by inch in my flesh. I could pose and you will see the muscle in my limbs, the strength in my core, but would you be able to say what it took to mend this? Would you be able to tell how fresh my poise is? Are you able to map the scars of my survival, or the blossoms of my joy?"
    ],
    "seo": {
        "title": "The Body as a Living Archive | Babas & Brasse",
        "description": "Jude Hunt reflects on ???",
        "ogTitle": "The Body as a Living Archive",
        "ogDescription": "Jude Hunt reflects on ???"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "we-wear-rules",
    "title": "We wear rules",
    "slug": "we-wear-rules",
    "dek": "We wear rules. We wear clothes.Valden Prince reflects how clothing has never had a genderWhen I walk into almost any clothing store, I notice the same invisible line: one side is l",
    "status": "published",
    "categoryId": "opinion",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "We wear rules. We wear clothes.Valden Prince reflects how clothing has never had a genderWhen I walk into almost any clothing store, I notice the same invisible line: one side is labelled “men”; the other is labelled “women” – but do the clothes, themselves, know the difference?",
        "I know this sounds silly, as clothing isn’t alive, but I will make sense – shortly.",
        "Somewhere along the way, we decided that colours, fabrics, shoes and silhouettes belonged to certain genders.",
        "Pink became feminine.",
        "Blue became masculine.",
        "Skirts were ? for women.",
        "Suits were ? for men.",
        "We created rules, repeated them often enough, and eventually treated began treating them as though they were natural laws – yet, they aren’t.",
        "I’ve always found that ?? is strange, because fashion has always evolved when someone questioned the rules.",
        "High heels were originally worn by men."
    ],
    "seo": {
        "title": "We wear rules | Babas & Brasse",
        "description": "We wear rules. We wear clothes.Valden Prince reflects how clothing has never had a genderWhen I walk into almost any clothing store, I notice the same invisible line: one side is l",
        "ogTitle": "We wear rules",
        "ogDescription": "We wear rules. We wear clothes.Valden Prince reflects how clothing has never had a genderWhen I walk into almost any clothing store, I notice the same invisible line: one side is l"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "the-dogs-of-vivo-review",
    "title": "The Dogs of Vivo Review",
    "slug": "the-dogs-of-vivo-review",
    "dek": "Who among us is brave enough to hope?",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Who among us is brave enough to hope?",
        "Riley Herbert-Henry reviews The Dogs of Vivo by Sven Axelrad",
        "Publisher: Picador Africa, Pan MacMillan",
        "Date Released: May 2026",
        "Retail Price: +/- R300",
        "Format: Paperback (387 pages)",
        "An artist, a musician, and a painter walk into a bar. Then, the devil comes to town.",
        "It sounds like the setup to a bad dad joke, but the result is anything but.",
        "The Dogs of Vivo is Sven Axelrad’s fourth novel. You may recognise Vivo, as it was already introduced in his first and second novels. The fictional town of Vivo is eerily similar to some of the elusive ‘municipalities’ we have here in South Africa: uncontactable municipal offices, laidback rules, and some colourful characters.",
        "There are also some more mystical elements in Axelrad’s novels. His characters almost always include accountants who can disappear in abandoned quarries to write novels, or a girl could lie her head down on a tome of a book as a pillow in a cemetery protected by a dog named God. (His name is actually Dog, but his owner is dyslexic, and well… you can imagine the rest.)"
    ],
    "seo": {
        "title": "The Dogs of Vivo Review | Babas & Brasse",
        "description": "Who among us is brave enough to hope?",
        "ogTitle": "The Dogs of Vivo Review",
        "ogDescription": "Who among us is brave enough to hope?"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "kruiper-crawler",
    "title": "Kruiper : Crawler",
    "slug": "kruiper-crawler",
    "dek": "Mia Winter reviews Kruiper-Crawler by Shane Van Der Hoven",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Mia Winter reviews Kruiper-Crawler by Shane Van Der Hoven",
        "Publisher: uHlanga PressType: Poetry collectionDate Released: December 2025Retail Price: +/- R250.00Format: Paperback (90 pages)",
        "(1) Opening Reflection: How the Collection Made Me Feel2",
        "(1.1) Emotional response to the collection.2",
        "(1.2) No “Explaining” poems. Making sense of how the book made me feel2",
        "(2) Overview of the Collection2",
        "Introduce the collection as a whole (rewriting the blurb:)2",
        "(3) The Review’s Central Lens: Translation as Meaning3",
        "(3.1) Intro: translation/transadaptation as main critical lens.3",
        "(3.2) Main analytical section:3"
    ],
    "seo": {
        "title": "Kruiper : Crawler | Babas & Brasse",
        "description": "Mia Winter reviews Kruiper-Crawler by Shane Van Der Hoven",
        "ogTitle": "Kruiper : Crawler",
        "ogDescription": "Mia Winter reviews Kruiper-Crawler by Shane Van Der Hoven"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "it-s-complicated",
    "title": "It:s Complicated",
    "slug": "it-s-complicated",
    "dek": "Some Reinventions Aren't Escapes.",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Some Reinventions Aren't Escapes.",
        "Sumaya Adams reviews It's Complicated by Nivashni Nair Sukdhev",
        "Publisher: Jonathan Ball Publishers",
        "Genre: Contemporary Romance",
        "Date Released: February 2026",
        "Retail Price: +/- R260",
        "Format: Paperback (272 pages)",
        "It's Complicated is a heartwarming yet layered novel about second chances, love, healing, and the weight of the past.",
        "The story follows Kaavi Archary, who has left behind the glamour of an international modelling career in favour of a quieter life in the small town of Rally. There, she spends her days volunteering with troubled teenage girls, building meaningful friendships, and embracing the sense of peace she has long been searching for. However, the fresh start she has carefully built is threatened by a secret from her past: a husband no one knows about. When Neel unexpectedly arrives in Rally, Kaavi is forced to confront old wounds, family trauma, and the question of whether she can learn to trust again.",
        "I binged this book. The story pulled me in so effortlessly, and I became deeply invested in Kaavi and Neel's journey. Two years after Kaavi walked away from their secret marriage, Neel arrives in Rally, determined to finalise their divorce. The unresolved feelings between them, combined with the mystery of what truly caused their relationship to unravel, kept me turning the pages as I rooted for them to confront their past and find a way forward."
    ],
    "seo": {
        "title": "It:s Complicated | Babas & Brasse",
        "description": "Some Reinventions Aren't Escapes.",
        "ogTitle": "It:s Complicated",
        "ogDescription": "Some Reinventions Aren't Escapes."
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "a-love-that-heals",
    "title": "A Love That Heals",
    "slug": "a-love-that-heals",
    "dek": "Taybah Taliep-Braaf reviews Love That Heals by Cathrine Phiri",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Taybah Taliep-Braaf reviews Love That Heals by Cathrine Phiri",
        "Date Released: May 2026",
        "Format: Paperback (256 pages)",
        "Summary of the novel. Please rephrase below:The novel follows Thandaza Nyathi, who was abandoned as a baby in Mamaolo, south of Polokwane, and raised by a woman she calls her grandmother. Life has never been easy for them, and Thandaza’s dream is to build a better life and take care of her gogo. So she decides to move to Johannesburg, where new opportunities await.",
        "When Thandaza arrives in the restless City of Gold, she is confronted by rejection and empty promises. But then fate intervenes. One morning in Yeoville, she meets Steven, a successful restaurateur and businessman, who seems to epitomise everything she’s ever prayed for.",
        "A deeply moving novel set between Joburg and Polokwane. It’s a story about love that heals, faith that endures, and two hearts destined to find each other.",
        "One paragraph on the main character. Her journey. etc",
        "One paragraph on accessibilitySo I'll spend the next couple of days after work sitting with a review and stuff, and I will do constructive criticisms and what I would have liked to see and all of that good things. I'm not one to leave bad reviews. I will never, like, berate an author.",
        "One paragraph on the genre",
        "Does it appeal to general romance authors. Look, I understand that we need representation so comment on that, but… insert your comments."
    ],
    "seo": {
        "title": "A Love That Heals | Babas & Brasse",
        "description": "Taybah Taliep-Braaf reviews Love That Heals by Cathrine Phiri",
        "ogTitle": "A Love That Heals",
        "ogDescription": "Taybah Taliep-Braaf reviews Love That Heals by Cathrine Phiri"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "we-inherit-the-fire-by-kagiso-lesego-molope",
    "title": "We Inherit the Fire by Kagiso Lesego Molope",
    "slug": "we-inherit-the-fire-by-kagiso-lesego-molope",
    "dek": "We Inherit the Fire by Kagiso Lesego Molope – A Personal Review (Fazila Cariem)",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "We Inherit the Fire by Kagiso Lesego Molope – A Personal Review (Fazila Cariem)",
        "I wanted to read this book simply because I was drawn to the title. It speaks of generational cycles and emotions we fuel simply because they form the baseline of our history. And I was curious to find out whether the author would have demonstrated how to extract the good from the bad and find a place of peace beyond the turmoil. The cover – two hands intertwined with different colour markings symbolized the deep cultural roots and the story did not disappoint.",
        "The plot itself is deceptively simple. Molope presents the relationship between a celebrated anti-apartheid freedom fighter and her daughter, exposing the fractures beneath the public mythology.",
        "The story is about Kewame, who had been imprisoned during Apartheid as a child for four years. She grows up and marries a man who sees her less as a partner than as a testament to his own virtue, a struggle trophy rather than a woman in need of love. He never truly offers the healing, companionship, or emotional refuge that a marriage at that stage of her life should have provided. Instead, he remains closed off, and at times his resentment surfaces, as though her survival and sacrifice cast an uncomfortable light on the comforts he never had to earn.",
        "Despite this, they end up having four daughters. One of the daughters, Kelelo, is quiet but extremely observant. She desperately seeks the softness and nurture of her mother only to be met with one who is disconnected from reality. What interested me most was the tension between the Kewame’s public identity and her private reality. She occupies an almost sacred space as a \"Mother of the Nation\" figure, admired, respected, even mythologized by those around her. Yet on the intimate, family level, she is emotionally unavailable, disconnected, and deeply unhealed.",
        "A defining turning point in Kelelo's life comes when she is forced to leave her township school and join her sisters at a school in the suburbs. There, racial microaggressions become woven into the fabric of her daily existence, subtle enough to be dismissed, yet constant enough to leave scars. Determined not to be seen as difficult or angry, and haunted by the fear of becoming like her mother, Kelelo learns to swallow her questions, silence her objections, and endure what she knows is wrong. In the process, she suppresses not only her voice, but a vital part of herself.",
        "Kewame has strong familial roots and there’s a deep theme of feminine community in how she constantly seeks the comfort of her dying Grandmother and the woman in her family.",
        "The narration is done in dual point of view that of Kewame and then Kelelo. This gives the reader not only insight but empathy for both. I struggled trying to determine who was right vs wrong and eventually decided that it was not about right vs wrong – it was more about who was open to acknowledge their issues and move forward.",
        "One of the most striking stylistic choices is Molope's use of dialogue without quotation marks.",
        "Initially, this creates a sense of distance. The reader never feels fully inside a scene. Instead, it feels as though the narrator is recounting events directly to you, almost as if you're being trusted with family secrets."
    ],
    "seo": {
        "title": "We Inherit the Fire by Kagiso Lesego Molope | Babas & Brasse",
        "description": "We Inherit the Fire by Kagiso Lesego Molope – A Personal Review (Fazila Cariem)",
        "ogTitle": "We Inherit the Fire by Kagiso Lesego Molope",
        "ogDescription": "We Inherit the Fire by Kagiso Lesego Molope – A Personal Review (Fazila Cariem)"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "playing-flirty-and-next-level-love",
    "title": "Playing Flirty and Next Level Love",
    "slug": "playing-flirty-and-next-level-love",
    "dek": "Local romance author takes the game of love to the next level",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Local romance author takes the game of love to the next level",
        "Rebecca Jackman-Derman reviews Playing Flirty and Next Level Love duology by Shameez Patel",
        "Publisher: Forever (Hachette Book Group), distributed in South Africa by Jonathan Ball Publishers",
        "Dates released: Playing Flirty January 2025, Next Level Love January 2026",
        "Retail Price: +/- R360",
        "Format: Playing Flirty - paperback (352 pages); Next Level Love - paperback (384 pages)",
        "Every now and then, a group of friends comes into your life.",
        "They become your found family: the people you choose, the ones who show up for the important moments, and the ones who make you feel seen.",
        "Sometimes, you meet these people face-to-face – in a chess club, a theatre group, or a circle of book lovers. Sometimes, you find them online, through gaming communities, fandom spaces, or conversations with people you may never meet in person. And sometimes, you find that same feeling in stories, where fictional characters can feel just as familiar, comforting, and necessary as real friends.",
        "Shameez Patel is really good at making you feel like you’re right there at the table in her stories with a group of friends, just playing a board game and talking shit."
    ],
    "seo": {
        "title": "Playing Flirty and Next Level Love | Babas & Brasse",
        "description": "Local romance author takes the game of love to the next level",
        "ogTitle": "Playing Flirty and Next Level Love",
        "ogDescription": "Local romance author takes the game of love to the next level"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "cape-fever",
    "title": "Cape Fever",
    "slug": "cape-fever",
    "dek": "Ghosts Are Not the Scariest Thing in This South African Gothic Thriller",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Ghosts Are Not the Scariest Thing in This South African Gothic Thriller",
        "Rushdiyah Narker Reviews Cape Fever by Nadia Davids",
        "Publisher: Simon & Schuster",
        "Date Released: January 2026",
        "Retail Price: +/- R370",
        "Format: Paperback (240 pages)",
        "“I come highly recommended to Mrs Hatting through sentences I tell her I cannot read.”",
        "From the opening line, the character of Soraya intrigued me.",
        "That one sentence immediately raised questions.",
        "As Soraya recounts her interview for the position as a personal live-in maid to the elderly Mrs Hattingh, she remembers her mother's warnings about what it means to work in another person's home."
    ],
    "seo": {
        "title": "Cape Fever | Babas & Brasse",
        "description": "Ghosts Are Not the Scariest Thing in This South African Gothic Thriller",
        "ogTitle": "Cape Fever",
        "ogDescription": "Ghosts Are Not the Scariest Thing in This South African Gothic Thriller"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "wisani-and-the-bafokeng-brothers",
    "title": "Wisani and the Bafokeng Brothers",
    "slug": "wisani-and-the-bafokeng-brothers",
    "dek": "Resilience and Romance with Real South African Realities",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Resilience and Romance with Real South African Realities",
        "Sumaya Adams reviews Wisani and the Bafokeng Brothers by Thandi Moagi",
        "Publisher: Kwela (Jonathan Ball Publishers)",
        "Date Released: April 2026",
        "Retail Price: +/- R285",
        "Format: Paperback (358 pages)",
        "What was meant to be a week-long read-along with Jonathan Ball Publishers ended with me finishing the book on day four, because I genuinely could not stop reading. Every chapter left me needing to know what would happen next.",
        "Set against the backdrop of Soweto and Lesotho, Wisani and the Bafokeng Brothers follows Wisani Maluleke, a student at Wits University who is juggling three jobs to keep the lights on while caring for her bedridden mother and younger brother. Life in Soweto has made her resilient, but she's stretched to breaking point until her research project leads her to the Bafokeng brothers, heirs to the feared and Legendary Marashea underworld.",
        "At the heart of this brotherhood is Mohapi Mofokeng - commanding and dangerous. Wisani is pulled into a world of secrets, shadows and blood loyalty. Between survival, love, and the weight of her family’s struggles, Wisani must decide whether to walk away or stand with the brothers who could destroy her or save her.",
        "Sharing her thoughts on the novel, Takalani M describes Thandi Moagi's writing as, “Masterful storytelling that transported me to a world where loyalty is the currency and love flows deep and unshaken.” That was my takeaway as well. Throughout the novel, loyalty influences every relationship and decision, often demanding sacrifice and changing the course of the characters’ lives. Combined with the themes of love, family, responsibility, danger, and surviving, it makes for an incredibly compelling read."
    ],
    "seo": {
        "title": "Wisani and the Bafokeng Brothers | Babas & Brasse",
        "description": "Resilience and Romance with Real South African Realities",
        "ogTitle": "Wisani and the Bafokeng Brothers",
        "ogDescription": "Resilience and Romance with Real South African Realities"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "why-am-i-like-this",
    "title": "Why Am I Like This",
    "slug": "why-am-i-like-this",
    "dek": "Light Enough to Finish in a Day, Not Deep Enough to Answer: Why Am I Like This",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Light Enough to Finish in a Day, Not Deep Enough to Answer: Why Am I Like This",
        "Fatima Bheekoo Shah reviews Why Am I Like This by Qaanitah Hunter",
        "Date Released: October 2025",
        "Format: Paperback (256 pages)",
        "Some stories find you when you need them.",
        "My dad has dementia, and because I live in a different city from him, I'm caring for him from a distance – the kind of quiet, constant worry that doesn't switch off. So when I attended Qaanitah Hunter's book launch for Why Am I Like This and realised her newest novel had similar themes to what I was going through, I knew I had to get my hands on it before I'd even left the room.",
        "Hunter, South Africa's hard-hitting political journalist and creator of The Debrief Network, is no stranger to writing fiction.",
        "Her first book, Diary of a Guji Girl, gained a cult following for the honest and humorous way it captured the life of a young South African Muslim woman – particularly how Amina, a first-year student from the small town of Newcastle in KwaZulu-Natal, navigates campus life, friendships, the pressure from family to marry, and all the unspoken rules of her culture and community.",
        "Diary of a Guji Girl was one of the first books where I saw my own world on the page. At the time, there weren't many stories out there about South African Muslim Gujarati women, written from inside that world with all its specific slang and traditions. There's also an easy, chatty quality to Qaanitah's writing that pulled me in. She doesn't try to sound literary; she just tells it like it is, and that's exactly why Diary of a Guji Girl and her other work are well-received.",
        "Although Why Am I Like This is Hunter's second work of fiction, it is not her second book overall. She's also published several non-fiction titles on South African politics, including Who Will Rule South Africa? (co-authored by Adriaan Basson) and Eight Days In July: Inside The Zuma Unrest That Set South Africa Alight (co-authored by Kaveel Singh, Jeff Wicks). Considering all of this, I had high expectations for Hunter’s new novel."
    ],
    "seo": {
        "title": "Why Am I Like This | Babas & Brasse",
        "description": "Light Enough to Finish in a Day, Not Deep Enough to Answer: Why Am I Like This",
        "ogTitle": "Why Am I Like This",
        "ogDescription": "Light Enough to Finish in a Day, Not Deep Enough to Answer: Why Am I Like This"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "flying-cows-and-other-traumas",
    "title": "Flying Cows and Other Traumas",
    "slug": "flying-cows-and-other-traumas",
    "dek": "Strange. Traumatic. Mystical: When Cows Fly, Women Rise",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "Strange. Traumatic. Mystical: When Cows Fly, Women Rise",
        "Ralton Morrison reviews Flying Cows and Other Traumas by Philisiwe Twijnstra",
        "Publisher: Jacana Media",
        "Type: Short story collection",
        "Date Released: April 2026",
        "Retail Price: +/- R240",
        "Format: Paperback (233 pages)",
        "I picked up my copy of Flying Cows and Other Traumas at the end of a demanding day, hoping for an escape from reality, and the collection delivered one unlike any I expected.",
        "This collection of short stories is described as exploring the breadth of magical realism, speculative fiction and fantasy. Twijnstra portrays women succeeding in the face of adversity. The protagonists – black women – are thrust into magical, terrifying, spellbinding worlds, with stories set in the past, present and future.",
        "Inspired by the haunting allure of Her Body and Other Parties, the raw intensity of Freshwater and the unsettling atmosphere of Intruders, these stories create a bold, darkly imaginative realm where survival is redefined, and power is claimed on unexpected terms. Flying Cows and Other Traumas takes readers on a journey through surreal, unsettling worlds where the ordinary is disrupted by strange, malevolent forces."
    ],
    "seo": {
        "title": "Flying Cows and Other Traumas | Babas & Brasse",
        "description": "Strange. Traumatic. Mystical: When Cows Fly, Women Rise",
        "ogTitle": "Flying Cows and Other Traumas",
        "ogDescription": "Strange. Traumatic. Mystical: When Cows Fly, Women Rise"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "disabled-but",
    "title": "Disabled, But",
    "slug": "disabled-but",
    "dek": "A Woman. A Body. A Testimony.",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "A Woman. A Body. A Testimony.",
        "Jennifer Grace Morris reviews Disabled, But by Kirsten Deane",
        "Publisher: uHlanga Press",
        "Type: Poetry collection",
        "Date Released: March 2025",
        "Retaill Price: +/- R260.00",
        "Format: Paperback (80 pages)",
        "There were several moments where I genuinely had to pause and reread: reread the lines, the words, the structure – because I did not want to miss anything.",
        "I found myself paying close attention to how Dean shapes her poems and how carefully she structures each line. Her writing is deeply engaging, and I felt drawn in. I wanted to take my time with every poem.",
        "So, instead of reviewing, I reread, carefully . . ."
    ],
    "seo": {
        "title": "Disabled, But | Babas & Brasse",
        "description": "A Woman. A Body. A Testimony.",
        "ogTitle": "Disabled, But",
        "ogDescription": "A Woman. A Body. A Testimony."
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "some-unspoken-thing",
    "title": "Some Unspoken Thing",
    "slug": "some-unspoken-thing",
    "dek": "All The Things They Left Unsaid",
    "status": "published",
    "categoryId": "reviews",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "All The Things They Left Unsaid",
        "Shaheena Links reviews Some Unspoken Thing by Rushdiyah Narker",
        "Publisher: Penguin Books South Africa",
        "Date Released: August 2025",
        "Retail Price: +/- R290",
        "Format: Paperback (280 pages)",
        "Do you remember what growing up in the 90s was like in Cape Town?",
        "Are you old enough to remember recording your favourite songs from the radio on cassette tapes?",
        "Did you also spend hours writing lyrics in your glitter-covered notebooks?",
        "Or do you remember your first love? That feeling of waiting by the phone for your crush to call and running to make sure your Daddy doesn’t get to the phone first?"
    ],
    "seo": {
        "title": "Some Unspoken Thing | Babas & Brasse",
        "description": "All The Things They Left Unsaid",
        "ogTitle": "Some Unspoken Thing",
        "ogDescription": "All The Things They Left Unsaid"
    },
    "featuredImage": mediaById["editorial-books"]
  },
  {
    "id": "send-a-text-before-you-knock",
    "title": "Send a text before you knock",
    "slug": "send-a-text-before-you-knock",
    "dek": "A short story by Zubayr Charles",
    "status": "published",
    "categoryId": "short-stories",
    "authorProfileId": "zoe-petersen",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "A short story by Zubayr Charles",
        "“Don’t forget to check the mirror before you leave!” his mother would yell, in the morning, every morning, just before school, but that was long ago. As he stood there, the mirror served a different purpose.",
        "With a few deep breaths, he attempted to suck his belly in, hoping to spot any signs of the muscles he was once proud of. The mirror did not lie. All that stood facing back at him was his belly, unmoved, and oddly bigger than before. He didn't even need to exhale.",
        "Over the years, he had learned to hate himself. He hated how his paunch protruded beyond his ribcage, a clear distraction from his strong legs and chiselled arms. The bags around his eyes were darker, outlined with cracks that snaked around in unison. A hairline is not a hairline if there is no hair. Where had the volume gone to, he thought.",
        "Unrecognisable. Unloved. Unhinged. Three words that popped up at him, just like his unrecognisable, unloved and unhinged mind.",
        "Despite her blurry image in the corner of the mirror, he ignored his wife. Her naked body lay awkwardly between wanting to fully relax and give in to the bed, and sitting in an upright position.",
        "There she was: quiet, lurking, judging.",
        "Her expression was hard to read, especially her red smile.",
        "All she did was slump against the wall, with her eyes closed, her neck in pain, outstretched, and upright, whilst the rest of her body gave in beneath her. There was something heavy about her, even when she wasn’t awake. As badly as he wanted to place her into a more comfortable position, he let her be.",
        "In fact, he ignored her. For the first time, in a long time, he wanted to focus on himself, even if it just meant staring at his naked body, in the mirror."
    ],
    "seo": {
        "title": "Send a text before you knock | Babas & Brasse",
        "description": "A short story by Zubayr Charles",
        "ogTitle": "Send a text before you knock",
        "ogDescription": "A short story by Zubayr Charles"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "the-city-down-by-the-sea-es-12-june-2026",
    "title": "The city down by the sea:ES 12 June 2026",
    "slug": "the-city-down-by-the-sea-es-12-june-2026",
    "dek": "A short story by Ebrahim Samodien",
    "status": "published",
    "categoryId": "short-stories",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "A short story by Ebrahim Samodien",
        "The city glittered beneath the mountain. A table sent down from the Heavens above, spread out and decadent for some.",
        "From a distance, the mountain looked majestic – covered with white walls like angels’ wings in the sun. The ocean waves kissed its shores. Up close, was another matter altogether. The dwellings were tight, no room, not even for angels. Only landlords, the rest spaced out.",
        "The old quarter’s streets once smelled of barley bread, echoing with laughter. Now, the old quarter reeked of paint and polish, sterile – a place kept clean for those who never really live there.",
        "The people were leaving, one by one, not because they wanted to, but because the numbers no longer added up. The rent was due, edging them out without a sound, not even a shove.",
        "Among the locals, in a narrow street that flowed like a river between old houses, lived a man named Abraham. He wasn’t rich, nor was he poor in the ways that mattered. He had once been a teacher, then a carpenter – a real handyman doing what he could. People said he was a man who saw light where others only saw walls. He dreamed of possibilities and fulfilled potentials. Armed with love, with plenty more optimism and hope to go around.",
        "Every morning, he walked to the ocean before the city stirred. The waves, a reminder that the earth still moved freely, even when men boxed in and built fences around everything else.",
        "One particular morning, as the townsfolk were on their way to work, the landlords came not with weapons but with clipboards and contracts. Following behind were surveyors, developers, future owners – in all smiles and sunglasses, lattes in hand, and title deeds held tightly in the other. To them, the earth was nothing but ERF.",
        "Self-employed, Abraham was standing on his stoep looking on, when his neighbor Miriam said, “They say the new design will bring beauty back”. She was an elderly woman who had lived in the community all her life. She had baked for the streets for close to forty years. A generous soul. Like Abraham, a pair of genuinely good Samaritans.",
        "Abraham was looking at her, while from his bag he removed a small envelope. Reaching out towards her, he poured seeds into her cracked hands, asking, “Did beauty ever leave?”"
    ],
    "seo": {
        "title": "The city down by the sea:ES 12 June 2026 | Babas & Brasse",
        "description": "A short story by Ebrahim Samodien",
        "ogTitle": "The city down by the sea:ES 12 June 2026",
        "ogDescription": "A short story by Ebrahim Samodien"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "a-letter-to-a-burning-body",
    "title": "A Letter to a Burning Body",
    "slug": "a-letter-to-a-burning-body",
    "dek": "The Sanctuary. The Canary Creeper. The Body.",
    "status": "published",
    "categoryId": "short-stories",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "The Sanctuary. The Canary Creeper. The Body.",
        "Zain Omarjee writes an allegory for traversing otherness",
        "[suggestion as per the site’s editorial standardisation:]",
        "An allegory by Zain Omarjee",
        "Crackles and sizzles buzz through the air.",
        "There is a forest that has been burning for as long as anyone can remember.",
        "Smoke so thick it can suffocate any alveoli.",
        "The fire does not rage, it smoulders beneath the roots, patient – too patient.",
        "The trees, like those of ancient, have learned to grow around the fire. Their barks are blackened, their leaves singed at the edges, but they still stand. They have no choice. This is the only forest they can rejoice in.",
        "At the heart of this forest is the body. It is a clearing hidden by branches that bend inward, protecting what grows within. And what grows within is the Canary Creeper. Not a rare thing. A resilient semi-succulent, scrambling up shrubbery planted by hands that knew of the fire and chose to plant anyway. Its leaves are fleshy and light green, shaped like ivy. Bright yellow and aromatic, its flowers bloom even in late summer when the fire is at its hottest. It does not ask permission to grow. It simply does."
    ],
    "seo": {
        "title": "A Letter to a Burning Body | Babas & Brasse",
        "description": "The Sanctuary. The Canary Creeper. The Body.",
        "ogTitle": "A Letter to a Burning Body",
        "ogDescription": "The Sanctuary. The Canary Creeper. The Body."
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "the-coat",
    "title": "The Coat",
    "slug": "the-coat",
    "dek": "A short story by Ismail Cornelius (Final)",
    "status": "published",
    "categoryId": "short-stories",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "A short story by Ismail Cornelius (Final)",
        "The rain pelted against the windows.",
        "The wind howled through the openings and cracks of the house.",
        "The logs seemed to be burning uselessly.",
        "Brian shuddered through the biting cold. He put on the kettle for a cup of tea and stared at the steam escaping to the ceiling.",
        "Hmm . . . I wonder if I’ll be able to catch the steam and reuse the water after it condenses. . .",
        "Just then, a cockroach fell from the ceiling and startled Brian. The cockroach happened to have fallen on its back. Brian picked up the cockroach, pinching at its antenna to throw it outside. But when he opened the door and a chilly gust of wind shot at him, he immediately shut the door. The cockroach fell from Brian’s hand and scurried away. Brian tried to catch it but failed.",
        "“Aagh! What do I do now?” panicked Brian. “He’s about to call his friends over!”",
        "Brian gave up on the cockroach and went to pour the boiled water into his metal cup and stirred. Then, he pressed the teabag against the inside of the cup – a failed attempt at extracting flavour. The colour of the water never changed. He had already used the teabag three times.",
        "With the tea, he returned to his mattress that was set by the fireplace."
    ],
    "seo": {
        "title": "The Coat | Babas & Brasse",
        "description": "A short story by Ismail Cornelius (Final)",
        "ogTitle": "The Coat",
        "ogDescription": "A short story by Ismail Cornelius (Final)"
    },
    "featuredImage": mediaById["editorial-belonging"]
  },
  {
    "id": "short-story-2-0",
    "title": "short story 2.0",
    "slug": "short-story-2-0",
    "dek": "The rain pelted against the windows. The wind howled through the openings and cracks of the house, and the logs seemed to be burning uselessly as Brian shuddered through the biting",
    "status": "published",
    "categoryId": "short-stories",
    "authorProfileId": "visceral-contributor",
    "publishedAt": "2026-07-23",
    "bodyBlocks": [
        "The rain pelted against the windows. The wind howled through the openings and cracks of the house, and the logs seemed to be burning uselessly as Brian shuddered through the biting cold. He put on the kettle for a cup of tea and stared at the steam escaping to the ceiling.",
        "“Hmm… I wonder if I’ll be able to catch the steam, condensate it and reuse it as the water...” He thought to himself.",
        "Brian poured the boiled water into his metal cup and stirred then pressed the teabag against the inside of the cup to extract the flavour, but the colour of the water never changed as much as he hoped. He already used the teabag three times.",
        "“But a teabag has five lives.” He said, annoyed.",
        "With the tea, he returned to his mattress that was set by the fireplace, when his phone rang.",
        "“Hello?” he answered.",
        "“There’s a body coming in. They need us to dig the hole.” Replied the voice on the other end.",
        "“No. Next year, you dumb fuck! Do you think I’ve got time to joke around?”",
        "“Okay. I’ll be there in a bit.”",
        "“Be here now!” said the man and ended the call."
    ],
    "seo": {
        "title": "short story 2.0 | Babas & Brasse",
        "description": "The rain pelted against the windows. The wind howled through the openings and cracks of the house, and the logs seemed to be burning uselessly as Brian shuddered through the biting",
        "ogTitle": "short story 2.0",
        "ogDescription": "The rain pelted against the windows. The wind howled through the openings and cracks of the house, and the logs seemed to be burning uselessly as Brian shuddered through the biting"
    },
    "featuredImage": mediaById["editorial-belonging"]
  }

];

const comments = [
  { id: "comment-1", articleId: "send-a-text-before-you-knock", name: "Reader", body: "The shift from unannounced visits to carefully timed messages feels small, but it says so much about how our ideas of privacy have changed.", status: "pending" },
  { id: "comment-2", articleId: "send-a-text-before-you-knock", name: "Editor", body: "I recognised my own family in this essay. We still welcome anyone at the door, but everyone sends a message first.", status: "approved" }
];

const reviews = [
  { id: "review-1", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 4, body: "A warm, precise essay that turns an ordinary social habit into a larger reflection on care and boundaries.", status: "approved" },
  { id: "review-2", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 2, body: "This response was held for moderation because it did not address the published work.", status: "rejected" }
];

const contactSubmissions = [
  { id: "submission-1", name: "Karabo Dlamini", email: "karabo@example.com", subject: "General inquiry", message: "Could you share the submission window for the next essays edition?", status: "new" },
  { id: "submission-2", name: "Reece Adams", email: "reece@example.com", subject: "Submission", message: "I would like to pitch a photo essay on independent bookshops in Cape Town.", status: "archived" }
];

export {
  categories,
  profiles,
  mediaItems,
  articles,
  comments,
  reviews,
  contactSubmissions
};
