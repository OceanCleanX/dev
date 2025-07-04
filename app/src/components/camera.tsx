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
    isLoading,
    videoTracks: [videoTrack],
  } = useRemoteVideoTracks(remoteUsers);

  return (
    <div className={`relative ${className}`} {...props}>
      {isLoading && (
        <svg
          className="absolute top-1/2 left-1/2 -translate-1/2 animate-spin size-1/12 min-h-10 min-w-10 z-10 text-gray-400"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
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
