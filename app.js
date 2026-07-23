const state = {
  token: localStorage.getItem("bluestar_token"),
  view: "tasks",
  cache: {}
};

const root = document.querySelector("#view-root");
const toast = document.querySelector("#toast");
const modalRoot = document.querySelector("#modal-root");

const demoStoreKey = "bluestar_static_demo_store";

function defaultStore() {
  return {
    user: { id: "usr_owner", name: "藍星主人", email: "demo@bluestar.local", role: "owner", plan: "專業版", credits: 12880 },
    tasks: [
      { id: "task_001", title: "整理本週市場研究資料", prompt: "整理本週 AI 產業市場趨勢，輸出重點與可執行建議。", model: "GPT-5.5", status: "completed", credits: 860, createdAt: "2026-07-22T09:30:00.000Z" },
      { id: "task_002", title: "製作藍星平台功能海報", prompt: "產出繁體中文 9:16 科技風平台介紹海報。", model: "gpt-image-2", status: "running", credits: 420, createdAt: "2026-07-23T02:10:00.000Z" }
    ],
    schedules: [
      { id: "sch_001", title: "每日早報", detail: "台股、AI 產業與天氣摘要", cadence: "每天 08:00", channel: "Telegram", enabled: true },
      { id: "sch_002", title: "每週工作整理", detail: "整理任務成果與待辦", cadence: "每週一 09:00", channel: "站內", enabled: false }
    ],
    files: [
      { id: "file_001", name: "藍星平台功能總覽.pdf", type: "PDF", size: "2.4 MB", updatedAt: "2026-07-22" },
      { id: "file_002", name: "蝦妹品牌文案.docx", type: "DOCX", size: "384 KB", updatedAt: "2026-07-20" }
    ],
    skills: [
      { id: "skill_research", icon: "⌕", name: "深度研究 Pro", detail: "多查詢搜尋、去重與引用整理", installed: true, tag: "研究" },
      { id: "skill_copy", icon: "✎", name: "文案撰寫", detail: "廣告、社群、產品與品牌內容", installed: true, tag: "內容" },
      { id: "skill_image", icon: "◈", name: "AI 圖片創作", detail: "海報、商品圖與風格視覺", installed: true, tag: "視覺" },
      { id: "skill_sheet", icon: "▦", name: "Excel 進階分析", detail: "公式、樞紐分析與圖表", installed: false, tag: "資料" },
      { id: "skill_seo", icon: "⌁", name: "SEO 審計", detail: "網站結構、內容與關鍵字檢查", installed: false, tag: "成長" },
      { id: "skill_travel", icon: "✈", name: "旅遊規劃", detail: "行程、交通、預算與景點安排", installed: false, tag: "生活" }
    ],
    feedback: [
      { id: "fb_001", name: "王小姐", subject: "想了解企業版", status: "待處理", createdAt: "2026-07-23" },
      { id: "fb_002", name: "陳先生", subject: "技能市集建議", status: "已回覆", createdAt: "2026-07-22" }
    ],
    activity: [
      { text: "任務「整理本週市場研究資料」已完成", time: "今天 09:42", tone: "success" },
      { text: "已安裝技能「AI 圖片創作」", time: "昨天 18:20", tone: "info" },
      { text: "每日早報排程已啟用", time: "昨天 08:00", tone: "warning" }
    ],
    settings: { language: "繁體中文", timezone: "Asia/Taipei", notifications: true, compactMode: false }
  };
}

function loadDemoStore() {
  try {
    return JSON.parse(localStorage.getItem(demoStoreKey)) || defaultStore();
  } catch {
    return defaultStore();
  }
}

function saveDemoStore(store) {
  localStorage.setItem(demoStoreKey, JSON.stringify(store));
}

