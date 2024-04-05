require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
const port = 3200;
var cors = require('cors');
const { render } = require('express/lib/response');
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);

app.post("/update-description",(req,resp)=>{
    let desc = req.body
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);

        jsonData.description = desc.text;

        fs.writeFile('data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
})

app.post("/update-add-skill",(req,resp)=>{
    let skill = req.body
    fs.readFile('https://660aa11ebd20169d5f78b3cc--elegant-puppy-6d6e58.netlify.app/data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);

        console.log(skill)
        skill.id = jsonData.skillsData.length + 1
        jsonData.skillsData.push(skill);

        fs.writeFile('https://660aa11ebd20169d5f78b3cc--elegant-puppy-6d6e58.netlify.app/data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
    resp.send("OK")
})

app.post("/update-edit-skill",(req,resp)=>{
    let skill = req.body
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);

        console.log(skill.skillName)
        jsonData.skillsData.forEach(element => {
            if (element.skillName == skill.skillName) {
                element.percent = skill.percent;
            }
        });
        // jsonData.skillsData.push(skill);

        fs.writeFile('data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
})

app.post("/update-delete-skill",(req,resp)=>{
    let skill = req.body
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);
        
        console.log(skill.skillName)
        let i=0;
        jsonData.skillsData.forEach(element => {
            console.log(element)
            if (element.skillName == skill.skillName) {
                console.log(jsonData.skillsData[i]);
                jsonData.skillsData.splice(i,1);
            }
            i++;
        });
        // jsonData.skillsData.push(skill);
        
        fs.writeFile('data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
})

app.post("/update-add-project",(req,resp)=>{
    let project = req.body
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);

        console.log(project)
        project.id = jsonData.projectsData.length + 1
        jsonData.projectsData.push(project);

        fs.writeFile('data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
})

app.post("/update-edit-project",(req,resp)=>{
    let project = req.body
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);

        console.log(project.projectName)
        jsonData.projectsData.forEach(element => {
            if (element.link == project.link) {
                element.Name = project.Name;
                element.description = project.description;
            }
        });

        fs.writeFile('data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
})

app.post("/update-delete-project",(req,resp)=>{
    let project = req.body
    fs.readFile('data.json','utf8',(err,data)=>{
        if(err){
            console.error(err);
            return resp.status(500).json({message:'Internal serer error'});
        }
        let jsonData = JSON.parse(data);
        
        console.log(project.link)
        let i=0;
        jsonData.projectsData.forEach(element => {
            console.log(element)
            if (element.link == project.link) {
                console.log(jsonData.projectsData[i]);
                jsonData.projectsData.splice(i,1);
            }
            i++;
        });
        
        fs.writeFile('data.json',JSON.stringify(jsonData),'utf8',err=>{
            if(err){
                console.error(err);
                return resp.status(500).json({message:'Internal serer error'});
            }
            resp.json({message:'JSON file updated successfully'})
        })
    })
})

app.get("/",(req,resp)=>{
    resp.render('index.html');
})
// console.log("Current directory:", __dirname);

app.listen(port,()=>{
    console.log(`Server running at : http://localhost:${port}/`);
})