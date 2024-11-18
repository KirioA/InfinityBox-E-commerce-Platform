// hooks/useSendFeedback.ts
import { useState } from 'react';

interface FeedbackData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const useSendFeedback = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const sendFeedback = async (data: FeedbackData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('/api/feedback', { // Укажите ваш URL API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке сообщения. Попробуйте позже.');
            }

            const result = await response.json();
            setSuccess('Сообщение отправлено успешно!');
            return result;
        } catch (err: any) {
            setError(err.message || 'Произошла ошибка при отправке. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    return { sendFeedback, loading, error, success };
};

export default useSendFeedback;
