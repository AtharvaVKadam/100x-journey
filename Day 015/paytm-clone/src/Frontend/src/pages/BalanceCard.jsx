export const BalanceCard = ({ value }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-xl text-white transform transition duration-500 hover:scale-105">
            <div className="flex flex-col space-y-2">
                <span className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                    Total Balance
                </span>
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold">₹</span>
                    <span className="text-5xl font-extrabold tracking-tight">
                        {value.toLocaleString()}
                    </span>
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition">
                    + Add Money
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition">
                    History
                </button>
            </div>
        </div>
    );
};