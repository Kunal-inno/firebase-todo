import React, { useState } from 'react'
import { db, firebase } from './Firebase.utils.js'
import "./Header.css"
import Todo from './Todo.js'
import { TbLoader } from "react-icons/tb";

const Header = () => {

    const [inputVal, setInputVal] = useState("")
    const [showImage, setShowImage] = useState(false)


    // const addTodo = (e) => {
    //     e.preventDefault()
    //     // const myCollection =
    //     db.collection("todos").add({
    //         todo: inputVal,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    //     setInputVal("")
    // }

    const addTodo = (e) => {
        const inputRegex = /^\s*$/

        if (inputRegex.test(inputVal)) {
            document.querySelector('.enter-todo-input').classList.add('error')
            alert('Please enter something!')
            return
        }

        document.querySelector('.enter-todo-input').classList.remove('error')

        db.collection("todos").add({
            todo: inputVal,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(() => {
                handleLoder()
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        setInputVal("")
    }

    // const updateTodo = (todo, input, db) => {
    //     db.collection('todos').doc(todo.id).update(
    //       {
    //         todo: input,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //       },
    //       {
    //         merge: true
    //       }
    //     );
    //     setInput("");
    //   }

    const handleLoder = () => {
        setShowImage(!showImage)
        setTimeout(() => {
            setShowImage(false)
        }, 500)
    }

    return (
        <div className='main-div'>
            <div className='input-card'>
                <div className='header'>
                    <h3>Add your todo</h3>
                </div>
                {showImage ?
                    <div className='loader-div'>
                        <TbLoader className='loader' />
                    </div>
                    :
                    <div className='input-div'>
                        <input className='enter-todo-input' onChange={(e) => setInputVal(e.target.value)} value={inputVal}>
                        </input>
                        <button className='add-btn' onClick={() => { addTodo(); }}>Add</button>
                    </div>}
            </div>
            <div className='hide-todo'>
                <Todo inputVal={inputVal} setInputVal={setInputVal}></Todo>
            </div>
        </div>
    )
}

export default Header