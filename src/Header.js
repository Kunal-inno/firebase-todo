import React, { useState } from 'react'
import { db, firebase } from './Firebase.utils.js'
import "./Header.css"
import { TbLoader } from "react-icons/tb";
import TodoList from './TodoList.js';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const Header = () => {

    const [inputVal, setInputVal] = useState("")
    const [showImage, setShowImage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [dateMessage, setDateMessage] = useState("")
    const [inputClass, setInputClass] = useState("");
    const [inputDate, setInputDate] = useState(null)
    const [inputTime, setInputTime] = useState(null)
    const [timeMessage, setTimeMessage] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState(new Date());


    const minDate = new Date();
    // Create a new Date object with the original date string
    const originalDate = new Date(inputDate);

    // Get the year, month, and day from the original date object
    const year1 = originalDate.getFullYear();
    const month1 = ("0" + (originalDate.getMonth() + 1)).slice(-2);
    const day1 = ("0" + originalDate.getDate()).slice(-2);

    // Concatenate the year, month, and day strings with dashes to form the new date string
    const newDateString = `${year1}-${month1}-${day1}`;

    console.log("mlm", newDateString);

    const addTodo = (e) => {
        const inputRegex = /^\s*$/;

        if (inputRegex.test(inputVal)) {
            setErrorMessage("Please enter something!");
            setInputClass("border-red-500");
            return;
        }

        setShowImage(true);

        db.collection("todos")
            .add({
                todo: inputVal,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                date: inputDate.toISOString().substring(0, 10),
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

    console.log("gvg", inputDate)


    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const nowTime = (hours + ":" + minutes);
    console.log("hhh", nowTime)

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
                                <div className='date-div' >
                                    <DatePicker value={inputDate} onChange={(date) => { setInputDate(date) }} minDate={minDate} format="yyy/MM/dd" />
                                </div>

                                <div className='time-div' >
                                    <TimePicker onChange={setInputTime} value={inputTime} />
                                </div>
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