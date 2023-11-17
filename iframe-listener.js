document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector("#postco360-iframe");
  const params = new URLSearchParams(window.location.search);

  if (params.has("disable-resize-observer") || !iframe) return;

  addEventListener("scroll", () => {
    const viewportBottom = window.scrollY + window.innerHeight;
    const iframeBottom = iframe.offsetTop + iframe.offsetHeight;

    iframe.contentWindow.postMessage(
      {
        type: "stickyBottomAppBarPosition",
        data: viewportBottom < iframeBottom ? iframeBottom - viewportBottom : 0,
      },
      "*",
    );
  });
  const repositionStickyBottomAppBar = () => {
    window.dispatchEvent(new CustomEvent("scroll"));
  };

  let padding = 50;

  window.onmessage = (event) => {
    if (event.origin.match(/postco\.co/)) {
      let { type, height } = event.data;
      height += padding;

      if (type === "scrollToTop") {
        window.scrollTo(0, 0);
        iframe.scrollTo(0, 0);
      } else if (type === "scrollUp") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else if (type === "scrollDown") {
        const iframeBottom = iframe.scrollHeight;
        const viewportHeight = window.innerHeight;

        window.scrollBy({
          top: iframeBottom - viewportHeight + 150,
          // Scroll down a little further (150px), so the users
          // can see there is a footer below
          behavior: "smooth",
        });
      } else if (type === "stickyBottomAppBarReposition") {
        repositionStickyBottomAppBar();
      }
    }
  };
});
