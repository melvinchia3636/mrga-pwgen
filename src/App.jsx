import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Slider from "rc-slider";
import copy from "copy-to-clipboard";
import "animate.css";

function Checkbox({
  value,
  setValue
}) {
  return <div>
    <label class="relative flex justify-between items-center overflow-hidden">
    <input type="checkbox" class="sr-only peer" onClick={() => setValue(!value)} checked={value} />
      <span class="w-10 h-6 flex items-center cursor-pointer flex-shrink-0 p-0.5 border-2 border-green-500 duration-300 ease-in-out after:w-4 after:h-4 after:bg-green-500 after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
    </label>
  </div>
}

function App() {
  const [passwordLength, setPasswordLength] = useState(16);
  const [password, setPassword] = useState("");

  const [containUppercase, setContainUppercase] = useState(true);
  const [containLowercase, setContainLowercase] = useState(true);
  const [containNumber, setContainNumber] = useState(true);
  const [containSymbol, setContainSymbol] = useState(true);

  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharacters = lowerCaseCharacters.toUpperCase();
    const numberCharacters = "1234567890";
    const symbolCharacters = "!@#$%^&*()-+_={}[]:;<>,./?";

    let newPassword = "";

    let lengthOfNewPassWord = passwordLength;
    if (lengthOfNewPassWord < 8) lengthOfNewPassWord = 8;
    if (lengthOfNewPassWord > 256) lengthOfNewPassWord = 256;

    for (let i = 0; i < lengthOfNewPassWord; i++) {
      let characterCandidates = "";
      if (containUppercase) characterCandidates += uppercaseCharacters;
      if (containLowercase) characterCandidates += lowerCaseCharacters;
      if (containNumber) characterCandidates += numberCharacters;
      if (containSymbol) characterCandidates += symbolCharacters;

      const char = characterCandidates.charAt(Math.floor(Math.random() * characterCandidates.length));
      newPassword += char;
    }

    setPassword(newPassword);
  }

  useEffect(() => {
    generatePassword()
  }, [passwordLength, containUppercase, containLowercase, containNumber, containSymbol]);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden w-full bg-black text-green-500 select-none">
      <h1 className="text-5xl animate__animated animate__fadeInUp text-center px-8">Password Generator</h1>
      <p className="text-center text-lg mt-4 sm:text-xl max-w-2xl animate__animated animate__fadeInDown px-8">
        Generate secure and strong password.
      </p>
      <div className="flex animate__animated animate__zoomIn [animation-delay:0.5s] flex-row border-2 justify-between whitespace-nowrap border-green-500 max-w-[90%] min-w-[80%] lg:min-w-[50%] p-4 mt-8 text-2xl">
        <div className="overflow-x-auto overflow-y-hidden">{password}</div>
        <div className="flex items-center gap-3">
          <button onClick={generatePassword}>
            <Icon icon="ic:round-refresh" />
          </button>
          <button onClick={() => {
            copy(password);
            setCopied(true);
            setTimeout(() => {
              setCopied(false)
            }, 1000)
          }}>
            <Icon icon={copied ? "uil:check" : "ic:round-content-copy"} />
          </button>
        </div>
      </div>
      <div className="w-4/5 lg:w-2/5 mt-8">
        <div className="flex flex-col sm:flex-row justify-between w-full gap-2 sm:gap-10">
          <div className="flex flex-col items-start gap-2 w-full sm:w-1/2">
            <div className="flex justify-between gap-2 items-center w-full animate__animated animate__fadeInLeft [animation-delay:1s]">
              <label className="text-xl whitespace-nowrap">Uppercase Character</label>
              <Checkbox value={containUppercase} setValue={setContainUppercase} />
            </div>
            <div className="flex justify-between gap-2 items-center w-full animate__animated animate__fadeInLeft [animation-delay:1.5s]">
              <label className="text-xl whitespace-nowrap">Lowercase Character</label>
              <Checkbox value={containLowercase} setValue={setContainLowercase} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full sm:w-1/2">
            <div className="flex justify-between gap-2 items-center w-full animate__animated animate__fadeInRight [animation-delay:1s]">
              <label className="text-xl">Number</label>
              <Checkbox value={containNumber} setValue={setContainNumber} />
            </div>
            <div className="flex justify-between gap-2 items-center w-full animate__animated animate__fadeInRight [animation-delay:1.5s]">
              <label className="text-xl">Symbol</label>
              <Checkbox value={containSymbol} setValue={setContainSymbol} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8 text-xl animate__animated animate__fadeInUp [animation-delay:2s]">
          <span className="mr-2 whitespace-nowrap flex items-center gap-2 h-8">
            Password length: 
            <div className="flex items-center">
              <button onClick={() => {
                if (passwordLength - 1 >= 8) setPasswordLength(passwordLength - 1)
              }} className="-mt-[1px] w-4 h-4 flex items-center justify-center">-</button>
              <input
                type="number"
                min={8}
                max={256}
                step={1}
                value={passwordLength}
                onChange={e => {
                  if (e.target.value.length <= 3) {
                    const number = parseInt(e.target.value)
                    if (!number) {
                      setPasswordLength(8)
                    } else {
                      setPasswordLength(number)
                    }
                  }
                }}
                className="bg-transparent w-12 text-center focus:outline-none focus:border-2 focus:border-green-500 mt-0.5"
              />
              <button onClick={() => {
                if (passwordLength + 1 <= 256) setPasswordLength(passwordLength + 1)
              }} className="-mt-[1px] w-4 h-4 flex items-center justify-center">+</button>
            </div>
          </span>
          <div className="flex items-center gap-4">
            8
            <Slider
              className="h-1 w-full"
              onChange={(e) => setPasswordLength(e)}
              min={8}
              max={256}
              value={passwordLength}
            />
            256
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
