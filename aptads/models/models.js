var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/aptdata';
var connection = mongoose.createConnection(url);


var boardDetail = new mongoose.Schema({
board_location : {type : String, require : true, uppercase: true},
block_name : {type : String, require : true, uppercase: true},
board_type : {type : String, require : true, uppercase: true},
board_size : {type : String, require : true, uppercase: true},
board_code : {type : String, require : true, uppercase: true},
board_status : {type : String, require : true, uppercase: true},
board_pic : {type : String, require : true},//{ data: Buffer, contentType: String }
});

//var boarddetail = module.exports = connection.model('boarddetail',boardDetail);

var aptinfo = new mongoose.Schema({
apt_code : {type : String, require : true, uppercase: true},
aptname : {type : String, require : true, uppercase: true},
area : {type : String, require : true, uppercase: true},
address : {type : String, require : true, uppercase: true},
landmark : {type: String, uppercase: true},
apt_pic : {type : String, require : true},//{data: Buffer, contentType: String},
record_owner : {type: String, uppercase: true},
sales_remainder_date : {type : Date},
apt_status : {type : String, require : true, uppercase: true},
no_of_flats : {type : Number, min : 10, max : 2000},
apt_categoery : {type: String, uppercase: true},
no_of_blocks : {type : Number, min : 10, max : 2000},
primary_contact : {type : String, require : true, uppercase: true},
primary_contact_number : {type : Number, min : 7000000000, max : 9999999999, require:true},
secondary_contact : {type : String, require : true, uppercase: true},
secondary_contact_number : {type : Number, min : 7000000000, max : 9999999999},
watchman_name : {type : String, require : true, uppercase: true},
watchman_contact : {type : Number, min : 7000000000, max : 9999999999},
total_board_count : {type : Number, min : 10, max : 2000},
distance_from_mainroad_in_km : {type : Number, min : 10, max : 2000},
aggrement_sign_date : {type : Date},
aggrement_start_date : {type : Date},
aggrement_end_date : {type : Date},
bank_name : {type : String, require : true, uppercase: true},
bank_branch_name : {type : String, require : true, uppercase: true},
account_number : {type : Number, min : 10, max : 2000},
ifsc_code : {type : String, require : true, uppercase: true},
cost_of_A2 : {type : Number, min : 10, max : 2000},
cost_of_A3 : {type : Number, min : 10, max : 2000},
cost_of_2X4 : {type : Number, min : 10, max : 2000},
cost_of_3X6 : {type : Number, min : 10, max : 2000},
owner_flats : {type : Number, min : 10, max : 2000},
rented_flats : {type : Number, min : 10, max : 2000},
total_male_count : {type : Number, min : 10, max : 2000},
total_female_count : {type : Number, min : 10, max : 2000},
male_5_15_years : {type : Number, min : 10, max : 2000},
male_16_26_years : {type : Number, min : 10, max : 2000},
male_27_50_years : {type : Number, min : 10, max : 2000},
male_above_50_years : {type : Number, min : 10, max : 2000},
female_5_15_years : {type : Number, min : 10, max : 2000},
female_16_26_years : {type : Number, min : 10, max : 2000},
female_27_50_years : {type : Number, min : 10, max : 2000},
female_above_50_years : {type : Number, min : 10, max : 2000},
families_with_cars : {type : Number, min : 10, max : 2000},
num_of_families_participate_activity : {type : Number, min : 10, max : 2000},
people_into_industry_count : {type : Number, min : 10, max : 2000},
male_software : {type : Number, min : 10, max : 2000},
male_civil : {type : Number, min : 10, max : 2000},
male_business : {type : Number, min : 10, max : 2000},
male_telecom : {type : Number, min : 10, max : 2000},
male_construction : {type : Number, min : 10, max : 2000},
male_sales : {type : Number, min : 10, max : 2000},
male_education : {type : Number, min : 10, max : 2000},
male_manufacturing : {type : Number, min : 10, max : 2000},
male_media : {type : Number, min : 10, max : 2000},
male_household : {type : Number, min : 10, max : 2000},
female_software : {type : Number, min : 10, max : 2000},
female_civil : {type : Number, min : 10, max : 2000},
female_business : {type : Number, min : 10, max : 2000},
female_telecom : {type : Number, min : 10, max : 2000},
female_construction : {type : Number, min : 10, max : 2000},
female_sales : {type : Number, min : 10, max : 2000},
female_education : {type : Number, min : 10, max : 2000},
female_manufacturing : {type : Number, min : 10, max : 2000},
female_media : {type : Number, min : 10, max : 2000},
female_household : {type : Number, min : 10, max : 2000},
avg_maintenance_cost_per_house : {type : Number, min : 10, max : 2000},
board_detail : boardDetail
},{collection : 'aptdata'},{versionkey : '_somethingElse'});




var emp = new mongoose.Schema({
_id : {type : Number},
empname : {type : String, require : true, uppercase: true},
emptype : {type : String, require : true, uppercase: true},
empjoindate : {type: Date, require : true},
emppic : {type:String},
empdept : {type : String, require : true, uppercase: true},
empbloodgroup : {type:String, uppercase:true},
empdesignation : {type:String},
empdob : {type:Date}
},{collection : 'emp'},{versionkey : '_somethingElse'});

var counters = new mongoose.Schema({
	seq : {type:Number}
},{collection:'counters'},{versionkey : '_somethingElse'});

var Aptinfo = connection.model('aptdata', aptinfo);
var Emp = connection.model('emp',emp);
var counters = connection.model('counters',counters);

module.exports = {
	Aptinfo : Aptinfo,
	Emp : Emp,
	counters : counters
}



