import { useState, useEffect, useContext } from "react";
import { Avatar, Form, Modal, Select, Spin, Typography } from "antd";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
// import { debounce } from "lodash";

import "./invite-member-modal.scss";
import { db } from "../../firebase/config";
import { AppContext } from "../../context/app-provider";
import useDebounce from "../../hooks/useDebounce";
import { updateDocument } from "../../firebase/services";

const { Option } = Select;
const { Text } = Typography;

const fetchUserList = async (searchValue, currentMembers) => {
    const usersRef = query(collection(db, 'users'), orderBy('displayName'));
    return await getDocs(usersRef)
        .then(snapshot => snapshot.docs.map(doc => doc.data()))
        .then(users => users.filter(user => (
            user.displayName.toLowerCase().includes(searchValue.toLowerCase())
            && !currentMembers.includes(user.uid)
        )))
        .then(usersFilter => usersFilter.map(({ uid, displayName, photoURL }) => ({
            label: displayName,
            value: uid,
            photoURL
        })))
}

function DebounceSelect({ currentMembers, ...props }) {
    // Search: abcdef
    const [searchValue, setSearchValue] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debouncedSearchValue = useDebounce(searchValue, 300);

    useEffect(() => {
        if (debouncedSearchValue) {
            setOptions([]);
            setIsFetching(true);
            fetchUserList(debouncedSearchValue, currentMembers)
                .then(newOptions => {
                    setOptions(newOptions);
                    setIsFetching(false);
                })
                .catch(error => {
                    console.log(error.message);
                    setIsFetching(false);
                })
        }
        else {
            setOptions([]);
            setIsFetching(false);
        }
    }, [debouncedSearchValue, currentMembers]);

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            filterOption={false}
            onSearch={(newValue => setSearchValue(newValue))}
            notFoundContent={isFetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map(({ value, label, photoURL }) => (
                <Option key={value} value={value} title={label}>
                    <Avatar src={photoURL} size='small'>
                        {photoURL ? '' : label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Text className="invite-member-modal__username">{label}</Text>
                </Option>
            ))}
        </Select>
    );
}

const InviteMemberModal = () => {
    const {
        isInviteMemberOpen,
        setIsInviteMemberOpen,
        selectedRoom,
    } = useContext(AppContext);
    const [selectedUserList, setSelectedUserList] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        // reset form value
        form.resetFields();
        setSelectedUserList([]);

        // update members in current room
        updateDocument(`rooms/${selectedRoom.id}`, {
            members: [...selectedRoom.members, ...selectedUserList]
        })

        setIsInviteMemberOpen(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setSelectedUserList([]);

        setIsInviteMemberOpen(false);
    };

    const handleChange = (newValue) => {
        setSelectedUserList(newValue);
    }

    return (
        <Modal
            className="invite-member-modal"
            title='Mời thêm thành viên'
            open={isInviteMemberOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
        >
            <Form form={form} layout='vertical'>
                <DebounceSelect
                    className="invite-member-modal__select"
                    mode='multiple'
                    value={selectedUserList}
                    placeholder='Nhập tên thành viên'
                    onChange={handleChange}
                    currentMembers={selectedRoom.members}
                />
            </Form>
        </Modal>
    );
}

export default InviteMemberModal;