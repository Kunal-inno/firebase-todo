import React, { useState } from 'react'
import { db, firebase } from './Firebase.utils.js'
import "./Header.css"
import { TbLoader } from "react-icons/tb";
import TodoList from './TodoList.js';

const Header = () => {

    const [inputVal, setInputVal] = useState("")
    const [showImage, setShowImage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [dateMessage, setDateMessage] = useState("")
    const [inputClass, setInputClass] = useState("");
    const [inputDate, setInputDate] = useState("")
    const [inputTime, setInputTime] = useState("")
    const [timeMessage, setTimeMessage] = useState("")

    const addTodo = (e) => {
        const inputRegex = /^\s*$/;

        if (inputRegex.test(inputVal)) {
            setErrorMessage("Please enter something!");
            setInputClass("border-red-500");
            return;
        }

        if (formattedDate <= inputDate) {
            console.log("yes");
        } else {
            // setErrorMessage("Date should be greater than current date");
            setDateMessage("Date should be greater than current date")
            setInputClass("border-red-500");
            return;
        }

        setShowImage(true);

        db.collection("todos")
            .add({
                todo: inputVal,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                date: inputDate,
                time: inputTime,
            })
            .then(() => {
                // Handle success
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
            .finally(() => {
                setShowImage(false);
                setInputVal("");
                setDateMessage("");
                setErrorMessage("");
                setTimeMessage("");
            });
    };

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const now = new Date();
    const currentTime = now.toLocaleTimeString();

    return (
        <>
            <div className='main-div'>
                <div className='input-card'>
                    <div className='header'>
                        <h3 className='heading'>Add your todo</h3>
                    </div>
                    {showImage ?
                        <div className='loader-div'>
                            <TbLoader className='loader' />
                        </div>
                        :
                        <div className='input-todo'>
                            <form>
                                <input
                                    className={`mt-1 block w-full input-area px-3 py-2 bg-white border ${inputClass} border-slate-300
                                     rounded-md text-sm shadow-sm placeholder-slate-400 w-full mt-4
                                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                     disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                     invalid:border-pink-500 invalid:text-pink-600
                                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
                                    onChange={(e) => setInputVal(e.target.value)}
                                    placeholder="Enter something..."
                                    value={inputVal}
                                />

                                {inputVal.trim() === "" && errorMessage && (
                                    <div className="error-message ">{errorMessage}</div>
                                )}
                                {(formattedDate <= inputDate) ?
                                    <input type="date" value={inputDate} onChange={(e) => { setInputDate(e.target.value) }} />
                                 
                                    :
                                    <input type="date" value={null} onChange={(e) => { setInputDate(e.target.value) }} />
                                }

                                <p className='error-message'>{(formattedDate <= inputDate) ? console.log("yes") : <>{dateMessage}</>}</p>
                                <input type="time" value={inputTime} onChange={(e) => { setInputTime(e.target.value) }} />
                                {/* <p className='error-message'>{(formattedDate && currentTime) ?  <>{timeMessage}</> :null}</p> */}
                                {
                                    ((formattedDate == inputDate) && (inputTime < currentTime) ?
                                        <p className='error-message time-input'>Enter valid time</p> : null)
                                }
                            </form>
                            <button class="w-3/12 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border
                            border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                                onClick={() => { addTodo(); setInputDate(""); setInputTime(""); }}>
                                Add
                            </button>
                        </div>}
                </div>
            </div>
            <div >
                <TodoList inputVal={inputVal} inputTime={inputTime} setInputVal={setInputVal} inputDate={inputDate}></TodoList>
            </div>
        </>
    )
}

export default Header