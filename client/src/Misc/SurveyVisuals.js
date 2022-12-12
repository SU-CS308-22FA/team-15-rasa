import * as React from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
} from "devextreme-react/pie-chart";
import axios from "axios";
import groupBy from "lodash.groupby";
import Box from "@mui/material/Box";

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
          data6: allData[5],
        });
        console.log(this.state);
      });
  }
  render() {
    return (
      <div>
        <PieChart
          id="pie"
          dataSource={this.state.data}
          palette="Bright"
          title="On a scale of zero to ten, how would you rate the referee's performance in your team's game?"
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
          title="On a scale of zero to ten, how would you rate the referee's foul calls in your team's game?"
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
            title="On a scale of zero to ten, how would you rate the referee's booking calls in your team's game?"
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
          title="On a scale of zero to ten, how would you rate the referee's effort in maintaining the tempo of the game?"
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
          title="On a scale of zero to ten, how would you rate the consistency of the referee's decisions?"
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
          id="pie6"
          dataSource={this.state.data6}
          palette="Bright"
          title="On a scale of zero to ten, how would you rate the referee assignments this week?"
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
