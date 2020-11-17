import { useCallback, useEffect, useRef } from "react"

export const useClickAway = (fn) => {
   const ref = useRef(null);

   const escapeListner = useCallback((e) => {
      if(e.key === "Escape" || e.key === "esc") {
         fn();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const clickListner = useCallback((e) => {
      if(ref.current && !ref.current.contains(e.target)) {
         fn();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ref.current]);

   useEffect(() => {
      document.addEventListener("keyup", escapeListner);
      document.addEventListener("click", clickListner);

      return () => {
         document.removeEventListener("keyup", escapeListner);
         document.removeEventListener("click", clickListner);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return ref;
}