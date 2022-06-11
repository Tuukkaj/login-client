import { FontIcon } from "@fluentui/react";
import { Link } from "react-router-dom";

interface BackProps {
  to: string
}
export default function Back({to}: BackProps) {
  return <Link to={to}>
    <FontIcon iconName="Back" style={{position: "absolute", top: "0.5em", left: "0.5em"}}/>
  </Link>
}