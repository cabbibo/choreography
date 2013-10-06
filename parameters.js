// Some Global parameters
var SCENESIZE = 1000;
var BACKGROUNDCOLOR = 0x000000;


var colors = {

  light1: 0xffff00,
  light2: 0xff0000,
  light3: 0x0000ff,

  dark1:  0xffaa00,
  dark2:  0xff33cc,
  dark3:  0xaaff22,
  dark4:  0xee3333,
  dark5:  0xeeaa00,
  dark6:  0xff00ff,

}

var lightParams = [  

  colors.light1,
  colors.light2,
  colors.light3,

];

// Defining multiple colors for each material param,
// because we are using phong materials
var materialParams = [

  [ colors.dark1, colors.dark2, colors.dark3 ], 
  [ colors.dark3, colors.dark1, colors.dark2 ], 
  [ colors.dark1, colors.dark5, colors.dark6 ], 
  [ colors.dark5, colors.dark4, colors.dark2 ], 
  [ colors.dark2, colors.dark6, colors.dark2 ] 

];


var modelParams = [

  // First is file, second is which geometries we want
  [ '/allSiteLib/models/tree2.obj' , [ 9 , 10 , 11 , 12 , 13 ,15 ] ],



]
