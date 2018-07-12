import { $ } from './other'

export const formData = {
    searchBox: $('#search-box'),
    searchBtn: $('#search-btn')
};

export const isValid = () => {
    let valid;

    if (formData.searchBox.checkValidity()) {
        valid = true;
        formData.searchBox.classList.remove('has-error');
    } else {
        valid = false;
        formData.searchBox.classList.add('has-error');
    }

    return valid;
};