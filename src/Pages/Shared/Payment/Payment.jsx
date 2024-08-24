import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckForm from "./CheckForm";
import './payment.css'
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const contest = useLoaderData();

    return (
        <div>
        <div className="pb-16"></div>
            <div className="bg-blue-700 pb-12 payment">
            {/* <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle> */}
            <div><h3 className="text-center text-2xl font-bold text-black">Contest's Prize :<span className="text-red-800"> {contest.price}</span> tk</h3></div>
            <div>
                <h4 className="translate-x-40 text-orange-700 text-xl font-semibold.">You have to pay {contest.price} tk to attend the contest. </h4>
                <h4 className="translate-x-40 text-white font-semibold text-xl">Please, pay <span className="text-black">on</span> stripe</h4>
                </div>

            <motion.div className="pt-32 w-1/2 text-center translate-x-64  opacity-90 shadow-2xl rounded-lg shadow-slate-400 bg-slate-950  translate-y-16 mb-24 scroll-mb-24"
                initial={{ x : '-100vw' }}
                animate={{ x : '20vw' , }}
                transition={{ delay : .5, type : 'spring' , stiffness : 150, duration : 5}}
            >
                <Elements stripe={stripePromise}>
                    <CheckForm contest={contest}></CheckForm>
                </Elements>
            </motion.div>
        </div>
        </div>
    ); 
};

export default Payment;