/**
 * Inhalte der Unterseiten.
 *
 * Jede Seite nennt nur, wofür Material vorliegt. Wo eine Aussage kein Bild
 * und kein Video hinter sich hat, steht sie nicht.
 */

export const fotografie = {
  seo: {
    title: 'Fotografie | Foto Panda',
    description:
      'Fotos und Videos für Hochzeiten, Familien, Unternehmen, Schulen und Veranstaltungen. Foto Panda aus Osnabrück – bundesweit für euch da.',
  },
  eyebrow: 'Fotografie',
  headlineLines: ['Momente,'],
  headlineAccent: 'die bleiben.',
  lead: 'Eure Hochzeit, ein neues Kapitel oder ein besonderer Tag für die ganze Schule. Wir halten fest, was euch wichtig ist – mit professionellen Fotos und Videos, bundesweit.',
  hero: { kind: 'living', ref: 'wedding' } as const,
  /* Die Miniaturen rechts am Hero: Sprungmarken in die Kategorien. */
  rail: [
    { number: '01', label: 'Hochzeiten', media: { kind: 'living', ref: 'wedding' } as const },
    { number: '02', label: 'Porträt', media: { kind: 'photo', ref: 'portrait-court-standing' } as const },
    { number: '03', label: 'Lifestyle', media: { kind: 'photo', ref: 'portrait-fence' } as const },
    { number: '04', label: 'Business', media: { kind: 'photo', ref: 'business-portrait-01' } as const },
  ],
  philosophy: {
    title: 'Unsere Haltung',
    /* Zwei Zeilen statt eines Absatzes. Die Aussage trägt sich selbst; ein
       erklärender Nachsatz würde sie nur abschwächen. */
    lineOne: 'Keine Bilder für den Katalog.',
    lineTwo: 'Sondern Bilder, die sich nach euch anfühlen.',
    media: { kind: 'photo', ref: 'bridal-closeup' } as const,
  },
  /* `weight` steuert die Komposition: `feature` läuft breit und hoch,
     `pair` steht zu zweit nebeneinander, `wide` liegt quer. Ohne diese
     Unterscheidung wären es fünf gleich große Blöcke untereinander. */
  categories: [
    {
      id: 'hochzeit',
      weight: 'feature' as const,
      title: 'Hochzeiten',
      body: 'Der ganze Tag oder nur die Stunden, die zählen. Reportage statt Aufstellung, dazu ein kurzer Film aus demselben Material.',
      media: { kind: 'living', ref: 'wedding' } as const,
    },
    {
      id: 'portrait',
      weight: 'pair' as const,
      title: 'Porträts',
      body: 'Ausdrucksstark und natürlich. Draußen oder im Studio, immer mit genug Zeit zum Warmwerden.',
      media: { kind: 'photo', ref: 'portrait-court-standing' } as const,
    },
    {
      id: 'lifestyle',
      weight: 'pair' as const,
      title: 'Lifestyle',
      body: 'Bilder mit Bewegung und Ort. Für Social Media, Bewerbungen oder einfach für dich.',
      media: { kind: 'photo', ref: 'portrait-court-knees' } as const,
    },
    {
      id: 'business',
      weight: 'wide' as const,
      title: 'Business',
      body: 'Porträts, die zum Unternehmen passen, und Aufnahmen aus dem Arbeitsalltag.',
      media: { kind: 'photo', ref: 'business-office-01' } as const,
    },
  ],
  occasions: [
    { title: 'Schule & Kindergarten', body: 'Die ersten Freundschaften, gemeinsame Jahre und große kleine Schritte. Wir begleiten Schulen und Kindergärten mit Fotos und auf Wunsch auch mit Video.' },
    { title: 'Tanz & Abschlussball', body: 'Vom ersten Tanz bis zum letzten Applaus. Wir halten Bewegung, Begegnungen und die Atmosphäre eures besonderen Abends fest.' },
    { title: 'Veranstaltungen', body: 'Feiern, Begegnungen und Momente, die Menschen zusammenbringen. Foto und Video, abgestimmt auf euren Anlass.' },
  ],
}

