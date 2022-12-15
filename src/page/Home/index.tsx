import React, { FC, useEffect, useState,useRef } from 'react';
import { Button, Form, Input, InputNumber, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { connect } from 'react-redux';
import Upload from './component/upload'
import axios from 'axios';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
interface IHomeProps {
  Add: any,
  userName: string,
  password: string
}
const Home: FC<any> = (props: IHomeProps) => {
  const { userName } = props
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef() as any
  //获取初始化数据
  const getData = ()=>{
    axios.request({
      url: `http://localhost:3000/medicineData`,
      method: 'get',
    }).then((res: any) => {
      setData(res.data)
    })
  }
  //修改数据
  const setDatas = (param:any)=>{
    axios.request({
      url: `http://localhost:3000/medicineData?id=${param.id}`,
      method: 'put',
      data:param
    }).then((res: any) => {
      getData()
    })
  }
  //初始化
  useEffect(() => {
    getData()
  }, [])
  //对话框
  const showModal = (param:any = {}) => {
    setIsModalOpen(true);
    setTimeout(()=>{
      ref.current.setFieldsValue(param)
    },100)
  };

  const handleOk = () => {
    ref.current.validateFields().then((res:any)=>{
      setIsModalOpen(false);
      setDatas(res)
      return
    }).catch((err:any)=>{
      return
    })
     
  };
  //弹窗关闭
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //删除的事件
  const delClick = (param: any) => {
    Modal.confirm({content:'是否删除！',onOk() {
      axios.request({
        url:`http://localhost:3000/medicineData?id=${param.id}`,
        method:'delete',
   }).then((res:any)=>{
    getData()
   })
    },okText:'确定',cancelText:'取消'})
        
  }
  //table表头
  const columns: ColumnsType<DataType> = [
    {
      title: '药品代码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '药品名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '商家',
      key: 'merchant',
      dataIndex: 'merchant',
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        userName === 'admin' && <Space size="middle">
          <Button type='link' onClick={()=>{showModal(record)}}>编辑</Button>
          <Button type='link' onClick={(e) => {delClick(record)}}>删除</Button>
        </Space>
      ),
    },
  ];
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  //excel上传
  const ExcelList = (data:any)=>{
    setData(data.map((item:any)=>{
      return {
        id:item['药品代码'],
        name:item['药品名'],
        price:item['价格'],
        merchant:item['商家'],
        category:item['类别']
      }
    }))
    //可以不用存直接给后端
  }
  return <div>
    <Modal destroyOnClose={true} okText="确定" cancelText="取消" title="修改药品信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form {...layout} name="nest-messages" onFinish={onFinish}  ref={ref}>
      <Form.Item name={'id'} label="药品代码" rules={[{ required: true,message:'请填写药品代码' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={'name'} label="药品名" rules={[{ required: true,message:'请填写药品名' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={'price'} label="价格" rules={[{ required: true,message:'请填写药品价格' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={'merchant'} label="商家" rules={[{ required: true,message:'请填写药品商家' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={'category'} label="类别" rules={[{ required: true,message:'请填写药品类别' }]}>
        <Input />
      </Form.Item>
    </Form>
      </Modal>
      <Button type='primary' onClick={showModal}>新增</Button>
      <Upload ExcelList = {ExcelList}></Upload>
      <Table rowKey='id' columns={columns} dataSource={data} />
    </div>;
}
const mapStateToProps = (state: any) => ({
  userName: state.userName,
  password: state.password
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    Add: (e: object) => {
      dispatch({ type: "COUNT_ADD", value: e });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);