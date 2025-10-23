import { css } from "@emotion/css";

export const OptionCSS = {
    option: (disabled: boolean) =>
        css`
            display: flex;
            gap: .50rem;
            justify-content: space-between;
            align-items: center;
            padding-inline: .75rem;
            padding-block: .50rem;
            cursor: pointer;
            user-select: none;
            border-radius: .75rem;
            opacity: ${disabled && '.5'};
            color: #cdcccc;
            &:hover{
                background-color: #212121;
            }
        `
}