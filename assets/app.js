const API_URL = "https://script.google.com/macros/s/AKfycbzOWOuuQzDxR9cP3GeUeEDOlYJ120LXwmQvSkN1fVp7L8OPEFUIzAcngVL5zVNfhZf0Tw/exec";

let performances = [];
const baseTheaters = [
  {
    id: "t001",
    name: "シアタークリエ",
    area: "東京",
    address: "東京都千代田区有楽町1-2-1",
    access: "日比谷駅直結 / 有楽町駅から徒歩約7分",
    capacity: "609席",
    officialUrl: "https://crea.tohostage.com/",
    seatMapUrl: "https://crea.tohostage.com/facility/seatingchart.html"
  },
  {
    id: "t002",
    name: "日生劇場",
    area: "東京",
    address: "東京都千代田区有楽町1-1-1",
    access: "日比谷駅A13出口から徒歩約1分 / 有楽町駅から徒歩約10分",
    capacity: "1,334席",
    officialUrl: "https://www.nissaytheatre.or.jp/",
    seatMapUrl: "https://www.nissaytheatre.or.jp/seat/"
  },
  {
    id: "t003",
    name: "博多座",
    area: "福岡",
    address: "福岡県福岡市博多区下川端町２−１",
    access: "中洲川端駅7番出口直結 / 博多駅から地下鉄で約4分",
    capacity: "1,500席",
    officialUrl: "https://www.hakataza.co.jp/",
    seatMapUrl: "https://www.hakataza.co.jp/theater/floormap/view/"
  },
  {
    id: "t004",
    name: "梅田芸術劇場メインホール",
    area: "大阪",
    address: "大阪府大阪市北区茶屋町19-1",
    access: "大阪梅田駅茶屋町口から徒歩約5分 / 中津駅から徒歩約5分",
    capacity: "1,905席",
    officialUrl: "https://www.umegei.com/",
    seatMapUrl: "https://www.umegei.com/guide/seat/#pcTab1"
  },
  {
    id: "t005",
    name: "梅田芸術劇場シアター・ドラマシティ",
    area: "大阪",
    address: "大阪府大阪市北区茶屋町19-2",
    access: "大阪梅田駅茶屋町口から徒歩約5分 / 中津駅から徒歩約5分",
    capacity: "898席",
    officialUrl: "https://www.umegei.com/",
    seatMapUrl: "https://www.umegei.com/guide/seat/#pcTab2"
  },
  {
    id: "t006",
    name: "愛知県芸術劇場大ホール",
    area: "名古屋",
    address: "愛知県名古屋市東区東桜一丁目13番2号",
    access: "栄駅から徒歩約3分 / 栄町駅から徒歩約2分",
    capacity: "2,480席",
    officialUrl: "https://www-stage.aac.pref.aichi.jp/",
    seatMapUrl: "https://www-stage.aac.pref.aichi.jp/facility/main-seat.html"
  },
  {
    id: "t007",
    name: "東京建物 Brillia HALL",
    area: "東京",
    address: "東京都豊島区東池袋一丁目19番1号",
    access: "池袋駅東口（北）32番出口から徒歩約4分",
    capacity: "1,248席",
    officialUrl: "https://toshima-theatre.jp/",
    seatMapUrl: "https://toshima-theatre.jp/about/seating/"
  },
  {
    id: "t008",
    name: "新歌舞伎座",
    area: "大阪",
    address: "大阪府大阪市天王寺区上本町６丁目５−１３",
    access: "大阪上本町駅と直結 / 谷町九丁目駅から徒歩5分",
    capacity: "1,501席",
    officialUrl: "https://www.shinkabukiza.co.jp/",
    seatMapUrl: "https://www.shinkabukiza.co.jp/seat/"
  },
  {
    id: "t009",
    name: "御園座",
    area: "名古屋",
    address: "愛知県名古屋市中区栄 1−6−14",
    access: "伏見駅6番出口から徒歩約2分",
    capacity: "1,299席",
    officialUrl: "https://www.misonoza.co.jp/",
    seatMapUrl: "https://www.misonoza.co.jp/seat/"
  },
  {
    id: "t010",
    name: "SkyシアターMBS",
    area: "大阪",
    address: "大阪府大阪市北区梅田3-2-2 ＪＰタワー大阪6F",
    access: "JR大阪駅西口すぐ / 西梅田駅・大阪梅田駅から徒歩圏内",
    capacity: "1,289席",
    officialUrl: "https://stm-mle.jp/",
    seatMapUrl: "https://stm-mle.jp/about#Seat"
  },
  {
    id: "t011",
    name: "東急シアターオーブ",
    area: "東京",
    address: "東京都渋谷区渋谷2-21-1 渋谷ヒカリエ11階",
    access: "各線渋谷駅から直結",
    capacity: "1,972席",
    officialUrl: "https://theatre-orb.com/",
    seatMapUrl: "https://theatre-orb.com/seating/"
  },
  {
    id: "t012",
    name: "福岡市民ホール 大ホール",
    area: "福岡",
    address: "福岡県福岡市中央区天神5丁目2-2",
    access: "天神駅から徒歩約10分 / 天神南駅から徒歩約17分 / 福岡（天神）駅から徒歩約13分",
    capacity: "2,016席",
    officialUrl: "https://www.fukuoka-civic-hall.jp/",
    seatMapUrl: "https://www.fukuoka-civic-hall.jp/facility/hall1/"
  },
  {
    id: "t013",
    name: "札幌文化芸術劇場 hitaru",
    area: "北海道",
    address: "北海道札幌市中央区北1条西1丁目",
    access: "大通駅30番出口から徒歩約2分 / 札幌駅南口から徒歩約10分 / 西4丁目駅から徒歩約12分",
    capacity: "2,302席",
    officialUrl: "https://www.sapporo-community-plaza.jp/",
    seatMapUrl: "https://www.sapporo-community-plaza.jp/theater_seat.html"
  },
  {
    id: "t014",
    name: "EX THEATER ARIAKE",
    area: "東京",
    address: "東京都江東区有明3丁目3番8号 東京ドリームパーク3階",
    access: "東京ビッグサイト駅から徒歩約5分 / 国際展示場駅から徒歩約9分",
    capacity: "1,546席",
    officialUrl: "https://tdp.tv-asahi.co.jp/theater/",
    seatMapUrl: "https://tdp.tv-asahi.co.jp/theater/about/"
  },
  {
    id: "t015",
    name: "東京国際フォーラム ホールC",
    area: "東京",
    address: "東京都千代田区丸の内3丁目5番1号",
    access: "有楽町駅から徒歩約1分 / 東京駅から徒歩約5分",
    capacity: "1,502席",
    officialUrl: "https://www.t-i-forum.co.jp/visitors/facilities/c/",
    seatMapUrl: "https://www.t-i-forum.co.jp/visitors/facilities/c/seat/"
  }
];

