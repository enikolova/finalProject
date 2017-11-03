var bcrypt = require('bcryptjs');
var User = function(username,email, password) {
    if (username.trim().length > 0 && email.trim().length > 0 && email.indexOf("@") !== -1 &&
        password.length >= 5) {
        this.username = username;
        
        this.email = email;
        this.password = password;
        this.comments = [];
        this.favouriteBooks = [];
        

    } else {
        throw new Error("Invalid data");
    }
}

User.prototype.addComment = function(comment) {
    this.comments.push(comment)
}
User.prototype.addFavoritBook = function(book) {
    this.favouriteBooks.push(book)
}
User.prototype.comparePassword = function(password) {
        return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
   
}


module.exports = User;