function parseBody(options) {
  try {
    return JSON.parse(options.body || "{}");
  } catch {
    return {};
  }
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

async function demoApi(path, options = {}) {
  const method = options.method || "GET";
  const store = loadDemoStore();
  const input = parseBody(options);

  if (path === "/api/auth/login" && method === "POST") {
    const email = String(input.email || "demo@bluestar.local").trim();
    store.user.email = email;
    saveDemoStore(store);
    return { token: `demo_${Date.now()}`, user: store.user };
  }
  if (path === "/api/auth/logout" && method === "POST") return { ok: true };
  if (!state.token) throw new Error("請先登入");
  if (path === "/api/auth/me" && method === "GET") return { user: store.user };
  if (path === "/api/dashboard" && method === "GET") {
    return {
      user: store.user,
      stats: {
        totalTasks: store.tasks.length,
        runningTasks: store.tasks.filter((x) => x.status === "running").length,
        installedSkills: store.skills.filter((x) => x.installed).length,
        schedules: store.schedules.filter((x) => x.enabled).length
      },
      recentTasks: store.tasks.slice(0, 6),
      activity: store.activity
    };
  }
  if (path === "/api/tasks" && method === "GET") return { tasks: store.tasks };
  if (path === "/api/tasks" && method === "POST") {
    const task = { id: uid("task"), title: String(input.title || "未命名任務"), prompt: String(input.prompt || ""), model: String(input.model || "GPT-5.5"), status: "queued", credits: 120, createdAt: new Date().toISOString() };
    store.tasks.unshift(task);
    store.activity.unshift({ text: `已建立任務「${task.title}」`, time: "剛剛", tone: "info" });
    saveDemoStore(store);
    return { task };
  }
  if (path.startsWith("/api/tasks/") && method === "PATCH") {
    const task = store.tasks.find((x) => x.id === path.split("/").pop());
    if (!task) throw new Error("找不到任務");
    task.status = input.status || task.status;
    saveDemoStore(store);
    return { task };
  }
  if (path === "/api/skills" && method === "GET") return { skills: store.skills };
  if (path.startsWith("/api/skills/") && method === "PATCH") {
    const skill = store.skills.find((x) => x.id === path.split("/").pop());
    if (!skill) throw new Error("找不到技能");
    skill.installed = !skill.installed;
    saveDemoStore(store);
    return { skill };
  }
  if (path === "/api/schedules" && method === "GET") return { schedules: store.schedules };
  if (path === "/api/schedules" && method === "POST") {
    const schedule = { id: uid("sch"), title: String(input.title || "新排程"), detail: String(input.detail || "自動執行任務"), cadence: String(input.cadence || "每天 09:00"), channel: "站內", enabled: true };
    store.schedules.unshift(schedule);
    saveDemoStore(store);
    return { schedule };
  }
  if (path.startsWith("/api/schedules/") && method === "PATCH") {
    const schedule = store.schedules.find((x) => x.id === path.split("/").pop());
    if (!schedule) throw new Error("找不到排程");
    schedule.enabled = !schedule.enabled;
    saveDemoStore(store);
    return { schedule };
  }
  if (path === "/api/files" && method === "GET") return { files: store.files };
  if (path === "/api/files" && method === "POST") {
    const file = { id: uid("file"), name: String(input.name || "新檔案"), type: String(input.type || "FILE"), size: String(input.size || "0 KB"), updatedAt: new Date().toISOString().slice(0, 10) };
    store.files.unshift(file);
    saveDemoStore(store);
    return { file };
  }
  if (path === "/api/credits" && method === "GET") return { balance: store.user.credits, usage: [{ label: "GPT 對話", value: 3460 }, { label: "圖片創作", value: 1870 }, { label: "研究與檔案", value: 920 }] };
  if (path === "/api/admin/overview" && method === "GET") return { users: 184, activeUsers: 72, revenue: "US$ 8,460", pendingFeedback: store.feedback.filter((x) => x.status === "待處理").length, feedback: store.feedback };
  if (path === "/api/settings" && method === "GET") return { settings: store.settings };
  if (path === "/api/settings" && method === "POST") {
    store.settings.language = input.language || store.settings.language;
    saveDemoStore(store);
    return { ok: true, message: "設定已更新" };
  }
  throw new Error("找不到功能");
}

async function api(path, options = {}) {
  if (path.startsWith("/api/")) return demoApi(path, options);
  const headers = { "content-type": "application/json", ...(options.headers || {}) };
  if (state.token) headers.authorization = `Bearer ${state.token}`;
  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "請求失敗");
  return payload;
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
}

function statusLabel(status) {
  return { completed: "已完成", running: "執行中", queued: "排隊中" }[status] || status;
}

