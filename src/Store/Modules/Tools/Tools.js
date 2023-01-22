import api from "../../../Common/Helpers/Api";

export default {

    namespaced: true,

    actions: {
        async accessareaMigration ({}, values ) {
            return await api.post('tools/accessarea-migration', { dslam: values.dslam })
                .then((response) => {
                    return response
                });
        },

        async transportInstances ({}, values ) {
            return await api.post('tools/transport-instance', { wso: values.wso, accessarea: values.accessarea })
                .then((response) => {
                    return response
                });
        },

        async getContractors ({}, values ) {
            return await api.get('tools/contractor/list/' + values)
                .then((response) => {
                    return response
                });
        },

        async getContractorById ({}, value ) {
            return await api.get('tools/contractor/' + value)
                .then((response) => {
                    return response
                });
        },

        async findEmployee ({}, value ) {
            return await api.get('tools/contractor/' + value.contractor + '/employee/list/' + value.searchItem)
                .then((response) => {
                    return response
                });
        },

        async findServiceLevelmangers ({}) {
            return await api.get('tools/contractor/slm/list')
                .then((response) => {
                    return response
                });
        },

        async modifyContractor ({}, values ) {

            values.contractorPersons.push(values.serviceLevelManager)

            return await api.post('tools/contractor/edit', values)
                .then((response) => {
                    return response
                });
        }
    }
}
