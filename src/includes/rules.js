export const emailContainsDomain = (value) => {
    if (value !== undefined && value.endsWith('@kpn.com')) {
        return true;
    }

    return false;
}

export const confirmed = (value, [target]) => {
    if (value === target) {
      return true;
    }
    return 'Passwords must match';
}

export const regex = (value, [target]) => {
    if(value.match(target)) {
        return true;
    }
    return 'Required: upper, lowercase characters and atleast 1 specialchar (#?!@$%^&*-)';
}