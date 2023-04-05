import React,{useState} from 'react';
import {useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Table } from 'antd';

function TodoContent() {
    const todoList = useAppSelector(state => state.todoMvcReducer.todoList);

    const columns = [
        {
          title: 'content',
          dataIndex: 'content',
          key : 'content'
        },
        {
          title: 'type',
          dataIndex: 'type',
          key : 'type'
        },{
            title: 'time',
            dataIndex: 'time',
            key : 'time'
          },{
            title: 'checked',
            dataIndex: 'checked',
            key : 'checked'
          },{
            title: 'state',
            dataIndex: 'state',
            key : 'state'
          }
        ]
    return (
        <div>
            <Table dataSource={todoList} columns={columns}></Table>
        </div>
    )
} 

export default TodoContent;