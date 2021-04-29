import React from "react";
import { Heading } from "./Heading";
import { MessageList } from "./MessageList";

export const HomePage = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Heading />
        <MessageList />
      </div>
    </React.Fragment>
  );
};