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

     // 处理添加备注参数
     getFormDataFromJson(json) {
         let params = new URLSearchParams()
         for (var key in json) {
             params.append(key, json[key]);
         }
         return params;
     },

     // 时间戳转换日期格式方法
     Datetransformation(value) {
         if (value == null) {
             return ''
         } else {
             let date = new Date(value)
             let y = date.getFullYear() // 年
             let MM = date.getMonth() + 1 // 月
             MM = MM < 10 ? '0' + MM : MM
             let d = date.getDate() // 日
             d = d < 10 ? '0' + d : d
             return y + '-' + MM + '-' + d
         }
     },
     // 时间快捷选项
     getTime() {
         var date = new Date();
         var d = new Date(date);
         var yue = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
         var re = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
         var youWant = d.getFullYear() + '-' + yue + '-' + re;
         date = youWant;
         var da = new Date(date.replace(/-/g, '/'))
         return da
     },

     // loading 开启
    //  openFullScreen() {
    //      const loading = this.$loading({
    //          lock: true,
    //          text: 'Loading',
    //          spinner: 'el-icon-loading',
    //          background: 'rgba(0, 0, 0, 0.7)'
    //      });
    //     return loading
    //  }

 }
