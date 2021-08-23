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
  const $xOne = xp =>
  document.evaluate(
    xp, document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;

  browser.runtime.onMessage.addListener((message) => {

    if (message.searchTerm === "author") {
      var authorName = $xOne("/html/body/main/section/section/div[2]/table/tbody/tr[4]/td[2]").textContent.replace(/^\s+|\s+$/g,'');
      if (authorName.indexOf(",") > -1 ) {
        authorName = authorName.substr(authorName.indexOf(",")+2, authorName.length)+" "+authorName.substr(0, authorName.indexOf(","));
        }
      window.open("https://www.databazeknih.cz/search?q="+authorName+"&in=authors", "_blank");
    } else {
      var bookName = $xOne("/html/body/main/section/section/div[2]/table/tbody/tr[3]/td[2]").textContent.replace(/^\s+|\s+$/g,'');
      window.open("https://www.databazeknih.cz/search?q="+bookName, "_blank");
    }
  });

})();
