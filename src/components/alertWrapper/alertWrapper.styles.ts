import { css } from "@emotion/css";

export const AlertWrapperCSS = {
    wrapper: (
        css`
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
    `),
    alerts: (
        css`
        position: fixed;
        max-width: 100%;
        width: 100%;
        right: 0px;
        top: 0px;
        height: 100%;
        z-index: 9999;
        padding-block: 1.5rem;
        padding-inline: 1.5rem;
    `)
}