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

function todayDateValue(date = new Date()) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

(() => {
  const reviewForm = document.querySelector("#reviewForm");
  if (!reviewForm) return;

  document.addEventListener("submit", (event) => {
    if (event.target !== reviewForm) return;

    const NativeDate = window.Date;
    window.Date = class extends NativeDate {
      toISOString() {
        const originalIso = super.toISOString();
        return `${todayDateValue(this)}${originalIso.slice(10)}`;
      }
    };

    queueMicrotask(() => {
      window.Date = NativeDate;
    });
  }, true);
})();

(() => {
  const comment = document.querySelector("#postComment");
  const commentRule = document.querySelector("#commentRule");
  if (!comment || !commentRule) return;

  const updateCommentRequirementSafely = () => {
    const ratingValues = ["#postVisibility", "#postSound", "#postRecommendation"]
      .map((selector) => document.querySelector(selector)?.value.trim() || "")
      .filter((value) => value !== "")
      .map(Number);
    const needsComment = ratingValues.some((value) => value <= 2);

    comment.required = needsComment;
    commentRule.textContent = needsComment
      ? "星2以下の評価があるため、コメント入力が必須です。"
      : "コメントは任意です。星2以下の評価を付ける場合のみ必須になります。";
  };

  window.updateCommentRequirement = updateCommentRequirementSafely;
  updateCommentRequirementSafely();
})();
