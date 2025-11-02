import React from "react";
import { useNavigate } from "react-router-dom";
import TerminalBoot from "../components/TerminalBoot";

export default function TerminalLoader() {
  const navigate = useNavigate();

  return <TerminalBoot onComplete={() => navigate("/terminal")} />;
}
