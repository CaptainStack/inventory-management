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
