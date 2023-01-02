import {useCallback, useEffect} from "react";
import '../CSS/Site.css';
// Default V2 theme
import "survey-core/defaultV2.min.css";
// Modern theme
// import 'survey-core/modern.min.css';
import {Model, StylesManager} from "survey-core";
import {Survey} from "survey-react-ui";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from "@mui/material";

// const SURVEY_ID = 1;

StylesManager.applyTheme("defaultV2");

const surveyJson = {
  elements: [
    {
      type: "rating",
      name: "totalMatches",
      title:
        "On a scale of minus five to five, how should total matches affect referee's performance score?",
      isRequired: true,
      rateMin: -5,
      rateMax: 5,
      minRateDescription: "(Negative)",
      maxRateDescription: "(Positive)",
    },
    {
      type: "rating",
      name: "averageYellow",
      title:
        "On a scale of minus five to five, how should average yellow card rate affect referee's performance score?",
      isRequired: true,
      rateMin: -5,
      rateMax: 5,
      minRateDescription: "(Negative)",
      maxRateDescription: "(Positive)",
    },
    {
      type: "rating",
      name: "averageRed",
      title:
        "On a scale of minus five to five, how should average red card rate affect referee's performance score?",
      isRequired: true,
      rateMin: -5,
      rateMax: 5,
      minRateDescription: "(Negative)",
      maxRateDescription: "(Positive)",
    },
    {
      type: "rating",
      name: "averageYellowRed",
      title:
        "On a scale of minus five to five, how should average yellow-red card rate affect referee's performance score?",
      isRequired: true,
      rateMin: -5,
      rateMax: 5,
      minRateDescription: "(Negative)",
      maxRateDescription: "(Positive)",
    },
    {
      type: "rating",
      name: "averagePenalty",
      title:
        "On a scale of minus five to five, how should average penalty rate affect referee's performance score?",
      isRequired: true,
      rateMin: -5,
      rateMax: 5,
      minRateDescription: "(Negative)",
      maxRateDescription: "(Positive)",
    },    
  ],
};

function MySurvey() {
  const navigate = useNavigate();
  const location = useLocation();
  const survey = new Model(surveyJson);
  const alertResults = useCallback(async (sender) => {
    let temp = sender.data;
    temp["_collection"] = "survey";
    temp["email"] = location.state.email;
    
    await axios.get("/api/v1/", {
      params: {
          _collection: "survey",
      }
    })
    .catch((err) => {
        console.log(err);        
    })
    .then((res) => {
      if (res && res.status === 200 ) {
          const surveys = res.data.items;
          const control = surveys.map(survey =>{
            return (survey.email && survey.email === location.state.email);

          })
          if(control.includes(true)){
            alert("Your response was not recorded since you have responded already.");
          }
          else{
            axios.post("/api/v1", temp);            
          }
          navigate("/", { state: location.state });
      }
  });
    // saveSurveyResults(
    //   "https://your-web-service.com/" + SURVEY_ID,
    //   sender.data
    // )
  }, []);

  survey.onComplete.add(alertResults);

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Referee Survey
          </Typography>
        </Toolbar>
      </AppBar>
        <div classname='app_container'>          
          < Survey model={survey} />
        </div>
    </div>
  )
  
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
