export const DateFunc = (data) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_DATE",
            payload: data
        })
    }
}