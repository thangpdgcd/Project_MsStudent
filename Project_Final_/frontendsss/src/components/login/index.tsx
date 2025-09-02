import React, { useState } from "react";
import { Layout, Form, Input, Button, Checkbox, message } from "antd";
import { login } from "../../api/authApi";
import "./index.scss";

const { Header, Footer, Sider, Content } = Layout;

type LoginPayload = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload: LoginPayload = {
        email: values.email,
        password: values.password,
      };

      const data = await login(payload);
      localStorage.setItem("token", data.token);

      message.success("✅ Đăng nhập thành công!");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      message.error("❌ Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className='login-layout'>
      <Header className='login-header'>Header</Header>
      <Layout>
        <Sider className='login-sider'>Left Sidebar</Sider>
        <Content className='login-content'>
          <div className='login-form-container'>
            <h2 className='login-title'>Đăng nhập</h2>
            <Form
              name='login'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              className='login-form'>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Mật khẩu'
                name='password'
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                ]}>
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' loading={loading}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Sider className='login-sider'>Right Sidebar</Sider>
      </Layout>
      <Footer className='login-footer'>Footer</Footer>
    </Layout>
  );
};

export default LoginPage;
