import { combineReducers } from "redux";
import countReducer from "./reducer/countReducer";
import todoReducer from "./reducer/todoReducer";

const rootReducer = combineReducers({
    count: countReducer,
    todo: todoReducer
})
export default rootReducer;
export type State = ReturnType<typeof rootReducer>