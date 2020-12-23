import React from "react";

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


import './TroopEntryRow.scss';

import data, { TroopTierData } from '../Model/TroopTier.model';
import { TextField } from "@material-ui/core";
const theData = data.arr.map((item, i) => {
  return {label: item.name, value: i+'', ...item};
});
const options = data.arr.map((item, i) => {
  return {label: item.name, value: ''+i};
});

interface TroopTierDataExtended extends TroopTierData {
  label: string,
  value: string
}

export interface TroopEntryCost {
  index: number,
  time: number,
  food: number,
  wood: number,
  stone: number,
  gold: number
}

type TroopEntryRowProps = {
  index: number;
  compensateTime: boolean;
  showDelete?: boolean;
  handleDelete?: (index: number) => any;
  handleUpdate?: (index: number, data: TroopEntryCost) => any;
}

export type TroopEntryRowState = {
  unitData: TroopTierDataExtended,
  unitCount: number,
  isDead: boolean,
  cost: TroopEntryCost
}

export const getNewEntryRowState = (index:number): TroopEntryRowState => {
  return {
    unitData: theData[0],
    unitCount: 0,
    isDead: false,
    cost: {
      index,
      time: 0,
      food: 0,
      wood: 0,
      stone: 0,
      gold: 0
    }
  }
}

const selectOptions = options.map(item => <MenuItem value={item.value} key={item.label}>{item.label}</MenuItem>);

export default class TroopEntryRow extends React.Component<TroopEntryRowProps,TroopEntryRowState> {
  state: TroopEntryRowState = getNewEntryRowState(this.props.index);

  handleUnitTypeChange = (event:any) => {
    const newData = theData[Number(event.target.value)];
    this.setState({unitData: newData});
  };

  handleUnitCountChange = (event: any) => {
    const newCount = Number(event.target.value);
    this.setState({unitCount: newCount});
  }

  handleUnitIsDead = (event: any) => {
    const newIsDead = event.target.checked;
    this.setState({isDead: newIsDead});
  }

  componentDidUpdate(prevProps: any) {
    const baseValues = this.state.isDead
      ? this.state.unitData.cost.fresh
      : this.state.unitData.cost.heal;
      console.log(this.state.isDead ? 'fresh!' : 'heal!')
    const totalFood = this.state.unitCount * baseValues.food +
      (this.props.compensateTime ? this.state.unitCount * baseValues.timeFood : 0);
    const totalWood = this.state.unitCount * baseValues.food +
      (this.props.compensateTime ? this.state.unitCount * baseValues.timeWood : 0);
    const totalStone = this.state.unitCount * baseValues.food +
      (this.props.compensateTime ? this.state.unitCount * baseValues.timeStone : 0);
    const totalGold = this.state.unitCount * baseValues.food +
      (this.props.compensateTime ? this.state.unitCount * baseValues.timeGold : 0);
    let newCost = {
        index: this.props.index,
        time: baseValues.minutes * this.state.unitCount,
        food: totalFood,
        wood: totalWood,
        stone: totalStone,
        gold: totalGold
      };
    if (this.state.cost.food !== totalFood
        || this.state.cost.wood !== totalWood
        || this.state.cost.stone !== totalStone
        || this.state.cost.gold !== totalGold) {
          console.log('something changed (component side)');
          this.setState({
            cost: newCost
          });

          if (this.props.handleUpdate && typeof this.props.handleUpdate === 'function'){
            this.props.handleUpdate(this.props.index, newCost);
          }
        } else {
          console.log('nothing changed (component side)')
        }
  }
  
  handleDelete = () => {
    if (this.props.handleDelete && typeof this.props.handleDelete === 'function') {
      this.props.handleDelete(this.props.index);
    }
  }

  showDelete() {
    if (this.props.showDelete) {
      return (<Button color="secondary" size="small" onClick={this.handleDelete} variant="contained">X</Button>);
    }
    return "";
  }
  
  render() {
    return (
      <form noValidate autoComplete="off" className="troop-entry-row" id={"troop-entry-" + this.props.index} key={"troop-entry-"+this.props.index}>

    <FormGroup row>

      <FormControl className="troop-entry-field">
    <InputLabel id="troop-select-label">Type/Tier</InputLabel>
        <Select
          labelId="troop-select-label"
          id="troop-select"
          value={this.state.unitData.value}
          onChange={this.handleUnitTypeChange}
        >
          {selectOptions}
          
        </Select>
      </FormControl>
      <TextField className="troop-entry-field" id="standard-basic" label="# of Units" value={this.state.unitCount} onChange={this.handleUnitCountChange}/>

      <FormControlLabel
        className="troop-entry-field"
        control={
          <Switch
            checked={this.state.isDead}
            onChange={this.handleUnitIsDead}
            name="checkedB"
            color="secondary"
          />
        }
        label="Dead?"
      />
      <p>
        {this.showDelete()}
      </p>
    </FormGroup>     
      </form>


      // <div className="input-row">
      //   <div className="dropdown-container">
      //     <Dropdown
      //     options={options}
      //     value={this.state.unitData.value}
      //     onChange={this.handleUnitTypeChange} />
        
      //   </div>
      //   <div className="input-container">
      //     <input
      //       name="unitCount"
      //       placeholder="# of Units"
      //       type="number"
      //       value={this.state.unitCount}
      //       onChange={this.handleUnitCountChange}
      //     />
      //   </div>
      //   <div className="input-container">
      //     <label >
      //       Dead? 
      //     <input
      //       name="isDead"
      //       type="checkbox"
      //       checked={this.state.isDead}
      //       onChange={this.handleUnitIsDead}
      //     /></label>
      //   </div>
      // </div>
    )};
  };

/**
export const TroopEntryRow = (props:any) => {
  const [unitData, updateUnitType] = useState(theData[0]);
  const [unitCount, updateUnitCountChange] = useState(0);
  const [isDead, updateIsDead] = useState(false);
  const [cost, updateCost] = useState({
    time: 0,
    food: 0,
    wood: 0,
    stone: 0,
    gold: 0
  });

  const handleUnitTypeChange = (event:any) => {
    const newData = theData[Number(event.value)];
    updateUnitType(newData);
    handleComponentUpdate(newData, unitCount, isDead);
  };

  const handleUnitCountChange = (event: any) => {
    const newCount = Number(event.target.value);
    updateUnitCountChange(newCount);
    handleComponentUpdate(unitData, newCount, isDead);
  }

  const handleUnitIsDead = (event: any) => {
    const newIsDead = event.target.checked;
    updateIsDead(newIsDead);
    handleComponentUpdate(unitData, unitCount, newIsDead);
  }
  
  const handleComponentUpdate = (uData: any, uCount: number, dead: boolean) => {
    console.log(props.compensateTime, uData, uCount, dead);

  }
  
  return (
    <div className="input-row">
      <div className="dropdown-container">
        <Dropdown
        options={options}
        value={unitData.value}
        onChange={handleUnitTypeChange} />
      
      </div>
      <div className="input-container">
        <input
          name="unitCount"
          placeholder="# of Units"
          type="number"
          value={unitCount}
          onChange={handleUnitCountChange}
        />
      </div>
      <div className="input-container">
        <input
          name="isDead"
          type="checkbox"
          checked={isDead}
          onChange={handleUnitIsDead}
        />
      </div>
      <button disabled={!false} type="submit">
        Submit
      </button>
    </div>
    );
  };
 */