import FileUploadComp from "@/components/FileUploadComp";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/clerk-react"
import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function FileUploadPage() {
    const { isSignedIn } = useAuth();

    return (
        <div className="mx-auto w-[80vw] md:w-[94vw] rounded-md h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800 overflow-x-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[10%]">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center">
                        <h1 className="mr-3 text-3xl md:text-5xl font-semibold">
                            Upload a PDF
                        </h1>
                        <UserButton afterSignOutUrl="/file-upload" />
                    </div>
                    <div className="flex mt-2">
                        {isSignedIn &&
                            <Button>
                                Go to chat.
                            </Button>
                        }
                    </div>
                    <div className="w-full mt-4">
                        {isSignedIn ?
                            <FileUploadComp />
                            :
                            <Link to="/sign-in">
                                <Button>
                                    Login to upload a file.
                                    <LogInIcon className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


