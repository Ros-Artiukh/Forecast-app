import {ADDCITIES} from '../actions/types';

export const initialState = {
  cities: []
};

export default function(state = initialState, action) {
  switch (action.type) {
      case ADDCITIES:
      let arr = [...state.cities]
      arr.push(action.payload);
      arr.reverse();
      if(arr.length > 5){arr.shift() } 
      return {
        ...state,
       cities: arr
      };

    default:
      return state;
  }
}