// Code goes here!

//function example (n:number, a:number, ?b:number) indicates we will have b as an optional parameter.

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

//Functions  overload: option for indicating arguments type possibilities and return type possibilities, different than the original declaration of the funciton
/* Function overloading is a feature of object-oriented programming where two or more functions can have the same name but different parameters. When a function name is overloaded with different jobs it is called Function Overloading. */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
//we can continue all the possible combinations
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("arturo", "barra"); //as string
//type casting
result.split(" ");

//optional chaining
const fetchedUserData = {
  id: "u1",
  name: "max",
  job:{title:"CEO", salary:20000}
};
//we can do the optional  chaining for verifying if "job" exists first
console.log(fetchedUserData?.job?.title); //allows us safe access to the properties in case they are not provided by the backend, for example 
//it will not provide a runtime error because it will only access "title" if job is available. Similarly, it will only request job if fetchedUserData is available
//runtime error: Runtime error refers to an error that takes place while executing a program.


//Nullish Coalescing
const userInput = "" //empty string is treated as falsy
//const storedData = userInput || "Default" //if the first value is falsy, then you are addng a  default value with the || operator
const storedData = userInput ?? "Default"
//THE NULLISH COALESCING OPERATOR: ??
//if Null OR Undefined (just in these cases), you will trigger the second option. Any other falsy will trigger the first value
console.log(storedData)


/* false
0 (zero)
"" (empty string)
null
undefined
NaN (Not a Number) 
are considered falsy values*/



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

  //guard typeS:  Used for when you have intersection types // type guards avoid runtime errors by checking types before you try to do something with the values
  if (vehicle instanceof Truck) {
    //and this works too. instanceof verify wether the argument is an instance of Truck which is the base class.
    vehicle.loadCargo(200);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;
//instanceof will not work here because interfaces are tools of TS only. They disappear in JS.
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("moving at speed " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 100 });
//note we are forcing any instance to have the object property "type" (this because of the interface)
//thus, because we are sure the instance will have the property type,  we can use it for conditionals in the function block

//TYPE CASTING:
//here we are saying that the document.getElementById will be an HTML element.
//const userInputElement = <HTMLInputElement>document.getElementById("userInput")!; // remember ! is for indicating typescript that the variable will never return "null".

//here we have another form: Keyword "as"
/* const userInputElement = document.getElementById("userInput")! as HTMLInputElement;
userInputElement.value = "hi there" */

//if you are not sure about having a null variable or not.
const userInputElement = document.getElementById("userInput");

if (userInputElement) {
  //we wrap the expression in parentheses
  (userInputElement as HTMLInputElement).value = "Hi there";
}

//Index types: for checking and showing different error messages
//flexible  container
interface ErrorContainer {
  //with index types like the one below: we are forcing a object to have a key value of string, and its value to be a string too
  /*  So with that I'm saying
I don't know the exact property name.
I also don't know the property count.
I just know that every property which is added
to this object, which is based on error container,
must have a property name which can be interpreted
as a string and the value of the property
also must be a string. */

  [prop: string]: string; //here we are saying i dont know the property name, but i know it has to be a property, which will be a string and its value also will have to be a string
}

const errorBag: ErrorContainer = {
  email: "not a valid email",
  username: "must start with a capital character",
};
