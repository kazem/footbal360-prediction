import axios from "axios";
import { Competition, Match, CommonPrediction, CommonPredictionElement, SubmitPrediction } from "./types";
import dotenv from 'dotenv';
dotenv.config();

let token = "";

// Fetch token for authentication
async function getToken(): Promise<string> {
  try {
    const response = await axios.post("https://football360.ir/api/auth/v2/token/", {
      login_mode: "P",
      password: `${process.env.PASSWORD}`,
      phone_number: `+98${process.env.PHONE_NUMBER}`, // PHONE_NUMBER: 9129876543
    });
    return response.data.access;
  } catch (error) {
    console.error("Error fetching token:", error);
    return "";
  }
}

// Fetch competition weeks
async function getCompetitionWeeks(): Promise<string[] | undefined> {
  try {
    const response = await axios.get("https://football360.ir/api/predictions/competitions");
    const competitions: Competition = response.data;
    return competitions.results.map((competition) => competition.current_week.id);
  } catch (error) {
    console.error("Error fetching competition weeks:", error);
  }
}

// Fetch matches for a given week
async function getMatches(weekId: string): Promise<string[] | undefined> {
  try {
    const response = await axios.get(`https://football360.ir/api/predictions/v2/weeks/${weekId}/predictable-matches/`);
    const matches: Match[] = response.data;
    return matches.map((match) => match.id);
  } catch (error) {
    console.error(`Error fetching matches for week ${weekId}:`, error);
  }
}

// Fetch common predictions for a given match
async function getCommonPredictions(matchId: string): Promise<CommonPredictionElement | undefined> {
  try {
    const response = await axios.get(`https://football360.ir/api/predictions/predictable_matches/${matchId}/statistics/`);
    const commonPrediction: CommonPrediction = response.data;
    return commonPrediction.common_predictions[0];
  } catch (error) {
    console.error(`Error fetching common predictions for match ${matchId}:`, error);
  }
}

// Submit predictions in batch
async function submitPrediction(predictions: SubmitPrediction[]): Promise<void> {
  try {
    await axios.put(
      "https://football360.ir/api/predictions/predictions/batch_update/",
      { predictions },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error submitting predictions:", error);
  }
}

// Automate prediction process
async function startAutomatePrediction(): Promise<void> {
  token = await getToken();
  if (!token) {
    console.log("Token retrieval failed.");
    return;
  }

  console.log("Token:", token);

  const weekIds = await getCompetitionWeeks();
  if (!weekIds || weekIds.length === 0) {
    console.log("No weeks available for predictions.");
    return;
  }

  for (const weekId of weekIds) {
    const matchIds = await getMatches(weekId);
    if (!matchIds || matchIds.length === 0) {
      console.log(`No matches available for week ${weekId}.`);
      continue;
    }

    const predictions: SubmitPrediction[] = [];

    for (const matchId of matchIds) {
      const commonPrediction = await getCommonPredictions(matchId);
      if (commonPrediction) {
        predictions.push({
          predictable_match: matchId,
          home_score: commonPrediction.home_score,
          away_score: commonPrediction.away_score,
        });
      }
    }

    if (predictions.length > 0) {
      await submitPrediction(predictions);
      console.log(`Predictions submitted for week ${weekId}:`, predictions);
    }
  }
}

startAutomatePrediction();
