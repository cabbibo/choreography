function MANDALA( 
  // All of these objects are arrays that must be the same length
  startingSize,   // Just a number
  size ,          // Size of each ring
  radius ,        // The radius of the each ring
  geo ,           // Geo in each ring
  material ,      // Material in each ring
  numberOf        // Number of objects in each ring
){

  this.sizeArray = size;
  this.radiusArray = radius;
  this.geoArray = geo;
  this.matArray = material;
  this.numberOfArray = numberOf;


  this.scene = new THREE.Object3D();
  this.scene.subScenes = [];

  this.subRing = 0;

  this.startingSize = startingSize;

  this.createRings(this.scene, new THREE.Vector3( 0 , 0 , 0 ) , 0);


}

MANDALA.prototype = {

  createRings:function( whichScene, position , level ){


    if( level < this.sizeArray.length){

      
      var subScene = new THREE.Object3D();
      subScene.position = position;
      subScene.subScenes = [];
      whichScene.subScenes.push(subScene);
      whichScene.add( subScene );


      for( var i = 0; i < this.numberOfArray[ level ]; i++){

        var geo = this.geoArray[ level  ];

        var mat = this.matArray[ level  ];
         
        var mesh = new THREE.Mesh( geo , mat );

        //console.log( mesh );
        var scale = this.startingSize * this.sizeArray[level];
        var radius = this.startingSize * this.radiusArray[level];


        //console.log( scale );
        mesh.scale.x = mesh.scale.y = mesh.scale.z =  scale;
  
        var rot = ( i / this.numberOfArray[ level ] ) * 2 * Math.PI;

        var pos = Math.toCart( radius, rot , 0 );

        //mesh.position = pos;
        mesh.position.x = pos.x;
        mesh.position.y = pos.z;
        mesh.position.z = scale;

        mesh.rotation.z = rot;
        subScene.add(mesh);
        //scene.add(mesh);
          
        this.createRings( subScene , mesh.position , level + 1 );

      }

    }

  }


}
