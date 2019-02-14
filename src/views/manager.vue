<template>
    <div class="manager">
        <div class="manager_header">
            <div class="manager_header_user"></div>
            <div class="manager_header_search">搜索功能</div>
            <div class="manager_header_back">退出</div>
        </div>
        <div class="manager_left">
            <div class="manager_left_user">
                <img src="../images/6.png"/>
                <div class="manager_left_word manager_left_add_color" @click="user_show($event)">用户管理</div>
            </div>
            <div class="manager_left_comment">
                <img src="../images/3.png"/>
                <div class="manager_left_word" @click="comment_show($event)">评审管理</div>
            </div>
            <div class="manager_left_set">
                <img src="../images/2.png"/>
                <div class="manager_left_word" @click="set_show($event)">系统设置</div>
            </div>
        </div>
        <div class="manager_right">
            <managerUser v-if="show_1"
                         @sub="change_sub"
                         @get_user="request"
                         :userList="userList"
                         :delecount="delecount"
                         :delenumber="deletenumber">
            </managerUser>
            <managerComment v-if="show_2"></managerComment>
            <managerSet v-if="show_3"></managerSet>
        </div>
    </div>
</template>
<script>
    import managerUser from './details/manager_user.vue'
    import managerComment from './details/manager_comment.vue'
    import managerSet from './details/manager_set.vue'
    import axios from 'axios';


    export default {
        components: {managerUser, managerComment, managerSet,},
        data() {
            return {
                show_1: true,
                show_2: false,
                show_3: false,
                userList: [
                    // {
                    //     nickname: '123',
                    //     user: 'sacd',
                    //     password: "safd",
                    //     email: "sadf"
                    // },
                    // {
                    //     nickname: '123',
                    //     user: 'sa',
                    //     password: "safd",
                    //     email: "sadf"
                    // }
                ],
                delecount: 0,
                deletenumber: 0,
            }
        },
        methods: {
            changeStyle(dom) {
                let a = document.getElementsByClassName("manager_left_word");
                for (let i = 0; i < 3; i++) {
                    a[i].setAttribute("class", "manager_left_word")
                }
                dom.srcElement.setAttribute("class", "manager_left_word manager_left_add_color")
            },
            user_show(dom) {
                this.$options.methods.changeStyle(dom);
                this.show_1 = true;
                this.show_2 = false;
                this.show_3 = false;
            },
            comment_show(dom) {
                this.$options.methods.changeStyle(dom);
                this.show_1 = false;
                this.show_2 = true;
                this.show_3 = false;

            },
            set_show(dom) {
                this.$options.methods.changeStyle(dom);
                this.show_1 = false;
                this.show_2 = false;
                this.show_3 = true;
            },
            getUser() {

                this.deletenumber = this.delecount;
                var vm=this;
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                instance.get("http://39.108.147.179:802//api/v1/user/all/")
                    .then((res)=>{
                        if (res.data.status === 200) {
                            this.userList = res.data.data;
                            // let a = res.data.data.length;
                            // for (let i = 0; i < a; i++) {
                            //     this.userList.$set( i, res.data.data[i])
                            // }
                            console.log(this.userList);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            request() {
                this.$options.methods.getUser();
            },
            change_sub(id) {
                this.delecount++;
                this.userList = this.userList.filter(t => t.id != id)
            },
        },
        mounted() {
            this.getUser();
        }
    }
</script>
<style scoped>
    .manager {
        box-sizing: border-box;
        height: 100%;
    }

    .manager_header {
        box-sizing: border-box;
        width: 100%;
        height: 6%;
        border: 1px solid white;
        position: relative;
    }

    .manager_header div {
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        height: 20px;
        margin-top: -10px;
    }

    .manager_header_user {
        position: absolute;
        right: 25%;
    }

    .manager_header_search {
        width: 12%;
        right: 9%;
        border: 1px solid black;
    }

    .manager_header_back {
        width: 8%;
        right: 0;
        cursor: pointer;
    }

    .manager_left {
        box-sizing: border-box;
        float: left;
        border: 1px solid rgb(250, 250, 250);
        height: 94%;
        width: 18%;
    }

    .manager_left_user, .manager_left_comment, .manager_left_set {
        margin-top: 50px;
        cursor: pointer;
        height: 35px;
        width: 86%;
        margin-left: 16%;
    }

    .manager_left img {
        color: #f0ffff;
        float: left;
        width: 27px;
        height: 25px;
        margin-left: 7%;
        margin-top: 5px;
    }

    .manager_left_word {
        box-sizing: border-box;
        font-size: 1.12em;
        margin-left: 22%;
        width: 45%;
        height: 33px;
        line-height: 33px;
        text-align: center;
    }

    .manager_left_add_color {
        color: rgb(16, 55, 212);
        background-color: rgb(228, 251, 255);
    }

    .manager_right {
        box-sizing: border-box;
        /*border: 1px solid black;*/
        background-color: rgb(250, 250, 250);
        margin-left: 18%;
        width: 82%;
        height: 94%;
    }


</style>