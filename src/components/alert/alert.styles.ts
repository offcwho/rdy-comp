import { css } from "@emotion/css"

export const AlertCSS = {
    item: ({
        error,
        success,
        alert,
    }: {
        error?: Boolean;
        success?: Boolean;
        alert?: Boolean
    }) => (
        css`
            background-color: ${error
                ? '#BC3F3F'
                : success
                    ? 'rgba(96, 197, 103, 0.68)'
                    : alert
                        ? 'rgba(219, 201, 65, 0.73)'
                        : '#4189DB'
            };
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
            max-width: 350px;
            padding-block: 7px;
            padding-inline: 10px;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2078431373);
            margin-inline: auto;
            position: relative;
        `
    ),
    type: (
        css`
            color: #FFFFFF;
            font - size: 14px;
            font - weight: 700;
            line - height: inherit;
        `
    ),
    description: (
        css`
            color: #D7D7D7;
            font - size: 12px;
            margin - top: 1px;
        `
    ),
    span: (
        css`
            color: #838383ff;
            position: absolute;
            bottom: -20px;
            left: 0;
            width: 100 %;
            text - align: center;
            font - size: 12px;
        `
    ),
}