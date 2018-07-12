import { isValid, formData } from "./validation";
import { Search } from "./search";
import { loaded } from './other';

const search = new Search();

// search by click event
formData.searchBtn.addEventListener('click', () => {
    if (isValid()) {
        search.onSearch()
    }
});

// search by key event
formData.searchBox.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        search.onSearch()
    }
});

// loaded function
loaded();




