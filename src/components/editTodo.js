import {Button, Checkbox, Form, Input, TimePicker, Modal, message} from "antd";
import {editTodo, getTodosById,} from "../service";
import {useEffect, useState} from "react";
import moment from 'moment';

export function EditTodo(props) {
    const [isModalVisible, setIsModalVisible] = useState(props.visible);
    const [form] = Form.useForm();
    const handleOk = () => {
        setIsModalVisible(false);
        props?.setIsEditModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        props?.setIsEditModalVisible(false);
    };
    const onFinish = (values) => {
        editTodo(props.id,values);
        message.success("Todo Updated Successfully");
        handleOk();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    async function getData(){
        const response = await getTodosById(props.id);
        console.log(response);
        form.setFieldsValue({
            name: response?.data?.name,
            description: response?.data?.description,
            status: response?.data?.status,
            time: moment(response?.data?.time),
        });
    }
    useEffect(()=>{
        getData();
    },[])
    return <div>
        <div>
            <Modal title="Edit TODO" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <Form
                    form={form}
                    name="todo"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Todo Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Todo name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Todo Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Todo description!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Time',
                            },
                        ]} >
                        <TimePicker />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        valuePropName="checked"
                    >
                        <Checkbox>Todo Completed</Checkbox>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit">
                            Save Todo
                        </Button>

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </div>
}