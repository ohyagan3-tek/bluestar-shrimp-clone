const state = {
  token: localStorage.getItem("bluestar_token"),
  view: "tasks",
  cache: {},
  skillFilter: "全部",
  skillQuery: ""
};

const skillCatalogVersion = "jennie-marketplace-20260723";
const jennieMarketplaceSkills = [
  {
    "id": "jennie_stock-analysis",
    "sourceId": "f313f9ba-e579-4691-a715-7a7b06877906",
    "order": 1,
    "icon": "📉",
    "name": "📉 股票分析",
    "detail": "基本面、技術面分析、股價走勢、財務指標",
    "tag": "財經",
    "category": "finance",
    "tier": "基礎",
    "installs": 136
  },
  {
    "id": "jennie_copywriting",
    "sourceId": "87f372eb-a7e5-4b89-980c-cd0dfa9bee87",
    "order": 2,
    "icon": "✍️",
    "name": "✍️ 文案撰寫",
    "detail": "社群貼文、廣告文案、行銷標題、品牌文案",
    "tag": "行銷",
    "category": "marketing",
    "tier": "基礎",
    "installs": 85
  },
  {
    "id": "jennie_ai-humanizer",
    "sourceId": "7837dc72-7ad9-4f12-821a-3a387cbe36ec",
    "order": 3,
    "icon": "🤖",
    "name": "🤖→👤 AI 文字人性化",
    "detail": "讓 AI 生成的文字更自然、更像真人寫的",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 58
  },
  {
    "id": "jennie_ai-travel",
    "sourceId": "57f0c6e6-e5f5-4a3d-af54-086b01f86dea",
    "order": 4,
    "icon": "✈️",
    "name": "✈️ 旅遊規劃",
    "detail": "行程安排、景點推薦、費用估算、交通規劃",
    "tag": "生活娛樂",
    "category": "lifestyle",
    "tier": "基礎",
    "installs": 36
  },
  {
    "id": "jennie_excel-xlsx",
    "sourceId": "48b687d7-5c2c-4a2f-b130-a8442af60579",
    "order": 5,
    "icon": "📊",
    "name": "📊 Excel 進階",
    "detail": "進階 Excel 操作：公式、圖表、樞紐分析、格式化",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 33
  },
  {
    "id": "jennie_boost-prompt",
    "sourceId": "788149eb-9220-4936-a939-76a45fe4fed7",
    "order": 6,
    "icon": "🚀",
    "name": "🚀 Prompt 優化",
    "detail": "自動改善問題品質，讓 AI 給出更好的回答",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 30
  },
  {
    "id": "jennie_marketing-ideas",
    "sourceId": "e033e075-567d-4449-8194-0ffdd536a16d",
    "order": 7,
    "icon": "💡",
    "name": "💡 行銷創意",
    "detail": "行銷活動點子、促銷策略、品牌推廣創意",
    "tag": "行銷",
    "category": "marketing",
    "tier": "基礎",
    "installs": 18
  },
  {
    "id": "jennie_summarize",
    "sourceId": "5e46ec31-c91e-4fef-afa3-9221298ecf20",
    "order": 8,
    "icon": "📝",
    "name": "📝 智能摘要",
    "detail": "自動摘要網頁、文件和長文，提取核心觀點",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 17
  },
  {
    "id": "jennie_word-docx",
    "sourceId": "2c3ef71c-123d-488c-82d4-1e6e57aea912",
    "order": 9,
    "icon": "📝",
    "name": "📝 Word 進階",
    "detail": "結構化 Word 文件：報告、提案、合約模板",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 15
  },
  {
    "id": "jennie_ppt-generator",
    "sourceId": "66308b9d-c021-476c-b22d-230f5d384302",
    "order": 10,
    "icon": "📊",
    "name": "📊 PPT 生成",
    "detail": "快速產出專業簡報大綱、內容和 PPTX 檔案",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 14
  },
  {
    "id": "jennie_content-strategy",
    "sourceId": "d9c0ca20-068b-4010-b6b0-76224f7d8a06",
    "order": 11,
    "icon": "📈",
    "name": "📈 內容策略",
    "detail": "內容日曆、SEO 規劃、受眾分析、內容矩陣",
    "tag": "行銷",
    "category": "marketing",
    "tier": "基礎",
    "installs": 13
  },
  {
    "id": "jennie_document-parser",
    "sourceId": "ac97bd70-bebc-43aa-9699-b8591d685acb",
    "order": 12,
    "icon": "📄",
    "name": "📄 文件解析",
    "detail": "PDF、Word、Excel 文件內容分析與資料提取",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 11
  },
  {
    "id": "jennie_廣告文案撰寫",
    "sourceId": "6526da64-3723-4f8f-890e-4ff1b486aa04",
    "order": 13,
    "icon": "🤖",
    "name": "廣告文案撰寫",
    "detail": "I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, deve...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 9
  },
  {
    "id": "jennie_javascript-控制台",
    "sourceId": "37e59417-4eda-418a-aa17-841796e46bed",
    "order": 14,
    "icon": "💻",
    "name": "JavaScript 控制台",
    "detail": "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only re...",
    "tag": "程式開發",
    "category": "coding",
    "tier": "基礎",
    "installs": 9
  },
  {
    "id": "jennie_deep-research-pro",
    "sourceId": "0914bb19-e362-4694-884f-67cda6807324",
    "order": 15,
    "icon": "🔬",
    "name": "🔬 深度研究 Pro",
    "detail": "多查詢搜尋 + 自動去重 + 結構化報告（含引用來源）",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 8
  },
  {
    "id": "jennie_markdown-converter",
    "sourceId": "345c9f2e-6af0-492a-8b67-944ffa6a2aa1",
    "order": 16,
    "icon": "🔄",
    "name": "🔄 格式轉換",
    "detail": "Markdown 與 HTML、Word、PDF 等格式互轉",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 7
  },
  {
    "id": "jennie_小說家",
    "sourceId": "0eff87bf-0718-435a-bf1c-3dec40205dba",
    "order": 17,
    "icon": "🤖",
    "name": "小說家",
    "detail": "I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choo...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 6
  },
  {
    "id": "jennie_academic-deep-research",
    "sourceId": "89f1e013-8491-4c79-8fdf-fee1ede17569",
    "order": 18,
    "icon": "🎓",
    "name": "🎓 學術研究",
    "detail": "文獻搜尋、論文摘要、引用格式化、研究方法論",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 6
  },
  {
    "id": "jennie_copy-editing",
    "sourceId": "fa2eed42-9404-4668-b278-fa54347a6e54",
    "order": 19,
    "icon": "✏️",
    "name": "✏️ 校對編輯",
    "detail": "文法檢查、風格修正、一致性校對、中英雙語",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 5
  },
  {
    "id": "jennie_勵志教練",
    "sourceId": "31327c91-e4d1-430f-8887-d860a571555e",
    "order": 20,
    "icon": "📚",
    "name": "勵志教練",
    "detail": "I want you to act as a motivational coach. I will provide you with some information about someone's goals and challenges, and it will be your job to c...",
    "tag": "教育學習",
    "category": "education",
    "tier": "基礎",
    "installs": 5
  },
  {
    "id": "jennie_marketing-psychology",
    "sourceId": "a7e41cfc-fc63-4b4e-8abf-f5fcf571c43d",
    "order": 21,
    "icon": "🧠",
    "name": "🧠 行銷心理學",
    "detail": "消費者行為分析、說服技巧、認知偏見應用",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 5
  },
  {
    "id": "jennie_數學老師",
    "sourceId": "d0b21ba7-bc56-4e52-8014-df9682005d65",
    "order": 22,
    "icon": "📚",
    "name": "數學老師",
    "detail": "I want you to act as a math teacher. I will provide some mathematical equations or concepts, and it will be your job to explain them in easy-to-unders...",
    "tag": "教育學習",
    "category": "education",
    "tier": "基礎",
    "installs": 5
  },
  {
    "id": "jennie_paid-ads",
    "sourceId": "ba18bd4e-c442-4f01-abc8-974f3c80a0ec",
    "order": 23,
    "icon": "💳",
    "name": "💳 付費廣告",
    "detail": "Google Ads、Facebook 廣告策略、文案和受眾設定",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 5
  },
  {
    "id": "jennie_yahoo-finance",
    "sourceId": "329b64af-886d-493b-8f71-890519747b8d",
    "order": 24,
    "icon": "📊",
    "name": "📊 Yahoo 財經",
    "detail": "即時股價查詢、財務報表分析、歷史數據",
    "tag": "財經",
    "category": "finance",
    "tier": "進階",
    "installs": 5
  },
  {
    "id": "jennie_廚師",
    "sourceId": "fea953d0-5c9a-4186-af8a-887c70356fa5",
    "order": 25,
    "icon": "🌟",
    "name": "廚師",
    "detail": "I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough t...",
    "tag": "生活娛樂",
    "category": "lifestyle",
    "tier": "基礎",
    "installs": 5
  },
  {
    "id": "jennie_會計師",
    "sourceId": "8f8f3e7f-4f45-48a8-b95a-2d7dd74902bb",
    "order": 26,
    "icon": "💰",
    "name": "會計師",
    "detail": "I want you to act as an accountant and come up with creative ways to manage finances. You'll need to consider budgeting, investment strategies and ris...",
    "tag": "財經",
    "category": "finance",
    "tier": "進階",
    "installs": 5
  },
  {
    "id": "jennie_competitor-alternatives",
    "sourceId": "2c7e2a6d-a403-4286-b3ec-9259c1d8ea8d",
    "order": 27,
    "icon": "🏆",
    "name": "🏆 競品分析",
    "detail": "競爭對手深度分析：功能比較、定位、優劣勢",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 4
  },
  {
    "id": "jennie_programmatic-seo",
    "sourceId": "ceca8afd-0349-4c6e-9bb4-a2baef676357",
    "order": 28,
    "icon": "🌐",
    "name": "🌐 程式化 SEO",
    "detail": "大規模 SEO 頁面策略：模板、關鍵字矩陣、自動化",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 4
  },
  {
    "id": "jennie_uxui-設計師",
    "sourceId": "09e8f93c-a30a-41b5-ad05-e7f3f2cdbad9",
    "order": 29,
    "icon": "🤖",
    "name": "UX/UI 設計師",
    "detail": "I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 4
  },
  {
    "id": "jennie_seo-audit",
    "sourceId": "1a20f2f5-8f2d-42d9-8e08-1315afbfd5fc",
    "order": 30,
    "icon": "🔍",
    "name": "🔍 SEO 審計",
    "detail": "完整 SEO 健檢報告：技術 SEO、內容 SEO、外部連結",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 4
  },
  {
    "id": "jennie_脫口秀演員",
    "sourceId": "603034a0-fb3b-4b41-a6ed-d1a49f4c6efc",
    "order": 31,
    "icon": "🎨",
    "name": "脫口秀演員",
    "detail": "I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and obs...",
    "tag": "創意寫作",
    "category": "creative",
    "tier": "基礎",
    "installs": 4
  },
  {
    "id": "jennie_linux-終端機模擬器",
    "sourceId": "2e2d7e2d-5087-481b-8c38-b6182aab7063",
    "order": 32,
    "icon": "💻",
    "name": "Linux 終端機模擬器",
    "detail": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the t...",
    "tag": "程式開發",
    "category": "coding",
    "tier": "進階",
    "installs": 4
  },
  {
    "id": "jennie_旅遊指南",
    "sourceId": "317cb4ec-3bcd-4bce-90c6-f2b51f5978d6",
    "order": 33,
    "icon": "🌟",
    "name": "旅遊指南",
    "detail": "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also g...",
    "tag": "生活娛樂",
    "category": "lifestyle",
    "tier": "基礎",
    "installs": 4
  },
  {
    "id": "jennie_excel-試算表助手",
    "sourceId": "efff238b-726d-410d-b704-96251702e079",
    "order": 34,
    "icon": "📋",
    "name": "Excel 試算表助手",
    "detail": "I want you to act as a text based excel. you'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L)...",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 4
  },
  {
    "id": "jennie_shopping-comparison",
    "sourceId": "8bee6281-35a1-4252-89b3-3dd1b8b2d84b",
    "order": 35,
    "icon": "🛒",
    "name": "🛒 購物比價",
    "detail": "搜尋各大電商（momo、PChome、Shopee、Yahoo、Amazon）比較同品項價格，提供卡片式比較表",
    "tag": "生活娛樂",
    "category": "lifestyle",
    "tier": "進階",
    "installs": 4
  },
  {
    "id": "jennie_clean-content-fetch",
    "sourceId": "54df0087-1b4e-4036-9e9d-f6b906514624",
    "order": 36,
    "icon": "🧹",
    "name": "🧹 乾淨讀取",
    "detail": "清理網頁雜訊，只提取核心文章內容",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 4
  },
  {
    "id": "jennie_launch-strategy",
    "sourceId": "6634e3c9-493e-42c0-b6dd-0bcbee65335c",
    "order": 37,
    "icon": "🚀",
    "name": "🚀 產品上市策略",
    "detail": "新產品發布計畫：時間軸、行銷、PR、社群",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 3
  },
  {
    "id": "jennie_故事講述家",
    "sourceId": "6b211151-856a-4580-b4ed-3f92a6b93c0e",
    "order": 38,
    "icon": "🤖",
    "name": "故事講述家",
    "detail": "I want you to act as a storyteller. You will come up with entertaining stories that are engaging, imaginative and captivating for the audience. It can...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 3
  },
  {
    "id": "jennie_ai-寫作導師",
    "sourceId": "9d12971a-0882-4c38-80dd-b72e3dc39175",
    "order": 39,
    "icon": "🤖",
    "name": "AI 寫作導師",
    "detail": "I want you to act as an AI writing tutor. I will provide you with a student who needs help improving their writing and your task is to use artificial ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 3
  },
  {
    "id": "jennie_饒舌歌手",
    "sourceId": "e70d85d5-fe1d-4323-a3ae-ba4bd1ee9e65",
    "order": 40,
    "icon": "🎨",
    "name": "饒舌歌手",
    "detail": "I want you to act as a rapper. You will come up with powerful and meaningful lyrics, beats and rhythm that can 'wow' the audience. Your lyrics should ...",
    "tag": "創意寫作",
    "category": "creative",
    "tier": "基礎",
    "installs": 3
  },
  {
    "id": "jennie_編劇",
    "sourceId": "9487dbfa-e467-4d26-9e02-65afa2ca092b",
    "order": 41,
    "icon": "🎨",
    "name": "編劇",
    "detail": "I want you to act as a screenwriter. You will develop an engaging and creative script for either a feature length film, or a Web Series that can capti...",
    "tag": "創意寫作",
    "category": "creative",
    "tier": "進階",
    "installs": 2
  },
  {
    "id": "jennie_pricing-strategy",
    "sourceId": "239ed35e-9581-4dea-9322-dd514cad6c3e",
    "order": 42,
    "icon": "💰",
    "name": "💰 定價策略",
    "detail": "競品定價分析、最佳定價建議、價值定位",
    "tag": "財經",
    "category": "finance",
    "tier": "進階",
    "installs": 2
  },
  {
    "id": "jennie_email-sequence",
    "sourceId": "3cacf932-3ab4-4cb1-807f-e842ecb3e3a5",
    "order": 43,
    "icon": "📧",
    "name": "📧 Email 行銷",
    "detail": "自動化 Email 序列設計、文案撰寫、A/B 測試",
    "tag": "行銷",
    "category": "marketing",
    "tier": "進階",
    "installs": 2
  },
  {
    "id": "jennie_心理健康顧問",
    "sourceId": "39cdbf1f-1613-44a9-86af-f7ceecfaf5ce",
    "order": 44,
    "icon": "🏥",
    "name": "心理健康顧問",
    "detail": "I want you to act as a mental health adviser. I will provide you with an individual looking for guidance and advice on managing their emotions, stress...",
    "tag": "健康醫療",
    "category": "health",
    "tier": "進階",
    "installs": 2
  },
  {
    "id": "jennie_人生教練",
    "sourceId": "70b324b6-7fec-4f0f-9584-d477c12b3731",
    "order": 45,
    "icon": "🤖",
    "name": "人生教練",
    "detail": "I want you to act as a life coach. I will provide some details about my current situation and goals, and it will be your job to come up with strategie...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 2
  },
  {
    "id": "jennie_辯論教練",
    "sourceId": "077a4125-9dea-441a-9d4c-56feaf476573",
    "order": 46,
    "icon": "📚",
    "name": "辯論教練",
    "detail": "I want you to act as a debate coach. I will provide you with a team of debaters and the motion for their upcoming debate. Your goal is to prepare the ...",
    "tag": "教育學習",
    "category": "education",
    "tier": "基礎",
    "installs": 2
  },
  {
    "id": "jennie_詩人",
    "sourceId": "f7749dee-29ae-432a-ad00-9cce7d523c95",
    "order": 47,
    "icon": "🎨",
    "name": "詩人",
    "detail": "I want you to act as a poet. You will create poems that evoke emotions and have the power to stir people's soul. Write on any topic or theme but make ...",
    "tag": "創意寫作",
    "category": "creative",
    "tier": "基礎",
    "installs": 2
  },
  {
    "id": "jennie_抄襲檢查器",
    "sourceId": "9dcd6e50-07b3-43ef-9c6c-576028598dac",
    "order": 48,
    "icon": "📋",
    "name": "抄襲檢查器",
    "detail": "I want you to act as a plagiarism checker. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the g...",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 2
  },
  {
    "id": "jennie_prompt-lookup",
    "sourceId": "ec424139-f9b2-499f-b2f5-0f6d0ebd7371",
    "order": 49,
    "icon": "🤖",
    "name": "prompt-lookup",
    "detail": "Activates when the user asks about AI prompts, needs prompt templates, wants to search for prompts, or mentions prompts.chat. Use for discovering, retrieving, and improving prompts.",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 2
  },
  {
    "id": "jennie_資安專家",
    "sourceId": "1e3b9c16-29c3-48c7-bccc-aa3772f46484",
    "order": 50,
    "icon": "🤖",
    "name": "資安專家",
    "detail": "I want you to act as a cyber security specialist. I will provide some specific information about how data is stored and shared, and it will be your jo...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 1
  },
  {
    "id": "jennie_影評家",
    "sourceId": "79f86f9e-dcac-433b-b03a-2524fe24118b",
    "order": 51,
    "icon": "🎨",
    "name": "影評家",
    "detail": "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting a...",
    "tag": "創意寫作",
    "category": "creative",
    "tier": "進階",
    "installs": 1
  },
  {
    "id": "jennie_dentist",
    "sourceId": "28d9dfda-96b8-4db2-afdb-c746fe0a7480",
    "order": 52,
    "icon": "🌟",
    "name": "Dentist",
    "detail": "I want you to act as a dentist. I will provide you with details on an individual looking for dental services such as x-rays, cleanings, and other trea...",
    "tag": "生活娛樂",
    "category": "lifestyle",
    "tier": "進階",
    "installs": 1
  },
  {
    "id": "jennie_私人教練",
    "sourceId": "811b6e05-9144-4fb4-835d-b09c0a1fffc1",
    "order": 53,
    "icon": "🏥",
    "name": "私人教練",
    "detail": "I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger and...",
    "tag": "健康醫療",
    "category": "health",
    "tier": "進階",
    "installs": 1
  },
  {
    "id": "jennie_職涯顧問",
    "sourceId": "9bf1f6af-dc5d-44e4-aa94-2fd1a2a4f665",
    "order": 54,
    "icon": "🤖",
    "name": "職涯顧問",
    "detail": "I want you to act as a career counselor. I will provide you with an individual looking for guidance in their professional life, and your task is to he...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_composer",
    "sourceId": "3605051c-2bb9-4b13-846b-7e8b049c314a",
    "order": 55,
    "icon": "🔧",
    "name": "Composer",
    "detail": "I want you to act as a composer. I will provide the lyrics to a song and you will create music for it. This could include using various instruments or...",
    "tag": "通用",
    "category": "general",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_motivational-speaker",
    "sourceId": "73edfc55-ed4d-4679-94f7-811db9018163",
    "order": 56,
    "icon": "🤖",
    "name": "Motivational Speaker",
    "detail": "I want you to act as a motivational speaker. Put together words that inspire action and make people feel empowered to do something beyond their abilit...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_relationship-coach",
    "sourceId": "5a4c5021-0f08-4f07-b0bb-e110dc05e3aa",
    "order": 57,
    "icon": "🤖",
    "name": "Relationship Coach",
    "detail": "I want you to act as a relationship coach. I will provide some details about the two people involved in a conflict, and it will be your job to come up...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_哲學家",
    "sourceId": "c6c214d9-ce10-47c3-9320-b33c3a06083a",
    "order": 58,
    "icon": "🤖",
    "name": "哲學家",
    "detail": "I want you to act as a philosopher. I will provide some topics or questions related to the study of philosophy, and it will be your job to explore the...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_book-translation",
    "sourceId": "dab0ce87-6f4d-4805-a858-8427107c1bb4",
    "order": 59,
    "icon": "🤖",
    "name": "book-translation",
    "detail": "Translate \"The Interactive Book of Prompting\" chapters and UI strings to a new language",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_widget-generator",
    "sourceId": "d67f69be-f684-47a3-83c2-1e5546d00ec0",
    "order": 60,
    "icon": "🤖",
    "name": "widget-generator",
    "detail": "Generate customizable widget plugins for the prompts.chat feed system",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_skill-lookup",
    "sourceId": "a3cbf2ee-66b8-4681-aca9-086988204af1",
    "order": 61,
    "icon": "🤖",
    "name": "skill-lookup",
    "detail": ">",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_面試官模擬",
    "sourceId": "092ce5c0-adfc-4d5f-ab6c-c00e13aae417",
    "order": 62,
    "icon": "🤖",
    "name": "面試官模擬",
    "detail": "I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the ${Position:Software Developer} positi...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_英文翻譯與改善",
    "sourceId": "1fb43ab0-2aa7-4391-9416-4d77c6822d43",
    "order": 63,
    "icon": "📋",
    "name": "英文翻譯與改善",
    "detail": "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, tra...",
    "tag": "生產力",
    "category": "productivity",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_spoken-english-teacher-and-improver",
    "sourceId": "1d0cbe32-ada2-49fb-927b-66fd5a081105",
    "order": 64,
    "icon": "📋",
    "name": "Spoken English Teacher and Improver",
    "detail": "I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken E...",
    "tag": "生產力",
    "category": "productivity",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_ai-assisted-doctor",
    "sourceId": "8a891b17-bb2e-4553-a4e4-3bf9468a7c2a",
    "order": 65,
    "icon": "🤖",
    "name": "AI Assisted Doctor",
    "detail": "I want you to act as an AI assisted doctor. I will provide you with details of a patient, and your task is to use the latest artificial intelligence t...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_以太坊開發者",
    "sourceId": "dd921987-4259-4b96-b1bd-962441fd8849",
    "order": 66,
    "icon": "🤖",
    "name": "以太坊開發者",
    "detail": "Imagine you are an experienced Ethereum developer tasked with creating a smart contract for a blockchain messenger. The objective is to save messages ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_commentariat",
    "sourceId": "367bf289-78ce-4724-92cd-c0ebb1724c2b",
    "order": 67,
    "icon": "🤖",
    "name": "Commentariat",
    "detail": "I want you to act as a commentariat. I will provide you with news related stories or topics and you will write an opinion piece that provides insightf...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_etymologist",
    "sourceId": "bb41d07c-066f-4e8f-b7f3-2d6b24ee335b",
    "order": 68,
    "icon": "🤖",
    "name": "Etymologist",
    "detail": "I want you to act as a etymologist. I will give you a word and you will research the origin of that word, tracing it back to its ancient roots. You sh...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_real-estate-agent",
    "sourceId": "81a97e38-1027-4406-9177-5736b3a94e74",
    "order": 69,
    "icon": "🤖",
    "name": "Real Estate Agent",
    "detail": "I want you to act as a real estate agent. I will provide you with details on an individual looking for their dream home, and your role is to help them...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_automobile-mechanic",
    "sourceId": "59172724-4812-434f-8752-688a5f564439",
    "order": 70,
    "icon": "🤖",
    "name": "Automobile Mechanic",
    "detail": "Need somebody with expertise on automobiles regarding troubleshooting solutions like; diagnosing problems/errors present both visually & within engine...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_character",
    "sourceId": "35ebbf95-81a4-40a4-a94a-a12e1a2e821b",
    "order": 71,
    "icon": "🔧",
    "name": "Character",
    "detail": "I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} ...",
    "tag": "通用",
    "category": "general",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_debater",
    "sourceId": "a1d1981b-3a11-4ae6-a3de-8dd32ae80ebe",
    "order": 72,
    "icon": "🤖",
    "name": "Debater",
    "detail": "I want you to act as a debater. I will provide you with some topics related to current events and your task is to research both sides of the debates, ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_football-commentator",
    "sourceId": "b5c0e7a8-c07e-4cce-85f4-2889599bcd67",
    "order": 73,
    "icon": "🔧",
    "name": "Football Commentator",
    "detail": "I want you to act as a football commentator. I will give you descriptions of football matches in progress and you will commentate on the match, provid...",
    "tag": "通用",
    "category": "general",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_logistician",
    "sourceId": "49707097-93e0-4460-8650-056d91bd4a5f",
    "order": 74,
    "icon": "🤖",
    "name": "Logistician",
    "detail": "I want you to act as a logistician. I will provide you with details on an upcoming event, such as the number of people attending, the location, and ot...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_magician",
    "sourceId": "30332fd5-c711-43f4-a3b6-c121a138bec5",
    "order": 75,
    "icon": "🤖",
    "name": "Magician",
    "detail": "I want you to act as a magician. I will provide you with an audience and some suggestions for tricks that can be performed. Your goal is to perform th...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_pet-behaviorist",
    "sourceId": "ecbfd4b5-4da4-46f0-95f5-1fc52b43c834",
    "order": 76,
    "icon": "🤖",
    "name": "Pet Behaviorist",
    "detail": "I want you to act as a pet behaviorist. I will provide you with a pet and their owner and your goal is to help the owner understand why their pet has ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_philosophy-teacher",
    "sourceId": "275d200c-bc8d-4155-8777-b10571e60507",
    "order": 77,
    "icon": "🤖",
    "name": "Philosophy Teacher",
    "detail": "I want you to act as a philosophy teacher. I will provide some topics related to the study of philosophy, and it will be your job to explain these con...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_recruiter",
    "sourceId": "31bc1c29-93a1-402c-859b-edec64d0109f",
    "order": 78,
    "icon": "🤖",
    "name": "Recruiter",
    "detail": "I want you to act as a recruiter. I will provide some information about job openings, and it will be your job to come up with strategies for sourcing ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_web-design-consultant",
    "sourceId": "676442c0-ade2-468a-9845-1f8dfeef3144",
    "order": 79,
    "icon": "🤖",
    "name": "Web Design Consultant",
    "detail": "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping ...",
    "tag": "AI 工具",
    "category": "ai",
    "tier": "進階",
    "installs": 0
  },
  {
    "id": "jennie_英文發音助手",
    "sourceId": "fc9963d6-1490-4ba5-a798-03dc49e6d301",
    "order": 80,
    "icon": "📋",
    "name": "英文發音助手",
    "detail": "I want you to act as an English pronunciation assistant for ${Mother Language:Turkish} speaking people. I will write you sentences and you will only a...",
    "tag": "生產力",
    "category": "productivity",
    "tier": "基礎",
    "installs": 0
  },
  {
    "id": "jennie_醫生",
    "sourceId": "e15a1a95-005d-4fd7-806e-236c9ef03df0",
    "order": 81,
    "icon": "🎨",
    "name": "醫生",
    "detail": "I want you to act as a doctor and come up with creative treatments for illnesses or diseases. You should be able to recommend conventional medicines, ...",
    "tag": "創意寫作",
    "category": "creative",
    "tier": "基礎",
    "installs": 0
  }
];

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
    skills: jennieMarketplaceSkills.map((skill, index) => ({ ...skill, installed: index < 8 })),
    catalogVersion: skillCatalogVersion,
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
    const store = JSON.parse(localStorage.getItem(demoStoreKey)) || defaultStore();
    if (store.catalogVersion !== skillCatalogVersion) {
      const defaults = defaultStore();
      store.skills = defaults.skills;
      store.catalogVersion = skillCatalogVersion;
      store.activity = defaults.activity;
      saveDemoStore(store);
    }
    return store;
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
        installedSkills: store.skills.length,
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
    `<div class="dashboard-grid">${stat("全部任務", data.stats.totalTasks, "累積任務")}${stat("執行中", data.stats.runningTasks, "正在處理")}${stat("技能市集", data.stats.installedSkills, "來自原站")}${stat("啟用排程", data.stats.schedules, "自動執行中")}</div>` +
    `<div class="content-grid"><section class="panel"><div class="panel-heading"><h2>最近任務</h2><button class="text-button" id="refresh-tasks">重新整理</button></div>${data.recentTasks.map((task) => `<div class="task-row"><div><div class="task-title">${esc(task.title)}</div><div class="task-meta">${esc(task.model)} · ${new Date(task.createdAt).toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div></div><span class="status status-${task.status}">${statusLabel(task.status)}</span></div>`).join("")}</section><section class="panel"><div class="panel-heading"><h2>活動紀錄</h2></div><div class="panel-body">${data.activity.map((item) => `<div class="activity-item"><span class="activity-dot"></span><div>${esc(item.text)}<small>${esc(item.time)}</small></div></div>`).join("")}</div></section></div>`;
  document.querySelector("#new-task").onclick = showTaskModal;
  document.querySelector("#refresh-tasks").onclick = () => renderTasks().catch(handleError);
}

