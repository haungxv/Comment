<template>
    <div>
        <h1>评审详情</h1>
        <h5>任务名：{{name}}</h5>
        <p>任务简介：{{desc}}</p>
        <table>
            <th>字段（创建后不可更改）</th>
            <tr>
                <td>问题顺序</td>
                <td>问题名称</td>
                <td>问题类型</td>
                <td>评分最小值</td>
                <td>评分最大值</td>
                <td>递增的数值</td>
                <td>是否支持多选</td>
                <td>多选题的选项</td>
            </tr>
            <tr v-for="(item,key) in fields[0].content">
                <td>{{item.id}}</td>
                <td>{{key}}</td>
                <td>{{item.field_type}}</td>
                <td>{{item.min}}</td>
                <td>{{item.max}}</td>
                <td>{{item.step}}</td>
                <td>{{item.multi_choice}}</td>
                <td>{{item.choices}}</td>
            </tr>
        </table>
        <br/>
        <br/>
        <table>
            <tr>
                <td>项目名</td>
                <td>项目作者</td>
                <td>项目简介</td>
                <td>项目文件</td>
                <td>操作</td>
            </tr>
            <tr v-for="item in files">
                <td>{{item.name}}</td>
                <td>{{item.author}}</td>
                <td>{{item.intro}}</td>
                <td>{{item.file}}</td>
                <td @click="sub(item.name)" class="comment_detail_sub">删除</td>
            </tr>
        </table>

        <div @click="add" class="detail_add">添加项目</div>
        <form v-show="detail_show">
            <label for="name">用户名：</label>
            <input v-model="detail_add_name" id="name" type="text"><br/>
            <label for="author">项目作者：</label>
            <input v-model="detail_add_author" id="author" type="text"><br/>
            <label for="intro">项目简介：</label>
            <input v-model="detail_add_intro" id="intro" type="text"><br/>
            <label for="file">项目文件：</label>
            <input v-model="detail_add_file" id="file" type="text">
            <div class="detail_add_add" @click="add_add">确认添加</div>
        </form>

        <h4>评分情况：</h4>
        <p class="detail_back" @click="detail_back">返回</p>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "comment_detail",
        props: ['name','desc','id'],
        data() {
            return {
                fields: [
                    {
                        name: '文档分',
                        type: '小数',
                        vary: '0.0-99.9'
                    },
                    {
                        name: '答辩分',
                        type: '整数',
                        vary: '60-100'
                    },
                    {
                        name: '是否有创意',
                        type: '判断',
                        vary: '是/否'
                    },
                ],
                files: [
                    {
                        name: '乞讨平台',
                        author: 'xx',
                        intro: 'xx',
                        file: 'hhh.pdf'
                    },
                    {
                        name: '老年大学',
                        author: 'xx',
                        intro: 'xx',
                        file: '点击上传'
                    }
                ],
                detail_show: false,
                detail_add_name: '',
                detail_add_author: '',
                detail_add_intro: '',
                detail_add_file: '',
            }
        },
        methods: {
            sub(name) {
                this.files = this.files.filter(t => t.name != name)
            },
            add() {
                this.detail_show = !this.detail_show
            },
            add_add() {
                this.files.push({
                    name: this.detail_add_name,
                    author: this.detail_add_author,
                    intro: this.detail_add_intro,
                    file: this.detail_add_file,
                });
                this.detail_add_name = '';
                this.detail_add_author = '';
                this.detail_add_intro = '';
                this.detail_add_file = '';
            },
            detail_back() {
                this.$emit('back')
            }
        },
        mounted(){
            let qs = require('qs');
            let instance = axios.create({
                headers: {'content-type': 'application/x-www-form-urlencoded'}
            });
            instance.get("http://39.108.147.179:802/api/v1/work/get/"+this.id)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("获取任务详情成功！");
                        console.log(res.data.data.questions);
                        this.fields=res.data.data.questions;
                        console.log(this.fields);
                        console.log(this.fields[0].content);

                        console.log(this.fields[0].content.创意分);
                        // this.$options.methods.refresh();
                        // this.$router.go(0);
                        // this.$emit('get_user');
                        // this.$forceUpdate();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
</script>

<style scoped>
    td {
        border: 1px solid black;
    }

    .comment_detail_sub {
        cursor: pointer;
    }

    .detail_add, .detail_add_add {
        cursor: pointer;
    }

    form {
        /*border:1px solid black;*/
        width: 270px;
    }

    form label {
        display: inline-block;
        width: 30%;
        /*border:1px solid black;*/
        text-align: right;
    }

    form input {
        width: 60%;
    }

    .detail_back {
        cursor: pointer;
        border: 1px solid black;
        width: 50px;
        text-align: center;
    }
</style>