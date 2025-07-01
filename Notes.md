# Advanced Topics

## ES6+, Immer, and Isomorphic Rendering




### ES6+
* **`Arrow Functions`** - _shorthand notation for writing a function_
    * Implicit Return `(x,y) => x * y` - _one return statement function can written without return keyword_
    * `'this'` _in arrow function refer to parent scope, suitable for event handler without bind_
* **`Destructuring`**
    ```javascript
        const product = {
        title: 'Electric Kettle',
        price: 49.95,
        inStock: true,
        sku:'SKU'
    };

    //destructuring
    const {title:name,inStock} = product
    ```
    
    ```javascript
    //destructuring Arrays
    const scores = [98, 85, 77, 65, 54];
    const [firstScore,secondScore] = scores
    ```

* **Spread Operator** `(...)` - _used to unpack properties of an object or elements of an array. The key usage in react is on unpacking props of state object. This is because react state is immutable. Hence everytime a state update is needed, a new object is creating by unpacking values from previous state object_

    ```javascript
    //unpacking array
    const list_one = [ "one", "two", "three" ];
    const list_two = [ "four", "five", "six" ];

    const list_new = [ ...list_one, ...list_two ];

    ```

    ```javascript    
    //unpacking object
    const product = {
        title: 'Electric Kettle',
        price: 49.95,
        inStock: true,
        sku:'SKU'
    }
    const product_new = { ... product, price:50, category:'Kitchen' }
    ```

* **Rest Operator** `(...)` - _Opposite to spread operator use, rest packs the number of element into single array. Most commonly used in passing any number of parameters to function into a single array parameter.
    ```javascript
        const createTeam = (captain,...players) => {
            if(captain != null && players.length > 0){
                const all = players.join(", ")
                console.log("The team is lead by "+captain+" and consists of "+all+".")
            }
        }
    ```



* **Promises** - _These are objects returned by functions that take some time to complete at later point of time (like a network call). The object has three states loading, fulfilled or rejected. Such a promise object supports two functions `then()` and `catch()` to pass functions that should be called to handle a success or failure respectively_
    ```javascript
        fetchUserData() //function call that returns promise
        .then(user => {
            // The promise was fulfilled!
            console.log("Success! The user data is:");
            console.log(user);
        })
        .catch(error => {
            // The promise was rejected! Log the actual error.
            console.log(error);
        });
    ```

* **async/await** - _These keywords are syntatic sugar over promises object and makes easy to write. Any function that is going to handle promises should have `async` keyword during its declaration. Within function, the code that makes the async call should be prefixed with `await`. await can only be used inside a function declared with async. The success or failure is handled using try catch block that makes code easy to read and handle errors_
    ```javascript
    const displayUserData = async () => {
        try {
            const user = await fetchUserData();
            console.log("Success! The user data is:");
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
    displayUserData();
   ```
   

* **export/import** - _Javascript code are split across multiple files called Modules. These files export their functions, variables or classes available to other in two ways (a) named export & (b) default. Other files import named export with same name or own choice of name for default ones in order to use these export from other modules_
    ```javascript
    // File: stringUtils.js

    // A named export
    export const makeUpperCase = (str) => {
    return str.toUpperCase();
    };

    // The default export
    export default function getLength(str) {
    return str.length;
    }

    // File: app.js
    //imports
    import getLength,{ makeUpperCase }  from "./stringUtils.js"; //default always comes first

    ```



* **Template Literals/Template Strings** - _This is new way of formatting strings using `` `${variable/expression}` ``. This eliminates need for + operators to join strings and avoids need for \n in multiline strings_
    ```javascript
        const product = {
            name: 'Super Headphones',
            price: 99.99,
            quantity: 2
        }

        console.log(`Order: ${product.name}. Total: $${product.price * product.quantity}`);

    ```


## Immutable State and Immer in Redux


> How do you prevent direct state mutation in Redux?

_The direct state mutation in redux is prevented by making a copy of original state using spread operator and updating the properties that require change in the new copy_
```javascript
    const oldState = {
        user:{
            name:'Alice',
            age:25
        }
    };

    const newState = {
        ...oldState,
        user:{
            ...oldState.user,
            name:'Bob' //only name of the user is updated to bob
        }
    };
```

`Immer`

The above is a manual way of updating the state and suceptible to human error. Even simpler way redux (reducers in createSlice) provides is automatic state changes tracking and applying in the background. We just have to manipulate the state directly as if its mutable.

```javascript
const featureSlice = createSlice({
    ...
    reducers: {
        sample_reducer: (state,action) => {
            state.user.name = action.payload //directly updating state as if its mutable
            return state;
        }
    }
```

However, the redux neither does a deep clone or state (performance load) but still keeps the original state immutable despite it looking like that. This is achieved with the help of a redux library called Immer.

When a state object is updated in the reducer, immer achieves change capture without performance overhead or direct state mutation with the help of a new EC6+ feature called `Proxy`. By creating a proxy over state object it capture any change made to state object in reduce but uses `Copy-On-Write` technique to track the change and path seperately instead of mutating it. After all changes are done in reducer, it keeps the unchanged references as is and only updates the changes made using technique called `Structural Sharing`. In this technique, a shallow copy of state is made _sharing the references of unchanged children as is but updating the leaf to root of those children which got updated_. This keeps performance high and still prevent direct mutation to keep state management clean.

##################
## Understand Isomorphic (Universal) React
This was listed as a "plus." Being able to speak about it makes you stand out.

Your task: Research and write a short explanation for, "What is Isomorphic or Universal React, and what are its benefits?" Your answer must mention two key benefits: SEO (Search Engine Optimization) and faster perceived initial page load (First Contentful Paint). You should also mention that this is typically achieved today using a framework like Next.js.

#################


Isomorphic (Universal) React refers to same code which can be rendered both on server side as well as client side. Server side rendering creates final html that can directly render on browser without needing further api calls. This improves first load (contentful paint time) as well as content immediately available that drastically optimizing site for SEO. Without that crawlers will only see empty html.

On the other hand when the initial page gets loaded, subsequent actions for user should be seamless instead of full postbacks. This is required for best user experience. This is acheived by isomorphic react by loading react app after initial page load. React app attaches itself to to the initial dom created by first page load. Then it updates it functionality to bring to power of react to make application dynamic by modifying dom, maintaining state, handling user interactions seamlessy why performing background actions asynchronousl. From that point onwards the application is client side code driven.

##### Missed this point. Write it next time
what is this process of attaching react to ssr created dom structure called???


Benefit of same code on server and client

Simplified development and maintainability issues
* No discrepancies b/w client and server output => *What is it called?*
* No duplication or maintainability issues




This is typically achieved with a framework like next.js