import {Link} from "react-router-dom";
import NavButtonLeft from "../shared/NavButtonLeft";
import EditIcon from "../../icons/EditIcon";
import dateFormatter, {DateFormatterOptions} from "../../utils/time-formatter";

type Props = {
    application: any
    companyimage: string
}

const STAGES_LIST = ['stage_1', 'stage_2', 'stage_3', 'stage_4', 'stage_5'] as const

export default function ApplicationSingle({ application, companyimage }: Props) {
    if (application == null)
        return <div>Application not found</div>

    return (
        <div className='pb-2'>
            <div className='bg-black bg-fixed min-h-[400px] bg-center bg-no-repeat p-2' style={{ backgroundImage: `url("${companyimage}")` }}>
                <NavButtonLeft to='/' text='GO BACK' className='font-bold font-montserrat-bold text-lg text-white hover:underline'/>
            </div>

            <div className='flex flex-col justify-center w-full p-4 md:px-10 md:py-6'>
                <div className='flex justify-between px-0.5'>
                    <div>
                        <h2 className=' text-3xl text-gray-100 font-semibold font-montserrat-bold capitalize'>{ application.title }</h2>
                        <Link to={`/company/${application.company_name}`} className='capitalize text-xl font-semibold underline text-blue-300/80 hover:text-blue-500/80 active:text-blue-600/80 smooth-transition'>{ application.company_name }</Link>
                        <h3 className='mt-1 italic text-sm text-gray-400'>Updated: { application.created_at.split('T')[0] }</h3>
                    </div>
                    <Link to='edit' className='btn-primary flex h-12'>
                        <EditIcon className='w-7 mr-1'/> Edit
                    </Link>
                </div>

                { STAGES_LIST.map(stage => (
                    application[stage] !== null && (
                        <div key={stage} className='py-3 px-5 my-3 bg-white/10 rounded-lg text-gray-300 shadow-2xl drop-shadow-2xl'>
                            <h4 className='text-gray-200 font-montserrat-bold'>Stage { application[stage].stage_number }:</h4>

                            <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 capitalize'>
                                <p className='text-gray-400 italic'>Title:</p>
                                <p className='col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-7'>{ application[stage].title }</p>

                                <p className='text-gray-400 italic'>Details:</p>
                                <p className='col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-7'>{ application[stage].details }</p>

                                <p className='text-gray-400 italic'>Date:</p>
                                <p className='col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-7'>{ dateFormatter(new Date(application[stage].timestamp), DateFormatterOptions.FULL) }</p>

                                <p className='text-gray-400 italic'>Result:</p>
                                <p className='col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-6 xl:col-span-7'>{ application[stage].result }</p>
                            </div>
                        </div>
                    )
                ))}

            </div>
        </div>


    )
}