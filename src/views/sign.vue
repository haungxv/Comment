<template>
    <div class="sign">
        <div class="title">
            <a href="javascript:;" class="title_1">评审系统</a>
            <a href="javascript:;" class="title_2">comment system</a>
        </div>
        <div class="content">
            <img class="content_left" src="/src/images/9.png">
            <form class="content_right">
                <span class="sign_word">账号登陆</span>
                <div class="sign_input_1">
                    <i class="sign_i_1"></i>
                    <input type="text" id="user" v-model="user">
                </div>
                <div class="sign_input_2">
                    <i class="sign_i_2"></i>
                    <input type="text" id="password" v-model="password">
                </div>
                <div class="remember" @click="remember">
                    <div class="remember_box">
                        <img class="sign_remember_img" v-show="show_rememberImg" src="/src/images/remember.png"/>
                    </div>
                    <div class="remember_word">记住密码</div>
                </div>
                <div class="sign_button" @click="sign">登陆</div>
                <span class="sign_register">还没有账号？<a href="">点击注册</a></span>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "sign",
        data() {
            return {
                user: '',
                password: '',
                show_rememberImg: false,
            }
        },
        methods: {
            sign() {
                if (this.user === '' || this.password === '') {
                    alert("请填写用户名和密码")
                } else {
                    let qs = require('qs');
                    let instance = axios.create({
                        headers: {'content-type': 'application/x-www-form-urlencoded'}
                    });
                    let data = qs.stringify({
                        username: this.user,
                        password: this.password
                    });
                    instance.post("http://39.108.147.179:802/api/v1/user/login/", data)
                        .then((res) => {
                            if (res.data.status === 200) {
                                console.log("登陆成功！");
                                this.$emit('signBack');
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            },
            remember(){
                if (this.show_rememberImg) {
                    this.show_rememberImg = false;
                } else {
                    this.show_rememberImg = true;
                }
            }
        }
    }
</script>

<style scoped>
    .sign {
        box-sizing: border-box;
        border: 1px solid white;
        height: 100%;
        font: 400 14px/1.5 'Hiragino Sans GB', 'WenQuanYi Micro Hei', tahoma, sans-serif;
    }

    .sign .title {
        width: 980px;
        margin: 40px auto 30px;
    }

    .title:after {
        display: block;
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        content: ''
    }

    .title_1, .title_2 {
        width: 120px;
        height: 34px;
        display: block;
        text-decoration: none;
        color: rgb(67, 205, 207);
        font-weight: 400;
        font-stretch: normal;
        font-size: 27px;
        font-family: "Hiragino Sans GB", "WenQuanYi Micro Hei", tahoma, sans-serif;
    }

    .title_2 {
        height: 20px;
        font-size: 15px;
        box-sizing: border-box;
        padding-left: 2px;
    }

    .sign .content {
        width: 980px;
        margin: 0 auto;
    }

    .content_left:after {
        display: block;
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        content: ''
    }

    .content_left {
        width: 480px;
        float: left;
        margin-right: 115px;
    }

    .content_right {
        width: 270px;
        height: 341px;
        float: left;
        margin-top: 30px;
    }

    .sign input {
        width: 50%;
    }

    .sign_word {
        font-weight: 400;
        margin-top: 40px;
        margin-bottom: 20px;
        display: block;
        font-size: 16px;
        color: #666;
    }

    .sign_input_1, .sign_input_2 {
        padding: 9px 0;
        position: relative;
        margin-top: 7px;
    }

    .sign_i_1, .sign_i_2 {
        width: 18px;
        height: 18px;
        background-size: 100% 100%;
        position: absolute;;
        display: inline-block;
        top: 16px;
        left: 9px;
        line-height: 18px;
        vertical-align: text-top;
    }

    .sign_i_1 {
        background-image: url("/src/images/user.png");
    }

    .sign_i_2 {
        background-image: url("/src/images/password.png");
    }

    .sign input {
        box-sizing: border-box;
        width: 270px;
        padding-left: 34px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #aaa;
        vertical-align: top;
        font-size: 14px;
        font-family: inherit;
        background-color: white;
        cursor: text;
    }

    .sign input:focus {
        outline-color: rgb(67, 200, 207);
        border: 2px rgb(67, 200, 207);
    }

    .sign .remember {
        cursor: pointer;
        margin-left: 10px;
        width: 100px;
        margin-top: 10px;
    }

    .sign .remember_box {
        width: 15px;
        height: 15px;
        border: 1px solid rgb(225, 225, 225);
        position: relative;
        float: left;
        margin-top: 2.5px;
    }

    .sign_remember_img {
        position: absolute;
        width: 20px;
        left: -1px;
        top: -1px;
    }

    .sign .remember_word {
        margin-left: 22px;
        color: #666;
        height: 20px;
    }

    .sign .sign_button {
        width: 270px;
        height:32px;
        line-height:32px;
        color:white;
        background-color: rgb(67,205,207);
        border-radius: 2px;
        text-align: center;
        margin-top:30px;
        cursor:pointer;
        letter-spacing: 2em;
        text-indent:2em;
        font-size: 16px;
    }
    .sign_register {
        display: inline-block;
        margin-top: 6px;
        color: #666;
    }

    .sign_register a {
        width: 120px;
        height: 34px;
        color: rgb(67, 205, 207);
        text-decoration: none;
        font-weight: 400;
        font-stretch: normal;
    }

    .sign_register a:hover {
        text-decoration-line: underline;
    }

</style>