export default {
    init: () => {
        return {
            // 库存数据
            list: [],
            // 新增品类表单对象
            addForm: {
                name: ''
            },
            addBrandsForm: {
                name: ''
            },
            bId: '',
            // 控制 新建分类 对话框的 显示与隐藏
            showCateDialogVisible: false,
            // 控制 新建品牌 对话框的 显示与隐藏
            showBrandDialogVisible: false,
            bs: false,
            visible: false,

        }
    }
}
