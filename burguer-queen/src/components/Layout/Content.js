import * as React from "react";
import { useParams, Redirect } from "react-router-dom";

function Topic({ routes }) {
  let { topicId } = useParams();
  const matchRoutes = routes?.find(
    (item) => item.text.toLowerCase() === topicId
  );
  const redirect = matchRoutes ? false : true;
  return <div>{redirect ? <Redirect to="/404" /> : matchRoutes.main}</div>;
}

export default Topic;
