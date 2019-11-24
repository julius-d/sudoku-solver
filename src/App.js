import React, {Component} from 'react';
import './App.css';
import Worker from './sudoku.worker.js';
import SudokuEventType from "./sudoku/SudokuEventType";

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
    this.worker.onmessage = function (e) {
      console.log('Message received from worker', e);
      const x = e.data.position.xKoordinate;
      const y = e.data.position.yKoordinate;
      const value = e.data.number;
      const type = e.data.type;

      if (type === SudokuEventType.CANT_BE) {
        const name = `field_${x}_${y}_not`;
        that.setState(function (prevState) {
          let prevStateElement = prevState[name];
          let notArray;
          if (!prevStateElement.includes(value)) {
            notArray = prevStateElement.concat([value]).sort();
          } else {
            notArray = prevStateElement;
          }
          return {[name]: notArray}
        });
      } else if(type === SudokuEventType.NUMBER_FOUND){
        const name = `field_${x}_${y}`;
        that.setState({[name]: value});
      }

    }
  };

  handleChange(event) {
    const target = event.target;
    const value = parseInt(target.value, 10);
    const name = target.name;
    if (!(value >= 1 && value <= 9)) {
      return
    }
    if (this.state[name + "_not"].includes(value)) {
      return;
    }

    this.setState({
      [name]: value
    });

    this.worker.postMessage({
      eventType: "NUMBER_PROVIDED",
      value,
      field: name.replace("field_", "").split("_").map(it => parseInt(it))
    });
  }

  render() {
    return (
        <div className="App">
          <table className="tg">
            <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(rowNumber =>
                <tr key={`row_${rowNumber}`}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8]
                  .map(colNumber => `field_${rowNumber}_${colNumber}`)
                  .map(
                      fieldName =>
                          <td className="tg-0lax" key={`cell_${fieldName}`}>
                            {this.state[fieldName] ?
                                <strong>{this.state[fieldName]}</strong> :

                                <><input type="text"
                                         maxLength="1"
                                         size="1"
                                         name={fieldName}
                                         value={""}
                                         onChange={this.handleChange}
                                         autoComplete="off"
                                />
                                <br/><strike>{this.state[`${fieldName}_not`].join()}</strike>
                                </>}
                          </td>
                  )}
                </tr>)}
            </tbody>
          </table>
        </div>
    );
  }
}

export default App;
