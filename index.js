const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const userData = require('./user.json');


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
// link: http://localhost:8081/home
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});


/*
- Return all details from user.json file to client as JSON format
*/
// link: http://localhost:8081/profile
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ status: false, message: 'Error reading user data' });
      return;
    }
    
    try {
      const userData = JSON.parse(data);
      res.json(userData);
    } catch (error) {
      res.status(500).json({ status: false, message: 'Error parsing user data' });
    }
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

// link: http://localhost:8081/login?username=abc&password=123
router.get('/login', (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    res.status(400).json({ status: false, message: 'Username and password are required' });
    return;
  }

  if (userData.username === username && userData.password === password) {
    res.json({ status: true, message: 'User is valid' });
  } else if (userData.username !== username) {
    res.json({ status: false, message: 'Username is invalid' });
  } else if (userData.password !== password) {
    res.json({ status: false, message: 'Password is invalid' });
  }
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
// link: http://localhost:8081/logout/abc
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
