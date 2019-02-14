<template>
    <div class="manager_comm_Add">
        <form>
            <label for="name">任务名：</label>
            <input v-model="add_name" id="name" type="text"><br/>
            <label for="time">任务过期时间：</label>
            <input v-model="add_time" id="time" type="text"><br/>
            <label for="desc">任务描述：</label>
            <input v-model="add_desc" id="desc" type="text"><br/>
            <div>
                <div>下面请设置的需要打分问题：</div>
                <div v-for="(value,key) in question" :key="key">{{value.id}}、{{key}}</div>
            </div>
            <div class="manager_comment_add_choice" @click="add_choice">添加选择题</div>
            <form v-if="show_add_choice">
                <div>问题顺序</div>
                <input v-model.number="ques_order" type="text"><br/>
                <div>问题名称</div>
                <input v-model="ques_name" type="text"><br/>
                <div>问题类型</div>
                <input v-model="ques_type" type="text"><br/>
                <div>是否支持多选</div>
                <label for="quesyes">多选</label>
                <input type="radio" id="quesyes" :value=true v-model="ques_mutil">
                <label for="quesfalse">单选</label>
                <input type="radio" id="quesfalse" :value=false v-model="ques_mutil">
                <div>多选的选项？</div>
                <input v-model="ques_mutilcho" type="text"><br/>
                <div @click="confim_choice">确认添加选项</div>
                <div class="manager_comm_ques_comfi" @click="ques_add_choice">确认添加题目</div>
            </form>
            <div class="manager_comment_add_math" @click="add_math">添加数值打分题</div>
            <form v-if="show_add_math">
                <div>问题顺序</div>
                <input v-model.number="ques_order" type="text"><br/>
                <div>问题名称</div>
                <input v-model="ques_name" type="text"><br/>
                <div>问题类型</div>
                <input v-model="ques_type" type="text"><br/>
                <div>评分最小值</div>
                <input v-model.number="ques_min" type="text"><br/>
                <div>评分最大值</div>
                <input v-model.number="ques_max" type="text"><br/>
                <div>递增的数值</div>
                <input v-model.number="ques_step" type="text"><br/>
                <div class="manager_comm_ques_comfi" @click="ques_add_math">确认添加题目</div>
            </form>
            <div class="manager_comment_add_comment" @click="add_comment">添加评价题目</div>
            <form v-if="show_add_char">
                <div>问题顺序</div>
                <input v-model.number="ques_order" type="text"><br/>
                <div>问题名称</div>
                <input v-model="ques_name" type="text"><br/>
                <div>问题类型</div>
                <input v-model="ques_type" type="text"><br/>
                <div>评价最小长度</div>
                <input v-model.number="ques_min" type="text"><br/>
                <div>评价最大长度</div>
                <input v-model.number="ques_max" type="text"><br/>
                <div class="manager_comm_ques_comfi" @click="ques_add_comment">确认添加题目</div>
            </form>

            <div class="manager_comm_add_add" @click="add_add">确认添加任务</div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "comment_add",
        data(){
            return{
                show_add_math: false,
                show_add_choice: false,
                show_add_char: false,
                question: {},
                ques_choice: [],
                ques_name: '',
                ques_order: 0,
                ques_type: '',
                ques_min: 1,
                ques_max: 1,
                ques_step: 1,
                ques_mutil: false,
                ques_mutilcho: '',
                add_name: '',
                add_time: '',
                add_desc: '',
            }
        },
        methods:{
            add_add() {
                let qs = require('qs');
                let instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                let data = qs.stringify({
                    "name": this.add_name,
                    "expired": this.add_time,
                    "desc": this.add_desc,
                    "question": JSON.stringify(this.question)
                });
                instance.post("http://39.108.147.179:802/api/v1/work/add/", data)
                    .then((res) => {
                        if (res.data.status === 200) {
                            console.log("添加任务成功！");
                            // this.$options.methods.refresh();
                            // this.$router.go(0);
                            // this.$emit('get_user');
                            // this.$forceUpdate();
                        }
                        this.add_name = '';
                        this.add_time = '';
                        this.add_desc = '';
                        this.question = {};
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            ques_add_math() {
                this.$set(this.question, this.ques_name, {
                    "id": this.ques_order,
                    "field_type": this.ques_type,
                    "min": this.ques_min,
                    "max": this.ques_max,
                    "step": this.ques_step
                });
                this.ques_name = '';
                this.ques_order++;
                this.ques_type = '';
                this.ques_min = 0;
                this.ques_max = 100;
                this.ques_step = 1;
            },
            ques_add_choice() {
                this.$set(this.question, this.ques_name, {
                    "id": this.ques_order,
                    "field_type": this.ques_type,
                    "multi_choice": this.ques_mutil,
                    "choices": this.ques_choice,
                });
                this.ques_name = '';
                this.ques_order++;
                this.ques_type = '';
                this.ques_mutil = false;
                this.ques_mutilcho = '';
            },
            ques_add_comment() {
                this.$set(this.question, this.ques_name, {
                    "id": this.ques_order,
                    "field_type": this.ques_type,
                    "max_len": this.ques_max,
                    "min_len": this.ques_min,
                });
                this.ques_name = '';
                this.ques_order++;
                this.ques_type = '';
                this.ques_min = 0;
                this.ques_max = 100;
            },
            add_math() {
                this.show_add_math = !this.show_add_math;
            },
            add_choice() {
                this.show_add_choice = !this.show_add_choice;
            },
            add_comment(){
                this.show_add_char = !this.show_add_char;
            },
            confim_choice() {
                let a=this.ques_mutilcho.split(" ");
                this.ques_choice=a;
            }
        }
    }
</script>

<style scoped>
    td {
        border: 1px solid black;
    }
    form {
        width: 500px;
        border: 1px solid black;
        /*margin:0 auto;*/
        /*margin-top:30px;*/
    }

    form label {
        width: 35%;
        display: inline-block;
        /*border:1px solid black;*/
        text-align: right;
    }

    form input {
        width: 60%;
    }

    .manager_comm_add_add, .manager_comm_change_change {
        cursor: pointer;
        margin-top: 10px;
        /*text-align:center;*/
    }
</style>