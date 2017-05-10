export const update_inventory = (state, inventory, items) => {
  state.inventory = inventory;
  state.items = items;
  return state;
}

export const update_filter_query = (state, filter_query) => {
  state.filter_query = filter_query;
  return state;
}

export const update_selected_inventory = (state, selected_inventory) => {
  state.selected_inventory = Number.parseInt(selected_inventory, 10);
  return state;
}

export const unselect_inventory = (state) => {
  state.selected_inventory = '';
  return state;
}

export const add_item_to_list = (state, new_item) => {
  if (!state.items_list.includes(new_item)) {
    state.items_list.push(state.items.find(item => item === new_item));
  }
  return state;
}

export const remove_item_from_list = (state, item) => {
  let item_index = state.items_list.indexOf(item);
  if (item_index !== -1) {
    state.items_list.splice(item_index, 1);
  }
  return state;
}
