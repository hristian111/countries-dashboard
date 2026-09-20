# Countries Dashboard

A single-page app that reads `countries.json` over HTTP and shows the countries as a grid of cards.
It supports search, filtering by continent, sorting, a light/dark theme, and shows 12 cards at a time.

## Running it locally

Requires Node 22.12+ (developed on 24.18) and npm.

```bash
npm install
npm start
```

Then open http://localhost:4200. To build for production, run `npm run build` — the output goes to `dist/`.

## Stack, and why

- **Angular 22** with standalone components, zoneless change detection and TypeScript. The task
  prefers React but allows another framework I'm comfortable with. Angular is what I use every day,
  so I could spend the time on the actual requirements — accessibility, theming, state — instead of
  learning a new framework.
- **Plain CSS** with custom properties, no UI library. Both themes use the same variable names with
  different values, so no component hardcodes a colour.
- **TypeScript** everywhere, with no `any`.

## How it works

- **`CountryService`** is the only place that makes HTTP calls. It fetches `/countries.json` (served
  from `public/`, so it works like a real `GET /countries` endpoint) and adds a 1.5s delay so the
  loading state is visible. The file contains 31 countries.
- **`CountriesComponent`** (`pages/countries`) holds the screen state in plain signals: `countries`
  (the full list), `displayedCountries` (max 12), `loading`, `error` and `continents`. A reactive
  form holds the search text, the selected continent and the sort field. Any change calls
  `applyFilters()`, which filters the full list, sorts it, takes the first 12 and sets
  `displayedCountries`. Filtering always starts from the full list, so the cap only limits what is
  shown, not what is searched.
- **`CountryCardComponent`** (`components/country-card`) just displays one country passed in as an
  input.
- **`ThemeService`** keeps the theme in a signal, sets `data-theme` on `<html>` and saves the choice
  in `localStorage`.
- **Continent colours** are CSS custom properties, so the card and the legend use the same value.
  The dark theme uses lighter shades that stay readable on dark backgrounds.

## Accessibility

- Semantic structure: `header`, `main`, `section` labelled by its heading, `ul`/`li` for the card
  list, `article` for each card, and headings in order (h1 → h2 → h3).
- Flags have `alt="Flag of <country>"`, every form control has a `<label>`, and the loading, error
  and empty-result messages use `role="status"` / `role="alert"` so screen readers announce them.
- Colour is never the only way information is shown — the continent name is always written next to
  its colour, both on the card and in the legend.
- Lighthouse accessibility: 100 in navigation mode and 25/25 audits passing in snapshot mode, in
  both light and dark themes, on desktop and mobile.

## What I'd improve with more time

- **Move filtering and sorting to a backend endpoint.** With 31 countries doing it in the browser is
  fine, but with a real dataset the client shouldn't fetch everything just to slice it locally.
- **A detail page per country**, with routing, instead of fitting everything on the card.
- **Proper pagination.** The 12-card cap is what the task asks for; in a real app I'd
  make the rest of the data reachable instead of cutting it off.

## Working with AI tools

See [AI_NOTES.md](AI_NOTES.md).
