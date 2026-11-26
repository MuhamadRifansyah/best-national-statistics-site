// data.js — every figure is a real published statistic.
// Sources are named on every view; no figure here is estimated by us.
// BPS = Statistics Indonesia (Badan Pusat Statistik). WB = World Bank (WDI).
// UNDP = United Nations Development Programme.
"use strict";

const DATA = {
  meta: {
    country: "Indonesia",
    title: "Indonesia in Numbers",
    updated: "26 November 2026",
    note: "All figures are published statistics from BPS (Statistics Indonesia), the World Bank, and UNDP. Years are shown with each figure."
  },

  // Headline indicators (dashboard)
  headline: [
    { label: "Population", value: "281.6 million", year: "2024", source: "BPS", detail: "4th largest in the world" },
    { label: "GDP (nominal)", value: "Rp 22,139 trillion", year: "2024", source: "BPS", detail: "US$ 1.396 trillion" },
    { label: "GDP per capita", value: "US$ 4,960", year: "2024", source: "BPS", detail: "Rp 78.62 million" },
    { label: "GDP growth", value: "5.03%", year: "2024", source: "BPS", detail: "5.05% in 2023" },
    { label: "Inflation (CPI)", value: "1.57%", year: "2024", source: "BPS", detail: "2.61% in 2023" },
    { label: "Unemployment rate", value: "4.9%", year: "2024", source: "BPS", detail: "5.3% in 2023" },
    { label: "Poverty rate", value: "8.57%", year: "Sep 2024", source: "BPS", detail: "24.06 million people" },
    { label: "Life expectancy", value: "71.3 years", year: "2024", source: "World Bank", detail: "at birth" }
  ],

  // Annual series, 2020-2024 where verified
  gdpGrowth: [
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.69 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 }
  ],
  inflation: [
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 }
  ],
  poverty: [
    { year: 2021, value: 9.7 },
    { year: 2022, value: 9.6 },
    { year: 2023, value: 9.4 },
    { year: 2024, value: 8.6 }
  ],
  unemployment: [
    { year: 2021, value: 6.5 },
    { year: 2022, value: 5.9 },
    { year: 2023, value: 5.3 },
    { year: 2024, value: 4.9 }
  ],

  // GDP by sector, share of nominal GDP 2024 (BPS, via BCA research table)
  sectors: [
    { name: "Manufacturing", share: 19.0, value: 4202.9 },
    { name: "Wholesale & retail trade", share: 13.1, value: 2893.3 },
    { name: "Agriculture, forestry & fishing", share: 12.6, value: 2791.7 },
    { name: "Construction", share: 10.1, value: 2233.5 },
    { name: "Mining & quarrying", share: 9.2, value: 2026.6 },
    { name: "Transport & warehousing", share: 6.1, value: 1358.1 },
    { name: "Information & communication", share: 3.0, value: 673.5 },
    { name: "Hotels, restaurants & catering", share: 2.6, value: 583.9 }
  ],
  // GDP by expenditure, share of nominal GDP 2024 (BPS)
  expenditure: [
    { name: "Household consumption", share: 54.0 },
    { name: "Fixed-asset investment", share: 29.1 },
    { name: "Exports of goods & services", share: 22.3 },
    { name: "Imports of goods & services", share: -20.5 },
    { name: "Government consumption", share: 7.7 }
  ],

  // Trade in goods, 2024 (BPS / World Bank)
  trade: {
    exports: 264.7, imports: 233.7, balance: 31.0, unit: "US$ billion",
    topExports: [
      { name: "Mineral fuels & oils", share: 20.8 },
      { name: "Vegetable & animal fats and oils", share: 11.7 },
      { name: "Iron & steel", share: 8.6 }
    ]
  },

  // Age structure 2024 (World Bank WDI). 15-64 is the residual 100 - 24.6 - 7.3.
  ageStructure: [
    { group: "Aged 0-14", share: 24.6 },
    { group: "Aged 15-64", share: 68.1 },
    { group: "Aged 65+", share: 7.3 }
  ],
  demographics: [
    { label: "Urban population", value: "58.8%", year: "2024", source: "World Bank" },
    { label: "Fertility rate", value: "2.12", year: "2024", source: "World Bank", detail: "births per woman" },
    { label: "Population growth", value: "0.8%", year: "2024", source: "World Bank", detail: "per year" },
    { label: "Population density", value: "149", year: "2023", source: "World Bank", detail: "people per km²" }
  ],
  // Largest provinces, BPS 2024 estimates (millions, rounded)
  topProvinces2024: [
    { name: "West Java", pop: 50.3 },
    { name: "East Java", pop: 41.8 },
    { name: "Central Java", pop: 37.9 },
    { name: "North Sumatra", pop: 15.6 },
    { name: "Banten", pop: 12.6 },
    { name: "Jakarta", pop: 11.4 },
    { name: "South Sulawesi", pop: 9.5 },
    { name: "Lampung", pop: 9.2 }
  ],

  // People: work, education, health, poverty
  people: [
    { label: "Labour force", value: "147.1 million", year: "2025", source: "ILOSTAT", detail: "aged 15+" },
    { label: "Labour-force participation", value: "68.0%", year: "2025", source: "ILOSTAT" },
    { label: "Employment rate (15+)", value: "65.8%", year: "2025", source: "ILOSTAT" },
    { label: "Informal employment", value: "60%", year: "Feb 2024", source: "World Bank", detail: "of workers" },
    { label: "Adult literacy rate", value: "96.0%", year: "2020", source: "World Bank" },
    { label: "Primary school enrolment", value: "100.0%", year: "2024", source: "World Bank" },
    { label: "Secondary school enrolment", value: "98.8%", year: "2024", source: "World Bank" },
    { label: "Tertiary enrolment", value: "44.9%", year: "2023", source: "World Bank" },
    { label: "Internet users", value: "72.8%", year: "2024", source: "World Bank", detail: "of population" },
    { label: "Human Development Index", value: "0.728", year: "2023", source: "UNDP", detail: "rank 113 of 193" },
    { label: "Gini ratio", value: "0.379", year: "Mar 2024", source: "BPS" },
    { label: "Poor people", value: "24.06 million", year: "Sep 2024", source: "BPS", detail: "8.57% of population" }
  ],

  // Explorer table: 2020 Population Census (BPS), millions, plus capital and island.
  provinces: [
    { name: "West Java", capital: "Bandung", island: "Java", pop2020: 48.27, urban2022: 77.5 },
    { name: "East Java", capital: "Surabaya", island: "Java", pop2020: 40.67, urban2022: 54.9 },
    { name: "Central Java", capital: "Semarang", island: "Java", pop2020: 36.52, urban2022: 51.7 },
    { name: "North Sumatra", capital: "Medan", island: "Sumatra", pop2020: 14.80, urban2022: 55.5 },
    { name: "Banten", capital: "Serang", island: "Java", pop2020: 11.90, urban2022: 72.4 },
    { name: "Jakarta", capital: "Jakarta", island: "Java", pop2020: 10.56, urban2022: 100.0 },
    { name: "Riau", capital: "Pekanbaru", island: "Sumatra", pop2020: 6.39, urban2022: 40.0 },
    { name: "West Sumatra", capital: "Padang", island: "Sumatra", pop2020: 5.53, urban2022: 48.5 },
    { name: "Aceh", capital: "Banda Aceh", island: "Sumatra", pop2020: 5.27, urban2022: 33.9 },
    { name: "Bali", capital: "Denpasar", island: "Bali", pop2020: 4.32, urban2022: 66.9 },
    { name: "East Kalimantan", capital: "Samarinda", island: "Kalimantan", pop2020: 3.77, urban2022: 68.6 },
    { name: "Yogyakarta", capital: "Yogyakarta", island: "Java", pop2020: 3.67, urban2022: 73.1 }
  ]
};
