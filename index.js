import { readFile, writeFile } from "node:fs/promises";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error("Usage: node index.js <input.json> <output.json>");
  process.exit(1);
}

try {
  const data = JSON.parse(await readFile(input, "utf8"));

  const result = data
    .filter(({ active }) => active)
    .map(({ name, email }) => ({ name, email }));

  await writeFile(output, JSON.stringify(result, null, 2));
  console.log(`Wrote ${result.length} records to ${output}`);
} catch (err) {
  console.error("Failed:", err.message);
  process.exit(1);
}