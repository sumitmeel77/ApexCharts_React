import actionTypes from './action-type'

const updateDate = (data) => {
    return {
        type: actionTypes.UPDATE_DATE,
        payload: data
    }
}


export const updateData = (type) => {
    switch (type) {
        case 'date':
            return ((dispatch) => dispatch(updateDate()))
        default:
            return null
    }
}