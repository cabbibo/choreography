
var eventParameters = [];

function startScene(){

  initEventParameters();
  console.log( eventParameters );
  scene.choreographer = new Choreographer( 'Paws.mp3' , eventParameters );

  scene.update = function(){

    scene.choreographer.update();

  }

  scene.start();

}



/*
 *
 */
function initEventParameters(){

  var sg = scene.geometries;
  var sm = scene.materials;

  var event1 = {};

  event1.objectArray = [];
  
  // Mandala parameters
  var mP = [
    scene.size / 500 ,
    [    1  ,    1  ,    1  ],
    [    1  ,    1  ,    1  ],
    [ sg[0] , sg[0] , sg[1] ],
    [ sm[0] , sm[1] , sm[2] ],
    [    1  ,    1  ,    1  ]
  ];

  var object = superMandala( 10 , mP );
  
  event1.objectArray.push( object );

  eventParameters.push( event1 );



}


function superMandala( amount , params , axis ){

  if( !axis )
    axis = 'x';

  superMandala =  new THREE.Object3D();

  superMandala.mandalas = [];

  for( var i = 0; i < amount; i ++ ){

    var mandala = new MANDALA(
      params[0],
      params[1],
      params[2],
      params[3],
      params[4],
      params[5]
    );

    mandala.scene.rotation[axis]  =  Math.PI * 2 * i / amount;

    superMandala.mandalas.push ( mandala );

  }

  return superMandala;

}
