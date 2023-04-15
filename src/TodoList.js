import React, { useEffect, useState } from 'react'
import "./TodoList.css"
import { db, firebase } from './Firebase.utils.js'
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Popup from './Popup';

const TodoList = ({ inputVal, setInputVal, handleTodoUpdate, inputDate }) => {

    const [todos, setTodos] = useState([])
    const [showPopup, setShowPopup] = useState(false)

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

    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <>
            <div className='main-div'>
                {
                    showPopup ? <Popup handleShowPopup={handleShowPopup}></Popup> : null
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
