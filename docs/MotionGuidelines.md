# NIVO Group Motion Guidelines

## Principle

Motion supports orientation and feedback. It must never become decoration that
weakens the NIVO Group's premium corporate character, delays access to content,
or depends on client-side JavaScript.

## Current motion system

The site currently uses lightweight CSS-only transitions:

- buttons: background, border, color, and a one-pixel lift on hover
- division cards: border, shadow, and a small lift on hover
- social placeholders: border-color feedback
- in-page anchors: smooth scrolling

The shared duration is 180ms with an ease curve. These effects are deliberately
subtle and do not block rendering or navigation.

## Accessibility

All non-essential transitions are removed for
`prefers-reduced-motion: reduce`. Smooth scrolling becomes immediate in that
mode.

Do not add autoplaying video, looping decorative animation, parallax, or
scroll-driven effects without a documented user benefit and an equivalent
reduced-motion path.

## Interaction rules

- Keep hover motion small and reversible.
- Never communicate essential information through motion alone.
- Preserve keyboard focus visibility independently of hover behavior.
- Do not animate layout in a way that causes surrounding content to shift.
- Prefer CSS for simple state feedback; avoid a JavaScript animation library
  for static marketing interactions.

## Future 3D mascot work

The mascot is optional and must not block the page. Any future loading
experience must:

1. stay hidden if its script fails;
2. preserve a fully usable no-JavaScript path;
3. honor reduced-motion preferences;
4. have a clear time limit and dismiss behavior; and
5. be loaded only after approved artwork and a performance budget are supplied.

Do not re-add React solely for mascot or animation work.
