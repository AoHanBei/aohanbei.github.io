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

export type ProjectSlug = "modelport" | "evolvable-user-memory" | "quantpilot";

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

/** 一个实现模块：先说要防的事故，再说怎么做。 */
export type Module = {
  title: string;
  risk: Claim;
  how: Claim;
};

type ProjectBase = {
  slug: ProjectSlug;
  name: string;
  /** 原项目名；中文名作为主标题时，原名作为副标题保留。 */
  alias?: string;
  category: string;
  status: string;
  period?: string;
  stack: string[];
  summary: Claim;
  heroImage: ProjectImage;
  evidence: ProjectImage[];
  repositoryUrl?: string;
};

/** 本人实现的主力项目：架构图 + 实现模块 + 取舍与边界。 */
export type BuildProject = ProjectBase & {
  kind: "build";
  origin: Claim;
  diagram: "modelport" | "memory";
  diagramTitle: string;
  modules: Module[];
  tradeoffs: Array<{ title: string; body: Claim }>;
  fit: Claim;
  boundary: Claim;
};

/** 正在学习的项目：研究的设计 + 个人理解。 */
export type StudyProject = ProjectBase & {
  kind: "study";
  problem: Claim;
  flow: Array<{ title: string; body: Claim }>;
  studies: Array<{ title: string; body: Claim }>;
  notes: Array<{ title: string; body: Claim }>;
  boundary: Claim;
};

