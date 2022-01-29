import React, { useState } from "react";
import "../styles/Todolist.scss";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

function Todolist() {
    // 1. 예쁘게 꾸미기
    // 2. 삭제
    // 3. 수정
    // 4. 완료한 일정 체크
    // 5. 브라우저를 종료했다가 들어와도 투두리스트 유지되기
    // 6. 일정내에 완료하지 못한 일정 dim처리
    // 7. 덜 끝낸 일정 세모표시

    const [text, setText] = useState("");
    const [todolist, setTodolist] = useState([]);
    const [count, setCount] = useState(0);
    const textValue = (input) => {
        if (input.key === "Enter") {
            addTodo();
            return;
        }
        setText(input.target.value);
    };

    const addTodo = () => {
        if (text === "") return;
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            newTodolist[i] = todolist[i];
        }
        newTodolist[count] = text;
        setCount(count + 1);
        setTodolist(newTodolist);
        setText("");
    };

    const removeTodo = (index) => {
        const newTodolist = [];
        let j = 0;
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) continue;
            newTodolist[j] = todolist[i];
            j++;
        }
        setCount(count - 1);
        setTodolist(newTodolist);
    };

    return (
        <div className="Todolist">
            <div className="Header">
                <input
                    type="text"
                    onKeyUp={textValue}
                    placeholder="What do you have to do?"
                />
                <IoIosAddCircleOutline
                    size={70}
                    color="white"
                    onClick={addTodo}
                />
            </div>
            <div className="Body">
                {todolist.map((value, index) => (
                    <div key={index}>
                        {value}
                        <TiDeleteOutline onClick={() => removeTodo(index)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Todolist;
