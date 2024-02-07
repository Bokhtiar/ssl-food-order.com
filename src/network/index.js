import * as Category from "../network/category.network";
import * as Authentication from "../network/auth.network";

// user
import * as UserAuth from '../network/user/auth.network'
import * as UserFloor from '../network/user/floor.network'
import * as UserProduct from '../network/user/product.network'
import * as UserCategory from '../network/user/category.network'
import * as UserDesignation from '../network/user/designation.network'

export const NetworkServices = {
    Category,
    UserAuth,
    UserFloor,
    UserCategory,
    UserProduct,
    Authentication,
    UserDesignation,
};
