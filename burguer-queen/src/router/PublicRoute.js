import { Route, Redirect } from "react-router-dom";
import useAuth from "../services/auth/useAuth";

export default function PublicRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  let redirect = '/';
  if (auth.isLogged()) redirect = auth.urlRol();
  return (
    <Route {...rest}>
      {!auth.isLogged() ? (
        <Component />
      ) : (
        <Redirect to={redirect}/>
      )}
    </Route>
  );
}