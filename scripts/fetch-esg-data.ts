import request from "request";

const API_KEY = process.env.NAYAONE_SANDBOX_KEY || "your sandpit api key";
const BASE_URL = "https://data.nayaone.com/esg_by_country_country";
const LIMIT = 100; // Adjust as needed

function fetchESGData(offset: number = 0) {
  const url = `${BASE_URL}?offset=${offset}`;
  const options = {
    method: "GET",
    url,
    headers: {
      "Accept-Profile": "api",
      "sandpit-key": API_KEY
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(`\n--- ESG Data (offset=${offset}) ---`);
    console.log(response.body);
  });
}

// Example: Fetch first 3 pages (offset 0, 100, 200)
[0, 100, 200].forEach(fetchESGData);

// To integrate with agentic workflows, export fetchESGData for orchestration modules
export { fetchESGData };