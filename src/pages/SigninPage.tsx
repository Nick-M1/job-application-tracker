import GoogleIcon from "../icons/GoogleIcon";
import ClosedLockIcon from "../icons/ClosedLockIcon";
import {Provider} from "@supabase/supabase-js";
import {supabase} from "../supabase_init";
import {LOGO_IMG} from "../constants/assets-constants";
import FacebookIcon from "../icons/FacebookIcon";


async function signInProviderHandler(provider: Provider) {
    await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: import.meta.env.VITE_HOSTURL!
        }
    })
}

export default function SigninPage() {

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-800 h-screen w-screen">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-24 w-auto"
                        src={LOGO_IMG}
                        alt="Website logo"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-200">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Not registered?{' '}
                        <a href="/createaccount" className="font-medium text-blue-600 hover:text-blue-400 smooth-transition">
                            Create an account
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md px-3 py-2 focus:z-10 hover:z-10 sm:text-sm input-primary-valid"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md px-3 py-2 focus:z-10 hover:z-10 sm:text-sm input-primary-valid"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center ">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 accent-cyan-600 group-hover:accent-cyan-700 group-hover:active:accent-cyan-700 text-indigo-600 focus:ring-indigo-500 smooth-transition"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-400 smooth-transition">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn-primary btn-bouncy group relative flex w-full justify-center py-2 px-4"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <ClosedLockIcon className="h-5 w-5 text-blue-900 group-hover:text-blue-300 smooth-transition" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="space-y-8">
                    <div className="flex items-center text-center before:content-[''] before:flex-1 before:border-b-2 before:mr-2 after:content-[''] after:flex-1 after:border-b-2 after:ml-2 text-xs font-semibold tracking-wide text-gray-400 ">
                        OR
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <button onClick={() => signInProviderHandler('google')} className="btn-primary btn-bouncy flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-800">
                            <GoogleIcon className="mr-2 w-5 h-5" />
                            <span className="sr-only">Continue with</span> Google
                        </button>
                        <button onClick={() => signInProviderHandler('facebook')} className="bg-black hover:bg-gray-700 flex justify-center items-center btn-bouncy btn-primary hover:ring-slate-700 focus:ring-slate-700 border-gray-700">
                            <FacebookIcon className="mr-2 w-6 h-6" />
                            <span className="sr-only">Continue with</span> Facebook
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}