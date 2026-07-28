(() => {
  const seatMapLink = document.querySelector("#detailSeatMapUrl");
  if (!seatMapLink) return;

  const updateSeatMapLabel = () => {
    if (seatMapLink.getAttribute("aria-disabled") === "true") return;
    if (seatMapLink.textContent.trim() === "公式サイトで座席表を見る") {
      seatMapLink.textContent = "公式の座席表を見る";
    }
  };

  updateSeatMapLabel();

  const observer = new MutationObserver(updateSeatMapLabel);
  observer.observe(seatMapLink, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["aria-disabled", "href"]
  });
})();
