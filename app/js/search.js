import { formData } from "./validation";
import { $ } from './other'

let tagsArray = [],
    newArr;

export class Search {
    // get results
    getResult(key) {
        const API_KEY = 'SAJTPMLWxFJUvvtF0XWZjLV3X8FfY2DE',
            limit = 12;

        const queryParams = '?q=' + key + '&api_key=' + API_KEY + '&limit=' + limit;

        fetch('http://api.giphy.com/v1/gifs/search' + queryParams, {
            method: 'GET'
        })
            .then(response => {
                return response.json()
            }, error => {
                console.log(error);
            })
            .then(data => {
                const arr = data.data;

                // return images url's
                let image_url = arr.filter(imgUrl => {
                    return imgUrl.images.fixed_width.url;
                });
                this.onDisplayResults(image_url);
            });
    };

    // display images in html
    onDisplayResults(url) {
        const arr = url;
        const results = $('#results');

        if (arr.length === 0) {
            results.innerHTML =
                '<div class="col text-center">' +
                '<p>No results :(</p>' +
                '</div>';
        }


        for (let i = 0; i < arr.length; i++) {
            const col = document.createElement('div');
            col.className = "col-md-3 col-6";
            col.innerHTML = "<img class='img-responsive' src='" + arr[i].images.fixed_width.url + "'/>";
            results.appendChild(col);
        }
    }

    // display tags
    onDisplayTags(array) {
        let arr = array;

        // remove elements from the HTML
        const myNode = $("#tags");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        // create a new elements
        for (let i = 0; i < arr.length; i++) {
            const span = document.createElement('span');
            span.className = "form-inline tag";
            span.innerHTML = '#' + arr[i] + '<img src="./assets/close-icon.svg" class="close-icon" />';
            span.onclick = () => {this.onRemoveTag(i)};
            myNode.appendChild(span);
        }
    }

    // results and clearing search input
    onSearch() {
        const newTags = formData.searchBox.value.split(' ');
        tagsArray = tagsArray.concat(newTags);
        newArr = Array.from(new Set(tagsArray)); // create the new array without duplicated values
        this.onDisplayTags(newArr);
        this.getResult(newArr);
        formData.searchBox.value = ''; // clear the field
    }

    // remove tags and init new results
    onRemoveTag(index) {
        newArr.splice(index, 1);
        const removed = newArr.filter((q)=>{
            return q !== index;
        });
        this.onDisplayTags(removed);

        const results = $('#results');
        while (results.firstChild) {
            results.removeChild(results.firstChild);
        }

        this.getResult(removed.join())
    }
}