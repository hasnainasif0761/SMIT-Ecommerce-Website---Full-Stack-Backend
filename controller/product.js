const ProductModel = require('../models/Product');


const createProduct = async (req, res) => {

    try {

        const {
            name,
            price,
            delPrice,
            rating,
            img,
            description,
            size,
            colors
        } = req.body;


        // Required fields
        if (!name || !price || !img) {

            return res.status(400).json({
                message: "Please fill all required fields"
            });

        }


        /*
            colors ko array mein convert karna

            Agar multiple colors aaye:
            ["#000000", "#ffffff"]

            Agar sirf 1 color aaye:
            "#000000"

            Dono situations handle hongi.
        */

        let productColors = [];

        if (Array.isArray(colors)) {

            productColors = colors;

        } else if (colors) {

            productColors = [colors];

        }


        // Product create
        const product = await ProductModel.create({

            name,

            price,

            delPrice,

            rating,

            img,

            description,

            size,

            colors: productColors

        });


        return res.status(201).json({

            message: "Product Created Successfully",

            productData: product

        });


    } catch (error) {

        console.log("Create Product Error:", error);

        return res.status(500).json({

            message: "Something went wrong",

            error: error.message

        });

    }
};



const getData = async (req, res) => {

    try {

        const product = await ProductModel.find();


        return res.status(200).json({

            message: "Product fetch successfully",

            product

        });


    } catch (error) {

        console.log("Get Product Error:", error);

        return res.status(500).json({

            message: "Something went wrong",

            error: error.message

        });

    }

};

const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            price,
            delPrice,
            rating,
            img,
            description,
            size,
            colors
        } = req.body;


        // Colors ko array mein convert karna
        let productColors = [];

        if (Array.isArray(colors)) {

            productColors = colors;

        } else if (colors) {

            productColors = [colors];

        }


        // Product update
        const updatedProduct = await ProductModel.findByIdAndUpdate(

            id,

            {
                name,
                price,
                delPrice,
                rating,
                img,
                description,
                size,
                colors: productColors
            },

            {
                new: true,
                runValidators: true
            }

        );


        // Product nahi mila
        if (!updatedProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        return res.status(200).json({

            message: "Product updated successfully",

            product: updatedProduct

        });


    } catch (error) {

        console.log("Update Product Error:", error);

        return res.status(500).json({

            message: "Something went wrong",

            error: error.message

        });

    }

};



const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;


        const deletedProduct =
            await ProductModel.findByIdAndDelete(id);


        // Product nahi mila
        if (!deletedProduct) {

            return res.status(404).json({

                message: "Product not found"

            });

        }


        return res.status(200).json({

            message: "Product deleted successfully",

            product: deletedProduct

        });


    } catch (error) {

        console.log("Delete Product Error:", error);

        return res.status(500).json({

            message: "Something went wrong",

            error: error.message

        });

    }

};

module.exports = {
    createProduct,
    getData,
    updateProduct,
    deleteProduct
};