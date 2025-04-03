
/**
 * Sends submission data to an external webhook
 */
export const sendWebhook = async (submissionData: any): Promise<boolean> => {
  try {
    const webhookUrl = 'https://hook.eu2.make.com/y65lrc33vukmnh9eewt8r6b3p4ppw2rq';
    
    console.log('Sending data to webhook:', submissionData);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });
    
    if (!response.ok) {
      console.error(`Webhook error: ${response.status}`, await response.text());
      throw new Error(`Webhook error: ${response.status}`);
    }
    
    console.log('Webhook sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending webhook:', error);
    return false;
  }
};
