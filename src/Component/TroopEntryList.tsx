import React from "react";
import TroopEntryRow, { TroopEntryCost, getNewEntryRowState } from './TroopEntryRow';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


interface TroopEntryListState {
  entries: TroopEntryCost[],
  isEditing: boolean
}

interface TroopEntryListProps {
  compensateTime: boolean;
  handleDataUpdate?: (data: TroopEntryCost[]) => any;
}

const dataDidChange = (oldEntries: TroopEntryCost[], newEntry: TroopEntryCost) => {
  const oldEntry = oldEntries.filter(i => i.index === newEntry.index)[0];
  return !(oldEntry.food === newEntry.food && oldEntry.wood === newEntry.wood
        && oldEntry.stone === newEntry.stone && oldEntry.gold === newEntry.gold
        && oldEntry.time === newEntry.time);
}

export default class TroopEntryList extends React.Component<TroopEntryListProps, TroopEntryListState> {
  state = {entries: [getNewEntryRowState(0).cost], isEditing: false}

  getPosition(index: number) {
    for(let i = 0; i < this.state.entries.length; i += 1){
      if (this.state.entries[i].index === index) {
        return i;
      }
    }
    return -1;
  }

  updateParent = (newEntries: TroopEntryCost[]) => {
    if (this.props.handleDataUpdate && typeof this.props.handleDataUpdate === 'function') {
      this.props.handleDataUpdate(newEntries);
    }
  }

  handleRowUpdate = (index: number, data: TroopEntryCost) => {
    const i = this.getPosition(index);
    if (dataDidChange(this.state.entries, data)){
      console.log(data);
      const newEntries = Object.assign([], this.state.entries, {[i]: data});
      this.setState({entries: newEntries});
      this.updateParent(newEntries);
    } else {
      console.log('nothing changed.');
    }
  }

  handleEditingToggle = () => {
    this.setState({isEditing: !this.state.isEditing});
  }
  handleAddClick = () => {
    const lastIndex = this.state.entries[this.state.entries.length - 1].index;
    this.setState({entries: [...this.state.entries, getNewEntryRowState(lastIndex + 1).cost]});
  }

  handleRowDelete = (index: number) => {
    const newEntries = this.state.entries.filter(item => item.index !== index);
    console.log(newEntries);
    this.setState({entries: newEntries});
    this.updateParent(newEntries);
  }

  getEditButton() {
    if (this.state.isEditing) {
      return (<Button variant="contained" className="right" onClick={this.handleEditingToggle}>Done Editing</Button>)
    } else {
      return (<Button variant="contained" color="secondary" className="right" onClick={this.handleEditingToggle}>Edit</Button>)
    }
  }

  getRows() {
    return this.state.entries.map((item, i) =>
      <TroopEntryRow index={item.index}
                     key={item.index}
                     compensateTime={this.props.compensateTime}
                     showDelete={this.state.entries.length > 1 && this.state.isEditing}
                     handleDelete={this.handleRowDelete.bind(this)}
                     handleUpdate={this.handleRowUpdate.bind(this)}/>
    );
  }

  render() { return (
    <div>
      <div className="entries">
        {this.getRows()}
      </div>
      <div className="buttons">
        <Button variant="contained"
                color="primary"
                onClick={this.handleAddClick}
                className="left">Add +</Button>
        
        {this.getEditButton()}
      </div>
    </div>
  );}


}