// Define a class
function Car(name, price) {
    this.name = name;
    this.price = price;
  }

  //Method to the class
  Car.prototype.run = function() {
    console.log("This car is " + this.name + " and the price is $" + this.price);
  };

  // Objects
  var car1 = new Car("BMW", 2500);
  var car2 = new Car("Toyota", 3000);

  // calling the method
  car1.run(); 
  car2.run();