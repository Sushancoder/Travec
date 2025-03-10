const url = "travec_api.json";
let api_data = [];

fetch(url, { method: 'GET' })         // fetching the data
    .then(response => response.json())
    .then(data => api_data.push(data))
    .catch(error => console.error('Error fetching data:', error));


// assigning all elements
const search = document.querySelector("#search");
const search_button = document.querySelector(".search_but");
const search_reset = document.querySelector(".search_reset");
const search_results = document.querySelector(".search_res")
let found_result = [];


function get_search_results() {
    search_results.innerHTML = " ";
    search_query = search.value;
    search_query = search_query.toLowerCase().trim();
    let new_res;


    // Conditions to check the search query
    if (search_query) {
        if (api_data[0][search_query]) {
            found_result = api_data[0][search_query]
        }
        else if (search_query == "temple") {
            found_result = api_data[0]["temples"]
            search_query = "temples"

        }
        else if (search_query == "country") {
            found_result = api_data[0]["countries"]
            search_query = "countries"

        }
        else if (search_query == "beach") {
            found_result = api_data[0]["beaches"]
            search_query = "beaches"

        }
        else {
            alert("No results found");
            search.value = "";
        }


    }
    else {
        alert("Enter your query");
    }


    // Search results element creator
    function create_search_elems(element) {
        const div_elem = document.createElement("div");
        div_elem.classList.add("search_elem");
        div_elem.innerHTML = `
        <img class="res_img" src="${element.imageUrl}" alt="">
        <div class="res_title">${element.name}</div>
        <div class="res_desc">${element.description}</div>
        <a href="contact_us.html"><button class="res_but">Visit</button></a>`;
        search_results.appendChild(div_elem)
    }

    // displaying items using loops
    if (found_result.length > 0) {
        for (let index = 0; index < found_result.length; index++) {
            const element = found_result[index];
            console.log(element);
            if (search_query == "temples" || search_query == "beaches") {
                create_search_elems(element)
            }
            else if (search_query == "countries") {
                new_res = found_result[index]["cities"]
                for (let index = 0; index < 2; index++) {
                    final_res = new_res[index]
                    create_search_elems(final_res)
                }
            }
        }
    }

}

// Clear button functionality
function clear_search() {
    search.value = "";
    search_results.innerHTML = "";

}

search_button.addEventListener("click", get_search_results);
search_reset.addEventListener("click", clear_search);