// Code goes here!

type Admin = {
  name: string;
  privileges: string[];
};

type Employee =  {
    name:string
    startDate: Date //Date is a type supported in TS.
}

//interface ElevateEmployee extends Employee, Admin {}

type ElevateEmployee = Admin & Employee 

const e1:ElevateEmployee = {
name:"arturo",
privileges: ["createServer "],
startDate: new Date()

}

type Combinable = string | number // union type here.

type Numeric = number |  boolean

type Universal = Combinable & Numeric // here we have the intersection type. It will look for the type that is in common of the two type above. Notice they are Union type.

