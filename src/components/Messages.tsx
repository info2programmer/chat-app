"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { format } from "date-fns";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  sessionImage: string | null | undefined;
  chatPartner: User;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  sessionImage,
  chatPartner,
}) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const formatTimeStamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div
            className="chat-messages"
            key={`${message.id}-${message.timestamp}`}
          >
            <div
              className={cn("flex items-end", { "justify-end": isCurrentUser })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-2 py-2 rounded-lg inline-block", {
                    "bg-black text-white ": isCurrentUser,
                    "bg-gray-200 text-gray-900 ": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-xs-2 text-gray-400 ">
                    {formatTimeStamp(message.timestamp)}
                  </span>
                </span>
              </div>

              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImage as string) : chatPartner.image
                  }
                  alt="User Image"
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                ></Image>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
