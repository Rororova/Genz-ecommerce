import { CheckCircle } from 'lucide-react';

interface OrderConfirmationProps {
    onHome: () => void;
}

export default function OrderConfirmation({ onHome }: OrderConfirmationProps) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Received!</h1>

            <p className="text-xl text-gray-600 mb-8 max-w-md">
                We will reach out to you for payments soon. Thank you for choosing Cuck Chair Architect Company.
            </p>

            <button
                onClick={onHome}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
                Back to Home
            </button>
        </div>
    );
}
