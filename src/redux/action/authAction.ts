import { signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth"
import { AppDispatch } from "../store"
import { auth, googleProvider } from "../../config/Firebase"
import { fetchTodoError, fetchTodoRequest, fetchTodoSuccess, resetTodoInput, setTodoArray } from "./todoAction"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const login = (payload: User) => {
    return {
        type: LOGIN,
        payload: payload
    }
}
export const logout = () => {
    return {
        type: LOGOUT
    }
}
export const fetchLoginGoogle = () => {
    return (dispatch: AppDispatch, getState: () => void) => {
        signInWithPopup(auth, googleProvider).then(() => {
            dispatch(login(auth.currentUser!))
            dispatch(fetchTodoSuccess())
        }).catch(error => {
            dispatch(fetchTodoError())
            alert(error);
            console.log(error);
        })
    }
}
export const fetchLoginEmail = (user: { email: string, password: string }) => {
    return (dispatch: AppDispatch, getState: () => void) => {
        dispatch(fetchTodoRequest())
        signInWithEmailAndPassword(auth, user.email, user.password).then(() => {
            dispatch(login(auth.currentUser!))
            dispatch(fetchTodoSuccess())
        }).catch(error => {
            dispatch(fetchTodoError())
            console.log(error);
            alert(error);
        })
    }
}
export const fetchLogout = () => {
    return (dispatch: AppDispatch, getState: () => void) => {
        try {
            dispatch(fetchTodoRequest())
            signOut(auth).then(() => {
                dispatch(logout())
                dispatch(setTodoArray([]))
                dispatch(resetTodoInput());
                dispatch(fetchTodoSuccess())
            })
        } catch (error) {
            dispatch(fetchTodoError())
            alert(error);
            console.log(error);
        }
    }
}