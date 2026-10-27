/**
 * DriveSafe Admin Portal — application logic
 * Mobile-first, accessible, Tailwind-styled prototype.
 */
import {
  VIOLATIONS, VIOLATIONS_TOTAL, CATEGORIES, OWNERS, CONTACTS, CONTACTS_TOTAL,
  ADMIN_USERS, APP_USERS, APP_USERS_TOTAL, STATUSES,
} from "./data.js";

/** The owner assigned to a violation's category ("-" when none). */
function ownerForCategory(catName) {
  const c = CATEGORIES.find((x) => x.name === catName);
  return c && c.owner ? c.owner : "-";
}

/* ------------------------------------------------------------------ utils */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const now = () => {
  const d = new Date(), p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};
const STATUS_STYLES = {
  "Pending": "bg-amber-100 text-amber-700",
  "Under review": "bg-sky-100 text-sky-700",
  "Verified": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
};
/** Mask a reporter phone (PII): keep area code + last 3 digits, hide the rest. */
function maskMobile(m) {
  const parts = String(m).trim().split(" ");
  const last = parts.pop() || "";
  const masked = "•".repeat(Math.max(0, last.length - 3)) + last.slice(-3);
  return (parts.join(" ") + " " + masked).trim();
}
/** A Mobile cell: masked by default, with an eye toggle to reveal. */
const mobileCell = (m) => `
  <span class="inline-flex items-center gap-1.5">
    <span data-mobile="${esc(m)}" data-shown="false">${esc(maskMobile(m))}</span>
    <button type="button" data-mobile-toggle aria-pressed="false" aria-label="Show full phone number"
      class="inline-flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:text-gray-700 focus-ring">👁</button>
  </span>`;
const chip = (status) =>
  `<span class="inline-block rounded px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600"}">${esc(status)}</span>`;
const iconBtn = (label, glyph, handler, extra = "") =>
  `<button type="button" aria-label="${esc(label)}" title="${esc(label)}" ${handler}
     class="inline-flex h-7 w-7 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 focus-ring ${extra}">${glyph}</button>`;

/* ------------------------------------------------------------------ render: violations */
function renderViolations() {
  $("#viol-body").innerHTML = VIOLATIONS.map((v) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${v.id}</td>
      <td class="cell whitespace-nowrap">${mobileCell(v.mobile)}</td>
      <td class="cell">${esc(v.vehicleType)}</td>
      <td class="cell">${esc(v.category)}</td>
      <td class="cell">${esc(ownerForCategory(v.category))}</td>
      <td class="cell">${esc(v.otherDescription)}</td>
      <td class="cell min-w-[16rem]">${esc(v.location)}</td>
      <td class="cell">${esc(v.notes)}</td>
      <td class="cell">${esc(v.registrationNo)}</td>
      <td class="cell whitespace-nowrap">${esc(v.createdAt)}</td>
      <td class="cell">${chip(v.status)}</td>
      <td class="cell">${v.level}</td>
      <td class="cell">${esc(v.statusUpdatedBy)}</td>
      <td class="cell">${iconBtn("View / review report " + v.id, "👁", `data-review="${v.id}"`, "hover:text-sky-600")}</td>
    </tr>`).join("");

  $("#dash-body").innerHTML = VIOLATIONS.slice(0, 5).map((v) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${v.id}</td>
      <td class="cell whitespace-nowrap">${mobileCell(v.mobile)}</td>
      <td class="cell">${esc(v.category)}</td>
      <td class="cell max-w-[18rem] truncate">${esc(v.location)}</td>
      <td class="cell whitespace-nowrap">${esc(v.createdAt)}</td>
      <td class="cell">${chip(v.status)}</td>
      <td class="cell">${iconBtn("Review report " + v.id, "👁", `data-review="${v.id}"`, "hover:text-sky-600")}</td>
    </tr>`).join("");

  updateStats();
}

function updateStats() {
  const c = { Pending: 0, "Under review": 0, Verified: 0, Rejected: 0 };
  VIOLATIONS.forEach((v) => (c[v.status] += 1));
  const extraPending = VIOLATIONS_TOTAL - VIOLATIONS.length; // rows beyond page 1
  const pending = c.Pending + extraPending;
  const set = (id, val) => { const el = $("#" + id); if (el) el.textContent = val; };
  set("k-total", VIOLATIONS_TOTAL); set("k-pending", pending);
  set("k-verified", c.Verified); set("k-rejected", c.Rejected);
  set("f-sub", VIOLATIONS_TOTAL); set("f-pend", pending);
  set("f-rev", c["Under review"]); set("f-ver", c.Verified); set("f-rej", c.Rejected);
  const badge = $("#pending-badge");
  if (badge) { badge.textContent = pending; badge.classList.toggle("hidden", pending === 0); }
}

/* ------------------------------------------------------------------ render: categories */
function renderCategories() {
  $("#cat-body").innerHTML = CATEGORIES.map((c, i) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${i + 1}</td>
      <td class="cell">${esc(c.name)}</td>
      <td class="cell">${esc(c.description)}</td>
      <td class="cell">${esc(c.owner || "")}</td>
      <td class="cell"><div class="flex gap-1">
        ${iconBtn("Edit " + c.name, "✎", `data-cat-edit="${i}"`)}
        ${iconBtn("Delete " + c.name, "🗑", `data-cat-del="${i}"`, "hover:text-red-600")}
      </div></td>
    </tr>`).join("");
  $("#cat-info").textContent = `Showing 1 to ${CATEGORIES.length} of ${CATEGORIES.length} entries`;
}

function renderOwners() {
  $("#owner-body").innerHTML = OWNERS.map((o, i) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${i + 1}</td>
      <td class="cell">${esc(o.owner)}</td>
      <td class="cell">${esc(o.description)}</td>
      <td class="cell"><div class="flex gap-1">
        ${iconBtn("Edit " + o.owner, "✎", `data-owner-edit="${i}"`)}
        ${iconBtn("Delete " + o.owner, "🗑", `data-owner-del="${i}"`, "hover:text-red-600")}
      </div></td>
    </tr>`).join("");
  $("#owner-info").textContent = `Showing 1 to ${OWNERS.length} of ${OWNERS.length} entries`;
}

