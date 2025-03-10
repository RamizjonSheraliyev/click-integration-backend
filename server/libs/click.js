const md5 = require('md5')

const clickCheckToken = (data, sign_string) => {
	const { click_trans_id, service_id, orderId, amount, action, sign_time, merchant_prepare_id } = data
	const CLICK_SECRET_KEY = process.env.CLICK_SECRET_KEY
	const prepareId = merchant_prepare_id || ''
	const signature = `${click_trans_id}${service_id}${CLICK_SECRET_KEY}${orderId}${prepareId}${amount}${action}${sign_time}`
	const signatureMd5 = md5(signature)
	return signatureMd5 === sign_string
}

module.exports = clickCheckToken
