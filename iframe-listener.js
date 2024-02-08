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

  const iframeFullscreenStyle = {
    width: "100vw",
    height: "100dvh",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "3",
  };

  window.onmessage = (event) => {
    if (!event.origin.match(/postco\.co/)) {
      return;
    }

    let { type, height } = event.data;
    height += padding;

    switch (type) {
      case "scrollToTop":
        window.scrollTo(0, 0);
        iframe.scrollTo(0, 0);
        break;
      case "scrollUp":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "scrollDown":
        const iframeBottom = iframe.scrollHeight;
        const viewportHeight = window.innerHeight;

        // Scroll down a little further (150px), so the users
        // can see there is a footer below
        window.scrollBy({
          top: iframeBottom - viewportHeight + 150,
          // Scroll down a little further (150px), so the users
          // can see there is a footer below
          behavior: "smooth",
        });
        break;
      case "stickyBottomAppBarReposition":
        repositionStickyBottomAppBar();
        break;
      case "enterFullscreen":
        Object.entries(iframeFullscreenStyle).forEach(
          ([property, value]) => (iframe.style[property] = value),
        );
        break;
      case "exitFullscreen":
        Object.entries(iframeFullscreenStyle).forEach(
          ([property, _]) => (iframe.style[property] = ""),
        );
        break;
    }
  };
});
