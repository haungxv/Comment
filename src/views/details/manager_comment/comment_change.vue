<template>
    <div class="comment_change">
    <form>
        <label for="ch_name">任务名：</label>
        <input v-model="ch_name" id="ch_name" type="text"><br/>
        <label for="ch_time">任务结束时间：</label>
        <input v-model="ch_time" id="ch_time" type="text"><br/>
        <label for="ch_desc">任务描述：</label>
        <input v-model="ch_desc" id="ch_desc" type="text">
        <div class="manager_comm_change_change" @click="change_change">确认修改</div>
    </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "comment_change",
        props:['id','name','time','desc'],
        data(){
            return{
                ch_time: '',
                ch_desc: "",
                ch_name: '',
                ch_id: '',
            }
        },
        methods:{
            change_change() {
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "name": this.ch_name,
                    "expired": this.ch_time,
                    "desc": this.ch_desc,
                });
                instance.post("http://39.108.147.179:802/api/v1/work/modify/", data)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("修改成功！");
                            // this.$options.methods.refresh();
                            // this.$router.go(0);
                            // this.$emit('get_user');
                            // this.$forceUpdate();
                        }
                        this.ch_name = '';
                        this.ch_time = '';
                        this.ch_desc = '';
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
        },
        mounted(){
            this.ch_name=this.name;
            this.ch_time=this.time;
            this.ch_desc=this.desc;
        }
    }
</script>

<style scoped>

</style>