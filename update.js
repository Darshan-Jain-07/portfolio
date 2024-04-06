require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
const port = 3200;
var cors = require('cors');
app.use(cors());
app.options('*', cors());
// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }
// app.use(allowCrossDomain);
// app.set('', __dirname + '/');
// app.engine('html', require('ejs').renderFile);
const multer = require('multer');
// https://elegant-puppy-6d6e58.netlify.app/data.json


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
    },
    filename: function (req, file, cb) {
        cb(null, "data.json")
    }
})

const upload = multer({ storage: storage })



app.post("/update-description", (req, resp) => {
    let desc = req.body
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return resp.status(500).json({ message: 'Internal serer error' });
        }
        let jsonData = JSON.parse(data);

        jsonData.description = desc.text;

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal serer error' });
            }
            resp.json({ message: 'JSON file updated successfully' })
        })
    })
})

app.post('/jsondata', (req, resp) => {
    fs.readFile(`${__dirname}/data.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        resp.send(data);
    });
})


app.post('/api/upload', upload.single('file'), (req, resp) => {
    console.log("hmm")
    resp.json({ "message": "done" })
})

app.post("/update-add-skill", upload.single('file'), (req, resp) => {
    let skill = req.body;
    console.log("Current directory:", __dirname);
    fs.readFile('data.json', 'utf8', function (err, data) {
        console.log(data);
        console.log(skill);
        let jsonData = JSON.parse(data);
        skill.id = jsonData.skillsData.length + 1
        jsonData.skillsData.push(skill);
        console.log(jsonData);
        const writeStream = fs.createWriteStream("data.json");
        writeStream.write(JSON.stringify(jsonData));
        writeStream.end();
        // console.log();

        // fetch('http://localhost:3200/api/upload', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json; charset=utf-8' },
        //     body: JSON.stringify({ "file": "data2.json" })
        // }).then(response => {
        //     return response.json();
        // }).catch(err => { console.log(err); });
    })
    // fs.writeFile('data.json',body,'utf8',(err)=>{
    //     console.log(body);
    // })
    // const c = new client({ host: 'https://elegant-puppy-6d6e58.netlify.app', port: 21 });
    // c.on('ready', function () {
    //     console.log("hii")
    //     c.cwd('/data.json', function (err) {
    //         if (!err) {
    //             console.log("hii")
    //         }
    //     })
    // })
    // console.log("called")
    // const file = fs.createWriteStream("https://github.com/Darshan-Jain-07/portfolio/data.json");
    // https.get("https://github.com/Darshan-Jain-07/portfolio/data.json", response => {
    //     console.log("hii")
    //     // var stream = response.pipe(file);

    //     stream.on("finish", function () {
    //         console.log("done");
    //     });
    // });
    // fs.readFile('https://github.com/Darshan-Jain-07/portfolio/data.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return resp.status(500).json({ message: 'Internal serer error' });
    //     }
    //     let jsonData = JSON.parse(data);

    //     console.log(skill)
    //     skill.id = jsonData.skillsData.length + 1
    //     jsonData.skillsData.push(skill);
    // fs.writeFile('https://elegant-puppy-6d6e58.netlify.app/data.json', JSON.stringify(jsonData), 'utf8', err => {
    //     if (err) {
    //         console.error(err);
    //         return resp.status(500).json({ message: 'Internal server error' });
    //     }
    //     resp.json({ message: 'JSON file updated successfully' })
    // })

    // })
    // resp.send("OK")
})

app.post("/update-edit-skill", (req, resp) => {
    let skill = req.body
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return resp.status(500).json({ message: 'Internal serer error' });
        }
        let jsonData = JSON.parse(data);

        console.log(skill.skillName)
        jsonData.skillsData.forEach(element => {
            if (element.skillName == skill.skillName) {
                element.percent = skill.percent;
            }
        });
        // jsonData.skillsData.push(skill);

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal serer error' });
            }
            resp.json({ message: 'JSON file updated successfully' })
        })
    })
})

app.post("/update-delete-skill", (req, resp) => {
    let skill = req.body
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return resp.status(500).json({ message: 'Internal serer error' });
        }
        let jsonData = JSON.parse(data);

        console.log(skill.skillName)
        let i = 0;
        jsonData.skillsData.forEach(element => {
            console.log(element)
            if (element.skillName == skill.skillName) {
                console.log(jsonData.skillsData[i]);
                jsonData.skillsData.splice(i, 1);
            }
            i++;
        });
        // jsonData.skillsData.push(skill);

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal serer error' });
            }
            resp.json({ message: 'JSON file updated successfully' })
        })
    })
})

app.post("/update-add-project", (req, resp) => {
    let project = req.body
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return resp.status(500).json({ message: 'Internal serer error' });
        }
        let jsonData = JSON.parse(data);

        console.log(project)
        project.id = jsonData.projectsData.length + 1
        jsonData.projectsData.push(project);

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal serer error' });
            }
            resp.json({ message: 'JSON file updated successfully' })
        })
    })
})

app.post("/update-edit-project", (req, resp) => {
    let project = req.body
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return resp.status(500).json({ message: 'Internal serer error' });
        }
        let jsonData = JSON.parse(data);

        console.log(project.projectName)
        jsonData.projectsData.forEach(element => {
            if (element.link == project.link) {
                element.Name = project.Name;
                element.description = project.description;
            }
        });

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal serer error' });
            }
            resp.json({ message: 'JSON file updated successfully' })
        })
    })
})

app.post("/update-delete-project", (req, resp) => {
    let project = req.body
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return resp.status(500).json({ message: 'Internal serer error' });
        }
        let jsonData = JSON.parse(data);

        console.log(project.link)
        let i = 0;
        jsonData.projectsData.forEach(element => {
            console.log(element)
            if (element.link == project.link) {
                console.log(jsonData.projectsData[i]);
                jsonData.projectsData.splice(i, 1);
            }
            i++;
        });

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', err => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal serer error' });
            }
            resp.json({ message: 'JSON file updated successfully' })
        })
    })
})

// console.log("Current directory:", __dirname);

app.listen(port, () => {
    console.log(`Server running at : http://localhost:${port}/`);
})