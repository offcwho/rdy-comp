import { css } from "@emotion/css";

export const SelectCSS = {
    select: () =>
        css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-inline: .75rem;
            padding-block: .50rem;
            background-color: #141414;
            border-width: 1px;
            border: none;
            border-radius: .50rem;
            cursor: pointer;
            width: 18rem;
            font-size: 14px;
            color: #cdcccc;
            transition: background-color .3s ease-in-out;
            &:hover{
                background-color: #212121;
            }
        `,
    selectList: () =>
        css`
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: .50rem;
        `,
    selectShip: () =>
        css`
            padding-block: .25rem;
            padding-inline: .50rem;
            border-radius: .50rem;
            background-color: #3f3f46;
        `,
    selectValue: () =>
        css`
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        `,
    clear: () =>
        css`
            display: flex;
            align-items: center;
            gap: .25rem;
        `,
    clearButton: () =>
        css`
            color: #4a5565;
            transition: all .3s ease-in-out;
            padding: .25rem;
            border-radius: .25rem;
            cursor: pointer;
            &:hover{
                color: #4a5565;
            }
        `,
    arrow: () =>
        css`
            width: 1.25rem;
            height: 1.25rem;
        `,
    poppup: () =>
        css`
            position: absolute;
            margin-top: .5rem;
            width: 18rem;
            background-color: #141414;
            border-radius: .50rem;
            z-index: 50;
            overflow: hidden;
        `,
    search: () =>
        css`
            padding: .75rem;
            padding-bottom: .50rem;
        `,
    searchInput: () =>
        css`
            width: 100%;
            padding-inline: .75rem;
            padding-block: .50rem;
            border-width: 1px;
            border: none;
            border-radius: .50rem;
            background-color: #212121;
            color: #cdcccc;
            &:focus{
                outline: none
            }
        `,
    options: () =>
        css`
            max-height: 16rem;
            overflow-y: auto;
            padding: .75rem;
        `
}