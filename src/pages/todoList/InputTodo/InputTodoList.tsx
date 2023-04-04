import React,{useState} from 'react';
import { Input,Select,Space,DatePicker,Switch,Button } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import './InpuTodoList.css';


function InputTodo(){
    const [newReminder,setNewReminder] = useState("");
    const [newTime,setNewTime] = useState(new Date());
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
        const currentDate : Date = new Date(tmpDate);
        setNewTime(currentDate);
      };
      
    const dateOnOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        const tmpDate : string = value?.toString() as string;
        const currentDate : Date = new Date(tmpDate);
        setNewTime(currentDate);
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
       const newInfo = {
            time : newTime,
            type : newType,
            content : newReminder,
            checked : newChecked
       }
       console.log(newInfo);
    }
    return (
        <div className='container'>
            <Space.Compact style={{display : 'block',marginBottom : 15}}>
                <Select options={options} style={{width : 120}} value={newType} onChange={selectOnChange}/>
                <Input placeholder='Input your reminder' style={{width : 400}} value={newReminder} onChange={(e)=>reminderHandler(e)}/> 
            </Space.Compact>
            <div className='info-box-second-line'>
                <DatePicker showTime onChange={dateOnChange} onOk={dateOnOk} />
                <div className='email-reminder-box'>
                    <div style={{marginRight : 30}}>Email reminder?</div>
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