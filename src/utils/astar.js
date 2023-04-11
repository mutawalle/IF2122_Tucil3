function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}


function readTxtFile(filePath) {
  const fs = require('fs');
  const data = fs.readFileSync(filePath, 'utf8');
  var lines = data.split("\n");
  var nodes = [];
  var adjacencyMatrix = [];
  for (var i = 1; i < lines.length; i++) {
    var row = lines[i].trim().split(" ").map(Number);
    var nama = lines[i].trim().split(" ").map(String)[0];
    if (i-1 < lines[0]) {
      var node = {
        "id": i-1,
        "nama":nama,
        "x": row[1],
        "y": row[2]
      };
      nodes.push(node);
    }
    else {
      adjacencyMatrix.push(row);
    }
  }
  var graph = {
    "node": nodes,
    "matrix": adjacencyMatrix
  };

return graph;
}

function euclideanDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
/* perhitungan jarak menggunakan haversine */
  function astarHaversine(graph, start, goal) {
    /* astar algorithm */
    let heuristic = []
    let visited = new Set();
    graph.node.forEach(element => {
      heuristic.push(haversine(graph.node[goal].x,graph.node[goal].y,element.x,element.y))
    }
    );
    let queue = [[start, 0,heuristic[start],[start]]];
    while(queue.length > 0){
      let current = queue.shift();
      visited.add(current[0]);
      if(current[0] == goal){
        return [current[2],current[3]];
      }
      for (let i = 0; i < graph.matrix[current[0]].length; i++) {
        if(graph.matrix[current[0]][i] > 0 && !visited.has(i)){
          let cost = current[1]+haversine(graph.node[current[0]].x,graph.node[current[0]].y,graph.node[i].x,graph.node[i].y);
          let temp = [i,cost,cost+heuristic[i],current[3].concat(i)];
          queue.push(temp);
        }
      }
      queue.sort((a,b) => a[2] - b[2]);
      console.log(queue);
    }
    return null;

  }
  
  /* perhitungan jarak menggunakan euclidean */
  function astarEuclidean(graph, start, goal) {
    let heuristic = []
    let visited = new Set();
    graph.node.forEach(element => {
      heuristic.push(haversine(graph.node[goal].x,graph.node[goal].y,element.x,element.y))
    }
    );
    let queue = [[start, 0,heuristic[start],[start]]];
    while(queue.length > 0){
      let current = queue.shift();
      visited.add(current[0]);
      if(current[0] == goal){
        return [current[2],current[3]];
      }
      for (let i = 0; i < graph.matrix[current[0]].length; i++) {
        if(graph.matrix[current[0]][i] > 0 && !visited.has(i)){
          let cost = current[1]+euclideanDistance(graph.node[current[0]],graph.node[i]);
          let temp = [i,cost,cost+heuristic[i],current[3].concat(i)];
          queue.push(temp);
        }
      }
      queue.sort((a,b) => a[2] - b[2]);
    }
    return null;
  }

    /* jarak menggunakan graph berbobot */
    function astarEuclidean(graph, start, goal) {
      let heuristic = []
    let visited = new Set();
    graph.node.forEach(element => {
      heuristic.push(haversine(graph.node[goal].x,graph.node[goal].y,element.x,element.y))
    }
    );
    let queue = [[start, 0,heuristic[start],[start]]];
    while(queue.length > 0){
      let current = queue.shift();
      visited.add(current[0]);
      if(current[0] == goal){
        return [current[2],current[3]];
      }
      for (let i = 0; i < graph.matrix[current[0]].length; i++) {
        if(graph.matrix[current[0]][i] > 0 && !visited.has(i)){
          let cost = current[1]+graph.matrix[current[0]][i];
          let temp = [i,cost,cost+heuristic[i],current[3].concat(i)];
          queue.push(temp);
        }
      }
      queue.sort((a,b) => a[2] - b[2]);
    }
    return null;
    }


let graph = readTxtFile("src/utils/test.txt");
let start = 0;
let goal = 1;
if(astarHaversine(graph, start, goal) == null){
  console.log("tidak ada jalur");
}else{
  console.log("haversine");
  let [a,b] = astarHaversine(graph, start, goal);
  console.log(a,b);
  b.forEach(element => {
    console.log(graph.node[element].nama);
  }
  );
}
// console.log(a,b);
// console.log("euclidean");
// d.forEach(element => {
//   console.log(element)
//   console.log(graph.node[element].nama);   
// });
// console.log(c,d);

  