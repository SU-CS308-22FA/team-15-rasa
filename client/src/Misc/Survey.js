import { useCallback } from "react";

// Default V2 theme
import "survey-core/defaultV2.min.css";
// Modern theme
// import 'survey-core/modern.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import axios from "axios";

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
      type: "checkbox",
      name: "checkbox1",
      title: "On which fields was the referee lacking?",
      description: "Please select no more than three features.",
      isRequired: true,
      showOtherItem: true,
      choices: [
        "Foul calls",
        "Bookings",
        "Handballs",
        "Consistency of the decisions",
        "Maintaining the tempo of the game",
      ],
      colCount: 2,
    },
    {
      type: "checkbox",
      name: "checkbox2",
      title: "On which fields was the referee succesful?",
      description: "Please select no more than three features.",
      isRequired: true,
      showOtherItem: true,
      choices: [
        "Foul calls",
        "Bookings",
        "Handballs",
        "Consistency of the decisions",
        "Maintaining the tempo of the game",
      ],
      colCount: 2,
    },
    {
      type: "rating",
      name: "rating2",
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
  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    sender.data["_collections"] = "survey";
    axios.post("/api/v1", sender.data);
    const results = JSON.stringify(sender.data);
    alert(results);
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