async function renderSkills() {
  const data = await api("/api/skills");
  const skills = data.skills || [];
  const categories = ["全部", ...Array.from(new Set(skills.map((skill) => skill.tag))).sort((a, b) => a.localeCompare(b, "zh-Hant"))];
  const query = state.skillQuery.trim().toLowerCase();
  const filtered = skills.filter((skill) => {
    const inCategory = state.skillFilter === "全部" || skill.tag === state.skillFilter;
    const text = `${skill.name} ${skill.detail} ${skill.tag} ${skill.tier}`.toLowerCase();
    return inCategory && (!query || text.includes(query));
  });
  const categoryButtons = categories.map((category) => `<button class="segmented-button ${state.skillFilter === category ? "active" : ""}" data-category="${esc(category)}">${esc(category)}</button>`).join("");
  root.innerHTML = layout("蝦技能", `復刻珍妮 CLAW 龍蝦網頁上的技能市集，共 ${skills.length} 個技能；這裡不再顯示本機技能清單。`) +
    `<section class="panel skill-toolbar"><div class="skill-search"><label>搜尋技能</label><input id="skill-search" value="${esc(state.skillQuery)}" placeholder="輸入技能名稱、用途或分類" /></div><div class="segmented">${categoryButtons}</div></section>` +
    `<div class="skill-summary">${stat("全部技能", skills.length, "原站市集")}${stat("目前顯示", filtered.length, "符合條件")}${stat("技能分類", categories.length - 1, "工作流類型")}${stat("基礎／進階", "分級", "可安裝切換")}</div>` +
    `<div class="skill-grid skill-grid-detailed">${filtered.map((skill) => `<article class="skill-card skill-card-detailed ${skill.tier === "進階" ? "skill-pro-card" : ""}"><div class="skill-card-top"><span class="skill-icon">${skill.icon}</span><div><div class="skill-order">#${String(skill.order).padStart(2, "0")} · ${esc(skill.tier)}技能 · ${Number(skill.installs).toLocaleString()} 次安裝</div><h3>${esc(skill.name)}</h3></div></div><p>${esc(skill.detail)}</p><div class="skill-section"><strong>適合用途</strong><ul><li>${esc(skill.detail)}</li><li>依任務自動搭配珍妮的代理流程使用</li><li>可與排程、檔案分析、LINE／Telegram 通知串接</li></ul></div><div class="skill-footer"><span class="tag">${esc(skill.tag)}</span><button class="text-button skill-toggle" data-id="${esc(skill.id)}">${skill.installed ? "已安裝" : "安裝技能"}</button></div></article>`).join("")}</div>`;
  document.querySelector("#skill-search").oninput = (event) => {
    state.skillQuery = event.target.value;
    renderSkills().catch(handleError);
  };
  document.querySelectorAll(".segmented-button").forEach((button) => button.onclick = () => {
    state.skillFilter = button.dataset.category;
    renderSkills().catch(handleError);
  });
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
    if (view === "cafe") return genericView("蝦咖啡", "復刻原站的咖啡與輕任務情境入口，適合把日常靈感變成可執行任務。", `<div class="feature-grid"><article class="feature-card"><span class="feature-icon">☕</span><h3>午後靈感</h3><p>快速記錄想法、整理待辦，交給蝦妹延伸成文案或研究任務。</p></article><article class="feature-card"><span class="feature-icon">♪</span><h3>輕鬆陪伴</h3><p>用更生活化的互動方式啟動 AI 助理。</p></article></div>`);
    if (view === "railway") return genericView("蝦鐵路", "復刻原站的交通與行程輔助入口，可整理路線、時間與提醒。", `<div class="feature-grid"><article class="feature-card"><span class="feature-icon">🚆</span><h3>行程路線</h3><p>整理交通方式、轉乘資訊與到達提醒。</p></article><article class="feature-card"><span class="feature-icon">◷</span><h3>時間提醒</h3><p>搭配蝦排程推送出發、會議與截止時間。</p></article></div>`);
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
  modalRoot.innerHTML = `
    <div class="login-screen">
      <section class="login-card" aria-label="登入藍星蝦妹">
        <div class="login-logo-panel">
          <div class="login-logo-rings"><span>🦐</span></div>
          <div class="login-logo-title">藍星蝦妹</div>
          <div class="login-logo-subtitle">BLUESTAR CLAW</div>
        </div>
        <form class="login-form" id="login-form">
          <h1>登入</h1>
          <div class="login-field">
            <label for="login-email">電子郵件</label>
            <input id="login-email" type="email" autocomplete="email" placeholder="your@email.com" required />
          </div>
          <div class="login-field">
            <label for="login-password">密碼</label>
            <input id="login-password" type="password" autocomplete="current-password" placeholder="至少 8 個字元" required minlength="8" />
          </div>
          <button class="login-primary" id="submit-login" type="submit">登入</button>
          <div class="login-divider"><span></span><small>或</small><span></span></div>
          <button class="login-provider" type="button" id="google-login"><strong>G</strong><span>用 Google 登入</span></button>
          <button class="login-provider login-provider-accent" type="button" id="face-login"><strong>🔐</strong><span>用 FaceID 登入</span></button>
          <button class="login-link" type="button" id="forgot-password">忘記密碼？</button>
          <button class="login-register" type="button" id="register-account">還沒有帳號？註冊</button>
        </form>
      </section>
    </div>`;
  const form = modalRoot.querySelector("#login-form");
  form.onsubmit = async (event) => {
    event.preventDefault();
      try {
        const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email: form.querySelector("#login-email").value, password: form.querySelector("#login-password").value }) });
        state.token = data.token; localStorage.setItem("bluestar_token", state.token); modalRoot.innerHTML = ""; notify("登入成功"); renderView(state.view);
      } catch (error) { notify(error.message); }
  };
  modalRoot.querySelector("#google-login").onclick = () => notify("Google 登入入口已準備");
  modalRoot.querySelector("#face-login").onclick = () => notify("FaceID 登入入口已準備");
  modalRoot.querySelector("#forgot-password").onclick = () => notify("密碼重設入口已準備");
  modalRoot.querySelector("#register-account").onclick = () => notify("註冊入口已準備");
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
