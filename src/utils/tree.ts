interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
}

export class NodeTree{
  constructor(value: number){
    this.value = value;
  }

  value: number;
  left: NodeTree = null;
  right: NodeTree = null;

  insert(value: number){
    if (this.value){
      if(value > this.value){
        this.right? this.right.insert(value) : this.right = new NodeTree(value)
      }else{
        this.left? this.left.insert(value) : this.left = new NodeTree(value)
      }
    }
  }

  preOrder(){
    console.log(this.value);
    this.left?.preOrder();
    this.right?.preOrder();
  }
  inOrder(){
    this.left?.inOrder();
    console.log(this.value);
    this.right?.inOrder();
  }
  postOrder(){
    this.left?.postOrder();
    this.right?.postOrder();
    console.log(this.value);
  }

  BFS(){ //breadth-first search
    const visited : NodeTree[] = [this];
    let i = 0;
    while(i < visited.length){
      visited[i].left && visited.push(visited[i].left);
      visited[i].right && visited.push(visited[i].right);
      i++;
    }

    return visited;
  }

  convertToRawNodeDatum(){
    const RawNodeDatumLeft: RawNodeDatum = this.left?.convertToRawNodeDatum();
    const RawNodeDatumRight: RawNodeDatum = this.right?.convertToRawNodeDatum();
    const children = [];

    // RawNodeDatumLeft && children.push(RawNodeDatumLeft);
    // RawNodeDatumRight && children.push(RawNodeDatumRight);

    if (RawNodeDatumLeft){
      children.push(RawNodeDatumLeft);
    }else{
      children.push({name: ''})

    }
    if (RawNodeDatumRight){
      children.push(RawNodeDatumRight);
    }else{
      children.push({name: ''})
    }

    if (children.length > 0){
      return {
        name: String(this.value),
        children
      } as RawNodeDatum;
    }
    else{
      return {
        name: String(this.value),
      } as RawNodeDatum;
    }
  }

  getHeight(){
    const left = this.left?.getHeight() || 0;
    const right = this.right?.getHeight() || 0;

    if (left > right) return left + 1;
    else return right + 1;
  }

  getBalanceFactor(){
    const leftHeight = this.left?.getHeight() || 0;
    const rightHeight = this.right?.getHeight() || 0;

    return Math.abs(leftHeight - rightHeight);
  }

  isBalanced(){
    //is leaf?
    if(this.left === null && this.right === null) return true;

    // if the current node's balancing factor is less than 1 and the right and left sides are balanced, return true
    // (Gambiarra: when there is no side it 't doesnexecute isBalanced because of the "?" Sign, so it returns undefined. Since the
    // side does not exist there is no way it is unbalanced so I consider this case to be valid.)
    return (this.left?.isBalanced() || this.left?.isBalanced() == undefined) &&
      (this.right?.isBalanced() || this.right?.isBalanced() == undefined) &&
      this.getBalanceFactor() <= 1;
  }

  toString(){
    const left = this.left ? `${this.left.toString()}` : '';
    const right = this.right ? `${this.right.toString()}` : '';

    return `(${this.value}${left}${right})`
  }
}
