export default {
    init: () => {

        //TODO  自定义规则

        return {
            // 品类品牌缓存对象
            session : [],
            // 搜索栏 表单对象
            searchForm: {
                keyword: '',
                // 时间选择器绑定对象
                time: [{
                    begin: 0,
                    end: 0,
                }]
            },
            // 新增库存 分类选择器绑定属性
            addValue: [],
            // 修改库存 分类选择器绑定属性
            editValue: [],
            // 搜索条件集合
            keyword: '',
            // 分类选择器绑定数组
            options: [],
            // 库存列表数据
            stockList: [],
            // 控制 新增库存的显示与隐藏
            showAddFormDialogVisible: false,
            date: '',
            // 新增库存表单
            addForm: {
                Provider: '',
                Date:new Date(),
                Bid: 0,
                Model: '',
                Price: '',
                Inventory: 0,
            },
            // 新增库存表单对象预验证规则
            addFormRules: {
                name: [{
                    required: true,
                    message: '请输入供应商',
                    trigger: 'blur'
                }],
                cate: [{
                    required: true,
                    message: '请输入品类',
                    trigger: 'blur'
                }],
                brand: [{
                    required: true,
                    message: '请输入品牌',
                    trigger: 'blur'
                }],
                mod: [{
                    required: true,
                    message: '请输入型号',
                    trigger: 'blur'
                }],
                price: [{
                    required: true,
                    message: '请输入进货价格',
                    trigger: 'blur'
                }],
                num: [{
                    required: true,
                    message: '请输入数量',
                    trigger: 'blur'
                }]
            },
            // 控制 修改库存对话框
            showEditFormDialogVisible: false,
            // 修改库存表单对象
            editForm: {
                Provider: '',
                Date: '',
                Bid: '',
                Model: '',
                Price: '',
                Quantity: '',
                Inventory: '',
                Brand: '',
                Category: '',
            },

            // 备注对话框 表单对象
            remarkForm: {
                // 备注内容
                Remarks: '',
                Id: ''
            },
            // 控制备注框显示与隐藏
            showRemarkDialogVisible: false,
            // 控制出库表单的显示与隐藏
            outStockFormDialogVisible: false,
            // 出库表单对象
            outStockForm: {
                provider: '',
                cate: '',
                brand: '',
                cate : '',
                model: '',
                price: '',

                sid :'',
                date : 1589803035185,
                quantity: 2,
                shipper : '老王',
                sell: 7000
            },
            // 出库表单对象 分类属性
            outStockValue : [],
            filters: {},
        }
    }
}
