import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeManager = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return null;
};

export default ThemeManager;
