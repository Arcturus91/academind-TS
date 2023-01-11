// Decorators: a function you apply to something ,EA a class in a certain way

//important: since on reading _ we immediately know: this parameter was passed, but it won't be used.

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
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        //_ means "i need to put it here but i will not use it. I get that"
        super();
        console.log("rendering template");
        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("logging person") //you can add more than one decorators
//the decorator functions are the ones which are executed first starting from the one which is closer.
//note: the decorator functions (the factory, the stuff that is in the return), not the function itself
@WithTemplate("<h1>my person object</h1>", "app")
class Person {
  name = "Arturo";

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
function Log(target: any, propertyName: String | Symbol) {
  console.log("property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//i can add decorators to methods, accessors (setters) and to properties

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log("descriptor de un method decorator", descriptor); //destaca que en la llave value del descriptor de un method decorator se mete la función.
}

//name of the method where the decorator is
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
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
const p1 = new Product("Book", 1234);

//para evitar el error que tenemos con el .bind podemos agregar un decorator al método que nos da error en la clase.
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  //the value key hold your original function of the class

  const originalMethod = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // the getter basically is like having a value property with extra logic that runs before the value is returned.
      const boundFn = originalMethod.bind(this); // the getter method will be triggered by the concrete object to which it belongs, meaning that would be its context.
      return boundFn;
    },
  };
  return adjDescriptor;
}

/* the getter method will be triggered
by the concrete object to which it belongs,
so this inside of the getter method
will always refer to the object
on which we defined the getter.
This will not be overwritten by addEventListener
because the getter is like an extra layer
between our function that's being executed
and the object to which it belongs
and the Event Listener. //recuerda que el getter se calcula primero antes de devolver el valor. Esto me asegura que va a agarrar el contexto de la clase originalmente y no del contexto donde está. */

class Printer {
  message = "this works";
  @Autobind
  showMessage() {
    console.log("this shall work: ", this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
/* button.addEventListener("click", p.showMessage.bind(p));  */
// el this aveces te trae problemas sobre a quien apunta en particular cuando instancias una clase y lo ejecutas en el DOM
//en este caso, el p.showMessage Apunta al event listener puesto que está en su contexto.
//pero yo quiero que el p.showMessage apunte a la clase en dónde está instanciada, por lo qe le debo meter el .bind.

button.addEventListener("click", p.showMessage);

//Validation with decorators

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
let isValid: boolean = true
  for (const prop in objValidatorConfig) {
    console.log(prop)
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
break
        case "positive":
          isValid = isValid &&obj[prop] > 0;
          break
      }
    }
  }
  return isValid
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!; //el signo de exclamación al final es para indicar que si o si obtendré el html element.

courseForm.addEventListener("submit", (event) => {
  event.preventDefault(); //this stops the redirection ("action" attribute) from the website when submitting
  const titleEl = document.getElementById("title") as HTMLInputElement; //typecasting
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; //+ added in the front for making it a number

  const courseOne = new Course(title, price);

  if (!validate(courseOne)) {
    alert("Invalid input");
  }

  console.log(courseOne);
});
