import React,{useState} from 'react';
import { Input,Select,Space,DatePicker,Switch,Button } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import './InpuTodoList.css';
import { v4 as uuidv4 } from 'uuid';
import { addReminder } from '../../../store/modules/todoStore';
import {useAppDispatch } from '../../../app/hooks'



function InputTodo(){
    //const [todoList] = useAppSelector(state => state.todoMvcReducer);
    const dispatch = useAppDispatch()
    const [newReminder,setNewReminder] = useState("");
    const [newTime,setNewTime] = useState("");
    const [newChecked,setNewChecked] = useState(false);
    const [newType, setNewType] = useState("Type");
    const options = [
        {
          value: 'Study',
          label: 'Study',
        },
        {
          value: 'Bussiness',
          label: 'Bussiness',
        }, {
          value: 'Daily',
          label: 'Daily',
        }, {
            value: 'Type',
            label: 'Type',
          },
    ]
    // dateOnChange
    const dateOnChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
      ) => {
        const tmpDate : string = dateString as string;
        setNewTime(tmpDate);
      };
      
    const dateOnOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        const tmpDate : string = value?.toString() as string;
        setNewTime(tmpDate);
    };

    // reminder input on change
    const reminderHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewReminder(e.target.value);
    }

    const switchOnChange = (checked : boolean)=>{
        setNewChecked(checked);
    }

    const selectOnChange = (value : string) => {
        setNewType(value);
    } 

    const submitNewReminder = () => {
        const id = uuidv4();
        if(newTime === "" || newReminder === ""){
            if(newReminder === "") window.alert("You miss the content");
            else window.alert("You miss the reminder time");
        }else{
            const newInfo = {
                id : id,
                key : id,
                time : newTime,
                type : newType,
                content : newReminder,
                checked : newChecked,
                state : 1
            }
            dispatch(addReminder(newInfo));
            setNewType("Type");
            setNewReminder("");
        }
    }
    return (
        <div className='container'>
            <Space.Compact style={{display : 'block',marginBottom : 15}}>
                <Select options={options} style={{width : 120}} value={newType} onChange={selectOnChange}/>
                <Input placeholder='Input your reminder' style={{width : "70%"}} value={newReminder} onChange={(e)=>reminderHandler(e)}/> 
            </Space.Compact>
            <div className='info-box-second-line'>
                <DatePicker showTime onChange={dateOnChange} onOk={dateOnOk} />
                <div className='email-reminder-box'>
                    <div style={{marginRight : 20}}>Email reminder?</div>
                    <Switch onChange={switchOnChange} />
                </div>
            </div>
            <div style={{marginTop : 15}}>
                <Button type='primary' onClick={submitNewReminder}>Submit</Button>
            </div>
       </div>
    )
} 

export default InputTodo;