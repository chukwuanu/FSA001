var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var bcrypt = require( 'bcrypt' );

var Auth = new Schema({
	user_name : String,
	password :	String
});
		Auth.methods.generateHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
	};
	Auth.methods.validPassword = function(password){
		return bcrypt.compareSync(password, this.password);
	}
mongoose.model( 'Auth', Auth );

 var Todo = new Schema({
    user_id    : String,
    makasa_id  : String,
	surname	   : String,
	first_name : String,
	other_name : String,
	email	   : String,
	password   : String,
	phone_no   : String,
	imei_no	   : String,
	address	   : String,
	position   : String,
    updated_at : Date
});
mongoose.model( 'Todo', Todo ); 

var Site = new Schema({
    user_id    : String,
    id		   : String,
	site_id	   : String,
	ihs_site_id	   : String,
	take_over_date : String,
	project_id : String,
	longitude	   : String,
	latitude   : String,
	ihs_region   : String,
	state	   : String,
	site_address : String,
	loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
    },
    updated_at : Date
});
mongoose.model( 'Site', Site );

var GPSlog = new Schema({
	 latitude	: Number,
	 longitude	: Number,
	 accuracy	: Number,
	 timestamp	: String,
	 siteID	:	String,
	 makasaID	: String,
	 makasaObjectID : String,
	 batteryLevel : Number,
	 isBatteryPlugged : String
});
mongoose.model('GPSlog', GPSlog);

var DGServices = new Schema({
	dg1kitInstalled : String,
	dg1OilLevelOK : String,
	dg1OilPresSwitchOK : String,
	dg1CoolantLevelOK : String,
	dg1FuelLinesOK : String,
	dg1ACalternatorOK : String,
	dg1SiteAutomationOK : String,
	dg1ElectricalConnectionOK : String,
	dg1SparkPlugService : String,
	dg1FuelFilterChanged : String,
	dg1OilFilterChanged : String,
	dg1CleanAirFilter : String,
	dg1AirFilterReplaced : String,
	dg1FanBeltChanged : String,
	dg1WaterTrapChanged : String,
	dg1WaterTrapFilterReplaced : String,
	dg1RadiatorFinsCleaned : String,
	dg1WaterHoseNoLeakage : String,
	dg2kitInstalled : String,
	dg2OilLevelOK : String,
	dg2OilPresSwitchOK : String,
	dg2CoolantLevelOK : String,
	dg2FuelLinesOK : String,
	dg2ACalternatorOK : String,
	dg2SiteAutomationOK : String,
	dg2ElectricalConnectionOK : String,
	dg2SparkPlugService : String,
	dg2FuelFilterChanged : String,
	dg2OilFilterChanged : String,
	dg2CleanAirFilter : String,
	dg2AirFilterReplaced : String,
	dg2FanBeltChanged : String,
	dg2WaterTrapChanged : String,
	dg2WaterTrapFilterReplaced : String,
	dg2RadiatorFinsCleaned : String,
	dg2WaterHoseNoLeakage : String,
	fuelTankOK : String,
	fuelGuageAvailable : String,
	fuelGuageVisible : String,
	fuelLinesChecked : String,
	hybridSystemAvailable : String,
	hybridCtrlWorking : String,
	siteID : String,
	dg1Make : String,
	dg1KVA : String,
	dg1RunHour : String,
	dg1EngineMake : String,
	dg1ACalternatorVolts : String,
	dg1BatteryStopVolts : String,
	dg1BatteryCrankVolts : String,
	dg1ChargerRunningVolts : String,
	dg1NeutralEarthVolts : String,
	dg1ServicePack : String,
	dg1LubeOilReplaced : String,
	dg1CoolantLevel : String,
	dg1WaterAdded : String,
	dg1OtherReplacement : String,
	dg2Make : String,
	dg2KVA : String,
	dg2RunHour : String,
	dg2EngineMake : String,
	dg2ACalternatorVolts : String,
	dg2BatteryStopVolts : String,
	dg2BatteryCrankVolts : String,
	dg2ChargerRunningVolts : String,
	dg2NeutralEarthVolts : String,
	dg2ServicePack : String,
	dg2LubeOilReplaced : String,
	dg2CoolantLevel : String,
	dg2WaterAdded : String,
	dg2OtherReplacement : String,
	fuelTankCapacity : String,
	hybridSystemType : String,
	IPMUmake : String,
	IPMUmode : String,
	siteObservations : String,
    latitude : Number,
    longitude : Number,
    accuracy : Number,
    timestamp : String,
    makasaID : String,
	makasaObjectID : String,
	batteryLevel : Number,
	isBatteryPlugged : String
});
mongoose.model('DGServices', DGServices);

var FuelDel = new Schema({
	siteIDFuel : String,
    tank1Capacity : String,
	tank1Balance : String,
	tank1QuantityFilled : String,
	tank2Capacity : String,
	tank2Balance : String,
	tank2QuantityFilled : String,
	fuelVehicleNumber : String,
    latitude : Number,
	longitude : Number,
	accuracy : Number,
	timestamp : String,
	makasaID : String,
	makasaObjectID  :	String,
	batteryLevel : Number,
	isBatteryPlugged : String
});
mongoose.model('FuelDel', FuelDel);

var SiteMDel = new Schema({
	siteIDMaterial :String,
	material1Delivered :String,
	material1Quantity :String,
	material2Delivered :String,
	material2Quantity :String,
	material3Delivered :String,
	material3Quantity :String,
	material4Delivered :String,
	material4Quantity :String,
	timeOfMaterialDelivery :String,
	latitude : Number,
	longitude : Number,
	accuracy : Number,
	timestamp : String,
	siteID	:	String,
	makasaID : String,
	makasaObjectID : String,
	batteryLevel : Number,
	isBatteryPlugged : String
});
mongoose.model('SiteMDel', SiteMDel);

var EMCout = new Schema({
	siteIDCallout :String,
	emergencyEncountered :String,
	emergencyDescription :String,
	timeOfEmergency :String,
	latitude : Number,
	longitude : Number,
	accuracy : Number,
	timestamp : String,
	siteID	:	String,
	makasaID : String,
	makasaObjectID : String,
	batteryLevel : Number,
	isBatteryPlugged : String
});
mongoose.model('EMCout', EMCout);




