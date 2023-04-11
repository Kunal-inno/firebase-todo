import React, { useEffect, useState } from 'react'
import "./TodoList.css"
import { db, firebase } from './Firebase.utils.js'
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Popup from './Popup';
// import { doc, updateDoc } from "firebase/firestore";

const TodoList = ({ inputVal, handleTodoUpdate, setInputVal }) => {
    // const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])
    const [showPopup, setShowPopup] = useState(false)

    //getting data from firebase
    useEffect(() => {
        db.collection('todos')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                //    console.log(snapshot)
                setTodos(snapshot.docs.map(
                    doc => ({
                        id: doc.id,
                        todo: doc.data().todo,
                        timestamp: doc.data().timestamp,
                        completed: doc.data().completed || false,
                    })
                )
                )
            })
    }, [])

    // for firebase
    // const addTodo = (e) => {
    //     e.preventDefault()
    //     // const myCollection =
    //     db.collection("todos").add({
    //         todo: input,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    //     setInput("")
    // }

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
                    <div >
                        {
                            todos.map(todo => {
                                return <div key={todo.id}>
                                    <div className='row-todo'>

                                        <input
                                            type="checkbox"
                                            onChange={() => handleChangeCheck(todo.id)}
                                            checked={todo.completed}
                                        />
                                        <h3>{todo.todo}</h3>
                                        {/* <button 
                                    className='update-btn' disabled={!input} onClick={() => {
                                        db.collection('todos').doc(todo.id).update(
                                            {
                                                todo: input,
                                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                            },
                                            {
                                                merge: true
                                            }
                                        )
                                        setInput("")
                                    }} 
                                    >Update</button> */}
                                        <AiFillEdit
                                            disabled={!inputVal} onClick={() => {
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
                                            className="update-btn" />
                                        <MdDelete onClick={(e) => {
                                            handleShowPopup();
                                            db.collection('todos').doc(todo.id).delete();
                                        }}
                                            className="delete-btn" />
                                        {todo.completed ?
                                            <h3 className='completed'>Completed</h3>
                                            :
                                            <h3 className='not-completed'>Not Completed</h3>}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;
