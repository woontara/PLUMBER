export const requestPayment = (job, onComplete) => {
    if (!window.IMP) return;

    // Initialize PortOne with Test Merchant ID
    const { IMP } = window;
    IMP.init('imp00000000'); // Standard Test ID

    const data = {
        pg: 'html5_inicis', // PG Provider
        pay_method: 'card', // Payment Method
        merchant_uid: `mid_${new Date().getTime()}`, // Order ID
        name: `Plumbing Service: ${job.description.substring(0, 15)}...`,
        amount: 1, // 1 KRW as requested for testing
        buyer_name: 'Hong Gil-dong',
        buyer_tel: '010-1234-5678',
        buyer_email: 'test@example.com',
        buyer_addr: job.location,
        buyer_postcode: '123-456',
    };

    IMP.request_pay(data, (response) => {
        if (response.success) {
            console.log('Payment Success:', response);
            onComplete(true, response);
        } else {
            console.error('Payment Failed:', response);
            alert(`Payment Failed: ${response.error_msg}`);
            onComplete(false, response);
        }
    });
};
