import { Signin, Signup, ChangePassword } from '@/views/account';

export default {
    path: '/account',
    children: [
        { path: 'login', name: 'sign-in', component: Signin },
        { path: 'register', name: 'sign-up', component: Signup },
        { path: 'change-password', name: 'change-password', component: ChangePassword }
    ]
};
