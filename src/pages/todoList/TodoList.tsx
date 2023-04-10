import React from 'react';
import HistoryContent from './historyContent/HistoryContent';
import InputTodo from './InputTodo/InputTodoList';
import TodoContent from './todoContent/todoContent';
import UploadFile from './UploadFile/UploadFile';

function TodoList(){
    return (
        <div style={{display : "flex",width:"1000px",justifyContent:"space-between"}}>
            <div style={{height : "100vh",width : "60%"}}>
                <InputTodo/>
                <div style={{marginTop : 30, textAlign : "center"}}>
                    <TodoContent/>
                </div>
                <div style={{marginTop : 30, textAlign : "center"}}>
                    <UploadFile/>
                </div>
            </div>
            <div style={{height : "100vh",width : "40%"}}>
                <HistoryContent/>
            </div>
        </div>
    )
} 

export default TodoList;

