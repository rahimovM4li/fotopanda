# SEO и GEO Foto Panda — отчёт о внедрении

Дата: 4 ноября 2026 года. Изменения реализованы в репозитории. Публикация на Vercel и действия в Search Console не выполнялись.

## Аудит до изменений

Сайт использует React 19, React Router 7, Vite 6, Motion и статический хостинг Vercel. Замена стека не потребовалась.

| Немецкий маршрут | Назначение | Русский маршрут после изменений | Индексация |
| --- | --- | --- | --- |
| `/` | Знакомство со студией и услугами | `/ru` | Да |
| `/fotografie` | Свадьбы, портреты, семьи, школы, события | `/ru/fotografie` | Да |
| `/lebendige-medien` | Фотобуки и печатные материалы с видео | `/ru/lebendige-medien` | Да |
| `/gastronomie` | Съёмка блюд, ресторанов и интерактивные меню | `/ru/gastronomie` | Да |
| `/unternehmen` | Фото и видео для компаний | `/ru/unternehmen` | Да |
| `/arbeiten` | Портфолио и видеопримеры | `/ru/arbeiten` | Да |
| `/ueber-uns` | Подход студии, Оснабрюк, работа по Германии | `/ru/ueber-uns` | Да |
| `/kontakt` | Форма заявки, телефон, публичная почта | `/ru/kontakt` | Да |
| `/impressum` | Незавершённые юридические сведения | `/ru/impressum` | Нет |
| `/datenschutz` | Обработка данных; требуется проверка владельца | `/ru/datenschutz` | Нет |

До внедрения первоначальный HTML содержал пустой React-контейнер. Метаданные внутренних страниц и `hreflang` появлялись после JavaScript. Русский язык определялся через `?lang=ru` и localStorage; переключатель был набором кнопок. Canonical и sitemap использовали адрес без `www`. Sitemap поддерживался вручную, а `robots.txt` запрещал обход юридических страниц, мешая прочитать их клиентский `noindex`. Единственная статическая JSON-LD описывала бизнес, без графа страниц; неподтверждённый тип `PhotographyBusiness` удалён. Catch-all rewrite и маршрут `* → Home` превращали неизвестные адреса в soft 404.

Проверка опубликованного сайта через HTTPS до публикации этой работы подтвердила: `/`, `/ru/fotografie`, неизвестный `/seo-audit-missing-page` и `/fotografie?lang=ru` возвращают 200 и один пустой HTML-контейнер. `/robots.txt` и `/sitemap.xml` доступны с 200, но содержат прежние правила. Это исходное состояние production, а не результат нового внедрения.

Медиа уже использовали локализованные описания, AVIF/WebP/JPEG, фиксированные пропорции и преимущественно отложенную загрузку. Исключение: изображения колеса портфолио не имели размеров и responsive sources; исправлено. Имеющиеся FAQ, описания процесса и ссылки на контакт уже содержат полезные фактические ответы. Они сохранены без новых рекламных обещаний.

## Что реализовано

- Единый реестр `src/seo/pages.ts` управляет маршрутами React, сборкой HTML, метаданными, sitemap и картой SEO. Старый `useSeo` и дублирующие SEO-поля удалены.
- Сборка создаёт 20 самостоятельных HTML-страниц и две локализованные страницы ошибки. React сначала разрешает ленивые модули, затем создаёт полный HTML для `hydrateRoot`. Незавершённая граница Suspense останавливает сборку. Браузерные чанки внутренних страниц остаются раздельными.
- Немецкие URL сохранены. Русские страницы размещены под `/ru`, без завершающего слеша. Язык URL имеет приоритет над browser language и localStorage. Явный выбор сохраняется под прежним ключом `foto-panda.language.v1`, но не меняет содержание открытого URL автоматически. Переключение сохраняет параметры, якорь и состояние страницы; ссылки доступны роботам и без JS.
- Middleware возвращает постоянный 308 для поддерживаемых старых `lang=de/ru`, вариантов `.html`, `/index.html`, завершающего слеша и домена без `www`. Остальные параметры, включая повторяющиеся, сохраняются. Неизвестные страницы не перенаправляются на главную. В Vercel убран глобальный SPA rewrite, включены clean URLs. Middleware отдаёт локализованную ошибку с 404; локальный сервер проверяет ту же логику. Порядок встроенных редиректов CDN нужно подтвердить после deployment.
- У каждой страницы собственные немецкие/русские title и description, canonical на `https://www.fotopandastudio.de`, локализованные OG/Twitter-метаданные. Русские canonical не ведут на немецкие версии. Для индексируемых страниц установлены взаимные `de`, `ru` и `x-default` (немецкая версия). Региональный таргетинг для русского языка не навязывается; `ru_RU` используется только как формат OG locale.
- `robots.txt` разрешает обход, включая юридические страницы, чтобы можно было прочитать `noindex, follow`. Sitemap содержит ровно 16 канонических URL. Языковые альтернативы описаны в HTML; второй параллельный набор в XML не нужен. `lastmod` не добавлен: достоверных дат изменения отдельных страниц нет. Sitemap index для такого объёма не требуется.
- JSON-LD связывает Organization, WebSite, WebPage / AboutPage / ContactPage / CollectionPage, Service и BreadcrumbList через стабильные `@id`. Используются только сведения из утверждённых данных: бренд, публичная почта, телефон, Оснабрюк, Германия и имеющиеся социальные ссылки. Внутренний адрес доставки формы не включён в SEO-разметку. Без подтверждённого полного адреса выбран Organization вместо попытки получить LocalBusiness rich result. Нет рейтингов, отзывов, цен, дат публикации или выдуманных реквизитов.
- Сохранены визуальные заголовки; исправлен пропуск уровня в заголовке контактного блока портфолио с сохранением оформления. Галерея получила размеры, responsive WebP sources и lazy loading. Встроенные видеоплееры получили явные постеры из тех же утверждённых файлов. Click-to-play, управление звуком и мобильный диалог сохранены.
- Preview-сборки получают `noindex` в HTML и клиентском обновлении head. Middleware дополнительно выставляет `X-Robots-Tag` для preview/staging-хостов. Production HTML остаётся индексируемым. Год в footer фиксируется при сборке, чтобы переход через Новый год не вызывал hydration mismatch.