function layout(title, subtitle, action = "") {
  return `<div class="view-header"><div><div class="view-kicker">BLUESTAR WORKSPACE</div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}

function stat(label, value, hint) {
  return `<div class="stat-card"><small>${label}</small><strong>${value}</strong><small>${hint}</small></div>`;
}

async function renderTasks() {
  const data = await api("/api/dashboard");
  state.cache.dashboard = data;
  document.querySelector("#credit-pill").textContent = `蝦飼料：${data.user.credits.toLocaleString()}`;
  document.querySelector("#profile-name").textContent = data.user.name;
  document.querySelector("#avatar").textContent = data.user.name.slice(0, 1);
  root.innerHTML = layout("蝦任務", "把想完成的結果交代給蝦妹，工作區會留下每一步紀錄。", `<button class="button button-primary" id="new-task">＋ 新增任務</button>`) +
    `<div class="dashboard-grid">${stat("全部任務", data.stats.totalTasks, "累積任務")}${stat("執行中", data.stats.runningTasks, "正在處理")}${stat("已安裝技能", data.stats.installedSkills, "可直接使用")}${stat("啟用排程", data.stats.schedules, "自動執行中")}</div>` +
    `<div class="content-grid"><section class="panel"><div class="panel-heading"><h2>最近任務</h2><button class="text-button" id="refresh-tasks">重新整理</button></div>${data.recentTasks.map((task) => `<div class="task-row"><div><div class="task-title">${esc(task.title)}</div><div class="task-meta">${esc(task.model)} · ${new Date(task.createdAt).toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div></div><span class="status status-${task.status}">${statusLabel(task.status)}</span></div>`).join("")}</section><section class="panel"><div class="panel-heading"><h2>活動紀錄</h2></div><div class="panel-body">${data.activity.map((item) => `<div class="activity-item"><span class="activity-dot"></span><div>${esc(item.text)}<small>${esc(item.time)}</small></div></div>`).join("")}</div></section></div>`;
  document.querySelector("#new-task").onclick = showTaskModal;
  document.querySelector("#refresh-tasks").onclick = () => renderTasks().catch(handleError);
}

async function renderSkills() {
  const data = await api("/api/skills");
  root.innerHTML = layout("蝦技能", "安裝你需要的能力，讓蝦妹更貼近你的工作流程。") + `<div class="skill-grid">${data.skills.map((skill) => `<article class="skill-card"><span class="skill-icon">${skill.icon}</span><h3>${esc(skill.name)}</h3><p>${esc(skill.detail)}</p><div class="skill-footer"><span class="tag">${esc(skill.tag)}</span><button class="text-button skill-toggle" data-id="${skill.id}">${skill.installed ? "已安裝" : "安裝技能"}</button></div></article>`).join("")}</div>`;
  document.querySelectorAll(".skill-toggle").forEach((button) => button.onclick = async () => {
    try { await api(`/api/skills/${button.dataset.id}`, { method: "PATCH" }); notify("技能狀態已更新"); renderSkills(); } catch (error) { handleError(error); }
  });
}

async function renderSchedules() {
  const data = await api("/api/schedules");
  root.innerHTML = layout("蝦排程", "設定固定時間的任務，讓日常工作自動往前走。", `<button class="button button-primary" id="new-schedule">＋ 新增排程</button>`) + `<section class="panel">${data.schedules.map((item) => `<div class="list-row"><div><div class="task-title">${esc(item.title)}</div><div class="task-meta">${esc(item.detail)} · ${esc(item.cadence)} · ${esc(item.channel)}</div></div><button class="toggle ${item.enabled ? "on" : ""}" title="切換排程狀態" data-id="${item.id}"></button></div>`).join("")}</section>`;
  document.querySelector("#new-schedule").onclick = showScheduleModal;
  document.querySelectorAll(".toggle").forEach((button) => button.onclick = async () => { try { await api(`/api/schedules/${button.dataset.id}`, { method: "PATCH" }); renderSchedules(); } catch (error) { handleError(error); } });
}

async function renderFiles() {
  const data = await api("/api/files");
  root.innerHTML = layout("龍蝦小包包", "集中查看這個工作區的報告、簡報、文件與素材。", `<button class="button button-primary" id="new-file">＋ 登錄檔案</button>`) + `<section class="panel table-wrap"><table class="data-table"><thead><tr><th>檔案</th><th>類型</th><th>大小</th><th>更新日期</th><th>操作</th></tr></thead><tbody>${data.files.map((file) => `<tr><td><strong>${esc(file.name)}</strong></td><td>${esc(file.type)}</td><td>${esc(file.size)}</td><td>${esc(file.updatedAt)}</td><td><button class="text-button">查看</button></td></tr>`).join("")}</tbody></table></section>`;
  document.querySelector("#new-file").onclick = showFileModal;
}

async function renderCredits() {
  const data = await api("/api/credits");
  const total = data.usage.reduce((sum, item) => sum + item.value, 0);
  root.innerHTML = layout("蝦飼料", "透明查看點數餘額與近期使用方向。") + `<div class="dashboard-grid">${stat("目前餘額", data.balance.toLocaleString(), "點")}${stat("本月使用", total.toLocaleString(), "點")}${stat("方案", "專業版", "每月自動更新")}${stat("用量趨勢", "穩定", "近 30 天")}</div><section class="panel"><div class="panel-heading"><h2>使用分布</h2><span class="tag">近 30 天</span></div><div class="panel-body">${data.usage.map((item) => `<div class="list-row" style="padding:14px 0"><div><strong>${esc(item.label)}</strong><div class="task-meta">${item.value.toLocaleString()} 點</div></div><div style="width:45%"><div class="progress-track"><div class="progress-bar" style="width:${Math.round(item.value / total * 100)}%"></div></div></div></div>`).join("")}</div></section>`;
}

function genericView(title, subtitle, body) {
  root.innerHTML = layout(title, subtitle) + body;
}

async function renderView(view) {
  state.view = view;
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  try {
    if (view === "tasks") return renderTasks();
    if (view === "skills") return renderSkills();
    if (view === "schedules") return renderSchedules();
    if (view === "files") return renderFiles();
    if (view === "credits") return renderCredits();
    if (view === "pricing") return genericView("訂閱方案", "依照使用量升級你的工作能力。", `<div class="pricing-grid"><article class="price-card"><div class="price-label">目前方案</div><h3>專業版</h3><div class="price">$25 <small>/ 月</small></div><ul><li>50,000 蝦飼料點數</li><li>10 個並行任務</li><li>完整模型與技能</li></ul><button class="button button-primary" onclick="notify('升級流程已準備')">管理方案</button></article><article class="price-card price-card-featured"><div class="price-label">推薦</div><h3>企業版</h3><div class="price">客製</div><ul><li>多人座席</li><li>集中計費</li><li>團隊管理儀表板</li></ul><button class="button button-ghost" onclick="notify('已記錄企業諮詢需求')">聯繫我們</button></article></div>`);
    if (view === "admin") return renderAdmin();
    if (view === "settings") return renderSettings();
    if (view === "meeting") return genericView("蝦會議", "錄音、逐字稿與會議重點會集中在這裡。", `<div class="empty-state panel">目前沒有待處理的會議檔案。<br><button class="button button-primary" style="margin-top:18px" onclick="notify('會議上傳入口已準備')">上傳錄音</button></div>`);
    if (view === "tracking") return genericView("追蹤中心", "管理價格追蹤、投資追蹤與長期觀察項目。", `<div class="empty-state panel">尚未建立追蹤項目。<br><button class="button button-primary" style="margin-top:18px" onclick="notify('追蹤項目建立入口已準備')">新增追蹤</button></div>`);
    if (view === "unlock") return genericView("功能解鎖", "查看目前方案可用功能與尚未開放的能力。", `<div class="feature-grid"><article class="feature-card"><span class="feature-icon">◈</span><h3>Google Drive</h3><p>把蝦妹產出的文件整理到你的雲端硬碟。</p></article><article class="feature-card"><span class="feature-icon">◎</span><h3>Notion 工作區</h3><p>搜尋、整理與建立知識文件。</p></article><article class="feature-card"><span class="feature-icon">✉</span><h3>Email 成果寄送</h3><p>把任務結果自動寄到指定信箱。</p></article></div>`);
    if (view === "enterprise") return genericView("企業／團隊", "管理團隊座席、集中計費與企業工作流。", `<section class="panel panel-body"><div class="eyebrow">TEAM WORKSPACE</div><h2>把蝦妹帶進團隊</h2><p style="color:var(--ink-soft);line-height:1.8">目前工作區為單人模式。建立企業方案後，可邀請成員、配置技能與查看團隊用量。</p><button class="button button-primary" onclick="notify('企業邀請功能已準備')">建立企業工作區</button></section>`);
    if (view === "tutorials") return genericView("蝦教室", "從入門到建立自己的 AI 工作流。", `<div class="feature-grid"><article class="feature-card feature-card-wide"><span class="feature-icon">◎</span><h3>第一堂：交代一個清楚的任務</h3><p>學會把目標、限制與交付格式說清楚，讓蝦妹一次完成。</p><div class="feature-tags"><span>入門</span><span>尚未完成</span></div></article><article class="feature-card"><span class="feature-icon">✦</span><h3>技能安裝</h3><p>學會挑選與管理技能。</p></article></div>`);
    if (view === "support") return genericView("站內客服中心", "把使用上的問題、建議與需求交給團隊。", `<section class="panel panel-body"><div class="field"><label>主旨</label><input id="support-subject" placeholder="例如：我想了解企業版" /></div><div class="field"><label>內容</label><textarea id="support-message" placeholder="請描述你的問題或需求"></textarea></div><button class="button button-primary" id="send-support">送出訊息</button></section>`);
  } catch (error) { handleError(error); }
}

async function renderAdmin() {
  const data = await api("/api/admin/overview");
  genericView("管理總覽", "查看整個藍星蝦妹工作區的使用概況與待處理事項。", `<div class="dashboard-grid">${stat("註冊使用者", data.users, "累積帳號")}${stat("目前活躍", data.activeUsers, "近 24 小時")}${stat("本月營收", data.revenue, "訂閱與點數")}${stat("待處理回饋", data.pendingFeedback, "需要回覆")}</div><section class="panel table-wrap"><table class="data-table"><thead><tr><th>使用者</th><th>主旨</th><th>狀態</th><th>日期</th></tr></thead><tbody>${data.feedback.map((item) => `<tr><td>${esc(item.name)}</td><td>${esc(item.subject)}</td><td><span class="status ${item.status === "已回覆" ? "status-completed" : "status-queued"}">${esc(item.status)}</span></td><td>${esc(item.createdAt)}</td></tr>`).join("")}</tbody></table></section>`);
}

async function renderSettings() {
  const data = await api("/api/settings");
  genericView("蝦設定", "管理顯示、通知與工作區偏好。", `<div class="settings-grid"><section class="setting-block"><h3>基本偏好</h3><div class="field"><label>顯示語言</label><select id="setting-language"><option selected>繁體中文</option></select></div><div class="field"><label>時區</label><select id="setting-timezone"><option>Asia/Taipei</option><option>Asia/Shanghai</option></select></div><button class="button button-primary" id="save-settings">儲存設定</button></section><section class="setting-block"><h3>通知與工作區</h3><div class="toggle-row">任務完成通知<button class="toggle ${data.settings.notifications ? "on" : ""}" id="toggle-notifications"></button></div><div class="toggle-row">緊湊列表模式<button class="toggle ${data.settings.compactMode ? "on" : ""}" id="toggle-compact"></button></div></section></div>`);
  document.querySelector("#save-settings").onclick = async () => { await api("/api/settings", { method: "POST", body: JSON.stringify({ language: document.querySelector("#setting-language").value }) }); notify("設定已儲存"); };
  document.querySelectorAll(".setting-block .toggle").forEach((button) => button.onclick = () => button.classList.toggle("on"));
}

function modal(title, content, onSubmit) {
  modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal"><div class="modal-heading"><h2>${title}</h2><button class="modal-close" aria-label="關閉">×</button></div><div class="modal-body">${content}</div></div></div>`;
  modalRoot.querySelector(".modal-close").onclick = () => modalRoot.innerHTML = "";
  modalRoot.querySelector(".modal-backdrop").onclick = (event) => { if (event.target.classList.contains("modal-backdrop")) modalRoot.innerHTML = ""; };
  onSubmit(modalRoot.querySelector(".modal-body"));
}

