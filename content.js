(function () {
  // Avoid multiple inserts
  if (window.__steamOverlayCreated) return;
  window.__steamOverlayCreated = true;

  function slugify(title) {
    return title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Recursively retry until title element exists
  function createOverlay() {
    const titleEl = document.querySelector(".apphub_AppName");
    if (!titleEl) {
      setTimeout(createOverlay, 500);
      return;
    }

    const rawTitle = titleEl.textContent.trim();
    const slug = slugify(rawTitle);
    const targetUrl = "https://steamunlocked.org/" + slug + "-free-download/";

    // Create wrapper
    const overlay = document.createElement("div");
    overlay.id = "steam-example-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "20px";
    overlay.style.right = "20px";
    overlay.style.zIndex = "999999";
    overlay.style.background = "linear-gradient(135deg, #1b2838, #2a475e)";
    overlay.style.color = "#ffffff";
    overlay.style.padding = "12px 16px";
    overlay.style.borderRadius = "8px";
    overlay.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
    overlay.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    overlay.style.fontSize = "14px";
    overlay.style.fontWeight = "500";
    overlay.style.cursor = "pointer";
    overlay.style.border = "2px solid #66c0f4";
    overlay.style.maxWidth = "250px";
    overlay.style.lineHeight = "1.4";
    overlay.style.transition = "all 0.2s ease";

    // Title text
    const titleDiv = document.createElement("div");
    titleDiv.textContent = `🎮 Open ${rawTitle} on SteamUnlocked.org`;

    // URL preview (smaller text)
    const urlDiv = document.createElement("div");
    urlDiv.style.fontSize = "11px";
    urlDiv.style.opacity = "0.8";
    urlDiv.style.marginTop = "4px";
    urlDiv.textContent = targetUrl;

    overlay.appendChild(titleDiv);
    overlay.appendChild(urlDiv);

    // Hover effects
    overlay.addEventListener("mouseenter", function () {
      overlay.style.transform = "scale(1.05)";
      overlay.style.boxShadow = "0 6px 20px rgba(102,192,244,0.4)";
    });

    overlay.addEventListener("mouseleave", function () {
      overlay.style.transform = "scale(1)";
      overlay.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
    });

    // Click opens site
    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(targetUrl, "_blank");
    });

    document.body.appendChild(overlay);
  }

  createOverlay();
})();