/** Fill the owner <select> options in the category modal and violation filter. */
function refreshOwnerSelects() {
  const opts = OWNERS.map((o) => `<option value="${esc(o.owner)}">${esc(o.owner)}</option>`).join("");
  const catSel = $("#cat-owner"); if (catSel) catSel.innerHTML = `<option value="">No owner</option>` + opts;
  const vfSel = $("#vf-owner"); if (vfSel) vfSel.innerHTML = `<option value="">All Category Owners</option>` + opts;
}

/* ------------------------------------------------------------------ render: contacts */
function renderContacts() {
  $("#contact-body").innerHTML = CONTACTS.map((m, i) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${i + 1}</td>
      <td class="cell">${esc(m.name)}</td>
      <td class="cell">${esc(m.email)}</td>
      <td class="cell">${esc(m.message)}</td>
      <td class="cell whitespace-nowrap">${esc(m.createdAt)}</td>
      <td class="cell max-w-[14rem] truncate">${esc(m.response)}</td>
      <td class="cell whitespace-nowrap">${esc(m.repliedAt)}</td>
      <td class="cell">${iconBtn("Reply to " + m.name, "↩", `data-reply="${i}"`, "hover:text-sky-600")}</td>
    </tr>`).join("");
}

/* ------------------------------------------------------------------ render: admin users */
function renderAdminUsers() {
  $("#users-body").innerHTML = ADMIN_USERS.map((u, i) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${i + 1}</td>
      <td class="cell">${esc(u.firstName)}</td>
      <td class="cell">${esc(u.lastName)}</td>
      <td class="cell">${esc(u.email)}</td>
      <td class="cell whitespace-nowrap">${esc(u.phone)}</td>
      <td class="cell min-w-[12rem]">${esc(u.address)}</td>
      <td class="cell whitespace-nowrap">${esc(u.role)}</td>
      <td class="cell">${esc(u.level)}</td>
      <td class="cell"><div class="flex gap-1">
        ${iconBtn("Edit " + u.firstName, "✎", `data-user-edit="${i}"`)}
        ${iconBtn("Delete " + u.firstName, "🗑", `data-user-del="${i}"`, "hover:text-red-600")}
        ${iconBtn("Reset password for " + u.firstName, "🔒", `data-user-lock="${i}"`)}
      </div></td>
    </tr>`).join("");
  $("#users-info").textContent = `Showing 1 to ${ADMIN_USERS.length} of ${ADMIN_USERS.length} entries`;
}

/* ------------------------------------------------------------------ render: app users */
function renderAppUsers() {
  $("#appusers-body").innerHTML = APP_USERS.map((u, i) => `
    <tr class="hover:bg-slate-50">
      <td class="cell">${i + 1}</td>
      <td class="cell">${esc(u.firstName)}</td>
      <td class="cell">${esc(u.lastName)}</td>
      <td class="cell">${esc(u.email)}</td>
      <td class="cell whitespace-nowrap">${mobileCell(u.phone)}</td>
      <td class="cell"></td>
      <td class="cell">${u.earnerPoints}</td>
      <td class="cell">${u.redeemedPoints}</td>
      <td class="cell">${iconBtn("Edit app user " + u.phone, "✎", `data-app-edit="${i}"`)}</td>
    </tr>`).join("");
  $("#appusers-info").textContent = `Showing 1 to ${APP_USERS.length} of ${APP_USERS_TOTAL.toLocaleString()} entries`;
}

function renderAll() {
  renderViolations(); renderCategories(); renderOwners(); renderContacts(); renderAdminUsers(); renderAppUsers();
  refreshOwnerSelects();
}

/* ------------------------------------------------------------------ modals (accessible) */
let lastFocused = null;
function openModal(id) {
  lastFocused = document.activeElement;
  const m = $("#" + id);
  m.classList.remove("hidden");
  m.classList.add("flex");
  const focusable = $("input, select, textarea, button", m);
  if (focusable) setTimeout(() => focusable.focus(), 30);
  document.body.classList.add("overflow-hidden");
}
function closeModal(id) {
  const m = $("#" + id);
  m.classList.add("hidden");
  m.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  if (lastFocused) lastFocused.focus();
}
function closeAnyModal() {
  $$(".modal:not(.hidden)").forEach((m) => {
    m.classList.add("hidden"); m.classList.remove("flex");
  });
  document.body.classList.remove("overflow-hidden");
}

