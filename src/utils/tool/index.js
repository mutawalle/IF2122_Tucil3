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