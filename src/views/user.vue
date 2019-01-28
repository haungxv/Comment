<template>
    <div class="user">
        <div class="user_header">
            <div class="user_header_title">xxx评审系统</div>
        </div>
        <div class="user_left">
        <div class="user_left_task" @click="task_show">我的任务</div>
        <div class="user_left_change" @click="change_show">密码修改</div>
        </div>
        <div class="user_right">
            <userTask v-if="show_4"></userTask>
            <userChange v-if="!show_4"></userChange>
        </div>
    </div>
</template>
<script>
    import userChange from './details/user_change.vue'
    import userTask from './details/user_task.vue'

    export default {
        components: { userChange,userTask},
        data() {
            return {
                show_4:true,
            }
        },
        methods:{
            task_show(){
                this.show_4=true;
            },
            change_show(){
                this.show_4=false
            }
        }
    }
</script>
<style scoped>
    .user {
        box-sizing: border-box;
        height: 100%;
    }

    .user_header {
        box-sizing: border-box;
        width: 100%;
        height: 15%;
        border: 1px solid black;
        position:relative;
    }

    .user_header_title {
        /*border: 1px solid black;*/
        height:20px;
        text-align: center;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

    }
    .user_left {
        box-sizing: border-box;
        float: left;
        border: 1px solid black;
        height: 85%;
        width: 20%;
    }

    .user_left_task, .user_left_change {
        /*border:1px solid black;*/
        margin-top: 20px;
        text-align: center;
        cursor: pointer;
    }

    .user_right {
        box-sizing: border-box;

        border: 1px solid black;
        margin-left: 20%;
        width: 80%;
        height: 85%;
    }
</style>