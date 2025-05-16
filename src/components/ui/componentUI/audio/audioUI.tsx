import { useRef } from "react";

type TAudioUIProps = {
  audioSrc: string | undefined;
};
export default function AudioUI({ audioSrc }: TAudioUIProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    audioRef.current?.play();
  };

  return (
    <div className="p-4">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      <div className="flex gap-4 mt-2">
        <button
          onClick={handlePlay}
          className="bg-[#a702a456] text-white rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-lg hover:bg-[#a702a4a6]"
        >
          <span className="material-symbols-outlined text-[#a702a4]">
            play_arrow
          </span>
        </button>
      </div>
    </div>
  );
}
