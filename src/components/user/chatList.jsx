import React from 'react'

function ChatList() {
  return (
    <>
    
    <div class="w-1/4 bg-gray-700 p-4 border-r">
            <h2 class="text-lg font-semibold mb-4">Users</h2>
            <ul class="space-y-2">
                <li class="flex items-center space-x-2">
                    <img src="user-avatar.jpg" alt="User Avatar" class="w-8 h-8 rounded-full"/>
                    <span class="text-sm font-medium">User 1</span>
                </li>
            </ul>
        </div>
    </>
  )
}

export default ChatList