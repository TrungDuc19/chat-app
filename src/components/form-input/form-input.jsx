import { useState, useContext } from "react";
import { Form, Button, Input } from "antd";

import "./form-input.scss";
import { AuthContext } from "../../context/auth-provider";
import { AppContext } from "../../context/app-provider";
import { addDocument } from "../../firebase/services";

const { Item } = Form;

const FormInput = () => {
    const { user: {
        uid,
        displayName,
        photoURL,
    } } = useContext(AuthContext);
    const { selectedRoom } = useContext(AppContext);
    const [inputMessageValue, setInputMessageValue] = useState('');
    const [form] = Form.useForm();

    const handleInputChange = (event) => {
        setInputMessageValue(event.target.value);
    }

    const handleOnSubmit = () => {
        if (inputMessageValue) {
            addDocument('messages', {
                text: inputMessageValue,
                uid,
                displayName,
                photoURL,
                roomId: selectedRoom.id
            });

            form.resetFields(['message']);
            setInputMessageValue('');
        }
    }

    return (
        <Form className="form-input" form={form}>
            <Item className="form-input__item" name="message">
                <Input
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                    placeholder="Nhập tin nhắn..."
                    bordered={false}
                    autoComplete="off"
                    autoFocus
                />
            </Item>
            <Button type="primary" onClick={handleOnSubmit} name="message">Gửi</Button>
        </Form>
    )
}


export default FormInput;