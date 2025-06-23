import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KNOWLEDGE_DIR = path.resolve(__dirname, "../doc/knowledge");

async function listKnowledgeBasePDFs() {
  try {
    const files = await fs.readdir(KNOWLEDGE_DIR);
    return files.filter((file) => file.endsWith(".pdf")).map((file) => path.join(KNOWLEDGE_DIR, file));
  } catch (err) {
    throw new Error(`Knowledge base directory not found or unreadable: ${KNOWLEDGE_DIR}`);
  }
}

async function extractPDFSummary(pdfPath: string) {
  try {
    const data = await fs.readFile(pdfPath);
    // Dynamically import pdf-parse for CommonJS compatibility
    const pdfParse = (await import("pdf-parse")).default;
    const parsed = await pdfParse(data);
    const summary = {
      file: path.basename(pdfPath),
      title: parsed.info?.Title || "(unknown)",
      author: parsed.info?.Author || "(unknown)",
      pageCount: parsed.numpages,
      textSample: parsed.text?.slice(0, 500) || ""
    };
    return summary;
  } catch (err) {
    return { file: path.basename(pdfPath), error: err.message };
  }
}

async function main() {
  try {
    const pdfFiles = await listKnowledgeBasePDFs();
    console.log("Knowledge base PDFs found:", pdfFiles.length);
    for (const file of pdfFiles) {
      const summary = await extractPDFSummary(file);
      console.log("\n--- PDF SUMMARY ---");
      console.log(JSON.stringify(summary, null, 2));
    }
    // Integration point: Here, agentic evaluation logic can be added to assess document utility for compliance/AI workflows
  } catch (err) {
    console.error("Error loading knowledge base:", err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}