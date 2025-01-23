import styles from './toDoList.module.css';
import { useState, useRef } from 'react';


function Co_toDoList() {

    const [tasks, setTasks] = useState(["Buy groceries", "Workout", "Clean the house", "Read a book", "Pay electricity bill"]);
    const [newTask, setNewTask] = useState("");

    const spanRef = useRef();
    const inputRef = useRef();    

    const handleInputChange = (e) => {
        setNewTask(e.target.value);

        const spanWidth = spanRef.current.offsetWidth;
        inputRef.current.style.width = `${spanWidth + 50}px`;
    }

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks((t) => [...t, newTask]);
            setNewTask("");
        }
    }

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));        
    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <div className={styles.main_toDoList}>

            <h1>To Do List</h1>
            
            <div>
                <div className={styles.inputExpanding}>
                    <span ref={spanRef}>{newTask || " "}</span>
                    <input type="text" value={newTask} placeholder='Enter a task...' onChange={handleInputChange} ref={inputRef}></input>
                </div>

                <button type="button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => 
                    <li key={index}>
                        <p>{task}</p>
                        <button onClick={() => deleteTask(index)}>Delete</button> 
                        <button onClick={() => moveTaskUp(index)}>Up</button> 
                        <button onClick={() => moveTaskDown(index)}>Down</button>    
                    </li>
                )}
            </ol>

        </div>
    );
}

export default Co_toDoList