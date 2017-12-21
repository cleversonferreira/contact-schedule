let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //home
  app.get('/', (req, res) => {
    res.send('Contact Schedule API')
  });

  //findAll
  app.get('/all', (req, res) => {
    db.collection('contact').find({}).toArray(function(err, data) {
      if (err) console.log(err);
      res.send(data);
    });
  });

  //findOne
  app.get('/contact/:id', (req, res) => {
    let id = req.params.id;
    let details = { '_id': new ObjectID(id) };
    db.collection('contact').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  //new contact
  app.post('/contact', (req, res) => {
    let contact = { name: req.body.name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone };
    db.collection('contact').insert(contact, (err, result) => {
      if (err) return res.send("error" + err);
        res.send(result.ops[0]);
    });
  });

};
