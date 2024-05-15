import React from "react";

interface SettingsProps {
  onTimezoneChange: (timezone: string) => void;
}

export const SettingsContents: React.FC<SettingsProps> = ({ onTimezoneChange }) => {
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTimezoneChange(event.target.value);
  };

  return (
    <div className="workspace-content">
      <h2>Settings</h2>
      <label htmlFor="timezone">Select Timezone:</label>
      <select id="timezone" onChange={handleTimezoneChange}>
        {[
          "Etc/UTC",
          "America/New_York",
          "America/Chicago",
          "America/Denver",
          "America/Los_Angeles",
          "Europe/London",
          "Europe/Paris",
          "Europe/Berlin",
          "Asia/Tokyo",
          "Asia/Shanghai",
          "Asia/Kolkata",
          "Australia/Sydney",
          // Add more timezones as needed
        ].map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
};
