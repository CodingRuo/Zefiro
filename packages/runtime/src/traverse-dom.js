export function traverseDFS(
    vdom,
    processNode,
    parentNode = null,
    index = null
) {
    processNode(vdom, parentNode, index)

    if (vdom.children) {
        vdom.children.forEach((child, i) =>
            traverseDFS(child, processNode, vdom, i)
        )
    }
}