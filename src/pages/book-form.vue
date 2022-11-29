<template>
<div id="form">
    <!-- :はv-bindの省略記法 -->
    <BookInfo :book="book"></BookInfo>
    <hr />
    <!-- <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="読了日">
            <el-date-picker type="date" v-model="form.read"></el-date-picker>
        </el-form-item>
        <el-form-item label="感想" prop="memo">
            <el-input type="textarea" size="large" v-model="form.memo"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onsubmit">登録</el-button>
        </el-form-item>
    </el-form> -->

    <form>
        <div>
            <label>読了日: </label>
            <input type="date" v-model="form.read">
        </div>
        <div>
            <label>感想: </label>
            <textarea type="date" v-model="form.memo"></textarea>
        </div>
        <div>
            <button type="button" @click="onsubmit">登録</button>
        </div>
    </form>
</div>
</template>

<script>
import { h } from 'vue'
import { UPDATE_CURRENT, UPDATE_BOOK } from '@/store/mutation-types'

export default {
    name: 'BookForm',
    data() {
        return {
            book: {},
            form: {
                read: new Date(),
                memo: ''
            },
            rules: {
                memo: [
                    { required: true, message: 'メモが未入力です。', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        if (!this.$store.getters['current']) {
            this.$router.push('/')
        }
        this.book = Object.assign({}, this.$store.getters['current'])
        console.log(this.book.title)
    },
    mounted() {
        const book = this.$store.getters['getBookById'](this.book.id)

        if (book) {
            this.form.read = book.read
            this.form.memo = book.memo
        }
    },
    methods: {
        onsubmit() {
            /**
             * @todo
             * バリデーション
             */
            // this.$refs['form'].validate(valid => {
            //     if (valid) {
                    
            //     }
            // })

            this.$store.dispatch(UPDATE_BOOK, Object.assign({}, this.book, this.form))

            this.$store.dispatch(UPDATE_CURRENT, null);

            /**
             * @todo
             * トーストの表示
             */
            // this.$notify({
            //     title: 'Read Recode',
            //     message: h('p', {style: 'color: #009'},
            //         '読書情報の登録/更新に成功しました。'), duration: 2000
            // })

            this.form.read = new Date()
            this.form.memo = ''
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
#form {
    margin-top: 15px;
}
</style>