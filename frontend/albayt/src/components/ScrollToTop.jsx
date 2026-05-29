import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    //to check if the current page is book
    const isBookingPage = pathname.startsWith("/book");

    //we dont want to scroll to the top if its booking steps, (for usability purposes)
    if (isBookingPage) {
      return;
    }

    // for all other pages, scroll to the top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;