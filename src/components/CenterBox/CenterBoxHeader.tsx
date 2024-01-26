export const CenterBoxHeader = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center h-[40px] px-[16px] border-0 border-b md:border rounded-t-[8px] text-muted-foreground text-[15px] gap-[8px]">
            {children}
        </div>
    );
};
