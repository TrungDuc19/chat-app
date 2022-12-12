import { Avatar, Typography } from "antd";

import "./message-item.scss";


const { Text } = Typography;

const MessageItem = ({ messageUserId, currentUserId, text, displayName, createAt, photoURL }) => (
    <div className={`message-item ${messageUserId === currentUserId ? 'message-item--currentUser' : ''}`}>
        <div className="message-item__header">
            <Avatar src={photoURL} size="small">{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
            <Text className="message-item__author">{displayName}</Text>
            <Text className="message-item__date">{createAt}</Text>
        </div>
        <div className="message-item__content">
            <Text className="message-item__text">{text}</Text>
        </div>
    </div >
)


export default MessageItem;