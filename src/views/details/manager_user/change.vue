<template>
    <div class="manager_user_change">
        <form>
            <span class="manager_change_word">修改用户信息</span>
            <label for="ch_nick">昵称：</label>
            <input v-model="ch_nick" id="ch_nick" type="text">
            <label for="ch_user">用户：</label>
            <input v-model="ch_name" id="ch_user" type="text" readonly="readonly">
            <label for="ch_password">密码：</label>
            <input v-model="ch_password" id="ch_password" type="text">
            <label for="ch_email">邮箱：</label>
            <input v-model="ch_email" id="ch_email" type="text">
            <div class="manager_user_change_change" @click="change_change">确认修改</div>
        </form>
    </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "change",
        props:['id','nick','name','email'],
        data(){
            return{
                ch_password: '',
                ch_email: "",
                ch_nick: '',
                ch_name: '',
            }
        },
        methods:{
            change_change() {
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "username": this.ch_name,
                    "password": this.ch_password,
                    "email": this.ch_email,
                    "nickname": this.ch_nick
                });
                instance.post("http://39.108.147.179:802/api/v1/user/modify/" + this.id, data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$emit("changeSucc")
                        }
                        this.ch_name = '';
                        this.ch_nick = '';
                        this.ch_password = '';
                        this.ch_email = '';
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
        },
        mounted(){
            this.ch_nick=this.nick;
            this.ch_name=this.name;
            this.ch_email=this.email;
            alert("用户名不可修改，不填密码框视为不修改密码")
        }
    }
</script>

<style scoped>
    .manager_user_change {
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

    .manager_user_change form {
        width: 400px;
        height: 370px;
    }

    .manager_change_word {
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

    .manager_user_change form label {
        display: inline-block;
        margin-top: 7px;
        width: 100px;
        text-align: right;
        height: 32px;
        line-height: 32px;
    }

    .manager_user_change form input {
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

    .manager_user_change form input:focus {
        outline-color: rgb(67, 200, 207);
        border: 2px rgb(67, 200, 207);
    }

    .manager_user_change_change {
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