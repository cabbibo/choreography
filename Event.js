
var testMesh = new THREE.Mesh( 
  new THREE.CubeGeometry( SCENESIZE ) , 
  new THREE.MeshNormalMaterial()
)

/* TODO: 
    
   - Build Out subEvent Functionality for translating / scaling scene while active
   - Utilize Tween.js for fade in and fade out

*/


function Event( choreographer , params ){

  this.params = _.defaults( params || {}, {

    startTime:                      0,
    fadeInTime:                     3,
    endTime:                       40,
    fadeOutTime:                    5, 
    objectArray:        [ testMesh ] ,

    transition:               'scale',

    // This is the function that will be called while this event is in 
    // existance
    update:   function(){

    }

  });

  this.startTime    = this.params.startTime;
  this.fadeInTime   = this.params.fadeInTime;
  this.endTime      = this.params.endTime;
  this.fadeOutTime  = this.params.fadeOutTime;


  this.scene = new THREE.Object3D();

  // Adding all the objects to the scene 
  for( var i = 0; i < this.params.objectArray.length; i ++ ){
  
    this.scene.add( this.params.objectArray[i] );

  }


  // 
  this.choreographer = choreographer;

  // Because I'm an asshole / lazy this.C means this.choreographer
  this.C = this.choreographer;

  this.active = false;


}


Event.prototype = {

  // This update will only be called if this event is active
  update:function(){

    this.params.update();
    this.transition();

  },



  checkForExistance:function(){

    if( this.C.clock.time > this.startTime && this.C.clock.time < this.endTime){

      this.active = true;

    }else{

      this.active = false;

    }

  },



  // does the fading in and fading out
  transition: function(){

    var percentage;
    var fading = false;

    // Fading in
    if( this.C.clock < this.startTime + this.fadeInTime ){

      fading = true;
      percentage = (this.C.clock.time - this.startTime)  / this.fadeInTime;
      this.fadeIn( percentage );
      
    }else if( this.C.clock < this.endTime + this.fadeOutTime ){

      fading = true;
      percentage = ( this.C.clock.time - this.endTime ) / this.fadeOutTime;
      this.fadeOut( percentage );

    }




  },

  fadeIn: function( percentage ){

    if( this.params.transition == 'scale' ){
      
      this.scene.scale.x = percentage;
      this.scene.scale.y = percentage;
      this.scene.scale.z = percentage;

    }else{

      console.log('fix me');

    }


  },

  fadeOut: function( percentage ){

    if( this.params.transition == 'scale' ){
      
      this.scene.scale.x = 1 - percentage;
      this.scene.scale.y = 1 - percentage;
      this.scene.scale.z = 1 - percentage;

    }else{

      console.log('fix me');

    }


  }


}

