import React from 'react';

export const SectionHeader = ({ step_number, section_header }) => 
  <h1><div className='number-label'>{ step_number }</div>{ section_header }</h1>

export default SectionHeader;
