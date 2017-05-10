export const update_inventory = (state, inventory, items) => {
  state.inventory = inventory;
  state.items = items;
  return state;
}

export const update_filter_query = (state, filter_query) => {
  state.filter_query = filter_query;
  return state;
}
