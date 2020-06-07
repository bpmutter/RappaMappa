import { baseUrl } from "../config";
import rappers from "../assets/data/rapperData.json";

const LOAD_ALL = "rappamappa/rappers/LOADALL";
const SET_ACTIVE = "rappamappa/rappers/SET_ACTIVE";
const SET_INACTIVE = "rappamappa/rappers/SET_INACTIVE";
const SET_SEARCH_ACTIVE = "rappamappa/rappers/SET_SEARCH_ACTIVE";
const LOAD_ADDITIONAL_INFO = "rappamappa/rappers/LOAD_ADDITIONAL_INFO";

export const loadAll = rappers => ({type: LOAD_ALL, rappers});
export const activate = rapper => ({type: SET_ACTIVE, rapper});
export const deactivate = () => ({type: SET_INACTIVE, rapper: null });
export const activateSearchResult = rapper => ({type: SET_SEARCH_ACTIVE, rapper});
export const additionalInfo = rapper => ({type: LOAD_ADDITIONAL_INFO, rapper})

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

export const setSearchActive = queryName => async (dispatch, getState) =>{
    const {rappers: {rappers} } = getState();
    const rapper = rappers.find((rapper) => rapper.fields.name === queryName);
    dispatch(activateSearchResult(rapper));
}

export const loadAdditionalInfo = rapper => async dispatch => {

    //TODO fetch data for external DB, like spotify
    dispatch(additionalInfo(rapper))
}

export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch(action.type){
      case LOAD_ALL: {
          return {
            ...state,
            rappers: action.rappers
          }
      } case SET_ACTIVE:{
          const newState = {...state};
          newState.activeRapper = action.rapper;
          newState.refocusLocation = {
            lat: action.rapper.fields.location_coordinates[0],
            lng: action.rapper.fields.location_coordinates[1],
          };
          return newState;
      } case SET_INACTIVE:{
          const newState = { ...state };
          newState.activeRapper = null;
          return newState
      } case SET_SEARCH_ACTIVE: {
          console.log("SET SEARCH TO ACTIVE", action.rapper)
          const newState = {...state};
          newState.activeRapper = action.rapper;
          newState.refocusLocation = {
              lat: action.rapper.fields.location_coordinates[0],
              lng: action.rapper.fields.location_coordinates[1],
          }
          return newState;
      } case LOAD_ADDITIONAL_INFO: {
        const newState = {...state}
        newState.activeRapper = action.rapper;
        return newState;
      } default: return state;
  }
}
