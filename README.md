 # Assignment (FrontEnd)
 1) -> **List** Component here is simply rendering list of items with the fuctionality of selecting a individual list by changing its color to green.
 -> It is basically made up of two sub-components which are **`List`** component (memoised version of **`WrappedListComponent`**) and **`SingleListItem`** component (memoised version of **`WrappedSingleListItem`**)
 -> The task of **`WrappedListComponent`** was to extract the passed prop and render individual list items with the help of **`WrappedSingleListItem`** component
 -> The **WrappedSingleListItem** component represents a single item in the list and receives four props:     **{index, isSelected, onClickHandler, and text.}** It renders an <li> element with a background color of green if it's selected, and red otherwise. When the item is clicked, it invokes the onClickHandler function with its index.
 ->The **WrappedListComponent** component represents the entire list and receives an array of items as a prop. It initializes a state variable **selectedIndex** using the useState hook to hold the index of the currently selected item (if any). It defines a **handleClick** function that updates (selectedIndex) when an item is clicked, and uses the useEffect hook to reset **selectedIndex** to **null** whenever the **items prop changes.**

 2) Problems/warning with the code was : 
    -> In the **WrappedListComponent**, the `propTypes` declaration for the `items` prop is incorrect. Instead of  **PropTypes.array(PropTypes.shapeOf({...}))**, it should be **PropTypes.arrayOf(PropTypes.shape({...}))**.
    -> One bug was with the useState() there the destructuring was in reverse order it should be like :
      ```jsx
      const [selectedIndex,setSelectedIndex] = useState(null);// and we also give it deafult value "null"
      ```
    -> Other warning was of **each child in a list should have a unique "key" prop.**
    so that we write/define `key={index}` inside `items.map()` method
    -> Other problem was with {selectedIndex} we were not providing it boolean value then how it will run its logic of ternary operator'?' with backgorund color so, we do following change :
    ```jsx
      isSelected={selectedIndex === index}
    ```
    -> Inside **WrappedSingleListItem** component we have this line of code:
    ```jsx
    onClick={onClickHandler(index)} // wrong 
    onClick={()=>onClickHandler(index)} // fixed - code
    /* (here we have used arrow function to run upon click unlike the previous one where it was increasing the function overhead irrelevantly)*/
    ```

 3) After Fixing and modifying the given code my code looks like this :

```jsx
import React, { useState, useEffect, memo } from 'react'; // importing the required dependencies
import PropTypes from 'prop-types';  // 

// Single List Item

// here our logic of making individual list items take place
// WrappedSingleListItem takes {index,isSelected,onClickHandler,text} as props
const WrappedSingleListItem = ({index,isSelected,onClickHandler,text}) => {
  return (
    <li // here we are creating li tags
    // by default our isSelected value would be false so it will show tags with red backgroundColor
    // but if user selects/clicks a any list element then it will turn to green
      style={{ backgroundColor: isSelected ? 'green' : 'red'}} 
      // here i converted onClickHandler to an arrow function so that it occur only when a user clicks on it
      onClick={()=>onClickHandler(index)} 
    >
      {text} 
    </li>// above {text} will render our data inside: items[{data:"text"}] like this..
  );
};

// here we are basically defining all our datatypes for prop or prop types we can say..
WrappedSingleListItem.propTypes = {
    index: PropTypes.number.isRequired, // here i have added isRequired attribute since it is important to have index prop
    isSelected: PropTypes.bool.isRequired, // isSelected is also important prop so i added isRequired here also
    onClickHandler: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

// Now we are converting SingleListItem which is a memoised version of WrappedSingleListItem
// It will basically help us in optimising our code and it will not do re render until and unless there is updation in any of our prop
const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({items}) => {
  // here in useState selectedIndex and setSelectedIndex were in wrong order as the default variable should
  // come first then the function to update it like ::
  // eg:= const [var_name,func_to_change_var] = useState("here any initial value")
  const [selectedIndex,setSelectedIndex] = useState(null);

  // here useEffect is used to set the state of our project accordingly so suppose 
  // first time we pass items[2] then it will run
  // then second time we pass items[4] here we clearly changed our items prop so it will render again to make
  // it (single list elements) red by default.
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  // handleClick function to set our selectedIndex value with the value user has clicked
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    // here we have made <ul> so to accomodate <li> tags which we will ultimately be getting from our
    // SingleListItem component above
    // we give some inline styling of textAlign:'left' so that our li start from extreme left 
    <ul style={{ textAlign: 'left' }}> 
      {items.map((item, index) => ( // here we are maping through the items array element with the help of
      // HOF .map() which is iterating through a single ( item and index ) inside items[]
        <SingleListItem
          key={index} // here we have to mandatorily pass index as a key else react will give us warning as
                      // every <li> items must be unique
          onClickHandler={() => handleClick(index)} // here we are listening to handleClick and passing the index
          // here we are displaying the "text" key of items array object
          // our prop that is passed looks like this
          // for eg:=    const items = [
          //                            {text:"this is sample 11"},
          //                            {text:"this is sample 2"}
          //                          ]
          text={item.text} 
          index={index} // here we are passing the index for every element of items array
          isSelected={selectedIndex === index} //here we are checking the condition if the index that user has
          // selected match our passed index then we will make that element green or run our logic accordingly
        />
      ))}
    </ul>
  )
};
// Here we are defining the props types so that in case any person send wrong props then it will give us error 
WrappedListComponent.propTypes = {
  // here we have used arrayOf method of proptype library 
    items: PropTypes.arrayOf(
      PropTypes.shape({ // PropTypes.shape() was actual function to call thats why it was not working
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

// Here we are defining defaultProps for our WrappedListComponent though it is little unnecessary
WrappedListComponent.defaultProps = {
    items: null,// here we can give it prop type like -> **items : []** too but "items : null" also works fine
};

const List = memo(WrappedListComponent); // here we are memoising our WrappedListComponent so that it does not
// render only when the props or the function that is passed changes

export default List; // here we are exporting our final **List Component** consisting of all the <li>'s

```
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
