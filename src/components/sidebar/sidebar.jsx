import React from "react";
import { Row, Col } from "antd";

import "./sidebar.scss";
import UserInfo from "../user-info/user-info";
import RoomList from "../room-list/room-list";

const SideBar = () => {
    return (
        <div className="sidebar">
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </div>
    )
}

export default SideBar;