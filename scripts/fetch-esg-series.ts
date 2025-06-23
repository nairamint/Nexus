import request from "request";

const API_KEY = process.env.NAYAONE_SANDBOX_KEY || "your sandpit api key";
const BASE_URL = "https://data.nayaone.com/esg_by_country_country_series";

function fetchESGSeries() {
  const url = BASE_URL;
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
    console.log("\n--- ESG Series Data ---");
    console.log(response.body);
  });
}

// Example usage
fetchESGSeries();

// To integrate with agentic workflows, export fetchESGSeries for orchestration modules
export { fetchESGSeries };