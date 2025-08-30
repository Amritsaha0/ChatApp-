import {useEffect, useRef, useState } from 'react'
import './App.css'


function App() {

  const [message,setMessage]=useState(["hi there","hello"]);
  const wsRef = useRef(null as WebSocket | null);


  useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onmessage = (event) => {
          setMessage((prev) => [...prev, event.data]);
          console.log(event.data);
        };

        wsRef.current = ws;

        ws.onopen = () => {
          console.log("Connected to WebSocket server");
          ws.send(JSON.stringify({
            type: "join",
            payload: {
              roomId: "123"
            }
          }));
        };

        return () => {
          ws.close();
        };
}, []);


  return (
    <>
    <div className="h-screen bg-black text-white flex flex-col">
      
      <div className="h-[90vh] bg-red-100">
        <br /><br />
        {message.map(message=> 
        <div className='flex-col m-2'>
          <span className='bg-pink-600 rounded-md py-1 px-4 '>
            {message}
            </span>
          </div>)}
      </div>
      <div className='flex justify-center items-center bg-slate-800 h-[10vh]'>
        <input id="message" placeholder='write your message' className='w-[90vw] py-3 px-4'></input>
        <button className='bg-blue-500 text-white px-6 py-3 rounded-md m-2' onClick={()=> {
          const input = document.getElementById("message") as HTMLInputElement | null;
          //@ts-ignore
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:input?.value
            }
          }));
          if(input) input.value="";
        }}>Send</button>
      </div>
    </div>
      
    </>
  )
}

export default App
