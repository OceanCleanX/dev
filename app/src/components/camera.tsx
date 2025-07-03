import {
  RemoteVideoTrack,
  useRTCClient,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import type { ComponentPropsWithRef, FC } from "react";

const Camera: FC<ComponentPropsWithRef<"div">> = ({ className, ...props }) => {
  const client = useRTCClient();
  const remoteUsers = useRemoteUsers(client);
  const {
    videoTracks: [videoTrack],
  } = useRemoteVideoTracks(remoteUsers);

  return (
    <div className={`${className}`} {...props}>
      <RemoteVideoTrack
        style={{
          width: "100%",
          height: "100%",
        }}
        play
        track={videoTrack}
      />
    </div>
  );
};

export default Camera;
