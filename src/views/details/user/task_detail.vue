<template>
    <div>
        <h3>{{mes}}</h3>
        <p>简介：xxx</p>
        <p>作者：xxx</p>
        <form>
            <label for="score1">xxx分数：</label>
            <input id="score1" type="text"><br/>
            <label for="score2">xxx分数：</label>
            <input id="score2" type="text"><br/>
            <label for="score3">xxx分数：</label>
            <input id="score3" type="text"><br/>
        </form>
        <div class="task_detail_back" @click="task_detail_back">返回</div>
    </div>
</template>

<script>
    export default {
        name: "task_detail",
        props: ['mes'],
        data() {
            return {}
        },
        methods:{
            task_detail_back(){
                this.$emit('back')
            }
        }
    }
</script>

<style scoped>
.task_detail_back{
    margin-top:20px;
    border:1px solid black;
    width:50px;
    text-align:center;
    cursor:pointer;
}
</style>