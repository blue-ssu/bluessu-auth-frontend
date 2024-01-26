import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Footer() {
    return (
        <div className="flex justify-between">
            <Select defaultValue="korean">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="언어" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="korean">한국어</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex items-center gap-[12px] px-[8px]">
                <a href="#" className="text-sm text-muted-foreground">
                    소개
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                    개인정보처리방침
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                    약관
                </a>
            </div>
        </div>
    );
}
