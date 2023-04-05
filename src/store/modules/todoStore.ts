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
        },
        deleteSingleReminder(state : RootState, action : PayloadAction<reminderType>) : void {
            const singlereminder : reminderType = action.payload;
            const updateList = state.todoList.filter((item : reminderType) => item.id !== singlereminder.id);
            state.todoList = updateList;
        },
        changeChecked(state : RootState, action : PayloadAction<reminderType>) : void {
            const singlereminder : reminderType = action.payload;
            const updateList = state.todoList.map((item : reminderType) => {
                if(item.id === singlereminder.id) return {...item,checked : !item.checked};
                return item;
            });
            state.todoList = updateList;
        },
    }
})

const {addReminder, deleteSingleReminder, changeChecked} = todoMvc.actions;
const todoMvcReducer = todoMvc.reducer;
export const todoList = (state: RootState) => state.todoMvc.todoList;
export {addReminder, deleteSingleReminder, changeChecked};
export default todoMvcReducer;