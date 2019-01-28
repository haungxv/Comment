<template>
    <div>
        <h1>评委列表</h1>
        <h5>{{mes}}</h5>
        <table>
            <tr>
                <td>账号</td>
                <td>邮箱</td>
                <td>操作</td>
            </tr>
            <tr v-for="item in users">
                <td>{{item.user}}</td>
                <td>{{item.email}}</td>
                <td @click="sub(item.user)" class="comment_user_sub">删除</td>
            </tr>
        </table>
        <p @click="add" class="user_add">添加评委</p>
        <form v-show="user_show">
            <label for="user">用户名：</label>
            <input v-model="user_add_user" id="user" type="text"><br/>
            <label for="email">邮箱：</label>
            <input v-model="user_add_email" id="email" type="text">
            <div class="user_add_add" @click="add_add">确认添加</div>
        </form>
        <p class="user_back" @click="user_back">返回</p>
    </div>
</template>

<script>
    export default {
        name: "comment_user",
        props: ['mes'],
        data() {
            return {
                users: [
                    {
                        user: '评委1',
                        email: '123@qq.com',
                    },
                    {
                        user: '评委2',
                        email: '456@qq.com',
                    },
                    {
                        user: '评委3',
                        email: '789@qq.com',
                    }
                ],
                user_show:false,
                user_add_user:'',
                user_add_email:'',
        }
        },
        methods: {
            sub(name) {
                this.users = this.users.filter(t => t.user != name)
            },
            add(){
                this.user_show=!this.user_show
            },
            add_add(){
                this.users.push({
                    user: this.user_add_user,
                    email: this.user_add_email
                });
                this.user_add_user='';
                this.user_add_email='';
            },
            user_back(){
                this.$emit('back')
            }
        }
    }
</script>

<style scoped>
    td {
        border: 1px solid black;
    }

    .comment_user_sub {
        cursor: pointer;
    }
    .user_add,.user_add_add{
        cursor:pointer;
    }
    form{
        /*border:1px solid black;*/
        width:270px;
    }
    form label{
        display: inline-block;
        width:25%;
        /*border:1px solid black;*/
        text-align:right;
    }
    form input{
        width:68%;
    }
    .user_back{
        cursor:pointer;
        border:1px solid black;
        width:50px;
        text-align: center;
    }
</style>