export default class User {
    
    constructor(User) {
      this.id = User.id;
      this.first_name = User.first_name;
      this.last_name = User.last_name;
      this.email =User.email;
      this.password = User.password;
      this.phone = User.phone;
    }

    ToString()
    {
        return "ID: " + this.id + "Name: " + this.first_name + " " + this.last_name 
        + "Email: " + this.email + "Password: " + this.password + "Phone: " + this.phone
    }
}
