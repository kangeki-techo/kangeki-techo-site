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

(() => {
  if (typeof applyRemoteData !== "function" || typeof baseTheaters === "undefined") return;

  const originalApplyRemoteData = applyRemoteData;
  applyRemoteData = (data) => {
    const remoteData = data && typeof data === "object" ? { ...data } : data;
    if (remoteData && typeof remoteData === "object") {
      delete remoteData.theaters;

      if (
        typeof selectedTheater !== "undefined" &&
        typeof isOtherTheaterName === "function" &&
        isOtherTheaterName(selectedTheater) &&
        Array.isArray(remoteData.seat_reviews) &&
        remoteData.seat_reviews.length === 0
      ) {
        delete remoteData.seat_reviews;
      }
    }

    originalApplyRemoteData(remoteData);
    theaters = [...baseTheaters];
  };

  theaters = [...baseTheaters];
  renderTheaters();
  renderDetail();
})();

(() => {
  const heroName = document.querySelector("#theaterHeroName");
  const detailName = document.querySelector("#detailName");
  if (!heroName || !detailName) return;

  const updateHeroName = () => {
    const theaterName = detailName.textContent.trim();
    if (!theaterName || theaterName === "劇場情報が未登録です") return;
    if (heroName.textContent.trim() !== theaterName) {
      heroName.textContent = theaterName;
    }
  };

  updateHeroName();

  const detailObserver = new MutationObserver(updateHeroName);
  detailObserver.observe(detailName, {
    childList: true,
    subtree: true,
    characterData: true
  });

  const heroObserver = new MutationObserver(updateHeroName);
  heroObserver.observe(heroName, {
    childList: true,
    subtree: true,
    characterData: true
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
  const ratingSelectors = ["#postVisibility", "#postSound", "#postRecommendation"];
  if (!comment || !commentRule) return;

  const updateCommentRequirementSafely = () => {
    const ratingValues = ratingSelectors
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
  ratingSelectors.forEach((selector) => {
    document.querySelector(selector)?.addEventListener("change", updateCommentRequirementSafely);
  });
  updateCommentRequirementSafely();
})();

(() => {
  if (
    typeof getRemoteParams !== "function" ||
    typeof loadRemoteData !== "function" ||
    typeof isOtherTheaterName !== "function"
  ) return;

  const originalGetRemoteParams = getRemoteParams;
  getRemoteParams = () => {
    const params = originalGetRemoteParams();
    if (params?.view === "theater" && isOtherTheaterName(params.theater)) {
      return { ...params, theater: "" };
    }
    return params;
  };

  const requestedTheater = new URLSearchParams(window.location.search).get("theater") || "";
  if (!isOtherTheaterName(requestedTheater)) return;

  loadRemoteData({ view: "theater" }).then((loaded) => {
    if (!loaded && typeof loadDataCache === "function") {
      loadDataCache({ view: "theater" });
    }
    if (typeof renderDetail === "function") renderDetail();
  });
})();

(() => {
  if (typeof renderReviewList !== "function" || typeof isOtherTheaterName !== "function") return;

  const originalRenderReviewList = renderReviewList;
  renderReviewList = (visibleReviews, emptyMessage) => {
    originalRenderReviewList(visibleReviews, emptyMessage);

    if (typeof selectedTheater === "undefined" || !isOtherTheaterName(selectedTheater)) return;

    const reviewItems = document.querySelectorAll("#reviewList .review-item");
    const displayedReviews = visibleReviews.slice(0, visibleReviewCount);

    reviewItems.forEach((item, index) => {
      const review = displayedReviews[index];
      const reviewHead = item.querySelector(".review-head > div");
      if (!review || !reviewHead || reviewHead.querySelector(".other-theater-name")) return;

      const theaterName = document.createElement("div");
      theaterName.className = "review-meta other-theater-name";
      theaterName.textContent = `劇場：${review.theater}`;
      reviewHead.prepend(theaterName);
    });
  };
})();
