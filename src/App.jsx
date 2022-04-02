import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Slider from "rc-slider";

function Checkbox() {
  return (
    <div>
      <label class="relative flex justify-between items-center overflow-hidden">
        <input type="checkbox" class="sr-only peer" />
        <span class="w-10 h-6 flex items-center flex-shrink-0 p-0.5 border-2 border-white duration-300 ease-in-out after:w-4 after:h-4 after:bg-white after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
      </label>
    </div>
  );
}

function App() {
  const [passwordLength, setPasswordLength] = useState(16);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-500 text-white">
      <h1 className="text-7xl">Password Generator</h1>
      <p className="text-center text-3xl max-w-3xl">
        Passwords are like underwear: you don't let people see it, you should
        change it very often and you shouldn't share it with strangers hehe
        (ﾉ･_-) ☆
      </p>
      <div className="flex flex-row border-2 justify-between border-white w-2/5 p-4 mt-8 text-4xl">
        dfhjskaldfhas
        <div className="flex items-center gap-3">
          <button>
            <Icon icon="ic:round-refresh" />
          </button>
          <button>
            <Icon icon="ic:round-content-copy" />
          </button>
        </div>
      </div>
      <div className="w-2/5 mt-8">
        <div className="flex justify-between w-full gap-10">
          <div className="flex flex-col items-start w-1/2">
            <div className="flex justify-between gap-2 items-center w-full">
              <label className="text-3xl">Uppercase Character</label>
              <Checkbox />
            </div>
            <div className="flex justify-between gap-2 items-center  w-full">
              <label className="text-3xl">Lowercase Character</label>
              <Checkbox />
            </div>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <div className="flex justify-between gap-2 items-center  w-full">
              <label className="text-3xl">Number</label>
              <Checkbox />
            </div>
            <div className="flex justify-between gap-2 items-center  w-full">
              <label className="text-3xl">Symbol</label>
              <Checkbox />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8 text-3xl">
          <span className="mr-2 whitespace-nowrap block">
            Password Length: {passwordLength}
          </span>
          <div className="flex items-center gap-4">
            8
            <Slider
              className="h-1 w-full"
              onChange={(e) => setPasswordLength(e)}
              min={8}
              max={256}
            />
            256
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
