import React from 'react';
import { SectionHeader } from './SectionHeader';
import { store } from '../index'

export const InventorySelection = ({ options, filter_query = '', selected_inventory }) => {
  let options_elements = options.filter(option => {
    let option_id = option.id.toString(); 
    return option_id.includes(filter_query) || option.code.includes(filter_query);
  }).map(option => <option key={ option.id } value={option.id} >{ `${option.code} - ${option.description}` }</option>);
  options_elements.unshift(<option key={ 0 } >Select an Inventory</option>);

  return (
    <div className='InventorySelection'>
      <SectionHeader step_number='2' section_header='Add To Pallet Selection Liest' />
      <p>Type To Find Item, SKU, or Pallet#, Then Select To Add</p>
      <input type='text' value={ filter_query } onChange={ event => store.dispatch({ type: 'UPDATE_FILTER_QUERY', filter_query: event.target.value }) }></input>
      <select value={ selected_inventory } onChange={ event => store.dispatch({ type: 'UPDATE_SELECTED_INVENTORY', selected_inventory: event.target.value }) }>
        { options_elements }
      </select>*
    </div>
  );
}

export default InventorySelection;
