export const SelectIcon = ({ size }: { size: number }) => {
    return (
        <svg
            fill="#4a5565"
            width={size ? `${size + 'px'}` : '80px'}
            height={size ? `${size + 'px'}` : '80px'}
            viewBox="0 0 64 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                strokeLinejoin: 'round',
                strokeMiterlimit: 2
            }}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <rect id="Icons" x="-512" y="-64" width="1280" height="800" style={{ fill: 'none' }} />
                <g id="Icons1">
                    <path id="success" d="M56.103,16.824l-33.296,33.297l-14.781,-14.78l2.767,-2.767l11.952,11.952l30.53,-30.53c0.943,0.943 1.886,1.886 2.828,2.828Z" style={{ fillRule: 'nonzero' }} />
                </g>
            </g>
        </svg>
    )
}