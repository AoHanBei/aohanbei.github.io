import { projectHref } from "@/content/projects";

export type SkillEvidence = {
  label: string;
  href: string;
  external?: boolean;
};

export type Skill = {
  title: string;
  body: string;
  evidence: SkillEvidence[];
};

/** 与简历“专业技能”三条保持一致，每条挂可点开的证据。 */
export const skills: Skill[] = [
  {
    title: "模型接入与 Agent 工程",
    body: "具备模型协议适配、工具调用、SSE 流式处理及 Agent 运行时故障排查实践。",
    evidence: [
      { label: "ModelPort · 协议适配", href: `${projectHref("modelport")}#modules` },
      { label: "DeerFlow · MCP 任务取消补偿", href: "https://github.com/bytedance/deer-flow/pull/4933", external: true },
      { label: "DeepTutor · 工具调用纠偏", href: "https://github.com/HKUDS/DeepTutor/pull/1333", external: true },
    ],
  },
  {
    title: "记忆与检索",
    body: "具备长期记忆建模、双时态查询、混合召回、结果归因及固定评测门禁实践。",
    evidence: [
      { label: "可演化用户记忆 · 双时态查询", href: `${projectHref("evolvable-user-memory")}#modules` },
      { label: "可演化用户记忆 · 混合检索与归因", href: `${projectHref("evolvable-user-memory")}#modules` },
      { label: "DeepTutor · 会话历史检索", href: "https://github.com/HKUDS/DeepTutor/pull/1415", external: true },
    ],
  },
  {
    title: "后端可靠性",
    body: "具备 PostgreSQL 事务、请求幂等、租约协调、异步任务取消与生命周期管理实践，能够结合回归测试分析并发和一致性问题。",
    evidence: [
      { label: "ModelPort · 并发幂等与预算结算", href: `${projectHref("modelport")}#modules` },
      { label: "DeerFlow · 异步生命周期管理", href: "https://github.com/bytedance/deer-flow/pull/4752", external: true },
      { label: "DeepTutor · 限流重试", href: "https://github.com/HKUDS/DeepTutor/pull/1499", external: true },
    ],
  },
];
