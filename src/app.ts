// Code goes here!

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; //Date is a type supported in TS.
};

//interface ElevateEmployee extends Employee, Admin {}

type ElevateEmployee = Admin & Employee;

const e1: ElevateEmployee = {
  name: "arturo8",
  privileges: ["createServer "],
  startDate: new Date(),
};

type Combinable = string | number; // union type here.

type Numeric = number | boolean;

type Universal = Combinable & Numeric; // here we have the intersection type. It will look for the type that is in common of the two type above. Notice they are Union type.

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("privileges:" + emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("startDate:" + emp.startDate);
  }
}

printEmployeeInformation({ name: "Artur", startDate: new Date() });

class Car {
  drive() {
    console.log("drive");
  }
}
class Truck {
  drive() {
    console.log("driving");
  }
  loadCargo(amount: number) {
    console.log("amount:" + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();

const v2 = new Truck();

function useVehicle(vehicle: Vehicle) /* :void */ {
  //void for returning anything. You cant use Void.
  vehicle.drive();

  /* if("loadCargo" in vehicle){ it works
  vehicle.loadCargo(1000)
} */

  //guard typeS:  Used for when you have intersection types
  if (vehicle instanceof Truck) {
    //and this works too. instanceof verify wether the argument is an instance of Truck which is the base class.
    vehicle.loadCargo(200);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird"
  flyingSpeed: number;
}

interface Horse {
  type:"horse"
  runningSpeed: number;
}

type Animal = Bird | Horse;
//instanceof will not work here because interfaces are tools of TS only. They disappear in JS.
function moveAnimal(animal: Animal) {
  let speed
 switch (animal.type){
  case "bird":
    speed = animal.flyingSpeed
    break
    case "horse":
      speed:animal.runningSpeed
 }
console.log("moving at speed" + speed)
}
//note we are forcing any instance to have the object property "type" (this because of the interface)
//thus, because we are sure the instance will have the property type,  we can use it for conditionals in the function block