function showTaskModal() {
  modal("新增 AI 任務", `<div class="field"><label>任務標題</label><input id="task-title" placeholder="例如：整理本週市場研究資料" /></div><div class="field"><label>交代內容</label><textarea id="task-prompt" placeholder="描述你希望蝦妹完成的結果、格式與限制"></textarea></div><div class="field"><label>模型</label><select id="task-model"><option>GPT-5.5</option><option>Gemini 3.1 Pro</option><option>Claude Opus</option><option>gpt-image-2</option><option>Seedance 2.0</option></select></div><div class="modal-actions"><button class="button button-ghost modal-cancel">取消</button><button class="button button-primary" id="submit-task">建立任務</button></div>`, (body) => {
    body.querySelector(".modal-cancel").onclick = () => modalRoot.innerHTML = "";
    body.querySelector("#submit-task").onclick = async () => {
      try { await api("/api/tasks", { method: "POST", body: JSON.stringify({ title: body.querySelector("#task-title").value, prompt: body.querySelector("#task-prompt").value, model: body.querySelector("#task-model").value }) }); modalRoot.innerHTML = ""; notify("任務已建立"); renderTasks(); } catch (error) { handleError(error); }
    };
  });
}

function showScheduleModal() {
  modal("新增排程", `<div class="field"><label>排程名稱</label><input id="schedule-title" placeholder="例如：每日早報" /></div><div class="field"><label>執行內容</label><input id="schedule-detail" placeholder="例如：台股、AI 產業與天氣摘要" /></div><div class="field"><label>頻率</label><select id="schedule-cadence"><option>每天 08:00</option><option>每天 18:00</option><option>每週一 09:00</option></select></div><div class="modal-actions"><button class="button button-ghost modal-cancel">取消</button><button class="button button-primary" id="submit-schedule">建立排程</button></div>`, (body) => {
    body.querySelector(".modal-cancel").onclick = () => modalRoot.innerHTML = "";
    body.querySelector("#submit-schedule").onclick = async () => { try { await api("/api/schedules", { method: "POST", body: JSON.stringify({ title: body.querySelector("#schedule-title").value, detail: body.querySelector("#schedule-detail").value, cadence: body.querySelector("#schedule-cadence").value }) }); modalRoot.innerHTML = ""; notify("排程已建立"); renderSchedules(); } catch (error) { handleError(error); } };
  });
}

