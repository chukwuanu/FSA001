var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var Site     = mongoose.model( 'Site' );
var GPSlog     = mongoose.model( 'GPSlog' );
var DGServices     = mongoose.model( 'DGServices' );
var FuelDel     = mongoose.model( 'FuelDel' );
var SiteMDel     = mongoose.model( 'SiteMDel' );
var EMCout     = mongoose.model( 'EMCout' );







exports.index_app = function(req, res, next){
	Todo.
    findOne({makasa_id: req.body.makasaID, password: req.body.password}).
    exec( function ( err, data ){
		if( err ) return next (err);
			res.status(200).send("OK"  + "1.00" + data._id);
    });				
};



exports.index = function ( req, res ){
  Todo.
    find().
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      res.render( 'index', {
          title : 'Express Todo Example',
          todos : todos
      });
    });
};


exports.add_user = function ( req, res ){
  Todo.
    find().
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      res.render( 'add_user', {
          title : 'Express Todo Example',
          todos : todos
      });
    });
};

exports.view_users = function ( req, res ){
  Todo.
    find().
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      res.render( 'view_users', {
          title : 'Express Todo Example',
          todos : todos
      });
    });
};

exports.add_sites = function ( req, res ){
  Site.
    find().
    sort( '-updated_at' ).
    exec( function ( err, sites ){
      res.render( 'add_sites', {
          title : 'Express Todo Example',
          sites : sites
      });
    });
};

exports.view_sites = function ( req, res ){
  Site.
    find().
    sort( '-updated_at' ).
    exec( function ( err, sites ){
      res.render( 'view_sites', {
          title : 'Express Todo Example',
          sites : sites
      });
    });
};


exports.view_dgs = function ( req, res ){
  DGServices.
    find().
    sort( '-updated_at' ).
    exec( function ( err, dgservicess ){
      res.render( 'view_dgs', {
          title : 'Express Todo Example',
          dgservicess : dgservicess
      });
    });
};

exports.view_fuel_del = function ( req, res ){
  FuelDel.
    find().
    sort( '-updated_at' ).
    exec( function ( err, fueldels ){
      res.render( 'view_fuel_del', {
          title : 'Express Todo Example',
          fueldels : fueldels
      });
    });
};

exports.view_site_mat_del = function ( req, res ){
  SiteMDel.
    find().
    sort( '-updated_at' ).
    exec( function ( err, sitemdels ){
      res.render( 'view_site_mat_del', {
          title : 'Express Todo Example',
          sitemdels : sitemdels
      });
    });
};

exports.view_eco = function ( req, res ){
  EMCout.
    find().
    sort( '-updated_at' ).
    exec( function ( err, emcouts ){
      res.render( 'view_eco', {
          title : 'Express Todo Example',
          emcouts : emcouts
      });
    });
};


exports.create_site = function ( req, res, next ){
  new Site({
      user_id    : req.cookies.user_id,
      id    : req.body.id,
	  site_id	 : req.body.site_id,
	  ihs_site_id : req.body.ihs_site_id,
	  take_over_date : req.body.take_over_date,
	  project_id	 : req.body.project_id,
	  longitude		 : req.body.longitude,
	  latitude	 : req.body.latitude,
	  ihs_region	 : req.body.ihs_region,
	  state	 : req.body.state,
	  site_address   : req.body.site_address,
      updated_at : Date.now()
  }).save( function ( err, site, count ){
    if( err ) return next( err );

    res.redirect( '/' );
  });
};






