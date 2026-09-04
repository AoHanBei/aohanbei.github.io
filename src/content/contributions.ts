export type Contribution = {
  number: number;
  title: string;
  summary: string;
  area: string;
  url: string;
};

export const contributions: Contribution[] = [
  {
    number: 5127,
    title: "Persist loop detection events",
    summary: "把循环检测从瞬时告警推进为可查询、可复盘的持久化事件。",
    area: "Observability",
    url: "https://github.com/bytedance/deer-flow/pull/5127",
  },
  {
    number: 4933,
    title: "Compensate cancelled task submissions",
    summary: "补偿取消任务的提交路径，避免终态与调度记录失配。",
    area: "MCP Runtime",
    url: "https://github.com/bytedance/deer-flow/pull/4933",
  },
  {
    number: 4762,
    title: "Serialize websocket shutdown",
    summary: "串行化 WebSocket 关闭过程，收紧企业微信通道的并发边界。",
    area: "WeCom",
    url: "https://github.com/bytedance/deer-flow/pull/4762",
  },
  {
    number: 4752,
    title: "Prevent typing tasks after stop",
    summary: "停止后不再创建输入状态任务，避免 Discord 通道残留异步工作。",
    area: "Discord",
    url: "https://github.com/bytedance/deer-flow/pull/4752",
  },
  {
    number: 4709,
    title: "Make SQL store signatures content-sensitive",
    summary: "让 SQL 存储签名感知内容变化，减少 Agent 状态复用中的错误命中。",
    area: "Agent Storage",
    url: "https://github.com/bytedance/deer-flow/pull/4709",
  },
];
