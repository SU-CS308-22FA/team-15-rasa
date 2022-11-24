import * as React from "react";
import { Link } from "react-router-dom";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
} from "devextreme-react/pie-chart";
import axios from "axios";
import Button from "@mui/material/Button";
import groupBy from "lodash.groupby";
import Stack from "react-bootstrap/Stack";
export default class SurveyVisuals extends React.PureComponent {
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
        var groupedData = groupBy(res.data.items, "rating1");
        console.log(groupedData);
        let newData = [];
        Object.keys(groupedData).forEach(function (key, index) {
          let obj = {};
          obj["count"] = groupedData[key].length;
          obj["key"] = key;
          newData.push(obj);
        });
        this.setState({
          data: newData,
        });
        groupedData = groupBy(res.data.items, "rating2");
        console.log(groupedData);
        newData = [];
        Object.keys(groupedData).forEach(function (key, index) {
          let obj = {};
          obj["count"] = groupedData[key].length;
          obj["key"] = key;
          newData.push(obj);
        });
        this.setState({
          data2: newData,
        });
        groupedData = groupBy(res.data.items, "rating3");
        console.log(groupedData);
        newData = [];
        Object.keys(groupedData).forEach(function (key, index) {
          let obj = {};
          obj["count"] = groupedData[key].length;
          obj["key"] = key;
          newData.push(obj);
        });
        this.setState({
          data3: newData,
        });
        groupedData = groupBy(res.data.items, "rating4");
        console.log(groupedData);
        newData = [];
        Object.keys(groupedData).forEach(function (key, index) {
          let obj = {};
          obj["count"] = groupedData[key].length;
          obj["key"] = key;
          newData.push(obj);
        });
        this.setState({
          data4: newData,
        });
        groupedData = groupBy(res.data.items, "rating5");
        console.log(groupedData);
        newData = [];
        Object.keys(groupedData).forEach(function (key, index) {
          let obj = {};
          obj["count"] = groupedData[key].length;
          obj["key"] = key;
          newData.push(obj);
        });
        this.setState({
          data5: newData,
        });
        groupedData = groupBy(res.data.items, "rating6");
        console.log(groupedData);
        newData = [];
        Object.keys(groupedData).forEach(function (key, index) {
          let obj = {};
          obj["count"] = groupedData[key].length;
          obj["key"] = key;
          newData.push(obj);
        });
        this.setState({
          data6: newData,
        });
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
        <div>
          <Link to="/">Return to home page</Link>
        </div>
      </div>
    );
  }
}
