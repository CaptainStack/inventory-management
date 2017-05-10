import React, { Component } from 'react';
import { store } from './index'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    let inventory = [];
    fetch('https://raw.githubusercontent.com/francisd/exercise/master/inventory.json')
      .then(res => res.json())
      .then(fetched_inventory => {
        inventory = fetched_inventory;
        fetch('https://raw.githubusercontent.com/francisd/exercise/master/items.json')
          .then(res => res.json())
          .then(fetched_items => store.dispatch({ type: 'UPDATE_INVENTORY', inventory: inventory, items: fetched_items }))
      })
      
  }

  render() {
    let options = this.props.state.inventory.map(
      option => <option key={ option.id }>{ option.code }</option>
    );
    let items = this.props.state.items.map(
      item => <li key={ item.id }>{ `${item.id} - ${item.friendly_name}` }</li>
    );
    return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div className="App-intro">
        <ol>
          <li>Add To Pallet Selection List</li>
          <select>
            { options }
          </select>
          <li>Choose From Pallet Selection List</li>
          { items }
          <li>Review Pallets Selected For Pickup</li>
          <li>Finalize Your Request</li>
        </ol>
      </div>
    </div>);
  }
}

export default App;
