import { combineReducers } from "redux";
import countReducer from "./reducer/countReducer";
import todoReducer from "./reducer/todoReducer";
import authReducer from "./reducer/authReducer";

const rootReducer = combineReducers({
    count: countReducer,
    todo: todoReducer,
    auth: authReducer
})
export default rootReducer;
export type State = ReturnType<typeof rootReducer>