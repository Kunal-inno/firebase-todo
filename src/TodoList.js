import React, { useEffect, useState } from 'react'
import "./TodoList.css"
import { db, firebase } from './Firebase.utils.js'
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Popup from './Popup';
import Dropdown from './Dropdown.js';
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";

const TodoList = ({ inputVal, setInputVal, handleTodoUpdate, inputDate }) => {

    const [todos, setTodos] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [filter, setFilter] = useState([...todos]);
    const [showAll, setShowAll] = useState(Boolean)
    const [showCompleted, setShowCompleted] = useState(Boolean)
    const [showIncomplete, setShowIncomplete] = useState(Boolean)


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

    const handleAllTodo = () => {
        setShowCompleted(false)
        setShowIncomplete(false)
    }

    const handleCompletedTodo = () => {
        setShowCompleted(true);
        setShowIncomplete(false);
    };

    const handleIncompletedTodo = () => {
        setShowCompleted(false);
        setShowIncomplete(true);
    };

    const filteredTodos = showCompleted
        ? todos.filter(todo => todo.completed)
        : showIncomplete
            ? todos.filter(todo => !todo.completed)
            : todos;


    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    const sortTodosByDateAsc = () => {
        const sortedTodos = [...todos].sort((a, b) => {
            return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
        });
        setTodos(sortedTodos);
    };

    const sortTodosByDateDesc = () => {
        const sortedTodos = [...todos].sort((a, b) => {
            return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);
        });
        setTodos(sortedTodos);
    };

    return (
        <>
            <div className='main-div'>
                {
                    showPopup ? <Popup handleShowPopup={handleShowPopup}></Popup> : null
                }
                {
                    <div className='drop-down'>
                        <Dropdown
                            handleAllTodo={handleAllTodo}
                            handleCompletedTodo={handleCompletedTodo}
                            handleIncompletedTodo={handleIncompletedTodo} />
                    </div>
                }

                <div className='show-list-card'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Todo</th>
                                <th className='sort-date'>Date
                                    <div className='sort-arrow'>
                                        <AiOutlineCaretUp onClick={sortTodosByDateAsc}></AiOutlineCaretUp>
                                        <AiOutlineCaretDown onClick={sortTodosByDateDesc}></AiOutlineCaretDown>
                                    </div>
                                </th>
                                <th>Time</th>
                                <th></th>
                                <th></th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTodos.map(todo => (
                                <tr key={todo.id}>
                                    <td>
                                        <input type="checkbox" onChange={() => handleChangeCheck(todo.id)} checked={todo.completed}
                                        />
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
                                                if (inputVal.trim() !== "") { // check if inputVal is not empty or only contains whitespace
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
                                                }
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
                                        {todo.completed ? <h3 className='completed'>Completed</h3>
                                            :
                                            <h3 className='not-completed'>Not Completed</h3>}
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
