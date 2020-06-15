export default {
    init: () => {
        return {
            // 库存数据
            list: [],
            // 新增品类表单对象
            addForm: {
                name: ''
            },
            // 控制 新建分类 对话框的 显示与隐藏
            showCateDialogVisible: false,
            // 控制 新建品牌 对话框的 显示与隐藏
			showBrandDialogVisible: false,
			// 控制新增品类弹出框的显示和隐藏
            visible: false,
            // 表单验证规则
            addCategoryFormRules  : {
                name: [{
                    required: true,
                    message: '品类不能为空',
                    trigger: 'blur'
                }],
            },
            addBrandFormRules  : {
                name: [{
                    required: true,
                    message: '品牌不能为空',
                    trigger: 'blur'
                }],
			},
			// 控制新增品牌输入框的显示和隐藏
			inputVisible: false,
			// 新增品牌输入框的绑定值
			inputValue: '',
			// 新增品牌标签的索引
			currentIndex : -1,
			// 控制loading效果
            loading : false
        }
    }
}
