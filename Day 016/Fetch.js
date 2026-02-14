
const getBalanceFetch = async () => {
    try {
        const response = await fetch("https://api.yourpaytm.com/account/balance", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.balance);
    } catch (error) {
        console.error("Fetch Error:", error);
    }
};