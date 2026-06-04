import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AuthCard() {

  const [isFlipped, setIsFlipped] =
    useState(false);

  return (
    <div
      className="
        relative
        w-[420px]
        h-[560px]
        perspective-[1000px]
      "
    >
      <div
        className={`
          relative
          w-full
          h-full
          duration-700
          transform-style-preserve-3d
          ${isFlipped ? "rotate-y-180" : ""}
        `}
      >

        <div
          className="
            absolute
            w-full
            h-full
            backface-hidden
          "
        >
          <Login
            onSwitch={() =>
              setIsFlipped(true)
            }
          />
        </div>

        <div
          className="
            absolute
            w-full
            h-full
            rotate-y-180
            backface-hidden
          "
        >
          <Register
            onSwitch={() =>
              setIsFlipped(false)
            }
          />
        </div>

      </div>
    </div>
  );
}

export default AuthCard;