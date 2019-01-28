<template>
    <div>
        <div v-if="task_show">我的评审任务</div>
        <table v-if="task_show">
            <tr>
                <td>评审名称</td>
                <td>截止时间</td>
                <td>详情</td>
                <td>状态</td>
            </tr>
            <tr v-for="list in tasks">
                <td>{{list.name}}</td>
                <td>{{list.time}}</td>
                <td class="user_task_detail" @click="check_task(list.name)">查看详情</td>
                <td>{{list.status}}</td>
            </tr>
        </table>
        <div>
            <taskDetail @back="back" :mes="taskMes" v-if="taskDetail_show"></taskDetail>
        </div>
    </div>
</template>
<script>
    import taskDetail from './user/task_detail.vue'

    export default {
        components: {taskDetail},
        data() {
            return {
                tasks: [
                    {
                        name: '创青春',
                        time: '111',
                        status: '已结束'
                    },
                    {
                        name: '互联网+',
                        time: '222',
                        status: '进行中'
                    }
                ],
                task_show: true,
                taskDetail_show: false,
                taskMes:'',
            }
        },
        methods: {
            check_task(name) {
                this.task_show = false;
                this.taskDetail_show = true;
                this.taskMes=name;
            },
            back(){
                this.task_show = true;
                this.taskDetail_show = false;
            }
        }
    }
</script>
<style>
    td {
        border: 1px solid black;
    }

    .user_task_detail {
        cursor: pointer;
    }
</style>