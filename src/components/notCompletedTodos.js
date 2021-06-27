import {useEffect, useState} from "react";
import {Button, Card} from "antd";
import {getNotCompletedTodos} from "../service";
import {EditTodo} from "./editTodo";
import moment from 'moment';

export function NotCompletedTodos (){
    const [data,setData] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [id,setId] = useState('');
    async function getData(){
        const response = await getNotCompletedTodos();
        setData(response.data);
    }
    useEffect(()=>{
        getData();
    },[])
    if(data.length===0) return <div>No Record Found</div>
    return <div style={{display: 'flex',flexWrap:"wrap", justifyContent:'space-between'}}>
        {data?.map((todo)=>{
            return <div style={{width:'30%', padding: '10px'}}>
                <Card title={todo?.name} style={{ width: 300 }} >
                    <p>Description: {todo?.description}</p>
                    <p>Time: {moment(todo?.time).format("hh:mm:ss a")}</p>
                    <Button type='primary' onClick={()=>{
                        setIsEditModalVisible(true);
                        setId(todo._id);
                    }}>Edit</Button>
                </Card>

            </div>
        })}
        {isEditModalVisible? <EditTodo id={id} visible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} ></EditTodo>:<></>}
    </div>
}