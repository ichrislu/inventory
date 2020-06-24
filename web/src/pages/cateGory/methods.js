import {
    getAllCategoryApi,
    addCategoryApi,
    addBrandByIdApi,
    deleteCategoryByIdApi,
    deleteBrandByIdApi
} from '../../api/categoryApi'

export default {
	// 获取所有品类,品牌信息
    getAllCategoryList() {
        this.loading = true
        getAllCategoryApi().then(res => {
            this.list = res.data
            if (res.data !== null) {
				// 将品类 , 品牌信息存入缓存
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
            this.loading = false
        })
	},
	// 增加分类弹出框 自动获取焦点
    showFocus(){
        // setTimeout(() => {
        //     this.$refs.inputRef.focus();
		//  }, 100);
		this.$nextTick(() => {
			this.$refs.inputRef.focus()
		  })
    },

    //增加品类
    addCategory() {
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

        addCategoryApi(para).then(res => {
            this.$notify.success({
                title: '成功',
                message: '品类添加成功',
                position: 'bottom-right'
            });
            window.sessionStorage.clear();
            this.getAllCategoryList()
        }).catch(err => {
            this.$notify.error({
                title: '错误',
                message: '品类添加失败',
                position: 'bottom-right'
            });
        });
        this.visible = false
    },

    // 删除分类
    deleteCategoryById(id) {
        deleteCategoryByIdApi(id).then(res => {
            window.sessionStorage.clear();
            this.getAllCategoryList()
            this.$notify.success({
                title: '成功',
                message: '分类已删除',
                position: 'bottom-right'
            });
        })
        // })
    },

    // 删除品牌
	deleteBrandById(id) {
        deleteBrandByIdApi(id).then(
            res => {
                window.sessionStorage.clear();
                this.getAllCategoryList(),
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
    // ---------------------------------新增品牌tag-----------------------------------------

    //显示 新增品牌输入框 并获取焦点
    showInput(tagsIndex) {
        this.inputVisible = true;
        this.currentIndex = tagsIndex
        this.$nextTick(_ => {
            this.$refs[`saveTagInput${tagsIndex}`].focus();
        });
    },

    // 根据选中类别ID 添加该类别下品牌
    addBrandById(Id) {
        let inputValue = this.inputValue;
        if (inputValue) {

            let para = {
                pid: Id,
                name: this.inputValue
            }
            addBrandByIdApi(para).then(() => {
                this.$notify.success({
                    title: '成功',
                    message: '品牌添加成功',
                    position: 'bottom-right'

                });
                window.sessionStorage.clear();
                this.getAllCategoryList()
            }).catch(err => {
                this.$notify.error({
                    title: '错误',
                    message: '品牌添加失败',
                    position: 'bottom-right'
                });
            })

        }
        this.inputVisible = false;
        this.currentIndex = -1
        this.inputValue = '';
    },
}
