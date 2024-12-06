const express = require('express')
const Razorpay = require("razorpay");
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.route')
const { orgRouter } = require('./routes/org.route')
const { orgGatewaysRouter } = require('./routes/org-gateways.route');
const request = require('request');


const app = express()

app.use(express.json())
app.use(cors())

// app.use('/api/v1/user', userRouter)
// app.use('/api/v1/organizations', orgRouter)
// app.use('/api/v1/org-gateways', orgGatewaysRouter)


const razorpayInstance = new Razorpay({
    key_id: process.env.razorPayKeyId,
    key_secret: process.env.razorPayKeySecret,
})

app.post("/get-razorpay-script", async (req, res) => {
    console.log('code reached here')
    const { amount, currency, receiptId } = req.body;

    if (!amount || !currency || !receiptId) {
        return res.status(400).json({ error: "Missing required parameters." });
    }

    const createOrder = await razorpayInstance.orders.create({
        amount: amount,
        currency: currency,
        receipt: receiptId,
    })

    try {
        const razorpayScript = `
          const razorPayOptions = {
            key: "${razorpayInstance.key_id}",
            order_id: "${createOrder.id}",
            amount: ${amount},
            currency: "${currency}",
            name: "Hello Pay",
            description: "Test Transaction",
            image: "https://example.com/your_logo.png",
            handler: async function afterSubmit(response) {
                console.log('Payment Successful! Payment ID:', response.razorpay_payment_id);
                try {
                    const res = await fetch('http://localhost:3001/payment-success', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            response
                        }),
                    });

                    if (res.ok) {
                        const result = await res.json();
                        console.log('Payment details saved:', result);

                        // Redirect the user to the success page
                        window.location.href = "https://your-client-website.com/payment-success";
                    } else {
                        console.error('Failed to save payment details');
                    }
                } catch (error) {
                    console.error('Error saving payment details:', error);
                }
            },
            theme: {
              color: "#3399cc",
            },
          };
          const rzprt = new Razorpay(razorPayOptions);
            
          rzprt.open();
      `;

        res.status(200).json({
            script: razorpayScript,
            url: `https://checkout.razorpay.com/v1/checkout.js`
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Failed to create Razorpay order." });
    }
});


app.post("/payment-popup", async (req, res) => {
    console.log('code reached here')
    const { amount, currency, receiptId } = req.body;

    if (!amount || !currency || !receiptId) {
        return res.status(400).json({ error: "Missing required parameters." });
    }

    const createOrder = await razorpayInstance.orders.create({
        amount: amount,
        currency: currency,
        receipt: receiptId,
    })

    try {
        const razorPayOptions = {
            key: razorpayInstance.key_id,
            order_id: createOrder.id,
            amount: amount,
            currency: currency,
            name: "Hello Pay",
            description: "Test Transaction",
            image: "https://example.com/your_logo.png",
            theme: {
                color: "#3399cc",
            },
        }


        const handler = `async function handler(response) {
            console.log('Payment Successful! Payment ID:', response.razorpay_payment_id);
            try {
                const res = await fetch('http://localhost:3001/payment-success', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        response
                    }),
                });

                if (res.ok) {
                    const result = await res.json();
                    console.log('Payment details saved:', result);

                    // Redirect the user to the success page
                    window.location.href = "https://your-client-website.com/payment-success";
                } else {
                    console.error('Failed to save payment details');
                }
            } catch (error) {
                console.error('Error saving payment details:', error);
            }
        }`


        res.status(200).json({
            options: razorPayOptions,
            handler : handler
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Failed to create Razorpay order." });
    }
});


app.post('/get-razorpay-paymentLink', async (req, res) => {

    try {
        const data = await razorpayInstance.paymentLink.create({
            amount: 50000,
            currency: "INR",
            accept_partial: false,
            description: "Payment for your order #12345",
            customer: {
                name: "John Doe",
                contact: "+919599699999",
                email: "johndoe@example.com"
            },
            notify: {
                sms: true,
                email: true
            },
            callback_url: "http://localhost:3001/payment-success",
            callback_method: "get"
        })
        const response = await data

        console.log('result', response)

        res.status(200).json({
            url: response.short_url,
            success: true
        })

    } catch (error) {
        console.log('error', error)
    }
})


app.post('/payment-success', (req, res) => {
    console.log('code reached here')
    console.log('req.body', req.body)

    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        console.log('response', response)

        // Encode the username and password in base64
        const auth = 'Basic ' + Buffer.from(process.env.razorPayKeyId + ':' + process.env.razorPayKeySecret).toString('base64');

        const options = {
            'method': 'GET',
            'url': `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
            'headers': {
                'Authorization': auth
            }
        };

        request(options, function (error, res) {
            if (error) throw new Error(error);
            res.status(200).json({
                data: (JSON.parse(res.body))
            });
        });

    } catch (error) {
        console.log('error at payment-success', error)
    }
});


async function main() {
    await mongoose.connect(process.env.DATABASE_URL)

    app.listen(3001, () => {
        console.log('server is running at 3001')
    })
}

main()



