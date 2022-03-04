// TODO: select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML
const sun = document.querySelector('#sun') as HTMLSelectElement
sun.addEventListener('change', () => postAndUpdate());
// Here, when the value of sun is changed, we will call the method postAndUpdate.

// TODO: Do the same for moon and rising
const moon = document.querySelector('#moon') as HTMLSelectElement
moon.addEventListener('change', () => postAndUpdate());
const rising = document.querySelector('#rising') as HTMLSelectElement
rising.addEventListener('change', () => postAndUpdate());

// TODO: Define a type for the request data object here.
type MatchesRequestData = {sun: string, moon: string, rising: string}

// TODO: Define a type for the response data object here.
type Matches = {matches: string[]}

function postAndUpdate(): void {
  // TODO: empty the suggestionList (you want new suggestions each time someone types something new)
  //  HINT: use .innerHTML
  const suggestionList = document.querySelector('#suggestions') as HTMLUListElement
  suggestionList.innerHTML = ""

  // TODO: add a type annotation to make this of type MatchesRequestData
  const postParameters = {
    "sun" : sun.value,
    "moon" : moon.value,
    "rising" : rising.value
    //  HINT: use sun.value to get the value of the sun field, for example
  } as MatchesRequestData;

  console.log(postParameters)

  // TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
  //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
  //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
  //  Remember to add a type annotation for the response data using the Matches type you defined above!
  fetch("http://localhost:4567/results", {
    // Request method
    method: 'post',
        // Data in JSON format to send in the request
        body: JSON.stringify(postParameters),
        // HTTP headers to tell the receiving server what format the data is in
        headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => response.json())
      .then((data : Matches) => {console.log(data)
      updateSuggestions(data.matches)});
  // TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
  //  Parse the JSON in the response object
  //  HINT: remember to get the specific field in the JSON you want to use
}

function updateSuggestions(matches: string[]): void {
  // TODO: for each element in the set of matches, append it to the suggestionList
  //  HINT: use innerHTML += to append to the suggestions list
  //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  //  This makes each element selectable via screen reader.
  const suggestionList = document.querySelector('#suggestions') as HTMLUListElement
  console.log(matches)
  for (let i = 0; i < 5; i++) {
    suggestionList.innerHTML += `<li tabindex="0"> ${matches[i]} </li>`;
  }
}

// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().
document.addEventListener("keyup", async (Event: KeyboardEvent) => {
  if (Event.key == "l") {
    await updateValues("Pisces", "Sagittarius", "Aries")
    postAndUpdate()
  }
})


async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void>{
  // This line asynchronously waits 1 second before updating the values.
  // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
  await new Promise(resolve => setTimeout(resolve, 1000));

  sun.value = sunval;
  moon.value = moonval;
  rising.value = risingval;
}
