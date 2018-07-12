export function loaded() {
    window.addEventListener('load', () => {
        document.getElementById('wrapper').classList.add('loaded');
    });
}

// querySelector - jQuery style
export const $ = selector => {
    return document.querySelector(selector);
};
