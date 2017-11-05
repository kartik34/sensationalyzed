//mongod --dbpath /data/db --repair
//f8d8f371-a1ae-49d9-97fc-d47639e1bb3d API Key

var express                   = require("express"),
        app                   = express(), 
        bodyparser            = require("body-parser"),
        request               = require("request"),
        mongoose              = require("mongoose"); 
      
app.use(express.static("public")); 
        
// mongoose.connect("mongodb://localhost/example_app");
mongoose.connect("mongodb://kartik34:kartik34@ds011298.mlab.com:11298/sensationalyzed");

var newsSchema = new mongoose.Schema({
    text: String, 
    news1: String, 
    news2: String, 
    news3: String 
});

var news= mongoose.model("News", newsSchema);


app.set("view engine", "ejs"); 
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.redirect("/sentiment"); 
});

app.get("/sentiment", function(req,res){
    res.render("text"); 
});
var data; 
app.get("/index", function(req,res){
    
    news.find({}, function(err,news){
        if(err){
            console.log(err); 
        }else{
        var url = "http://webhose.io/filterWebContent?token=f8d8f371-a1ae-49d9-97fc-d47639e1bb3d&format=json&ts=1507221164732&sort=crawled&q="
            + news[0].text + "%20site%3A("
            + news[0].news1 + "%20OR%20"
            + news[0].news2 + "%20OR%20"
            + news[0].news3 + ")%20language%3Aenglish%20thread.title%3A"
            + news[0].text; 
            console.log(url)
        request(url, function(error, response, body){
            
            var parsedData = JSON.parse(body);
             
            analysis(parsedData['posts']);
            
            function analysis(text){
            'use strict';
            
            let https = require ('https');
            
            let accessKey = '8f27846343ad4810a0396b92f5f4a099';
          
            let uri = 'westcentralus.api.cognitive.microsoft.com';
            let path = '/text/analytics/v2.0/sentiment';
            
            //function
            
            let response_handler = function (response) {
                let body = '';
                response.on ('data', function (d) {
                    body += d;
                });
                response.on ('end', function () {
                    let body_ = JSON.parse (body);
                    let body__ = JSON.stringify (body_, null, '  ');
                    
                    data = JSON.parse(body__); 
                    var a;
                    
				    var x = 0, y= 0, z= 0, count1 = 0, count2 = 0, count3 = 0; 
				    var array1 = [], array2 = [], array3 = []; 
			        for(a=0; a< data["documents"].length; a++){ 
			        
    			        if(data["documents"][a]["id"].toString().slice(4) == news[0].news1){ 
    			            if(data["documents"][a]["score"] >0.55){
    			                array1[x] +=1; 
    			            }
    			            x += data["documents"][a]["score"]; 
    			            count1 ++;
    			        } 
    			        else if(data["documents"][a]["id"].toString().slice(4) == news[0].news2){ 
    			            array2.push(data["documents"][a]["score"].toFixed(2)*100)
    			             y += data["documents"][a]["score"]; 
    			             count2 ++;
    			        } 
    			        else if(data["documents"][a]["id"].toString().slice(4) == news[0].news3){ 
    			            array3.push(data["documents"][a]["score"].toFixed(2)*100)
    			             z += data["documents"][a]["score"]; 
    			             count3 ++;
    			        }  
					} 
                    // console.log(data); 
                    res.render("index", {data:data, news:news, array1:array1, array2: array2, array3:array3, percent1: Math.round(( x / count1).toFixed(2)*100), percent2: Math.round(( y / count2).toFixed(2)*100), percent3:Math.round(( z / count3).toFixed(2)*100)}); 
                    
                });
                response.on ('error', function (e) {
                    console.log ('Error: ' + e.message);
                });
            };
            
            let get_sentiments = function (documents) {
                let body = JSON.stringify (documents);
            
                let request_params = {
                    method : 'POST',
                    hostname : uri,
                    path : path,
                    headers : {
                        'Ocp-Apim-Subscription-Key' : accessKey,
                    }
                };
            
                let req = https.request (request_params, response_handler);
                req.write (body);
                req.end ();
            }
            
            var documents = {'documents': []}
            var i = 1000; 
            text.forEach(function(text){
                
                i++; 
                var element = { 'id' : i+text['thread']['site'], 'language': 'en', 'text': text['title']} 
                documents['documents'].push(element); 
                
            })
        
            get_sentiments (documents);
        }

        
      });
            
        }
    })
    
    
});
app.post("/sentiment", function(req,res){
    news.remove({}, function(err, response){
        if(err){
            console.log(err)
        }else{
             news.create({
        
        text: req.body.text, 
        news1: req.body.news1, 
        news2: req.body.news2, 
        news3: req.body.news3, 
        
    }, function(err, body){
        if(err){
            console.log("An error occured");
            console.log("error");
        }else{
     
            res.redirect("/index"); 
        }
     });
        }
    }); 
   
});
var param; 
var term; 
var data2; 
app.get("/:site", function(req,res){
    news.find({}, function(err, body){
        if(err){
            console.log(err); 
        }else{
                var url = "http://webhose.io/filterWebContent?token=f8d8f371-a1ae-49d9-97fc-d47639e1bb3d&format=json&ts=1507221164732&sort=crawled&q="
            + body[0].text + "%20site%3A"
            + req.params.site + "%20language%3Aenglish%20thread.title%3A"
            + body[0].text; 
            term = body[0].text; 
            param = req.params.site; 
            request(url, function(error, response, body){
            
            console.log(body); 
            var parsedData = JSON.parse(body);
            
            
            secondaryAnalyzer(parsedData); 
//=================================================================================
                          //START OF FUNCTION
//==================================================================================  
            function secondaryAnalyzer(text2){
                'use strict';
                console.log(text2);
                let https = require ('https');
   
            let accessKey = '8f27846343ad4810a0396b92f5f4a099';
          
                let uri = 'westcentralus.api.cognitive.microsoft.com';
                let path = '/text/analytics/v2.0/sentiment';

                let response_handler = function (response) {
                    let body = '';
                    response.on ('data', function (d) {
                        body += d;
                    });
                    response.on ('end', function () {
                        let body_ = JSON.parse (body);
                        let body__ = JSON.stringify (body_, null, '  ');
                        
                      data2 = JSON.parse(body__);
                      var a, x = 0, y = 0, z = 0; 
                      for(a=0; a< 10; a++){ 

                        if(data2["documents"][a]["score"] <= 0.55 && data2["documents"][a]["score"] >= 0.45 ){ 
							   x++;
					       } 
					    } 
					  for(a=0; a< 10; a++){
							
						 if(data2["documents"][a]["score"] <0.45){ 
						    y++;
							}
					    }
					   for(a=0; a< 10; a++){ 
                    	   if(data2["documents"][a]["score"] >0.55){ 
							   z++;
					       } 
					    }
                        
                        console.log (data2);
                        res.render("showpage", {data: data2, body: parsedData, site: param, term: term, x:x, y:y, z:z })
                    });
                    response.on ('error', function (e) {
                        console.log ('Error: ' + e.message);
                    });
                };
                
                let get_sentiments = function (documents) {
                    let body = JSON.stringify (documents);
                
                    let request_params = {
                        method : 'POST',
                        hostname : uri,
                        path : path,
                        headers : {
                            'Ocp-Apim-Subscription-Key' : accessKey,
                        }
                    };
                
                    let req = https.request (request_params, response_handler);
                    req.write (body);
                    req.end ();
                }
                
                var documents = {'documents': []}
                var i = 1; 
                text2["posts"].forEach(function(text){
                   
                    i++; 
                    var element = { 'id' : i, 'language': 'en', 'text': text['title']} 
                      documents['documents'].push(element); 
                    
                })
            
                get_sentiments (documents);
                }
                //==================================================================================================      
                //                                  END OF FUNCTION
                //==================================================================================================        
            
            
    })
    

            
        }
    })

})



app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
});


