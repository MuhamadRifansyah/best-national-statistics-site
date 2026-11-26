// main.ts — entry build script for "Indonesia in Numbers".
// Copies app/ and screenshots/ from beside this file into the output
// directory and writes dossier.json using the make.fun frontend builder.
// Node 22, standard library only.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Validate the entry before building anything: the app must have its
// entry page, and at least 3 screenshots must exist, otherwise the
// dossier would describe a broken entry.
const appIndex = join(here, "app", "index.html");
if (!existsSync(appIndex)) {
  throw new Error(`Missing app entry page: ${appIndex} does not exist.`);
}
const shotDir = join(here, "screenshots");
const shotFiles = existsSync(shotDir)
  ? readdirSync(shotDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  : [];
if (shotFiles.length < 3) {
  throw new Error(
    `Not enough screenshots: found ${shotFiles.length} in ${shotDir}, need at least 3 before building the dossier.`
  );
}

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, "dossier.json"), JSON.stringify(dossier, null, 2) + "\n");

const appFiles = readdirSync(join(out, "app"));
const outShots = readdirSync(join(out, "screenshots"));
console.log(`Wrote dossier.json to ${out}`);
console.log(`app/: ${appFiles.length} entries; screenshots/: ${outShots.join(", ")}`);
