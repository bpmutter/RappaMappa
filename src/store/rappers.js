import { baseUrl } from "../config";
import rappers from "../assets/data/rapperData.json";

const LOAD_ALL = "rappamappa/rappers/LOADALL";

export const loadAll = rappers => ({type: LOAD_ALL, rappers})

// export const load = (pokemon) => ({ type: LOAD, pokemon });

export const getRappers = () => async dispatch =>{
    dispatch(loadAll(rappers));
}

export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch(action.type){
      case LOAD_ALL: {
          return {
            ...state,
            rappers: action.rappers
          }
      }
      default: return state;
  }
}
