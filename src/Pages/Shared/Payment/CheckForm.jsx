import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const CheckForm = ({contest}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    
    const navigate = useNavigate();

    const totalPrice = contest.price;
    const [isPaid, setIsPaid] = useState(false);
    

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosPublic, totalPrice])
    

    console.log(isPaid);

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    contestName:contest.name,
                    status: 'pending'
                }



                
                const res = await axiosPublic.post('/payments', payment);

                console.log('payment saved', res.data);
                
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      axiosPublic.get(`/payments?name=${contest.name}`)
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching contest:', error);
                        });

                        
                        const fetchPaidContests = async () => {
                            try {
                                const response = await axiosPublic.get('/payments');
                                const paidContests = response.data;
                
                                paidContests.forEach(paidContest => {
                                    if (paidContest.email === user.email && paidContest.contestName === contest.name) {
                                        setIsPaid(true);
                                    }
                                });
                            } catch (error) {
                                console.error('Error fetching payments:', error);
                            }
                        };
                
                        fetchPaidContests();
                    }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}
        className="relative shadow-white">
            {
                (isPaid)?
                    <div><h3 className="text-green-900 text-2xl font-semibold text-center mb-12">Paid</h3></div>
                    :
                    <CardElement
                    className="pb-10 mb-10 p"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#FFFF00',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
            />
            }
            {
                (isPaid)?
                    <Link to={`/submitted/${contest._id}`}><button>Go to contest</button></Link>
                    :
                    <button className="text-xl px-6 absolute -top-2 mt-2 " type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
            }
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckForm;