import { useDispatch, useSelector } from "react-redux";
import { countCong, countDatLai, countTru } from "../redux/action/countAction";
import { State } from "../redux/rootReducer";
const HomeComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: State) => state.count);
  console.log(process.env.REACT_APP_API_KEY_FIREBASE);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(countCong(500))}>cong</button>
      <button onClick={() => dispatch(countTru(1000))}>tru</button>
      <button onClick={() => dispatch(countDatLai())}>dat lai</button>
    </div>
  )
}

export default HomeComponent