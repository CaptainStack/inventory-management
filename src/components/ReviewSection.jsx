import React from 'react';
import { SectionHeader } from './SectionHeader';
import { store } from '../index'

export const ReviewSection = ({ review_items }) => {
  let review_items_elements = review_items.map(item => 
    <tr key={ item.id }>
      <td>{ item.id }</td>
      <td>{ item.friendly_name }</td>
      <td><a onClick={ event => store.dispatch({ type: 'REMOVE_ITEM_FROM_LIST', item: item })}>Remove</a></td>
    </tr>);
  let no_review_items = <tr><td colSpan='3'>Your list is empty. Please add pallets from Step 3 above.</td></tr>
  
  return (
    <div className='ReviewSection'>
      <SectionHeader step_number='4' section_header='Review Pallets Selected For Pickup' />
      <table>
        <thead>
          <tr className='table-heading'><th>Pallet #</th><th>Item Code</th><th>Modify List</th></tr>
        </thead>
        <tbody>
          { review_items_elements.length > 0 ? review_items_elements : no_review_items }
        </tbody>
      </table>
    </div>
  );
}

export default ReviewSection;
