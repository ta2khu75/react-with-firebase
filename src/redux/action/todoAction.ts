import { collection, where } from "firebase/firestore";
import BaseService from "../../service/BaseService";
import { Todo } from "../../types/Todo"
import { auth, db } from "../../config/Firebase";
import { AppDispatch } from "../store";

export const SET_TODO_INPUT = "SET_TODO_INPUT";
export const SET_TODO_ARRAY = "SET_TODO_ARRAY";
export const UPDATE_TODO_ARRAY = "UPDATE_TODO_ARRAY";
export const RESET_TODO_INPUT = "RESET_TODO_INPUT";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO_ARRAY = "DELETE_TODO_ARRAY";
export const CLICK_TODO = "CLICK_TODO";
export const FETCH_TODO_ERROR = "FETCH_TODO_ERROR="
export const FETCH_TODO_REQUEST = "FETCH_TODO_REQUEST";
export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
const collectionRef = collection(db, "todos");
export const setTodoInput = (payload: Todo) => {
    return {
        type: SET_TODO_INPUT,
        payload: payload
    }
}
export const addTodo = (payload: Todo) => {
    return {
        type: ADD_TODO,
        payload: payload
    }
}
export const updateTodoArray = (payload: Todo) => {
    return {
        type: UPDATE_TODO_ARRAY,
        payload: payload,
    }
}
export const resetTodoInput = () => {
    return {
        type: RESET_TODO_INPUT,
    }
}
export const deleteTodoArray = (payload: string) => {
    return {
        type: DELETE_TODO_ARRAY,
        payload: payload
    }
}
export const setTodoArray = (payload: Todo[]) => {
    return {
        type: SET_TODO_ARRAY,
        payload: payload
    }
}
export const clickTodo = (payload: string) => {
    return {
        type: CLICK_TODO,
        payload: payload
    }
}
export const fetchTodoList = () => {
    return async (dispatch: AppDispatch, getState: () => any) => {
        dispatch(fetchTodoRequest())
        try {
            const todoesSnap = await BaseService.query(collectionRef, where("userId", "==", auth.currentUser?.uid))
            const todoArray = todoesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(fetchTodoSuccess(todoArray))
        } catch (error) {
            console.log(error);
            dispatch(fetchTodoError())
        }
    }
}
export const fetchAddTodo = (todo: Todo) => {
    return (dispatch: AppDispatch, getState: () => any) => {
        dispatch(fetchTodoRequest())
        try {
            BaseService.create<Todo>(collectionRef, todo).then((response) => {
                dispatch(addTodo(response));
                dispatch(resetTodoInput())
                dispatch(fetchTodoSuccess())
            }).catch((error) => { console.log(error); dispatch(fetchTodoError()) })
            // dispatch(addTodo(todo))
        } catch (error) {
            console.log(error);
            dispatch(fetchTodoError())
        }
    }
}
export const fetchUpdateTodo = (todo: Todo) => {
    return (dispatch: AppDispatch, getState: () => any) => {
        if (todo.id) {
            dispatch(fetchTodoRequest())
            BaseService.update(collectionRef, todo.id, { ...todo }).then(() => {
                dispatch(updateTodoArray(todo))
                dispatch(resetTodoInput())
                dispatch(fetchTodoSuccess())
            }).catch((error) => { console.log(error); fetchTodoError() })
        }
    }
}
export const fetchClickTodo = (todo: Todo) => {
    return (dispatch: AppDispatch, getState: () => any) => {
        if (todo.id) {
            const id = todo.id
            dispatch(fetchTodoRequest())
            BaseService.update(collectionRef, id, { ...todo, done: !todo.done }).then(() => { dispatch(clickTodo(id)); dispatch(fetchTodoSuccess()) }).catch(error => { console.log(error); dispatch(fetchTodoError()) })
        }
    }
}
export const fetchDeleteTodo = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => any) => {
        dispatch(fetchTodoRequest())
        try {
            await BaseService.delete(collectionRef, id)
            dispatch(deleteTodoArray(id))
        } catch (error) {
            console.log(error);
            dispatch(fetchTodoError())
        }
    }
}
export const fetchTodoRequest = () => {
    return {
        type: FETCH_TODO_REQUEST
    }
}
export const fetchTodoSuccess = (payload?: object) => {
    return {
        type: FETCH_TODO_SUCCESS,
        payload: payload
    }
}

export const fetchTodoError = () => {
    return {
        type: FETCH_TODO_ERROR
    }
}