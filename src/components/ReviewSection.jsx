import React from 'react';
import { SectionHeader } from './SectionHeader';

export const ReviewSection = ({ review_items }) => {
  let no_review_items = <tr><td colSpan='3'>Your list is empty. Please add pallets from Step 3 above.</td></tr>
  return (
    <div className='ReviewSection'>
      <SectionHeader step_number='4' section_header='Review Pallets Selected For Pickup' />
      <table>
        <thead>
          <tr className='table-heading'><th>Pallet #</th><th>Item Code</th><th>Modify List</th></tr>
        </thead>
        <tbody>
          { review_items.length > 0 ? review_items : no_review_items }
        </tbody>
      </table>
    </div>
  );
}

export default ReviewSection;
