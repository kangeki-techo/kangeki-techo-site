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
