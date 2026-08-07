(() => {
  if (
    typeof API_URL === "undefined" ||
    typeof isOtherTheaterName !== "function" ||
    typeof normalizeTheaterName !== "function" ||
    typeof applyRemoteData !== "function" ||
    typeof renderDetail !== "function" ||
    typeof baseTheaters === "undefined"
  ) return;

  const requestedTheater = new URLSearchParams(window.location.search).get("theater") || "";
  if (!isOtherTheaterName(requestedTheater)) return;

  function requestRemoteData(params) {
    return new Promise((resolve) => {
      const callbackName = `__kangekiTechoOtherReviews_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      const script = document.createElement("script");
      const separator = API_URL.includes("?") ? "&" : "?";
      const query = new URLSearchParams({
        action: "getData",
        callback: callbackName,
        view: params.view || "theater"
      });

      if (params.theater) query.set("theater", params.theater);

      const cleanup = () => {
        script.remove();
        delete window[callbackName];
      };

      window[callbackName] = (data) => {
        cleanup();
        resolve(data || null);
      };

      script.onerror = () => {
        cleanup();
        resolve(null);
      };

      window.setTimeout(() => {
        if (window[callbackName]) {
          cleanup();
          resolve(null);
        }
      }, 10000);

      script.src = `${API_URL}${separator}${query.toString()}`;
      document.body.appendChild(script);
    });
  }

  function getReviewTheaterNames(data) {
    const counts = data?.review_counts;
    if (!counts) return [];

    if (Array.isArray(counts)) {
      return counts
        .map((item) => {
          if (typeof getField === "function") {
            return getField(item, ["theater", "劇場名", "劇場", "name"]);
          }
          return item?.theater || item?.["劇場名"] || item?.["劇場"] || item?.name || "";
        })
        .filter(Boolean);
    }

    if (typeof counts === "object") {
      return Object.keys(counts);
    }

    return [];
  }

  function getReviewTheaterName(item) {
    if (typeof getField === "function") {
      return getField(item, ["theater", "劇場名", "劇場"]);
    }
    return item?.theater || item?.["劇場名"] || item?.["劇場"] || "";
  }

  function isUnregisteredTheater(theaterName) {
    const normalized = normalizeTheaterName(theaterName);
    if (!normalized || isOtherTheaterName(theaterName)) return false;

    return !baseTheaters.some(
      (theater) => normalizeTheaterName(theater.name) === normalized
    );
  }

  function uniqueReviews(items) {
    const seen = new Set();
    return items.filter((item) => {
      const key = [
        item?.id || item?.ID || "",
        getReviewTheaterName(item),
        item?.show_title || item?.["観劇作品"] || item?.["作品名"] || "",
        item?.floor || item?.["階"] || "",
        item?.row || item?.["列"] || "",
        item?.seat || item?.["番"] || "",
        item?.created_at || item?.["投稿日"] || item?.["作成日"] || ""
      ].join("|");

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async function loadOtherTheaterReviews() {
    const summaryData = await requestRemoteData({ view: "reviews" });

    const summaryReviews = Array.isArray(summaryData?.seat_reviews)
      ? summaryData.seat_reviews.filter((item) => isUnregisteredTheater(getReviewTheaterName(item)))
      : [];

    let remoteReviews = [...summaryReviews];

    const theaterNames = [...new Set(getReviewTheaterNames(summaryData))]
      .filter(isUnregisteredTheater);

    if (theaterNames.length) {
      const responses = await Promise.all(
        theaterNames.map((theater) => requestRemoteData({ view: "theater", theater }))
      );

      responses.forEach((data) => {
        if (!Array.isArray(data?.seat_reviews)) return;
        data.seat_reviews.forEach((item) => {
          if (isUnregisteredTheater(getReviewTheaterName(item))) {
            remoteReviews.push(item);
          }
        });
      });
    }

    if (!remoteReviews.length) {
      const fallbackData = await requestRemoteData({ view: "theater" });
      if (Array.isArray(fallbackData?.seat_reviews)) {
        remoteReviews = fallbackData.seat_reviews.filter(
          (item) => isUnregisteredTheater(getReviewTheaterName(item))
        );
      }
    }

    remoteReviews = uniqueReviews(remoteReviews);

    if (remoteReviews.length) {
      applyRemoteData({ seat_reviews: remoteReviews });
    }

    renderDetail();
  }

  loadOtherTheaterReviews();
})();
