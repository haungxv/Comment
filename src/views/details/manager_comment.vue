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
                    <td @click="sub(task.id)" class="manager_comm_sub">删除</td>
                    <td @click="change(task.id,task.name,task.expired,task.desc)" class="manager_comm_Change">修改</td>
                </tr>
            </table>
            <div class="manager_comm_add" @click="add">添加任务</div>
            <comment-add @back="back" v-if="show_add"></comment-add>
            <div class="manager_comm_change" @click="change_up">修改任务(只可修改任务名，过期时间和任务描述)</div>
            <comment-change @back="back"
                            :id="ch_id"
                            :name="ch_user"
                            :time="ch_time"
                            :desc="ch_desc"
                            v-if="show_change">
            </comment-change>
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
    import commentChange from './manager_comment/comment_change.vue'


    export default {
        name: "manager_comment",
        components: {commentUser, commentDetail, commentAdd, commentChange},
        data() {
            return {
                ch_user:'',
                ch_id:'',
                ch_time:'',
                ch_desc:'',
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
                this.show_change = false;
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
                instance.get("http://39.108.147.179:802/api/v1/work/delete/" + id)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("删除成功！");
                            // this.$emit("sub", id);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            add() {
                this.show_add = !this.show_add;
            },
            change(id, name,time,desc) {
                this.show_change = !this.show_change;
                this.ch_user = name;
                this.ch_id = id;
                this.ch_time=time;
                this.ch_desc=desc;
            },
            change_up() {
                this.show_change = false;
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