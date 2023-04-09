import React from 'react';
import HistoryContent from './historyContent/HistoryContent';
import InputTodo from './InputTodo/InputTodoList';
import TodoContent from './todoContent/todoContent';
import UploadFile from './UploadFile/UploadFile';

function TodoList(){
    return (
        <div style={{display : "flex"}}>
            <div style={{width : "700px", borderRight : "gray solid 1px", height : "100vh"}}>
                <InputTodo/>
                <div style={{marginTop : 30, textAlign : "center"}}>
                    <TodoContent/>
                </div>
                <div style={{marginTop : 30, textAlign : "center"}}>
                    <UploadFile/>
                </div>
            </div>
            <div>
                <HistoryContent/>
            </div>
        </div>
    )
} 

export default TodoList;

