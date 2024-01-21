import { CenterBoxComponent } from "./CenterBox";
import { CenterBoxBody } from "./CenterBoxBody";
import { CenterBoxDescription } from "./CenterBoxDescription";
import { CenterBoxFooter } from "./CenterBoxFooter";
import { CenterBoxHeader } from "./CenterBoxHeader";
import { CenterBoxTitle } from "./CenterBoxTitle";

export const CenterBox = Object.assign(CenterBoxComponent, {
    Header: CenterBoxHeader,
    Body: CenterBoxBody,
    Footer: CenterBoxFooter,
    Title: CenterBoxTitle,
    Description: CenterBoxDescription,
});