exports.index_populate_sites = function(req, res, next){
	var sitesLog = new Site();
	var x = req.body.ID;
	  sitesLog.id  = req.body.ID,
	  sitesLog.site_id	 = req.body.siteID,
	  sitesLog.ihs_site_id = req.body.IHSsiteID,
	  sitesLog.take_over_date = req.body.takeoverDate,
	  sitesLog.project_id	 = req.body.projectID,
	  sitesLog.longitude = req.body.longitude,
	  sitesLog.latitude	 = req.body.latitude,
	  sitesLog.ihs_region = req.body.IHSregion,
	  sitesLog.state = req.body.state,
	  sitesLog.site_address  = req.body.siteAddress
	 
	 sitesLog.save(function(err, sitesLog, count ){
		 if( err ) return next (err);
			res.status(200).send(x);
			});
					
};







 exports.create = function ( req, res, next ){
  new Todo({
      user_id    : req.cookies.user_id,
      makasa_id    : req.body.makasa_id,
	  surname	 : req.body.surname,
	  first_name : req.body.first_name,
	  other_name : req.body.other_name,
	  password	 : req.body.password,
	  email		 : req.body.email,
	  phone_no	 : req.body.phone_no,
	  imei_no	 : req.body.imei_no,
	  address	 : req.body.address,
	  position   : req.body.position,
      updated_at : Date.now()
  }).save( function ( err, todo, count ){
    if( err ) return next( err );

    res.redirect( '/' );
  });
}; 


exports.destroy_site = function ( req, res, next ){
  Site.findById( req.params.id, function ( err, site ){
   

    site.remove( function ( err, site ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

exports.destroy = function ( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
   

    todo.remove( function ( err, todo ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};






exports.edit_sites = function ( req, res ){
	var x = {};
	var m = req.params.id;
	Site.
    findOne({_id: m}).
	sort( '-updated_at' ).
    exec( function ( err, data ){
      x = data;
    });
	
	
  Site.
    find().
    sort( '-updated_at' ).
    exec( function ( err, sites ){
      res.render( 'edit_sites', {
          title   : 'Express Todo Example',
          sites   : sites,
          current : req.params.id,
		  datas: x
      });
    });
};

exports.edit = function ( req, res ){
	var x = {};
	var m = req.params.id;
	Todo.
    findOne({_id: m}).
	sort( '-updated_at' ).
    exec( function ( err, data ){
      x = data;
    });
	
  Todo.
    find().
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      res.render( 'edit', {
          title   : 'Express Todo Example',
          todos   : todos,
          current : req.params.id,
		  datas: x
      });
    });
};

exports.view_field_dgs = function ( req, res ){
	Todo.
    findOne({makasa_id: req.params.id2}).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
		x = todos;
    });
	
	
  DGServices.
    find().
    sort( '-updated_at' ).
    exec( function ( err, dgservicess ){
      res.render( 'view_field_dgs', {
          title   : 'Express Todo Example',
          dgservicess   : dgservicess,
          current : req.params.id,
		  x: x
      });
    });
};

exports.view_field_fuel_del = function ( req, res ){
	Todo.
    findOne({makasa_id: req.params.id2}).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
		x = todos;
    });
	
	
  FuelDel.
    find().
    sort( '-updated_at' ).
    exec( function ( err, fueldels ){
      res.render( 'view_field_fuel_del', {
          title   : 'Express Todo Example',
          fueldels   : fueldels,
          current : req.params.id,
		  x: x
      });
    });
};

exports.view_field_site_mat_del = function ( req, res ){
	Todo.
    findOne({makasa_id: req.params.id2}).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
		x = todos;
    });
	
	
  SiteMDel.
    find().
    sort( '-updated_at' ).
    exec( function ( err, sitemdels ){
      res.render( 'view_field_site_mat_del', {
          title   : 'Express Todo Example',
          sitemdels   : sitemdels,
          current : req.params.id,
		  x: x
      });
    });
};

exports.view_field_eco = function ( req, res ){
	Todo.
    findOne({makasa_id: req.params.id2}).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
		x = todos;
    });
	
	
  EMCout.
    find().
    sort( '-updated_at' ).
    exec( function ( err, emcouts ){
      res.render( 'view_field_eco', {
          title   : 'Express Todo Example',
          emcouts   : emcouts,
          current : req.params.id,
		  x: x
      });
    });
};



