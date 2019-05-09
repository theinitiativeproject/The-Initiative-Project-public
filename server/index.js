var express = require('express');
var bodyParser = require('body-parser');

var app = express();

<<<<<<< HEAD
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
=======
app.use(express.static(__dirname + '/../react-client/dist'));

// app.get('/items', function(req, res) {
//   items.selectAll(function(err, data) {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });
>>>>>>> 2884a970a2c59955ea1607926dcf766e3b6cff44

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
