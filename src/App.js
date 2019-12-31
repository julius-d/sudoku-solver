import React, { Component } from "react";
import "./App.css";
import Worker from "./sudoku.worker.js";
import SudokuEventType from "./sudoku/SudokuEventType";
import SudokuField from "./SudokuField";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const keyNot = `field_${x}_${y}_not`;
        this.state[keyNot] = [];
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    const that = this;
    this.worker = new Worker();
    this.worker.onmessage = function(e) {
      console.log("Message received from worker", e);
      const x = e.data.position.xKoordinate;
      const y = e.data.position.yKoordinate;
      const value = e.data.number;
      const type = e.data.type;

      if (type === SudokuEventType.CANT_BE) {
        const name = `field_${x}_${y}_not`;
        that.setState(function(prevState) {
          let prevStateElement = prevState[name];
          let notArray;
          if (!prevStateElement.includes(value)) {
            notArray = prevStateElement.concat([value]).sort();
          } else {
            notArray = prevStateElement;
          }
          return { [name]: notArray };
        });
      } else if (type === SudokuEventType.NUMBER_FOUND) {
        const name = `field_${x}_${y}`;
        if (!that.state[name]) {
          const nameFoundBy = `field_${x}_${y}_found_by`;
          that.setState({
            [name]: value,
            [nameFoundBy]: e.data.from
          });
        }
      }
    };
  };

  handleChange(event) {
    const target = event.target;
    const value = parseInt(target.value, 10);
    const name = target.name;
    const nameFoundBy = name + "_found_by";

    if (!(value >= 1 && value <= 9)) {
      return;
    }
    if (this.state[name + "_not"].includes(value)) {
      return;
    }

    this.setState({
      [name]: value,
      [nameFoundBy]: "USER"
    });

    this.worker.postMessage({
      eventType: "NUMBER_PROVIDED",
      value,
      field: name
        .replace("field_", "")
        .split("_")
        .map(it => parseInt(it))
    });
  }

  render() {
    return (
      <div className="App">
        <table className="tg">
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(rowNumber => (
              <tr key={`row_${rowNumber}`}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(colNumber => (
                  <SudokuField
                    key={`field_${rowNumber}_${colNumber}`}
                    rowNumber={rowNumber}
                    colNumber={colNumber}
                    cantBes={this.state[`field_${rowNumber}_${colNumber}_not`]}
                    foundNumber={this.state[`field_${rowNumber}_${colNumber}`]}
                    fieldName={`field_${rowNumber}_${colNumber}`}
                    numberFoundBy={
                      this.state[`field_${rowNumber}_${colNumber}_found_by`]
                    }
                    handleChange={this.handleChange}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