exports.update_site = function( req, res, next ){
  Site.findById( req.params.id, function ( err, site ){
    
    site.id    = req.body.id;
	site.site_id = req.body.site_id;
	site.ihs_site_id = req.body.ihs_site_id;
	site.take_over_date = req.body.take_over_date;
	site.project_id = req.body.project_id;
	site.longitude	 = req.body.longitude;
	site.latitude	 = req.body.latitude;
	site.ihs_region	 = req.body.ihs_region;
	site.state	 = req.body.state;
	site.site_address = req.body.site_address;
    site.updated_at = Date.now();
    site.save( function ( err, site, count ){
      if( err ) return next( err );

      res.redirect( '/view_sites' );
    });
  });
};


exports.update = function( req, res, next ){
  Todo.findById( req.params.id, function ( err, todo ){
    
    todo.makasa_id    = req.body.makasa_id;
	todo.surname = req.body.surname;
	todo.first_name = req.body.first_name;
	todo.other_name = req.body.other_name;
	todo.password = req.body.password;
	todo.email	 = req.body.email;
	todo.phone_no	 = req.body.phone_no;
	todo.imei_no	 = req.body.imei_no;
	todo.address	 = req.body.address;
	todo.position = req.body.position;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) return next( err );

      res.redirect( '/view_users' );
    });
  });
};

exports.index_gps = function(req, res, next){
	var gpslog = new GPSlog();
		 gpslog.latitude	=	req.body.latitude;
		 gpslog.longitude	=	req.body.longitude;
		 gpslog.accuracy	=	req.body.accuracy;
		 gpslog.timestamp	=	req.body.timestamp;
		 gpslog.makasaID	=	req.body.makasaID;
	 
	 gpslog.save(function(err, gpslog, count ){
		 if( err ) return next (err);
			res.status(200).send(gpslog._id + " " + gpslog.latitude);
			});
					
};



