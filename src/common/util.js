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

     // ----------------------------------------- 表单重置中心 -----------------------------------------
     resetForm(demo, ref) {
         switch (ref) {
             //------------------------------统一查询重置---------------------------------
             // 查询表单
         case 'searchRef':
             this.rest(demo, 'searchRef')
             break;
             //--------------------------------品类页--------------------------------------
             //增加品类表单
             case 'addCateRef':
                 this.rest(demo, 'addCateRef')
                 break;
                 //增加品牌表单
             case 'addBrandsFormRef':
                 this.rest(demo, 'addBrandsFormRef')
                 break;
                 //-------------------------------库存页-----------------------------------
                 // 备注表单
             case 'remarkForm':
                 this.rest(demo, 'remarkForm')
                 break;
                 //新增库存表单
             case 'addForm':
                 this.rest(demo, 'addForm')
                 break;
                 //出库表单
             case 'outStockForm':
                 this.rest(demo, 'outStockForm')
                 break;
                 //----------------------------------顾客信息页------------------------------------
                 case 'setCustomerForm':
                     this.rest(demo, 'setCustomerForm')
                     break;
                 case 'customerForm':
                     this.rest(demo, 'customerForm')
                     break;
                     //----------------------------------出库页------------------------------------
                 case 'outStockRef':
                    this.rest(demo, 'outStockRef')
                    break;
             default:
                 break;
         }

     },
     // 重置表单
     rest(demo, formName) {
         if (demo.$refs[formName] !== undefined) {
             demo.$refs[formName].resetFields();
         }
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
