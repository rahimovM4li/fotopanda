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
      'Hochzeiten, Porträts, Business und Immobilien: Fotografie aus Osnabrück, im selben Termin auch als Film.',
  },
  eyebrow: 'Fotografie',
  headlineLines: ['Momente,'],
  headlineAccent: 'die bleiben.',
  lead: 'Authentisch. Ruhig. Ohne gestellte Posen. Wir halten fest, was ohnehin passiert, und geben dir den Tag so zurück, wie er sich angefühlt hat.',
  hero: { kind: 'living', ref: 'wedding' } as const,
  /* Die Miniaturen rechts am Hero: Sprungmarken in die Kategorien. */
  rail: [
    { number: '01', label: 'Hochzeiten', media: { kind: 'living', ref: 'wedding' } as const },
    { number: '02', label: 'Porträt', media: { kind: 'photo', ref: 'portrait-court-standing' } as const },
    { number: '03', label: 'Lifestyle', media: { kind: 'photo', ref: 'portrait-fence' } as const },
    { number: '04', label: 'Business', media: { kind: 'photo', ref: 'business-portrait-01' } as const },
    { number: '05', label: 'Immobilien', media: { kind: 'living', ref: 'real-estate' } as const },
  ],
  philosophy: {
    title: 'Unsere Haltung',
    /* Zwei Zeilen statt eines Absatzes. Die Aussage trägt sich selbst; ein
       erklärender Nachsatz würde sie nur abschwächen. */
    lineOne: 'Keine Bilder für den Katalog.',
    lineTwo: 'Sondern Bilder, die sich nach euch anfühlen.',
    media: { kind: 'photo', ref: 'wedding-closeup' } as const,
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
    {
      id: 'immobilien',
      weight: 'wide' as const,
      title: 'Immobilien',
      body: 'Innen und außen, bei dem Licht, das dem Objekt guttut. Dazu ein Rundgang als Video.',
      media: { kind: 'living', ref: 'real-estate' } as const,
    },
  ],
  faq: [
    {
      q: 'Wie lange dauert ein Shooting?',
      a: 'Ein Porträttermin dauert meist ein bis zwei Stunden. Bei Hochzeiten richtet sich die Dauer nach dem Ablauf des Tages; wir sprechen vorher durch, welche Momente dir wichtig sind.',
    },
    {
      q: 'Bekomme ich Fotos und Video?',
      a: 'Ja. Beides entsteht im selben Termin mit denselben Motiven und wird zusammen ausgeliefert. Du kannst auch nur Fotos buchen.',
    },
    {
      q: 'Wie viele Bilder erhalte ich?',
      a: 'Die Anzahl hängt vom Umfang ab. Du bekommst eine bearbeitete Auswahl, keine Rohdatei-Sammlung, durch die du dich selbst arbeiten musst.',
    },
    {
      q: 'Wann sind die Bilder fertig?',
      a: 'Den Bearbeitungszeitraum halten wir vor dem Termin schriftlich fest, damit du dich darauf verlassen kannst.',
    },
    {
      q: 'Kommt ihr auch außerhalb von Osnabrück?',
      a: 'Ja, nach Absprache. In der Region sind die Wege kurz; für weitere Strecken klären wir die Anfahrt vorher.',
    },
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
  lead: 'Ein Foto zeigt eine Sekunde. Daneben liegt der Film derselben Szene. Wir produzieren beides im selben Termin und liefern es als Paar.',
  hero: { kind: 'living', ref: 'living-album' } as const,
  /**
   * Wie das Erlebnis beim Kunden ausgelöst wird, steht bewusst als ein Satz
   * an einer Stelle. Solange der Auslieferungsweg nicht bestätigt ist,
   * behauptet die Seite keinen Mechanismus.
   */
  mechanism: 'Foto und Film gehören zusammen und werden gemeinsam ausgeliefert.',
  points: [
    { title: 'Foto und Film aus einem Termin', body: 'Dieselben Motive, dieselbe Bildsprache, keine zweite Anfahrt.' },
    { title: 'Für Privat und Business', body: 'Vom Hochzeitsalbum bis zur Unternehmensbroschüre.' },
    { title: 'Ohne Zusatzgerät', body: 'Auf dieser Seite genügt ein Fingertipp, um es auszuprobieren.' },
  ],
  demo: {
    title: 'Probier es aus',
    body: 'Jedes Bild mit einem Wiedergabesymbol lässt sich antippen. Der Rest der Seite funktioniert genauso.',
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
      body: 'Erinnerungen, die man antippen kann.',
      media: { kind: 'living', ref: 'living-album' } as const,
      weight: 'wide',
    },
    {
      id: 'speisekarte',
      title: 'Speisekarten',
      body: 'Gerichte als Film statt als Beschreibung.',
      media: { kind: 'living', ref: 'gastronomy-plating' } as const,
      weight: 'tall',
    },
    {
      id: 'immobilien',
      title: 'Exposé & Rundgang',
      body: 'Objektbilder plus Rundgang für Interessenten.',
      media: { kind: 'living', ref: 'real-estate' } as const,
      weight: 'block',
    },
    {
      id: 'unternehmen',
      title: 'Unternehmensmedien',
      body: 'Porträts, Arbeitsalltag und bewegte Fassung.',
      media: { kind: 'living', ref: 'business-shoot' } as const,
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
      'Food-Fotografie und Videos für Restaurants: Gerichte, Atmosphäre und lebendige Speisekarten aus Osnabrück.',
  },
  eyebrow: 'Gastronomie in Szene gesetzt',
  headlineLines: ['Man isst zuerst'],
  headlineAccent: 'mit den Augen.',
  lead: 'Auf dem Foto sieht man, wie ein Gericht aussieht. Im Film sieht man, wie die Sauce fällt und der Dampf aufsteigt. Wir liefern beides.',
  hero: { kind: 'living', ref: 'gastronomy-plating' } as const,
  benefits: [
    { title: 'Mehr Appetit', body: 'Textur, Glanz und Bewegung statt Teller von oben bei Deckenlicht.' },
    { title: 'Mehr Aufmerksamkeit', body: 'Bewegte Aufnahmen bleiben länger hängen und werden häufiger geteilt.' },
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
    { media: { kind: 'living', ref: 'gastronomy-plating' } as const, title: 'Anrichten', label: 'Video' },
    { media: { kind: 'living', ref: 'gastronomy-serving' } as const, title: 'Servieren', label: 'Video' },
  ],
  closing: {
    headlineLines: ['Lassen Sie Ihre Gerichte'],
    headlineAccent: 'lebendig werden.',
    points: [
      { title: 'Persönliche Beratung', body: 'Wir finden das passende Konzept für Ihr Haus.' },
      { title: 'Schnell und einfach', body: 'Shooting, Film und Umsetzung aus einer Hand.' },
      { title: 'Regional', body: 'In Osnabrück und Umgebung für Sie da.' },
    ],
  },
}

