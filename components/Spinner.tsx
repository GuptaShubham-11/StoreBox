import { CircleOff } from "lucide-react";

export default function Spinner({ size = 20 }: { size?: number }) {
    return (
        <div className="flex items-center justify-center">
            <CircleOff className="animate-spin" size={size} />
        </div>
    );
}