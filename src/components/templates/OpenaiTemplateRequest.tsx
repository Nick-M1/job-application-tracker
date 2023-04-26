import React, {useState} from "react";

const OPENAI_URL = 'https://api.openai.com/v1/completions'

async function sendRequest(openaiKey: string, prompt: string) {
    return fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
            prompt: `Complete this sentence: "${prompt}"`,
            model: 'gpt-3.5-turbo',
            max_tokens: 2_000,
            n: 1,
            stop: ".",
        }),
    })
}

function openaiTemplatePromptGenerator(jobtitle: string, companyname: string, extradetails: string, templatetype: string) {
    return (
        `Can you create an extended ${templatetype}, for the job title of ${jobtitle} and the company of ${companyname}. Can you also include the following information: "${extradetails}"`
    )
}

const mockOpenaiTemplate = `Dear Hiring Manager,

I am excited to submit my application for the finance role at your esteemed organization. With a strong academic background and relevant experience in the finance sector, I believe that I am the perfect candidate for the role.

As a recent graduate in finance, I have developed a deep understanding of financial analysis, accounting, and investment management. During my internships at XYZ Company, I gained hands-on experience in financial modeling, budgeting, and forecasting. These experiences have equipped me with the necessary skills to provide accurate financial analysis and strategic guidance to your organization.

In addition to my academic and professional experience, I possess excellent analytical and problem-solving skills. I am a quick learner and can adapt to new technologies and work environments. I have strong communication and interpersonal skills, which enable me to work effectively with clients and colleagues.

I am confident that my experience and skill set make me an ideal candidate for this role. I am excited about the opportunity to contribute my expertise to your organization, and I look forward to discussing how I can contribute to your team.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
[Your Name]`

type Props = {
    openaiKey: string
}

export default function OpenaiTemplateRequest({ openaiKey }: Props) {
    const [openaiResponse, setOpenaiResponse] = useState<string | null>(null)

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()


        const jobtitle: string = e.currentTarget.jobtitle.value
        const companyname: string = e.currentTarget.companyname.value
        const extradetails: string = e.currentTarget.extradetails.value
        const templatetype: string = e.currentTarget.templatetype.value

        if (jobtitle == '' || companyname == '' || templatetype == '')
            return

        const prompt = openaiTemplatePromptGenerator(jobtitle, companyname, extradetails, templatetype)
        const response = await sendRequest(openaiKey, prompt)//.then(r => r.json())

        if (!response.ok) {
            //todo: display error

            setOpenaiResponse(mockOpenaiTemplate)
            return
        }

        const responseJson = await response.json()
        setOpenaiResponse(responseJson.data.choices[0].text)
    }

    return (
        <div className='text-center py-8 px-3'>
            <h3 className='text-3xl font-bold font-montserrat-bold text-white'>Generate Dynamic Templates</h3>
            <h4 className='font-semibold mb-12'>using OpenAI</h4>

            { openaiResponse === null ? (
                <form onSubmit={onSubmitHandler} className='flex flex-col justify-center'>
                    <label htmlFor='jobtitle' className='text-left max-w-md mx-auto text-lg'>Job Title:</label>
                    <input type='text' name='jobtitle' id='jobtitle' placeholder='E.g. Accountant...' className='input-primary-valid max-w-md mx-auto mb-8 '/>

                    <label htmlFor='companyname' className='text-left max-w-md mx-auto text-lg'>Company Name and Industry:</label>
                    <input type='text' name='companyname' id='companyname' placeholder='E.g. Google - Software & technology' className='input-primary-valid max-w-md mx-auto mb-8 '/>

                    <label htmlFor='extradetails' className='text-left max-w-md mx-auto text-lg'>Extra Details:</label>
                    <textarea name='extradetails' id='extradetails' placeholder='E.g. Your experience/CV and why this company...' className='input-primary-valid max-w-md mx-auto mb-8 '/>

                    <label htmlFor='templatetype' className='text-left max-w-md mx-auto text-lg'>Template Type:</label>
                    <select name='templatetype' id='templatetype' className='input-primary-valid max-w-md mx-auto mb-8'>
                        <option value='cv' className='text-gray-600'>CV</option>
                        <option value='cover letter' className='text-gray-600'>Cover Letter</option>
                        <option value='application email' className='text-gray-600'>Application Email</option>
                    </select>

                    <button type='submit' className='button-teal px-9 max-w-md mx-auto'>GENERATE TEMPLATE</button>
                </form>
            ) : (
                <div className='bg-white/10 p-3 sm:m-1 rounded-lg shadow-2xl drop-shadow-2xl'>
                    <p className='whitespace-pre-wrap text-left'>{ openaiResponse }</p>
                </div>
            )}

        </div>
    )
}