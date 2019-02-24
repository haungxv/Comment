<template>
    <div class="manager_user_add">
        <form>
            <span class="manager_add_word">添加用户</span>
            <label for="nick">昵称：</label>
            <input v-model="add_nick" id="nick" type="text">
            <label for="user">用户：</label>
            <input v-model="add_user" id="user" type="text">
            <label for="password">密码：</label>
            <input v-model="add_password" id="password" type="text">
            <label for="email">邮箱：</label>
            <input v-model="add_email" id="email" type="text">
            <div class="manager_user_add_add" @click="userAdd">确认添加</div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "add",
        data() {
            return {
                add_user: '',
                add_password: '',
                add_email: "",
                add_nick: '',
            }
        },
        methods: {
            userAdd() {
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "username": this.add_user,
                    "password": this.add_password,
                    "email": this.add_email,
                    "nickname": this.add_nick
                });
                instance.post("http://39.108.147.179:802/api/v1/user/add/", data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$emit("addSucc");
                        }
                        this.add_user = '';
                        this.add_nick = '';
                        this.add_password = '';
                        this.add_email = '';
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
        },
    }
</script>

<style scoped>
    .manager_user_add {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 400px;
        height: 370px;
        z-index: 304;
        background-color: #f4f7f6;
    }

    .manager_user_add form {
        width: 400px;
        height: 370px;
    }

    .manager_add_word {
        width: 250px;
        box-sizing: border-box;
        font-weight: 500;
        font-size: 1.1em;
        margin: 20px auto;
        margin-top: 30px;
        text-align: center;
        display: block;
        color: rgb(67, 210, 207);
    }

    .manager_user_add form label {
        display: inline-block;
        margin-top: 7px;
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 32px;
    }

    .manager_user_add form input {
        box-sizing: border-box;
        width: 250px;
        border: 1px solid #aaa;
        height: 32px;
        line-height: 32px;
        vertical-align: top;
        font-size: 14px;
        font-family: inherit;
        background-color: white;
        cursor: text;
        margin-top: 7px;
        padding-left: 6px;
    }

    .manager_user_add form input:focus {
        outline-color: rgb(67, 200, 207);
        border: 2px rgb(67, 200, 207);
    }

    .manager_user_add_add {
        width: 200px;
        height: 32px;
        line-height: 32px;
        color: white;
        background-color: rgb(67, 205, 207);
        border-radius: 5px;
        text-align: center;
        margin: 40px auto 0;
        cursor: pointer;
        letter-spacing: .3em;
        text-indent: .3em;
        font-size: 16px;
    }
</style>