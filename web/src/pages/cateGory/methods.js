export default {
    getList() {
        // debugger
        this.$axios.get('http://localhost/category').then(res => {
            this.list = res.data
        })
    },
    //增加品类
    addcate() {
        this.$axios.post('http://localhost/category', {
            name: this.addForm.name
        }).then(() => {
            this.getList()
            // let _this = this;
            // setTimeout(() => {
            //     _this.getList()
            // }, 100)
            this.$message({
                type : 'success',
                message : '添加分类成功'
            })
        }).catch( () => {
            this.$message({
                type : 'info',
                message : '添加分类失败'
            })
        });

        this.$refs.addCateRef.resetFields()
        this.visible = false
    },
    addFormClose() {
        this.$refs.addCateRef.resetFields()
        this.visible = false
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
        }).then( () => {
            this.getList()
        });
        this.showBrandDialogVisible = false
        this.$refs.addBrandsFormRef.resetFields()
    },
    addBrandsFormClose() {
        this.$refs.addBrandsFormRef.resetFields()
    },
    // 删除分类
    deleteBrand(id) {
        this.$confirm('此操作将永久删除该文件品牌, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$axios.delete('http://localhost/category/' + id).then(res => {
                this.getList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(req => {
                console.log(req);
                this.$message({
                    type: 'info',
                    message: '要删除品类，必须先删除所属的所有品牌'
                });
            });
        })
    },

    // 删除品牌
    removeBrand(id) {
        this.$axios.delete('http://localhost/category/' + id).then(
            () => {
                this.getList(),
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
            }
        ).catch(
            () => {
                this.$message({
                    type: 'info',
                    message: '有入库记录的品牌不能删除'
                })
            }
        )
    }

}
