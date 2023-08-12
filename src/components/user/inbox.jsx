const img = "data:image/jpeg;base64,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"

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')
import MyAxiosInstance from '../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IMG_CDN } from '../../config/urls';


function Inbox() {
    const axiosInstance = MyAxiosInstance()
    const { id } = useParams()
    const goto = useNavigate()

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [chatList, setChatList] = useState([])
    const [senderId, setSenderId] = useState("")
    const [receiverId, setReceiverId] = useState("")
    const [receiverUsername, setReceiverUsername] = useState("")
    const [receiverDp, setReceiverDp] = useState("")
    const [myId,setMyId] = useState('')
    const chatContainerRef = useRef(null);


    const sendMessage = async () => {

        let temp = () => {
            const now = new Date();
            let time = now.getHours() + ":" + now.getMinutes()
            return time
        }

        const messageDate = {
            room: id,
            sender: senderId,
            receiver: receiverId,
            content: currentMessage,
            time: temp,
            date: Date.now()
        }

        await socket.emit('send_message', messageDate)
        if(messages[messages.length-1]?.date!=messageDate.date)
            {
                setMessages((x)=>[...x,messageDate])
            }
      
        setCurrentMessage("")
    }

    const getData = async () => {
        let response = await axiosInstance.get('chatlist')

        console.log(response)

        if (id != 0) {
            let response1 = await axiosInstance.get(`getChat/${id}`)
            setReceiverDp(response1.data.receiverDp)
            setReceiverUsername(response1.data.receiverName)
            setMessages(response1.data.content)
            setSenderId(response1.data.senderId)
            setReceiverId(response1.data.receiverId)

        }
        setChatList(response.data.list)
        setMyId(response.data.myId)
        socket.emit("join_room", response.data.myId)
    }

    const go = () => {
        goto(`/${receiverUsername}`)
    }
    const direct = (id)=>{
        goto(`/direct/${id}`)
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {

            console.log(data)
            console.log("INCOMINGG");
            if(messages[messages.length-1]?.date!=data.date)
            {
                setMessages((x)=>[...x,data])
            }
           

        })

      

    }, [socket])

    useEffect(() => {

       
        getData()
        socket.emit("join_room", id)
        
        
       

    }, [])

    useEffect(() => {

       
        getData()
        socket.emit("join_room", id)
        
        
       

    }, [id])


    useEffect(() => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);
  

    return (
        <>
            <div className='flex max-h-screen h-screen overflow-y-hidden'>
                {/* User List (Left Side) */}
                <div className="w-1/4 bg-black p-4 border-r">
                    <Link to={'/'} className='text-lg text-white  font-semibold mb-4'>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", }} /> Back</Link>

                    {chatList.length != 0 ?

                           
                        <ul className="space-y-2 mt-14 text-white ">

                        {chatList.map((x)=>{

                            return(

                                <li key={x.ID} onClick={()=>{direct(x.id)}} className="flex items-center space-x-2 border-b border-gray-500 pb-3 cursor-pointer">
                                <img src={IMG_CDN+x.dp} alt="User Avatar" className="w-8 h-8 rounded-full object-cover"/>
                                <span className="text-sm font-medium">{x.username}</span>
                            </li>
                            )
                        })}
                            {/* Add more user items here */}



                        </ul>
                        :

                        <div className='flex justify-center items-center h-full w-full'>
                            <p className='flex justify-center items-center text-white'> Inbox's Empty</p>
                        </div>
                    }

                </div>


                {/* Chat Area (Right Side) */}
                {id != 0 ?
                    <div className="flex flex-col w-3/4 p-1">
                        {/* Header */}
                        <div className="bg-black p-4 flex items-center justify-start border-b">

                            <img onClick={go} src={receiverDp && IMG_CDN + receiverDp} alt="User Avatar" className="w-8 h-8 rounded-full cursor-pointer object-cover" />
                            <span onClick={go} className="text-lg text-white font-semibold ml-2 cursor-pointer"> {receiverUsername && receiverUsername} </span>



                            {/* <div className="flex items-center space-x-2">
                         <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                         <span className="text-lg font-semibold">User 1</span>
                     </div> */}
                        </div>

                        {/* Chat Messages */}




                        <div className="flex-grow bg-black0 shadow-md rounded-lg overflow-hidden flex flex-col">
                            <div className="bg-black p-4 h-96 rounded-lg overflow-y-scroll flex-grow" ref={chatContainerRef}>
                                <div className="flex flex-col space-y-2">

                                    {messages.length != 0 && messages.map((x) => {

                                        return (
                                            x.sender == id
                                                ?

                                                <div key={x._id} className="flex items-start space-x-2 flex-wrap">
                                                    <img src={IMG_CDN + receiverDp} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
                                                    <span className="bg-black text-white px-2 py-1 rounded-lg inline-block" style={{ maxWidth: "80%", wordWrap: "break-word" }}>
                                                        {x.content} <span className='text-white' style={{ fontSize: "8px" }}>{x.time}</span>
                                                    </span>
                                                </div>

                                                : 

                                                <div key={x._id} className="flex items-start space-x-2 justify-end">
                                                    <span className="bg-black text-white px-2 py-1 rounded-lg inline-block" style={{ maxWidth: "80%", wordWrap: "break-word" }}>
                                                        <span className='text-white' style={{ fontSize: "8px" }}>{x.time}</span>  {x.content}
                                                    </span>
                                                    {/* <img src={img} alt="User Avatar" className="w-6 h-6 rounded-full" /> */}
                                                </div>


                                        )
                                    })}

                                


                                </div>
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 flex">
                                <input type="text" 
                                onKeyDown={(e)=>{
                                    if(e.key=="Enter" && e.target.value.length!=0)
                                    {
                                        sendMessage()
                                    }

                                }}
                                value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Type a message..." className="flex-grow border rounded-l-md px-3 py-2 bg-gray-800 text-white" />
                              {currentMessage.length==0 
                              ? 
                               <button  className="bg-blue-400 text-white px-4 py-2 rounded-r-md">Send</button>
                              :
                              <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Send</button>
                            }
                            </div>
                        </div>
                    </div>

                    :


                    <div className="flex justify-center items-center w-3/4 p-1 bg-black">
                        {/* Header */}
                        <svg aria-label="" className="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="96" role="img" viewBox="0 0 96 96" width="96"><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
                        <br />  <h5 className='text-white ml-7'> Message Your Friends With Direct.</h5>
                    </div>

                }

            </div>
        </>
    )
}

export default Inbox;
