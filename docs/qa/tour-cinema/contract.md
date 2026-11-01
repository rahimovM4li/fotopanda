# Home tour design contract

Purpose: demonstrate the difference between a photo, a film and an app-connected printed memory; lead to a project inquiry. Audience: couples and families exploring Foto Panda. Direction: cinema and photographic craft, existing ink/orange/ivory palette, real local wedding media.

Reference: the previous tour changed copy while barely changing the image; user explicitly requested a more convincing wow effect. Use a physical photo stack, expanded film and opening album as three visibly different compositions. Contain all transforms within the tour. Keep explicit video controls and actual contact navigation.

Targets: 1440x900 and 390x844, German and Russian; also compact desktop and reduced motion. Desktop scroll and chapter buttons must reach all three scenes. Mobile and reduced motion retain all text and the playable film. Loading/error/retry remain the existing LivingMedia state machine. No external data, permission prompts or empty result states.

Updated mobile contract: portrait phones also use all three animated acts, driven by native scrolling and directly tappable chapter controls. The stage uses the small viewport height and fits its own CTA; the existing floating CTA yields while the tour is held. Only reduced-motion preference or a viewport shorter than 560px selects the readable static version. Actual phone hardware/Safari was not available; Chromium touch emulation was used.
