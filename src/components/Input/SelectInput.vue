<template>
    <b-form-select
        :name="name"
        :id="id"
        :options="name"
        :placeholder="placeholder"
        :value="inputValue"
        @blur="handleBlur"
    ></b-form-select>
</template>
<script>
import { BFormSelect } from "bootstrap-vue-3";
import { toRef, watch } from "vue";
import { useField } from "vee-validate";

export default {
    name: "SelectInput",

    components: {
        BFormSelect
    },

    props: {
        id: {
            type: String,
            default: null,
        },
        class: {
            type: String,
            default: "form-control TextInput",
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        wrapper: {
            type: String,
            default: "form-group",
        },
        as: {
            type: String,
            default: undefined,
        },
        rules: {
            type: [Object, String, Function],
            default: undefined,
        },
        items: {
            type: Array,
            default: () => [],
        },
        modelValue: {
            type: null,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const name = toRef(props, "name");
        const label = toRef(props, "as");

        const {
            value: inputValue,
            handleChange,
            handleBlur,
            errorMessage,
            meta,
        } = useField(name, undefined, {
            initialValue: props.modelValue,
            label,
        });

        // you need to emit `update:modelValue`
        watch(inputValue, (newVal) => {
            if (newVal === props.modelValue) {
                return;
            }

            // sync the model value with vee-validate model
            emit("update:modelValue", newVal);
        });

        // and you need to listen for `modelValue` prop changes
        watch(
            () => props.modelValue,
            (newModel) => {
                if (newModel === inputValue.value) {
                    return;
                }

                // Sync the vee-validate model with model value
                inputValue.value = newModel;
            }
        );

        return {
            inputValue,
            handleChange,
            handleBlur,
            errorMessage,
            meta
        };
    },
};
</script>
