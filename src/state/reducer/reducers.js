import actionTypes from '../action/action-type'

export function date(state = {}, action) {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case actionTypes.UPDATE_DATE:
            newState.Data = action.payload
            return newState;
        default:
            return state;
    }
}