exports.index_dgs = function(req, res, next){
	var dgservices = new DGServices();
		dgservices.dg1kitInstalled    =    req.body.dg1kitInstalled;
		dgservices.dg1OilLevelOK    =    req.body.dg1OilLevelOK;
		dgservices.dg1OilPresSwitchOK    =    req.body.dg1OilPresSwitchOK;
		dgservices.dg1CoolantLevelOK    =    req.body.dg1CoolantLevelOK;
		dgservices.dg1FuelLinesOK    =    req.body.dg1FuelLinesOK;
		dgservices.dg1ACalternatorOK    =    req.body.dg1ACalternatorOK;
		dgservices.dg1SiteAutomationOK    =    req.body.dg1SiteAutomationOK;
		dgservices.dg1ElectricalConnectionOK    =    req.body.dg1ElectricalConnectionOK;
		dgservices.dg1SparkPlugService    =    req.body.dg1SparkPlugService;
		dgservices.dg1FuelFilterChanged    =    req.body.dg1FuelFilterChanged;
		dgservices.dg1OilFilterChanged    =    req.body.dg1OilFilterChanged;
		dgservices.dg1CleanAirFilter    =    req.body.dg1CleanAirFilter;
		dgservices.dg1AirFilterReplaced    =    req.body.dg1AirFilterReplaced;
		dgservices.dg1FanBeltChanged    =    req.body.dg1FanBeltChanged;
		dgservices.dg1WaterTrapChanged    =    req.body.dg1WaterTrapChanged;
		dgservices.dg1WaterTrapFilterReplaced    =    req.body.dg1WaterTrapFilterReplaced;
		dgservices.dg1RadiatorFinsCleaned    =    req.body.dg1RadiatorFinsCleaned;
		dgservices.dg1WaterHoseNoLeakage    =    req.body.dg1WaterHoseNoLeakage;
		dgservices.dg2kitInstalled    =    req.body.dg2kitInstalled;
		dgservices.dg2OilLevelOK    =    req.body.dg2OilLevelOK;
		dgservices.dg2OilPresSwitchOK    =    req.body.dg2OilPresSwitchOK;
		dgservices.dg2CoolantLevelOK    =    req.body.dg2CoolantLevelOK;
		dgservices.dg2FuelLinesOK    =    req.body.dg2FuelLinesOK;
		dgservices.dg2ACalternatorOK    =    req.body.dg2ACalternatorOK;
		dgservices.dg2SiteAutomationOK    =    req.body.dg2SiteAutomationOK;
		dgservices.dg2ElectricalConnectionOK    =    req.body.dg2ElectricalConnectionOK;
		dgservices.dg2SparkPlugService    =    req.body.dg2SparkPlugService;
		dgservices.dg2FuelFilterChanged    =    req.body.dg2FuelFilterChanged;
		dgservices.dg2OilFilterChanged    =    req.body.dg2OilFilterChanged;
		dgservices.dg2CleanAirFilter    =    req.body.dg2CleanAirFilter;
		dgservices.dg2AirFilterReplaced    =    req.body.dg2AirFilterReplaced;
		dgservices.dg2FanBeltChanged    =    req.body.dg2FanBeltChanged;
		dgservices.dg2WaterTrapChanged    =    req.body.dg2WaterTrapChanged;
		dgservices.dg2WaterTrapFilterReplaced    =    req.body.dg2WaterTrapFilterReplaced;
		dgservices.dg2RadiatorFinsCleaned    =    req.body.dg2RadiatorFinsCleaned;
		dgservices.dg2WaterHoseNoLeakage    =    req.body.dg2WaterHoseNoLeakage;
		dgservices.fuelTankOK    =    req.body.fuelTankOK;
		dgservices.fuelGuageAvailable    =    req.body.fuelGuageAvailable;
		dgservices.fuelGuageVisible    =    req.body.fuelGuageVisible;
		dgservices.fuelLinesChecked    =    req.body.fuelLinesChecked;
		dgservices.hybridSystemAvailable    =    req.body.hybridSystemAvailable;
		dgservices.hybridCtrlWorking    =    req.body.hybridCtrlWorking;
		dgservices.siteID    =    req.body.siteID;
		dgservices.dg1Make    =    req.body.dg1Make;
		dgservices.dg1KVA    =    req.body.dg1KVA;
		dgservices.dg1RunHour    =    req.body.dg1RunHour;
		dgservices.dg1EngineMake    =    req.body.dg1EngineMake;
		dgservices.dg1ACalternatorVolts    =    req.body.dg1ACalternatorVolts;
		dgservices.dg1BatteryStopVolts    =    req.body.dg1BatteryStopVolts;
		dgservices.dg1BatteryCrankVolts    =    req.body.dg1BatteryCrankVolts;
		dgservices.dg1ChargerRunningVolts    =    req.body.dg1ChargerRunningVolts;
		dgservices.dg1NeutralEarthVolts    =    req.body.dg1NeutralEarthVolts;
		dgservices.dg1ServicePack    =    req.body.dg1ServicePack;
		dgservices.dg1LubeOilReplaced    =    req.body.dg1LubeOilReplaced;
		dgservices.dg1CoolantLevel    =    req.body.dg1CoolantLevel;
		dgservices.dg1WaterAdded    =    req.body.dg1WaterAdded;
		dgservices.dg1OtherReplacement    =    req.body.dg1OtherReplacement;
		dgservices.dg2Make    =    req.body.dg2Make;
		dgservices.dg2KVA    =    req.body.dg2KVA;
		dgservices.dg2RunHour    =    req.body.dg2RunHour;
		dgservices.dg2EngineMake    =    req.body.dg2EngineMake;
		dgservices.dg2ACalternatorVolts    =    req.body.dg2ACalternatorVolts;
		dgservices.dg2BatteryStopVolts    =    req.body.dg2BatteryStopVolts;
		dgservices.dg2BatteryCrankVolts    =    req.body.dg2BatteryCrankVolts;
		dgservices.dg2ChargerRunningVolts    =    req.body.dg2ChargerRunningVolts;
		dgservices.dg2NeutralEarthVolts    =    req.body.dg2NeutralEarthVolts;
		dgservices.dg2ServicePack    =    req.body.dg2ServicePack;
		dgservices.dg2LubeOilReplaced    =    req.body.dg2LubeOilReplaced;
		dgservices.dg2CoolantLevel    =    req.body.dg2CoolantLevel;
		dgservices.dg2WaterAdded    =    req.body.dg2WaterAdded;
		dgservices.dg2OtherReplacement    =    req.body.dg2OtherReplacement;
		dgservices.fuelTankCapacity    =    req.body.fuelTankCapacity;
		dgservices.hybridSystemType    =    req.body.hybridSystemType;
		dgservices.IPMUmake    =    req.body.IPMUmake;
		dgservices.IPMUmode    =    req.body.IPMUmode;
		dgservices.siteObservations    =    req.body.siteObservations;
		dgservices.latitude    =    req.body.latitude;
		dgservices.longitude    =    req.body.longitude;
		dgservices.accuracy    =    req.body.accuracy;
		dgservices.timestamp    =    req.body.timestamp;
		dgservices.makasaID    =    req.body.makasaID;
	 
	 dgservices.save(function(err, dgservices, count ){
		 if( err ) return next (err);
			res.status(200).send('Hello Makasa Sun');
			});
					
};