export const lebendigeMedien = {
  seo: {
    title: 'Lebendige Medien | Foto Panda',
    description:
      'Aus Foto und Video wird ein Erlebnis: lebendige Fotobücher, Alben und Printprodukte von Foto Panda.',
  },
  eyebrow: 'Lebendige Medien',
  headlineLines: ['Ein Foto.', 'Viele Geschichten.'],
  headlineAccent: 'Ein Erlebnis.',
  lead: 'Ein Fotobuch, das Geschichten erzählt. Eine Karte, die mehr zeigt. Wir verbinden eure Fotos mit Videos und machen Erinnerungen und Informationen interaktiv erlebbar.',
  hero: { kind: 'photo', ref: 'school-album' } as const,
  /**
   * Wie das Erlebnis beim Kunden ausgelöst wird, steht bewusst als ein Satz
   * an einer Stelle. Solange der Auslieferungsweg nicht bestätigt ist,
   * behauptet die Seite keinen Mechanismus.
   */
  mechanism: 'Mit der Royal_Media App lassen sich vorbereitete Bilder scannen und die dazugehörigen Videos erleben.',
  points: [
    { title: 'Foto und Film aus einem Termin', body: 'Dieselben Motive, dieselbe Bildsprache, keine zweite Anfahrt.' },
    { title: 'Für Privat und Business', body: 'Vom Hochzeitsalbum bis zur Unternehmensbroschüre.' },
    { title: 'Mit dem Smartphone erleben', body: 'Vorbereitete Bilder werden mit der App zum Einstieg in eure Geschichte.' },
  ],
  demo: {
    title: 'Einblicke in lebendige Medien',
    body: 'Unsere Beispiele zeigen, wie Foto, Film und gedruckte Erinnerungen zusammenspielen.',
  },
  /**
   * Jedes Produkt bekommt ein eigenes Gewicht und ein eigenes Motiv. Vorher
   * standen fünf gleich grosse Kacheln nebeneinander, zwei davon mit
   * demselben Bild -- das las sich als Wiederholung statt als Sortiment.
   * `weight` steuert Spaltenbreite und Bildformat auf der Seite.
   */
  products: [
    {
      id: 'fotobuch',
      title: 'Fotobücher',
      body: 'Die schönsten Bilder eines Tages, und daneben der Film derselben Szene.',
      media: { kind: 'living', ref: 'wedding' } as const,
      weight: 'feature',
    },
    {
      id: 'album',
      title: 'Fotoalben',
      body: 'Gemeinsame Erinnerungen, sorgfältig gestaltet. Ein Einblick in die Gestaltung eines Fotobuchs.',
      media: { kind: 'photo', ref: 'school-album' } as const,
      weight: 'wide',
    },
    {
      id: 'speisekarte',
      title: 'Speisekarten',
      body: 'Gerichte als Film statt als Beschreibung.',
      media: { kind: 'living', ref: 'gastronomy-kitchen' } as const,
      weight: 'tall',
    },
    {
      id: 'visitenkarte',
      title: 'Visitenkarten & Flyer',
      body: 'Ein erster Kontakt, der mehr zeigt: Bilder, Videos und Informationen hinter einem QR-Code.',
      media: { kind: 'photo', ref: 'digital-card' } as const,
      weight: 'block',
    },
    {
      id: 'schulalbum',
      title: 'Schul- & Erinnerungsalben',
      body: 'Gemeinsame Jahre, festgehalten in Bildern. Ein Gestaltungsbeispiel für euer Erinnerungsalbum.',
      media: { kind: 'photo', ref: 'school-album' } as const,
      weight: 'tall',
    },
  ] as const,
  /* Formate, die möglich sind, für die aber noch keine eigene Arbeit
     vorliegt. Sie stehen als Text, nicht als Bild mit erfundenem Mockup. */
  onRequest: ['Visitenkarten', 'Flyer', 'Broschüren', 'Produktkataloge', 'Einladungen'],
}

