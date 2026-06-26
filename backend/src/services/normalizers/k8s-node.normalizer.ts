export function normalizeNode(node: any) {
  const conditions = node.status?.conditions || [];

  return {
    timestamp: new Date(),

    source: 'kubernetes',

    nodeName: node.metadata?.name,

    ready: conditions.find((c: any) => c.type === 'Ready')?.status === 'True',

    conditions: conditions.filter((c: any) => c.status === 'True').map((c: any) => c.type),

    metadata: node,
  };
}
