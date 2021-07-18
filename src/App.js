import { Route } from "react-router";
import "./App.css";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import CounterContainer from "./containers/CounterContainer";

function App() {
  return (
    <>
      <CounterContainer />
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;