function showFileModal() {
  modal("登錄檔案", `<div class="field"><label>檔案名稱</label><input id="file-name" placeholder="例如：品牌簡報.pdf" /></div><div class="field"><label>檔案類型</label><select id="file-type"><option>PDF</option><option>DOCX</option><option>XLSX</option><option>PNG</option><option>MP4</option></select></div><div class="field"><label>大小</label><input id="file-size" placeholder="例如：1.2 MB" /></div><div class="modal-actions"><button class="button button-ghost modal-cancel">取消</button><button class="button button-primary" id="submit-file">登錄檔案</button></div>`, (body) => {
    body.querySelector(".modal-cancel").onclick = () => modalRoot.innerHTML = "";
    body.querySelector("#submit-file").onclick = async () => { try { await api("/api/files", { method: "POST", body: JSON.stringify({ name: body.querySelector("#file-name").value, type: body.querySelector("#file-type").value, size: body.querySelector("#file-size").value }) }); modalRoot.innerHTML = ""; notify("檔案已登錄"); renderFiles(); } catch (error) { handleError(error); } };
  });
}

function handleError(error) {
  if (error.message === "請先登入") return showLogin();
  notify(error.message || "操作失敗");
}

function showLogin() {
  modal("登入藍星蝦妹", `<div class="field"><label>電子郵件</label><input id="login-email" type="email" placeholder="your@email.com" /></div><div class="field"><label>密碼</label><input id="login-password" type="password" placeholder="至少 8 個字元" /></div><div class="modal-actions"><button class="button button-primary" id="submit-login">登入</button></div><p style="color:var(--ink-soft);font-size:12px;margin:14px 0 0">公開展示版可使用任意信箱登入體驗，資料只會保存在目前瀏覽器。</p>`, (body) => {
    body.querySelector("#submit-login").onclick = async () => {
      try {
        const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email: body.querySelector("#login-email").value, password: body.querySelector("#login-password").value }) });
        state.token = data.token; localStorage.setItem("bluestar_token", state.token); modalRoot.innerHTML = ""; notify("登入成功"); renderView(state.view);
      } catch (error) { notify(error.message); }
    };
  });
}

document.querySelectorAll(".nav-item").forEach((button) => button.onclick = () => renderView(button.dataset.view));
document.querySelector("#logout").onclick = async () => { try { await api("/api/auth/logout", { method: "POST" }); } catch {} localStorage.removeItem("bluestar_token"); state.token = null; showLogin(); };
document.querySelector("#profile-button").onclick = () => renderView("settings");

async function boot() {
  try {
    if (!state.token) return showLogin();
    await api("/api/auth/me");
    await renderTasks();
  } catch {
    localStorage.removeItem("bluestar_token");
    state.token = null;
    showLogin();
  }
}

boot();
