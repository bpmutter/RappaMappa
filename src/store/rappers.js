import { baseUrl } from "../config";
import rappers from "../assets/data/rapperData.json";

const LOAD_ALL = "rappamappa/rappers/LOADALL";
const SET_ACTIVE = "rappamappa/rappers/SET_ACTIVE";
const SET_INACTIVE = "rappamappa/rappers/SET_INACTIVE";

export const loadAll = rappers => ({type: LOAD_ALL, rappers});
export const activate = rapper => ({type: SET_ACTIVE, rapper});
export const deactivate = () => ({type: SET_INACTIVE, rapper: null });


// export const load = (pokemon) => ({ type: LOAD, pokemon });
export const getRappers = () => async dispatch =>{
    dispatch(loadAll(rappers));
}
export const setActiveRapper = (recordid) => async (dispatch, getState) =>{
    const {rappers: {rappers} } = getState();
    console.log("RECORD ID", recordid);
    const rapper = rappers.find((rapper) => rapper.recordid === recordid);
    console.log("RAPPER", rapper);
    dispatch(activate(rapper));
}
export const noActiveRapper = () => async dispatch =>{
    dispatch(deactivate());
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
      case SET_ACTIVE:{
          return {
              ...state,
              activeRapper: action.rapper
          }
      }
      case SET_INACTIVE:{
          return {
              ...state,
              activeRapper: null
          }
      }
      default: return state;
  }
}
