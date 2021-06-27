import axios from "axios";
import {BASE_URL} from "./constants";

export const saveTodo = async (data)=>{
    return await axios.post(BASE_URL+'create',data);
}
export const editTodo = async (id,data)=>{
    return await axios.put(BASE_URL+`update/${id}`,data);
}
export const getCompletedTodos = async (data)=>{
    return await axios.get(BASE_URL+'true',data);
}
export const getNotCompletedTodos = async (data)=>{
    return await axios.get(BASE_URL+'false',data);
}
export const getTodosById = async (id)=>{
    return await axios.get(BASE_URL+`get/${id}`);
}