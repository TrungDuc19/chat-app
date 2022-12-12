import { createContext, useContext, useMemo, useState } from "react";

import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./auth-provider";

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
    const [isAddRoomOpen, setAddRoomOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);

    const { user: { uid } } = useContext(AuthContext);

    const roomsCondition = useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: uid
    }), [uid]);

    const usersCondition = useMemo(() => ({
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom.members
    }), [selectedRoom.members]);

    const messagesCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id]);

    const rooms = useFirestore('rooms', roomsCondition);
    const members = useFirestore('users', usersCondition);
    const messages = useFirestore('messages', messagesCondition);

    return (
        <Provider value={{
            rooms,
            members,
            messages,
            isAddRoomOpen,
            setAddRoomOpen,
            selectedRoom,
            setSelectedRoom,
            isInviteMemberOpen,
            setIsInviteMemberOpen
        }}>
            {children}
        </Provider>
    )
}

export { AppContext };
export default AppProvider;