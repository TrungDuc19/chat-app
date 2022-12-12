import { useContext } from "react";
import { Button, Avatar, Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons"

import './header.scss'
import { AppContext } from "../../context/app-provider";

const { Group } = Avatar;

const Header = () => {
    const {
        members,
        selectedRoom: {
            name,
            description
        },
        setIsInviteMemberOpen
    } = useContext(AppContext);

    return (
        <div className="header">
            <div className="header__info">
                <p className="header__title">{name}</p>
                <span className="header__description">{description}</span>
            </div>
            <div className="header__avatar-group">
                <Button icon={<UserAddOutlined />} type="text" onClick={() => setIsInviteMemberOpen(true)}>Mời</Button>
                <Group size="small" maxCount={2}>
                    {
                        members.map(({ id, displayName, photoURL }) => (
                            <Tooltip key={id} title={displayName}>
                                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                            </Tooltip>
                        ))
                    }
                </Group>
            </div>
        </div >
    );
}

export default Header;