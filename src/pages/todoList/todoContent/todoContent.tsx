import React,{useState, useRef} from 'react';
import {useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Table,Space, Button,Input,Tag,Switch } from 'antd';
import type { InputRef, TableProps } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { deleteSingleReminder, changeChecked } from '../../../store/modules/todoStore';

interface DataType{
  id : string,
  key : string,
  time : string,
  type : string,
  content : string,
  checked : boolean,
  state : number
}
type DataIndex = keyof DataType;

function TodoContent() {
    const todoList = useAppSelector(state => state.todoMvcReducer.todoList);
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    const judgeTagColor = (index : string) : string => {
      if(index === 'Bussiness') return 'blue';
      else if(index === 'Study') return 'green';
      else if(index === 'Daily') return 'volcano';
      return 'grey';
    }

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});  
    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
      setFilteredInfo(filters);
    };
    const clearFilters = () => {
      setFilteredInfo({});
    };

    const handleChecked = (record : DataType) =>{
        dispatch(changeChecked(record));
    }

    const handleDelete = (record : DataType) =>{
        dispatch(deleteSingleReminder(record));
    }

    const columns : ColumnsType<DataType> = [
      {
        title: 'content',
        dataIndex: 'content',
        key : 'content',
        width : '30%',
        ...getColumnSearchProps('content'),
      },{
        title: 'type',
        dataIndex: 'type',
        key : 'type',
        filters: [
          { text: 'Study', value: 'Study' },
          { text: 'Bussiness', value: 'Bussiness' },
          { text: 'Daily', value: 'Daily' },
          { text: 'Type', value: 'Type' },
        ],
        onFilter: (value: string | number | boolean, record) => record.type.includes(value as string),
        render: (type: string) => (
          <span>
            <Tag color={judgeTagColor(type)}>{type}</Tag>
          </span>
        )
      },{
          title: 'time',
          dataIndex: 'time',
          key : 'time'
        },{
          title: 'checked',
          dataIndex: 'checked',
          key : 'checked',
          render : (_, record : DataType) => (
            <Switch defaultChecked={record.checked} onChange={() => handleChecked(record)}/>
          )
        },{
          title: 'action',
          dataIndex: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={()=>handleDelete(record)}>Delete</a>
            </Space>
          ),
        }
      ]
    return (
        <div>
            <Table dataSource={todoList} columns={columns} onChange={handleChange}></Table>
        </div>
    )
} 

export default TodoContent;