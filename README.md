# best-national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/MuhamadRifansyah/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/MuhamadRifansyah/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Indonesia in Numbers — a national statistics site for **Indonesia**: population, economy, work, education and health, built from real published statistics. Every figure on the site shows its year and its source. Nothing is estimated or invented.

## Run it

```sh
cd app
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. No build step, no network requests, no external fonts — everything is local.

---

<sub>Entered on [make.fun](https://make.fun/?ref=1fc9hzy4&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>

## Pages

- **Dashboard** — headline indicators: population, GDP, GDP per capita, growth, inflation, unemployment, poverty and life expectancy, plus GDP-growth and inflation charts.
- **Population & Demographics** — age structure (donut chart), urban share, fertility, density, and the largest provinces in 2024.
- **Economy** — GDP, GDP per capita, growth, inflation, trade, GDP by sector and by expenditure, and the top export products.
- **People** — labour force, informal employment, literacy and school enrolment, internet use, HDI, Gini ratio and poverty, with poverty and unemployment trend charts.
- **Data Explorer** — a sortable, filterable table of provinces (2020 Population Census population and 2022 urban share), plus a national-indicators table for 2021–2024. Click any column heading to sort; use the search box and island filter to narrow the table.

All charts are hand-written SVG (no libraries, no network). All navigation, tabs, sorting and filtering work in plain vanilla JavaScript.

## Data sources

- **BPS (Statistics Indonesia)** — population 2024 (281.6 million), GDP 2024 (Rp 22,139 trillion; growth 5.03%; GDP per capita Rp 78.62 million / US$ 4,960), inflation 2024 (1.57%), unemployment 2024 (4.9%), poverty September 2024 (8.57%, 24.06 million people), Gini ratio March 2024 (0.379), GDP by sector and by expenditure 2024, 2020 Population Census province populations, 2022 urban shares.
- **World Bank (World Development Indicators)** — life expectancy 2024 (71.3 years), urban population 2024 (58.8%), fertility rate 2024 (2.12), population growth 2024 (0.8%), density 2023 (149/km²), age structure 2024 (0–14: 24.6%; 15–64: 68.1%; 65+: 7.3%), adult literacy 2020 (96.0%), school enrolment 2023–2024, internet users 2024 (72.8%), informal employment February 2024 (60%), goods trade 2024 (exports US$ 264.7 billion; imports US$ 233.7 billion).
- **UNDP Human Development Report** — Human Development Index 2023 (0.728, rank 113 of 193).
- **ILOSTAT** — labour force 2025 (147.1 million), labour-force participation 2025 (68.0%), employment rate 2025 (65.8%).

## How to run main.ts

`main.ts` copies `app/` and `screenshots/` into the output directory and writes `dossier.json` for the make.fun frontend entry format. It needs Node 22 (standard library only, plus the vendored `vendor/makefun-frontend.ts`).

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/app/`, `out/screenshots/` and `out/dossier.json`.

## Project layout

```
README.md
LICENSE
main.ts
vendor/makefun-frontend.ts
app/
  index.html
  style.css
  data.js        — all published figures, with sources
  charts.js      — hand-written SVG bar / line / donut charts
  views.js       — one render function per page
  main.js        — hash router + Data Explorer sort/filter
screenshots/
  1-dashboard.jpg
  2-economy.jpg
  3-provinces.jpg
  4-dashboard-phone.jpg
```

## License

MIT — see `LICENSE`.

Try make.fun: https://make.fun/r/1fc9hzy4
