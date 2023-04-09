import { Button } from 'antd';
import React,{useState} from 'react';
import { Input } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../app/hooks';
import { addReminder } from '../../../store/modules/todoStore';


interface reminderType{
    id : string,
    key : string,
    time : string,
    type : string,
    content : string,
    checked : boolean,
    state : number
}
function UploadFile(){
    const dispatch = useAppDispatch();
    const [fileContent, setFileContent] = useState('');
    const [reminderContent, setReminderContent] = useState({});
    const handleFileChange = (event : any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setFileContent(event.target?.result as string);
        };
        reader.readAsText(file);
      };
    const uploadDoc = () => {
        const content : string[] = fileContent.split(',');
        console.log(content[0]);
        const id = uuidv4();
        const newContent : reminderType = {
            id : id,
            key : id,
            time : new Date().toString(),
            type : content[1],
            content : content[0],
            checked : content[2] === 'yes' ? true : false,
            state : 1
        }
        dispatch(addReminder(newContent));
    }
    return (
        <div>
            <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={(event)=>handleFileChange(event)}
            />
            <Button type='primary' onClick={uploadDoc}>Upload</Button>
      </div>
    )
}

export default UploadFile;