export const unternehmen = {
  seo: {
    title: 'Für Unternehmen | Foto Panda',
    description:
      'Business-Porträts, Immobilien, Produkt- und Unternehmensaufnahmen aus Osnabrück. Foto und Video aus einem Termin.',
  },
  eyebrow: 'Für Unternehmen',
  headlineLines: ['Ihr Unternehmen.', 'Ihre Story.'],
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
      id: 'immobilien',
      title: 'Immobilien',
      body: 'Objektaufnahmen und ein Rundgang, der Interessenten die Wege zeigt.',
      media: { kind: 'living', ref: 'real-estate' } as const,
    },
    {
      id: 'bewegtbild',
      title: 'Bewegtbild',
      body: 'Kurze Filme für Website und Social Media, aus demselben Termin wie die Fotos.',
      media: { kind: 'living', ref: 'business-shoot' } as const,
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
    lead: 'Sie buchen einen Tag und bekommen daraus das Material für Website, Social Media, Print und Bewerbung. Nicht fünf Termine für fünf Kanäle.',
    /* Die Mitte zeigt das Set selbst, nicht wieder ein Ergebnis: sonst
       stuende das Posterbild des Business-Drehs zweimal in derselben Reihe. */
    center: { kind: 'photo', ref: 'behind-the-scenes' } as const,
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
        media: { kind: 'living', ref: 'business-shoot' } as const,
      },
      {
        id: 'expose',
        label: 'Exposé',
        body: 'Objektbilder und Rundgang für Immobilienunterlagen.',
        media: { kind: 'living', ref: 'real-estate' } as const,
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
    media: { kind: 'photo', ref: 'behind-the-scenes' } as const,
    label: 'Am Set',
    caption: 'Standbild aus einem eigenen Dreh.',
  },
  /* Bewusst kurz. Auf dieser Seite entscheidet der Ton, nicht die Menge:
     drei knappe Sätze lesen sich auf dem Telefon zu Ende, drei Absätze
     nicht. */
  lead: 'Foto Panda ist Fotografie und Videoproduktion in einer Hand – Menschen, Gerichte, Räume, gezeigt, wie sie sich angefühlt haben.',
  paragraphs: [
    'Wer die Bilder später ansieht, soll den Tag wiedererkennen. Nicht die Technik.',
    'Wir arbeiten aus Osnabrück. Sie sprechen immer mit der Person, die auch hinter der Kamera steht.',
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
  headlineLines: ['Erzählen Sie,'],
  headlineAccent: 'worum es geht.',
  lead: 'Anlass, Ort und ungefährer Zeitraum reichen für den Anfang. Alles Weitere klären wir im Gespräch.',
}
