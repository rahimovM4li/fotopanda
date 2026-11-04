import { parse } from 'parse5'
export function documentNodes(html) {
  const nodes = []
  function visit(node) { nodes.push(node); for (const child of node.childNodes ?? []) visit(child) }
  visit(parse(html))
  return nodes
}
export const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value
export function textContent(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(textContent).join(' ')
}
