import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface reminderType{
    id : string,
    key : string,
    time : string,
    type : string,
    content : string,
    checked : boolean,
    state : number
}
interface reminderList {
    todoList : reminderType[]
}
const initialState : reminderList = {
    todoList : []
}
const todoMvc = createSlice({
    name : 'todoMvc',
    initialState,
    reducers : {
        addReminder (state : RootState,action : PayloadAction<reminderType>) : void{
            state.todoList.push(action.payload);
        }
    }
})

const {addReminder} = todoMvc.actions;
const todoMvcReducer = todoMvc.reducer;
export const todoList = (state: RootState) => state.todoMvc.todoList;
export {addReminder};
export default todoMvcReducer;