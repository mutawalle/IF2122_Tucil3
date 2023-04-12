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

// function readTxtFile(filePath) {
//   const fs = require('fs');
//   const data = fs.readFileSync(filePath, 'utf8');
//   var lines = data.split("\n");
//   var nodes = [];
//   var adjacencyMatrix = [];
//   for (var i = 1; i < lines.length; i++) {
//     var row = lines[i].trim().split(" ").map(Number);
//     var nama = lines[i].trim().split(" ").map(String)[0];
//     if (i-1 < lines[0]) {
//       var node = {
//         "id": i-1,
//         "nama":nama,
//         "x": row[1],
//         "y": row[2]
//       };
//       nodes.push(node);
//     }
//     else {
//       adjacencyMatrix.push(row);
//     }
//   }
//   var graph = {
//     "node": nodes,
//     "matrix": adjacencyMatrix
//   };
//   return graph;
// }

function euclideanDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }


/* perhitungan menggunakan euclidean distance */
export function ucsEuclidean(graph, start, goal) {
  
    let queue = [[start, 0,[start]]];
    let visited = new Set();
  
    while (queue.length > 0) {
      let [current, cost,riwayat] = queue.shift();
        if (current === goal) {
        return [cost,riwayat];
      }
  
    
      visited.add(current);
  
      
      for (let i = 0; i < graph.matrix[current].length; i++) {
        if (graph.matrix[current][i] > 0 && !visited.has(i)) {
          let newCost = cost + euclideanDistance(graph.node[current], graph.node[i]);
          queue.push([i, newCost,riwayat.concat(i)]);
        }
      }
      queue.sort((a, b) => a[1] - b[1]);
      console.log("queue",queue)
    }
  
    return null;
  }
  
/* perhitungan menggunakan haversine distance */
export function ucsHaversine(graph, start, goal) {
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
          let newCost = cost + haversine(graph.node[current].x, graph.node[current].y, graph.node[i].x, graph.node[i].y);
          queue.push([i, newCost,riwayat.concat(i)]);
        }
      }
      queue.sort((a, b) => a[1] - b[1]);
    }
  
    return null;
  }

  // test

export function ucsGraphBerbobot(graph,start,goal){
  let queue = [[start, 0,[start]]];
  let visited = new Set();
  while (queue.length > 0) {
    let [current, cost,riwayat] = queue.shift();
      if (current === goal) {
      return [cost,riwayat];
    }

  
    visited.add(current);

    
    for (let i = 0; i < graph.matrix[current].length; i++) {
      if (graph.matrix[current][i] > 0 && !visited.has(i)) {
        let newCost = cost + graph.matrix[current][i];
        queue.push([i, newCost,riwayat.concat(i)]);
      }
    }
    queue.sort((a, b) => a[1] - b[1]);
  }

  return null;
}

// let graph = {
//   "node": [
//       {
//           "id": 0,
//           "nama": "1",
//           "x": 107.60846049940275,
//           "y": -6.893823255271326
//       },
//       {
//           "id": 1,
//           "nama": "2",
//           "x": 107.60822685201477,
//           "y": -6.887826305646492
//       },
//       {
//           "id": 2,
//           "nama": "3",
//           "x": 107.61147195462561,
//           "y": -6.8872032459452095
//       },
//       {
//           "id": 3,
//           "nama": "4",
//           "x": 107.61161637418684,
//           "y": -6.884913888528425
//       },
//   ],
//   "matrix": [
//       [0,4,7,12],
//       [4,0,8,3],
//       [7,8,0,4],
//       [12,3,4,1],
//   ]
// }
// if(ucsGraphBerbobot(graph, 0, 3)==null){
//   console.log("tidak ada jalur")
// }else{
// let [a,b] = ucsGraphBerbobot(graph, 3, 3)
//   console.log("euclidean")
//   b.forEach(element => {
//       console.log(graph.node[element].nama);   
//   });
//   console.log(a,b); 
//   // console.log("haversine")
// }
// let [c,d] = ucsHaversine(graph, 1, 7)
// d.forEach(element => {
//   console.log(element)
//   console.log(graph.node[element].nama);   
// });
// console.log(c,d);
// let graph = readTxtFile("src/utils/test.txt")
// function gantisatu(matrix,graph){
//   for(let i=0;i<matrix.length;i++){
//     for(let j=0;j<matrix[i].length;j++){
//       if(matrix[i][j]==1){
//         matrix[i][j]= euclideanDistance(graph.node[i], graph.node[j])
//       }
//     }
//   }
//   return matrix

// }
// graph.matrix = gantisatu(graph.matrix,graph)
// console.log(graph)
