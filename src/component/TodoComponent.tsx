import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../redux/rootReducer'
import { Level } from '../types/Level'
import { useDispatch } from 'react-redux'
import { addTodo, clickTodo, deleteTodoArray, resetTodoInput, setTodoArray, setTodoInput, updateTodoArray } from '../redux/action/todoAction'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../config/Firebase'
import { Todo } from '../types/Todo'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import BaseService from '../service/BaseService'

const TodoComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { todoArray, todoInput } = useSelector((state: State) => state.todo)
    const todoesCollectionRef = collection(db, "todos")
    useEffect(() => { fetchAllTodo() }, [])
    const fetchAllTodo = async () => {
        try {
            // const data = await getDocs(todoesCollectionRef);
            const userTodosQuery = query(todoesCollectionRef, where("userId", "==", auth.currentUser?.uid));
            // Fetch the todos that belong to the authenticated user
            const querySnapshot = await getDocs(userTodosQuery);
            // Map the retrieved documents into an array
            const todoArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // const todoArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setTodoArray(todoArray))
        } catch (error) {
            console.log(error);

        }
    }
    const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todoInput.id) {
            BaseService.update(todoesCollectionRef, todoInput.id, { ...todoInput }).then(() => {
                dispatch(updateTodoArray(todoInput))
                dispatch(resetTodoInput())
            }).catch((error) => console.log(error))
        } else {
            BaseService.create<Todo>(todoesCollectionRef, { ...todoInput, userId: auth.currentUser?.uid }).then((response) => {
                dispatch(addTodo(response));
                dispatch(resetTodoInput())
            }).catch((error) => console.log(error))
        }
    }
    const handleCheckboxChange = (todo: Todo) => {
        if (todo.id) {
            const id = todo.id;
            BaseService.update(todoesCollectionRef, id, { ...todo, done: !todo.done }).then(() => dispatch(clickTodo(id))).catch(error => console.log(error))
        }
    }
    const handleDeleteClick = (todoId?: string) => {
        if (todoId) {
            BaseService.delete(todoesCollectionRef, todoId).then(() => dispatch(deleteTodoArray(todoId))).catch(error => console.log(error))
        }
    }
    const handleEditClick = async (todo: Todo) => {
        dispatch(setTodoInput({ ...todo }))

    }
    const handleLogoutClick = async () => {
        try {
            await signOut(auth)
            dispatch(setTodoArray([]))
            dispatch(resetTodoInput());
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="vh-100" style={{ backgroundColor: '#e2d5de' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: 15 }}>
                            <div className="card-body p-5">
                                <div className='d-flex justify-content-between'>
                                    <h1>To do</h1>
                                    <button onClick={() => handleLogoutClick()} className='btn btn-outline-warning'>logout</button>
                                </div>
                                <h6 className="mb-3">Awesome Todo List</h6>
                                <form onSubmit={(e) => handleTodoSubmit(e)} className="d-flex justify-content-center align-items-center mb-4">
                                    <div data-mdb-input-init className="form-outline flex-fill">
                                        <input type="text" id="form3" value={todoInput.content} onChange={(e) => dispatch(setTodoInput({ ...todoInput, content: e.target.value }))} className="form-control form-control-lg" />
                                    </div>
                                    <div>
                                        <select className="form-select form-select-lg" value={todoInput.level} onChange={(e) => dispatch(setTodoInput({ ...todoInput, level: e.target.value }))
                                        } aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            {Object.keys(Level).map(level => {
                                                return <option key={level} value={level}>{level}</option>
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg ms-2">{todoInput?.id ? "Update" : "Add"}</button>
                                </form>
                                <ul className="list-group mb-0">
                                    {todoArray.map((todo: Todo) => {
                                        let bgColor = ""
                                        if (todo.level) {
                                            switch (todo.level) {
                                                case Level.VERY_CRITICAL:
                                                    bgColor = "bg-dark"
                                                    break
                                                case Level.CRITICAL:
                                                    bgColor = "bg-secondary"
                                                    break
                                                case Level.VERY_HIGH:
                                                    bgColor = 'bg-danger'
                                                    break;
                                                case Level.HIGH:
                                                    bgColor = 'bg-warning'
                                                    break;
                                                case Level.MEDIUM:
                                                    bgColor = 'bg-primary'
                                                    break;
                                                case Level.LOW:
                                                    bgColor = 'bg-success'
                                                    break;
                                                default:
                                                    bgColor = ''
                                            }
                                        }
                                        if (todo.done) return (
                                            <li key={todo.id} className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                                <div className="d-flex align-items-center">
                                                    <input onChange={() => handleCheckboxChange(todo)} className="form-check-input me-2" type="checkbox" aria-label="..." defaultChecked />
                                                    <s>{todo.content}</s>
                                                </div>
                                                <div>

                                                    <span className={`badge ${bgColor}`}>{todo.level}</span>
                                                    <button onClick={() => handleEditClick(todo)} className='btn btn-outline-warning mx-5' data-mdb-tooltip-init title="Edit todo" >Edit</button>
                                                    <button onClick={() => handleDeleteClick(todo.id)} className='btn btn-outline-danger' data-mdb-tooltip-init title="Delete todo">
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                        return (
                                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                                <div className="d-flex align-items-center">
                                                    <input onChange={() => handleCheckboxChange(todo)} className="form-check-input me-2" type="checkbox" aria-label="..." />
                                                    {todo.content}
                                                </div>
                                                <div>

                                                    <span className={`badge ${bgColor}`}>{todo.level}</span>
                                                    <button onClick={() => handleEditClick(todo)} className='btn btn-outline-warning mx-5' data-mdb-tooltip-init title="Edit todo" >Edit</button>
                                                    <button onClick={() => handleDeleteClick(todo.id)} className='btn btn-outline-danger' data-mdb-tooltip-init title="Delete todo">
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TodoComponent