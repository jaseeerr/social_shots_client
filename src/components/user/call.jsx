import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import logoRec from '../../../public/assets/LOGOBig.png'; 
import { useDispatch, useSelector } from "react-redux";
import { updateBusy } from "../../utils/userSlice";

const Call = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const uname = useSelector(store=>store.userInfo?.userdata?.username)


  useEffect(() => {
   
    dispatch(updateBusy(true))
   
    const handleBeforeUnload = () => {
      dispatch(updateBusy(false))
      
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);





  const myCall = async (element)=>{

    const appID = 2132640648
    const serverSecret = "a1cf7245f0da31033c50b87e2d7c39b4"
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id,Date.now().toString(),uname );
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
      container:element,
      scenario:{
        mode:ZegoUIKitPrebuilt.OneONoneCall,
        
      },
      showScreenSharingButton:false,
      showPreJoinView:false,
      showTextChat:false,
      showUserList:false,
      branding:{
        logoURL:logoRec
      },
      showRoomDetailsButton:false
    })
  }

  return(
    <div className="max-h-96"> 
      <div ref={myCall} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
};

export default Call;
