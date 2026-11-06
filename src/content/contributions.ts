export type PullRequest = {
  number: number;
  title: string;
};

export type ContributionTheme = {
  title: string;
  summary: string;
  prs: PullRequest[];
};

export type ContributionRepo = {
  name: string;
  owner: string;
  repoUrl: string;
  /** 上游仓库 Star 约数，随核对日期一起更新。 */
  stars: string;
  intro: string;
  themes: ContributionTheme[];
};

/** 已合并 PR 与上游 Star 约数的核对日期。 */
export const contributionsVerifiedOn = "2026-11-06";

/** 已合并 PR，与简历保持一致。 */
export const contributionRepos: ContributionRepo[] = [
  {
    name: "DeerFlow",
    owner: "bytedance/deer-flow",
    repoUrl: "https://github.com/bytedance/deer-flow",
    stars: "85k+",
    intro: "围绕 Agent 运行时可靠性提交修复与增强，补充确定性回归测试和相关契约文档。",
    themes: [
      {
        title: "配置缓存一致性",
        summary: "把时间戳加行数构成的失效标识改成有序内容的 SHA-256 摘要，修复同一时间戳下配置更新不触发缓存刷新的问题。",
        prs: [{ number: 4709, title: "fix(agents): make SQL store signatures content-sensitive" }],
      },
      {
        title: "异步生命周期管理",
        summary: "修复 Discord 停止后仍注册延迟任务和跨事件循环清理的问题；串行化企业微信通道启停，避免旧实例的清理误伤新实例。",
        prs: [
          { number: 4752, title: "fix(discord): prevent typing tasks after stop" },
          { number: 4762, title: "fix(wecom): serialize websocket shutdown" },
        ],
      },
      {
        title: "MCP 任务取消补偿",
        summary: "远程任务已创建、本地还在持久化时被取消，增加补偿路径并保留原始取消语义；用受跟踪的后台任务和有界等待处理重复取消与补偿超时。",
        prs: [{ number: 4933, title: "fix(mcp): compensate cancelled task submissions" }],
      },
      {
        title: "运行时事件审计",
        summary: "持久化循环检测的预警与强制停止事件，补齐子 Agent 向父事件循环转发审计记录的路径；记录操作移出检测锁，审计失败不打断运行。",
        prs: [{ number: 5127, title: "feat(observability): persist loop detection events" }],
      },
    ],
  },
  {
    name: "DeepTutor",
    owner: "HKUDS/DeepTutor",
    repoUrl: "https://github.com/HKUDS/DeepTutor",
    stars: "55k+",
    intro: "围绕模型调用链路、用量核算与会话数据可用性提交修复与增强，补充覆盖失败路径的回归测试。",
    themes: [
      {
        title: "限流重试与可重试判定",
        summary: "重试预算随密钥池伸缩，限流后剩余密钥都会被尝试；兼容 HTTP-date 格式的 Retry-After；可重试性以服务端标志判定，而不是状态码。",
        prs: [
          { number: 1499, title: "fix(llm): try every API key after rate limits" },
          { number: 1452, title: "fix(embedding): parse HTTP-date Retry-After values" },
          { number: 1396, title: "fix(web): honor explicit retryable flags" },
        ],
      },
      {
        title: "用量计费口径修正",
        summary: "定价先精确匹配模型名，再按最长匹配回退，修复 gpt-4o-mini 命中 gpt-4o 价格导致的成本高估。",
        prs: [{ number: 1492, title: "fix(usage): prefer exact model pricing matches" }],
      },
      {
        title: "工具调用纠偏",
        summary: "把模型幻觉出的 pdf 工具名映射到规范的来源读取工具；单个来源自动选中，多个来源要求显式指定，避免读错文件。",
        prs: [{ number: 1333, title: "fix(chat): recover hallucinated PDF tool calls for attached sources" }],
      },
      {
        title: "会话历史检索",
        summary: "新增有界分页的搜索接口，对标题和历史消息做大小写不敏感匹配并返回最佳摘录；前端用防抖和取消陈旧请求衔接分页。",
        prs: [{ number: 1415, title: "feat(chat): search full conversation history" }],
      },
      {
        title: "会话导入与加载状态",
        summary: "解析 ChatGPT 导出文件重建分支消息，分批上传且保持幂等；修复阅读工作区加载期间闪现“不可用”的问题。",
        prs: [
          { number: 1408, title: "feat(imports): add ChatGPT conversation export support" },
          { number: 1442, title: "fix(reading): keep material loading during hydration" },
        ],
      },
    ],
  },
];

export function prUrl(repo: ContributionRepo, number: number) {
  return `${repo.repoUrl}/pull/${number}`;
}

export const mergedPrCount = contributionRepos.reduce(
  (total, repo) => total + repo.themes.reduce((sum, theme) => sum + theme.prs.length, 0),
  0,
);
