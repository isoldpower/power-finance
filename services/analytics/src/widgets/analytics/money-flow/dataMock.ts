import { MoneyFlowNode, MoneyFlowPiece } from "@entity/analytics/model";


const wallets = ['Main Account', 'Some Wallet', 'Accounts Payable', 'Accounts Receivable', 'Amortization'];

const moneyFlowNodes: MoneyFlowNode[] = wallets.map((category, index) => ({
  name: category,
  level: index
}));

const moneyFlowData: MoneyFlowPiece[] = Array.from({ length: 100 }).map(() => {
  let sourceIndex;
  let sourceNode: MoneyFlowNode;
  let validTargets;
  do {
    sourceIndex = Math.floor(Math.random() * moneyFlowNodes.length);
    sourceNode = moneyFlowNodes[sourceIndex];
    validTargets = moneyFlowNodes.filter(node => node.level > sourceNode.level);
  } while (validTargets.length === 0);

  const targetNode = validTargets[Math.floor(Math.random() * validTargets.length)];

  return {
    source: sourceNode,
    target: targetNode,
    value: Math.random() * 1000
  };
});

const data = {
  nodes: moneyFlowNodes,
  links: moneyFlowData
};

export { moneyFlowNodes, moneyFlowData, data };