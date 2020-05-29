import util from '../../common/js/util'
import {
    getCate,
    addCategory,
    addBrandById,
    deleteCateById,
    deleteBrandById
} from '../../api/cateGoryApi'

export default {
    getList() {
        getCate().then(res => {
            this.list = res.data
            if (res.data !== null) {
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res.data[i].Category.length; j++) {
                        let obj = {
                            category: res.data[i].Name,
                            brand: res.data[i].Category[j].Name
                        }
                        window.sessionStorage.setItem('key_' + res.data[i].Category[j].Id, JSON.stringify(obj));
                    }
                }
                // 提供给 分类选择器的数据源
                window.sessionStorage.setItem('pickValue', JSON.stringify(this.list))
            }
        })
    },
    //增加品类
    addcate() {
        if (this.list !== null) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].Name == this.addForm.name) {
                    this.$notify.error({
                        title: '错误',
                        message: '该分类已存在',
                        position: 'bottom-right'
                    });
                    return true
                }
            }
        }

        let para = {
            name: this.addForm.name
        };
        addCategory(para).then(res => {
            this.$notify.success({
                title: '成功',
                message: '品类添加成功',
                position: 'bottom-right'
            });
            window.sessionStorage.clear();
            this.getList()
        }).catch(err => {
            this.$notify.error({
                title: '错误',
                message: '品类添加失败',
                position: 'bottom-right'
            });
        });

        this.visible = false
    },

    //获取品牌Id
    addBrandId(id) {
        this.bId = id
        this.showBrandDialogVisible = true
    },
    //增加品牌
    addBrand() {
        let para = {
            pid: this.bId,
            name: this.addBrandsForm.name
        }
        addBrandById(para).then(() => {
            this.$notify.success({
                title: '成功',
                message: '品牌添加成功',
                position: 'bottom-right'
            });
            window.sessionStorage.clear();
            this.getList()
        }).catch(err => {
            this.$notify.error({
                title: '错误',
                message: '品牌添加失败',
                position: 'bottom-right'
            });
        })
        this.showBrandDialogVisible = false
    },



    // 删除分类
    deleteBrand(id) {
        this.$confirm('确认删除该品类?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            deleteCateById(id).then(res => {
                console.log(res)
                window.sessionStorage.clear();
                this.getList()
                this.$notify.success({
                    title: '成功',
                    message: '分类已删除',
                    position: 'bottom-right'
                });
            })
        })
    },

    // 删除品牌
    removeBrand(id) {
        deleteBrandById(id).then(
            res => {
                window.sessionStorage.clear();
                this.getList(),
                    this.$notify.success({
                        title: '成功',
                        message: '品牌已删除',
                        position: 'bottom-right'
                    });
            }
        )
    },

    //-----------------------------------------表单重置-----------------------------------------
    // 监听表单关闭
    formClose(formName) {
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
    },
}
