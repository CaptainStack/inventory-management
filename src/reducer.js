import { INITIAL_STATE } from './initial_state';
import { update_inventory, update_filter_query, update_selected_inventory, unselect_inventory, add_item_to_list, remove_item_from_list } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return update_inventory(state, action.inventory, action.items);
    case 'UPDATE_FILTER_QUERY':
      return update_filter_query(state, action.filter_query);
    case 'UPDATE_SELECTED_INVENTORY':
      return update_selected_inventory(state, action.selected_inventory);
    case 'UNSELECT_INVENTORY':
      return unselect_inventory(state);
    case 'ADD_ITEM_TO_LIST':
      return add_item_to_list(state, action.item);
    case 'REMOVE_ITEM_FROM_LIST':
      return remove_item_from_list(state, action.item);
    default:
      return state;
  }
}
