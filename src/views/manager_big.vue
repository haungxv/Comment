<template>
    <div class="manager_big">
        <sign @signBack="signBack" v-if="show_sign"/>
        <manager v-if="!show_sign"/>
    </div>
</template>

<script>
    import Sign from './sign.vue'
    import Manager from './manager.vue'

    export default {
        name: "manager_big",
        components: {Sign, Manager},
        data(){
            return{
                show_sign:false
            }
        },
        methods:{
            signBack(){
                this.show_sign=false;
            }
        }
    }
</script>

<style scoped>
.manager_big{
    height:100%;
    box-sizing: border-box;
}
</style>