// Decorators: a function you apply to something ,EA a class in a certain way

function Logger(logString: string) {
  //decorators normally starts capitalized.
  //a decorator factory is a function that returns a decorator
  //it allows you to parameterize the decoration process so you can customize its behavior for each class or method that you apply it to.
  console.log("logger function will execute first");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}
/* @ symbol is a special identifier.. the thing after the @ should
 point to a function. not executed which should be your decorator.
 Decorators receives arguments.

 Decorator are executed when javascript find the class definition;
  not when you use the constructor to instanciate an object.
 */

function WithTemplate(template: string, hookId: string) {
  console.log("withTemplate function will execute second."); //this order is normal javascript.
  //once the class is processed, the decorators functions (decorator factories) will be executed from the bottom up
  return function (constructor: any) {
    console.log("rendering template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}
@Logger("logging person") //you can add more than one decorators
//the decorator functions are the ones which are executed first starting from the one which is closer.
//note: the decorator functions (the factory, the stuff that is in the return), not the function itself
@WithTemplate("<h1>my person object</h1>", "app")
class Person {
  name = "max";

  constructor() {
    console.log("creating person obj");
  }
}

const pers = new Person();

console.log(pers);

//---


/* a prototype is an object that is associated with 
every function and object. */
//target will receive the prototype of the class where the property is
function Log(target:any,propertyName:String |Symbol) {

    console.log("property decorator")
    console.log(target, propertyName)

}

function Log2(target :any, name:string, descriptor: PropertyDescriptor ){
    console.log("accessor decorator!")
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

//i can add decorators to methods, accessors (setters) and to properties

function Log3(target:any,name:string |Symbol, descriptor:PropertyDescriptor ){
    console.log("Method decorator!")
    console.log(target)
    console.log(name)
    console.log(descriptor)
    
}
                            //name of the method where the decorator is
function Log4(target:any,name:string |Symbol, position:number ){
    console.log("parameter decorator!")
    console.log(target)
    console.log(name)
    console.log(position)
}




class Product {
    @Log //you can use decorator on a property // It will gets executed when the class definition is registered by javascript
  title: string;
  private _price: number; //private means we cannot directly reach it. It would be only reachable from inside the class

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("invalid price");
    }
  }

  constructor(t: string, p: number) {
    //recuerda que el constructor es lo que se ejecuta cuando se instancia una clase.
    //Si el constructor recive un input, entonces la clase al ser instanciada pedirá un input as well.
    this.title = t;
    this._price = p;
  }

@Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//notice decorators only run when you define the class. Not when u instanciate the class.
//so it doesnt matter i write down several instanciations, the decorators will not be run again.
const p1 = new Product("Book", 1234)

