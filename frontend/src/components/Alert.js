import React from "react";

export default function alert(props) {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show m-0`}
        role="alert"
      >
        <strong>{props.alert.msg}</strong>
      </div>
    )
  );
}