(() => {
  const nativeInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
  const allowedTags = new Set(["ARTICLE", "DIV", "SPAN", "P"]);
  const allowedClasses = new Set([
    "review-item",
    "review-head",
    "seat-name",
    "review-meta",
    "rating-row",
    "pill",
    "stars",
    "comment-label"
  ]);

  const sanitizeChildren = (parent) => {
    [...parent.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) return;

      if (child.nodeType !== Node.ELEMENT_NODE) {
        child.remove();
        return;
      }

      if (!allowedTags.has(child.tagName)) {
        child.replaceWith(document.createTextNode(child.outerHTML));
        return;
      }

      [...child.attributes].forEach((attribute) => {
        if (attribute.name !== "class") child.removeAttribute(attribute.name);
      });

      if (child.hasAttribute("class")) {
        const safeClasses = [...child.classList].filter((className) => allowedClasses.has(className));
        if (safeClasses.length) {
          child.className = safeClasses.join(" ");
        } else {
          child.removeAttribute("class");
        }
      }

      sanitizeChildren(child);
    });
  };

  Element.prototype.insertAdjacentHTML = function insertAdjacentHTML(position, html) {
    if (this.id !== "reviewList" || String(position).toLowerCase() !== "beforeend") {
      return nativeInsertAdjacentHTML.call(this, position, html);
    }

    const template = document.createElement("template");
    template.innerHTML = String(html);
    sanitizeChildren(template.content);
    this.append(template.content);
  };
})();
