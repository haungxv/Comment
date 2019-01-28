<template>
    <div>
        <h1>评审详情</h1>
        <h5>{{mes}}</h5>
        <table>
            <th>字段（创建后不可更改）</th>
            <tr>
                <td>字段名</td>
                <td>类型</td>
                <td>范围</td>
            </tr>
            <tr v-for="item in fields">
                <td>{{item.name}}</td>
                <td>{{item.type}}</td>
                <td>{{item.vary}}</td>
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
    export default {
        name: "comment_detail",
        props: ['mes'],
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