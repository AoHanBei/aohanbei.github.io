export const profile = {
  name: "吴昊强",
  role: "大模型应用开发",
  status: "2027 届 · 求职中",
  email: "2292110346@qq.com",
  github: "https://github.com/AoHanBei",
  githubHandle: "AoHanBei",
};

export type Internship = {
  period: string;
  org: string;
  role: string;
  detail: string;
};

/** 与简历保持一致；站点只展示与 Agent 工程相关的经历，教育背景与学术成果不上站。 */
export const internship: Internship = {
  period: "2026.03 – 2026.06",
  org: "广西网信信息技术有限公司",
  role: "AI 开发实习生",
  detail: "参与内网大模型网关开发，为 Claude Code、OpenAI SDK 与内部 Agent 提供统一调用入口，覆盖协议适配、模型路由、预算控制与调用审计。",
};
