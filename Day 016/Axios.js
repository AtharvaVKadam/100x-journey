import axios from "axios";

const getBalanceAxios = async () => {
    try {
        const response = await axios.get("https://api.yourpaytm.com/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });

        console.log(response.data.balance);
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
    }
};