<template>
    <div>
        <table>
            <tr>
                <td>用户名</td>
                <td>密码</td>
                <td>邮箱</td>
                <td>操作</td>
            </tr>
            <tr v-for="list in lists">
                <td>{{list.user}}</td>
                <td>{{list.password}}</td>
                <td>{{list.email}}</td>
                <td @click="sub(list.user)" class="manager_user_sub">删除</td>
            </tr>
        </table>
        <div class="manager_user_add" @click="add">添加用户</div>
        <form v-show="show">
            <label for="user">用户名：</label>
            <input v-model="add_user" id="user" type="text"><br/>
            <label for="password">密码：</label>
            <input v-model="add_password" id="password" type="text"><br/>
            <label for="email">邮箱：</label>
            <input v-model="add_email" id="email" type="text">
            <div class="manager_user_add_add" @click="add_add">确认添加</div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "manager_user",
        data() {
            return {
                lists: [
                    {
                        user: "评委1",
                        password: '123456',
                        email: '123456@qq.com'
                    },
                    {
                        user: "评委2",
                        password: '1234567',
                        email: '1234567@qq.com'
                    }
                ],
                add_user:'',
                add_password:'',
                add_email:"",
                show:false,
            }
        },
        methods: {
            sub(name) {
                this.lists = this.lists.filter(t => t.user != name)
            },
            add(){
                this.show=!this.show
            },
            add_add(){
                this.lists.push({
                    user: this.add_user,
                    password: this.add_password,
                    email: this.add_email
                });
                this.add_user='';
                this.add_password='';
                this.add_email='';
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

    .manager_user_sub {
        cursor: pointer;
    }

    .manager_user_add {
        /*border: 1px solid black;*/
        cursor: pointer;
        margin-top:20px;
        /*text-align:center;*/
    }
    form{
        width:270px;
        /*border:1px solid black;*/
        /*margin:0 auto;*/
        /*margin-top:30px;*/
    }
    form label{
        width:25%;
        display: inline-block;
        /*border:1px solid black;*/
        text-align:right;
    }
    form input{
        width:68%;
    }
    .manager_user_add_add{
        cursor: pointer;
        margin-top:10px;
        /*text-align:center;*/
    }
</style>