document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector("#postco360-iframe");
  const params = new URLSearchParams(window.location.search);

  if (params.has("disable-resize-observer") || !iframe) return;

  let shouldResize = true;
  let initialHeight = iframe.offsetHeight;
  let padding = 50;
  console.log("Initial height > ", initialHeight);

  window.onmessage = (event) => {
    if (event.origin.match(/360\.postco\.co/)) {
      console.log("Parent received---", event.data);

      let { type, height, isRoot, resetHeight } = event.data;
      height += padding;

      if (type === "resize") {
        if (
          shouldResize &&
          isRoot &&
          iframe.offsetHeight - height > 0 &&
          (iframe.offsetHeight - height) / iframe.offsetHeight > 0.3
        ) {
          iframe.style.height = `${initialHeight}px`;
        } else if (resetHeight) {
          shouldResize = false;
          iframe.style.height = `${initialHeight}px`;
        } else if (shouldResize && height > iframe.offsetHeight) {
          iframe.style.height = height + "px";
        }
      } else if (type === "scrollToTop") {
        iframe.scrollIntoView();
      }
    }
  };
});
