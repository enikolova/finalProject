var Comments=function(title,rating,username,text,bookId){
    this.title=title.trim();
    this.rating=rating;
    this.username=username;
    this.text=text;
    this.bookId=bookId;
    var date=new Date();
    this.date=date.toDateString();
}
module.exports=Comments;
