import { AccessAreaMigrations, TransportInstance, ContractorDetails, Grabber, SpeedChecker } from '@/views/tools';
import ContractorEdit from '@/components/Module/Contractor/ContractorEdit.vue';

export default {
    path: '/tools',
    children: [
        { path: 'accessarea-migrations', name: 'accessarea-migrations', component: AccessAreaMigrations },
        { path: 'transport-instance', name: 'transport-instance', component: TransportInstance },
        { path: 'contractor-details', name: 'contractor-details', component: ContractorDetails },
        { path: 'contractor-details/:id', name: 'contractor-by-name', component: ContractorEdit },
        { path: 'grabber', name: 'grabber', component: Grabber },
        { path: 'speed-checker', name: 'speed-checker', component: SpeedChecker }
    ]
};
