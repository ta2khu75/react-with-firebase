import { combineReducers } from "redux";
import countReducer from "./reducer/countReducer";

const rootReducer = combineReducers({
    count: countReducer
})
export default rootReducer;
export type State = ReturnType<typeof rootReducer>