import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Tabletop.init({
      key: "15GsX_Ret5jBnGE6I1dPEH3VKIlLC6Fdz84czK51CoyQ",
      callback: (googleData) => {
        this.setState({
          data: googleData,
        });
      },
      simpleSheet: true,
    });
  }

  isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  maxCountZilla = (countOfEveryZilla) => {
    let maxCountZilla;

    if (!this.isEmpty(countOfEveryZilla)) {
      maxCountZilla = Object.entries(countOfEveryZilla).sort(
        (prev, next) => prev[1] - next[1]
      );

      return maxCountZilla.pop()[0];
    }
  };

  renderIndividualZilla = (countOfEveryZilla) => {
    return Object.keys(countOfEveryZilla).map((item, index) => (
      <li key={index}>
        {item} : {countOfEveryZilla[item]}
      </li>
    ));
  };

  render() {
    const { data } = this.state;
    const countOfEveryZilla = {};

    if (data.length) {
      data.forEach((element) => {
        if (!countOfEveryZilla[element["জেলা"]]) {
          countOfEveryZilla[element["জেলা"]] = 1;
        } else {
          countOfEveryZilla[element["জেলা"]]++;
        }
      });
    }

    return (
      <div className="App">
        <div id="employee-details">
          <div style={{ fontSize: "30px" }}>
            Total count: {data.length} <br></br>
            Highest cases in a zila: {this.maxCountZilla(countOfEveryZilla)}
          </div>
          <ul>{this.renderIndividualZilla(countOfEveryZilla)}</ul>
        </div>
      </div>
    );
  }
}

export default App;
