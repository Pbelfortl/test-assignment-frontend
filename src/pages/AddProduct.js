import { Header, Container } from "./Products"
import { addProduct } from "../api/productsApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import styled from "styled-components";

export function AddProduct() {
    const navigate = useNavigate();
    const [sku, setSku] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState("1");
    const [attValue, setAttValue] = useState();

    async function add() {
        let prod
        await addProduct(prod)
            .then()
    }

    return (
        <>
            <Header>
                <span>Product add</span>
                <div>
                    <button onClick={() => add()}>Save</button>
                    <button onClick={() => navigate("/")}>Cancel</button>
                </div>
            </Header>
            <Form id="product_form">
                <div>
                    <label for="sku">SKU</label>
                    <input id="sku" placeholder="SKU" required/>
                </div>
                <div>
                    <label for="Name">Name</label>
                    <input id="name" placeholder="Name" />
                </div>
                <div>
                    <label for="price">Price ($)</label>
                    <input id="price" placeholder="Price" />
                </div>
                <div>
                    <label for="productType">Type switcher</label>
                    <select id="productType" onChange={e => setType(e.target.value)}>
                        <option value="1">DVD-disc</option>
                        <option value="2">Book</option>
                        <option value="3">Furniture</option>
                    </select>
                </div>
            </Form>
            {(type === "1") &&
                <Form>
                    <div>
                        <label for="size">Size (MB)</label>
                        <input id="size" placeholder="Size" />
                    </div>
                </Form>
            }
            {(type === "2") &&
                <Form>
                    <div>
                        <label for="weight">weight (KG)</label>
                        <input id="weight" placeholder="weight" />
                    </div>
                </Form>
            }
            {(type === "3") &&
                <Form>
                    <div>
                        <label for="height">Height (CM)</label>
                        <input id="height" placeholder="height" />
                    </div>
                    <div>
                        <label for="width">Width (CM)</label>
                        <input id="width" placeholder="width" />
                    </div>
                    <div>
                        <label for="length">Length (CM)</label>
                        <input id="length" placeholder="length" />
                    </div>
                    <span>Please, provide dimensions in HxWxL format.</span>
                </Form>
            }
        </>
    )
}

const Form = styled.form`
    width: 40vw;
    background-color: white;
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 20px;
    input{
        width: 300px;
        height: 30px;
        outline: none;
        border: 2px solid black;
        border-radius: 5px;
    }
    select{
        width: 200px;
        height: 30px;
        outline: none;
        margin-top: 20px;
        margin-right: 30px;
        border: 2px solid black;
        border-radius: 5px;
    }
    div{
        margin-bottom: 30px;
        display: flex;
        width: inherit;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }
`