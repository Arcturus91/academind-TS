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
function merge<X extends object, U extends object>(objA: X, objB: U){ //will return an intersection
  return Object.assign(objA, objB);
}
//object.assign is for creating a new object based in the arguments which are objects themselves
const mergedObj = merge({ name: "arturo" }, {age:30});
// cannot add a number as a parameter because we are definiting the generic type to be an object, not a number
//also, a generic with two type of parameters creates an intersection which means that the return will have to include a mix of the properties of the arguments.
console.log(mergedObj.name);
//  mergedObj.name mira como esto me da problemas. No me deja acceder.
//it is preferrable to work with generic types with constrains because you avoid the silent errors

interface Lenghty{
  length:number
} //esto nos asegura que tendré un objeto con la propiedad length

//nota el retorno: es un tuple
function countAndDescribe<T extends Lenghty>(element:T):[T, string]{ //normally the argument will be of the generic type
//al usar el extend al Lenghty, nosotros afirmamos que tendremos un objeto con propiedad length cuyo valor será un número.
  let descriptionText = "got no value"
if(element.length>0){ //aqui1 estoy accediendo a la propiedad length
  descriptionText = "got " + element.length + " elements"
} 
return [element,descriptionText]
//a tuple is a data type that contain two values of difference type.
}
//it will work with anything that has a length property ,as indicated per the interface
//nota que la interfaz no te obliga a meter un objeto sino en realidad se trata de un data type que tenga la propiedad length. Esto aplica para strings y arrays.
console.log(countAndDescribe(["sports","cooking"])) //JS compiles this as an object