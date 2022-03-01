import React from "react";
import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { WordProvider } from "./context/word";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WordProvider>
        <App />
      </WordProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
