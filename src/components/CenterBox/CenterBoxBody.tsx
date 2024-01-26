export const CenterBoxBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col items-center pt-[100px] border-0 md:py-[24px] md:border-x md:border-b rounded-b-[8px]">
            {children}
        </div>
    );
};