export type Project = BuildProject | StudyProject;

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
    kind: "build",
    slug: "modelport",
    name: "ModelPort",
    category: "大模型网关",
    status: "开源 · 源于实习",
    period: "2026.03 – 2026.06",
    stack: ["Rust", "Axum", "Tokio", "PostgreSQL", "SSE"],
    summary: claim("mp-summary"),
    origin: claim("mp-origin"),
    heroImage: {
      src: modelportDashboard,
      alt: "ModelPort 运行仪表盘",
      title: "运行仪表盘",
      caption: claim("mp-shot-dashboard"),
    },
    evidence: [
      {
        src: modelportLedger,
        alt: "ModelPort 请求日志与费用账本",
        title: "请求日志与费用账本",
        caption: claim("mp-shot-ledger"),
      },
      {
        src: modelportRouting,
        alt: "ModelPort Provider 与模型路由管理",
        title: "Provider 与模型路由",
        caption: claim("mp-shot-routing"),
      },
    ],
    diagram: "modelport",
    diagramTitle: "一次调用从进来到结算",
    modules: [
      { title: "协议适配", risk: claim("mp-mod-protocol-risk"), how: claim("mp-mod-protocol-how") },
      { title: "路由与容错", risk: claim("mp-mod-routing-risk"), how: claim("mp-mod-routing-how") },
      { title: "并发幂等", risk: claim("mp-mod-idempotency-risk"), how: claim("mp-mod-idempotency-how") },
      { title: "预算结算", risk: claim("mp-mod-budget-risk"), how: claim("mp-mod-budget-how") },
      { title: "流式生命周期与回归验证", risk: claim("mp-mod-stream-risk"), how: claim("mp-mod-stream-how") },
    ],
    tradeoffs: [
      { title: "宁可拒绝，也不静默改写语义", body: claim("mp-tradeoff-semantics") },
      { title: "只为真实出站的尝试计费", body: claim("mp-tradeoff-billing") },
      { title: "租约不等于没有副作用", body: claim("mp-tradeoff-lease") },
    ],
    fit: claim("mp-fit"),
    boundary: claim("mp-boundary"),
    repositoryUrl: "https://github.com/AoHanBei/ModelPort",
  },
  {
    kind: "build",
    slug: "evolvable-user-memory",
    name: "可演化用户记忆",
    category: "记忆服务",
    status: "开源 · 个人项目",
    period: "2026.05 – 2026.08",
    stack: ["Python", "FastAPI", "PostgreSQL", "Milvus"],
    summary: claim("mem-summary"),
    origin: claim("mem-origin"),
    heroImage: {
      src: memoryWorkbench,
      alt: "可演化用户记忆的五步记忆工作台",
      title: "五步记忆工作台",
      caption: claim("mem-shot-workbench"),
    },
    evidence: [
      {
        src: memoryEvidence,
        alt: "可演化用户记忆的当前有效记忆界面",
        title: "当前有效记忆",
        caption: claim("mem-shot-evidence"),
      },
      {
        src: memoryPlanes,
        alt: "可演化用户记忆的五平面架构说明",
        title: "五个平面，一条因果链",
        caption: claim("mem-shot-planes"),
      },
    ],
    diagram: "memory",
    diagramTitle: "五层记忆与两条时间轴",
    modules: [
      { title: "记忆分层与版本存储", risk: claim("mem-mod-layers-risk"), how: claim("mem-mod-layers-how") },
      { title: "双时态查询", risk: claim("mem-mod-bitemporal-risk"), how: claim("mem-mod-bitemporal-how") },
      { title: "混合检索与归因", risk: claim("mem-mod-retrieval-risk"), how: claim("mem-mod-retrieval-how") },
      { title: "反馈隔离", risk: claim("mem-mod-feedback-risk"), how: claim("mem-mod-feedback-how") },
      { title: "策略评测与发布门禁", risk: claim("mem-mod-gate-risk"), how: claim("mem-mod-gate-how") },
      { title: "事实与向量存储分离", risk: claim("mem-mod-storage-risk"), how: claim("mem-mod-storage-how") },
    ],
    tradeoffs: [
      { title: "被召回不等于被验证", body: claim("mem-tradeoff-read") },
      { title: "双时间不等于完全复现", body: claim("mem-tradeoff-bitemporal") },
      { title: "演化不越过治理红线", body: claim("mem-tradeoff-governance") },
    ],
    fit: claim("mem-fit"),
    boundary: claim("mem-boundary"),
    repositoryUrl: "https://github.com/AoHanBei/Memory",
  },
  {
    kind: "study",
    slug: "quantpilot",
    name: "量化研究智能体",
    alias: "QuantPilot",
    category: "Data Agent 学习笔记",
    status: "学习中",
    stack: ["Next.js", "FastAPI", "TimescaleDB", "Redis"],
    summary: claim("qp-summary"),
    heroImage: {
      src: quantWorkbench,
      alt: "QuantPilot 自然语言研究工作台界面",
      title: "自然语言研究入口",
      caption: claim("qp-shot-workbench"),
    },
    evidence: [
      {
        src: quantOps,
        alt: "QuantPilot Worker 运行治理中心",
        title: "Worker 运行治理",
        caption: claim("qp-shot-ops"),
      },
      {
        src: quantEval,
        alt: "QuantPilot 评测质量总览",
        title: "交付质量门禁",
        caption: claim("qp-shot-eval"),
      },
    ],
    problem: claim("qp-problem"),
    flow: [
      { title: "改写与核验", body: claim("qp-flow-rewrite") },
      { title: "组合与冻结", body: claim("qp-flow-freeze") },
      { title: "领取与生成", body: claim("qp-flow-generate") },
      { title: "验证与交付", body: claim("qp-flow-deliver") },
    ],
    studies: [
      { title: "领域包与通用内核分离", body: claim("qp-study-domain") },
      { title: "版本化任务合同", body: claim("qp-study-contract") },
      { title: "长任务的 Worker 治理", body: claim("qp-study-worker") },
      { title: "独立于模型自述的质量门禁", body: claim("qp-study-gate") },
    ],
    notes: [
      { title: "差异收在边界", body: claim("qp-note-edge") },
      { title: "输入要能事后复查", body: claim("qp-note-freeze") },
      { title: "完成要由证据判定", body: claim("qp-note-gate") },
    ],
    boundary: claim("qp-boundary"),
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<ProjectSlug, Project>;

export function projectHref(slug: ProjectSlug) {
  return `/projects/${slug}.html`;
}
