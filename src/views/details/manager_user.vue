<template>
    <div class="user">
        <div class="over" v-if="showUserMask" @click="down_every"></div>
        <div class="title">
            <div class="title_left" @click="show_add_change(1)">点此添加用户</div>
            <div class="title_right">可以对用户进行<span>修改</span>和<span>删除</span>操作</div>
        </div>
        <div class="info"
             v-for="list in userLists"
             :key="list.id">
            <div class="info_nick">昵称：{{list.nickname}}</div>
            <div class="info_name">用户名：{{list.username}}</div>
            <div class="info_email">邮箱：{{list.email}}</div>
            <div @click="show_change(list.id,list.nickname,list.username,list.email)" class="info_change">修改</div>
            <div @click="sub(list.id)" class="info_sub">删除</div>
        </div>
        <user-add @addSucc="succ" v-if="showAdd"></user-add>
        <user-change :id="oldId"
                     :nick="oldNick"
                     :name="oldName"
                     :email="oldEmail"
                     @changeSucc="succ"
                     v-if="showChange">
        </user-change>
    </div>
</template>

<script>

    import userAdd from './manager_user/add.vue'
    import userChange from './manager_user/change.vue'

    import axios from 'axios';
    import {
        mapState,
        mapMutations,
    } from 'vuex'

    export default {
        name: "manager_user",
        components: {userAdd, userChange},
        data() {
            return {
                showAdd: false,
                showChange: false,
                showUserMask: false,
                oldId: '',
                oldNick: '',
                oldName: '',
                oldEmail: ''
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
                            alert("删除成功！");
                            this['user/deleteUser'](id);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            show_add_change(a) {
                this.showUserMask = true;
                if (a === 1) {
                    this.showAdd = true;
                } else if (a === 2) {
                    this.showChange = true;
                }
            },
            down_every() {
                this.showAdd = false;
                this.showChange = false;
                this.showUserMask = false;
            },
            show_change(id, nick, name, email) {
                this.show_add_change(2);
                this.oldId = id;
                this.oldNick = nick;
                this.oldName = name;
                this.oldEmail = email;
            },
            succ() {
                this.get_user();
                this.down_every();
            },
            get_user() {
                var vm = this;
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://39.108.147.179:802/api/v1/user/all/")
                    .then((res) => {
                        if (res.data.status === 200) {
                            this['user/setAllUsers'](res.data.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            ...mapMutations(['user/setAllUsers','user/deleteUser']),
        },
        computed: {
            ...mapState({
                userLists: state => state.user.userLists,
            })
        },
        mounted() {
            this.get_user();
        }
    }
</script>

<style scoped>
    .user {
        background-color: #f4f7f6;
        padding: 0 70px 20px;
        border: 1px solid #f4f7f6;
    }

    .user .over {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #000;
        opacity: 0.7;
        -moz-opacity: 0.7;
        z-index: 303;
    }

    .user .title {
        width: 1100px;
        margin: 30px auto 20px;
    }

    .user .title:after {
        display: block;
        content: '';
        clear: both;
        overflow: hidden;
        visibility: hidden;
        height: 0;
    }

    .title .title_left {
        float: left;
        margin-left: 10px;
        cursor: pointer;
        font-size: 1.1em;
        color: rgb(67, 210, 207)
    }

    .title .title_right {
        letter-spacing: 0.1em;
        margin-right: 10px;
        float: right;
    }

    .user .title span {
        font-weight: 600;
        font-size: 1.1em;
    }

    .info {
        margin: 1px auto;
        width: 1100px;
        border: 1px solid #f4f7f6;
        height: 80px;
        background-color: white;
    }

    .info:after {
        display: block;
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        content: ''
    }

    .info_nick {
        width: 210px;
        height: 50px;
        line-height: 50px;
        margin-top: 15px;
        margin-left: 30px;
        float: left;
    }

    .info_name {
        width: 260px;
        height: 50px;
        line-height: 50px;
        margin-top: 15px;
        float: left;
    }

    .info_email {
        width: 310px;
        height: 50px;
        line-height: 50px;
        margin-top: 15px;
        float: left;
    }

    .info_change {
        border: 1px solid white;
        color: rgb(67, 220, 207);
        width: 75px;
        letter-spacing: 0.1em;
        text-indent: 0.1em;
        margin-top: 25px;
        margin-left: 20px;
        text-align: center;
        float: left;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        transition: 0.2s;
        cursor:pointer;
    }

    .info_change:hover {
        border: 1px solid rgb(67, 220, 207);
    }

    .info_sub {
        border: 1px solid white;
        color: #df6c4f;
        width: 75px;
        letter-spacing: 0.1em;
        text-indent: 0.1em;
        margin-top: 25px;
        margin-left: 45px;
        text-align: center;
        float: left;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        transition: 0.2s;
        cursor:pointer;
    }

    .info_sub:hover {
        border: 1px solid #df6c4f;
    }
</style>