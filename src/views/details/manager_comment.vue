<template>
    <div id="manager_comment">
        <table v-if="show_task">
            <tr>
                <td>评审名称</td>
                <td>截止时间</td>
                <td>评审详情</td>
                <td>评委列表</td>
                <td>状态</td>
                <td>操作</td>
            </tr>
            <tr v-for="task in tasks">
                <td>{{task.name}}</td>
                <td>{{task.time}}</td>
                <td @click="check_detail(task.name)" class="manager_comment_check_detail">查看详情</td>
                <td @click="check_user(task.name)" class="manager_comment_check_user">查看详情</td>
                <td>{{task.status}}</td>
                <td>{{task.operate}}</td>
            </tr>
        </table>
        <div id="manager_comment_check">
            <commentUser :mes="comment_user_mes" @back="back" v-if="show_user"></commentUser>
            <commentDetail :mes="comment_detail_mes" @back="back" v-if="show_detail"></commentDetail>
        </div>
    </div>
</template>

<script>
    import commentUser from './manager_comment/comment_user.vue'
    import commentDetail from './manager_comment/comment_detail.vue'

    export default {
        name: "manager_comment",
        components: {commentUser, commentDetail},
        data() {
            return {
                tasks: [
                    {
                        name: '创青春',
                        time: '2018-1-1',
                        status: '进行中',
                        operate: '结束/删除'
                    },
                    {
                        name: '互联网+',
                        time: 'xxx',
                        status: '已结束',
                        operate: '删除'
                    }
                ],
                show_task: true,
                show_user: false,
                show_detail: false,
                comment_user_mes: '',
                comment_detail_mes: ''
            }
        },
        methods: {
            check_detail(name) {
                this.show_task=false;
                this.show_detail = true;
                this.comment_detail_mes = name;
            },
            check_user(name) {
                this.show_task=false;
                this.show_user = true;
                this.comment_user_mes = name;
            },
            back(){
                this.show_task=true;
                this.show_user=false;
                this.show_detail=false;
            }
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
</style>