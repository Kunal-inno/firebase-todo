import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { db ,firebase } from './Firebase.utils.js'

const Todo = () => {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

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
                        timestamp: doc.data().timestamp
                    })
                )
                )
            })
    }, [])

    // for firebase
    const addTodo = (e) => {
        e.preventDefault()
        // const myCollection =
        db.collection("todos").add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    return (
        <>
            <div className='main-div'>
                <div className='top-card'>
                    <div className='header'>
                        <h3>Add your todo</h3>
                    </div>
                    <div className='input-div'>
                        <form>
                            <input onChange={(e) => setInput(e.target.value)} value={input}></input> <button className='add-btn' onClick={addTodo} disabled={!input}>Add</button>
                        </form>
                    </div>
                </div>
                <div className='second-card'>
                    <div >
                        {
                            todos.map(todo => {
                                return <div className='list-area' key={todo.id}>
                                    <h3>{todo.todo}</h3>
                                    <button className='update-btn' disabled={!input} onClick={()=>{
                                        db.collection('todos').doc(todo.id).update(
                                            {
                                                todo:input,
                                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                            },
                                            {
                                                merge:true
                                            }
                                        )
                                        setInput("")
                                    }} >Update</button>
                                    <button className='delete-btn' onClick={(e)=>db.collection('todos').doc(todo.id).delete()}>delete</button>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
