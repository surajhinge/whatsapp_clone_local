// "use client";
// import { ListFilter, Search } from "lucide-react";
// import { Input } from "../ui/input";
// import ThemeSwitch from "./theme-switch";
// import Conversation from "./conversation";
// import { UserButton } from "@clerk/nextjs";

// import UserListDialog from "./user-list-dialog";
// import { useConvexAuth, useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { useEffect } from "react";
// import { useConversationStore } from "@/src/components/store/chat-store";

// const LeftPanel = () => {
// 	const { isAuthenticated, isLoading } = useConvexAuth();
// 	const conversations = useQuery(api.conversations.getMyConversations, isAuthenticated ? undefined : "skip");

// 	const { selectedConversation, setSelectedConversation } = useConversationStore();

// 	useEffect(() => {
// 		const conversationIds = conversations?.map((conversation) => conversation._id);
// 		if (selectedConversation && conversationIds && !conversationIds.includes(selectedConversation._id)) {
// 			setSelectedConversation(null);
// 		}
// 	}, [conversations, selectedConversation, setSelectedConversation]);

// 	if (isLoading) return null;

// 	return (
// 		<div className='w-1/4 border-gray-600 border-r'>
// 			<div className='sticky top-0 bg-left-panel z-10'>
// 				{/* Header */}
// 				<div className='flex justify-between bg-gray-primary p-3 items-center'>
// 					<UserButton />

// 					<div className='flex items-center gap-3'>
// 						{isAuthenticated && <UserListDialog />}
// 						<ThemeSwitch />
// 					</div>
// 				</div>
// 				<div className='p-3 flex items-center'>
// 					{/* Search */}
// 					<div className='relative h-10 mx-3 flex-1'>
// 						<Search
// 							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10'
// 							size={18}
// 						/>
// 						<Input
// 							type='text'
// 							placeholder='Search or start a new chat'
// 							className='pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent'
// 						/>
// 					</div>
// 					<ListFilter className='cursor-pointer' />
// 				</div>
// 			</div>

// 			{/* Chat List */}
// 			<div className='my-3 flex flex-col gap-0 max-h-[80%] overflow-auto'>
// 				{/* Conversations will go here*/}
// 				{conversations?.map((conversation) => (
// 					<Conversation key={conversation._id} conversation={conversation} />
// 				))}

// 				{conversations?.length === 0 && (
// 					<>
// 						<p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
// 						<p className='text-center text-gray-500 text-sm mt-3 '>
// 							We understand {"you're"} an introvert, but {"you've"} got to start somewhere 😊
// 						</p>
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
// export default LeftPanel;

import { ListFilter, LogOut, MessageSquareDiff, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./theme-switch";

const LeftPanel = () => {
	const conversations = [];

	return (
		<div className='w-1/4 border-gray-600 border-r'>
			<div className='sticky top-0 bg-left-panel z-10'>
				{/* Header */}
				<div className='flex justify-between bg-gray-primary p-3 items-center'>
					<User size={24} />

					<div className='flex items-center gap-3'>
						<MessageSquareDiff size={20} /> {/* TODO: This line will be replaced with <UserListDialog /> */}
						<ThemeSwitch />
						<LogOut size={20} className='cursor-pointer' />
					</div>
				</div>
				<div className='p-3 flex items-center'>
					{/* Search */}
					<div className='relative h-10 mx-3 flex-1'>
						<Search
							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10'
							size={18}
						/>
						<Input
							type='text'
							placeholder='Search or start a new chat'
							className='pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent'
						/>
					</div>
					<ListFilter className='cursor-pointer' />
				</div>
			</div>

			{/* Chat List */}
			<div className='my-3 flex flex-col gap-0 max-h-[80%] overflow-auto'>
				{/* Conversations will go here*/}

				{conversations?.length === 0 && (
					<>
						<p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
						<p className='text-center text-gray-500 text-sm mt-3 '>
							We understand {"you're"} an introvert, but {"you've"} got to start somewhere 😊
						</p>
					</>
				)}
			</div>
		</div>
	);
};
export default LeftPanel;

// import { formatDate } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { MessageSeenSvg } from "@/lib/svgs";
// import { ImageIcon, Users, VideoIcon } from "lucide-react";

// const Conversation = ({ conversation }: { conversation: any }) => {
// 	const conversationImage = conversation.groupImage;
// 	const conversationName = conversation.groupName || "Private Chat";
// 	const lastMessage = conversation.lastMessage;
// 	const lastMessageType = lastMessage?.messageType;
// 	const authUser = { _id: "user1" };

// 	return (
// 		<>
// 			<div className={`flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer `}>
// 				<Avatar className='border border-gray-900 overflow-visible relative'>
// 					{conversation.isOnline && (
// 						<div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground' />
// 					)}
// 					<AvatarImage src={conversationImage || "/placeholder.png"} className='object-cover rounded-full' />
// 					<AvatarFallback>
// 						<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
// 					</AvatarFallback>
// 				</Avatar>
// 				<div className='w-full'>
// 					<div className='flex items-center'>
// 						<h3 className='text-xs lg:text-sm font-medium'>{conversationName}</h3>
// 						<span className='text-[10px] lg:text-xs text-gray-500 ml-auto'>
// 							{formatDate(lastMessage?._creationTime || conversation._creationTime)}
// 						</span>
// 					</div>
// 					<p className='text-[12px] mt-1 text-gray-500 flex items-center gap-1 '>
// 						{lastMessage?.sender === authUser?._id ? <MessageSeenSvg /> : ""}
// 						{conversation.isGroup && <Users size={16} />}
// 						{!lastMessage && "Say Hi!"}
// 						{lastMessageType === "text" && lastMessage?.content.length > 30 ? (
// 							<span className='text-xs'>{lastMessage?.content.slice(0, 30)}...</span>
// 						) : (
// 							<span className='text-xs'>{lastMessage?.content}</span>
// 						)}
// 						{lastMessageType === "image" && <ImageIcon size={16} />}
// 						{lastMessageType === "video" && <VideoIcon size={16} />}
// 					</p>
// 				</div>
// 			</div>
// 			<hr className='h-[1px] mx-10 bg-gray-primary' />
// 		</>
// 	);
// };
// export default Conversation;