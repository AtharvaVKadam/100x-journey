const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../../Database/db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const amount = req.body.amount;
    const receiver = req.body.to;

    const senderAccount = await Account.findOne({userId : req.userId}) 

    if(senderAccount.balance < amount ){
        return res.status(400).json({
            mssg : "Insufficient balance"
        })
    }

    const receiverAccount = await Account.findOne({userId : receiver})

    if(!receiverAccount){
        return res.status(400).json({
            mssg : "No account found"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });

    await Account.updateOne({ userId: receiver }, { $inc: { balance: amount } });

    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;