import List from "./component/List"; // importing our List component

function App() {
  // dummy data for testing our List component
  const datas = [
    {text:'This is sample text1'},
    {text:'This is sample text2'},
    {text:'This is sample text3'},
    {text:'This is sample text4'},
  ];
  return (// using our list component with prop:=> items={datas}
    <div>
      <List items={datas}/> 
    </div>
  );
}

export default App;
