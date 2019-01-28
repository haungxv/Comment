import User from '../views/user.vue';
import Manager from '../views/manager.vue';

export default[
    {
        path:'/',
        redirect:'/user'
    },
    {
        path:'/user',
        component:User
    },
    {
        path:'/manager',
        component:Manager
    },
]