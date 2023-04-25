import {useNavigate} from "react-router-dom";
import ArrowLeft from "../../icons/ArrowLeft";

type Props = {
    text: string
    to: string
    className?: string
}

export default function NavButtonLeft({ text, to, className }: Props) {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(-1)} className={`text-white group flex items-center cursor-pointer ${className}`}>
            <ArrowLeft width={30} className='mr-2 group-hover:animate-bounceRight'/> {text}
        </div>
    )
}