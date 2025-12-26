function getCurrentTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    callback(tabs[0]);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const statusEl = document.getElementById("status");
  const button = document.getElementById("openBtn");

  getCurrentTab(function (tab) {
    if (!tab || !tab.url || !/https:\/\/store\.steampowered\.com\/app\//.test(tab.url)) {
      statusEl.textContent = "Not on a Steam game page.";
      button.disabled = true;
      return;
    }

    // Inject a small script to read the slug from the page context if needed:
    chrome.tabs.executeScript(
      tab.id,
      {
        code: "window.__steamGameSlug || null;"
      },
      function (results) {
        const slug = results && results[0];

        if (!slug) {
          statusEl.textContent = "Could not detect game title.";
          button.disabled = true;
          return;
        }

        const targetUrl = "https://steamunlocked.org/" + slug + "-free-download/";
        statusEl.textContent = "Game slug: " + slug;

        button.addEventListener("click", function () {
          chrome.tabs.create({ url: targetUrl });
        });
      }
    );
  });
});
