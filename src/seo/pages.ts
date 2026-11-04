import type { Language } from './paths'

export interface SeoPage {
  path: string
  component: string
  type?: 'AboutPage' | 'ContactPage' | 'CollectionPage'
  service?: boolean
  noindex?: boolean
  intent: string
  topics: [string, string]
  de: { title: string; description: string }
  ru: { title: string; description: string }
}
// Authoritative public-page registry: router, build, metadata, sitemap and SEO map.
export const pages: SeoPage[] = [
  { path: '/', component: 'Home', intent: 'Знакомство со студией и выбор услуги', topics: ['Fotografie und Video Osnabrück; Hochzeit, Business, lebendige Medien', 'Фотограф и видеосъёмка Оснабрюк; свадьбы, бизнес, оживающие альбомы'],
    de: { title: 'Foto Panda | Fotografie & Video aus Osnabrück', description: 'Foto und Video für Hochzeiten, Familien, Unternehmen und Gastronomie. Foto Panda aus Osnabrück begleitet Projekte bundesweit – auch mit lebendigen Fotobüchern.' },
    ru: { title: 'Foto Panda | Фотограф и видеосъёмка в Оснабрюке', description: 'Свадьбы, семейные истории, съёмка для бизнеса и ресторанов. Фото и видео от Foto Panda: работаем из Оснабрюка по всей Германии, создаём оживающие фотоальбомы.' } },
  { path: '/fotografie', component: 'Fotografie', service: true, intent: 'Выбор фотосъёмки для своего события', topics: ['Fotografie; Hochzeiten, Porträts, Familien, Schulen', 'Фотосъёмка; свадьбы, портреты, семьи, школы'],
    de: { title: 'Hochzeits- & Porträtfotografie | Foto Panda Osnabrück', description: 'Hochzeiten, Porträts, Familien, Schulen und Veranstaltungen: Foto Panda hält persönliche Momente in Fotos und Videos fest. Aus Osnabrück, deutschlandweit.' },
    ru: { title: 'Свадебная и портретная съёмка | Foto Panda', description: 'Свадебные репортажи, портреты, семейные фотографии и съёмка школьных событий. Фото и видео от Foto Panda в Оснабрюке и по всей Германии.' } },
  { path: '/lebendige-medien', component: 'LebendigeMedien', service: true, intent: 'Понять, как фотографии связаны с видео', topics: ['Lebendige Fotobücher; Fotoalben, Printprodukte, Royal_Media', 'Оживающие фотоальбомы; фотографии с видео, приложение Royal_Media'],
    de: { title: 'Lebendige Fotobücher & Printmedien | Foto Panda', description: 'Fotobücher, Alben und Printprodukte mit passenden Videos. Erfahren Sie, wie vorbereitete Bilder mit der Royal_Media App lebendig werden.' },
    ru: { title: 'Оживающие фотоальбомы и печатные материалы | Foto Panda', description: 'Фотографии, за которыми продолжается история: альбомы, меню и печатные материалы с видео. Подготовленные изображения оживают в приложении Royal_Media.' } },
  { path: '/gastronomie', component: 'Gastronomie', service: true, intent: 'Заказать съёмку блюд и ресторана', topics: ['Gastronomiefotografie; Food-Videos, Speisekarten, Restaurant', 'Съёмка для ресторанов; фото блюд, видео, меню'],
    de: { title: 'Food-Fotografie & Videos für Restaurants | Foto Panda', description: 'Gerichte, Küche und Restaurantatmosphäre in Foto und Film. Foto Panda erstellt abgestimmte Aufnahmen für Speisekarten und Social Media – bundesweit.' },
    ru: { title: 'Фото и видео для ресторанов | Foto Panda', description: 'Покажите блюда, работу кухни и атмосферу ресторана. Foto Panda снимает фотографии и короткие видео для меню и соцсетей по всей Германии.' } },
  { path: '/unternehmen', component: 'Unternehmen', service: true, intent: 'Выбрать фото и видео для бизнеса', topics: ['Unternehmensfotografie; Business-Porträts, Firmenvideos, Print', 'Съёмка для бизнеса; деловые портреты, видео, печатные материалы'],
    de: { title: 'Business-Fotografie & Unternehmensvideos | Foto Panda', description: 'Business-Porträts, Arbeitsalltag und kurze Filme aus einem Termin. Foto Panda aus Osnabrück liefert Bildmaterial für Website, Social Media und Print.' },
    ru: { title: 'Деловые портреты и видео для компаний | Foto Panda', description: 'Команда, рабочие процессы и короткие фильмы за одну съёмку. Foto Panda создаёт фото и видео для сайта, соцсетей и печатных материалов вашей компании.' } },
  { path: '/arbeiten', component: 'Arbeiten', type: 'CollectionPage', intent: 'Оценить реальные примеры работ', topics: ['Portfolio; Hochzeiten, Porträts, Gastronomie, Video', 'Портфолио; свадьбы, портреты, рестораны, видео'],
    de: { title: 'Portfolio: Fotos & Filme | Foto Panda', description: 'Entdecken Sie ausgewählte Arbeiten von Foto Panda: Hochzeiten, Geburtstage, Porträts, Gastronomie und Unternehmen. Fotos vergrößern und Filme ansehen.' },
    ru: { title: 'Портфолио: фотографии и фильмы | Foto Panda', description: 'Примеры работ Foto Panda: свадьбы, дни рождения, портреты, рестораны и бизнес. Рассмотрите фотографии в деталях и посмотрите короткие фильмы.' } },
  { path: '/ueber-uns', component: 'UeberUns', type: 'AboutPage', intent: 'Узнать подход студии и географию работы', topics: ['Foto Panda; Fotostudio Osnabrück, Arbeitsweise', 'О Foto Panda; студия в Оснабрюке, подход к съёмке'],
    de: { title: 'Über Foto Panda | Foto & Film aus Osnabrück', description: 'Fotografie und Videoproduktion aus einer Hand. Lernen Sie den Ansatz von Foto Panda kennen: persönliche Begleitung aus Osnabrück für Projekte in ganz Deutschland.' },
    ru: { title: 'О Foto Panda | Фото и видео из Оснабрюка', description: 'Фотография и видеосъёмка в одних руках. Узнайте, как Foto Panda сопровождает проекты от первого разговора до готовых снимков в Оснабрюке и по всей Германии.' } },
  { path: '/kontakt', component: 'Kontakt', type: 'ContactPage', intent: 'Обсудить проект и отправить запрос', topics: ['Kontakt Foto Panda; Fotoanfrage, Videoprojekt', 'Контакты Foto Panda; заявка на фото и видео'],
    de: { title: 'Kontakt & Projektanfrage | Foto Panda Osnabrück', description: 'Planen Sie eine Foto- oder Videoproduktion? Schreiben Sie Foto Panda über das Anfrageformular, per E-Mail oder rufen Sie an. Wir besprechen Ihr Projekt persönlich.' },
    ru: { title: 'Контакты и заявка на съёмку | Foto Panda', description: 'Расскажите о вашей идее: отправьте заявку на фото- или видеосъёмку, напишите на электронную почту или позвоните Foto Panda. Обсудим детали лично.' } },
  { path: '/impressum', component: 'Impressum', noindex: true, intent: 'Юридическая информация (не завершена)', topics: ['Impressum', 'Юридическая информация'], de: { title: 'Impressum | Foto Panda', description: 'Anbieterangaben und öffentliche Kontaktdaten von Foto Panda. Rechtliche Angaben werden vervollständigt.' }, ru: { title: 'Юридическая информация | Foto Panda', description: 'Сведения об исполнителе и публичные контакты Foto Panda. Юридическая информация дополняется.' } },
  { path: '/datenschutz', component: 'Datenschutz', noindex: true, intent: 'Информация об обработке данных (требует проверки владельцем)', topics: ['Datenschutz', 'Защита персональных данных'], de: { title: 'Datenschutz | Foto Panda', description: 'Informationen zur Datenverarbeitung auf der Website und bei Kontaktanfragen an Foto Panda.' }, ru: { title: 'Защита персональных данных | Foto Panda', description: 'Информация об обработке данных на сайте Foto Panda и при отправке заявки на съёмку.' } },
]
export const notFound: Pick<SeoPage, 'de' | 'ru' | 'noindex'> = {
  noindex: true,
  de: { title: 'Seite nicht gefunden | Foto Panda', description: 'Diese Seite ist nicht verfügbar. Entdecken Sie die Leistungen von Foto Panda oder nehmen Sie Kontakt auf.' },
  ru: { title: 'Страница не найдена | Foto Panda', description: 'Эта страница недоступна. Посмотрите услуги Foto Panda или свяжитесь с нами.' },
}
export function pageCopy(path: string, language: Language) {
  return (pages.find(page => page.path === path) ?? notFound)[language]
}