let theaters = [...baseTheaters];

function numberedOptions(count, suffix, start = 1) {
  return Array.from({ length: count }, (_, index) => `${index + start}${suffix}`);
}

const defaultSeatOptions = {
  floors: ["1階", "2階", "3階", "4階"],
  rows: numberedOptions(30, "列"),
  seats: numberedOptions(60, "番")
};

let theaterSeatOptions = {
  "シアタークリエ": {
    floors: ["1階", "2階"],
    rows: numberedOptions(22, "列"),
    seats: numberedOptions(40, "番")
  },
  "日生劇場": {
    floors: ["GC階", "1階", "2階"],
    rows: ["A列", "B列", "C列", ...numberedOptions(20, "列")],
    seats: numberedOptions(50, "番")
  },
  "大阪四季劇場": {
    floors: ["1階", "2階"],
    rows: numberedOptions(28, "列"),
    seats: numberedOptions(56, "番")
  },
  "博多座": {
    floors: ["1階", "2階", "3階"],
    rows: numberedOptions(26, "列"),
    seats: numberedOptions(60, "番")
  },
  "PARCO劇場": {
    floors: ["1階", "2階"],
    rows: ["A列", "B列", "C列", "D列", "E列", "F列", "G列", "H列", "I列", "J列", "K列", "L列"],
    seats: numberedOptions(36, "番")
  }
};

const baseReviews = [];

const storageKey = "kangekiTechoReviews";
const dataCacheKey = "kangekiTechoDataCacheV3";
let reviews = [...baseReviews, ...loadSavedReviews()];
let selectedTheater = getQuery("theater") || theaters[0]?.name || "";
let seatFilter = { floor: "", row: "", seat: "" };
let dataReady = false;
let reviewCounts = {};

function getPageView() {
  if (document.querySelector("#performanceResults")) return "home";
  if (document.querySelector("#theaterDetail")) return "theater";
  if (document.querySelector("#theaterList")) return "reviews";
  if (document.querySelector("#reviewForm")) return "post";
  return "static";
}

function shouldLoadRemoteData() {
  return getPageView() !== "static";
}

function getRemoteParams() {
  const view = getPageView();
  const params = { view };

  if (view === "home") {
    params.date = normalizeDate(document.querySelector("#dateInput")?.value || todayDateValue());
    params.area = normalizeArea(document.querySelector("#areaInput")?.value || "全国");
  }

  if (view === "theater") {
    params.theater = selectedTheater || getQuery("theater") || "";
  }

  return params;
}

function getDataCacheKey(params = getRemoteParams()) {
  const parts = [
    dataCacheKey,
    params.view || getPageView(),
    params.date || "",
    params.area || "",
    normalizeTheaterName(params.theater || "")
  ];
  return parts.join(":");
}