export const gastronomie = {
  seo: {
    title: 'Gastronomie | Foto Panda',
    description:
      'Food-Fotografie und Videos für Restaurants: Gerichte, Atmosphäre und lebendige Speisekarten. Aus Osnabrück, bundesweit vor Ort.',
  },
  eyebrow: 'Gastronomie in Szene gesetzt',
  headlineLines: ['Man isst zuerst'],
  headlineAccent: 'mit den Augen.',
  lead: 'Auf dem Foto sieht man, wie ein Gericht aussieht. Im Film sieht man, wie die Sauce fällt und der Dampf aufsteigt. Wir liefern beides.',
  hero: { kind: 'living', ref: 'gastronomy-kitchen' } as const,
  benefits: [
    { title: 'Mehr Appetit', body: 'Textur, Glanz und Bewegung statt Teller von oben bei Deckenlicht.' },
    { title: 'Eure Handschrift', body: 'Bilder und Filme, die Gerichte, Küche und Atmosphäre eures Hauses zeigen.' },
    { title: 'Material für alles', body: 'Aus einem Termin kommen Standbilder für den Druck und Clips für Social Media.' },
    { title: 'Der Raum gehört dazu', body: 'Licht, Tische, Handschrift des Hauses. Gäste entscheiden auch danach.' },
  ],
  steps: [
    { number: '01', title: 'Aufnahme', body: 'Wir fotografieren und filmen Ihre Gerichte und die Atmosphäre.' },
    { number: '02', title: 'Schnitt', body: 'Aus jedem Motiv entsteht ein kurzer, appetitlicher Film.' },
    { number: '03', title: 'Zusammenstellen', body: 'Bilder für die Karte, Clips für Social Media, alles aufeinander abgestimmt.' },
    { number: '04', title: 'Einsetzen', body: 'Sie erhalten fertige Dateien in den Formaten, die Sie brauchen.' },
  ],
  works: [
    { media: { kind: 'living', ref: 'gastronomy-kitchen' } as const, title: 'Anrichten', label: 'Video' },
  ],
  closing: {
    headlineLines: ['Lassen Sie Ihre Gerichte'],
    headlineAccent: 'lebendig werden.',
    points: [
      { title: 'Persönliche Beratung', body: 'Wir finden das passende Konzept für Ihr Haus.' },
      { title: 'Schnell und einfach', body: 'Shooting, Film und Umsetzung aus einer Hand.' },
      { title: 'Bundesweit', body: 'Aus Osnabrück zu Ihrem Restaurant – an Ihrem Wunschort.' },
    ],
  },
}

export const unternehmen = {
  seo: {
    title: 'Für Unternehmen | Foto Panda',
    description:
      'Business-Porträts, Produkt- und Unternehmensaufnahmen aus Osnabrück. Foto, Video und Gestaltung für Unternehmen in ganz Deutschland.',
  },
  eyebrow: 'Für Unternehmen',
  headlineLines: ['Ihr Unternehmen.', 'Ihre Geschichte.'],
  headlineAccent: 'Stark präsentiert.',
  lead: 'Was Sie zeigen, entscheidet mit, wem man zutraut, die Arbeit zu machen. Wir liefern Bilder und Bewegtbild aus einem Termin, abgestimmt auf den Ort, an dem sie später stehen.',
  hero: { kind: 'photo', ref: 'business-portrait-01' } as const,
  fields: [
    {
      id: 'portraits',
      title: 'Business-Porträts',
      body: 'Einheitliche Aufnahmen für die ganze Mannschaft, im Studio oder bei Ihnen vor Ort.',
      media: { kind: 'photo', ref: 'business-portrait-02' } as const,
    },
    {
      id: 'arbeitsalltag',
      title: 'Arbeitsalltag',
      body: 'Bilder, die zeigen, wie bei Ihnen gearbeitet wird. Kein gestelltes Team vor weißer Wand.',
      media: { kind: 'photo', ref: 'business-office-01' } as const,
    },
    {
      id: 'print',
      title: 'Visitenkarten & Flyer',
      body: 'Gedruckte Informationen mit QR-Code, der zu Bildern, Videos und weiteren Inhalten führt.',
      media: { kind: 'photo', ref: 'digital-card' } as const,
    },
    {
      id: 'bewegtbild',
      title: 'Bewegtbild',
      body: 'Kurze Filme für Website und Social Media, aus demselben Termin wie die Fotos.',
      media: { kind: 'photo', ref: 'business-portrait-01' } as const,
    },
  ],
  /**
   * Der eigentliche Nutzen: Aus einem Termin entstehen mehrere Formate.
   * Jeder Eintrag nennt nur, was aus dem vorhandenen Material tatsächlich
   * ableitbar ist. Kein Format ohne ein Bild dahinter.
   */
  oneShoot: {
    headlineLines: ['Ein Termin.'],
    headlineAccent: 'Viele Formate.',
    lead: 'Wir stimmen die Aufnahmen auf Ihren Bedarf ab: Website, Social Media und gedruckte Materialien erhalten eine gemeinsame Bildsprache.',
    /* Die Mitte zeigt das Set selbst, nicht wieder ein Ergebnis: sonst
       stuende das Posterbild des Business-Drehs zweimal in derselben Reihe. */
    center: { kind: 'photo', ref: 'business-office-02' } as const,
    outputs: [
      {
        id: 'website',
        label: 'Website',
        body: 'Porträts und Arbeitsalltag für Team- und Über-uns-Seiten.',
        media: { kind: 'photo', ref: 'business-office-01' } as const,
      },
      {
        id: 'team',
        label: 'Team',
        body: 'Einheitliche Aufnahmen für alle Mitarbeitenden.',
        media: { kind: 'photo', ref: 'business-portrait-02' } as const,
      },
      {
        id: 'print',
        label: 'Print',
        body: 'Bilder für Broschüre, Visitenkarte und Anzeige.',
        media: { kind: 'photo', ref: 'business-office-02' } as const,
      },
      {
        id: 'video',
        label: 'Video & Social',
        body: 'Kurze Filme aus demselben Termin, hochkant für Social Media.',
        media: { kind: 'photo', ref: 'business-portrait-01' } as const,
      },
      {
        id: 'digital',
        label: 'Interaktive Karten',
        body: 'Visitenkarten und Flyer mit Zugang zu digitalen Inhalten.',
        media: { kind: 'photo', ref: 'digital-card' } as const,
      },
    ],
  },
  reasons: [
    { title: 'Ein Termin, zwei Ergebnisse', body: 'Foto und Film entstehen zusammen. Das hält die Bildsprache einheitlich.' },
    { title: 'Abgestimmt auf den Einsatzort', body: 'Website, Print, Social Media: Wir liefern die Formate, die Sie wirklich brauchen.' },
    { title: 'Planbar', body: 'Ablauf, Umfang und Bearbeitungszeitraum halten wir vorher schriftlich fest.' },
  ],
}

