

function Choreographer( song , eventParams ){

  this.clock  = new THREE.Clock();

  this.song   = song;

  this.eventParams = eventParams;

  this.createEvents();

}


Choreographer.prototype = {

  update:function(){

    this.clock.time = this.clock.getElapsedTime();

    this.checkForEvents();

    this.updateEvents();

    this.clock.oTime = this.clock.time;

  },


  updateEvents: function(){

    for( var i = 0; i < this.events.length; i++ ){

      var e = this.events[i];
      
      // Updates our event if its active
      if( e.active ){
        e.update();
      }

    }


  },

  checkForEvents:function(){

    for( var i = 0; i < this.events.length; i++ ){

      var e = this.events[i];

      /*if( this.clock.oTime < e.startTime && this.clock.time > e.startTime ){
        e.start();
      }

      if( this.clock.oTime < e.endTime && this.clock.time > e.endTime ){
        e.end();
      }*/

      e.checkForExistance();

    }


  },



  createEvents: function(){

    this.events = [];

    for( var i =  0 ; i < this.eventParams.length;  i++ ){

      var e = new Event( this , this.eventParams[i] );
      this.events.push( e );

      console.log( this.events );

    }


  }





}
