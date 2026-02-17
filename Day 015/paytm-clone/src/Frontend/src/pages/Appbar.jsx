export const Appbar = () => {
    return <div className="shadow h-14 flex justify-between bg-white items-center px-4">
        <div className="flex flex-col justify-center h-full ml-4 text-xl font-bold text-gray-800">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-gray-600 font-medium">
                Hello
            </div>
            <div className="rounded-full h-10 w-10 bg-gray-200 flex justify-center mt-1 mr-2 border border-gray-300">
                <div className="flex flex-col justify-center h-full text-xl text-gray-600">
                    U
                </div>
            </div>
        </div>
    </div>
}