import { combineReducers } from "redux";
import loginReducer from "./reducers"

const reducers = combineReducers({
    loginData: loginReducer
})

export default reducers