// charts.js — hand-written SVG charts. No libraries, no network.
// Every chart labels each bar/point with its real value.
"use strict";

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

function barChart(opts) {
  // opts: { data: [{label, value}], unit, color, height, decimals }
  const data = opts.data, decimals = opts.decimals == null ? 2 : opts.decimals;
  const W = 640, H = opts.height || 260, padL = 46, padB = 34, padT = 26;
  const max = Math.max.apply(null, data.map(function (d) { return Math.abs(d.value); })) || 1;
  const min = Math.min.apply(null, data.map(function (d) { return d.value; }).concat([0]));
  const range = max - Math.min(min, 0);
  const zeroY = padT + (max / range) * (H - padT - padB);
  const bw = (W - padL - 14) / data.length;
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Bar chart">';
  s += '<line x1="' + padL + '" y1="' + zeroY + '" x2="' + (W - 10) + '" y2="' + zeroY + '" stroke="#94a3b8" stroke-width="1"/>';
  data.forEach(function (d, i) {
    const h = Math.abs(d.value) / range * (H - padT - padB);
    const x = padL + i * bw + bw * 0.18;
    const w = bw * 0.64;
    const y = d.value >= 0 ? zeroY - h : zeroY;
    const col = d.value < 0 ? "#b91c1c" : (opts.color || "#0f4c81");
    s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + Math.max(h, 1).toFixed(1) + '" fill="' + col + '" rx="3"/>';
    s += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (y - 5).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2a43">' + d.value.toFixed(decimals) + (opts.unit || "") + '</text>';
    s += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="12" fill="#475569">' + esc(d.label) + '</text>';
  });
  return s + "</svg>";
}

function lineChart(opts) {
  // opts: { data: [{label, value}], unit, color, height, decimals }
  const data = opts.data, decimals = opts.decimals == null ? 2 : opts.decimals;
  const W = 640, H = opts.height || 260, padL = 46, padR = 20, padB = 34, padT = 28;
  const vals = data.map(function (d) { return d.value; });
  let lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
  if (hi - lo < 1) { hi += 0.5; lo -= 0.5; }
  const x = function (i) { return padL + i * (W - padL - padR) / (data.length - 1); };
  const y = function (v) { return padT + (hi - v) / (hi - lo) * (H - padT - padB); };
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Line chart">';
  s += '<polyline points="' + data.map(function (d, i) { return x(i).toFixed(1) + "," + y(d.value).toFixed(1); }).join(" ") + '" fill="none" stroke="' + (opts.color || "#b91c1c") + '" stroke-width="3" stroke-linejoin="round"/>';
  data.forEach(function (d, i) {
    s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(d.value).toFixed(1) + '" r="5" fill="' + (opts.color || "#b91c1c") + '" stroke="#fff" stroke-width="2"/>';
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (y(d.value) - 11).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2a43">' + d.value.toFixed(decimals) + (opts.unit || "") + '</text>';
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="12" fill="#475569">' + esc(d.label) + '</text>';
  });
  return s + "</svg>";
}

function donutChart(opts) {
  // opts: { data: [{label, value}], colors }
  const data = opts.data;
  const total = data.reduce(function (a, d) { return a + d.value; }, 0);
  const R = 80, C = 2 * Math.PI * R;
  let off = 0, segs = "", legend = "";
  data.forEach(function (d, i) {
    const frac = d.value / total;
    const col = (opts.colors || ["#0f4c81", "#b91c1c", "#d97706"])[i % 3];
    segs += '<circle cx="110" cy="110" r="' + R + '" fill="none" stroke="' + col + '" stroke-width="34" stroke-dasharray="' + (frac * C - 2).toFixed(1) + " " + (C - frac * C + 2).toFixed(1) + '" stroke-dashoffset="' + (-off * C).toFixed(1) + '"/>';
    off += frac;
    legend += '<div class="legend-row"><span class="swatch" style="background:' + col + '"></span><span>' + esc(d.label) + '</span><strong>' + d.value.toFixed(1) + '%</strong></div>';
  });
  const svg = '<svg viewBox="0 0 220 220" role="img" aria-label="Donut chart">' + segs +
    '<text x="110" y="104" text-anchor="middle" font-size="15" fill="#475569">Total</text>' +
    '<text x="110" y="128" text-anchor="middle" font-size="20" font-weight="700" fill="#0f2a43">100%</text></svg>';
  return '<div class="donut-wrap">' + svg + '<div class="legend">' + legend + '</div></div>';
}
