interface RawNodeDatum {
  name: number;
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
  posOrder(){
    this.left?.posOrder();
    this.right?.posOrder();
    console.log(this.value);
  }

  convertToRawNodeDatum(){
    const RawNodeDatumLeft: RawNodeDatum = this.left?.convertToRawNodeDatum();
    const RawNodeDatumRight: RawNodeDatum = this.right?.convertToRawNodeDatum();
    const children = [];

    RawNodeDatumLeft && children.push(RawNodeDatumLeft);
    RawNodeDatumRight && children.push(RawNodeDatumRight);

    if (children.length > 0){
      return {
        name: this.value,
        children
      } as RawNodeDatum;
    }
    else{
      return {
        name: this.value,
      } as RawNodeDatum;
    }
  }
}

export function BFS(root: NodeTree){
  const visited = [root];
  let i = 0;
  while(i < visited.length){
    visited[i].left && visited.push(visited[i].left);
    visited[i].right && visited.push(visited[i].right);
    i++;
  }

  return visited;
}
