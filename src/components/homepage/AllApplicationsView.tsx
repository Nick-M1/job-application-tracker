import {AppliactionDataLoaderReturnType} from "../../routes/HomePageRoute";
import ApplicationListItem from "./ApplicationListItem";
import {Await, Link, useSearchParams} from "react-router-dom";
import PlusIcon from "../../icons/PlusIcon";
import React from "react";
import MagnifyingGlassIcon from "../../icons/MagnifyingGlassIcon";
import Dropdown from "../shared/Dropdown";
import {SortOptions} from "../../constants/sort-constants";

type Props = {
    applicationAndCompanyData: AppliactionDataLoaderReturnType
}



export default function AllApplicationsPage({ applicationAndCompanyData }: Props) {
    const [searchParams, setSearchParams] = useSearchParams()

    function handleQueryChange(key: string, value: string) {
        setSearchParams(prevParams => {
            if (value === null)
                prevParams.delete(key)
            else
                prevParams.set(key, value)

            return prevParams
        })
    }

    return (
        <div className='px-3 md:px-12'>
            <div className='flex justify-between py-6 items-center'>
                <h2 className='text-gray-100 text-3xl font-bold font-montserrat-bold'>Your Applications</h2>
                <Link to='/newapplication' className='btn-primary flex items-center px-4'>
                    <PlusIcon className='w-5 h-5 mr-2'/> New Application
                </Link>
            </div>

            <div className='flex justify-between py-6 items-center'>
                {/* SEARCH BAR */}
                <div className="group flex items-center justify-center p-3 text-black bg-white/10 backdrop-filter shadow-xl drop-shadow-xl rounded-xl outline outline-neutral-600 hover:ring-4 hover:ring-teal-500 smooth-transition">
                    <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                    <input
                        className="flex-1 ml-3 text-white placeholder-gray-400 bg-transparent border-none outline-none"
                        placeholder="Search applications"
                        type="text"
                        value={searchParams.get('text') || ''}
                        onChange={e => handleQueryChange('text', e.target.value)}
                    />
                </div>

                {/* FILTER */}
                <Dropdown
                    title='Sort by'
                    activeOption={searchParams.get('sort') || ''}
                    options={[
                        { text: 'Company Name (ascending)', href: SortOptions.COMPANYNAME_ASC, action: () => handleQueryChange('sort', SortOptions.COMPANYNAME_ASC) },
                        { text: 'Company Name (descending)', href: SortOptions.COMPANYNAME_DSC, action: () => handleQueryChange('sort', SortOptions.COMPANYNAME_DSC) },

                        { text: 'Job Title (ascending)', href: SortOptions.JOBNAME_ASC, action: () => handleQueryChange('sort', SortOptions.JOBNAME_ASC) },
                        { text: 'Job Title (descending)', href: SortOptions.JOBNAME_DSC, action: () => handleQueryChange('sort', SortOptions.JOBNAME_DSC) },
                        { text: 'Most recent', href: SortOptions.MOSTRECENT, action: () => handleQueryChange('sort', SortOptions.MOSTRECENT) },
                        { text: 'Oldest', href: SortOptions.OLDEST, action: () => handleQueryChange('sort', SortOptions.OLDEST) },
                    ]}
                />
            </div>

            <div className='grid grid-cols-1 gap-2'>
                { applicationAndCompanyData.applicationData.map((application, index) =>
                    <ApplicationListItem key={application.application_id} application={application} companyimage={applicationAndCompanyData.companyimages[index]}/>
                )}
            </div>
        </div>
    );
}