export const ueberUns = {
  seo: {
    title: 'Über uns | Foto Panda',
    description: 'Foto Panda aus Osnabrück: Fotografie und Videoproduktion in einer Hand.',
  },
  eyebrow: 'Über Foto Panda',
  headlineLines: ['Ihre Momente.'],
  headlineAccent: 'Unsere Leidenschaft.',
  quote: 'Ein Foto hält einen Moment fest. Wir lassen ihn weitergehen.',
  /* Kein Porträt des Fotografen, weil keines vorliegt. Was vorliegt, ist ein
     Standbild aus dem eigenen Business-Dreh, das das Set zeigt: echtes
     Material, kein erfundenes Gesicht. */
  atWork: {
    media: { kind: 'photo', ref: 'business-office-02' } as const,
    label: 'Unsere Arbeit',
    caption: 'Unternehmensfotografie von Foto Panda.',
  },
  /* Bewusst kurz. Auf dieser Seite entscheidet der Ton, nicht die Menge:
     drei knappe Sätze lesen sich auf dem Telefon zu Ende, drei Absätze
     nicht. */
  lead: 'Foto Panda ist Fotografie und Videoproduktion in einer Hand – Menschen, Gerichte, Räume, gezeigt, wie sie sich angefühlt haben.',
  paragraphs: [
    'Wer die Bilder später ansieht, soll den Tag wiedererkennen. Nicht die Technik.',
    'Wir arbeiten aus Osnabrück und begleiten Projekte in ganz Deutschland. Persönlich vom ersten Gespräch bis zu den fertigen Bildern.',
  ],
  /* Kein Teamfoto: Es liegt keines vor, und eine fremde Person als Team zu
     zeigen wäre erfunden. Der Abschnitt trägt über Arbeitsbeispiele. */
  gallery: [
    { media: { kind: 'photo', ref: 'business-office-01' } as const, label: 'Business' },
    { media: { kind: 'photo', ref: 'portrait-court-seated' } as const, label: 'Porträt' },
    { media: { kind: 'photo', ref: 'wedding-facade' } as const, label: 'Hochzeit' },
  ],
}

export const kontakt = {
  seo: {
    title: 'Kontakt | Foto Panda',
    description: 'Anfrage an Foto Panda: Fotografie und Videoproduktion aus Osnabrück.',
  },
  eyebrow: 'Kontakt',
  headlineLines: ['Erzählen Sie uns'],
  headlineAccent: 'von Ihrem Projekt.',
  lead: 'Beschreiben Sie kurz Ihre Idee oder Ihren Wunsch. Wir melden uns persönlich bei Ihnen und besprechen die nächsten Schritte.',
}
