import { useContext } from "react";
import { Alert } from "antd";

import "./chat-window.scss";
import Header from "../header/header";
import MessageList from "../message-list/message-list";
import FormInput from "../form-input/form-input";
import { AppContext } from "../../context/app-provider";

const ChatWindow = () => {
    const { selectedRoom } = useContext(AppContext);

    return (
        <div className={`chat-window ${selectedRoom.id ? '' : 'chat - window--empty'}`}>
            {
                selectedRoom.id ?
                    <>
                        <Header />
                        <div className="content">
                            <MessageList />
                            <FormInput />
                        </div>
                    </>
                    :
                    <Alert
                        message="Vui lòng chọn phòng"
                        type="info"
                        showIcon
                        closable
                    />

            }
        </div>
    )
}

export default ChatWindow;