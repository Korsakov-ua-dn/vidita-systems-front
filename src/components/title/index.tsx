import React from "react";
import "./style.css";

type PropsType = {
  title: string
};

const Title: React.FC<PropsType> = (props) => {
  return (
    <h1 className="Title">{props.title}</h1>
  );
};

export default React.memo(Title);
