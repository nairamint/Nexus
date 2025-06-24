import { SFDRClassificationEngine } from '../dist/ai/engine/index.js';

export default async function handler(req, res) {
  try {
    const engine = new SFDRClassificationEngine();
    const result = await engine.classify(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}