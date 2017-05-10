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
    let options = this.props.state.inventory.filter(option => { 
      let option_id = option.id.toString(); 
      return option_id.includes(this.props.state.filter_query) || option.code.includes(this.props.state.filter_query);
    }).map(
      option => <option key={ option.id } value={option.id} >{ option.code }</option>
    );
    let items = this.props.state.items.filter(item => this.props.state.selected_inventory ? item.inventory_id === this.props.state.selected_inventory : false).map(
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
          <input type='text' value={ this.props.state.filter_query } onChange={ event => store.dispatch({ type: 'UPDATE_FILTER_QUERY', filter_query: event.target.value }) }></input>
          <select value={ this.props.state.selected_inventory } onChange={ event => store.dispatch({ type: 'UPDATE_SELECTED_INVENTORY', selected_inventory: event.target.value }) }>
            { options }
          </select>
          <li>Choose From Pallet Selection List</li>
          <div>
            { this.props.state.selected_inventory ? this.props.state.inventory.find(inventory => inventory.id === this.props.state.selected_inventory).description : null }
            <button disabled={!this.props.state.selected_inventory} onClick={ event => store.dispatch({ type: 'UNSELECT_INVENTORY' }) }>Done</button>
          </div>
          { items }
          <li>Review Pallets Selected For Pickup</li>
          <li>Finalize Your Request</li>
        </ol>
      </div>
    </div>);
  }
}

export default App;
