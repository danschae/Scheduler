import {useState} from "react";

export default function useVisualMode(initialValue) {
  const [mode, setMode] = useState(initialValue);
  const [history, setHistory] = useState([initialValue]); 

  const transition = (value, replace = false) => {
    if (replace) {
      history[history.length - 1] = value
      setHistory(history) 
    } else {
      setHistory(prev => [...prev, value]);
    }
    setMode(value)
}

  const back = () => {
    if (history.length > 1) {
    setMode(history[history.length - 2])
    setHistory(prev => {
      let newHistory = [...prev.slice(0, prev.length - 1)];
      return newHistory
    });
  }
}

  return { mode, transition, back }
};