/* ------------------------------------------------------------------ validation */
function setFieldError(f, msg) {
  const err = $("#err-" + f.id);
  if (msg) {
    f.classList.add("input-invalid"); f.setAttribute("aria-invalid", "true");
    if (err) { err.textContent = msg; err.hidden = false; }
  } else {
    f.classList.remove("input-invalid"); f.removeAttribute("aria-invalid");
    if (err) { err.textContent = ""; err.hidden = true; }
  }
}
function clearErrors(scope) {
  $$("[aria-describedby]", scope).forEach((f) => { if (f.id) setFieldError(f, ""); });
}
/** Compute a field's error message ("" when valid) — no side effects. */
function fieldError(el) {
  const val = (el.value || "").trim();
  const label = el.dataset.label || "This field";
  if (el.hasAttribute("data-req") && !val) return `${label} is required.`;
  if (val && el.type === "email" && !/^\S+@\S+\.\S+$/.test(val)) return "Please enter a valid email address.";
  if (val && el.dataset.pattern === "digits" && !/^[0-9]+$/.test(val)) return `${label} must be digits only.`;
  if (val && el.dataset.min && val.length < Number(el.dataset.min)) return `${label} must be at least ${el.dataset.min} characters.`;
  return "";
}
/** Validate a single field and show/clear its error. Returns true if valid. */
function validateField(el) { const msg = fieldError(el); setFieldError(el, msg); return !msg; }
/** Validate required / email / digits / min-length fields within a scope. */
function validateFields(scope) {
  let ok = true, firstBad = null;
  $$("[data-req],[data-pattern],[data-min]", scope).forEach((el) => {
    if (!validateField(el)) { ok = false; if (!firstBad) firstBad = el; }
  });
  if (firstBad) firstBad.focus();
  return ok;
}

/** Silent form-validity checks used to enable/disable the Save buttons. */
function userFormValid() {
  const base = $$("[data-req],[data-pattern],[data-min]", $("#user-modal")).every((el) => !fieldError(el));
  const pw = $("#u-pass").value;
  const pwOk = pw ? evaluatePassword(pw).allMet : !$("#u-pass").hasAttribute("data-req");
  return base && pwOk;
}
function appFormValid() {
  return $$("[data-req],[data-pattern],[data-min]", $("#app-modal")).every((el) => !fieldError(el));
}
function refreshSaveButtons() {
  const us = $("#user-save"); if (us) us.disabled = !userFormValid();
  const as = $("#app-save"); if (as) as.disabled = !appFormValid();
}

/* ------------------------------------------------------------------ reCAPTCHA v3 (invisible) */
/** Replaces the v2 "I'm not a robot" checkbox: runs in the background, returns a score. */
function recaptchaV3(action) {
  const token = "v3_" + action + "_" + Date.now().toString(36);
  const score = 0.9; // v3 returns 0.0–1.0; prototype treats the user as human
  console.log("[reCAPTCHA v3] verify", { action, token, score });
  return { token, score };
}

/* ------------------------------------------------------------------ forgot password */
function resetForgot() {
  $("#forgot-form").classList.remove("hidden");
  $("#forgot-sent").classList.add("hidden");
  $("#fp-email").value = "";
  clearErrors($("#forgot"));
}
function forgotSend() {
  if (!validateFields($("#forgot"))) return;
  recaptchaV3("forgot_password");
  otpMode = "reset";
  pendingEmail = $("#fp-email").value.trim();
  go("otp"); // next step: verify the one-time code
  announce(`A 6-digit code was sent to ${pendingEmail}.`);
}

