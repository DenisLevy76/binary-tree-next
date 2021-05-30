interface RawNodeDatum {
  name: string
  attributes?: Record<string, string>
  children?: RawNodeDatum[]
}

export class NodeTree {
  constructor(value: number) {
    this.value = value
  }

  value: number
  left: NodeTree = null
  right: NodeTree = null

  insert(value: number): void {
    if (this.value) {
      if (value < this.value) {
        this.left ? this.left.insert(value) : (this.left = new NodeTree(value))
      } else {
        this.right
          ? this.right.insert(value)
          : (this.right = new NodeTree(value))
      }
    }
  }

  preOrder(): number[] {
    const left = this.left ? this.left.preOrder() : []
    const right = this.right ? this.right.preOrder() : []

    return [this.value, ...left, ...right]
  }

  inOrder(): number[] {
    const left = this.left ? this.left.inOrder() : []
    const right = this.right ? this.right.inOrder() : []

    return [...left, this.value, ...right]
  }

  postOrder(): number[]{
    const left = this.left ? this.left.postOrder() : []
    const right = this.right ? this.right.postOrder() : []

    return [...left, ...right, this.value]
  }

  BFS(): number[]{
    //breadth-first search
    const visited: NodeTree[] = [this]
    let i = 0
    while (i < visited.length) {
      visited[i].left && visited.push(visited[i].left)
      visited[i].right && visited.push(visited[i].right)
      i++
    }

    return visited.map(e => e.value)
  }

  convertToRawNodeDatum() {
    const RawNodeDatumLeft: RawNodeDatum = this.left?.convertToRawNodeDatum()
    const RawNodeDatumRight: RawNodeDatum = this.right?.convertToRawNodeDatum()
    const children: RawNodeDatum[] = []

    if (RawNodeDatumLeft) {
      children.push(RawNodeDatumLeft)
    } else {
      children.push({ name: "" })
    }

    if (RawNodeDatumRight) {
      children.push(RawNodeDatumRight)
    } else {
      children.push({ name: "" })
    }

    if (children.length > 0) {
      return {
        name: String(this.value),
        children
      } as RawNodeDatum
    } else {
      return {
        name: String(this.value)
      } as RawNodeDatum
    }
  }

  getHeight():number {
    const left = this.left?.getHeight() || 0
    const right = this.right?.getHeight() || 0

    if (left > right) return left + 1
    else return right + 1
  }

  getBalanceFactor(): number {
    const leftHeight = this.left?.getHeight() || 0
    const rightHeight = this.right?.getHeight() || 0

    return Math.abs(leftHeight - rightHeight)
  }

  isBalanced(): boolean {
    //is leaf?
    if (this.left === null && this.right === null) return true

    // if the right and left sides are balanced and the current node's balancing factor is less than 1, return true
    // (Gambiarra: when there is no side it 't doesnexecute isBalanced because of the "?" Sign, so it returns undefined. Since the
    // side does not exist there is no way it is unbalanced so I consider this case to be valid.)

    return (
      (this.left?.isBalanced() || this.left?.isBalanced() == undefined) &&
      (this.right?.isBalanced() || this.right?.isBalanced() == undefined) &&
      this.getBalanceFactor() <= 1
    )
  }

  toString(): string {
    const left = this.left ? `${this.left.toString()}` : ""
    const right = this.right ? `${this.right.toString()}` : ""

    return `(${this.value}${left}${right})`
  }
}
