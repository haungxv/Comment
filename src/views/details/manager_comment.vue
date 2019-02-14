<template>
    <div id="manager_comment">
        <div v-if="show_task">
            <table>
                <tr>
                    <td>评审名称</td>
                    <td>截止时间</td>
                    <td>状态</td>
                    <td>评审详情</td>
                    <td>评委列表</td>
                    <td colspan="2">操作</td>
                </tr>
                <tr v-for="task in tasks">
                    <td>{{task.name}}</td>
                    <td>{{task.expired}}</td>
                    <td>{{task.status}}</td>
                    <td @click="check_detail(task.name,task.desc,task.id)" class="manager_comment_check_detail">查看详情
                    </td>
                    <td @click="check_user(task.name)" class="manager_comment_check_user">查看详情</td>
                    <td @click="sub(list.id)" class="manager_comm_sub">删除</td>
                    <td @click="change(list.id,list.user)" class="manager_comm_Change">修改</td>
                </tr>
            </table>
            <div class="manager_comm_add" @click="add">添加任务</div>
            <comment-add @back="back" v-if="show_add"></comment-add>
            <div class="manager_comm_change" @click="change_up">修改任务</div>
            <form v-show="show_change">
                <label for="ch_nick">昵称：</label>
                <input v-model="ch_nick" id="ch_nick" type="text"><br/>
                <label for="ch_user">用户名：</label>
                <input v-model="ch_user" id="ch_user" type="text"><br/>
                <label for="ch_password">密码：</label>
                <input v-model="ch_password" id="ch_password" type="text"><br/>
                <label for="ch_email">邮箱：</label>
                <input v-model="ch_email" id="ch_email" type="text">
                <div class="manager_comm_change_change" @click="change_change">确认修改</div>
            </form>
        </div>
        <div id="manager_comment_check">
            <comment-user :mes="comment_user_mes" @back="back" v-if="show_user"></comment-user>
            <comment-detail :name="comment_detail_name"
                            :desc="comment_detail_desc"
                            :id="comment_detail_id"
                            @back="back" v-if="show_detail">
            </comment-detail>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import commentUser from './manager_comment/comment_user.vue'
    import commentDetail from './manager_comment/comment_detail.vue'
    import commentAdd from './manager_comment/comment_add.vue'


    export default {
        name: "manager_comment",
        components: {commentUser, commentDetail, commentAdd},
        data() {
            return {
                ch_password: '',
                ch_email: "",
                ch_nick: '',
                ch_user: '',
                ch_id: '',
                show_add: false,
                show_change: false,
                tasks: [
                    // {
                    //     name: '创青春',
                    //     time: '2018-1-1',
                    //     status: '进行中',
                    //     operate: '结束/删除'
                    // },
                    // {
                    //     name: '互联网+',
                    //     time: 'xxx',
                    //     status: '已结束',
                    //     operate: '删除'
                    // }
                ],
                show_task: true,
                show_user: false,
                show_detail: false,
                comment_user_mes: '',
                comment_detail_name: '',
                comment_detail_desc: '',
                comment_detail_id: ''
            }
        },
        methods: {
            check_detail(name, desc, id) {
                this.show_task = false;
                this.show_detail = true;
                this.comment_detail_name = name;
                this.comment_detail_desc = desc;
                this.comment_detail_id = id;
            },
            check_user(name) {
                this.show_task = false;
                this.show_user = true;
                this.comment_user_mes = name;
            },
            back() {
                this.show_task = true;
                this.show_user = false;
                this.show_detail = false;
                this.show_add = false;
            },
            getUser() {
                var vm = this;
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://39.108.147.179:802/api/v1/work/all/")
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.tasks = res.data.data;
                            // let a = res.data.data.length;
                            // for (let i = 0; i < a; i++) {
                            //     this.userList.$set( i, res.data.data[i])
                            // }
                            console.log(this.tasks);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
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
            change(id, name) {
                this.show_change = true;
                this.ch_user = name;
                this.ch_id = id;
            },
            change_up() {
                this.show_change = false;
            },
            change_change() {
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
                instance.post("http://39.108.147.179:802/api/v1/user/modify/" + this.ch_id, data)
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

        },
        mounted() {
            this.getUser();
        }
    }
</script>

<style scoped>
    td {
        border: 1px solid black;
    }

    .manager_comment_check_detail, .manager_comment_check_user {
        cursor: pointer;
    }

    .manager_comm_sub, .manager_comm_Change {
        cursor: pointer;
    }

    .manager_comm_add, .manager_comm_change {
        /*border: 1px solid black;*/
        cursor: pointer;
        margin-top: 20px;
        /*text-align:center;*/
    }

    form {
        width: 500px;
        border: 1px solid black;
        /*margin:0 auto;*/
        /*margin-top:30px;*/
    }

    form label {
        width: 35%;
        display: inline-block;
        /*border:1px solid black;*/
        text-align: right;
    }

    form input {
        width: 60%;
    }

    .manager_comm_add_add, .manager_comm_change_change {
        cursor: pointer;
        margin-top: 10px;
        /*text-align:center;*/
    }
</style>