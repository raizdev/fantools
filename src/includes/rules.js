export const emailContainsDomain = (value) => {
    if (value.endsWith('@kpn.com')) {
        return true;
    }

    return false;
}