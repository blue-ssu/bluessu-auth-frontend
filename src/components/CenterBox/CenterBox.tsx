export const CenterBoxComponent = ({
    children,
    maxWidth = "420px",
    minHeight = "540px",
}: {
    children: React.ReactNode;
    maxWidth?: string;
    minHeight?: string;
}) => {
    return (
        <div className="flex w-[100dvw] h-[100dvh] flex-col justify-center items-center">
            <div
                className="flex flex-col w-full h-full md:h-auto"
                style={{ maxWidth, minHeight }}
            >
                {children}
            </div>
        </div>
    );
};
