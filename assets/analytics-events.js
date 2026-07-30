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

    if (payload?.type === "seat_review" && typeof window.gtag === "function") {
      window.gtag("event", "review_submit_success", {
        theater_name: payload.theater || "",
        seat_floor: payload.floor || "",
        seat_row: payload.row || "",
        seat_number: payload.seat || ""
      });
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
