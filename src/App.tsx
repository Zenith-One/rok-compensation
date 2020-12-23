import React, { useState } from "react";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import 'react-dropdown/style.css';

import './App.css';

import TroopEntryList from './Component/TroopEntryList';
import {TroopEntryCost} from './Component/TroopEntryRow';

function formatTime(n: number): any {
  const h = 60;
  const d = 24 * h;
  const days = Math.floor(n / d);
  const hours = Math.floor((n % d) / h);
  const min = n - (days * d) - (hours * h);

  return (days > 0 ? days + 'd ' : '')+(hours > 0 || days > 0? hours + 'h ' : '')+min+'m';
}

function formatNumber(n: number): any {
  const B = 1000000000;
  const M = 1000000;
  const K = 1000;
  const O = 1;
  let base = O;
  let baseName = '';
  if (n >= B) {
    base = B;
    baseName = 'B';
  } else if (n >= M) {
    base = M;
    baseName = 'M';
  } else if (n >= K) {
    base = K;
    baseName = 'K';
  }
  const truncated = base === O 
    ? n
    : Math.ceil(n / (base/100))/100

  return (<span>{truncated}<em>{baseName}</em></span>);
}

function ceilIt(tc: TroopEntryCost): TroopEntryCost {
  return {
    index: tc.index,
    time: Math.ceil(tc.time),
    food: Math.ceil(tc.food),
    wood: Math.ceil(tc.wood),
    stone: Math.ceil(tc.stone),
    gold: Math.ceil(tc.gold),
  }
}

function App() {
  const [compTime, updateCompTime] = useState(true);
  const [totalCost, updateTotalCost] = useState({time: 0, food: 0, wood: 0, stone: 0, gold: 0});

  const handleCompTimeUpdate = (event: any) => {
    updateCompTime(event.target.checked);
  }

  const handleUpdateCosts = (data: TroopEntryCost[]) => {
    updateTotalCost(ceilIt(data.reduce((a, b) => {
      return {
        index: 0,
        time: a.time + b.time,
        food: a.food + b.food,
        wood: a.wood + b.wood,
        stone: a.stone + b.stone,
        gold: a.gold + b.gold,
      }
    })))
  }

  return (
    <Container maxWidth="sm">
      <div className="App">
        <header>
          <h2>Troop Compensation Calculator</h2>
          <FormControlLabel
            className="troop-entry-field"
            labelPlacement="start"
            control={
              <Switch
                checked={compTime}
                onChange={handleCompTimeUpdate}
                name="checkedB"
                color="primary"
              />
            }
            label="Compensate Time"
          />
          </header>
          <Box>
            <table>
              <thead>
                <tr>
                  <td>Recovery Time</td>
                  <td>Food</td>
                  <td>Wood</td>
                  <td>Stone</td>
                  <td>Gold</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatTime(totalCost.time)}</td>
                  <td>{formatNumber(totalCost.food)}</td>
                  <td>{formatNumber(totalCost.wood)}</td>
                  <td>{formatNumber(totalCost.stone)}</td>
                  <td>{formatNumber(totalCost.gold)}</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box>
            <TroopEntryList handleDataUpdate={handleUpdateCosts} compensateTime={compTime} />
          </Box>
      </div>
    </Container>
  );
}

export default App;
