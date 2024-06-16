import RouterList from "./router/AllRoute";
import { socket } from "./socket";
import "./App.css";

function App() {
  return (
    <>
           <RouterList socket={socket}/>
    </>
  )
}

export default App;
