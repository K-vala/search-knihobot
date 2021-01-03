/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * get search term
     */
    function getSearchTerm(choice) {
      switch (choice) {
        case "Vyhledat knihu":
          return "book";
        case "Vyhledat autora":
          return "author";
      }
    }

    /**
     * send a "search" message to the content script in the active tab.
     */
    function search(tabs) {
        let searchTerm = getSearchTerm(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          searchTerm: searchTerm
        });
    }
    
    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not search: ${error}`);
    }

    /**
     * Get the active tab and call search
     */
      browser.tabs.query({active: true, currentWindow: true})
        .then(search)
        .catch(reportError);
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute search content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/search.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

