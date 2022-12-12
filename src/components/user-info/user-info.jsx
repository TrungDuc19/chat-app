import { useContext } from "react";
import { Button, Avatar, Typography } from "antd";

import './user-info.scss';
import { auth } from "../../firebase/config";
import { AuthContext } from "../../context/auth-provider";

const { Text } = Typography;

const UserInfo = () => {
    const { user: { displayName, photoURL } } = useContext(AuthContext);

    return (
        <div className="user-info">
            <div className="user-info__wrapper">
                <Avatar src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Text className="user-info__username">{displayName}</Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
        </div>
    )
}

export default UserInfo;