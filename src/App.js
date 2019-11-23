import React, {Component} from 'react';
import './App.css';
import Worker from './sudoku.worker.js';

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
      const name = `field_${x}_${y}_not`;

      that.setState(function (prevState) {
        let notArray = prevState[name].concat([value]);
        return {[name]: notArray}
      });
    }
  };

  handleChange(event) {
    const target = event.target;
    const value = parseInt(target.value, 10);
    const name = target.name;
    if (!(value >= 1 && value <= 9)) {
      return
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
                            <input type="text"
                                   maxLength="1"
                                   size="1"
                                   name={fieldName}
                                   value={this.state[fieldName] || ""}
                                   onChange={this.handleChange}/>
                            <br/><small>{this.state[`${fieldName}_not`].join()}</small>
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
