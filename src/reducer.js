import { INITIAL_STATE } from './initial_state';
import { update_inventory, update_filter_query } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return update_inventory(state, action.inventory, action.items);
    case 'UPDATE_FILTER_QUERY':
      return update_filter_query(state, action.filter_query);
    default:
      return state;
  }
}
