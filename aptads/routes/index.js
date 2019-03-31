var express = require('express');
var app = express();
//var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('mongodb');
//var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/aptdata';
var model = require('../models/models');
var multer = require('multer');
var pathi='/Users/chaitanya/Documents/nodeProject/aptads/uploads/';
var upload = multer({dest: pathi});
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
mongoose.connect("mongodb://localhost/aptdata");
Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;
var fs = require('fs');
var gfs = Grid(conn.db);
var ObjectId = require('mongodb').ObjectId; 
var db = require('mongodb').db;



app.get('/aptlist', function(req, res) {
    
    model.Aptinfo.find({},function(err, result){
    				if (err){
    					res.send(err);
    				}else if (result.length){
    						res.render('aptlist',{"aptlist":result, "data":"1"});
    						}else{
    							res.render('aptlist',{"data":"0", "note": "No Apartment data found"});
    						}
    			});
});

app.get('/addinfo', function(req, res){
	res.render('addapt');
});

app.post('/addinfo', upload.single("apt_pic"), function(req, res){

	var aptcodes = req.body.aptname.substr(0,4);
	var writestream = gfs.createWriteStream({
      filename: req.file.originalname
    });
    finalname=pathi+req.file.filename;
    fs.createReadStream(finalname)
      .on("end", function(){
      			fs.unlink(finalname);
      })
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
	var obj = {
			apt_code : aptcodes,
			aptname  : req.body.aptname ,
			area  : req.body.area ,
			address  : req.body.address ,
			landmark  : req.body.landmark ,
			apt_pic  : writestream.id ,
			record_owner  : req.body.record_owner ,
			sales_remainder_date  : req.body.sales_remainder_date ,
			apt_status  : req.body.apt_status ,
			no_of_flats  : req.body.no_of_flats ,
			apt_categoery  : req.body.apt_categoery ,
			no_of_blocks  : req.body.no_of_blocks ,
			primary_contact  : req.body.primary_contact ,
			primary_contact_number  : req.body.primary_contact_number ,
			secondary_contact  : req.body.secondary_contact ,
			secondary_contact_number  : req.body.secondary_contact_number ,
			watchman_name  : req.body.watchman_name ,
			watchman_contact  : req.body.watchman_contact ,
			total_board_count  : req.body.total_board_count ,
			distance_from_mainroad_in_km  : req.body.distance_from_mainroad_in_km ,
			aggrement_sign_date  : req.body.aggrement_sign_date ,
			aggrement_start_date  : req.body.aggrement_start_date ,
			aggrement_end_date  : req.body.aggrement_end_date ,
			bank_name  : req.body.bank_name ,
			bank_branch_name  : req.body.bank_branch_name ,
			account_number  : req.body.account_number ,
			ifsc_code  : req.body.ifsc_code ,
			cost_of_A2  : req.body.cost_of_A2 ,
			cost_of_A3  : req.body.cost_of_A3 ,
			cost_of_2X4  : req.body.cost_of_2X4 ,
			cost_of_3X6  : req.body.cost_of_3X6 ,
			owner_flats  : req.body.owner_flats ,
			rented_flats  : req.body.rented_flats ,
			total_male_count  : req.body.total_male_count ,
			total_female_count  : req.body.total_female_count ,
			male_5_15_years  : req.body.male_5_15_years ,
			male_16_26_years  : req.body.male_16_26_years ,
			male_27_50_years  : req.body.male_27_50_years ,
			male_above_50_years  : req.body.male_above_50_years ,
			female_5_15_years  : req.body.female_5_15_years ,
			female_16_26_years  : req.body.female_16_26_years ,
			female_27_50_years  : req.body.female_27_50_years ,
			female_above_50_years  : req.body.female_above_50_years ,
			families_with_cars  : req.body.families_with_cars ,
			num_of_families_participate_activity  : req.body.num_of_families_participate_activity ,
			people_into_industry_count  : req.body.people_into_industry_count ,
			male_software  : req.body.male_software ,
			male_civil  : req.body.male_civil ,
			male_business  : req.body.male_business ,
			male_telecom  : req.body.male_telecom ,
			male_construction  : req.body.male_construction ,
			male_sales  : req.body.male_sales ,
			male_education  : req.body.male_education ,
			male_manufacturing  : req.body.male_manufacturing ,
			male_media  : req.body.male_media ,
			male_household  : req.body.male_household ,
			female_software  : req.body.female_software ,
			female_civil  : req.body.female_civil ,
			female_business  : req.body.female_business ,
			female_telecom  : req.body.female_telecom ,
			female_construction  : req.body.female_construction ,
			female_sales  : req.body.female_sales ,
			female_education  : req.body.female_education ,
			female_manufacturing  : req.body.female_manufacturing ,
			female_media  : req.body.female_media ,
			female_household  : req.body.female_household ,
			avg_maintenance_cost_per_house  : req.body.avg_maintenance_cost_per_house 
	};
	model.Aptinfo.create(obj,function(err, users){
			if (err){
				res.send("some error");
			}else {
				res.redirect('/aptlist');
			}
	});
});