exports.index_fd = function(req, res, next){
	var fueldel = new FuelDel();
		fueldel.siteIDFuel 	=	req.body.siteIDFuel;
		fueldel.tank1Capacity 	=	req.body.tank1Capacity;
		fueldel.tank1Balance 	=	req.body.tank1Balance;
		fueldel.tank1QuantityFilled 	=	req.body.tank1QuantityFilled;
		fueldel.tank2Capacity 	=	req.body.tank2Capacity;
		fueldel.tank2Balance 	=	req.body.tank2Balance;
		fueldel.tank2QuantityFilled 	=	req.body.tank2QuantityFilled;
		fueldel.fuelVehicleNumber 	=	req.body.fuelVehicleNumber;
		fueldel.latitude 	=	req.body.latitude;
		fueldel.longitude 	=	req.body.longitude;
		fueldel.accuracy 	=	req.body.accuracy;
		fueldel.timestamp 	=	req.body.timestamp;
		fueldel.makasaID 	=	req.body.makasaID;
	 
	 fueldel.save(function(err, fueldel, count ){
		 if( err ) return next (err);
			res.status(200).send('Hello Makasa Sun');
			});
					
};


exports.index_smd = function(req, res, next){
	var sitemdel = new SiteMDel();
		sitemdel.siteIDMaterial 	=	req.body.siteIDMaterial;
		sitemdel.material1Delivered 	=	req.body.material1Delivered;
		sitemdel.material1Quantity 	=	req.body.material1Quantity;
		sitemdel.material2Delivered 	=	req.body.material2Delivered;
		sitemdel.material2Quantity 	=	req.body.material2Quantity;
		sitemdel.material3Delivered 	=	req.body.material3Delivered;
		sitemdel.material3Quantity 	=	req.body.material3Quantity;
		sitemdel.material4Delivered 	=	req.body.material4Delivered;
		sitemdel.material4Quantity 	=	req.body.material4Quantity;
		sitemdel.timeOfMaterialDelivery 	=	req.body.timeOfMaterialDelivery;
		sitemdel.latitude 	=	req.body.latitude;
		sitemdel.longitude 	=	req.body.longitude;
		sitemdel.accuracy 	=	req.body.longitude;
		sitemdel.timestamp 	=	req.body.timestamp;
		sitemdel.makasaID 	=	req.body.makasaID;
		
	 sitemdel.save(function(err, sitemdel, count ){
		 if( err ) return next (err);
			res.status(200).send('Hello Makasa Sun');
			});
					
};


exports.index_eco = function(req, res, next){
	var emcout = new EMCout();
		emcout.siteIDCallout 	=	req.body.siteIDCallout;
		emcout.emergencyEncountered 	=	req.body.emergencyEncountered;
		emcout.emergencyDescription 	=	req.body.emergencyDescription;
		emcout.timeOfEmergency 	=	req.body.timeOfEmergency;
		emcout.latitude 	=	req.body.latitude;
		emcout.longitude 	=	req.body.longitude;
		emcout.accuracy 	=	req.body.accuracy;
		emcout.timestamp 	=	req.body.timestamp;
		emcout.makasaID 	=	req.body.makasaID;
		
	 emcout.save(function(err, emcout, count ){
		 if( err ) return next (err);
			res.status(200).send('Hello Makasa Sun');
			});
					
};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
