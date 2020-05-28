export default {
    init: () => {
        return {
            // 出库列表数据
            customerList: [],

            // 控制 修改备注对话框的显示与隐藏
            showRemarkFormDialogVisible: false,
            // 备注对话框 表单对象
            remarkForm: {
                Remarks: '',
                Id: ''
            },
            // 搜索栏表单对象
            searchForm: {
                shipper: '',
                // 时间选择器绑定对象
                time: [],
                checked: false
            },
            // 控制 打印提示 "包含已送货信息"的显示和隐藏
            show : false,
            // 控制客户信息表单的 显示与隐藏
            customerFormDialogVisible: false,
            // 录入客户信息表单
            setCustomerForm: {
                shipper: '',
                model: '',
                name: '',
                phone: '',
                address: '',
                saleDate: '',
                deliveryDate: '',
                remarks: '',
                status: 1
            },

            // 控制修改客户信息表单的显示和隐藏,
            editCustomerFormDialogVisible : false,
            // 修改客户信息表单对象
            editCustomerForm: {
                id:'',
                shipper: '',
                model: '',
                name: '',
                phone: '',
                address: '',
                saleDate: '',
                deliveryDate: '',
                remarks: '',
                status: 1
            },

            // 表单验证规则
            formRules : {
                shipper : [
                    {required : true, message : '请输入出货人', trigger : 'blur'}
                ],
                model : [
                    {required : true, message : '请输入型号', trigger : 'blur'}
                ],
                name : [
                    {required : true, message : '请输入顾客', trigger : 'blur'}
                ],
                phone : [
                    {required : true, message : '请输入联系方式', trigger : 'blur'}
                ],
                address : [
                    {required : true, message : '请输入收货地址', trigger : 'blur'}
                ],
                saleDate : [
                    {required : true, message : '请输入出单时间', trigger : 'blur'}
                ],
                deliveryDate : [
                    {required : true, message : '请输入送货时间', trigger : 'blur'}
                ],
            },
             // 打印窗口
             outVisible : false,
             // 控制出库窗口的显示和隐藏
             sendStockVisible: false,
        }
    }
}
