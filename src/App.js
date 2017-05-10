import React, { Component } from 'react';
import { store } from './index'
import './App.css';
import { SectionHeader } from './components/SectionHeader';
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
    let options = this.props.state.inventory.filter(option => {
      let option_id = option.id.toString(); 
      return option_id.includes(this.props.state.filter_query) || option.code.includes(this.props.state.filter_query);
    }).map(option => <option key={ option.id } value={option.id} >{ `${option.code} - ${option.description}` }</option>);
    options.unshift(<option key={ 0 } >Select an Inventory</option>);

    let items = this.props.state.items.filter(item => this.props.state.selected_inventory ? item.inventory_id === this.props.state.selected_inventory : false).map(
      item => 
        <tr key={ item.id }>
          <td>{item.id}</td>
          <td>{item.friendly_name}</td>
          <td><a onClick={ event => store.dispatch({ type: 'ADD_ITEM_TO_LIST', item: item }) }>Add to List</a></td>
        </tr>
    ); 

    let review_items = this.props.state.items_list.map(item => 
      <tr key={ item.id }>
        <td>{ item.id }</td>
        <td>{ item.friendly_name }</td>
        <td><a onClick={ event => store.dispatch({ type: 'REMOVE_ITEM_FROM_LIST', item: item })}>Remove</a></td>
      </tr>);

    return (
      <div className="App">
        <InventorySelection options={options} filter_query={this.props.filter_query} selected_inventory={this.props.state.selected_inventory}/>
        <PalletSelection items={items} inventory={this.props.state.inventory} selected_inventory={this.props.state.selected_inventory} />
        <ReviewSection review_items={review_items} />
        <SectionHeader step_number='5' section_header='Finalize Your Request' />
      </div>
    );
  }
}

export default App;
