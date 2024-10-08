// import { CONG, DATLAI, TRU } from "../action/countAction"
import { Level } from "../../types/Level"
import { Todo } from "../../types/Todo"
import { ADD_TODO, CLICK_TODO, DELETE_TODO_ARRAY, FETCH_TODO_ERROR, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS, RESET_TODO_INPUT, SET_TODO_ARRAY, SET_TODO_INPUT, UPDATE_TODO_ARRAY, } from "../action/todoAction";

type Action = {
    type: typeof ADD_TODO | typeof RESET_TODO_INPUT | typeof UPDATE_TODO_ARRAY | typeof SET_TODO_INPUT | typeof SET_TODO_ARRAY | typeof DELETE_TODO_ARRAY | typeof CLICK_TODO | typeof FETCH_TODO_ERROR | typeof FETCH_TODO_REQUEST | typeof FETCH_TODO_SUCCESS
    payload: any
}
interface TodoState {
    todoInput: Todo
    todoArray: Todo[]
}
const initState: TodoState = {
    todoInput: {
        content: "",
        done: false,
        level: Level.LOW,
    },
    todoArray: []
}
const todoReducer = (state = initState, action: Action) => {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, todoArray: [action.payload, ...state.todoArray] }
        case RESET_TODO_INPUT:
            return { ...state, todoInput: { content: "", done: false, level: Level.LOW } }
        case UPDATE_TODO_ARRAY:
            return { ...state, todoArray: state.todoArray.map(todo => { if (todo.id === action.payload.id) return { ...action.payload }; return todo }) }
        case SET_TODO_INPUT:
            return { ...state, todoInput: { ...action.payload } }
        case SET_TODO_ARRAY:
            return { ...state, todoArray: action.payload }
        case DELETE_TODO_ARRAY:
            return { ...state, todoArray: state.todoArray.filter(todo => todo.id !== action.payload) }
        case CLICK_TODO:
            return { ...state, todoArray: state.todoArray.map(todo => { if (todo.id === action.payload) return { ...todo, done: !todo.done }; return todo }) }
        case FETCH_TODO_ERROR:
            console.log("Fetch todo error");
            return state;  // TODO: Handle error state better
        case FETCH_TODO_REQUEST:
            console.log("Fetch todo request");
            return state;  // TODO: Show loading state or spinner
        case FETCH_TODO_SUCCESS:
            console.log("Fetch todo success");
            if (action.payload)
                return { ...state, todoArray: action.payload }  // TODO: Handle data state better
            return state;  // TODO: Handle data state better
        default:
            return state
    }
}
export default todoReducer