import rappers from "../assets/data/rapperData.json";

//NOTE: will use in backend version
// import keys from "../config";
// import qs from 'qs';
// const {spotifyClientId, spotifyClientSecret} = keys;

const LOAD_ALL = "rappamappa/rappers/LOAD_ALL";
const SET_ACTIVE = "rappamappa/rappers/SET_ACTIVE";
const SET_INACTIVE = "rappamappa/rappers/SET_INACTIVE";
const SET_SEARCH_ACTIVE = "rappamappa/rappers/SET_SEARCH_ACTIVE";
const LOAD_ADDITIONAL_INFO = "rappamappa/rappers/LOAD_ADDITIONAL_INFO";

export const loadAll = rappers => ({type: LOAD_ALL, rappers});
export const activate = rapper => ({type: SET_ACTIVE, rapper});
export const deactivate = () => ({type: SET_INACTIVE, rapper: null });
export const activateSearchResult = rapper => ({type: SET_SEARCH_ACTIVE, rapper});
export const additionalInfo = rapper => ({type: LOAD_ADDITIONAL_INFO, rapper})

let spotifyAccessToken;
export const getRappers = () => async dispatch =>{

    // const b64encodedAccountInfo = window.btoa(
    //   `${spotifyClientId}:${spotifyClientSecret}`
    // );
    
    // const data = await fetch("https://accounts.spotify.com/api/token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: `Basic ${b64encodedAccountInfo}`,
    //   },
    //   body: qs.stringify({ grant_type: "client_credentials" }),
    // });
    // const json = await data.json();
    // console.log('ACCESS TOKEN::', json)
    dispatch(loadAll(rappers));
}
export const setActiveRapper = (recordid) => async (dispatch, getState) =>{
    const {rappers: {rappers} } = getState();
    const rapper = rappers.find((rapper) => rapper.recordid === recordid);
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
    const name = rapper.fields.name;
    try{
        const accessToken =
          "BQC5vKVuD_fjf7nn1cDjf-rDl6OrdvNKUN32vfgVtO6n_GuxgjIWla4KDBB8hqHOUJi1T_yLnGaAS3wH-TE";
        const data = await fetch(
          `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=1&offset=0`,
          {
            headers: new Headers({
              Authorization: `Bearer ${accessToken}`,
            }),
          }
        );
        const json = await data.json();
        const artistInfo = json.artists.items[0];
        rapper.additionalInfo = artistInfo;
        dispatch(additionalInfo(rapper));
    } catch(err) { console.error("OH SNAP", err)}
    
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
        console.log(newState.activeRapper.additionalInfo)
        return newState;
      } default: return state;
  }
}
