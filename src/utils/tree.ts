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

  toString(){
    const left = this.left ? `${this.left.toString()}` : '';
    const right = this.right ? `${this.right.toString()}` : '';

    return `(${this.value}${left}${right})`
  }
}

export var Check = {

  getHeight : function (root: NodeTree) {
    if (root === null) {
      return 0; 
    } 
    // console.log(Math.max(Check.getHeight(root.left), Check.getHeight(root.right)) + 1);
    return Math.max(Check.getHeight(root.left), Check.getHeight(root.right)) + 1;
  },

  isBalanced : function (root: NodeTree) {
    if (root === null) {
      return true;
    }
    var heightDifference = Math.abs(Check.getHeight(root.left) - Check.getHeight(root.right));
    // console.log(heightDifference);
    if (heightDifference > 1) {
      return false;
    } else {
      return Check.isBalanced(root.left) && Check.isBalanced(root.right);
    }
  }

};

