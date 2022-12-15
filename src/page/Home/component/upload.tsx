import React from 'react';
import * as XLSX from 'xlsx';
import {Button, message,  Upload} from 'antd';
interface IState{
}
interface Iprops{
   ExcelList:(param:any)=>void
}
export class UploadFile extends React.Component<Iprops,IState> {
   constructor(props:Iprops){
      super(props);
      this.state = {
         tableData:[]
      }
    }
render() {
   return (
      <div>
            <Upload name="file"
               accept=".xls,.xlsx" maxCount={1}
               beforeUpload={function () {
                  return false;
               }}
               onChange={this.uploadFilesChange.bind(this)}
               showUploadList={false}>
               <p className="ant-upload-text">
                 <Button> 点击上传文件</Button>
               </p>
            </Upload>
      </div>
   );
}
  
uploadFilesChange(file:any) {
   // 通过FileReader对象读取文件
   const fileReader = new FileReader();
   // 以二进制方式打开文件
   fileReader.readAsBinaryString(file.file);
   fileReader.onload = (event:any) => {
      try {
         const {result} = event.target;
         // 以二进制流方式读取得到整份excel表格对象
         const workbook = XLSX.read(result, {type: 'binary'});
         // 存储获取到的数据
         let data:any = {};
         // 遍历每张工作表进行读取（这里默认只读取第一张表）
         for(const sheet in workbook.Sheets) {
            let tempData:Array<any> = [];
            // esline-disable-next-line
            if(workbook.Sheets.hasOwnProperty(sheet)) {
               // 利用 sheet_to_json 方法将 excel 转成 json 数据
               console.log(sheet);
               data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            }
         }
         const excelData = data.Sheet1;
         const excelHeader = [];
         // 获取表头
         for(const headerAttr in excelData[0]) {
            const header = {
               title: headerAttr,
               dataIndex: headerAttr,
               key: headerAttr
            };
            excelHeader.push(header);
         }
         // 最终获取到并且格式化后的 json 数据
         this.props.ExcelList(excelData)
      } catch(e) {
         // 这里可以抛出文件类型错误不正确的相关提示
         console.log(e);
         message.error('文件类型不正确！');
      }
   };
}
}
export default UploadFile;