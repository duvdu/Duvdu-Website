const ProjectShow = ({ data }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const TogglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };
        useEffect(() => {
            if (videoRef.current) {
                videoRef.current.play();
                videoRef.current.muted = true;     
                const timeout = setTimeout(() => {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }, 300); 
                return () => clearTimeout(timeout);
            }
        }, [videoRef.current]);
    
    return (
        <div className="relative">
            <video
                className="sm:rounded-[50px] w-full"
                src={data.projectImg}
                controls
                autoPlay muted playsInline
                ref={videoRef}
                onClick={handlePlayPause}
                onEnded={() => setIsPlaying(false)}

            />
            <div
                onClick={TogglePlayPause}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="hidden sm:block sm:relative">
                    <div
                        className={`bg-[#CADED333] w-16 h-16 rounded-full cursor-pointer p-5 appblur ${isPlaying ? "animate-play" : "animate-pause"}`}
                    >
                        <Icon
                            className="size-full text-white"
                            name={isPlaying ? "pause" : "play"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProjectShow;