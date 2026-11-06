type Stage = {
  title: string;
  detail: string;
  reject?: string;
};

const gatewayStages: Stage[] = [
  { title: "客户端", detail: "Claude Code、OpenAI SDK、内部 Agent" },
  { title: "协议适配", detail: "解析成强类型中间表示", reject: "无法保真 → 拒绝" },
  { title: "幂等协调", detail: "幂等键、请求指纹、租约", reject: "同键异参 → 冲突" },
  { title: "确定性路由", detail: "固定解析顺序，按能力过滤候选" },
  { title: "预算预留", detail: "PostgreSQL 事务内预留", reject: "额度不足 → 拒绝，零费用" },
  { title: "上游尝试", detail: "凭据池、冷却窗口、SSE 流" },
  { title: "终态结算", detail: "按证据结算或释放预留，写入账本" },
];

/** ModelPort 请求链路：一条主干，三处拒绝出口，一段有界重试回路。 */
export function GatewayFlowDiagram() {
  return (
    <figure className="gateway-diagram" aria-label="ModelPort 请求链路图">
      <ol className="gateway-track">
        {gatewayStages.map((stage, index) => (
          <li key={stage.title} className="gateway-stage" data-loop={index >= 3 && index <= 5 ? "true" : undefined}>
            <span className="gateway-node" aria-hidden="true">{index + 1}</span>
            <div className="gateway-copy">
              <h3>{stage.title}</h3>
              <p>{stage.detail}</p>
              {stage.reject ? <p className="gateway-reject">{stage.reject}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <p className="gateway-loop">
        <span className="gateway-loop-bracket" aria-hidden="true" />
        <span className="gateway-loop-label">可重试的失败：冷却当前凭据，回到路由选下一个候选；重试次数有上限，每次尝试单独记账</span>
      </p>
    </figure>
  );
}

const memoryLayers = [
  { name: "演化控制", term: "Evolution", detail: "候选策略经固定评测与发布门禁才能生效", store: "PostgreSQL" },
  { name: "检索投影", term: "Projection", detail: "可随时重建的向量表示，只负责找候选", store: "Milvus" },
  { name: "经验", term: "Experience", detail: "检索轨迹与任务结果，只有真实结果才更新效用", store: "PostgreSQL" },
  { name: "信念", term: "Belief", detail: "不可变修订记录，带 valid_at 与 known_at", store: "PostgreSQL" },
  { name: "证据", term: "Evidence", detail: "原始观察与出处，不提前当成事实", store: "PostgreSQL" },
];

/** 记忆服务：五层模型（自下而上）与双时间轴示例。 */
export function MemoryModelDiagram() {
  return (
    <figure className="memory-diagram" aria-label="可演化用户记忆的五层模型与双时间轴">
      <div className="memory-stack">
        <p className="memory-caption">五层模型，写入自下而上</p>
        <ol>
          {memoryLayers.map((layer) => (
            <li key={layer.name} className="memory-layer" data-store={layer.store}>
              <div>
                <h3>
                  {layer.name} <span lang="en">{layer.term}</span>
                </h3>
                <p>{layer.detail}</p>
              </div>
              <span className="memory-store" lang="en">{layer.store}</span>
            </li>
          ))}
        </ol>
        <p className="memory-rule">查询命中不会回写信念：被检索不等于被验证有效。</p>
      </div>

      <div className="memory-time">
        <p className="memory-caption">双时间轴：晚到的证据不改写过去</p>
        <BitemporalChart />
        <dl className="memory-queries">
          <div>
            <dt>4 月 20 日偏好是什么？（按现在所知）</dt>
            <dd>英文。系统 5 月 2 日已得知 4 月 10 日的变更。</dd>
          </div>
          <div>
            <dt>4 月 20 日那天系统怎么认为？</dt>
            <dd>中文。那时还不知道变更，历史判断保持原样。</dd>
          </div>
        </dl>
      </div>
    </figure>
  );
}

function BitemporalChart() {
  // 3/1 在 x=40，每月 110px。
  const x = { mar1: 40, apr1: 150, may1: 260, jun1: 370, apr10: 187, apr20: 223, may2: 264, end: 420 };
  return (
    <svg className="bitemporal-chart" viewBox="0 0 430 206" role="img" aria-labelledby="bitemporal-title">
      <title id="bitemporal-title">
        用户 3 月 1 日偏好中文；4 月 10 日改为英文，但系统 5 月 2 日才得知。
      </title>

      <text x="0" y="22" className="chart-label">生效时间 valid_at</text>
      <rect x={x.mar1} y="34" width={x.apr10 - x.mar1} height="22" rx="3" className="chart-bar-old" />
      <text x={x.mar1 + 8} y="49" className="chart-bar-text">A 中文</text>
      <rect x={x.apr10} y="34" width={x.end - x.apr10} height="22" rx="3" className="chart-bar-new" />
      <text x={x.apr10 + 8} y="49" className="chart-bar-text-inverse">B 英文</text>

      <text x="0" y="96" className="chart-label">获知时间 known_at</text>
      <line x1={x.mar1} y1="120" x2={x.end} y2="120" className="chart-rail" />
      <circle cx={x.mar1} cy="120" r="5" className="chart-dot-old" />
      <text x={x.mar1 + 10} y="140" className="chart-note">得知 A</text>
      <circle cx={x.may2} cy="120" r="5" className="chart-dot-new" />
      <text x={x.may2 + 10} y="140" className="chart-note">得知 B，晚到 22 天</text>
      <path d={`M ${x.may2} 114 C ${x.may2} 84, ${x.apr10} 90, ${x.apr10} 60`} className="chart-late" />

      <line x1={x.apr20} y1="26" x2={x.apr20} y2="166" className="chart-query" />
      <text x={x.apr20 - 4} y="16" textAnchor="middle" className="chart-query-label">查询 4/20</text>

      <line x1={x.mar1} y1="176" x2={x.end} y2="176" className="chart-axis" />
      {[
        [x.mar1, "3 月"],
        [x.apr1, "4 月"],
        [x.may1, "5 月"],
        [x.jun1, "6 月"],
      ].map(([pos, label]) => (
        <g key={label}>
          <line x1={pos} y1="172" x2={pos} y2="180" className="chart-axis" />
          <text x={pos} y="198" textAnchor="middle" className="chart-tick">{label}</text>
        </g>
      ))}
    </svg>
  );
}
