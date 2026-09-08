import memoryPlanes from "../../assets/project-images/evolvable-user-memory/five-plane-architecture.png";
import memoryEvidence from "../../assets/project-images/evolvable-user-memory/evidence-capture.png";
import memoryWorkbench from "../../assets/project-images/evolvable-user-memory/workbench.png";
import modelportDashboard from "../../assets/project-images/modelport/dashboard-overview-v2.png";
import modelportLedger from "../../assets/project-images/modelport/enterprise-ledger.png";
import modelportRouting from "../../assets/project-images/modelport/models-routing.png";
import quantEval from "../../assets/project-images/quantpilot/eval-platform-v2.png";
import quantOps from "../../assets/project-images/quantpilot/ops-governance.png";
import quantWorkbench from "../../assets/project-images/quantpilot/workbench-v2.png";
import sourceData from "../../content/project-sources.json";

export type ProjectSlug = "modelport" | "quantpilot" | "evolvable-user-memory";

export type Claim = {
  id: string;
  text: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  title: string;
  caption: Claim;
};

export type Project = {
  slug: ProjectSlug;
  order: string;
  name: string;
  shortName: string;
  category: string;
  categoryZh: string;
  summary: Claim;
  heroImage: ProjectImage;
  evidenceHeading: string;
  evidence: ProjectImage[];
  facts: Array<{ label: string; value: string }>;
  tags: string[];
  problem: { title: string; body: Claim };
  approach: { title: string; body: Claim };
  capabilityIntro: string;
  capabilities: Array<{ title: string; body: Claim }>;
  lifecycleLabel: string;
  lifecycleTitle: string;
  lifecycle: Array<{ title: string; body: Claim }>;
  tradeoffsTitle: string;
  tradeoffs: Array<{ title: string; body: Claim }>;
  fit: Claim;
  boundary: Claim;
  repositoryUrl?: string;
};

const claims = new Map(
  sourceData.projects.flatMap((project) =>
    project.claims.map((item) => [item.id, item.text] as const),
  ),
);

function claim(id: string): Claim {
  const text = claims.get(id);
  if (!text) {
    throw new Error(`Missing project claim: ${id}`);
  }
  return { id, text };
}

