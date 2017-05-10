import React, { Component } from 'react';
import { store } from './index'
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
      option => <option key={ option.id } value={option.id} >{ `${option.code} - ${option.description}` }</option>
    );
    options.unshift(<option key={ 0 } >Select an Inventory</option>)
    let items = this.props.state.items.filter(item => this.props.state.selected_inventory ? item.inventory_id === this.props.state.selected_inventory : false).map(
      item => 
        <tr key={ item.id }>
          <td>{item.id}</td>
          <td>{item.friendly_name}</td>
          <td><a onClick={ event => store.dispatch({ type: 'ADD_ITEM_TO_LIST', item: item }) }>Add to List</a></td>
        </tr>
    );
    
    let no_inventory_selected = <tr><td colSpan='3'>Your list is empty. Make palletsavailable for selection in Step 2 above.</td></tr>

    let review_items = this.props.state.items_list.map(item => 
      <tr key={ item.id }>
        <td>{ item.id }</td>
        <td>{ item.friendly_name }</td>
        <td><a onClick={ event => store.dispatch({ type: 'REMOVE_ITEM_FROM_LIST', item: item })}>Remove</a></td>
      </tr>);

    let no_review_items = <tr><td colSpan='3'>Your list is empty. Please add pallets from Step 3 above.</td></tr>
    return (
      <div className="App">
        <div className="App-intro">
          <h1><div className='number-label'>2</div>Add To Pallet Selection List</h1>
          <p>Type To Find Item, SKU, or Pallet#, Then Select To Add</p>
          <input type='text' value={ this.props.state.filter_query } onChange={ event => store.dispatch({ type: 'UPDATE_FILTER_QUERY', filter_query: event.target.value }) }></input>
          <select value={ this.props.state.selected_inventory } onChange={ event => store.dispatch({ type: 'UPDATE_SELECTED_INVENTORY', selected_inventory: event.target.value }) }>
            { options }
          </select>*
          <h1><div className='number-label'>3</div>Choose From Pallet Selection List</h1>
          <div className='selected-item-box'>
            { this.props.state.selected_inventory ? this.props.state.inventory.find(inventory => inventory.id === this.props.state.selected_inventory).description : 'No inventory selected' }
            <button disabled={!this.props.state.selected_inventory} onClick={ event => store.dispatch({ type: 'UNSELECT_INVENTORY' }) }>Done</button>
          </div>
          <table>
            <thead>
              <tr className='table-heading'><th>Pallet #</th><th>Item Code</th><th>Select For Pickup</th></tr>
            </thead>
            <tbody>
              { items.length > 0 ? items : no_inventory_selected }
            </tbody>
          </table>
          <h1><div className='number-label'>4</div>Review Pallets Selected For Pickup</h1>
          <table>
            <thead>
              <tr className='table-heading'><th>Pallet #</th><th>Item Code</th><th>Modify List</th></tr>
            </thead>
            <tbody>
              { review_items.length > 0 ? review_items : no_review_items }
            </tbody>
          </table>
          <h1><div className='number-label'>5</div>Finalize Your Request</h1>
        </div>
      </div>
    );
  }
}

export default App;
