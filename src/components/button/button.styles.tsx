import { css } from "@emotion/css";

export const buttonStyle = {
    button: (
        {
            backgroundColor,
            color,
            radius
        }: {
            backgroundColor?: string,
            color?: string,
            radius?: number,
        }) => css`
        padding-inline: 20px;
        padding-block: 8px;
        background-color: ${backgroundColor || '#fff'};
        color: ${color || '#000'};
        border-radius: ${radius ? radius + 'px' : '.35rem'};
        font-size: 14px;
    `,
}