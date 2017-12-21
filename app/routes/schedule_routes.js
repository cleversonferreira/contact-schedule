module.exports = function(app, db) {

  //home
  app.get('/', (req, res) => {
    res.send('Contact Schedule API')
  });

  //new contact
  app.post('/contact', (req, res) => {
    const contact = { name: req.body.name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone };
    db.collection('contact').insert(contact, (err, result) => {
      if (err) return res.send("error" + err);
        res.send(result.ops[0]);
    });
  });

};
