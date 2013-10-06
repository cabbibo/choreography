
function initScene(){

  scene = new THREE.Scene();

  scene.size = SCENESIZE;

  scene.container = document.createElement( 'div' );
  document.body.appendChild( scene.container );

  scene.camera = new THREE.PerspectiveCamera( 
    40, 
    window.innerWidth / window.innerHeight , 
    SCENESIZE / 50 , 
    SCENESIZE * 8 
  );

  scene.camera.position.y = scene.size;

  scene.controls = new THREE.OrbitControls(scene.camera);

  scene.controls.minDistance = scene.size/2;
  scene.controls.maxDistance = scene.size*4;

  scene.fog = new THREE.Fog( BACKGROUNDCOLOR , scene.size , scene.size * 8 );

  scene.renderer = new THREE.WebGLRenderer({antialias:true});
  scene.renderer.setSize( window.innerWidth, window.innerHeight );

  scene.container.appendChild( scene.renderer.domElement );

  scene.stats = new Stats();
  scene.stats.domElement.style.position = 'absolute';
  scene.stats.domElement.style.bottom = '0px';
  scene.stats.domElement.style.right = '0px';
  //stats.domElement.style.visibility = 'hidden';
  
  scene.container.appendChild( scene.stats.domElement );

  scene.tileRenderer = new TileRenderer( scene.renderer, scene, scene.camera, 3, 3 );

  initLights();
  initControls();
  initModels();
  initMaterials();

  onWindowResize();

  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener( 'mousemove', onMouseMove, false );





}

function onWindowResize () {


  scene.camera.aspect = window.innerWidth / window.innerHeight;
  scene.camera.updateProjectionMatrix();

  scene.renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove(event) {

  mouseX = ( event.clientX - window.innerWidth  / 2 ) * 10;
  mouseY = ( event.clientY - window.innerHeight / 2 ) * 10;

}

function initControls(){
  
  // Gets our scene animating
  scene.animate = function(){

    scene.requestId = requestAnimationFrame( scene.animate );
    
    scene.controls.update();
    scene.stats.update();

    // Define this part of it once we get the
    // rest of the scene / choreographer set up
    // if( scene.update )
    scene.update();

    scene.render();

  }

  // Calls our render function. 
  // Seperating this out, so if we want to render a single frame
  // thats doable
  scene.render = function(){

    scene.renderer.render( scene , scene.camera );

  }

  // Starts the scene animating
  scene.start = function(){

    if( !this.requestId ){
      this.animate();
    }else{
      console.log( 'scene already started' );
    }

  }

  // Stops the scene from animating
  scene.stop = function(){
    if( requestId ){
      cancelAnimationFrame( this.requestId );
      this.requestId = undefined;
    }else{
      console.log( 'scene already stopped' );
    }

  }



}



function initLights(){

  scene.lights = [];

  for( var i =0; i < lightParams.length; i ++ ){

    console.log('a');
    var light = new THREE.DirectionalLight( lightParams[i] , .1);
   
    // Making sure that we have lights from all directions
    var r = i % 6;

    if      ( r == 0 ){
      light.position.set(  0 ,  0 ,  1 ).normalize();
    }else if( r == 1 ){
      light.position.set(  0 ,  1 ,  0 ).normalize();
    }else if( r == 2 ){
      light.position.set(  1 ,  0 ,  0 ).normalize();
    }else if( r == 3 ){
      light.position.set( -1 ,  0 ,  0 ).normalize();
    }else if( r == 4 ){
      light.position.set(  0 , -1 ,  0 ).normalize();
    }else if( r == 5 ){
      light.position.set(  0 ,  0 , -1 ).normalize();
    }

    scene.add( light );
    scene.lights.push( light );

  }

}


function initMaterials(){

  scene.materials = [];

  for( var i = 0; i < materialParams.length; i ++){

    var material = new THREE.MeshPhongMaterial({

      color:        materialParams[i][0],
      emissive:     materialParams[i][1],
      specular:     materialParams[i][0], // Same for Shiny
      shininess:    10000000,             // Big  for Shiny
      ambient:      materialParams[i][2],             
      shading:      THREE.FlatShading,
      side:         THREE.DoubleSide,
      opacity:      1,
      transparent:  true                  // Make fadeable
        
    });
  
    scene.materials.push( material );

  }

}


function initModels(){

  scene.objLoader = new THREE.OBJLoader();

  scene.geometries    = [];
  scene.geometryData  = [];

  for( var i = 0 ; i < modelParams.length; i ++ ){

    var m = modelParams[i];
    
    scene.objLoader.load( m[0] , function( object ){

      for( var j = 0; j < object.children.length; j++ ){

        // Make sure we only extract the geometries we care about 
        for( var k = 0 ; k < m[1].length; k++ ){

          if( m[1][k] == j ){

            var child = object.children[ j ];
            if( child instanceof THREE.Mesh ){

              var geometry = child.geometry;
              console.log( geometry );
              var data = geometry.clone();
              scene.geometries.push( geometry );
              scene.geometryData.push( data );

            }else{
              console.log( 'NOT A THREE MESH' );
            }
          }
        }   // k
      }     // j

      // One step Closer to Starting the Scene !!!!
      loader.loadBarAdd();

    });



  }         // i



}
