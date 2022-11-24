import { useCallback } from "react";

// Default V2 theme
import "survey-core/defaultV2.min.css";
// Modern theme
// import 'survey-core/modern.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// const SURVEY_ID = 1;

StylesManager.applyTheme("defaultV2");

const surveyJson = {
  elements: [
    {
      type: "rating",
      name: "rating1",
      title:
        "On a scale of zero to ten, how would you rate the referee's performance in your team's game?",
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "(Terrible)",
      maxRateDescription: "(Great)",
    },
    {
      type: "rating",
      name: "rating2",
      title:
        "On a scale of zero to ten, how would you rate the referee's foul calls in your team's game?",
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "(Terrible)",
      maxRateDescription: "(Great)",
    },
    {
      type: "rating",
      name: "rating3",
      title:
        "On a scale of zero to ten, how would you rate the referee's booking calls in your team's game?",
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "(Terrible)",
      maxRateDescription: "(Great)",
    },
    {
      type: "rating",
      name: "rating4",
      title:
        "On a scale of zero to ten, how would you rate the referee's effort in maintaining the tempo of the game?",
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "(Terrible)",
      maxRateDescription: "(Great)",
    },
    {
      type: "rating",
      name: "rating5",
      title:
        "On a scale of zero to ten, how would you rate the consistency of the referee's decisions?",
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "(Terrible)",
      maxRateDescription: "(Great)",
    },
    {
      type: "rating",
      name: "rating6",
      title:
        "On a scale of zero to ten, how would you rate the referee assignments this week?",
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "(Terrible)",
      maxRateDescription: "(Great)",
    },
  ],
};

function MySurvey() {
  const navigate = useNavigate();
  const location = useLocation();
  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    let temp = sender.data;
    temp["_collection"] = "survey";
    axios.post("/api/v1", temp);
    navigate("/", { state: location.state });

    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

// function saveSurveyResults(url, json) {
//   const request = new XMLHttpRequest();
//   request.open('POST', url);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.addEventListener('load', () => {
//     // Handle "load"
//   });
//   request.addEventListener('error', () => {
//     // Handle "error"
//   });
//   request.send(JSON.stringify(json));
// }

export default MySurvey;
