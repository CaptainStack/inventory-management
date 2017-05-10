export const update_inventory = (state, inventory, items) => {
  state.inventory = inventory;
  state.items = items;
  return state;
}
