import { Signin, Signup } from '@/views/account';

export default {
    path: '/account',
    children: [
        { path: 'login', name: 'sign-in', component: Signin },
        { path: 'register', name: 'sign-up', component: Signup }
    ]
};
