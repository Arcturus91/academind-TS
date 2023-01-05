//Module 7 :  Generics

/* 
//generic types gives you extra information (additional type information) about the variable type. So you can use it to avoid runtime errors.
const names: Array<string> = []; //exactly the same as string[]

//names[0].split('.') // now you can use the methods for strings.

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  // data.split("")
});
 */

//Your own generetic type

//extends works as a constrains for limiting input possibilities
function merge<X extends object, U extends object>(objA: X, objB: U) {
  //will return an intersection
  return Object.assign(objA, objB);
}
//object.assign is for creating a new object based in the arguments which are objects themselves
const mergedObj = merge({ name: "arturo" }, { age: 30 });
// cannot add a number as a parameter because we are definiting the generic type to be an object, not a number
//also, a generic with two type of parameters creates an intersection which means that the return will have to include a mix of the properties of the arguments.
//console.log(mergedObj.name);
//  mergedObj.name mira como esto me da problemas. No me deja acceder.
//it is preferrable to work with generic types with constrains because you avoid the silent errors

interface Lenghty {
  length: number;
} //esto nos asegura que tendré un objeto con la propiedad length

//nota el retorno: es un tuple
function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
  //normally the argument will be of the generic type
  //al usar el extend al Lenghty, nosotros afirmamos que tendremos un objeto con propiedad length cuyo valor será un número.
  let descriptionText = "got no value";
  if (element.length > 0) {
    //aqui1 estoy accediendo a la propiedad length
    descriptionText = "got " + element.length + " elements";
  }
  return [element, descriptionText];
  //a tuple is a data type that contain two values of difference type.
}
//it will work with anything that has a length property ,as indicated per the interface
//nota que la interfaz no te obliga a meter un objeto sino en realidad se trata de un data type que tenga la propiedad length. Esto aplica para strings y arrays.
//console.log(countAndDescribe(["sports", "cooking"])); //JS compiles this as an object

//here with the keyof word we are indicating that U will be an object of the element T. Also note that before you have stated that T will be based on an object type.
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}
//with the keyof word we can ensure the object has the key in its body; otherwise we would be getting an error.
//extractAndConvert({name:"max"}, "age"); this syntax would return an error because the key is "age" and we need it to be "name" as in the object parameter that is first
extractAndConvert({ name: "max" }, "name");
//remember union types: Union types in TypeScript allow you to specify a type that can be one of several different types. You can use the | operator to specify a union type.

//Generic classes:

class DataStorage<T extends string | number | boolean> {
  //generic allows me to choose on the types but asks me to stick with it. "You wanna lock in the same type"
  //generic types lock in the same type
  //you want union types when you want flexibility in every method call, in every function call
  //You might use a union type when you have a value that can be one of several different types
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);

    //originalmente estaba así: this.data.splice(this.data.indexOf(item), 1); //if index of do not find the element, is returns -1. So you have splice(-1,1). And remember: in splice, If negative, will begin that many elements from the end.
    //So x.splice(-1, 1) starts one element from the end of x and deletes a single element.
    //el valor negativo al inicio solo te indica dónde comenzar desde el final. Sin embargo, siempre borra la cantidaad de elementos del segundo parámetro hacia la derecha.
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem("arturo");
textStorage.addItem("kitty");
textStorage.removeItem("arturo");
//console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>(); //the whole idea behind generics is to have flexible but fully typed sctructures

//nota como uso los genericos en csos en dónde tengo un objeto que emite data en diferentes tipos.
/* 
better to limit DataStorage to only receive primitive data
const objStorage = new DataStorage<object>();
objStorage.addItem({name:"artuiro"});
const maxObj = {name:"monika"}
objStorage.addItem(maxObj);

objStorage.removeItem(maxObj) // it doesnt matter we are pointing to different object, it stills removes Monika object

console.log(objStorage.getItems()) */

//objects are reference type values. Primitive are a different set of parameter types.
//

//Generic inbuilt utility types:

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

/*this works:
 function createCourseGoal(title:string, description:string, date:Date): CourseGoal {
  return {title:title, description:description, completeUntil:date}
} */

//Partials
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial <CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
  //typecasting here because: Type casting in TypeScript allows you to convert a value of one type to another.
// so we say courseGoal (what we are returning) will be of the same type as CourseGoal, thus we are returning something of type CourseGoal
//and because our function is configured to return something of the same type as CourseGoal, then we do not get any error.
}

//Readonly type
const names:Readonly<string[]> = ["max", "artiro"]
//names.push("javier") 
//names.pop()//we are not allowed to change the array

