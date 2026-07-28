(() => {
  const nativeInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;

  const createElement = (tagName, className, text = "") => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  };

  const buildSafeReviewItem = (html) => {
    const template = document.createElement("template");
    template.innerHTML = String(html);

    const source = template.content.querySelector("article.review-item");
    if (!source) return null;

    const article = createElement("article", "review-item");
    const head = createElement("div", "review-head");
    const headInner = document.createElement("div");
    const seatName = createElement("div", "seat-name", source.querySelector(".seat-name")?.textContent || "");
    const sourceMeta = [...source.querySelectorAll(".review-meta")];
    const showMeta = createElement("div", "review-meta", sourceMeta[0]?.textContent || "");

    headInner.append(seatName, showMeta);
    head.append(headInner);
    article.append(head);

    const ratingRow = createElement("div", "rating-row");
    source.querySelectorAll(".rating-row .pill").forEach((sourcePill) => {
      const sourceStars = sourcePill.querySelector(".stars");
      const label = [...sourcePill.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.nodeValue)
        .join(" ")
        .trim();
      const pill = createElement("span", "pill");
      pill.append(document.createTextNode(`${label} `));
      pill.append(createElement("span", "stars", sourceStars?.textContent || ""));
      ratingRow.append(pill);
    });
    article.append(ratingRow);

    const sourceCommentLabel = source.querySelector(".comment-label");
    const sourceComment = sourceCommentLabel?.nextElementSibling?.tagName === "P"
      ? sourceCommentLabel.nextElementSibling
      : null;
    if (sourceCommentLabel && sourceComment) {
      article.append(createElement("span", "comment-label", sourceCommentLabel.textContent));
      article.append(createElement("p", "", sourceComment.textContent));
    }

    const detailMeta = sourceMeta[sourceMeta.length - 1];
    if (detailMeta && detailMeta !== sourceMeta[0]) {
      article.append(createElement("div", "review-meta", detailMeta.textContent));
    }

    return article;
  };

  Element.prototype.insertAdjacentHTML = function insertAdjacentHTML(position, html) {
    if (this.id !== "reviewList" || String(position).toLowerCase() !== "beforeend") {
      return nativeInsertAdjacentHTML.call(this, position, html);
    }

    const safeReviewItem = buildSafeReviewItem(html);
    if (safeReviewItem) {
      this.append(safeReviewItem);
    } else {
      this.append(document.createTextNode(String(html)));
    }
  };
})();
