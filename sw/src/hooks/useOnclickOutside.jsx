import { useEffect } from "react";
export default function useOnclickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      //Event.target은 내가 지금 클릭하는 요소. contains 를 활용하여
      //ref.current 안을 내가 선택하고 있는 지 확인하기 true 이면 안에 있는거.
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