Для GEO использованы ясные описания услуг и существующие сведения о географии, процессе и следующем шаге. Информация доступна в обычном HTML всем посетителям одинаково. `llms.txt` не добавлен: для этого небольшого сайта не выявлено конкретной пользы сверх доступного HTML, внутренних ссылок и sitemap. Никаких гарантий индексации, позиций или цитирования не даётся.

Карта всех страниц с намерением, темой, title, description, фактическим H1, canonical и статусом: [SEO-MAP.md](SEO-MAP.md). Она обновляется сборкой.

## Проверки

| Проверка | Результат |
| --- | --- |
| TypeScript, включая middleware и SSR entry | Пройдено |
| ESLint | Пройдено |
| Production build | Пройдено, 22 HTML-файла |
| Preview build (`SEO_PREVIEW=1`) и SEO-проверки | Пройдено; после проверки восстановлена production-сборка |
| `check:i18n` | 625 переводов, покрытие существующего UI и параметров |
| `check` | 201 вариант фото, 6 активных видео, ссылки на медиа, 4 шага, 7 FAQ, 10 тем формы |
| `check:seo` | 20 языковых страниц, 16 URL sitemap, уникальные метаданные, один H1, canonical/hreflang, JSON-LD, 460 внутренних ссылок, доступность используемых файлов, размеры share image, редиректы, 404, preview |
| XML | Sitemap разбирается XML-парсером, production URL согласованы с реестром |
| Chromium | 40 открытий: все 20 страниц на 1440×1000 и 390×844; без ошибок JavaScript/гидратации, горизонтального переполнения и загрузки MP4 до воспроизведения |
| Без JavaScript | Главная DE/RU, фотографии DE, живые медиа RU, гастрономия RU, контакт RU: H1 виден, содержательный текст находится в main |
| Ошибки и параметры | Неизвестные DE/RU URL дают 404; tracking/query/hash не меняют canonical; legacy URL сохраняют остальные параметры |
| Интерактивность | Переключение языка с клавиатуры и сохранением введённой заявки/параметров, мобильное меню Enter/Escape, навигация, refresh, reduced motion, мобильное воспроизведение и закрытие, форма с перехваченным Web3Forms-запросом |
| Транспорт формы | Mock-тесты: успешная отправка, телефон/почта, кириллица, consent, honeypot, ошибки HTTP/JSON, rate limit, timeout. Реальные сообщения не отправлялись |

Скриншоты и локальные протоколы: `output/playwright/seo/` (не включаются в git). Проверки относятся к локальной production-сборке; это не измерения реальных Core Web Vitals. JSON-LD проверена синтаксически и по используемым полям/связям; окончательную оценку Google следует выполнять на опубликованных URL.

## Что остаётся владельцу / после публикации

