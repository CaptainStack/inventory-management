import React from 'react';
import { SectionHeader } from './SectionHeader';
import { store } from '../index'

export const PalletSelection = ({ items, inventory, selected_inventory }) => {
  let items_elements = items.filter(item => selected_inventory ? item.inventory_id === selected_inventory : false).map(
    item => 
      <tr key={ item.id }>
        <td>{item.id}</td>
        <td>{item.friendly_name}</td>
        <td><a onClick={ event => store.dispatch({ type: 'ADD_ITEM_TO_LIST', item: item }) }>Add to List</a></td>
      </tr>
  ); 
  let no_inventory_selected = <tr><td colSpan='3'>Your list is empty. Make palletsavailable for selection in Step 2 above.</td></tr>
  return (
    <div className='PalletSelection'>
      <SectionHeader step_number='3' section_header='Choose From Pallet Selection List' />
        <div className='selected-item-box'>
          { selected_inventory ? inventory.find(inventory => inventory.id === selected_inventory).description : 'No inventory selected' }
          <button disabled={!selected_inventory} onClick={ event => store.dispatch({ type: 'UNSELECT_INVENTORY' }) }>Done</button>
        </div>
        <table>
          <thead>
            <tr className='table-heading'><th>Pallet #</th><th>Item Code</th><th>Select For Pickup</th></tr>
          </thead>
          <tbody>
            { items_elements.length > 0 ? items_elements : no_inventory_selected }
          </tbody>
        </table>
    </div>
  );
}

export default PalletSelection;
