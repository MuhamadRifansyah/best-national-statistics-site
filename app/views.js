// views.js — renders each page of the site from DATA. No network, no placeholders.
"use strict";

function cardHTML(item) {
  return '<article class="stat-card"><div class="stat-label">' + esc(item.label) + '</div>' +
    '<div class="stat-value">' + esc(item.value) + '</div>' +
    '<div class="stat-meta">' + esc(item.year) + ' · Source: ' + esc(item.source) +
    (item.detail ? ' · ' + esc(item.detail) : '') + '</div></article>';
}

function sectionHTML(title, sub, inner) {
  return '<section class="card"><h2>' + esc(title) + '</h2>' +
    (sub ? '<p class="sub">' + esc(sub) + '</p>' : '') + inner + '</section>';
}

function renderDashboard() {
  const cards = DATA.headline.map(cardHTML).join("");
  const growth = barChart({ data: DATA.gdpGrowth.map(function (d) { return { label: String(d.year), value: d.value }; }), unit: "%", color: "#0f4c81" });
  const infl = lineChart({ data: DATA.inflation.map(function (d) { return { label: String(d.year), value: d.value }; }), unit: "%", color: "#b91c1c" });
  return '<h1>Indonesia in Numbers</h1>' +
    '<p class="lede">The key facts about Indonesia — population, economy, work, education and health — from published statistics by BPS (Statistics Indonesia), the World Bank and UNDP. Every figure shows its year and source.</p>' +
    '<div class="stat-grid">' + cards + '</div>' +
    '<div class="two-col">' +
    sectionHTML("GDP growth, 2020–2024 (% per year)", "Real GDP growth. The 2020 fall is the COVID-19 contraction; growth has held near 5% since 2022. Source: BPS.", growth) +
    sectionHTML("Inflation, 2021–2024 (% per year)", "Consumer price inflation, annual average. Source: BPS.", infl) +
    '</div>' +
    sectionHTML("At a glance", "Indonesia is the world's 4th most populous country and Southeast Asia's largest economy.",
      '<ul class="facts"><li><strong>281.6 million</strong> people (BPS, 2024), spread over 38 provinces and more than 17,000 islands.</li>' +
      '<li><strong>Rp 22,139 trillion</strong> of GDP in 2024 (BPS) — about <strong>US$ 1.396 trillion</strong>.</li>' +
      '<li>Poverty fell to <strong>8.57%</strong> in September 2024 (BPS), the lowest on record, down from 9.03% in March 2024.</li>' +
      '<li><strong>58.8%</strong> of people live in urban areas (World Bank, 2024).</li></ul>') +
    '<p class="source-note">Sources: BPS (Statistics Indonesia), World Bank World Development Indicators, UNDP Human Development Report. Figures are shown exactly as published; see each page for year and source.</p>';
}

function renderPopulation() {
  const demo = DATA.demographics.map(cardHTML).join("");
  const donut = donutChart({ data: DATA.ageStructure.map(function (d) { return { label: d.group, value: d.share }; }) });
  const bars = barChart({ data: DATA.topProvinces2024.map(function (d) { return { label: d.name.replace(" ", "\u00a0"), value: d.pop }; }), unit: "m", color: "#0f4c81", decimals: 1 });
  return '<h1>Population &amp; Demographics</h1>' +
    '<p class="lede">281.6 million people in 2024 (BPS) — the world\'s 4th largest population. Java is home to more than half of all Indonesians.</p>' +
    '<div class="stat-grid">' + demo + '</div>' +
    '<div class="two-col">' +
    sectionHTML("Age structure, 2024 (% of population)", "A young population: more than two-thirds are of working age (15–64). Source: World Bank, 2024.", donut) +
    sectionHTML("Where Indonesians live", "Java holds about 52% of the national population on about 7% of the land. Source: BPS / World Bank.", '<p>West Java alone (50.3 million people in 2024) has more people than Spain. The three Javanese provinces — West, Central and East Java — together hold about 130 million people.</p>') +
    '</div>' +
    sectionHTML("Largest provinces, 2024 (millions of people)", "BPS 2024 population estimates, rounded to one decimal. Use the Data Explorer page to sort and filter all provinces in the table.", bars) +
    '<p class="source-note">Sources: BPS population estimates 2024; World Bank World Development Indicators 2024.</p>';
}

