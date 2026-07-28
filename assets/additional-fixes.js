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

(() => {
  const reviewList = document.querySelector("#reviewList");
  if (!reviewList) return;

  const updateRecommendationLabels = () => {
    reviewList.querySelectorAll(".rating-row .pill").forEach((pill) => {
      const labelNode = pill.firstChild;
      if (labelNode?.nodeType === Node.TEXT_NODE && labelNode.nodeValue.trim() === "おすすめ") {
        labelNode.nodeValue = "おすすめ度 ";
      }
    });
  };

  updateRecommendationLabels();

  const observer = new MutationObserver(updateRecommendationLabels);
  observer.observe(reviewList, {
    childList: true,
    subtree: true
  });
})();

(() => {
  const stats = document.querySelector("#stats");
  if (!stats) return;

  const updateAverageLabels = () => {
    stats.querySelectorAll(".stat small").forEach((label) => {
      const text = label.textContent.trim();
      if (text === "見え方平均") label.textContent = "見え方の平均";
      if (text === "音響平均") label.textContent = "音響の平均";
    });
  };

  updateAverageLabels();

  const observer = new MutationObserver(updateAverageLabels);
  observer.observe(stats, {
    childList: true,
    subtree: true
  });
})();
