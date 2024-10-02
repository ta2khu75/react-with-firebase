import { Todo } from "../../types/Todo"
export const SET_TODO_INPUT = "SET_TODO_INPUT";
export const SET_TODO_ARRAY = "SET_TODO_ARRAY";
export const UPDATE_TODO_ARRAY = "UPDATE_TODO_ARRAY";
export const RESET_TODO_INPUT = "RESET_TODO_INPUT";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO_ARRAY = "DELETE_TODO_ARRAY";
export const CLICK_TODO = "CLICK_TODO";
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