function renderEconomy() {
  const growth = barChart({ data: DATA.gdpGrowth.map(function (d) { return { label: String(d.year), value: d.value }; }), unit: "%", color: "#0f4c81" });
  const sectorShort = ["Manufacturing", "Trade", "Agriculture", "Construction", "Mining", "Transport", "Info & comm", "Hotels & food"];
  const sectorBars = barChart({ data: DATA.sectors.map(function (d, i) { return { label: sectorShort[i], value: d.share }; }), unit: "%", color: "#b91c1c", decimals: 1 });
  const expRows = DATA.expenditure.map(function (d) {
    return '<tr><td>' + esc(d.name) + '</td><td class="num">' + (d.share > 0 ? "+" : "") + d.share.toFixed(1) + '%</td></tr>';
  }).join("");
  const topExp = DATA.trade.topExports.map(function (d) {
    return '<tr><td>' + esc(d.name) + '</td><td class="num">' + d.share.toFixed(1) + '%</td></tr>';
  }).join("");
  return '<h1>Economy</h1>' +
    '<p class="lede">GDP of Rp 22,139 trillion in 2024 (BPS), growing 5.03%. Manufacturing is the largest single sector at 19.0% of GDP.</p>' +
    '<div class="stat-grid">' +
    cardHTML({ label: "GDP (nominal)", value: "Rp 22,139 trillion", year: "2024", source: "BPS", detail: "US$ 1.396 trillion" }) +
    cardHTML({ label: "GDP per capita", value: "US$ 4,960", year: "2024", source: "BPS", detail: "Rp 78.62 million" }) +
    cardHTML({ label: "GDP growth", value: "5.03%", year: "2024", source: "BPS", detail: "5.05% in 2023" }) +
    cardHTML({ label: "Inflation (CPI)", value: "1.57%", year: "2024", source: "BPS", detail: "2.61% in 2023" }) +
    cardHTML({ label: "Goods exports", value: "US$ 264.7 billion", year: "2024", source: "BPS / World Bank" }) +
    cardHTML({ label: "Goods imports", value: "US$ 233.7 billion", year: "2024", source: "BPS / World Bank", detail: "Trade surplus US$ 31.0bn" }) +
    '</div>' +
    '<div class="two-col">' +
    sectionHTML("GDP growth, 2020–2024 (% per year)", "Real GDP growth. Source: BPS.", growth) +
    sectionHTML("GDP by sector, 2024 (% of GDP)", "Share of nominal GDP. Manufacturing leads, followed by trade and agriculture. Source: BPS.", sectorBars) +
    '</div>' +
    '<div class="two-col">' +
    sectionHTML("GDP by expenditure, 2024 (% of GDP)", "Household consumption is more than half of GDP. Imports enter with a minus sign. Source: BPS.", '<table class="data-table"><thead><tr><th>Component</th><th>Share</th></tr></thead><tbody>' + expRows + '</tbody></table>') +
    sectionHTML("Top export products, 2024 (% of goods exports)", "Mineral fuels are the largest export group, followed by palm-oil-related fats and oils. Source: CEPII BACI / customs data.", '<table class="data-table"><thead><tr><th>Product group</th><th>Share</th></tr></thead><tbody>' + topExp + '</tbody></table>') +
    '</div>' +
    '<p class="source-note">Sources: BPS national accounts 2024; World Bank; BCA research table of BPS sector data.</p>';
}

function renderPeople() {
  const cards = DATA.people.map(cardHTML).join("");
  const pov = lineChart({ data: DATA.poverty.map(function (d) { return { label: String(d.year), value: d.value }; }), unit: "%", color: "#0f4c81", decimals: 1 });
  const unemp = lineChart({ data: DATA.unemployment.map(function (d) { return { label: String(d.year), value: d.value }; }), unit: "%", color: "#b91c1c", decimals: 1 });
  return '<h1>People: Work, Education &amp; Health</h1>' +
    '<p class="lede">Unemployment fell to 4.9% and poverty to 8.57% in 2024, but 60% of workers are still in informal jobs. Adult literacy is 96.0%.</p>' +
    '<div class="stat-grid">' + cards + '</div>' +
    '<div class="two-col">' +
    sectionHTML("Poverty rate, 2021–2024 (% of population)", "National poverty line, BPS. The 2024 value is the September figure (8.57%); the series uses the annual 8.6%. Source: BPS.", pov) +
    sectionHTML("Unemployment rate, 2021–2024 (% of labour force)", "Open unemployment rate, BPS. Below the pre-pandemic level since 2024. Source: BPS.", unemp) +
    '</div>' +
    sectionHTML("Reading the numbers", "What the figures mean together.",
      '<ul class="facts"><li>Jobs are plentiful but often informal: <strong>60%</strong> of workers were in informal employment in February 2024 (World Bank), up from 2019.</li>' +
      '<li>Schooling is near-universal at primary level (<strong>100.0%</strong> enrolment, World Bank 2024) and tertiary enrolment reached <strong>44.9%</strong> (2023).</li>' +
      '<li>Life expectancy is <strong>71.3 years</strong> (World Bank, 2024) and the Human Development Index is <strong>0.728</strong> (UNDP, 2023) — high human development.</li>' +
      '<li><strong>72.8%</strong> of Indonesians used the internet in 2024 (World Bank).</li></ul>') +
    '<p class="source-note">Sources: BPS (Sakernas labour force survey, Susenas); World Bank World Development Indicators; ILOSTAT; UNDP.</p>';
}
