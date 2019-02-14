<template>
    <div class="sign">
        <form>
            <label for="user">用户名：</label>
            <input type="text" id="user" v-model="user"><br/>
            <label for="password">密码：</label>
            <input type="text" id="password" v-model="password">
            <div class="remember">
                <div class="remember_box"></div>
                <div class="remember_word">记住密码</div>
            </div>
            <div class="sign_button" @click="sign">登陆</div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "sign",
        data() {
            return {
                user: '',
                password: ''
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
                        .then((res)=> {
                            if(res.data.status===200){
                                console.log("登陆成功！");
                                this.$emit('signBack');
                            }
                        })
                        .catch( (err)=> {
                            console.log(err)
                        })
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
    }

    .sign form {
        margin: 0 auto;
        border: 1px solid black;
        width: 400px;
        margin-top: 100px;
    }

    .sign label {
        width: 20%;
        display: inline-block;
        /*border: 1px solid black;*/
        text-align: right;
        margin-left: 14%;
    }

    .sign input {
        width: 50%;
    }

    .sign .remember {
        /*border:1px solid red;*/
        margin-left: 20%;
        width: 40%;
        margin-top: 50px;
    }

    .sign .remember_box {
        width: 15px;
        height: 15px;
        border: 1px solid black;
        float: left;
        margin-top: 2.5px;
    }

    .sign .remember_word {
        /*border:1px solid black;*/
        height: 20px;
    }

    .sign .sign_button {
        margin: 0 auto;
        width: 15%;
        border: 1px solid black;
        text-align: center;
        margin-top: 50px;
        cursor: pointer;
    }

</style>