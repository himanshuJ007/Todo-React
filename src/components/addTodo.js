import {Button, Card, Checkbox, Form, Input, TimePicker, message} from "antd";
import {saveTodo} from "../service";
import { useHistory } from "react-router-dom";

export function AddTodo() {
    let history = useHistory();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        saveTodo(values);
        message.success("Todo Added Successfully");
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div>
        <div>
            <Card title="Add Todo" style={{ width: 500 }}>
                <Form
                    name="todo"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        status: false,
                    }}
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
            </Card>
        </div>

        <div style={{display:'flex',justifyContent:"space-around", padding: '10px'}}>
            <Button type='primary' onClick={()=>{history.push('/pending')}}>View Pending Todos</Button>
            <Button type='primary' onClick={()=>{history.push('/completed')}}>View Completed Todos</Button>
        </div>
    </div>
}