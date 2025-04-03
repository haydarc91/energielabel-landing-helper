
/**
 * Sends submission data to an external webhook
 */
export const sendWebhook = async (submissionData: any) => {
  try {
    const webhookUrl = 'https://hook.eu2.make.com/y65lrc33vukmnh9eewt8r6b3p4ppw2rq';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });
    
    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending webhook:', error);
    return false;
  }
};