/* ------------------------------------------------------------------ OTP verification */
let pendingEmail = "";
let otpMode = "reset"; // "login" → OTP verifies sign-in; "reset" → forgot-password
let otpTimer = null;
function resetOtp() {
  $("#otp-form").classList.remove("hidden");
  $("#otp-done").classList.add("hidden");
  $$("#otp-inputs input").forEach((b) => (b.value = ""));
  const err = $("#err-otp"); if (err) { err.textContent = ""; err.hidden = true; }
  $("#otp-echo").textContent = pendingEmail;
  const back = $("#otp-back");
  if (otpMode === "login") { back.textContent = "← Back to sign in"; back.dataset.go = "login"; }
  else { back.textContent = "← Change email"; back.dataset.go = "forgot"; }
  startResendTimer();
  setTimeout(() => $("#otp-inputs input")?.focus(), 40);
}
function startResendTimer() {
  const btn = $("#otp-resend"), label = $("#otp-timer");
  let secs = 500;
  btn.disabled = true;
  if (otpTimer) clearInterval(otpTimer);
  const tick = () => {
    label.textContent = secs > 0 ? `(${secs}s)` : "";
    if (secs <= 0) { clearInterval(otpTimer); btn.disabled = false; }
    secs -= 1;
  };
  tick();
  otpTimer = setInterval(tick, 1000);
}
function otpResend() {
  recaptchaV3("resend_otp");
  startResendTimer();
  announce("A new code has been sent.");
}
function otpVerify() {
  const code = $$("#otp-inputs input").map((b) => b.value.trim()).join("");
  const err = $("#err-otp");
  if (!/^[0-9]{6}$/.test(code)) {
    err.textContent = "Enter all 6 digits of the code."; err.hidden = false;
    $("#otp-inputs input")?.focus();
    return;
  }
  err.hidden = true;
  recaptchaV3("verify_otp"); // invisible check alongside the OTP
  if (otpTimer) clearInterval(otpTimer);
  if (otpMode === "login") {
    go("dashboard");
    announce("Signed in successfully.");
    return;
  }
  $("#otp-echo2").textContent = pendingEmail;
  $("#otp-form").classList.add("hidden");
  $("#otp-done").classList.remove("hidden");
  announce("Identity verified. A password reset link has been sent.");
}
function bindOtpBoxes() {
  const boxes = $$("#otp-inputs input");
  boxes.forEach((box, i) => {
    box.addEventListener("input", () => {
      box.value = box.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && i > 0) boxes[i - 1].focus();
      if (e.key === "ArrowLeft" && i > 0) boxes[i - 1].focus();
      if (e.key === "ArrowRight" && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener("paste", (e) => {
      e.preventDefault();
      const digits = (e.clipboardData.getData("text") || "").replace(/[^0-9]/g, "").slice(0, boxes.length).split("");
      digits.forEach((d, j) => { if (boxes[j]) boxes[j].value = d; });
      boxes[Math.min(digits.length, boxes.length - 1)].focus();
    });
  });
}

/* ------------------------------------------------------------------ password policy (mirrors Amber Learn) */
const PASSWORD_MIN = 12, PASSWORD_MAX = 128;
const SYMBOL_RE = /[!@#$%^&*()_+\-=[\]{}|;':",.<>?]/;
const PASSWORD_RULES = [
  { key: "length", label: `At least ${PASSWORD_MIN} characters`, test: (p) => p.length >= PASSWORD_MIN },
  { key: "upper", label: "An uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
  { key: "lower", label: "A lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
  { key: "digit", label: "A number (0–9)", test: (p) => /\d/.test(p) },
  { key: "symbol", label: "A special character (!@#$…)", test: (p) => SYMBOL_RE.test(p) },
];
const STRENGTH_LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const SEG_COLOR = ["bg-red-400", "bg-red-400", "bg-amber-400", "bg-lime-500", "bg-green-500"];
function evaluatePassword(pw) {
  const value = String(pw ?? ""); const results = {}; let met = 0;
  for (const r of PASSWORD_RULES) { const ok = r.test(value); results[r.key] = ok; if (ok) met += 1; }
  const tooLong = value.length > PASSWORD_MAX;
  const allMet = met === PASSWORD_RULES.length && !tooLong;
  const strength = value ? Math.min(4, met) : 0;
  return { results, met, tooLong, allMet, strength, label: value ? STRENGTH_LABELS[strength] : "" };
}
function renderPwChecklist(value, prefix = "pw") {
  const { results, strength, label, tooLong } = evaluatePassword(value);
  $$("#" + prefix + "-meter > div").forEach((b, i) => {
    b.className = "h-full flex-1 rounded-full " + (value && i < strength ? SEG_COLOR[strength] : "bg-gray-200");
  });
  const lbl = $("#" + prefix + "-strength-label"); if (lbl) lbl.textContent = label;
  const rules = $("#" + prefix + "-rules");
  if (rules) rules.innerHTML = PASSWORD_RULES.map((r) => {
    const ok = results[r.key];
    return `<li class="flex items-center gap-1.5 ${ok ? "text-green-600" : "text-gray-400"}">
      <span class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border text-[9px] font-bold ${ok ? "border-green-600 bg-green-100 text-green-600" : "border-gray-300 bg-white"}">${ok ? "✓" : ""}</span>
      ${r.label}</li>`;
  }).join("");
  const tl = $("#" + prefix + "-toolong"); if (tl) tl.hidden = !tooLong;
}
function togglePw(btn) {
  const inp = $("#" + btn.dataset.pwToggle);
  const show = inp.type === "password";
  inp.type = show ? "text" : "password";
  btn.setAttribute("aria-pressed", String(show));
  btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
  btn.textContent = show ? "🙈" : "👁";
}
function resetChangePassword() {
  ["cp-current", "cp-new", "cp-confirm"].forEach((id) => {
    const el = $("#" + id); if (el) { el.value = ""; el.type = "password"; setFieldError(el, ""); }
  });
  $$("[data-pw-toggle]").forEach((b) => { b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", "Show password"); b.textContent = "👁"; });
  renderPwChecklist("");
}
function saveChangePassword() {
  const cur = $("#cp-current"), nw = $("#cp-new"), cf = $("#cp-confirm");
  let ok = true, firstBad = null;
  const bad = (el, msg) => { setFieldError(el, msg); if (msg) { ok = false; firstBad = firstBad || el; } };
  bad(cur, cur.value ? "" : "Current password is required.");
  const ev = evaluatePassword(nw.value);
  bad(nw, !nw.value ? "New password is required." : !ev.allMet ? "Password does not meet all the requirements." : "");
  bad(cf, !cf.value ? "Please confirm your new password." : cf.value !== nw.value ? "Passwords do not match." : "");
  if (ok && nw.value === cur.value) bad(nw, "New password must be different from the current one.");
  if (!ok) { if (firstBad) firstBad.focus(); return; }
  resetChangePassword();
  announce("Password updated successfully.");
}

/* ------------------------------------------------------------------ violation review */
let curViol = -1;
function openReview(id) {
  curViol = VIOLATIONS.findIndex((v) => v.id === id);
  const v = VIOLATIONS[curViol];
  $("#review-title").textContent = `Violation #${v.id} — ${v.category}`;
  const rows = [
    ["Mobile", v.mobile], ["Vehicle Type", v.vehicleType], ["Category", v.category],
    ["Other Description", v.otherDescription], ["Location", v.location], ["Notes", v.notes],
    ["Registration No", v.registrationNo], ["Created At", v.createdAt], ["Status Updated By", v.statusUpdatedBy],
  ];
  $("#review-detail").innerHTML = rows.map(([k, val]) => `
    <div class="flex border-b border-gray-100 py-2">
      <dt class="w-40 shrink-0 font-semibold text-gray-500">${k}</dt>
      <dd class="flex-1">${esc(val) || '<span class="text-gray-400">—</span>'}</dd>
    </div>`).join("");
  $("#review-status").value = v.status;
  $("#review-level").value = String(v.level);
  $("#review-note").value = "";
  openModal("review-modal");
}
function saveReview() {
  const v = VIOLATIONS[curViol];
  v.status = $("#review-status").value;
  v.level = Number($("#review-level").value);
  v.statusUpdatedBy = "Admin Admin";
  renderViolations();
  closeModal("review-modal");
  announce(`Report ${v.id} updated to ${v.status}.` + (v.status === "Verified" ? " Reporter awarded reward points." : ""));
}

/* ------------------------------------------------------------------ category CRUD */
let curCat = -1;
function openCat(i) {
  curCat = i;
  refreshOwnerSelects();
  $("#cat-modal-title").textContent = i < 0 ? "Add Category" : "Edit Category";
  $("#cat-name").value = i < 0 ? "" : CATEGORIES[i].name;
  $("#cat-desc").value = i < 0 ? "" : CATEGORIES[i].description;
  $("#cat-owner").value = i < 0 ? "" : (CATEGORIES[i].owner || "");
  clearErrors($("#cat-modal"));
  openModal("cat-modal");
}
function saveCat() {
  if (!validateFields($("#cat-modal"))) return;
  const name = $("#cat-name").value.trim(), description = $("#cat-desc").value.trim(), owner = $("#cat-owner").value;
  if (curCat < 0) CATEGORIES.push({ name, description, owner });
  else CATEGORIES[curCat] = { name, description, owner };
  const catNew = curCat < 0;
  renderCategories(); renderViolations(); closeModal("cat-modal");
  announce(catNew ? `Category "${name}" added successfully.` : `Category "${name}" updated successfully.`);
}

/* ------------------------------------------------------------------ owner CRUD */
let curOwner = -1;
function openOwner(i) {
  curOwner = i;
  $("#owner-modal-title").textContent = i < 0 ? "Add Owner" : "Edit Owner";
  $("#owner-name").value = i < 0 ? "" : OWNERS[i].owner;
  $("#owner-desc").value = i < 0 ? "" : OWNERS[i].description;
  clearErrors($("#owner-modal"));
  openModal("owner-modal");
}
function saveOwner() {
  if (!validateFields($("#owner-modal"))) return;
  const owner = $("#owner-name").value.trim(), description = $("#owner-desc").value.trim();
  if (curOwner < 0) OWNERS.push({ owner, description });
  else OWNERS[curOwner] = { owner, description };
  const ownerNew = curOwner < 0;
  renderOwners(); refreshOwnerSelects(); closeModal("owner-modal");
  announce(ownerNew ? `Owner "${owner}" added successfully.` : `Owner "${owner}" updated successfully.`);
}

/* ------------------------------------------------------------------ feedback */
function openFeedback() {
  $("#feedback-form").classList.remove("hidden");
  $("#feedback-sent").classList.add("hidden");
  $("#feedback-foot").classList.remove("hidden");
  ["fb-name", "fb-email", "fb-message"].forEach((id) => { $("#" + id).value = ""; setFieldError($("#" + id), ""); });
  $("#feedback-subject") && ($("#fb-subject").selectedIndex = 0);
  openModal("feedback-modal");
}
function sendFeedback() {
  if (!validateFields($("#feedback-modal"))) return;
  $("#feedback-form").classList.add("hidden");
  $("#feedback-foot").classList.add("hidden");
  $("#feedback-sent").classList.remove("hidden");
  announce("Feedback sent. Thank you!");
}

/* ------------------------------------------------------------------ config */
const BADGE_KEY = "drivesafe_badge_name";
/** Apply the badge name to the "Admin Portal" subtitle on all auth screens. */
function applyBadgeName(name) {
  $$(".badge-name").forEach((el) => { el.textContent = name; });
}
function saveConfig() {
  const v = $("#cfg-badge").value.trim();
  if (!v) { setFieldError($("#cfg-badge"), "Badge Name is required."); return; }
  setFieldError($("#cfg-badge"), "");
  applyBadgeName(v);
  try { localStorage.setItem(BADGE_KEY, v); } catch (_) {}
  announce("Config updated. Badge Name set to \"" + v + "\".");
}
/** On load, restore a previously saved badge name (login shows it below "Admin Portal"). */
function loadBadgeName() {
  let saved = "";
  try { saved = localStorage.getItem(BADGE_KEY) || ""; } catch (_) {}
  if (saved) { applyBadgeName(saved); const i = $("#cfg-badge"); if (i) i.value = saved; }
}

/* ------------------------------------------------------------------ violation filter */
function applyViolFilter() {
  const owner = $("#vf-owner").value;
  const from = $("#vf-from").value, to = $("#vf-to").value;
  let shown = 0;
  $$("#viol-body tr").forEach((tr, i) => {
    const v = VIOLATIONS[i];
    const date = (v.createdAt || "").slice(0, 10);
    const ok = (!owner || ownerForCategory(v.category) === owner)
      && (!from || date >= from) && (!to || date <= to);
    tr.classList.toggle("hidden", !ok);
    if (ok) shown += 1;
  });
  $("#viol-info").textContent = `Showing ${shown} of ${VIOLATIONS.length} entries`;
}
function resetViolFilter() {
  $("#vf-owner").value = ""; $("#vf-from").value = ""; $("#vf-to").value = "";
  $$("#viol-body tr").forEach((tr) => tr.classList.remove("hidden"));
  $("#viol-info").textContent = `Showing 1 to 10 of ${VIOLATIONS_TOTAL} entries`;
}

/* ------------------------------------------------------------------ admin user CRUD */
let curUser = -1;
function openUser(i) {
  curUser = i;
  const u = i < 0 ? { firstName: "", lastName: "", email: "", phone: "", address: "", role: "Administrator", level: "" } : ADMIN_USERS[i];
  $("#user-modal-title").textContent = i < 0 ? "Add User" : "Edit User";
  $("#u-first").value = u.firstName; $("#u-last").value = u.lastName; $("#u-email").value = u.email;
  $("#u-phone").value = u.phone; $("#u-addr").value = u.address; $("#u-role").value = u.role;
  $("#u-level").value = u.level; $("#u-pass").value = "";
  // Password is required only when creating a new user
  const pass = $("#u-pass"), star = $("#u-pass-star"), hint = $("#u-pass-hint");
  if (i < 0) { pass.setAttribute("data-req", ""); star.classList.remove("hidden"); hint.textContent = ""; }
  else { pass.removeAttribute("data-req"); star.classList.add("hidden"); hint.textContent = "Leave blank to keep the current password."; }
  renderPwChecklist("", "upw");
  clearErrors($("#user-modal"));
  refreshSaveButtons();
  openModal("user-modal");
}
function saveUser() {
  if (!validateFields($("#user-modal"))) return;
  const pw = $("#u-pass");
  if (pw.value && !evaluatePassword(pw.value).allMet) {
    setFieldError(pw, "Password does not meet all the requirements.");
    pw.focus(); return;
  }
  const u = {
    firstName: $("#u-first").value.trim(), lastName: $("#u-last").value.trim(),
    email: $("#u-email").value.trim(), phone: $("#u-phone").value.trim(),
    address: $("#u-addr").value.trim(), role: $("#u-role").value, level: $("#u-level").value,
  };
  const userNew = curUser < 0;
  const uName = `${u.firstName} ${u.lastName}`.trim();
  if (curUser < 0) ADMIN_USERS.push(u); else ADMIN_USERS[curUser] = u;
  renderAdminUsers(); closeModal("user-modal");
  announce(userNew ? `User "${uName}" added successfully.` : `User "${uName}" updated successfully.`);
}

/* ------------------------------------------------------------------ contact reply */
let curReply = -1;
function openReply(i) {
  curReply = i;
  const m = CONTACTS[i];
  $("#reply-detail").innerHTML = `
    <div class="flex border-b border-gray-100 py-2"><dt class="w-28 shrink-0 font-semibold text-gray-500">From</dt><dd class="flex-1">${esc(m.name)} &lt;${esc(m.email)}&gt;</dd></div>
    <div class="flex border-b border-gray-100 py-2"><dt class="w-28 shrink-0 font-semibold text-gray-500">Message</dt><dd class="flex-1">${esc(m.message)}</dd></div>
    <div class="flex border-b border-gray-100 py-2"><dt class="w-28 shrink-0 font-semibold text-gray-500">Received</dt><dd class="flex-1">${esc(m.createdAt)}</dd></div>`;
  $("#reply-text").value = m.response || "";
  clearErrors($("#reply-modal"));
  openModal("reply-modal");
}
function saveReply() {
  if (!validateFields($("#reply-modal"))) return;
  const t = $("#reply-text").value.trim();
  CONTACTS[curReply].response = t;
  CONTACTS[curReply].repliedAt = now();
  renderContacts(); closeModal("reply-modal");
  announce(`Reply sent to ${CONTACTS[curReply].name}.`);
}

/* ------------------------------------------------------------------ app user edit */
let curApp = -1;
function openApp(i) {
  curApp = i;
  const u = i < 0 ? { firstName: "", lastName: "", email: "", phone: "", earnerPoints: 0, redeemedPoints: 0 } : APP_USERS[i];
  $("#app-modal-title").textContent = i < 0 ? "Add App User" : "Edit App User";
  $("#a-first").value = u.firstName; $("#a-last").value = u.lastName; $("#a-email").value = u.email;
  $("#a-phone").value = u.phone; $("#a-earn").value = u.earnerPoints; $("#a-red").value = u.redeemedPoints;
  clearErrors($("#app-modal"));
  refreshSaveButtons();
  openModal("app-modal");
}
function saveApp() {
  if (!validateFields($("#app-modal"))) return;
  const u = {
    firstName: $("#a-first").value.trim(), lastName: $("#a-last").value.trim(), email: $("#a-email").value.trim(),
    phone: $("#a-phone").value.trim(), earnerPoints: Number($("#a-earn").value) || 0, redeemedPoints: Number($("#a-red").value) || 0,
  };
  const appNew = curApp < 0;
  if (curApp < 0) APP_USERS.push(u); else APP_USERS[curApp] = u;
  renderAppUsers(); closeModal("app-modal");
  announce(appNew ? `App user ${u.phone} added successfully.` : `App user ${u.phone} updated successfully.`);
}

/* ------------------------------------------------------------------ table search */
function filterTable(input) {
  const q = input.value.toLowerCase();
  const body = $("#" + input.dataset.filter);
  $$("tr", body).forEach((tr) => {
    tr.classList.toggle("hidden", !tr.textContent.toLowerCase().includes(q));
  });
}

/* ------------------------------------------------------------------ navigation */
const NAV_MAP = {
  dashboard: "nav-dashboard", violations: "nav-violations", category: "nav-category",
  owners: "nav-owners", config: "nav-config", contact: "nav-contact",
  users: "nav-users", appusers: "nav-appusers",
};
function go(id) {
  closeAnyModal();
  ["login", "forgot", "otp"].forEach((v) => $("#" + v).classList.add("hidden"));
  $$(".screen").forEach((s) => s.classList.add("hidden"));
  const el = $("#" + id);
  if (el) el.classList.remove("hidden");
  const auth = id === "login" || id === "forgot" || id === "otp";
  $("#shell").classList.toggle("hidden", auth);
  const badge = $("#grecaptcha-badge");
  badge.classList.toggle("hidden", !auth);
  badge.classList.toggle("flex", auth);
  if (id === "forgot") resetForgot();
  if (id === "otp") resetOtp();
  if (id === "profile") resetChangePassword();
  if (!auth) {
    $$(".nav-link").forEach((a) => { a.classList.remove("nav-active"); a.removeAttribute("aria-current"); });
    const n = $("#" + NAV_MAP[id]);
    if (n) { n.classList.add("nav-active"); n.setAttribute("aria-current", "page"); }
    if (id === "users" || id === "appusers") setUM(true);
    if (id === "category" || id === "owners") setGroup("cm", true);
    if (id === "config") setGroup("st", true);
  }
  closeSidebar();
  window.scrollTo(0, 0);
}

/* ------------------------------------------------------------------ sidebar (off-canvas on mobile) */
function openSidebar() {
  $("#sidebar").classList.remove("-translate-x-full");
  $("#backdrop").classList.remove("hidden");
  $("#menu-btn").setAttribute("aria-expanded", "true");
}
function closeSidebar() {
  $("#sidebar").classList.add("-translate-x-full");
  $("#backdrop").classList.add("hidden");
  $("#menu-btn").setAttribute("aria-expanded", "false");
}
/** Expand/collapse a sidebar submenu group by prefix (um | cm | st). */
function setGroup(p, open) {
  $("#" + p + "-sub").classList.toggle("hidden", !open);
  $("#nav-" + p).setAttribute("aria-expanded", String(open));
  $("#" + p + "-caret").classList.toggle("rotate-90", open);
}
function toggleGroup(p) { setGroup(p, $("#" + p + "-sub").classList.contains("hidden")); }
function setUM(open) { setGroup("um", open); }

/* ------------------------------------------------------------------ account dropdown */
function toggleUserMenu() {
  const nowHidden = $("#user-menu").classList.toggle("hidden");
  $("#user-menu-btn").setAttribute("aria-expanded", String(!nowHidden));
}
function closeUserMenu() {
  const m = $("#user-menu");
  if (m && !m.classList.contains("hidden")) {
    m.classList.add("hidden");
    $("#user-menu-btn").setAttribute("aria-expanded", "false");
  }
}

/* ------------------------------------------------------------------ toast + live-region */
/** Show a dismissible toast (type: success | error | info) and announce it for a11y. */
function toast(msg, type = "success") {
  const region = $("#live-region");
  region.textContent = ""; setTimeout(() => (region.textContent = msg), 30);
  const box = $("#toast-container");
  if (!box) return;
  const styles = {
    success: ["border-green-500", "bg-green-50", "text-green-800", "✓", "bg-green-500"],
    error: ["border-red-500", "bg-red-50", "text-red-800", "!", "bg-red-500"],
    info: ["border-brand", "bg-brand/5", "text-gray-800", "i", "bg-brand"],
  }[type] || [];
  const el = document.createElement("div");
  el.className = `pointer-events-auto flex items-start gap-3 rounded-lg border-l-4 ${styles[0]} ${styles[1]} px-4 py-3 shadow-pop transition-all duration-300 translate-x-4 opacity-0`;
  el.setAttribute("role", "status");
  el.innerHTML = `<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${styles[4]} text-xs font-bold text-white">${styles[3]}</span>
    <p class="flex-1 text-sm ${styles[2]}">${esc(msg)}</p>
    <button type="button" aria-label="Dismiss" class="shrink-0 text-gray-400 hover:text-gray-600">×</button>`;
  el.querySelector("button").addEventListener("click", () => remove());
  box.appendChild(el);
  requestAnimationFrame(() => el.classList.remove("translate-x-4", "opacity-0"));
  let done = false;
  function remove() {
    if (done) return; done = true;
    el.classList.add("translate-x-4", "opacity-0");
    setTimeout(() => el.remove(), 300);
  }
  setTimeout(remove, 3500);
}
/** Success messages flow through toast(); kept as announce() for existing call sites. */
function announce(msg) { toast(msg, "success"); }

/* ------------------------------------------------------------------ wire up events */
function toggleMobile(btn) {
  const span = btn.parentElement.querySelector("[data-mobile]");
  const shown = span.dataset.shown === "true";
  span.textContent = shown ? maskMobile(span.dataset.mobile) : span.dataset.mobile;
  span.dataset.shown = shown ? "false" : "true";
  btn.setAttribute("aria-pressed", shown ? "false" : "true");
  btn.setAttribute("aria-label", shown ? "Show full phone number" : "Hide full phone number");
  btn.textContent = shown ? "👁" : "🙈";
}

function bind() {
  // delegated clicks via data-* attributes
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#user-menu") && !e.target.closest("#user-menu-btn")) closeUserMenu();
    const pt = e.target.closest("[data-pw-toggle]");
    if (pt) { togglePw(pt); return; }
    const mt = e.target.closest("[data-mobile-toggle]");
    if (mt) { toggleMobile(mt); return; }
    const t = e.target.closest("[data-go],[data-review],[data-cat-edit],[data-cat-del],[data-owner-edit],[data-owner-del],[data-user-edit],[data-user-del],[data-user-lock],[data-reply],[data-app-edit]");
    if (!t) return;
    if (t.dataset.go !== undefined) go(t.dataset.go);
    else if (t.dataset.review !== undefined) openReview(Number(t.dataset.review));
    else if (t.dataset.catEdit !== undefined) openCat(Number(t.dataset.catEdit));
    else if (t.dataset.catDel !== undefined) { const i = Number(t.dataset.catDel); if (confirm(`Delete category "${CATEGORIES[i].name}"?`)) { CATEGORIES.splice(i, 1); renderCategories(); renderViolations(); } }
    else if (t.dataset.ownerEdit !== undefined) openOwner(Number(t.dataset.ownerEdit));
    else if (t.dataset.ownerDel !== undefined) { const i = Number(t.dataset.ownerDel); if (confirm(`Delete owner "${OWNERS[i].owner}"?`)) { OWNERS.splice(i, 1); renderOwners(); refreshOwnerSelects(); } }
    else if (t.dataset.userEdit !== undefined) openUser(Number(t.dataset.userEdit));
    else if (t.dataset.userDel !== undefined) { const i = Number(t.dataset.userDel); if (confirm(`Delete user ${ADMIN_USERS[i].firstName} ${ADMIN_USERS[i].lastName}?`)) { ADMIN_USERS.splice(i, 1); renderAdminUsers(); } }
    else if (t.dataset.userLock !== undefined) announce("Password reset link sent (concept).");
    else if (t.dataset.reply !== undefined) openReply(Number(t.dataset.reply));
    else if (t.dataset.appEdit !== undefined) openApp(Number(t.dataset.appEdit));
  });

  // action buttons that aren't rows
  $$("[data-action]").forEach((b) => b.addEventListener("click", () => {
    const a = b.dataset.action;
    ({ login: () => { recaptchaV3("login"); otpMode = "login"; pendingEmail = $("#lg-user").value.trim() || "your email"; go("otp"); },
       "user-menu": () => toggleUserMenu(),
       "logout-confirm": () => { closeUserMenu(); openModal("logout-modal"); },
       logout: () => go("login"),
       profile: () => { closeUserMenu(); go("profile"); },
       "save-change-password": saveChangePassword,
       "forgot-send": forgotSend, "otp-verify": otpVerify, "otp-resend": otpResend,
       "cat-add": () => openCat(-1), "user-add": () => openUser(-1), "app-add": () => openApp(-1), "owner-add": () => openOwner(-1),
       "save-review": saveReview, "save-cat": saveCat, "save-user": saveUser, "save-reply": saveReply, "save-app": saveApp, "save-owner": saveOwner,
       "config-save": saveConfig, "viol-filter": applyViolFilter, "viol-reset": resetViolFilter,
       "feedback-open": openFeedback, "feedback-send": sendFeedback,
       "menu-open": openSidebar, "menu-close": closeSidebar,
       "um-toggle": () => toggleGroup("um"), "cm-toggle": () => toggleGroup("cm"), "st-toggle": () => toggleGroup("st"),
    }[a] || (() => {}))();
  }));

  // close buttons / backdrops
  $$("[data-close]").forEach((b) => b.addEventListener("click", () => closeModal(b.dataset.close)));
  $("#backdrop").addEventListener("click", closeSidebar);
  $$(".modal").forEach((m) => m.addEventListener("mousedown", (e) => { if (e.target === m) closeAnyModal(); }));

  // search inputs — "input" also fires when the native clear (✕) empties the field
  $$("[data-filter]").forEach((inp) => {
    inp.addEventListener("input", () => filterTable(inp));
    inp.addEventListener("search", () => filterTable(inp));
  });

  // keyboard: Escape closes modal, account menu, or sidebar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if ($(".modal:not(.hidden)")) closeAnyModal();
      else if (!$("#user-menu").classList.contains("hidden")) closeUserMenu();
      else if (!$("#sidebar").classList.contains("-translate-x-full")) closeSidebar();
    }
  });

  // Strip HTML-dangerous characters from every text field (XSS defense-in-depth).
  // Capture phase → runs BEFORE per-field filters, so they never see "<...>".
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t && t.matches && t.matches('input:not([type=password]):not([type=checkbox]):not([type=radio]):not([type=number]), textarea')) {
      const cleaned = t.value.replace(/[<>]/g, "");
      if (cleaned !== t.value) {
        const pos = Math.max(0, (t.selectionStart ?? t.value.length) - 1);
        t.value = cleaned;
        try { t.setSelectionRange(pos, pos); } catch (_) {}
      }
    }
  }, true);

  // clear a field's error as the user corrects it; keep Save buttons in sync
  document.addEventListener("input", (e) => {
    if (e.target.matches("[aria-describedby]") && e.target.id) setFieldError(e.target, "");
    if (e.target.id === "cp-new") renderPwChecklist(e.target.value, "pw");
    if (e.target.id === "u-pass") renderPwChecklist(e.target.value, "upw");
    refreshSaveButtons();
  });

  // validate a field when the user leaves it (blur) — amber-learn "touched" behaviour
  document.addEventListener("focusout", (e) => {
    const el = e.target;
    if (!el || !el.matches || !el.id || el.id === "u-pass") return;
    if (el.matches("[data-req],[data-pattern],[data-min]") || el.type === "email") validateField(el);
  });

  bindOtpBoxes();
}

/* ------------------------------------------------------------------ boot */
$$(".err").forEach((e) => (e.hidden = true));
renderAll();
loadBadgeName();
bind();
go("login");
