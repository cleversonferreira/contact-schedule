let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //home
  app.get('/', (req, res) => {
    res.send('Contact Schedule API')
  });

  //find all contacts
  app.get('/all', (req, res) => {
    db.collection('contact').find({}).toArray(function(err, data) {
      if (err) console.log(err);
      res.send(data);
    });
  });

  //find contact
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

  //delete contact
  app.delete('/contact/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('contact').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Contact ' + id + ' deleted!');
      }
    });
  });

  //update contact
  app.put('/contact/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    let contact = { name: req.body.name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone };
    db.collection('contact').update(details, contact, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(result);
      }
    });
  });

};
