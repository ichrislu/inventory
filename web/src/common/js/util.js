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


     // 修改库存 分类级联选择
     //  editChangeRef() {
     //      const nodesObj = this.$refs['editCascader'].getCheckedNodes();
     //      const Id = nodesObj[0].data.Id
     //      this.editForm.Bid = Id
     //  },

     // 处理添加备注参数
     getFormDataFromJson(json) {
         let params = new URLSearchParams()
         for (var key in json) {
             params.append(key, json[key]);
         }
         return params;
     },


 }

 export const Datetransformation = (value) => {
     // 时间戳转换日期格式方法
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
 }
