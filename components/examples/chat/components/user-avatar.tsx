import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/32?img=38" alt="user" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  );
}
