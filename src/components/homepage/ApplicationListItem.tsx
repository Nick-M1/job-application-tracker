import {AppliactionDataLoaderReturnType} from "../../routes/ApplicationsListRoute";
import {Await, Link} from "react-router-dom";
import {Suspense} from "react";
import PlaceholderImageIcon from "../../icons/PlaceholderImageIcon";
import {PLACEHOLDER_COMPONENT} from "../shared/PlaceholderComponent";

type Props = {
    application: AppliactionDataLoaderReturnType['applicationData'][0]
    companyimage: AppliactionDataLoaderReturnType['companyimages'][0]
}


export default function ApplicationListItem({ application, companyimage }: Props) {

    return (
        <Link to={`/application/${application.application_id}`} className='bg-white/10 hover:bg-white/20 active:bg-white/30 smooth-transition rounded-lg p-2 w-full flex space-x-4 shadow-2xl drop-shadow-2xl'>

            <Suspense fallback={PLACEHOLDER_COMPONENT}>
                <Await resolve={companyimage} errorElement={PLACEHOLDER_COMPONENT}>
                    {( (image) =>
                            <div className='w-[8rem] h-[6rem] flex justify-center items-center'>
                                <img src={image} alt='company-image' title={application.company_name} className='max-w-[8rem] max-h-[6rem] rounded-lg'/>
                            </div>
                    )}
                </Await>
            </Suspense>

            <div>
                <h4 className='text-lg font-semibold font-montserrat-bold capitalize'>{ application.company_name }</h4>
                <p className='capitalize'>{ application.title }</p>
                <p className='text-sm italic text-gray-400'>Updated: { application.created_at.split('T')[0] }</p>
            </div>
        </Link>
    )
}