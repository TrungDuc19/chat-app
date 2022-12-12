import { useContext } from 'react';
import { Form, Input, Modal } from 'antd';

import './addRoomModal.scss';
import { AppContext } from '../../context/app-provider';
import { AuthContext } from '../../context/auth-provider';
import { addDocument } from '../../firebase/services';

const { Item } = Form;

const AddRoomModal = () => {
    const { isAddRoomOpen, setAddRoomOpen } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        const fieldsValue = form.getFieldsValue();
        if (fieldsValue.name && fieldsValue.description) {
            addDocument('rooms', { ...fieldsValue, members: [uid] })
        }

        form.resetFields();
        setAddRoomOpen(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setAddRoomOpen(false);
    }

    return (
        <Modal
            className="add-room-modal"
            title="Tạo phòng"
            open={isAddRoomOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Item label="Tên phòng" name="name">
                    <Input placeholder="Nhập tên phòng" />
                </Item>
                <Item label="Mô tả" name="description">
                    <Input placeholder="Nhập mô tả" />
                </Item>
            </Form>
        </Modal>
    );
}

export default AddRoomModal;