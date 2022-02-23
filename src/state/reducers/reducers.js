
const reducer = (state = ["11/July/2015", "9/August/2015"], action) => {
    if (action.type === "UPDATE_DATE") { return action.payload }
    else { return state }
}
export default reducer