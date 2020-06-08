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
            bs: false,
            visible: false,
            // 表单验证规则
            addCateFormRules  : {
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
            inputVisible: false,
            inputValue: '',
            currentIndex : -1,
            loading : true
        }
    }
}
