type Props = {
    className?: string
}

export default function PlaceholderImageIcon({ className }: Props) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="680.764" height="528.354" viewBox="0 0 180.119 139.794">
            <g transform="translate(-13.59 -66.639)">
                <path fill="#555555" d="M13.591 66.639H193.71v139.794H13.591z"/>
                <path d="m118.507 133.514-34.249 34.249-15.968-15.968-41.938 41.937H178.726z" opacity=".675" fill="#858585"/>
                <circle cx="58.217" cy="108.555" r="11.773" opacity=".675" fill="#858585"/>
                <path fill="none" d="M26.111 77.634h152.614v116.099H26.111z"/>
            </g>
        </svg>
    )
}