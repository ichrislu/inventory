export default {
    getList() {
        // debugger
        this.$axios.get('http://localhost/category').then(res => {
            this.list = res.data

            for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < res.data[i].Category.length; j++) {
                    let obj = {
                        category: res.data[i].Name,
                        brand: res.data[i].Category[j].Name
                    }
                    window.sessionStorage.setItem('key_' + res.data[i].Category[j].Id, JSON.stringify(obj));
                }
            }
        })
    },
    //增加品类
    addcate() {
        for( var i = 0; i< this.list.length; i++) {
           if (this.list[i].Name == this.addForm.name){
            this.$notify.error({
                title: '错误',
                message: '该分类已存在',
                position: 'bottom-right'
            });
            return true
           }
        }

        this.$axios.post('http://localhost/category', {
            name: this.addForm.name
        }).then(res => {
            this.$notify.success({
                title: '成功',
                message: '分类添加成功',
                position: 'bottom-right'
            });
            window.sessionStorage.clear();
            this.getList()
            // let _this = this;
            // setTimeout(() => {
            //     _this.getList()
            // }, 100)

        }).catch(err => {
            this.$notify.error({
                title: '错误',
                message: err,
                position: 'bottom-right'
            });
        });

        this.$refs.addCateRef.resetFields()
        this.visible = false
    },
    // 监听表单关闭
    addFormClose() {
        this.$refs.addCateRef.resetFields()
    },

    //增加品牌Id
    addBrandId(id) {
        this.bId = id
        this.showBrandDialogVisible = true
    },
    //增加品牌
    addBrand() {
        this.$axios.post('http://localhost/category', {
            'pid': this.bId,
            'name': this.addBrandsForm.name
        }).then(() => {
            this.$notify.success({
                title: '成功',
                message: '品牌添加成功',
                position: 'bottom-right'
            });
            window.sessionStorage.clear();
            this.getList()
        }).catch( err => {
            this.$notify.error({
                title: '错误',
                message: err.response,
                position: 'bottom-right'
            });
        })
        this.showBrandDialogVisible = false
        this.$refs.addBrandsFormRef.resetFields()
    },
    addBrandsFormClose() {
        this.$refs.addBrandsFormRef.resetFields()
    },
    // 删除分类
    deleteBrand(id) {
        this.$confirm('确认删除该品类?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$axios.delete('http://localhost/category/' + id).then(res => {
                window.sessionStorage.clear();
                this.getList()
                this.$notify.success({
                    title: '成功',
                    message: res,
                    position: 'bottom-right'
                });
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(err => {
                // console.log(req);
                this.$notify.error({
                    title: '错误',
                    message: err,
                    position: 'bottom-right'
                });
                // this.$message({
                //     type: 'info',
                //     message: '要删除品类，必须先删除所属的所有品牌'
                // });
            });
        })
    },

    // 删除品牌
    removeBrand(id) {
        this.$axios.delete('http://localhost/category/' + id).then(
            res => {
                window.sessionStorage.clear();
                this.getList(),
                this.$notify.success({
                    title: '成功',
                    message: res,
                    position: 'bottom-right'
                });
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功'
                    // })
            }
        ).catch(
            err => {
                this.$notify.error({
                    title: '错误',
                    message: err,
                    position: 'bottom-right'
                });
                // this.$message({
                //     type: 'info',
                //     message: '有入库记录的品牌不能删除'
                // })
            }
        )
    },



}
