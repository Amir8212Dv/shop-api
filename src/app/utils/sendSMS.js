import TrezSmsClient from "trez-sms-client"

const sendMessage = (mobile , code) => {
	const client = new TrezSmsClient("09142305242", "7073920");

	client.manualSendCode('09147349199', `Verification Code: ${code} \nSHOP API`)
    .then((messageId) => {
        console.log("Sent Message ID: " + messageId);
    })
    .catch(error => console.log(error));
}




export default sendMessage