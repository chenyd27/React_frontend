import React from 'react';
import InputTodo from './InputTodo/InputTodoList';
import TodoContent from './todoContent/todoContent';

function TodoList(){
    return (
        <div>
            <div style={{width : "800px", borderRight : "gray solid 1px", height : "100vh"}}>
                <InputTodo/>
                <div style={{marginTop : 30, textAlign : "center"}}>
                    <TodoContent/>
                </div>
            </div>
        </div>
    )
} 

export default TodoList;

