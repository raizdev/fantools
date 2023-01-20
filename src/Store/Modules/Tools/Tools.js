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

        async modifyContractor ({}, value ) {
            console.log(value)
            return await api.post('tools/contractor/edit', value)
                .then((response) => {
                    console.log(response)
                    return response
                });
        }
    }
}
