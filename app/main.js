// main.js — hash router, navigation, and the Data Explorer (sort + filter).
"use strict";

var ROUTES = {
  dashboard: { title: "Dashboard", render: renderDashboard },
  population: { title: "Population", render: renderPopulation },
  economy: { title: "Economy", render: renderEconomy },
  people: { title: "People", render: renderPeople },
  explorer: { title: "Data Explorer", render: renderExplorer }
};

var explorerState = { query: "", island: "all", sortKey: "pop2020", sortDir: -1 };

function renderExplorer() {
  return '<h1>Data Explorer: Provinces</h1>' +
    '<p class="lede">Sort and filter the provinces below. Population is from the 2020 Population Census (BPS); urban share is from 2022 (BPS).</p>' +
    '<div class="card"><div class="explorer-controls">' +
    '<label>Search <input id="ex-q" type="search" placeholder="Type a province or capital…" value="' + esc(explorerState.query) + '"></label>' +
    '<label>Island <select id="ex-island">' +
    ['all', 'Java', 'Sumatra', 'Kalimantan', 'Bali'].map(function (v) {
      return '<option value="' + v + '"' + (explorerState.island === v ? " selected" : "") + '>' + (v === "all" ? "All islands" : v) + '</option>';
    }).join("") + '</select></label>' +
    '<span id="ex-count" class="count"></span></div>' +
    '<div class="table-wrap"><table class="data-table" id="ex-table"><thead><tr>' +
    '<th><button class="sort-btn" data-key="name">Province</button></th>' +
    '<th><button class="sort-btn" data-key="capital">Capital</button></th>' +
    '<th><button class="sort-btn" data-key="island">Island</button></th>' +
    '<th><button class="sort-btn" data-key="pop2020">Population 2020 (m)</button></th>' +
    '<th><button class="sort-btn" data-key="urban2022">Urban 2022 (%)</button></th>' +
    '</tr></thead><tbody id="ex-body"></tbody></table></div>' +
    '<p class="sub">Click a column heading to sort. Population 2020 is from the BPS 2020 Population Census; urban share 2022 is from BPS.</p></div>' +
    sectionHTML("National indicators, 2021–2024", "Annual series from BPS. Values are percentages unless noted.",
      '<table class="data-table"><thead><tr><th>Indicator</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th></tr></thead><tbody>' +
      '<tr><td>GDP growth (%)</td><td class="num">3.69</td><td class="num">5.31</td><td class="num">5.05</td><td class="num">5.03</td></tr>' +
      '<tr><td>Inflation, CPI (%)</td><td class="num">1.87</td><td class="num">5.51</td><td class="num">2.61</td><td class="num">1.57</td></tr>' +
      '<tr><td>Poverty rate (%)</td><td class="num">9.7</td><td class="num">9.6</td><td class="num">9.4</td><td class="num">8.6</td></tr>' +
      '<tr><td>Unemployment rate (%)</td><td class="num">6.5</td><td class="num">5.9</td><td class="num">5.3</td><td class="num">4.9</td></tr>' +
      '</tbody></table>');
}

function drawExplorerTable() {
  var q = explorerState.query.trim().toLowerCase();
  var rows = DATA.provinces.filter(function (p) {
    var okQ = !q || p.name.toLowerCase().indexOf(q) !== -1 || p.capital.toLowerCase().indexOf(q) !== -1;
    var okI = explorerState.island === "all" || p.island === explorerState.island;
    return okQ && okI;
  });
  var k = explorerState.sortKey, dir = explorerState.sortDir;
  rows.sort(function (a, b) {
    var av = a[k], bv = b[k];
    if (typeof av === "string") return dir * av.localeCompare(bv);
    return dir * (av - bv);
  });
  var body = document.getElementById("ex-body");
  if (!body) return;
  body.innerHTML = rows.map(function (p) {
    return "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.capital) + "</td><td>" + esc(p.island) + "</td>" +
      '<td class="num">' + p.pop2020.toFixed(2) + "</td>" +
      '<td class="num">' + p.urban2022.toFixed(1) + "%</td></tr>";
  }).join("") || '<tr><td colspan="5">No provinces match your filter.</td></tr>';
  var count = document.getElementById("ex-count");
  if (count) count.textContent = rows.length + " of " + DATA.provinces.length + " provinces shown";
}

function bindExplorer() {
  var q = document.getElementById("ex-q");
  if (q) q.addEventListener("input", function () { explorerState.query = q.value; drawExplorerTable(); });
  var sel = document.getElementById("ex-island");
  if (sel) sel.addEventListener("change", function () { explorerState.island = sel.value; drawExplorerTable(); });
  var btns = document.querySelectorAll(".sort-btn");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var key = b.getAttribute("data-key");
      if (explorerState.sortKey === key) explorerState.sortDir *= -1;
      else { explorerState.sortKey = key; explorerState.sortDir = (key === "name" || key === "capital" || key === "island") ? 1 : -1; }
      drawExplorerTable();
    });
  });
  drawExplorerTable();
}

function route() {
  var hash = (location.hash || "#/dashboard").replace(/^#\//, "");
  var r = ROUTES[hash] || ROUTES.dashboard;
  document.querySelectorAll(".nav-link").forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + (ROUTES[hash] ? hash : "dashboard"));
    a.setAttribute("aria-current", a.classList.contains("active") ? "page" : "false");
  });
  document.getElementById("view").innerHTML = r.render();
  document.title = r.title + " — Indonesia in Numbers";
  if (hash === "explorer") bindExplorer();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", route);
