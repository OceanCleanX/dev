import useSocketInfo from "@/hooks/useSocketInfo";

import type { SocketInfoType } from "@/hooks/useSocketInfo";

const socketInfoKeys2Text: {
  [key in keyof Omit<SocketInfoType, "type">]: string;
} = {
  delay: "Delay (ms)",
  voltage: "Voltage (V)",
  wifi_strength: "WiFi Strength (bar)",
  gyro_x: "Gyro X (m/s²)",
  gyro_y: "Gyro Y (m/s²)",
  gyro_z: "Gyro Z (m/s²)",
};

const displayValue = (value: number | undefined): string =>
  value?.toFixed(2) ?? "N/A";

const SocketInfo = () => {
  const { data: socketData } = useSocketInfo();

  return (
    <>
      {Object.entries(socketInfoKeys2Text).map(([k, v]) => (
        <div key={k}>
          <span className="font-semibold">{v}</span>
          <span>
            :{" "}
            {displayValue(
              socketData?.[k as keyof SocketInfoType] as number | undefined,
            )}
          </span>
        </div>
      ))}
    </>
  );
};

export default SocketInfo;
