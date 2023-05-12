import { useState, useEffect } from "react";

const useMenuColumns  = () => {
  const [numColumns, setNumColumns] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setNumColumns(1);
      } else if (window.innerWidth <= 768) {
        setNumColumns(2);
      } else {
        setNumColumns(3);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return numColumns;
};

export default useMenuColumns;