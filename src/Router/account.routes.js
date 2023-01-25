import { Signin, Signup } from '@/views/account';

export default {
    path: '/account',
    children: [
        { path: 'login', component: Signin },
        { path: 'register', component: Signup }
    ]
};
