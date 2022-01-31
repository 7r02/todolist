import React, { useState } from "react";
import { Cookies } from "react-cookie";
import "../styles/Todolist.scss";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { TiPencil } from "react-icons/ti";
import { AiOutlineCheckCircle } from "react-icons/ai";

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
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

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
        newTodolist[count] = {
            todo: text,
            complete: false,
        };
        setCount(count + 1);
        setTodolist(newTodolist);
        setText("");
        setEditText("");
        setEditIndex(-1);
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
        setEditText("");
        setEditIndex(-1);
    };

    const tryEdit = (index) => {
        setEditIndex(index);
        setEditText(todolist[index]);
    };

    const editValue = (input, index) => {
        if (input.key === "Enter") {
            editTodo(index);
            return;
        }
        setEditText(input.target.value);
    };

    const editTodo = (index) => {
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) {
                newTodolist[i] = {
                    todo: editText,
                    complete: todolist[i].complete,
                };
                continue;
            }
            newTodolist[i] = todolist[i];
        }
        setTodolist(newTodolist);
        setEditIndex(-1);
        setEditText("");
    };

    const completeTodo = (index) => {
        const newTodolist = [];
        for (let i = 0; i < todolist.length; i++) {
            if (i === index) {
                newTodolist[i] = {
                    todo: todolist[i].todo,
                    complete: !todolist[i].complete,
                };
                continue;
            }
            newTodolist[i] = todolist[i];
        }
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
                    <div className="todo " key={index}>
                        {index === editIndex ? (
                            <input
                                className="editInput"
                                onKeyUp={(input) => editValue(input, index)}
                                defaultValue={value.todo}
                            />
                        ) : (
                            <div className="todoInner">
                                <AiOutlineCheckCircle
                                    onClick={() => completeTodo(index)}
                                    style={{ marginRight: 10 }}
                                />
                                <div
                                    className="p"
                                    style={
                                        value.complete
                                            ? {
                                                  textDecorationLine:
                                                      "line-through",
                                              }
                                            : {}
                                    }
                                >
                                    {value.todo}
                                </div>
                            </div>
                        )}
                        <div className="icons">
                            {index === editIndex ? (
                                <AiOutlineCheckCircle
                                    onClick={() => editTodo(index)}
                                />
                            ) : (
                                <TiPencil onClick={() => tryEdit(index)} />
                            )}
                            <TiDeleteOutline
                                onClick={() => removeTodo(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Todolist;