app.get('/aptdetail/:code', function(req, res){
	model.Aptinfo.find({"apt_code":req.params.code}, function(err, result){
		if (err){
			res.send("some error");
		} else {
			res.render('aptdetail',{"detail":result});
		}
	})
});

app.get('/aptdelete/:code', function(req, res){
	model.Aptinfo.deleteOne({"apt_code":req.params.code}, function(err){
		if(err){
			res.send("some error");
		}else {
			res.redirect('/aptlist');
		}
	})
});

app.get('/emplist', function(req, res){
	model.Emp.find({}, function(err, result){
		if(err){
			res.send(err);
		}else if (result.length){
			res.render('emplist',{"emplist":result, "data":"1"});
		}else {
			res.render('emplist',{"data":"0", "note" : "No Employee data found"});
		}
	});
});

app.get('/addemp', function(req,res){
	res.render('addemp');
});


app.post('/addemp', upload.single("emppic"), function(req, res){
console.log("now in post block");
console.log(req.body);
console.log(req.file);
model.counters.findOneAndUpdate({_id : ObjectId("5946b0d090162761665f7f51")},{ $inc : { seq: 1 }} ,{new:true}, function(err, queryset){
        	if(err){
        		res.send(err);
        	}else{
	var writestream = gfs.createWriteStream({
      					filename: req.file.originalname
    					});
    finalname=pathi+req.file.filename;
    fs.createReadStream(finalname)
      .on("end", function(){
      			fs.unlink(finalname);
      })
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
	    var obj = {
			    	_id : queryset.seq,
			    	empname : req.body.empname,
			    	emptype : req.body.emptype,
			    	empjoindate : req.body.empjoindate,
			    	emppic : writestream.id,
			    	empdept : req.body.empdept,
			    	empbloodgroup : req.body.empbloodgroup,
			    	empdesignation : req.body.empdesignation,
			    	empdob : req.body.empdob
				}
		model.Emp.create(obj,function(err, users){
			if (err){
				res.send("some error");
			}else {
				res.redirect('/emplist');
			}
		});
    }
});
});


app.get('/empdetail/:code', function(req,res){
	console.log("entered details");
	model.Emp.find({_id:req.params.code}, function(err, result){
		if (err){
			res.send("some error");
		} else {
			res.render('empdetail',{"detail":result});
		}
	})
});



app.get("/getfile/:filename", function(req, res){
	gfs.files.find({"_id":ObjectId(req.params.filename)} ).toArray(function (err, files) {
 	    if(files.length===0){
			return res.status(400).send({
				message: 'File not found'
			});
 	    }
		res.set('Content-Type', 'image/jpeg');
		var readstream = gfs.createReadStream({
			  filename: files[0].filename
		});

	    readstream.on('data', function(data) {
	        res.send(data);
	    });
	    
	    readstream.on('end', function() {
	        res.end();        
	    });
 
		readstream.on('error', function (err) {
		  console.log('An error occurred!', err);
		  throw err;
		});
	});
});


module.exports = app;
