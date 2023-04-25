import NavButtonLeft from "./shared/NavButtonLeft";

type Props = {
    companyname: string
    companydata: string | undefined
    companyimage: string | undefined
}

export default function CompanyPage({ companyname, companydata, companyimage }: Props) {

    return (
        <div className='pb-2'>
            <div className='bg-black bg-fixed min-h-[400px] bg-center bg-no-repeat p-2' style={{ backgroundImage: `url("${companyimage}")` }}>
                <NavButtonLeft to='/' text='GO BACK' className='font-bold font-montserrat-bold text-lg text-white hover:underline'/>
            </div>

            <div className="my-4 py-3 px-4 mx-2 sm:mx-12 md:px-8 md:mx-24 border-4 rounded-lg border-blue-500 bg-white/10">
                <h2 className='capitalize text-4xl font-bold font-montserrat-bold mb-2'>{ companyname }</h2>
                <div className='text-gray-400' dangerouslySetInnerHTML={{ __html: typeof companydata == 'undefined' ? '<p>NOT FOUND</p>' : companydata }} />
            </div>
        </div>
    )
}