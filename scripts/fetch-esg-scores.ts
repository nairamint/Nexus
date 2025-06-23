import request from "request";

const API_KEY = process.env.NAYAONE_SANDBOX_KEY || "your sandpit api key";
const BASE_URL = "https://data.nayaone.com/esg_scores";

function fetchESGScores() {
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
    console.log("\n--- ESG Scores Data ---");
    console.log(response.body);
  });
}

// Example usage
fetchESGScores();

// To integrate with agentic workflows, export fetchESGScores for orchestration modules
export { fetchESGScores };