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
  // baca file dengan fs.readFileSync()
  const data = fs.readFileSync(filePath, 'utf8');

  // pisahkan data menjadi baris-baris
  var lines = data.split("\n");

  // buat array untuk menyimpan node
  var nodes = [];

  // buat array untuk menyimpan adjacency matrix
  var adjacencyMatrix = [];
  // loop through setiap baris
  for (var i = 1; i < lines.length; i++) {
    // pisahkan baris menjadi array angka
    var row = lines[i].trim().split(" ").map(Number);
    var nama = lines[i].trim().split(" ").map(String)[0];
    // jika ini adalah baris node
    if (i-1 < lines[0]) {
      // buat objek node baru dan tambahkan ke array nodes
      var node = {
        "id": i-1,
        "nama":nama,
        "x": row[1],
        "y": row[2]
      };
      nodes.push(node);
    }
    // jika ini adalah baris adjacency matrix
    else {
      // tambahkan array row ke adjacency matrix
      adjacencyMatrix.push(row);
    }
  }

  // buat objek JSON dari nodes dan adjacency matrix
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
    let heuristic = []
    graph.node.forEach(element => {
      heuristic.push(haversine(graph.node[goal].x,graph.node[goal].y,element.x,element.y))
      
    });
    let queue = [[start, 0,heuristic[start],[start]]];
    while(queue.length > 0){
      let current = queue.shift();
      if(current[0] == goal){
        return [current[2],current[3]];
      }
      for (let i = 0; i < graph.matrix[current[0]].length; i++) {
        if(graph.matrix[current[0]][i] != 0){
          let cost = current[1]+haversine(graph.node[current[0]].x,graph.node[current[0]].y,graph.node[i].x,graph.node[i].y);
          let temp = [i,cost,cost+heuristic[i],current[3].concat(i)];
          queue.push(temp);
        }
      }
      queue.sort((a,b) => a[2]-b[2]);
      // console.log(queue);
      // queue.forEach(element => {
      //   console.log(graph.node[element[0]].nama,heuristic[element[0]])
      // });
    }

  }
  
  /* perhitungan jarak menggunakan euclidean */
  function astarEuclidean(graph, start, goal) {
    let heuristic = []
    graph.node.forEach(element => {
      heuristic.push(euclideanDistance(graph.node[goal],element))
    });
    let queue = [[start, 0,heuristic[start],[start]]];
    while(queue.length > 0){
      let current = queue.shift();
      if(current[0] == goal){
        return [current[2],current[3]];
      }
      for (let i = 0; i < graph.matrix[current[0]].length; i++) {
        if(graph.matrix[current[0]][i] != 0){
          let cost = current[1]+euclideanDistance(graph.node[current[0]],graph.node[i]);
          let temp = [i,cost,cost+heuristic[i],current[3].concat(i)];
          queue.push(temp);
        }
      }
      queue.sort((a,b) => a[2]-b[2]);
      // console.log(queue);
      // queue.forEach(element => {
      //   console.log(graph.node[element[0]].nama,heuristic[element[0]])
      // });
    }
  }

    /* jarak menggunakan graph berbobot */
    function astarEuclidean(graph, start, goal) {
      let heuristic = []
      graph.node.forEach(element => {
        heuristic.push(euclideanDistance(graph.node[goal],element))
      });
      let queue = [[start, 0,heuristic[start],[start]]];
      while(queue.length > 0){
        let current = queue.shift();
        if(current[0] == goal){
          return [current[2],current[3]];
        }
        for (let i = 0; i < graph.matrix[current[0]].length; i++) {
          if(graph.matrix[current[0]][i] != 0){
            let cost = current[1]+graph.matrix[current[0]][i];
            let temp = [i,cost,cost+heuristic[i],current[3].concat(i)];
            queue.push(temp);
          }
        }
        queue.sort((a,b) => a[2]-b[2]);
        // console.log(queue);
        // queue.forEach(element => {
        //   console.log(graph.node[element[0]].nama,heuristic[element[0]])
        // });
      }
    }


let graph = readTxtFile("src/utils/test2.txt");
let start = 1;
let goal = 7;
let [a,b] = astarHaversine(graph, start, goal);
let [c,d] = astarEuclidean(graph, start, goal);
b.forEach(element => {
  console.log(element)
  console.log(graph.node[element].nama);   
});
console.log("haversine");
console.log(a,b);
console.log("euclidean");
d.forEach(element => {
  console.log(element)
  console.log(graph.node[element].nama);   
});
console.log(c,d);

  