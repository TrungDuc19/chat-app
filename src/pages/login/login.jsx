import React from "react";
import { Row, Col, Button, Typography } from 'antd'

import './login.scss'
import { signInWithFaceBook, signInWithGoogle } from "../../firebase/login";

const { Title } = Typography;

const Login = () => {
    return (
        <div className="login">
            <Row justify={'center'} style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Chat App
                    </Title>
                    <Button style={{ width: '100%', marginBottom: 5 }} onClick={signInWithGoogle} >
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={signInWithFaceBook}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div >
    )
}

export default Login;