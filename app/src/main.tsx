import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Questionnaire from "./routes/questionnaires/Questionnaire";
import Questionnaires from "./routes/questionnaires/Questionnaires";
import SignIn from "./routes/SignIn";
import Signup from "./routes/Signup";
import "./index.css";
import CreateQuestionnaire from "./layouts/create-questionnaire/CreateQuestionnaire";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />}>
          <Route path="questionnaires" element={<Questionnaires />} />
          <Route path="questionnaires/new" element={<CreateQuestionnaire />} />
          <Route path="questionnaires/:id" element={<Questionnaire />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
