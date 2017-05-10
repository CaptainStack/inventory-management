import React from 'react';
import { SectionHeader } from './SectionHeader';
import { store } from '../index'

export const InventorySelection = ({ options, filter_query, selected_inventory }) => {
  return (
    <div className='InventorySelection'>
      <SectionHeader step_number='2' section_header='Add To Pallet Selection Liest' />
      <p>Type To Find Item, SKU, or Pallet#, Then Select To Add</p>
      <input type='text' value={ filter_query } onChange={ event => store.dispatch({ type: 'UPDATE_FILTER_QUERY', filter_query: event.target.value }) }></input>
      <select value={ selected_inventory } onChange={ event => store.dispatch({ type: 'UPDATE_SELECTED_INVENTORY', selected_inventory: event.target.value }) }>
        { options }
      </select>*
    </div>
  );
}

export default InventorySelection;
