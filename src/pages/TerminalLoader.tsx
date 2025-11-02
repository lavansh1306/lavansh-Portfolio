import React from "react";
import { useNavigate } from "react-router-dom";
import { BootSequence } from "../components/BootSequence";

export default function TerminalLoader() {
  const navigate = useNavigate();

  return (
    <BootSequence onComplete={() => navigate("/terminal")} />
  );
}
