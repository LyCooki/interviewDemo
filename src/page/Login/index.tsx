import { Button, Form, Input, message } from "antd";
import { FC } from "react"
import { useNavigate} from "react-router-dom";
import axios from 'axios'
import { connect } from 'react-redux'
interface IHomeProps{
  Add:any,
}
const Login:FC<any> = (props:IHomeProps)=>{
    const useNav = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values: any) => {
        axios.request({
          url:`http://localhost:3000/user?id=${values.username}`,
          method:'get',
     }).then((res:any)=>{
      console.log(res,'resrser');
      if(res.data.length===0){
        messageApi.error('用户尚未注册！请注册在登陆')
        return
      }
      if(res.data[0].password!==values.password){
        messageApi.error('密码错误！')
        return
      }
      messageApi.success('登录成功')
      /* eslint-disable */
      useNav('/Home')
      props.Add(values)
     })
      };
      return (
        <div className="login">
          {contextHolder}
            <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
    
    
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
           <div className="login-btn-box">
           <Button type="primary" htmlType="submit">
              登录
            </Button>
            
           </div>
          </Form.Item>
          
        </Form>
        </div>
      );
}
const mapStateToProps = (state:any) => ({
  userName:state.userName,
  password:state.password
});

const mapDispatchToProps = (dispatch:any) => {
  return {
    Add: (e:object) => {
      dispatch({ type: "COUNT_ADD" ,value:e});
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Login)