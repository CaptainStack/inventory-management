import { INITIAL_STATE } from './initial_state';
import { update_inventory, update_filter_query, update_selected_inventory } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return update_inventory(state, action.inventory, action.items);
    case 'UPDATE_FILTER_QUERY':
      return update_filter_query(state, action.filter_query);
    case 'UPDATE_SELECTED_INVENTORY':
      return update_selected_inventory(state, action.selected_inventory);
    default:
      return state;
  }
}
