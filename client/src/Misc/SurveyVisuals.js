import * as React from "react";
import PieChart, {Connector, Export, Label, Series, Size,} from "devextreme-react/pie-chart";
import axios from "axios";
import groupBy from "lodash.groupby";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from "@mui/material";
import '../CSS/Site.css';
import "../RefereeListDetails/RefereeList.css";
class SurveyVisualsClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
    };
    axios
      .get("/api/v1", {
        params: {
          _collection: "survey",
        },
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        let allData = [];
        for (let i = 1; i < res.data.items.length + 1; i++) {
          const groupedData = groupBy(res.data.items, `rating${i}`);
          let newData = [];
          Object.keys(groupedData).forEach(function (key, index) {
            let obj = {};
            obj["count"] = groupedData[key].length;
            obj["key"] = key;
            newData.push(obj);
          });
          allData.push(newData);
        }
        this.setState({
          data: allData[0],
          data2: allData[1],
          data3: allData[2],
          data4: allData[3],
          data5: allData[4],          
        });
        console.log(this.state);
      });
  }
  render() {
    return (
      <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Referee Survey
          </Typography>
        </Toolbar>
      </AppBar>        
      <div className="app_container">
        <div className="content_container">
          <PieChart
            id="pie"
            dataSource={this.state.data}
            palette="Bright"
            title="On a scale of minus five to five, how should total matches affect referee's performance score?"
          >
            <Series argumentField="key" valueField="count">
              <Label visible={true}>
                <Connector visible={true} width={1} />
              </Label>
            </Series>

            <Size width={500} />
            <Export enabled={true} />
          </PieChart>
          <PieChart
            id="pie2"
            dataSource={this.state.data2}
            palette="Bright"
            title="On a scale of minus five to five, how should average yellow card rate affect referee's performance score?"
          >
            <Series argumentField="key" valueField="count">
              <Label visible={true}>
                <Connector visible={true} width={1} />
              </Label>
            </Series>

            <Size width={500} />
            <Export enabled={true} />
          </PieChart>
          <div>
            <PieChart
              id="pie3"
              dataSource={this.state.data3}
              palette="Bright"
              title="On a scale of minus five to five, how should average red card rate affect referee's performance score?"
            >
              <Series argumentField="key" valueField="count">
                <Label visible={true}>
                  <Connector visible={true} width={1} />
                </Label>
              </Series>

              <Size width={500} />
              <Export enabled={true} />
            </PieChart>
          </div>
          <PieChart
            id="pie4"
            dataSource={this.state.data4}
            palette="Bright"
            title="On a scale of minus five to five, how should average yellow-red card rate affect referee's performance score?"
          >
            <Series argumentField="key" valueField="count">
              <Label visible={true}>
                <Connector visible={true} width={1} />
              </Label>
            </Series>

            <Size width={500} />
            <Export enabled={true} />
          </PieChart>
          <PieChart
            id="pie5"
            dataSource={this.state.data5}
            palette="Bright"
            title="On a scale of minus five to five, how should average penalty rate affect referee's performance score?"
          >
            <Series argumentField="key" valueField="count">
              <Label visible={true}>
                <Connector visible={true} width={1} />
              </Label>
            </Series>

            <Size width={500} />
            <Export enabled={true} />
          </PieChart>
          </div>
        </div>
      </div>
    );
  }
}

export default function SurveyVisuals() {
  return (
    <div>
      <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
      >
        <SurveyVisualsClass />
      </Box>
    </div>
  );
}
