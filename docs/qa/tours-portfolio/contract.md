# Design contract: remaining tours and portfolio

Use the established photographic craft direction from the home tour on book/menu pages. Phone portrait uses the same meaningful transformations, touch chapter navigation and visible actions. Book: closed cover, turning page, lifted film. Gastronomy: kitchen, plated detail, printed menu, digital menu. Real local assets only. Targets 390x844 and 1440x900, plus 375x667, RU/DE and reduced motion.

Portfolio: category filters control a continuous native-scroll photo ribbon with repeated cycles; scrolling adds displacement and spatial movement. Swipe, pointer drag, previous/next, keyboard, explicit pause and lightbox remain available. Autoplay pauses during interaction, dialog, offscreen and hidden-tab states. Reduced motion disables automatic and scroll-driven movement. Actual image and video open in the existing accessible lightbox. No form submissions or external services.

Loading/error/partial: existing player poster/loading/retry, no newly fetched catalog. Empty: filter only available categories; defensive empty component state. Primary action: inspect work, then inquire. One looping rail replaces the duplicate grid/gallery.
