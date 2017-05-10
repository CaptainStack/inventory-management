import { INITIAL_STATE } from './initial_state';
import { update_inventory } from './actions';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return update_inventory(state, action.inventory, action.items);
    default:
      return state;
  }
}
