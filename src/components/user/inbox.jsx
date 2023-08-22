
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IMG_CDN, SOCKET_URL } from '../../config/urls';
import io from 'socket.io-client'
const socket = io.connect(SOCKET_URL)
import MyAxiosInstance from '../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import Picker from '@emoji-mart/react'
import TypingAnim from './typingAnim';
import { useSelector } from 'react-redux';

function Inbox() {
    const axiosInstance = MyAxiosInstance()
    const { id } = useParams()
    let uid
    const goto = useNavigate()

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [chatList, setChatList] = useState([])
    const [senderId, setSenderId] = useState("")
    const [receiverId, setReceiverId] = useState("")
    const [receiverUsername, setReceiverUsername] = useState("")
    const [receiverDp, setReceiverDp] = useState("")
    const [myId, setMyId] = useState()
    const chatContainerRef = useRef(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [typing,setTyping] = useState(false)
    const userdata = useSelector(store =>store.userInfo.userdata)


    //functions

    //mark seen

    const markMessagesAsSeen = async (receiver) => {
        try {



            await axiosInstance.post('mark-messages-as-seen', {
                sender1: id,
                receiver1: userdata._id
            })

            if (receiver && id && id != 0) {
                socket.emit('message_seen', { sender: id, receiver: receiver })
            }


        } catch (error) {
            console.error('Failed to mark messages as seen:', error);
        }
    }


    //send message

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
        if (messages[messages.length - 1]?.date != messageDate.date && messageDate.receiver==id) {
            setMessages((x) => [...x, messageDate])
        }

        setCurrentMessage("")
    }

    const getData = async () => {
        let response = await axiosInstance.get('chatlist')
        response.data.list.forEach(element => {
            if(element.id==id)
            {
                element.newMessage = false
            }
        });
        response.data.list.sort((a, b) => (b.newMessage ? 1 : -1));
        setChatList(response.data.list)
        setMyId(response.data.myId)
        uid = response.data.myId

        let temp
        if (id != 0) {
            let response1 = await axiosInstance.get(`getChat/${id}`)
            temp = response1.data.receiverId
            
            setReceiverDp(response1.data.receiverDp)
            setReceiverUsername(response1.data.receiverName)
            setMessages(response1.data.content)
            setSenderId(response1.data.senderId)
            setReceiverId(response1.data.receiverId)

        }

        socket.emit("join_room", response.data.myId)
        if (id != 0) {

            await markMessagesAsSeen(temp);


        }

    }



    const go = () => {
        goto(`/${receiverUsername}`)
    }
    const direct = (id) => {
        // goto(`/direct/${id}`)
        location.href =`/direct/${id}`
    }




    //use effects



    //socket
    useEffect(() => {
        socket.on("receive_message", async (data) => {

          

            if (messages[messages.length - 1]?.date != data.date) {
               
                if(data.sender == id)
                {
                    setMessages((x) => [...x, data])
                }
              
            }

           

            markMessagesAsSeen(data.receiver)

            if(data.sender!==id)
            {

                let response = await axiosInstance.get('chatlist')
                const temp = response.data.list.map((x)=>{
                    if(x.id==data.sender)
                    {
                        x.newMessage = true
                    }
                    return x
                })
                temp.sort((a, b) => (b.newMessage ? 1 : -1));
              
               
                setChatList(temp)
                goto(`/direct/${id}`)
            }

           

        })

        socket.on('message_seen', async (data) => {

            
             let response1 = await axiosInstance.get(`getChat/${id}`)
             setMessages(response1.data.content)
        })

        socket.on('typing', async (data) => { 
            data.typing && data.room == uid && data.visible==id ?  setTyping(true)  : setTyping(false)
         
          

        })

     





    }, [socket])

    
    useEffect(() => {

      

        getData()
        setTyping(false)
        socket.emit("join_room", id)

       
       


    }, [id])

    // message
    useEffect(() => {

        if (id != 0) {
            chatContainerRef?.current.scrollTop = chatContainerRef?.current?.scrollHeight;
        }

    }, [messages]);

    //typing
    useEffect(()=>{

        currentMessage.length !=0 ? socket.emit("typing",{room:id,typing:true,visible:myId}) : socket.emit("typing",{room:myId,typing:false,visible:id})

    },[currentMessage])


    return (
        <>
            <div className='flex max-h-screen h-screen overflow-y-hidden'>
                {/* User List (Left Side) */}
                <div className="w-1/4 bg-black p-4 border-r">
                    <Link to={'/'} className='text-lg text-white  font-semibold mb-4'>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", }} /> Back</Link>

                    <h4 className='text-white mt-4 border-b w-fit'>Messages</h4>

                    {chatList.length != 0 ?


                        <ul className="space-y-2 mt-7 text-white ">

                            {chatList?.map((x) => {

                                return (

                                    <li key={x?.id} onClick={() => {
                                        
                                         direct(x?.id) 
                                      
                                         }} className="  border-b border-gray-500 pb-3 cursor-pointer">
                                        <span className='flex items-center space-x-2'>
                                        <img src={IMG_CDN + x?.dp} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                                        <span className="text-sm font-medium">{x?.username}</span> 
                                        </span>
                                       
                                        {x?.newMessage ? <span className="text-sm font-bold flex-none ml-10">New Message</span> : <span className="text-sm font-semibold flex-none ml-10 text-gray-500">View Messages</span> }
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
                    <div className="flex flex-col w-3/4 p-1"  >
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

                                    {messages?.length != 0 && messages.map((x) => {

                                        return (
                                            x?.sender == id
                                                ?

                                                <div key={x?.date} className="flex items-start space-x-2 flex-wrap">
                                                    <img src={IMG_CDN + receiverDp} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
                                                    <span className="bg-black text-white px-2 py-1 rounded-lg inline-block" style={{ maxWidth: "80%", wordWrap: "break-word" }}>
                                                        {x?.content} <span className='text-white' style={{ fontSize: "8px" }}>{x?.time}</span>
                                                    </span>
                                                </div>

                                                :

                                                <div key={x?.date} className="flex items-start space-x-2 justify-end">
                                                    <span className="bg-black text-white px-2 py-1 rounded-lg inline-block" style={{ maxWidth: "80%", wordWrap: "break-word" }}>
                                                        <span className='text-white' style={{ fontSize: "8px" }}>{x?.time}</span>  {x?.content}
                                                    </span>
                                                    {x?.sender !== id && x?.seenByReceiver && (
                                                        <span className="text-xs text-gray-400 mt-1">Seen</span>
                                                    )}
                                                    {/* <img src={img} alt="User Avatar" className="w-6 h-6 rounded-full" /> */}

                                                </div>


                                        )
                                    })}


                                       <div  className="flex items-start space-x-2 flex-wrap" >
                                       {typing && 
                                       <TypingAnim/>      
                                       }
                                       </div>
                                   



                                </div>
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 flex">
                                {/* Emoji Picker Button */}
                                <button
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Step 2: Toggle emoji picker visibility
                                    className="bg-blue-500 text-white p-2 rounded-l-md "
                                >
                                    <FontAwesomeIcon icon={faFaceSmile} style={{ color: "#ffffff", }} />
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
                                <input type="text" autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter" && e.target.value.length != 0) {
                                            sendMessage()
                                        }

                                    }}
                                    value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Type a message..." className="flex-grow border  px-3 py-2 bg-gray-800 text-white" />
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
