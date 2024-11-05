import React, { useCallback, useEffect, useState,useRef } from 'react';

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("czdmchdhmadsd");
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
//   console.log("charcter",characters);
//   console.log("number",number);   /// why both checkbox is trigger by clicking on a single checkbox

// use ref 
const passwordRef = useRef(null);

// pcopyToclipBoard
const copyToclipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
window.navigator.clipboard.writeText(password);
},[password])

const passwordGenratorFun = useCallback(()=>{
// console.log("hello");
let str = "abcdefghijklmnopqrstuvwzxyABCDEFGHIKJLMNOPQRSTUVWXYZ";
let char = "@*&#*!*(&!)(";
let numbers = "0123456789";
let password = str;
let finalpass = "";
if(number){
password+=numbers;
}
if(characters){
    password+=char;
}
for(let i=0;i<length;i++){
   let char =  Math.floor(Math.random() * password.length+1);
   finalpass+=password.charAt(char);
}
setPassword(finalpass); 
},[number,characters,length,setPassword])

// function call 
useEffect(()=>{
    passwordGenratorFun();
},[number,characters,length,setPassword]);
  return (
    <div>
      <div className='items-center flex justify-center h-screen'>
        <div className='password-generator bg-gray-500 h-[150px] w-auto text-center'>
          <h1 className='text-xl mt-3 font-mono mb-2'>Password Generator</h1>
          <div className='ml-2 mr-2 mt-2 mb-2'>
            <input ref={passwordRef} readOnly type='text' value={password}></input>
            <button onClick={copyToclipBoard}    className=" transition duration-700 ease-in bg-red-600  hover:bg-sky-700  rounded pr-2 pl-2 ml-3 text-white">Copy</button>

          </div>
          <div className='flex'>
            <div className='ml-2'>
              <input onChange={(e) => setLength(e.target.value)} type='range' min={0} max={100} placeholder={length}></input>
              <span className='ml-2 p-5 '>{length}</span>
            </div>
            <div className='ml-2 mr-2'>
              <input className='' onClick={() => setCharacters(!characters)} type='checkbox'></input>
              <span className='ml-1'>Characters</span>
            </div>
            <div className='ml-2 mr-2'>
              <input className='' onClick={() => setNumber(!number)} type='checkbox'></input>
              <span className='ml-1'>Number</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator;
