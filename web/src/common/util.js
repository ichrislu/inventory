 export default {
     //  根据缓存设置品牌品类
     setCate(arr) {
         for (let i = 0; i < arr.length; i++) {
             var obj = JSON.parse(window.sessionStorage.getItem('key_' + arr[i].Bid))
             arr[i].Brand = obj.brand,
                 arr[i].Category = obj.category
         }
         return arr
     },

     // 重置表单
     rest(demo, formName) {
         if (demo.$refs[formName] !== undefined) {
             demo.$refs[formName].resetFields();
         }
     },


     // 处理添加备注参数
     getFormDataFromJson(json) {
         let params = new URLSearchParams()
         for (var key in json) {
             params.append(key, json[key]);
         }
         return params;
     },
 }
