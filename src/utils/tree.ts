import { randomTree } from "./randomTree";

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
}

function BFS(root: NodeTree){
  const visited : NodeTree[] = [root];
  let i = 0;
  while(i < visited.length){
    visited[i].left && visited.push(visited[i].left);
    visited[i].right && visited.push(visited[i].right);
    i++;
  }

  return visited
}

function isBalanced(root : NodeTree) {
  const visited : NodeTree[] = [root];
  const visitedleft : NodeTree[] = [root];
  const visitedright : NodeTree[] = [root];
  let i = 0;
  while(i < visited.length){
    visited[i].left && visited.push(visited[i].left);
    visited[i].right && visited.push(visited[i].right); // poe todos os elementos em uma lista
    i++;
  }
  i = 0;
  while(i < visitedleft.length && visitedright.length > i){
      visitedleft[i].left && visitedleft.push(visitedleft[i].left);
      visitedright[i].right && visitedright.push(visitedright[i].right); // poe o nó raiz e todas as extremidas em uma lista
      i++;
    }
  i = 0;
  let dir = visitedright.length-1;
  let esq = visitedleft.length-1;
  if ((esq - dir) > 1 || (esq - dir) < -1) {
      console.log("Não está balanceada");
      i = 10;
    }
  while (i < visited.length) {
    if (visited[i].left === null && visited[i].right !== null) {
      if (visited[i].right.right === null && visited[i].right.left === null) {
        i = visited.length;
        break;
        
      }
      else {
        console.log("Não esta Balanceada!");
        break;
      }
    }
    if (visited[i].right === null && visited[i].left !== null) {
      if (visited[i].left.left === null && visited[i].left.right === null) {
        i = visited.length;
        break;
      }
      else {
        console.log("Não esta Balanceada!");
        break;
      }
    }
    else {
      i++;
    }
  }
  if (i == visited.length) {
    return console.log("Esta Balanceada!");
  }
}
