<template>
    <div class="manager">
        <div class="manager_header">
            <div class="manager_header_title">管理员页面</div>
        </div>
        <div class="manager_left">
            <div class="manager_left_user" @click="user_show">用户管理</div>
            <div class="manager_left_comment" @click="comment_show">评审管理</div>
            <div class="manager_left_set" @click="set_show">系统设置</div>
        </div>
        <div class="manager_right">
            <managerUser v-if="show_1"></managerUser>
            <managerComment v-if="show_2"></managerComment>
            <managerSet v-if="show_3"></managerSet>
        </div>
    </div>
</template>
<script>
    import managerUser from './details/manager_user.vue'
    import managerComment from './details/manager_comment.vue'
    import managerSet from './details/manager_set.vue'


    export default {
        components: { managerUser, managerComment,managerSet},
        data() {
            return {
                show_1: true,
                show_2: false,
                show_3: false
            }
        },
        methods: {
            user_show() {
                this.show_1 = true;
                this.show_2 = false;
                this.show_3 = false;
            },
            comment_show() {
                this.show_1 = false;
                this.show_2 = true;
                this.show_3 = false;
            },
            set_show() {
                this.show_1 = false;
                this.show_2 = false;
                this.show_3 = true;
            }
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
        height: 15%;
        border: 1px solid black;
        position: relative;
    }

    .manager_header_title {
        /*border: 1px solid black;*/
        height: 20px;
        text-align: center;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

    }

    .manager_left {
        box-sizing: border-box;
        float: left;
        border: 1px solid black;
        height: 85%;
        width: 20%;
    }

    .manager_left_user, .manager_left_comment, .manager_left_set {
        /*border:1px solid black;*/
        margin-top: 20px;
        text-align: center;
        cursor: pointer;
    }

    .manager_right {
        box-sizing: border-box;

        border: 1px solid black;
        margin-left: 20%;
        width: 80%;
        height: 85%;
    }
</style>