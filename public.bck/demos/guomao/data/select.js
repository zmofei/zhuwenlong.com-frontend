var fs = require('fs')

var lt = [12962295.76,4828516.48];
var rb = [12968431.76,4823620.49];
var newLoc = [];

fs.readFile('./zuobiao_local.json',function(err,data){
    console.log('err',err);
    var json = JSON.parse(data)
    for(var i in json){
        var isDel = true ;
        for(var j in json[i].geo){
            var x = json[i].geo[j][0] 
            var y = json[i].geo[j][1] 
            if(x>=lt[0] && x<=rb[0] && y<=lt[1] && y>=rb[1]){
                console.log(x,y)
                isDel = false;
                break;
            }
        }
        if(!isDel){
            newLoc.push(json[i])
        }
    }

    fs.writeFile('newLoc',JSON.stringify(newLoc),function(){})
    console.log(newLoc)
})
