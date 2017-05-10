import React, { Component } from 'react';
import { store } from './index'
import './App.css';
import { InventorySelection } from './components/InventorySelection';
import { PalletSelection } from './components/PalletSelection';
import { ReviewSection } from './components/ReviewSection';

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
    return (
      <div className="App">
        <InventorySelection options={this.props.state.inventory} filter_query={this.props.filter_query} selected_inventory={this.props.state.selected_inventory}/>
        <PalletSelection items={this.props.state.items} inventory={this.props.state.inventory} selected_inventory={this.props.state.selected_inventory} />
        <ReviewSection review_items={this.props.state.items_list} />
      </div>
    );
  }
}

export default App;
