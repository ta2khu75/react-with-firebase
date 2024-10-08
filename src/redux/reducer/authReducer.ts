import { User } from "firebase/auth"
import { login, LOGIN, LOGOUT } from "../action/authAction"

type Action = {
    type: typeof LOGIN | typeof LOGOUT
    payload?: User
}
type AuthState = {
    value?: User
    login: boolean
}
const initState: AuthState = {
    value: undefined,
    login: false,
}
const authReducer = (state = initState, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, value: action.payload, login: true }
        case LOGOUT:
            return initState;
        default:
            return state
    }
}
export default authReducer;