
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')
import MyAxiosInstance from '../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { IMG_CDN } from '../../config/urls';
import Picker from '@emoji-mart/react'

function Inbox1() {
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
    const [myId, setMyId] = useState('')
    const chatContainerRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Step 1: State for emoji picker visibility
    const [showList,setShowList] = useState(true)




    const markMessagesAsSeen = async () => {
        try {
            await axiosInstance.post('/mark-messages-as-seen', {
                userId: myId,
                room: id // Room identifier for the chat
            });
        } catch (error) {
            console.error('Failed to mark messages as seen:', error);
        }
    }






    const sendMessage = async () => {


        const now = new Date();
        let time = now.getHours() + ":" + now.getMinutes()


        const messageDate = {
            room: id,
            sender: senderId,
            receiver: receiverId,
            content: currentMessage,
            time: time,
            date: Date.now()
        }

        await socket.emit('send_message', messageDate)
        if (messages[messages.length - 1]?.date != messageDate.date) {
            setMessages((x) => [...x, messageDate])
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
        if(id!=0)   await markMessagesAsSeen();
      
    }

    const go = () => {
        goto(`/${receiverUsername}`)
    }
    const direct = (id) => {
        setShowList(false)
        goto(`/direct/${id}`)
    }

    useEffect(() => {

        if(id==0)
        {
            setShowList(true)
        }
        else
        {
            setShowList(false)
        }
        socket.on("receive_message", (data) => {

            console.log(data)
            console.log("INCOMINGG");
            if (messages[messages.length - 1]?.date != data.date) {
                setMessages((x) => [...x, data])
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
        // if (id != 0) {
        //     chatContainerRef?.current.scrollTop = chatContainerRef?.current?.scrollHeight;
        // }

    }, [messages]);


    return (
        <>
            <div className='flex max-h-screen h-screen overflow-y-hidden'>
                {/* User List (Left Side) */}
                {showList && 
                
                <div className="w-full bg-black p-4 border-r">
                <Link to={'/'} className='text-lg text-white  font-semibold mb-4'>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", }} /> Back</Link>

                    <h4 className='text-white mt-4 border-b w-fit'>Messages</h4>

                {chatList.length != 0 ? 


                    <ul className="space-y-2 mt-7 text-white ">

                        {chatList.map((x) => {

                            return (

                                <li key={x.id} onClick={() => { direct(x.id) }} className="flex items-center space-x-2 border-b border-gray-500 pb-3 cursor-pointer">
                                    <img src={IMG_CDN + x.dp} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                                    <span className="text-sm font-medium">{x.username} </span>
                                  
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

                }
              


                {/* Chat Area (Right Side) */}
                {!showList ?
                    <div className="flex flex-col w-full p-1"  >
                        {/* Header */}
                        <div className="bg-black p-4 flex items-center justify-start border-b">
                        <span onClick={()=>{
                            setShowList(true)
                            goto(-1)
                        }} className=' text-white  font-semibold mr-2'>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", }} /> </span>

                       
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
                                {/* Emoji Picker Button */}
                                <button
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Step 2: Toggle emoji picker visibility
                                    className="bg-blue-500 text-white p-2 rounded-full"
                                >
                                  <FontAwesomeIcon icon={faFaceSmile} style={{color: "#ffffff",}} />
                                </button>

                                {/* Emoji Picker */}
                                {showEmojiPicker && ( // Step 3: Conditionally render emoji picker
                                    <div className="absolute bottom-16 right-0 mt-2">
                                        <Picker
                                            previewPosition="none"
                                            onEmojiSelect={(e) => {
                                                setCurrentMessage(currentMessage + e.native);
                                            }}
                                        />
                                    </div>
                                )}
                                <input type="text"
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter" && e.target.value.length != 0) {
                                            sendMessage()
                                        }

                                    }}
                                    value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Type a message..." className="flex-grow border rounded-l-md px-3 py-2 bg-gray-800 text-white" />
                                {currentMessage.length == 0
                                    ?
                                    <button className="bg-blue-400 text-white px-4 py-2 rounded-r-md">Send</button>
                                    :
                                    <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Send</button>
                                }
                            </div>
                        </div>
                    </div>

                    :

null
                }

            </div>
        </>
    )
}

export default Inbox1;
