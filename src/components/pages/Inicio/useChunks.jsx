import { useState, useEffect } from "react";

const useChunks = () => {
  const [chunkSize, setChunkSize] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setChunkSize(1);
      } else if (window.innerWidth <= 768) {
        setChunkSize(2);
      } else if (window.innerWidth <= 1024) {
        setChunkSize(3);
      } else {
        setChunkSize(3);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return chunkSize;
};

export default useChunks;
