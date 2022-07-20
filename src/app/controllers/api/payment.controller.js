import axios from "axios"
import createHttpError from "http-errors"
import paymentModel from "../../models/payments.js"
import userModel from "../../models/users.js"
import createRandomNumber from "../../utils/randomNumber.js"

class paymentController {
    async paymentGateway (req , res , next) {
        try {
            const user = req.user
            if(user.basket.totalPrice <= 0) throw createHttpError.BadRequest('user basket is empty')
    
            const zarinpallRequestURL = 'https://api.zarinpal.com/pg/v4/payment/request.json'
            const zarinpallGatewayURL = 'https://www.zarinpal.com/pg/StartPay/'

            const zarinpallData = {
                merchant_id : process.env.ZARINPAL_MERCHANTID,
                amount : user.basket.totalPrice * 10,
                description : 'خرید محصولات و دوره ها',
                callback_url : 'http://localhost:4000/verify',
                metadata : {
                    mobile : user.mobile,
                    email : user.email || 'example@domain.com'
                }
            }

            const {data} = await axios.post(zarinpallRequestURL , zarinpallData)
            
            const {authority , code} = data

            if(code === 100 && authority) {

                const invoiceNumber = new Date().getTime() + '' + createRandomNumber()
                const payment = await paymentModel.create({
                    invoiceNumber,
                    authority,
                    basket : user.basket,
                    amount : user.basket.totalPrice
                })
                const updateUserBills = await userModel.updateOne({_id : user._id} , {$push : {bills : payment._id}})

                return res.send({
                    code : data.code ,
                    gatewayURL : `${zarinpallGatewayURL}${authority}`
                })
            }
            throw createHttpError.BadRequest('zarinpal data is not true')
        } catch (error) {
            next(error)
        }
    }
    async paymentVerify(req , res , next) {
        try {
            const {Authority : authority} = req.query
            const user = req.user

            const zarinpalVerifyURL = 'https://api.zarinpal.com/pg/v4/payment/verify.json'

            const payment = await paymentModel.findOne({$and : [{$in : {_id : user.bills}} , {authority , verify : false}]})
            if(!payment) throw createHttpError.NotFound('payment not found')

            const {data : responseResult} = await axios.post(zarinpalVerifyURL , {authority , amount : payment.amount , merchant_id : process.env.ZARINPAL_MERCHANTID})
            const {data , error} = responseResult

            if(data.code === 100) {
                payment.verify = true
                payment.refId = data.ref_id
                payment.cartHash = data.cart_hash
                await payment.save()
                const basketProducts = user.basket.products.map(item => item.productId)
                const basketCourses = user.basket.courses.map(item => item.courses)

                const addBasketItemsToUserProfile = await userModel.updateOne(
                    {_id : user._id} , 
                    {
                        $push : {products : {$each : basketProducts} , courses : {$each : basketCourses}} , 
                        $set : {'basket.totalPrice' : 0 , 'basket.products' : [] , 'basket.courses' : []}
                    }
                )

                return res.status(httpStatus.OK).send({
                    status : httpStatus.OK,
                    message : 'payment completed successfully',
                    data : {
                        payment
                    }
                })
            }

        } catch (error) {
            next(error)
        }
    }
}

export default new paymentController()