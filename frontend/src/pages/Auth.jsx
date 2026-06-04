import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {
  const [isFlipped, setIsFlipped] =
    useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-white flex justify-center items-center px-4">

      <div
        className="
          relative
          w-full
          max-w-md
          h-[620px]
          [perspective:1000px]
        "
      >

        <div
          className={`
            relative
            w-full
            h-full
            duration-700
            [transform-style:preserve-3d]
            ${
              isFlipped
                ? "[transform:rotateY(180deg)]"
                : ""
            }
          `}
        >

          {/* LOGIN */}

          <div
            className="
              absolute
              w-full
              h-full
              [backface-visibility:hidden]
            "
          >
            <Login
              onSwitch={() =>
                setIsFlipped(true)
              }
            />
          </div>

          {/* REGISTER */}

          <div
            className="
              absolute
              w-full
              h-full
              [transform:rotateY(180deg)]
              [backface-visibility:hidden]
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

    </div>
  );
}

export default Auth;