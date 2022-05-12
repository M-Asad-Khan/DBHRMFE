import { Redirect } from "react-router-dom";
const ProtectedRoute = ({isAllowed, children }) => {
	if (isAllowed) {
		console.log('asd',children)
		return children;
  } else {
    return <Redirect to={"/login"} />;
  }
};
export default ProtectedRoute;
