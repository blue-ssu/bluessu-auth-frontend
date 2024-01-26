export const CenterBoxDescription = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    return (
        <div className="w-full px-[32px] text-[15px] leading-[1.5] text-muted-foreground">
            {children}
        </div>
    );
};
