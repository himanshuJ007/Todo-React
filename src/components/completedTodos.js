import {useEffect, useState} from "react";
import {Button, Card} from "antd";
import {getCompletedTodos} from "../service";
import {EditTodo} from "./editTodo";
import moment from 'moment';

export function CompletedTodos (){
    const [data,setData] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [id,setId] = useState('');
    async function getData(){
        const response = await getCompletedTodos();
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
                {isEditModalVisible? <EditTodo id={id} visible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} ></EditTodo>:<></>}
            </div>
        })}
    </div>
}