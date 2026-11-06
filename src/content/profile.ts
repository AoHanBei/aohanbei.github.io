export const profile = {
  name: "吴昊强",
  role: "大模型应用开发",
  degree: "网络空间安全硕士",
  status: "2027 届 · 求职中",
  email: "2292110346@qq.com",
  github: "https://github.com/AoHanBei",
  githubHandle: "AoHanBei",
};

export type TimelineEntry = {
  period: string;
  org: string;
  role: string;
  detail?: string;
};

/** 与简历 V2.0 保持一致，按时间倒序。 */
export const timeline: TimelineEntry[] = [
  {
    period: "2026.03 – 2026.06",
    org: "广西网信信息技术有限公司",
    role: "AI 开发实习生",
    detail: "参与内网大模型网关开发，为 Claude Code、OpenAI SDK 与内部 Agent 提供统一调用入口，覆盖协议适配、模型路由、预算控制与调用审计。",
  },
  {
    period: "2024.09 – 2027.06",
    org: "桂林电子科技大学",
    role: "网络空间安全 · 硕士（预计毕业）",
  },
  {
    period: "2019.09 – 2023.06",
    org: "北京联合大学",
    role: "软件工程 · 本科",
  },
];
