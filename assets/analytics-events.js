(() => {
  const seatSearch = document.querySelector("#seatSearch");
  if (!seatSearch) return;

  seatSearch.addEventListener("submit", () => {
    if (typeof window.gtag !== "function") return;

    const seatFloor = document.querySelector("#floorInput")?.value || "";
    const seatRow = document.querySelector("#rowInput")?.value || "";
    const seatNumber = document.querySelector("#seatInput")?.value || "";

    window.gtag("event", "seat_search", {
      theater_name: document.querySelector("#detailName")?.textContent.trim() || "",
      seat_floor: seatFloor,
      seat_row: seatRow,
      seat_number: seatNumber,
      selected_field_count: [seatFloor, seatRow, seatNumber].filter(Boolean).length
    });
  });
})();

(() => {
  if (typeof window.sendToSheet !== "function") return;

  const originalSendToSheet = window.sendToSheet;
  window.sendToSheet = async (payload) => {
    const result = await originalSendToSheet(payload);

    if (typeof window.gtag === "function") {
      if (payload?.type === "seat_review") {
        window.gtag("event", "review_submit_success", {
          theater_name: payload.theater || "",
          seat_floor: payload.floor || "",
          seat_row: payload.row || "",
          seat_number: payload.seat || ""
        });
      }

      if (payload?.type === "contact") {
        window.gtag("event", "contact_submit_success", {
          has_reply_email: Boolean(payload.email)
        });
      }
    }

    return result;
  };
})();

(() => {
  document.addEventListener("click", (event) => {
    const ticketLink = event.target.closest(".performance-card .card-actions a.btn.gold");
    if (!ticketLink || typeof window.gtag !== "function") return;

    const performanceCard = ticketLink.closest(".performance-card");
    window.gtag("event", "ticket_click", {
      performance_title: performanceCard?.querySelector("h3")?.textContent.trim() || "",
      theater_name: performanceCard?.querySelector(".theater-link")?.textContent.trim() || "",
      ticket_url: ticketLink.href
    });
  });
})();

(() => {
  document.addEventListener("click", (event) => {
    if (typeof window.gtag !== "function") return;

    const performanceOfficialLink = event.target.closest(".performance-card .card-actions a.btn.subtle");
    if (performanceOfficialLink) {
      const performanceCard = performanceOfficialLink.closest(".performance-card");
      window.gtag("event", "performance_official_click", {
        performance_title: performanceCard?.querySelector("h3")?.textContent.trim() || "",
        theater_name: performanceCard?.querySelector(".theater-link")?.textContent.trim() || "",
        official_url: performanceOfficialLink.href
      });
      return;
    }

    const theaterOfficialLink = event.target.closest("#detailOfficialUrl");
    if (theaterOfficialLink && theaterOfficialLink.getAttribute("aria-disabled") !== "true") {
      window.gtag("event", "theater_official_click", {
        theater_name: document.querySelector("#detailName")?.textContent.trim() || "",
        official_url: theaterOfficialLink.href
      });
      return;
    }

    const seatMapLink = event.target.closest("#detailSeatMapUrl");
    if (seatMapLink && seatMapLink.getAttribute("aria-disabled") !== "true") {
      window.gtag("event", "seat_map_click", {
        theater_name: document.querySelector("#detailName")?.textContent.trim() || "",
        seat_map_url: seatMapLink.href
      });
    }
  });
})();

(() => {
  const detailName = document.querySelector("#detailName");
  if (!detailName) return;

  let trackedTheaterName = "";
  const trackTheaterView = () => {
    const theaterName = detailName.textContent.trim();
    if (
      !theaterName
      || theaterName === "劇場情報が未登録です"
      || theaterName === trackedTheaterName
      || typeof window.gtag !== "function"
    ) {
      return;
    }

    trackedTheaterName = theaterName;
    window.gtag("event", "theater_view", {
      theater_name: theaterName,
      page_location: window.location.href
    });
  };

  trackTheaterView();

  const observer = new MutationObserver(trackTheaterView);
  observer.observe(detailName, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