function loadRemoteData(params = getRemoteParams()) {
  if (!API_URL) return Promise.resolve(false);

  return new Promise((resolve) => {
    const callbackName = `__kangekiTechoDataLoaded_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const script = document.createElement("script");
    const separator = API_URL.includes("?") ? "&" : "?";
    const query = new URLSearchParams({
      action: "getData",
      callback: callbackName,
      view: params.view || getPageView()
    });

    if (params.date) query.set("date", params.date);
    if (params.area) query.set("area", params.area);
    if (params.theater) query.set("theater", params.theater);

    window[callbackName] = (data) => {
      saveDataCache(data, params);
      applyRemoteData(data);
      script.remove();
      delete window[callbackName];
      resolve(true);
    };

    const finishWithError = () => {
      script.remove();
      delete window[callbackName];
      resolve(false);
    };

    script.onerror = finishWithError;
    window.setTimeout(() => {
      if (window[callbackName]) finishWithError();
    }, 10000);

    script.src = `${API_URL}${separator}${query.toString()}`;
    document.body.appendChild(script);
  });
}

function loadDataCache(params = getRemoteParams()) {
  try {
    const cache = JSON.parse(localStorage.getItem(getDataCacheKey(params)) || "null");
    if (!cache?.data) return false;
    applyRemoteData(cache.data);
    return true;
  } catch {
    return false;
  }
}

function saveDataCache(data, params = getRemoteParams()) {
  try {
    localStorage.setItem(getDataCacheKey(params), JSON.stringify({
      savedAt: new Date().toISOString(),
      data
    }));
  } catch {
    // 保存できなくても表示には影響しないため、そのまま続けます。
  }
}

function applyRemoteData(data) {
  if (!data) return;
  dataReady = true;

  if (Array.isArray(data.performances)) {
    performances = data.performances.map((item) => ({
      id: getField(item, ["id", "ID"]),
      date: getPerformanceDate(item),
      area: normalizeArea(getField(item, ["area", "地域"])),
      tags: getPerformanceTags(item),
      title: getField(item, ["title", "作品名"]),
      time: getPerformanceTime(item),
      theater: getField(item, ["theater", "劇場名", "劇場"]),
      officialUrl: getField(item, ["official_url", "公式サイト", "公式URL"]),
      ticketUrl: getField(item, ["ticket_url", "チケット購入", "チケットURL"])
    }));
  }

  if (Array.isArray(data.theaters)) {
    theaters = data.theaters.map((item) => ({
      id: getField(item, ["id", "ID"]),
      name: getField(item, ["name", "劇場名"]),
      area: normalizeArea(getField(item, ["area", "地域"])),
      address: getField(item, ["address", "住所"]),
      access: getField(item, ["access", "アクセス"]),
      capacity: getField(item, ["capacity", "座席数"]),
      officialUrl: getField(item, ["official_url", "公式リンク", "公式サイト", "公式URL"]),
      seatMapUrl: getField(item, ["seat_map_url", "座席表URL", "座席表リンク", "座席表画像"])
    }));
  } else {
    theaters = [...baseTheaters];
  }

  if (data.review_counts) {
    reviewCounts = normalizeReviewCounts(data.review_counts);
  }

  if (Array.isArray(data.seat_reviews)) {
    const remoteReviews = data.seat_reviews.map((item) => ({
      id: getField(item, ["id", "ID"]),
      createdAt: getField(item, ["created_at", "投稿日", "作成日"]),
      theater: getField(item, ["theater", "劇場名", "劇場"]),
      showTitle: getField(item, ["show_title", "観劇作品", "作品名"]),
      height: formatHeight(getField(item, ["height", "身長"])),
      gender: getField(item, ["gender", "性別"]),
      floor: getField(item, ["floor", "階"]),
      row: getField(item, ["row", "列"]),
      seat: getField(item, ["seat", "番"]),
      visibility: Number(getField(item, ["visibility_rating", "見え方評価", "見え方"], 0)),
      sound: Number(getField(item, ["sound_rating", "音響評価", "音響"], 0)),
      recommendation: Number(getField(item, ["recommendation_rating", "おすすめ度評価", "おすすめ度"], 0)),
      comment: getField(item, ["comment", "コメント"])
    }));

    reviews = [...remoteReviews, ...loadSavedReviews()];
  }

  const seatRuleRows = data.theater_seat_rules || data.theater_seat_options;
  if (Array.isArray(seatRuleRows)) {
    theaterSeatOptions = buildSeatOptions(seatRuleRows);
  }

  const requestedTheater = getQuery("theater");
  const requestedMatch = getTheaterByName(requestedTheater);
  const selectedMatch = getTheaterByName(selectedTheater);
  if (requestedMatch) {
    selectedTheater = requestedMatch.name;
  } else if (!selectedMatch) {
    selectedTheater = theaters[0]?.name || "";
  } else {
    selectedTheater = selectedMatch.name;
  }
}

function normalizeReviewCounts(counts) {
  if (Array.isArray(counts)) {
    return counts.reduce((result, item) => {
      const theater = getField(item, ["theater", "劇場名", "劇場", "name"]);
      const count = Number(getField(item, ["count", "レビュー数"], 0));
      if (theater) result[normalizeTheaterName(theater)] = count;
      return result;
    }, {});
  }

  return Object.entries(counts || {}).reduce((result, [theater, count]) => {
    result[normalizeTheaterName(theater)] = Number(count || 0);
    return result;
  }, {});
}

function getTheaterByName(theaterName) {
  return theaters.find((theater) => normalizeTheaterName(theater.name) === normalizeTheaterName(theaterName));
}

function getField(item, keys, fallback = "") {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") {
      return typeof item[key] === "string" ? item[key].trim() : item[key];
    }
  }
  return fallback;
}

function formatHeight(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const number = text.replace(/[^\d.]/g, "");
  if (!number) return text;
  return `${number}cm`;
}

function isHeightValue(value) {
  return /^\d{2,3}(\.\d)?\s*(cm)?$/i.test(String(value || "").trim());
}

function reviewPersonMeta(review) {
  if (review.height) return `身長：${formatHeight(review.height)}`;
  if (isHeightValue(review.gender)) return `身長：${formatHeight(review.gender)}`;
  if (review.gender) return `性別：${review.gender}`;
  return "身長：未入力";
}

function normalizeArea(value) {
  const text = String(value || "")
    .replace(/\s+/g, "")
    .replace(/　+/g, "")
    .trim();
  const areaAliases = {
    東京都: "東京",
    東京エリア: "東京",
    大阪府: "大阪",
    大阪エリア: "大阪",
    愛知: "名古屋",
    愛知県: "名古屋",
    名古屋エリア: "名古屋",
    福岡県: "福岡",
    福岡エリア: "福岡"
  };
  if (text.includes("東京")) return "東京";
  if (text.includes("大阪")) return "大阪";
  if (text.includes("名古屋") || text.includes("愛知")) return "名古屋";
  if (text.includes("福岡")) return "福岡";
  return areaAliases[text] || text;
}

function normalizeTheaterName(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/　+/g, "")
    .trim();
}

function normalizeDate(value) {
  if (!value) return "";
  const text = String(value).trim();
  const match = text.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (!match) return text;
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

function getPerformanceDate(item) {
  const date = getField(item, ["date", "日付"], "");
  if (date) return normalizeDate(date);

  const year = getField(item, ["year", "年"], "");
  const month = getField(item, ["month", "月"], "");
  const day = getField(item, ["day", "日"], "");
  if (year && month && day) {
    return normalizeDate(`${year}/${month}/${day}`);
  }

  return "";
}

function getPerformanceTags(item) {
  if (Array.isArray(item.tags)) return item.tags.filter(Boolean);

  const tagText = getField(item, ["tags", "タグ"], "");
  const tagColumns = [
    getField(item, ["tag1", "tag_1", "タグ1", "タグ１"], ""),
    getField(item, ["tag2", "tag_2", "タグ2", "タグ２"], ""),
    getField(item, ["tag3", "tag_3", "タグ3", "タグ３"], "")
  ];

  return [
    ...String(tagText).split(","),
    ...tagColumns
  ].map((tag) => String(tag).trim()).filter(Boolean);
}

function getPerformanceTime(item) {
  const time = getField(item, ["time", "開演時間"], "");
  if (time) return normalizeTime(time);

  const hour = getField(item, ["hour", "時間"], "");
  const minute = getField(item, ["minute", "分"], "00");
  if (hour !== "") return normalizeTime(`${hour}:${minute}`);

  return "";
}

function normalizeTime(value) {
  if (!value) return "";
  const text = String(value).trim();
  const match = text.match(/^(\d{1,2})[:：時](\d{1,2})?/);
  if (!match) return text;
  return `${match[1].padStart(2, "0")}:${(match[2] || "00").padStart(2, "0")}`;
}

function displayTime(value) {
  return String(value || "").replace(":", "：");
}

function buildSeatOptions(rows) {
  const options = {};

  rows.sort((a, b) => {
    return Number(getField(a, ["sort_order", "表示順"], 0)) - Number(getField(b, ["sort_order", "表示順"], 0));
  }).forEach((item) => {
    const theater = getField(item, ["theater", "劇場名", "劇場"]);
    const type = getField(item, ["type", "種類"]);
    const value = getField(item, ["value", "選択肢"]);
    const floor = getField(item, ["floor", "階"]);

    if (!options[theater]) {
      options[theater] = { floors: [], rows: [], seats: [], byFloor: {} };
    }

    if (floor) addUnique(options[theater].floors, floor);

    if (floor || getField(item, ["row_start", "列開始"]) || getField(item, ["seat_start", "番開始"])) {
      buildSeatRuleOptions(item, options[theater], floor);
      return;
    }

    if (type === "floor" || type === "階") options[theater].floors.push(value);
    if (type === "row" || type === "列") options[theater].rows.push(value);
    if (type === "seat" || type === "番") options[theater].seats.push(value);
  });

  return options;
}

function buildSeatRuleOptions(item, options, floor) {
  const rowType = getField(item, ["row_type", "列タイプ"], "数字");
  const rowLabel = getField(item, ["row_label", "列表記"], "列");
  const seatLabel = getField(item, ["seat_label", "番表記"], "番");
  const rowStart = getField(item, ["row_start", "列開始"]);
  const rowEnd = getField(item, ["row_end", "列終了"]);
  const seatStart = getField(item, ["seat_start", "番開始"]);
  const seatEnd = getField(item, ["seat_end", "番終了"]);
  const rowValues = buildRange(rowStart, rowEnd, rowType, rowLabel);
  const seatValues = buildRange(seatStart, seatEnd, "数字", seatLabel);

  rowValues.forEach((value) => addUnique(options.rows, value));
  seatValues.forEach((value) => addUnique(options.seats, value));

  if (floor) {
    if (!options.byFloor[floor]) {
      options.byFloor[floor] = { rows: [], seats: [] };
    }
    rowValues.forEach((value) => addUnique(options.byFloor[floor].rows, value));
    seatValues.forEach((value) => addUnique(options.byFloor[floor].seats, value));
  }
}

function buildRange(start, end, type = "数字", suffix = "") {
  if (start === "" || end === "") return [];
  if (type === "英字") return alphabetRange(String(start), String(end), suffix);

  const first = Number(start);
  const last = Number(end);
  if (!Number.isFinite(first) || !Number.isFinite(last)) return [];

  const length = Math.max(0, last - first + 1);
  return numberedOptions(length, suffix, first);
}

function alphabetRange(start, end, suffix = "") {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const first = alphabet.indexOf(start.toUpperCase());
  const last = alphabet.indexOf(end.toUpperCase());
  if (first === -1 || last === -1 || last < first) return [];
  return alphabet.slice(first, last + 1).split("").map((letter) => `${letter}${suffix}`);
}

function addUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function loadSavedReviews() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function saveReview(review) {
  const saved = loadSavedReviews();
  localStorage.setItem(storageKey, JSON.stringify([review, ...saved]));
}

function getQuery(key) {
  const value = new URLSearchParams(window.location.search).get(key);
  return typeof value === "string" ? value.trim() : value;
}

function stars(value) {
  return "★★★★★".slice(0, value) + "☆☆☆☆☆".slice(0, 5 - value);
}

function average(items, key) {
  if (!items.length) return "-";
  const total = items.reduce((sum, item) => sum + Number(item[key]), 0);
  return (total / items.length).toFixed(1);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setupMobileMenu() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  if (!header || !nav || header.querySelector(".menu-toggle")) return;

  const button = document.createElement("button");
  button.className = "menu-toggle";
  button.type = "button";
  button.setAttribute("aria-controls", "siteNav");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<span class="menu-toggle-lines" aria-hidden="true"></span><span>メニュー</span>';

  nav.id = nav.id || "siteNav";
  header.insertBefore(button, nav);

  button.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function todayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setupDefaultDate() {
  const dateInput = document.querySelector("#dateInput");
  if (dateInput && !dateInput.value) {
    dateInput.value = todayDateValue();
  }
}

async function sendToSheet(payload) {
  if (!API_URL) return false;

  await fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload)
  });

  return true;
}

function getSeatOptions(theaterName, floor = "") {
  const options = theaterSeatOptions[theaterName] || defaultSeatOptions;
  const floorOptions = floor && options.byFloor ? options.byFloor[floor] : null;

  return {
    floors: options.floors,
    rows: floorOptions?.rows?.length ? floorOptions.rows : options.rows,
    seats: floorOptions?.seats?.length ? floorOptions.seats : options.seats
  };
}

function fillSeatSelect(select, values, placeholder, required = false, selectedValue = "") {
  if (!select) return;
  select.innerHTML = `<option value="">${placeholder}</option>`;
  values.forEach((value) => {
    select.insertAdjacentHTML("beforeend", `<option>${value}</option>`);
  });
  select.required = required;
  if (selectedValue && values.includes(selectedValue)) {
    select.value = selectedValue;
  }
}

function setupDetailSeatSelects(theaterName, selected = seatFilter) {
  const options = getSeatOptions(theaterName, selected.floor);
  fillSeatSelect(document.querySelector("#floorInput"), options.floors, "指定なし", false, selected.floor);
  fillSeatSelect(document.querySelector("#rowInput"), options.rows, "指定なし", false, selected.row);
  fillSeatSelect(document.querySelector("#seatInput"), options.seats, "指定なし", false, selected.seat);
}

function setupPostSeatSelects(theaterName, selectedFloor = "") {
  const options = getSeatOptions(theaterName, selectedFloor);
  fillSeatSelect(document.querySelector("#postFloor"), options.floors, "選択してください", true, selectedFloor);
  fillSeatSelect(document.querySelector("#postRow"), options.rows, "選択してください", true);
  fillSeatSelect(document.querySelector("#postSeat"), options.seats, "選択してください", true);
}

function setupSeatSelects() {
  setupDetailSeatSelects(selectedTheater);
  setupPostTheaterSelects();
}

function getSortedTheaters() {
  return [...theaters].sort((a, b) => {
    const areaDiff = areaSortValue(a.area) - areaSortValue(b.area);
    return areaDiff || a.name.localeCompare(b.name, "ja");
  });
}

function theaterReviewUrl(theater) {
  return `theater.html?theater=${encodeURIComponent(theater)}`;
}

function theaterExists(theaterName) {
  return Boolean(getTheaterByName(theaterName));
}

function renderTheaterCardName(theaterName) {
  if (theaterName === "梅田芸術劇場メインホール") {
    return `梅田芸術劇場<br class="pc-name-break">メインホール`;
  }
  if (theaterName === "梅田芸術劇場シアター・ドラマシティ") {
    return `梅田芸術劇場<br class="pc-name-break">シアター・ドラマシティ`;
  }
  if (theaterName === "東京国際フォーラム ホールC") {
    return `東京国際フォーラム<span class="mobile-name-space"> </span><br class="pc-name-break">ホールC`;
  }
  return theaterName;
}

function renderTheaterNameLink(theaterName) {
  const theater = getTheaterByName(theaterName);
  if (theater) {
    return `<a class="theater-link" href="${theaterReviewUrl(theater.name)}">${theaterName}</a>`;
  }
  return `<span class="theater-name-disabled" title="劇場レビューは未登録です">${theaterName}</span>`;
}

const theaterAreaOrder = ["東京", "大阪", "名古屋", "福岡", "北海道", "東北", "関東", "中部", "関西", "中国", "四国", "九州"];

function areaSortValue(area) {
  const index = theaterAreaOrder.indexOf(area);
  return index === -1 ? theaterAreaOrder.length : index;
}

function getSelectedTheaterArea() {
  return normalizeArea(document.querySelector("#theaterAreaInput")?.value || "全国");
}

function getPostSelectedArea() {
  return normalizeArea(document.querySelector("#postTheaterArea")?.value || theaters[0]?.area || "");
}

function scrollToTheaterList() {
  document.querySelector("#theaterList")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToSelectedTheaterArea() {
  const selectedArea = getSelectedTheaterArea();
  if (selectedArea === "全国") {
    scrollToTheaterList();
    return;
  }

  const targetHeading = [...document.querySelectorAll(".area-heading")]
    .find((heading) => heading.dataset.area === selectedArea);
  (targetHeading || document.querySelector("#theaterList"))?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToPerformanceResults() {
  const performanceSection = document.querySelector("#performancesTitle");
  performanceSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToReviewStats() {
  document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setPerformanceSearchLoading(isLoading) {
  const button = document.querySelector("#performanceSearch button[type='submit']");
  if (!button) return;

  button.textContent = isLoading ? "検索中" : "公演を探す";
  button.disabled = isLoading;
  button.setAttribute("aria-busy", String(isLoading));
}

function renderPerformanceTags(tags) {
  const displayTags = Array.isArray(tags) && tags.length ? tags : ["公演"];
  return displayTags.map((tag) => `<span class="pill">${tag}</span>`).join("");
}

function renderPerformances() {
  const performanceResults = document.querySelector("#performanceResults");
  const performanceMeta = document.querySelector("#performanceMeta");
  if (!performanceResults || !performanceMeta) return;

  const date = normalizeDate(document.querySelector("#dateInput").value);
  const area = normalizeArea(document.querySelector("#areaInput").value);
  const filtered = performances.filter((item) => {
    const dateMatch = !date || normalizeDate(item.date) === date;
    const areaMatch = area === "全国" || item.area === area;
    return dateMatch && areaMatch;
  }).sort((a, b) => normalizeTime(a.time).localeCompare(normalizeTime(b.time)));

  performanceMeta.textContent = `${date || "日付指定なし"} / ${area}：${filtered.length}件の公演`;
  performanceResults.innerHTML = "";

  if (!dataReady) {
    performanceMeta.textContent = "公演情報を読み込んでいます";
    performanceResults.innerHTML = `<div class="empty wide">公演情報を読み込んでいます。少しだけお待ちください。</div>`;
    return;
  }

  if (!filtered.length) {
    performanceResults.innerHTML = `<div class="empty wide">条件に合う公演がありません。日付や地域を変えて試してください。</div>`;
    return;
  }

  filtered.forEach((item) => {
    performanceResults.insertAdjacentHTML("beforeend", `
      <article class="card performance-card">
        <div class="pill-row">
          <span class="card-kicker">${item.area}</span>
          ${renderPerformanceTags(item.tags)}
        </div>
        <h3>${item.title}</h3>
        <dl class="card-data performance-meta-line">
          <div class="performance-time performance-time-large"><span>開演</span><strong>${displayTime(item.time)}</strong></div>
          <div>劇場 ${renderTheaterNameLink(item.theater)}</div>
        </dl>
        <div class="card-actions">
          <a class="btn subtle" href="${item.officialUrl}" target="_blank" rel="noopener noreferrer">公式サイト</a>
          <a class="btn gold" href="${item.ticketUrl}" target="_blank" rel="noopener noreferrer">チケット購入</a>
        </div>
      </article>
    `);
  });
}

function renderTheaters() {
  const theaterList = document.querySelector("#theaterList");
  const selectedArea = getSelectedTheaterArea();

  if (theaterList) theaterList.innerHTML = "";

  const sortedTheaters = getSortedTheaters();
  const displayTheaters = selectedArea === "全国"
    ? sortedTheaters
    : sortedTheaters.filter((theater) => normalizeArea(theater.area) === selectedArea);

  if (theaterList && !displayTheaters.length) {
    theaterList.innerHTML = `<div class="empty wide">選択した地域の劇場はまだ登録されていません。</div>`;
  }

  const groupedTheaters = displayTheaters.reduce((groups, theater) => {
    const area = normalizeArea(theater.area) || "地域未設定";
    if (!groups[area]) groups[area] = [];
    groups[area].push(theater);
    return groups;
  }, {});

  Object.keys(groupedTheaters)
    .sort((a, b) => areaSortValue(a) - areaSortValue(b) || a.localeCompare(b, "ja"))
    .forEach((area) => {
      theaterList?.insertAdjacentHTML("beforeend", `<h3 class="area-heading" data-area="${area}">${area}</h3>`);
      groupedTheaters[area].forEach((theater) => {
        const theaterKey = normalizeTheaterName(theater.name);
        const count = reviewCounts[theaterKey] ?? reviews.filter((review) => normalizeTheaterName(review.theater) === theaterKey).length;
        theaterList?.insertAdjacentHTML("beforeend", `
          <a class="card theater-card" href="${theaterReviewUrl(theater.name)}">
            <h3>${renderTheaterCardName(theater.name)}</h3>
            <div class="theater-card-footer">
              <span class="theater-review-count">${count}件のレビュー</span>
              <span class="theater-card-link">詳細を見る →</span>
            </div>
          </a>
        `);
      });
    });

  setupPostTheaterSelects();
}

function setupPostTheaterSelects() {
  const postTheaterArea = document.querySelector("#postTheaterArea");
  const postTheater = document.querySelector("#postTheater");
  if (!postTheaterArea || !postTheater) return;

  const sortedTheaters = getSortedTheaters();
  const areas = [...new Set(sortedTheaters.map((theater) => normalizeArea(theater.area)).filter(Boolean))]
    .sort((a, b) => areaSortValue(a) - areaSortValue(b) || a.localeCompare(b, "ja"));
  const previousArea = getPostSelectedArea();
  const previousTheater = postTheater.value;

  postTheaterArea.innerHTML = "";
  areas.forEach((area) => {
    postTheaterArea.insertAdjacentHTML("beforeend", `<option>${area}</option>`);
  });

  const selectedArea = areas.includes(previousArea) ? previousArea : areas[0];
  postTheaterArea.value = selectedArea || "";

  const areaTheaters = sortedTheaters.filter((theater) => normalizeArea(theater.area) === selectedArea);
  postTheater.innerHTML = "";
  areaTheaters.forEach((theater) => {
    postTheater.insertAdjacentHTML("beforeend", `<option>${theater.name}</option>`);
  });

  const selectedTheaterName = areaTheaters.some((theater) => theater.name === previousTheater)
    ? previousTheater
    : areaTheaters[0]?.name || "";
  postTheater.value = selectedTheaterName;
  setupPostSeatSelects(selectedTheaterName);
}

function getVisibleReviews() {
  return reviews
    .filter((review) => review.theater === selectedTheater)
    .filter((review) => !seatFilter.floor || review.floor === seatFilter.floor)
    .filter((review) => !seatFilter.row || review.row === seatFilter.row)
    .filter((review) => !seatFilter.seat || review.seat === seatFilter.seat)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function renderDetail() {
  const detailName = document.querySelector("#detailName");
  if (!detailName) return;

  const theater = getTheaterByName(selectedTheater) || (!getQuery("theater") ? theaters[0] : null);
  if (!theater) {
    detailName.textContent = "劇場情報が未登録です";
    const heroName = document.querySelector("#theaterHeroName");
    if (heroName) heroName.textContent = "劇場情報";
    document.querySelector("#detailAddress").textContent = "-";
    document.querySelector("#detailAccess").textContent = "-";
    document.querySelector("#detailCapacity").textContent = "-";
    const officialLink = document.querySelector("#detailOfficialUrl");
    if (officialLink) {
      officialLink.href = "#";
      officialLink.textContent = "公式サイト未登録";
      officialLink.removeAttribute("target");
      officialLink.removeAttribute("rel");
      officialLink.setAttribute("aria-disabled", "true");
    }
    const seatMapLink = document.querySelector("#detailSeatMapUrl");
    if (seatMapLink) {
      seatMapLink.href = "#";
      seatMapLink.textContent = "座席表リンク未登録";
      seatMapLink.removeAttribute("target");
      seatMapLink.removeAttribute("rel");
      seatMapLink.setAttribute("aria-disabled", "true");
    }
    document.querySelector("#stats").innerHTML = "";
    document.querySelector("#reviewMeta").textContent = "";
    document.querySelector("#reviewList").innerHTML = `<div class="empty">この劇場はまだ固定データに登録されていません。</div>`;
    return;
  }
  selectedTheater = theater.name;
  const visibleReviews = getVisibleReviews();
  setupDetailSeatSelects(theater.name);

  detailName.textContent = theater.name;
  const heroName = document.querySelector("#theaterHeroName");
  if (heroName) heroName.textContent = theater.name;
  document.querySelector("#detailAddress").textContent = theater.address;
  document.querySelector("#detailAccess").textContent = theater.access;
  document.querySelector("#detailCapacity").textContent = theater.capacity;
  const officialLink = document.querySelector("#detailOfficialUrl");
  if (officialLink) {
    officialLink.href = theater.officialUrl || "#";
    officialLink.textContent = theater.officialUrl ? "公式サイトを見る" : "公式サイト未登録";
    officialLink.toggleAttribute("aria-disabled", !theater.officialUrl);
    if (theater.officialUrl) {
      officialLink.target = "_blank";
      officialLink.rel = "noopener noreferrer";
    } else {
      officialLink.removeAttribute("target");
      officialLink.removeAttribute("rel");
    }
  }
  const seatMapLink = document.querySelector("#detailSeatMapUrl");
  if (seatMapLink) {
    seatMapLink.href = theater.seatMapUrl || "#";
    seatMapLink.textContent = theater.seatMapUrl ? "公式サイトで座席表を見る" : "座席表リンク未登録";
    seatMapLink.toggleAttribute("aria-disabled", !theater.seatMapUrl);
    if (theater.seatMapUrl) {
      seatMapLink.target = "_blank";
      seatMapLink.rel = "noopener noreferrer";
    } else {
      seatMapLink.removeAttribute("target");
      seatMapLink.removeAttribute("rel");
    }
  }

  document.querySelector("#stats").innerHTML = `
    <div class="stat"><small>レビュー数</small><strong>${visibleReviews.length}</strong></div>
    <div class="stat"><small>見え方平均</small><strong>${average(visibleReviews, "visibility")}</strong></div>
    <div class="stat"><small>音響平均</small><strong>${average(visibleReviews, "sound")}</strong></div>
    <div class="stat"><small>おすすめ度</small><strong>${average(visibleReviews, "recommendation")}</strong></div>
  `;

  const filterText = [seatFilter.floor, seatFilter.row, seatFilter.seat].filter(Boolean).join("");
  document.querySelector("#reviewMeta").textContent = filterText
    ? `${selectedTheater} / ${filterText}：${visibleReviews.length}件`
    : `${selectedTheater}：すべてのレビュー ${visibleReviews.length}件`;

  const reviewList = document.querySelector("#reviewList");
  reviewList.innerHTML = "";

  if (!visibleReviews.length) {
    reviewList.innerHTML = `<div class="empty">条件に合うレビューがありません。座席条件を減らして検索してください。</div>`;
    return;
  }

  visibleReviews.forEach((review) => {
    reviewList.insertAdjacentHTML("beforeend", `
      <article class="review-item">
        <div class="review-head">
          <div>
            <div class="seat-name">${review.floor}${review.row}${review.seat}</div>
            <div class="review-meta">観劇作品：${review.showTitle}</div>
          </div>
        </div>
        <div class="rating-row">
          <span class="pill">見え方 <span class="stars">${stars(review.visibility)}</span></span>
          <span class="pill">音響 <span class="stars">${stars(review.sound)}</span></span>
          <span class="pill">おすすめ <span class="stars">${stars(review.recommendation)}</span></span>
        </div>
        ${review.comment ? `<span class="comment-label">コメント</span><p>${review.comment}</p>` : ""}
        <div class="review-meta">${reviewPersonMeta(review)} / 投稿日：${review.createdAt}</div>
      </article>
    `);
  });
}

function updateCommentRequirement() {
  const comment = document.querySelector("#postComment");
  if (!comment) return;

  const ratingValues = ["#postVisibility", "#postSound", "#postRecommendation"]
    .map((selector) => Number(document.querySelector(selector).value));
  const needsComment = ratingValues.some((value) => value <= 2);
  comment.required = needsComment;
  document.querySelector("#commentRule").textContent = needsComment
    ? "星2以下の評価があるため、コメント入力が必須です。"
    : "コメントは任意です。星2以下の評価を付ける場合のみ必須になります。";
}

function bindEvents() {
  setupMobileMenu();

  document.querySelector("#performanceSearch")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setPerformanceSearchLoading(true);
    dataReady = false;
    renderPerformances();
    const loaded = await loadRemoteData(getRemoteParams());
    if (!loaded) loadDataCache(getRemoteParams());
    renderPerformances();
    scrollToPerformanceResults();
    window.setTimeout(() => setPerformanceSearchLoading(false), 700);
  });

  document.querySelector("#theaterAreaFilter")?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderTheaters();
    scrollToSelectedTheaterArea();
  });

  document.querySelector("#seatSearch")?.addEventListener("submit", (event) => {
    event.preventDefault();
    seatFilter = {
      floor: document.querySelector("#floorInput").value,
      row: document.querySelector("#rowInput").value,
      seat: document.querySelector("#seatInput").value
    };
    renderDetail();
    scrollToReviewStats();
  });

  document.querySelector("#theaterList")?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-theater]");
    if (!card) return;
    selectedTheater = card.dataset.theater;
    seatFilter = { floor: "", row: "", seat: "" };
    document.querySelector("#floorInput").value = "";
    document.querySelector("#rowInput").value = "";
    document.querySelector("#seatInput").value = "";
    const url = new URL(window.location.href);
    url.searchParams.set("theater", selectedTheater);
    window.history.replaceState({}, "", url);
    renderTheaters();
    renderDetail();
  });

  document.querySelector("#postTheater")?.addEventListener("change", (event) => {
    setupPostSeatSelects(event.target.value);
  });

  document.querySelector("#postTheaterArea")?.addEventListener("change", () => {
    setupPostTheaterSelects();
  });

  document.querySelector("#postFloor")?.addEventListener("change", (event) => {
    setupPostSeatSelects(document.querySelector("#postTheater").value, event.target.value);
  });

  document.querySelector("#floorInput")?.addEventListener("change", (event) => {
    setupDetailSeatSelects(selectedTheater, {
      floor: event.target.value,
      row: "",
      seat: ""
    });
  });

  ["#postVisibility", "#postSound", "#postRecommendation"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("change", updateCommentRequirement);
  });

  document.querySelector("#reviewForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    updateCommentRequirement();
    if (!event.target.checkValidity()) {
      event.target.reportValidity();
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const newReview = {
      theater: document.querySelector("#postTheater").value,
      showTitle: document.querySelector("#postShow").value.trim(),
      height: formatHeight(document.querySelector("#postHeight").value),
      floor: document.querySelector("#postFloor").value,
      row: document.querySelector("#postRow").value,
      seat: document.querySelector("#postSeat").value,
      visibility: Number(document.querySelector("#postVisibility").value),
      sound: Number(document.querySelector("#postSound").value),
      recommendation: Number(document.querySelector("#postRecommendation").value),
      comment: document.querySelector("#postComment").value.trim(),
      createdAt: today
    };

    const submitButton = event.target.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "送信中...";

    try {
      await sendToSheet({
        type: "seat_review",
        theater: newReview.theater,
        show_title: newReview.showTitle,
        height: newReview.height,
        gender: newReview.height,
        floor: newReview.floor,
        row: newReview.row,
        seat: newReview.seat,
        visibility_rating: newReview.visibility,
        sound_rating: newReview.sound,
        recommendation_rating: newReview.recommendation,
        comment: newReview.comment
      });

      event.target.reset();
      setupPostTheaterSelects();
      updateCommentRequirement();
      showToast("レビューを送信しました。ページ再読み込み後に表示されます。");
    } catch (error) {
      saveReview(newReview);
      reviews = [newReview, ...reviews];
      showToast("通信に失敗したため、この端末内に一時保存しました。");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "レビューを投稿する";
    }
  });

  document.querySelector("#contactForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.target.reportValidity();
      return;
    }

    const submitButton = event.target.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "送信中...";

    try {
      await sendToSheet({
        type: "contact",
        name: document.querySelector("#contactName").value.trim(),
        email: document.querySelector("#contactEmail").value.trim(),
        subject: document.querySelector("#contactSubject").value.trim(),
        message: document.querySelector("#contactMessage").value.trim()
      });

      event.target.reset();
      showToast("お問い合わせを送信しました。");
    } catch (error) {
      showToast("送信に失敗しました。時間をおいてもう一度お試しください。");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "送信する";
    }
  });
}

function renderAll() {
  setupDefaultDate();
  renderPerformances();
  renderTheaters();
  setupSeatSelects();
  renderDetail();
  updateCommentRequirement();
}

renderAll();
bindEvents();

const hasCachedData = shouldLoadRemoteData() && loadDataCache();
if (hasCachedData) {
  renderAll();
}

if (shouldLoadRemoteData()) {
  loadRemoteData().then((loaded) => {
    if (loaded) {
      renderAll();
    } else if (hasCachedData) {
      showToast("最新データの読み込みに時間がかかっています。前回のデータを表示しています。");
    } else {
      renderAll();
      showToast("データの読み込みに時間がかかっています。時間をおいて再読み込みしてください。");
    }
  });
}
