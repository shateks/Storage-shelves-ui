import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cylinder from './Cylinder'
import Shelves, { empties } from './Shelves'
import Table from './Table'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom"


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shelves_store: this.empty_shelves_constructor()
    };
  }

  empty_shelves_constructor() {
    let rangeOfShelves = Array.from(Array(37).keys());
    let obj = {};
    rangeOfShelves.forEach(i => {
      obj[i] = {
        Fresh: false,
        Cleaned: false,
        Occupied: false,
        Modulo: undefined,
        LP: undefined,
        Name: undefined,
        Wideness: undefined,
        Circum: undefined,
        Serial: undefined
      }
    });
    return obj;
  }

  componentDidMount() {
    fetch('http://localhost:8000/api')
      .then(
        response => { return response.json() }
      )
      .then(
        data => {
          let parsed = JSON.parse(data);
          let received_shelves = {};
          parsed.forEach((val) => {
            received_shelves[val.Name] = val;
          });
          let prev_shelves_store = this.state.shelves_store;
          for (var i = 0; i <= 36; i += 1) {
            if (received_shelves[i] !== undefined) {
              prev_shelves_store[i].Fresh = received_shelves[i].Fresh;
              prev_shelves_store[i].Cleaned = received_shelves[i].Cleaned;
              prev_shelves_store[i].Occupied = received_shelves[i].Occupied;
              prev_shelves_store[i].Modulo = received_shelves[i].Modulo;
              prev_shelves_store[i].LP = received_shelves[i].LP;
              prev_shelves_store[i].Name = received_shelves[i].Name;
              prev_shelves_store[i].Wideness = received_shelves[i].Wideness;
              prev_shelves_store[i].Circum = received_shelves[i].Circum;
              prev_shelves_store[i].Serial = received_shelves[i].Serial;
            }
          }
          this.setState({ shelves_store: prev_shelves_store });
        },
        error => { console.log("Błąd:" + error) }
      )
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn React
        </a> */}

            <div>
              <h1>Simple SPA</h1>
              <ul className="header">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/Store">Store</NavLink></li>
              </ul>
              <div className="content">

              </div>
            </div>
          </header>
          <main>
            <Route exact path="/" component={Shelves} />
            {/* <Route path="/Store" component={Table} /> */}
            <Route path="/Store" render={(props) => <Table {...props} something={this.state.shelves_store} />} />
            {/* render={(props) => <Dashboard {...props} isAuthed={true} />} */}
          </main>

        </HashRouter>
      </div>
    );
  }
}

export default App;
