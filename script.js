

"use strict";

// put your own value below!
const apiKey = '3NwXdZKjnZLoycAgxeaQsA6gX80531cABZRyOq1Y';
const searchURL = "https://developer.nps.gov/api/v1/parks";

let loopArr = () => {

  const arrItem = [{ name: 'Alex', status: 'kick ass' }, { name: 'John', status: 'Bottom one screw' }]

  for (let i = 0; i < arrItem.length; i++) {

    console.log(arrItem[i].name)

  }


}




function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3><br>
      <h4>${responseJson.data[i].states}</h4>
      <h4>City: ${responseJson.data[i].addresses[i].city}</h4>
      <h4>Postalcode: ${responseJson.data[i].addresses[i].postalCode}</h4>
      <p>${responseJson.data[i].description}</p><br>
      <a href="${responseJson.data[i].url}">Click Here to Visit Website</p>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function getNationalParks(query, limit = 10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    let searchTerm = $("#js-search-term").val();
    let limit = $("#js-max-results").val();
    getNationalParks(searchTerm, limit);
  });
}

$(watchForm);

$(loopArr)
