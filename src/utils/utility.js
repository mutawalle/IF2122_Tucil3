function read_file(file_name) {
    let adjacency_matrix = [];
    const fs = require('fs');
    const data = fs.readFileSync(file_name, 'utf8');
    const rows = data.split('\n');
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].trim().split(' ').map(Number);
      adjacency_matrix.push(row);
    }
    return adjacency_matrix;
  }

function print_matrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i].join(' '));
    }
}



// const adjacency_matrix = read_file('src/utils/test.txt');
// console.log(typeof adjacency_matrix[1][0], adjacency_matrix[1][0]);
// print_matrix(adjacency_matrix);