<template>
    <div>
        <table>
            <tr>
                <td>昵称</td>
                <td>用户名</td>
                <td>密码</td>
                <td>邮箱</td>
                <td colspan="2">操作</td>
            </tr>
            <tr v-for="list in userList" :key="list.id">
                <td>{{list.nickname}}</td>
                <td>{{list.username}}</td>
                <td>{{list.password}}</td>
                <td>{{list.email}}</td>
                <td @click="sub(list.id)" class="manager_user_sub">删除</td>
                <td @click="change(list.id,list.user)" class="manager_user_Change">修改</td>
            </tr>
        </table>
        <div class="manager_user_add" @click="add">添加用户</div>
        <form v-show="show_add">
            <label for="nick">昵称：</label>
            <input v-model="add_nick" id="nick" type="text"><br/>
            <label for="user">用户名：</label>
            <input v-model="add_user" id="user" type="text"><br/>
            <label for="password">密码：</label>
            <input v-model="add_password" id="password" type="text"><br/>
            <label for="email">邮箱：</label>
            <input v-model="add_email" id="email" type="text">
            <div class="manager_user_add_add" @click="add_add">确认添加</div>
        </form>
        <div class="manager_user_change" @click="change_up">修改用户（用户名不可修改）</div>
        <form v-show="show_change">
            <label for="ch_nick">昵称：</label>
            <input v-model="ch_nick" id="ch_nick" type="text"><br/>
            <label for="ch_user">用户名：</label>
            <input v-model="ch_user" id="ch_user" type="text"><br/>
            <label for="ch_password">密码：</label>
            <input v-model="ch_password" id="ch_password" type="text"><br/>
            <label for="ch_email">邮箱：</label>
            <input v-model="ch_email" id="ch_email" type="text">
            <div class="manager_user_change_change" @click="change_change">确认修改</div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "manager_user",
        props: ['userList', 'delecount', 'delenumber', 'addcount', 'addnumber'],
        data() {
            return {
                add_user: '',
                add_password: '',
                add_email: "",
                add_nick: '',
                ch_password: '',
                ch_email: "",
                ch_nick: '',
                ch_user:'',
                ch_id:'',
                show_add: false,
                show_change: false,
            }
        },
        methods: {
            sub(id) {
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    id: id
                });
                instance.get("http://39.108.147.179:802/api/v1/user/delete/" + id)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("删除成功！");
                            this.$emit("sub", id);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            add() {
                this.show_add = !this.show_add;
            },
            change(id,name) {
                this.show_change = true;
                this.ch_user=name;
                this.ch_id=id;
            },
            change_up() {
                this.show_change = false;
            },
            add_add() {
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
                            console.log("添加成功！");
                            // this.$options.methods.refresh();
                            this.$router.go(0);
                            // this.$emit('get_user');
                            // this.$forceUpdate();
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
            change_change(){
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "username": this.ch_user,
                    "password": this.ch_password,
                    "email": this.ch_email,
                    "nickname": this.ch_nick
                });
                instance.post("http://39.108.147.179:802/api/v1/user/modify/"+this.ch_id,data)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("修改成功！");
                            // this.$options.methods.refresh();
                            // this.$router.go(0);
                            // this.$emit('get_user');
                            // this.$forceUpdate();
                        }
                        this.ch_user = '';
                        this.ch_nick = '';
                        this.ch_password = '';
                        this.ch_email = '';
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            refresh() {
                // console.log("2312");
                this.$router.go(0);
            }
        },
        mounted() {
            if (this.delenumber != this.delecount) {
                this.$emit('get_user');
            }
        }
    }
</script>

<style scoped>
    table {
        /*margin: 0 auto;*/
        /*margin-top: 50px;*/
    }

    td {
        border: 1px solid black;
        text-align: center;
    }

    .manager_user_sub,.manager_user_Change {
        cursor: pointer;
    }

    .manager_user_add,.manager_user_change {
        /*border: 1px solid black;*/
        cursor: pointer;
        margin-top: 20px;
        /*text-align:center;*/
    }

    form {
        width: 270px;
        /*border:1px solid black;*/
        /*margin:0 auto;*/
        /*margin-top:30px;*/
    }

    form label {
        width: 25%;
        display: inline-block;
        /*border:1px solid black;*/
        text-align: right;
    }

    form input {
        width: 68%;
    }

    .manager_user_add_add,.manager_user_change_change{
        cursor: pointer;
        margin-top: 10px;
        /*text-align:center;*/
    }
</style>