1. Заполнить отсутствующие юридические реквизиты в `siteConfig.legal` и проверить юридические тексты. Эти страницы намеренно остались `noindex`; не менять статус автоматически только ради количества URL.
2. Проверить фактические ответы CDN Vercel, redirects и indexing headers после deployment по инструкции ниже. Локальный preview исполняет middleware, но не эмулирует все внутренние стадии CDN.
3. Проверить Schema.org Validator / Google Rich Results Test на опубликованных страницах. Отсутствие расширенного результата для обычной Service-разметки само по себе не ошибка.
4. В видеороликах подтверждено наличие аудиодорожек. Утверждённых транскриптов и достоверных дат публикации в репозитории нет. Транскрипты и субтитры не выдумывались; речевое содержание требует прослушивания и проверки перед их подготовкой. VideoObject не добавлен без достаточных подтверждённых метаданных.
5. Выполнить checklist Search Console. Никакие verification tokens не созданы, запросы индексации не отправлены.

## Сборка и deployment

Использовать Node.js 22, `npm ci`, затем:

```sh
npm run lint
npm run typecheck
npm run check:i18n
npm run check
node tests/inquiry.test.mjs
npm run build
npm run check:seo
```

Vercel: build command `npm run build`, output directory `dist`; middleware должен собираться из корня проекта. Публиковать проект с middleware и `vercel.json`, а не загружать только каталог HTML. Домен `www.fotopandastudio.de` и домен без `www` должны быть прикреплены к этому проекту; проверить настройки перенаправления доменов в dashboard, чтобы они не направляли обратно на адрес без `www`. Текущую конфигурацию получателя Web3Forms и ключ не менять.

Нужна новая полноценная сборка: замена одних JS-файлов не обновит HTML, sitemap и метаданные. После любых изменений маршрутов/контента выполнять build и `check:seo`, включать обновлённые `public/robots.txt`, `public/sitemap.xml`, `docs/SEO-MAP.md`. Отдельных SEO-секретов или токенов не требуется.

Локальная проверка HTTP: `npm run preview:seo`, адрес `http://127.0.0.1:4186`. Обычный Vite preview не исполняет Vercel middleware и не подходит для проверки кодов ответа/редиректов. Для staging вне Vercel задавать `SEO_PREVIEW=1` при сборке; **не задавать его в production**. В Vercel используется `VERCEL_ENV`. `noindex` не заменяет ограничение доступа, если preview содержит непубличные сведения.

После публикации проверить:

```sh
curl -I https://www.fotopandastudio.de/ru/fotografie
curl -I 'https://www.fotopandastudio.de/fotografie?lang=ru&utm_source=qa'
curl -I https://www.fotopandastudio.de/seo-check-missing-page
curl -I https://www.fotopandastudio.de/ru/seo-check-missing-page
curl https://www.fotopandastudio.de/robots.txt
curl https://www.fotopandastudio.de/sitemap.xml
```

Ожидания: канонические страницы 200; legacy → 308 на `/ru/fotografie?utm_source=qa`; неизвестные страницы 404; публичные robots/sitemap 200; production не содержит случайного `noindex` или preview origin. Проверить отдельно немецкие и русские юридические страницы: `noindex, follow` в исходном HTML, без запрета обхода. Проверить страницу preview: `noindex` в HTML и `X-Robots-Tag`, в том числе после переключения языка. Открыть View Source у DE/RU страниц: язык, основной текст, metadata и JSON-LD должны быть видны до исполнения JS.

## Google Search Console: checklist владельца

- Подтвердить владение Domain property `fotopandastudio.de` либо нужной URL-prefix property `https://www.fotopandastudio.de/`. Использовать только реальный токен, выданный Google владельцу.
- Отправить `https://www.fotopandastudio.de/sitemap.xml` и убедиться, что Google успешно его прочитал.
- Через URL Inspection проверить `/`, `/ru`, `/fotografie`, `/ru/fotografie`, `/gastronomie`, `/ru/kontakt`.
- Выполнить Live Test: доступность URL, исходный/отрендеренный HTML, текст нужного языка, отсутствие блокирующего robots/noindex, правильный canonical.
- Запросить индексацию приоритетных страниц после успешной проверки.
- Наблюдать Page indexing, Sitemaps, выбранные Google canonical и доступные отчёты structured data. Проверять отсутствие soft 404 и нежелательной индексации юридических/preview-страниц.

## Официальные источники решений

- [Vite SSR / prerendering](https://vite.dev/guide/ssr)
- [React static prerendering](https://react.dev/reference/react-dom/static/prerenderToNodeStream) и [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Vercel Routing Middleware](https://vercel.com/docs/routing-middleware), [конфигурация](https://vercel.com/docs/project-configuration/vercel-json), [custom 404](https://vercel.com/kb/guide/custom-404-page)
- [Google: локализованные страницы](https://developers.google.com/search/docs/specialty/international/localized-versions), [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
