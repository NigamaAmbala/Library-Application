namespace my.bookshop;

entity Admin {
  key ID : Integer;
  TotalBooks : Integer;
  ActiveLoans : Integer;
  TotalUsers : Integer;

}
entity Books {
  key ID : Integer;
  title  : String;
  author : String;
  ISBN : String;
  genre : String;
  stock : Integer;
  quantityAvailable : Integer;
  language : String;
  users : Association to many Users on users.books = $self ;
  loans : Association to many Loans on loans.books = $self;
}

entity Users {
  key ID : Integer;
  username : String;
  password : String;
  email : String;
  phonenumber : Integer;
  address : String;
  role : String;
  books : Association to Books;
  loans : Association to many Loans on loans.users = $self;
  reservations: Association to many  Reservation on reservations.users = $self;
}

entity Loans {
   key ID : Integer;
   books : Association to Books;
   users : Association to Users;
   issuseDate : Date;
   ReturnDate : Date;
}

entity Reservation {
  key ID : Integer;
  books : Association to Books;
  users : Association to Users;
  Reservationdate : Date;
  
}
