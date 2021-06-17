const orderService = require('../services/order.service');
const menuService = require('../services/menu.service')
const { random } = require('../utils/random')
const appResponse = require('../../lib/appResponse');
const { BadRequestError } = require("../../lib/appError");
class orderController {
    makeOrder = async (req, res) => {
        const { orderItems } = req.body
        const orderItemsObj = {}
        let sum = 0

        const orderId = random(8)

        orderItems.forEach(item => {
            orderItemsObj[item.menu] = item.quantity
        });

        const menuIds = Object.keys(orderItemsObj)

        const menus = await menuService.find({
            '_id': { $in: menuIds }
        })


        menus.docs.forEach(menu => {

            let price = parseFloat(menu.price)
            let quantity = parseFloat(orderItemsObj[menu._id])

            if (menu.discount === 0) {
                sum += orderService.calculateSum(price, quantity)
                menu.noOfOrder += quantity
            }
            else {
                const discountedPrice = orderService.calculateDiscount(menu.discount, price)
                sum += orderService.calculateSum(discountedPrice, quantity)
                menu.noOfOrder += quantity
            }
        })
        if (!sum) throw new BadRequestError("somethidng went wrong, could not compute sum")

        const subTotal = sum
        const total = subTotal + Number(req.body.shippingFee)
        const user = req.user._id

        //check if the total gotten from flutterwave transaction matches the sum
        if (req.transDetails.amount !== total) {
            throw new BadRequestError("invalid transaction could not make order")
        }

        const order = await orderService.makeOrder({ ...req.body, user, orderId, subTotal, total })
        res.send(appResponse("order created successfully", order))

        orderService.updateNoOfOrders(menus);

    }

    getAll = async (req, res) => {
        const orders = await orderService.find(req.query);
        res.send(appResponse("All orders", orders))
    }

    updateOrder = async (req, res) => {
        const order = await orderService.updateOrder(req.query.id, req.body)
        res.send(appResponse("Orders updated successfully", order))
    }

    deleteOrder = async (req, res) => {
        const order = await orderService.deleteOrder(req.query.id)
        res.send(appResponse("Orders deleted successfully", order))
    }
}

module.exports = new orderController()
