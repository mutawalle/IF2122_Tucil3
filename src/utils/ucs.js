import {euclideanDistance,readTxtFile} from 'src/utils/tool'

function ucs(graph, start, goal) {
    let queue = [[start, 0,[start]]];
    let visited = new Set();
  
    while (queue.length > 0) {
      let [current, cost,riwayat] = queue.shift();
        if (current === goal) {
        return [cost,riwayat];
      }
  
    
      visited.add(current);
  
      
      for (let i = 0; i < graph.matrix[current].length; i++) {
        if (graph.matrix[current][i] === 1 && !visited.has(i)) {
          newCost = cost + euclideanDistance(graph.node[current], graph.node[i]);
          queue.push([i, newCost,riwayat.concat(i)]);
        }
      }
      queue.sort((a, b) => a[1] - b[1]);
    }
  
    return null;
  }
  
  // test

  
let graph = readTxtFile("src/utils/test.txt")
let [a,b] = ucs(graph, 0, 1)
b.forEach(element => {
    console.log(element)
    console.log(graph.node[element].nama);   
});
console.log(a,b); // output: 2 (jalur terpendek dari node 0 ke 3 adalah 0 -> 1 -> 3 dengan cost 2)
  


