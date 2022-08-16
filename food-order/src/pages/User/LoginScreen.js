import React from 'react'
import { Tabs } from 'antd';
import SignUp from './SignUp';
import Login from './Login';
const { TabPane } = Tabs;

function LoginScreen() {
    return (
        <div className="login-container">
            <Tabs type="card" centered>
                <TabPane tab="Login" key="1">
                    <Login />
                </TabPane>
                <TabPane tab="Register" key="2">
                    <SignUp />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default LoginScreen