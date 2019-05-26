реалізовано:
лог-ін
реєстрація
додавання постів
видалення постів
оновлення постів

проблеми:
дані користувача зберігаються в дб в явному вигляді
всі користувачі бачать всі пости і можуть їх видаляти
нереалізовані сесії
нереалізований лог-аут

першочергові завдання:
сесії і лог-аут
переписати підключення до дб нормально з промісами, а не як дибіл

exports.addpost = (title,subject,author,callback)=>{
    mongoClient.connect(function(err, client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.insertOne( {
            "title": title,
            "subject": subject,
            "author": author
        },function(err, result){
            assert.equal(err, null);
            console.log("Saved the users post");
            if(err == null){
                callback(true);
            }
            else{
                callback(false);
            }
        });
    });
};
exports.showpost = (callback)=>{
    mongoClient.connect(function(err, client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.find().toArray(function (err, list) {
            callback(list);
            console.log(list);
        });
    });
}
exports.deletepost = (id, callback)=>{
    mongoClient.connect(function(err,client) {
        const db = client.db("ThaBlogg");
        const collection = db.collection("posts");
        collection.deleteOne({
            _id: new ObjectID(id)
         })
         .then((result)=>{
             return callback(result);
         })
         .catch((err)=>{
            return callback(err);
         })
    });
}
app.post('/addpost', function (req, res) {
    const title = req.body.title;
    const subject = req.body.subject;
    const author = req.body.author;
    posts.addpost(title, subject, author, function(result){
      if(result){
        res.send(result);
      }
      else{
        const err = new Error('wrong data');
        return next(err);
      }
    });
  })
