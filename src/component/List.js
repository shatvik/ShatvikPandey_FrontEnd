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

