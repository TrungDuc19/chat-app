import { useContext, useRef, useEffect } from 'react';
import { formatRelative } from 'date-fns/esm'

import './message-list.scss';
import MessageItem from '../message-item/message-item';
import { AuthContext } from "../../context/auth-provider";
import { AppContext } from '../../context/app-provider';

const MessageList = () => {
    const { user } = useContext(AuthContext);
    const { messages } = useContext(AppContext);
    const bottomRef = useRef(null);

    const formatDate = seconds => {
        let formattedDate = '';

        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }

        return formattedDate;
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-list" >
            {
                messages.map(({ id, uid, text, displayName, photoURL, createAt }) => (
                    <MessageItem
                        key={id}
                        messageUserId={uid}
                        currentUserId={user.uid}
                        text={text}
                        displayName={displayName}
                        photoURL={photoURL}
                        createAt={formatDate(createAt?.seconds)}
                    />
                ))
            }
            <div ref={bottomRef} />
        </div >
    )
}

export default MessageList;