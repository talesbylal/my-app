import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const RegistrationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:5000/register", values);
      message.success("Registration successful! You can now log in.");
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      message.error("Registration failed. Please try again later.");
    }
  };

  const RegistrationForm = () => {
    const onFinish = (values) => {
      handleSubmit(values);
    };

    return (
      <div className={classes.formContainer}>
        <Form
          name="normal_registration"
          className="registration-form"
          initialValues={{ remember: true }}
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
              className="registration-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <h1>Registration Page</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
