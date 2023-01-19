
<template>
    <b-form-group id="example-input-group-1" :label="label" label-for="example-input-1">
        <b-form-input
            :name="name"
            :id="name"
            :type="type"
            :value="inputValue"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            @input="handleChange"
            @blur="handleBlur"
            :class="{ 'is-invalid': !!errorMessage, 'is-valid': meta.valid }"
            :aria-describedby="`errorHandler-${name}`"
        ></b-form-input>
        <b-form-invalid-feedback
            :id="`errorHandler-${name}`" v-show="errorMessage || meta.valid"
        >{{ errorMessage }}
        </b-form-invalid-feedback>
    </b-form-group>
</template>
<script>
import { BFormInvalidFeedback, BFormInput, BFormGroup } from "bootstrap-vue-3";
import { useField } from 'vee-validate';
import { watch, ref } from 'vue';

export default {
    name: 'TextInput',

    props: {
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
        autocomplete: {
            type: String,
            default: "off"
        },
        modelValue: [String, Number],
        rules: String
    },

    components:{
        BFormInvalidFeedback,
        BFormInput,
        BFormGroup
    },

    setup(props) {
        var name = props.name.replace(/ /g, '');

        var validationRef = ref(props.rules);

        watch(
            () => props.rules,
            (newValue, oldValue) => {
                validationRef.value = newValue;
            },
        );

        watch(
            () => props.value,
            (newValue, oldValue) => {
                console.log("value props changed: ", newValue);
                inputValue.value = newValue;
            }
        );

        const {
            value: inputValue,
            errorMessage,
            handleBlur,
            handleChange,
            meta } = useField(name, validationRef, {
            initialValue: props.modelValue,
            label: props.name,
        });

        return {
            handleChange,
            handleBlur,
            errorMessage,
            inputValue,
            meta
        };
    },

    watch: {
        modelValue(val) {
            if (val) this.value = val;
        },
    },

    emits: ['update:modelValue'],

    computed: {
        isRequired() {
            return this.rules?.required;
        },
    }
};
</script>

<style></style>
