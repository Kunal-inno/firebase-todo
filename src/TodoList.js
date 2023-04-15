import React, { useEffect, useState } from 'react'
import "./TodoList.css"
import { db, firebase } from './Firebase.utils.js'
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Popup from './Popup';
import Dropdown from './Dropdown.js';

const TodoList = ({ inputVal, setInputVal, handleTodoUpdate, inputDate }) => {

    const [todos, setTodos] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [filter, setFilter] = useState("");
    const [showAll, setShowAll] =useState(Boolean)
    const [showCompleted,sertShowComplted]=useState(Boolean)
    const [showIncomplete, setIncompleted]=useState(Boolean)


    //getting data from firebase
    useEffect(() => {
        db.collection('todos')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setTodos(snapshot.docs.map(
                    doc => ({
                        id: doc.id,
                        todo: doc.data().todo,
                        timestamp: doc.data().timestamp,
                        completed: doc.data().completed || false,
                        date: doc.data().date,
                        time: doc.data().time,
                    })
                )
                )
            })
    }, [])

    const handleChangeCheck = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
        db.collection('todos').doc(id).update({
            completed: !todos.find(todo => todo.id === id).completed
        });
    };

    // const completedTodos = todos.filter(todo => todo.completed === true);
    // console.log("compl", completedTodos)
    // const incompleteTodos = todos.filter(todo => todo.completed === false);
    // console.log("not-compl", incompleteTodos)

    const completedTodos = todos.filter(todo => todo.completed === true);
    const incompleteTodos = todos.filter(todo => todo.completed === false);
    const allTodos = todos;

    // const showAll = () => {
    //     setTodos([...allTodos]);
    // }

    // const showCompleted = () => {
    //     setTodos([todos,...completedTodos]);
    // }

    // const showIncomplete = () => {
    //     setTodos([todos,...incompleteTodos]);
    // }

    const handleCompletedTodo=()=>{
           setFilter(completedTodos)

    }
    const handleAllTodo=()=>{
        setFilter(allTodos)
        
    }
    const handleIncompletedTodo=()=>{
        setFilter(incompleteTodos)
    }
     




    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <>
            {/* <button onClick={() => setFilter("completed")}>Completed</button>
            <button onClick={() => setFilter("incomplete")}>Incomplete</button>
            <button onClick={() => setFilter("all")}>All</button> */}
            <button onClick={handleAllTodo}>All</button>
            <button onClick={handleCompletedTodo}>Completed</button>
            <button onClick={handleIncompletedTodo}>Incomplete</button>


            <div className='main-div'>
                {
                    showPopup ? <Popup handleShowPopup={handleShowPopup}></Popup> : null
                }
                {
                    <div className='drop-down'>
                        <Dropdown />
                    </div>
                }
                <div className='show-list-card'>
                    <table>
                        <tbody>
                            {todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>
                                        <input type="checkbox" onChange={() => handleChangeCheck(todo.id)} checked={todo.completed} />
                                    </td>
                                    <td>
                                        <h3>{todo.todo}</h3>
                                    </td>
                                    <td>
                                        <h3>{todo.date}</h3>
                                    </td>
                                    <td>
                                        <h3>{todo.time}</h3>
                                    </td>
                                    <td>
                                        <AiFillEdit
                                            disabled={!inputVal}
                                            onClick={() => {
                                                db.collection('todos').doc(todo.id).update(
                                                    {
                                                        todo: inputVal,
                                                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                                    },
                                                    {
                                                        merge: true
                                                    }
                                                )
                                                setInputVal("")
                                            }}
                                            className="update-btn"
                                        />
                                    </td>
                                    <td>
                                        <MdDelete
                                            onClick={(e) => {
                                                handleShowPopup();
                                                db.collection('todos').doc(todo.id).delete();
                                            }}
                                            className="delete-btn"
                                        />
                                    </td>
                                    <td>
                                        {todo.completed ? <h3 className='completed'>Completed</h3> : <h3 className='not-completed'>Not Completed</h3>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TodoList;