export const projects: Project[] = [
  {
    slug: "modelport",
    order: "01",
    name: "ModelPort",
    shortName: "ModelPort",
    category: "Infrastructure",
    categoryZh: "模型基础设施",
    summary: claim("mp-summary"),
    heroImage: {
      src: modelportDashboard,
      alt: "ModelPort 运行仪表盘",
      title: "运行仪表盘",
      caption: claim("mp-shot-dashboard"),
    },
    evidenceHeading: "控制面中的运行证据",
    evidence: [
      {
        src: modelportLedger,
        alt: "ModelPort 企业请求事实账本",
        title: "企业请求事实账本",
        caption: claim("mp-shot-ledger"),
      },
      {
        src: modelportRouting,
        alt: "ModelPort Provider 与模型路由管理",
        title: "Provider 与模型路由",
        caption: claim("mp-shot-routing"),
      },
    ],
    facts: [
      { label: "Client edges", value: "Anthropic + OpenAI" },
      { label: "Gateway", value: "Rust · Axum · Tokio" },
      { label: "Control plane", value: "React · PostgreSQL" },
    ],
    tags: ["Protocol Gateway", "Routing", "Usage Ledger"],
    problem: {
      title: "模型接得越多，业务越不该感知 Provider 差异",
      body: claim("mp-problem"),
    },
    approach: {
      title: "让每次调用留下完整终态",
      body: claim("mp-approach"),
    },
    capabilityIntro: "能力按请求生命周期组织，不以页面功能数量代替系统边界。",
    capabilities: [
      { title: "双协议客户端入口", body: claim("mp-cap-protocol") },
      { title: "协议中立结构", body: claim("mp-cap-ir") },
      { title: "确定性路由与降级", body: claim("mp-cap-routing") },
      { title: "身份、策略与预算", body: claim("mp-cap-policy") },
      { title: "完整流式生命周期", body: claim("mp-cap-stream") },
      { title: "运维控制面", body: claim("mp-cap-ops") },
    ],
    lifecycleLabel: "请求链路",
    lifecycleTitle: "一条请求怎样形成可信记录",
    lifecycle: [
      { title: "Client Edge", body: claim("mp-flow-client") },
      { title: "Exchange & Policy", body: claim("mp-flow-policy") },
      { title: "Provider Attempt", body: claim("mp-flow-attempt") },
      { title: "Terminal Evidence", body: claim("mp-flow-evidence") },
    ],
    tradeoffsTitle: "比转发成功更重要的三件事",
    tradeoffs: [
      { title: "不静默吞掉协议语义", body: claim("mp-tradeoff-semantics") },
      { title: "只为真实出站尝试计费", body: claim("mp-tradeoff-billing") },
      { title: "区分事实来源", body: claim("mp-tradeoff-evidence") },
    ],
    fit: claim("mp-fit"),
    boundary: claim("mp-boundary"),
    repositoryUrl: "https://github.com/AoHanBei/ModelPort",
  },
  {
    slug: "quantpilot",
    order: "02",
    name: "QuantPilot",
    shortName: "QuantPilot",
    category: "Data Agent",
    categoryZh: "数据智能体",
    summary: claim("qp-summary"),
    heroImage: {
      src: quantWorkbench,
      alt: "QuantPilot AI 量化研究工作台",
      title: "自然语言研究入口",
      caption: claim("qp-shot-workbench"),
    },
    evidenceHeading: "从研究入口到质量门禁",
    evidence: [
      {
        src: quantOps,
        alt: "QuantPilot Data Agent 运行治理中心",
        title: "Data Agent 运行治理",
        caption: claim("qp-shot-ops"),
      },
      {
        src: quantEval,
        alt: "QuantPilot 评测质量总览",
        title: "交付质量门禁",
        caption: claim("qp-shot-eval"),
      },
    ],
    facts: [
      { label: "Application profile", value: "finance.quant" },
      { label: "Delivery pack", value: "Next.js Dashboard" },
      { label: "Data plane", value: "TimescaleDB · FastAPI" },
    ],
    tags: ["Agent Workflow", "Worker Governance", "Evaluation"],
    problem: {
      title: "研究答案不等于可交付的研究工作",
      body: claim("qp-problem"),
    },
    approach: {
      title: "让业务规则成为独立能力包",
      body: claim("qp-approach"),
    },
    capabilityIntro: "从版本合同、真实数据到隔离预览，覆盖任务的完整交付路径。",
    capabilities: [
      { title: "版本化 Data Agent 合同", body: claim("qp-cap-contract") },
      { title: "结构化 Query Rewrite", body: claim("qp-cap-rewrite") },
      { title: "真实金融数据底座", body: claim("qp-cap-data") },
      { title: "持久 Worker 治理", body: claim("qp-cap-worker") },
      { title: "受治理的上下文组合", body: claim("qp-cap-context") },
      { title: "隔离构建与预览", body: claim("qp-cap-preview") },
    ],
    lifecycleLabel: "执行链路",
    lifecycleTitle: "从一句研究问题到可运行工作空间",
    lifecycle: [
      { title: "Rewrite & Resolve", body: claim("qp-flow-rewrite") },
      { title: "Compose & Freeze", body: claim("qp-flow-freeze") },
      { title: "Claim & Generate", body: claim("qp-flow-generate") },
      { title: "Validate & Deliver", body: claim("qp-flow-deliver") },
    ],
    tradeoffsTitle: "架构中保持清晰的三条分界",
    tradeoffs: [
      { title: "通用内核不理解金融", body: claim("qp-tradeoff-domain") },
      { title: "排队前后使用同一份上下文", body: claim("qp-tradeoff-context") },
      { title: "质量门禁独立于模型自述", body: claim("qp-tradeoff-gate") },
    ],
    fit: claim("qp-fit"),
    boundary: claim("qp-boundary"),
  },
  {
    slug: "evolvable-user-memory",
    order: "03",
    name: "Evolvable User Memory",
    shortName: "User Memory",
    category: "Memory Infrastructure",
    categoryZh: "记忆基础设施",
    summary: claim("mem-summary"),
    heroImage: {
      src: memoryWorkbench,
      alt: "Evolvable User Memory 五步记忆工作台",
      title: "五步记忆工作台",
      caption: claim("mem-shot-workbench"),
    },
    evidenceHeading: "从证据采集到五平面架构",
    evidence: [
      {
        src: memoryEvidence,
        alt: "Evolvable User Memory 当前有效记忆界面",
        title: "当前有效记忆",
        caption: claim("mem-shot-evidence"),
      },
      {
        src: memoryPlanes,
        alt: "Evolvable User Memory 五平面架构说明",
        title: "五个平面，一条因果链",
        caption: claim("mem-shot-planes"),
      },
    ],
    facts: [
      { label: "Memory model", value: "5 planes" },
      { label: "Authority", value: "PostgreSQL" },
      { label: "Runtime", value: "FastAPI · Python" },
    ],
    tags: ["Evidence", "Recall Trace", "Policy Evolution"],
    problem: {
      title: "被召回不能成为更可信的理由",
      body: claim("mem-problem"),
    },
    approach: {
      title: "把记忆建模为有证据的状态演化",
      body: claim("mem-approach"),
    },
    capabilityIntro: "不同平面分别保存证据、信念、使用结果、投影与策略变化。",
    capabilities: [
      { title: "Evidence", body: claim("mem-cap-evidence") },
      { title: "Belief", body: claim("mem-cap-belief") },
      { title: "Experience", body: claim("mem-cap-experience") },
      { title: "Projection", body: claim("mem-cap-projection") },
      { title: "Evolution", body: claim("mem-cap-evolution") },
      { title: "Governance", body: claim("mem-cap-governance") },
    ],
    lifecycleLabel: "记忆链路",
    lifecycleTitle: "从一次观察到有界策略演化",
    lifecycle: [
      { title: "Observe", body: claim("mem-flow-observe") },
      { title: "Form Belief", body: claim("mem-flow-belief") },
      { title: "Recall & Project", body: claim("mem-flow-recall") },
      { title: "Outcome & Evolve", body: claim("mem-flow-evolve") },
    ],
    tradeoffsTitle: "防止记忆系统越用越偏的三道边界",
    tradeoffs: [
      { title: "读操作绝不强化信念", body: claim("mem-tradeoff-read") },
      { title: "向量索引不是事实来源", body: claim("mem-tradeoff-index") },
      { title: "演化不越过治理红线", body: claim("mem-tradeoff-governance") },
    ],
    fit: claim("mem-fit"),
    boundary: claim("mem-boundary"),
    repositoryUrl: "https://github.com/AoHanBei/Memory",
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<ProjectSlug, Project>;

export function projectHref(slug: ProjectSlug) {
  return `/projects/${slug}.html`;
}
