import {
  RemoteVideoTrack,
  useRemoteUsers,
  useRemoteVideoTracks,
  useRTCClient,
} from "agora-rtc-react";

import useWs from "./hooks/useWs";

const App = () => {
  useWs();

  const client = useRTCClient();
  const remoteUsers = useRemoteUsers(client);
  const {
    videoTracks: [videoTrack],
  } = useRemoteVideoTracks(remoteUsers);

  return (
    <RemoteVideoTrack
      style={{
        width: "100vw",
        height: "100vh",
      }}
      play
      track={videoTrack}
    />
  );
};

export default App;
