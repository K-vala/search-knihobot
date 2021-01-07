(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Listen for messages from the background script.
  */
  browser.runtime.onMessage.addListener((message) => {

    const rootElement = document.documentElement;
    const body = rootElement.childNodes[2];
    var innerText = body.children[4].innerText;
    if (message.searchTerm === "author") {
      var authorName = innerText.substr(innerText.indexOf("Autor")+7,innerText.substr(innerText.indexOf("Autor")+7,innerText.length).indexOf("\n"));
      if (authorName.indexOf(",") > -1 ) {
        authorName = authorName.substr(authorName.indexOf(",")+2, authorName.length)+" "+authorName.substr(0, authorName.indexOf(","));
        }
      window.open("https://www.databazeknih.cz/search?q="+authorName+"&in=authors", "_blank");
    } else {
      var bookName = innerText.substr(innerText.indexOf("Název")+7,innerText.substr(innerText.indexOf("Název")+7,innerText.length).indexOf("\n"));
      window.open("https://www.databazeknih.cz/search?q="+bookName, "_blank");
    }
  });

})();

