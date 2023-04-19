import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .ant-form-item": {
      marginBottom: theme.spacing(3),
    },
    "& .login-form-button": {
      width: "100%",
    },
  },
  container: {
    height: "65vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  formContainer: {
    width: "50vw",
    display: "flex",
    justifyContent: "center",
  },
}));

const LoginPage = ({ history }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/login", values);
      localStorage.setItem("jwtToken", response.data.token);
      // Redirect to dashboard page
      navigate("/dashboard");
    } catch (err) {
      message.error("Invalid email or password");
    }
  };

  const LoginForm = () => {
    const onFinish = (values) => {
      handleSubmit(values);
    };

    return (
      <div className={classes.formContainer}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
