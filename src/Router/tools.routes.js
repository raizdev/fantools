import { AccessAreaMigrations, TransportInstance, ContractorDetails } from '@/views/tools';

export default {
    path: '/tools',
    children: [
        { path: 'accessarea-migrations', name: 'accessarea-migrations', component: AccessAreaMigrations },
        { path: 'transport-instance', name: 'transport-instance', component: TransportInstance },
        { path: 'contractor-details', name: 'contractor-details', component: ContractorDetails }
    ]
};