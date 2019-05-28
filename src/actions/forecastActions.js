import {ADDCITIES} from './types';

export const addCities = val => dispatch => {
  dispatch({
    type: ADDCITIES,
    payload: val
  })
}
