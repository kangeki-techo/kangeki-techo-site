(() => {
  if (
    typeof getReviewCountForTheater !== "function" ||
    typeof isOtherTheaterName !== "function" ||
    typeof isOtherReviewTheater !== "function"
  ) return;

  const originalGetReviewCountForTheater = getReviewCountForTheater;

  getReviewCountForTheater = (theaterName) => {
    if (!isOtherTheaterName(theaterName)) {
      return originalGetReviewCountForTheater(theaterName);
    }

    return Object.entries(reviewCounts || {}).reduce((total, [reviewTheater, count]) => {
      if (!isOtherReviewTheater(reviewTheater)) return total;
      return total + Number(count || 0);
    }, 0);
  };

  if (typeof renderTheaters === "function") {
    renderTheaters();
  }
})();
