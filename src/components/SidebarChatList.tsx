"use client";
import { chatHerfConstractor } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chart")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return (unseenMsg.senderId = friend.id);
        }).length;
        return (
          <li key={friend.id}>
            <a
              title={friend.name}
              href={`/dashboard/chat/${chatHerfConstractor(
                sessionId,
                friend.id
              )}`}
              className="text-gray-700 hover:text-yellow-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
            >
              <span className="text-gray-400 border-gray-200 group-hover:border-yellow-600 group-hover:text-yellow-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.625rem] font-medium bg-white">
                <Image
                  src={friend.image}
                  alt={friend.name}
                  className="rounded-full"
                  height={35}
                  width={35}
                />
              </span>
              <span className="truncate">{friend.name}</span>
              {unseenMessagesCount > 0 ? (
                <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-black">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
      <li></li>
    </ul>
  );
};

export default SidebarChatList;
