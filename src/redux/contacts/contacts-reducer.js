import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contacts-actions';

console.log(actions);

const itemsReducer = createReducer([], {
  [actions.addContact]: (state, { payload }) => {
    const similarName = state.find(state => state.name === payload.name);
    const similarNumber = state.find(state => state.number === payload.number);
    if (similarName) {
      return alert('This name is allready exist');
    } else if (similarNumber) {
      return alert('This number is allready exist');
    }
    return [...state, payload];
  },
  [actions.deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const filterReducer = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});
