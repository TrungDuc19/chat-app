import React from "react";
import { Row, Col } from "antd";

import './homepage.scss';
import SideBar from "../../components/sidebar/sidebar";
import ChatWindow from "../../components/chat-window/chat-window";


const HomePage = () => {
    return (
        <div className="home-page">
            <Row>
                <Col span={6}>
                    <SideBar />
                </Col>
                <Col span={18}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    )
}

export default HomePage;