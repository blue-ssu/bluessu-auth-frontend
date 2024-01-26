import React from "react";

export const CenterBoxTitle = ({
    icon,
    title,
    subtitle,
}: {
    icon?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
}) => {
    return (
        <div className="w-full flex flex-col items-center px-[32px] py-[16px] gap-[8px]">
            {icon}
            <div className="flex flex-col items-center">
                <div className="text-[20px] font-bold leading-[1.5] text-[var(--bluessu-text)]">
                    {title}
                </div>
                <div className="text-sm leading-5 text-muted-foreground">
                    {subtitle}
                </div>
            </div>
        </div>
    );
};
