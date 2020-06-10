
const INVALID_SEARCH = "rappamappa/errorHandler/INVALID_SEARCH";
const CLEAR_ERROR_MESSAGES = "rappamappa/errorHandler/CLEAR_ERROR_MESSAGES";
export const invalidSearch = () => dispatch =>{
    dispatch({type: INVALID_SEARCH, msg: 'It looks like we couldn\'t complete your search. Please select one of the rappers from the dropdown and try again.'})
}
export const clearErrorMessages = () => dispatch => {
    dispatch({type: CLEAR_ERROR_MESSAGES})
}

export default function reducer(state = {errors: []}, action) {
    Object.freeze(state);
    switch(action.type){
        case (INVALID_SEARCH): {
            const newState = {...state};
            newState.errors.push(action.msg);
            return newState;
        } case (CLEAR_ERROR_MESSAGES): {
            const newState = {...state};
            newState.errors = [];
            return newState;
        }
        default: return state;
    }
}