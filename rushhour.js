var H = 8;
var W = 8;
var Wcolor = '#C8C2BD';
var Bcolor = 'rgb(9,17,26)';
var Cur = 0;

var color = [
    Bcolor,
    '#FF0000',
    '#FFFF00',
    '#EF84C1',
    '#E48E58',
    '#00FF00',
    '#FF1493',
    '#5AA08D',
    '#4C92B1',
    '#A8CB79',
    '#0000CD',
    '#AC99C1',
    '#96B1D0',
    '#ADA759'
];

//handle key input
document.onclick = tableClick;
function tableClick(e){
    Cur = map[e.target.closest('tr').rowIndex][e.target.cellIndex];
}

document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e){
    switch(e.keyCode){
        case 37: move(0); break;
        case 38: move(1); break;
        case 39: move(2); break;
        case 40: move(3); break;
        case 32: init(); break;
    }
}

//initializing functions
function initMap(){
  map = [
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1,  4,  5,  5,  6,  6,  6, -1],
      [-1,  4,  0,  7,  7,  8,  0, -1],
      [-1,  1,  1,  3,  0,  8,  0,  0],
      [-1,  2,  2,  3,  9,  9, 10, -1],
      [-1,  0, 11, 11, 13,  0, 10, -1],
      [-1, 12, 12, 12, 13,  0, 10, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1]
  ];
  shape = [
      [0, 0, 0, 0],
      [3, 1, 0, 2],
      [4, 1, 0, 2],
      [3, 3, 1, 2],
      [1, 1, 1, 2],
      [1, 2, 0, 2],
      [1, 4, 0, 3],
      [2, 3, 0, 2],
      [2, 5, 1, 2],
      [4, 4, 0, 2],
      [4, 6, 1, 3],
      [5, 2, 0, 2],
      [6, 1, 0, 3],
      [5, 4, 1, 2]
  ];
  Cur = 0;
}
function drawmap(){
  var fieldTag = "<table id=\"gameTable\" border=0>";
  for(var i=0;i<H;i++){
      fieldTag += "<tr>";
      for(var j=0;j<W;j++)
          fieldTag += "<td id=\""+String(j)+" "+String(i)+"\"></td>";
      fieldTag += "</tr>";
  }
  document.write(fieldTag);
}
function gebi(x, y){
  var ret = document.getElementById(String(y)+" "+String(x));
  return ret;
}
function setColor(){

  for(var i=0;i<H;i++){
      for(var j=0; j<W; j++){

          if(map[i][j] === -1){
              gebi(i,j).style.background = Wcolor;
          }else{
              gebi(i,j).style.background = color[map[i][j]];
          }
      }
  }
}
function init(){
  initMap();
  drawmap();
  setColor();
  Cur = 0;
}

//manipulation
var dx = [ 0, -1,  0,  1];
var dy = [-1,  0,  1,  0];
var sx = [0, 1];
var sy = [1, 0];

function SetChange(x, y, cidx){
    gebi(x,y).style.background = color[cidx];
    map[x][y] = cidx;
}
function move(dir){
    var curShape = shape[Cur];
    var Ccolor = color[Cur];
    if(Cur && curShape[2] === (dir % 2)){

      var fx = curShape[0];
      var fy = curShape[1];
      var rx = curShape[0]+ sx[curShape[2]] * (curShape[3]-1);
      var ry = curShape[1]+ sy[curShape[2]] * (curShape[3]-1);
        if(dir < 2){
          if(map[fx+dx[dir]][fy+dy[dir]] === 0){
            SetChange(fx+dx[dir], fy+dy[dir], Cur);
            SetChange(rx, ry, 0);
            shape[Cur][0] += dx[dir];
            shape[Cur][1] += dy[dir];
          }
        }else{
          if(map[rx+dx[dir]][ry+dy[dir]] === 0){
            SetChange(rx+dx[dir], ry+dy[dir], Cur);
            SetChange(fx, fy, 0);
            shape[Cur][0] += dx[dir];
            shape[Cur][1] += dy[dir];
          }
        }
    }
}



//main
init();
