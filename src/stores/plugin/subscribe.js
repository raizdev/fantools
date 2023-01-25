export const authSubscribe = ({ store }) => {
    store.$onAction(({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, //
    }) => {
        console.log(name, store, args, after)
    });
}
