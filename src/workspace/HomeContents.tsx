import React, { useState, useEffect } from "react";

interface HomeProps {
  timezone: string;
}

export const HomeContents: React.FC<HomeProps> = ({ timezone }) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    async function fetchDatetime() {
      const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
      const data = await response.json();
      const dateTime = new Date(data.datetime);
      setDate(dateTime.toLocaleDateString());
      setTime(dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }
    fetchDatetime();
  }, [timezone]);

  return (
    <div className="workspace-content">
      <h2>Home</h2>
      <p>Current Date: {date}</p>
      <p>Current Time: {time}</p>
    </div>
  );
};
