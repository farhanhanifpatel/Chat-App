import { useChatStore } from '../store/useChatStore'
import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
    const {
        messages,
        getMessage,
        isMessageLoading,
        selectedUser,
        subScribeToMessage,
        unSubscribeFromMessage,
    } = useChatStore()
    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessage(selectedUser._id)
        subScribeToMessage()
        return () => {
            unSubscribeFromMessage()
        }
    }, [selectedUser, getMessage, subScribeToMessage, unSubscribeFromMessage])

    useEffect(() => {
        console.log('Messages:', messages) // Debugging: Check if messages are updating
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    useEffect(() => {
        const socket = useAuthStore.getState().socket
        const setMessages = useChatStore.getState().setMessages
      
        socket.on("newMessage", message => {
          setMessages(prev => [...prev, message])
        })
      
        return () => socket.off("newMessage")
      }, [])
      
      
      
    if (isMessageLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        )
    }

    if (!selectedUser) {
        return <div className="flex-1 flex items-center justify-center">Select a user to start chatting</div>
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
                        ref={messageEndRef}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic || '/avatar.png'
                                            : selectedUser.profilePic || '/avatar.png'
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    )
}

export default ChatContainer
