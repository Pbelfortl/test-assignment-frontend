import { Header, Footer, Container } from "./Products"
import { addProduct } from "../api/productsApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import styled from "styled-components";

export function AddProduct() {
    const navigate = useNavigate();
    const [sku, setSku] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState("2");
    const [attValue, setAttValue] = useState();
    const [height, setHeight] = useState()
    const [width, setWidth] = useState();
    const [length, setLength] = useState();

    async function add(e) {
        e.preventDefault()
        let prod = {
            sku: sku.toUpperCase(),
            name: name,
            price: parseInt(price),
            attributeId: parseInt(type),
            attributeValue: attValue,
        }
        await addProduct(prod)
            .then(ans => navigate("/"))
            .catch(ans => {
                console.log(ans)
                alert("Error adding product")
            })
    }

    return (
        <>
            <Header>
                <span>Product add</span>
                <div>
                    <button type="submit" form="product_form">Save</button>
                    <button onClick={() => navigate("/")}>Cancel</button>
                </div>
            </Header>
            {
                <Form onSubmit={event => add(event)} id="product_form">
                    <div>
                        <label htmlFor="sku">SKU</label>
                        <input id="sku" placeholder="SKU" required onChange={e => setSku(e.target.value)} maxLength="9" />
                    </div>
                    <div>
                        <label htmlFor="Name">Name</label>
                        <input id="name" placeholder="Name" required onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="price">Price ($)</label>
                        <input type="number" id="price" placeholder="Price" required onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="productType">Type switcher</label>
                        <select id="productType" onClick={e => setType(e.target.value)}>
                            <option value="2">Book</option>
                            <option value="1">DVD</option>
                            <option value="3" >Furniture</option>
                        </select>
                    </div>
                    {(type === "1") &&
                        <>
                            <div>
                                <label htmlFor="size">Size (MB)</label>
                                <input type="number" id="size" placeholder="Size" required onChange={e => setAttValue(`${e.target.value} MB`)} />
                            </div>
                            <span>Please, provide size in Mb.</span>
                        </>
                    }
                    {(type === "2") &&
                        <>
                            <div>
                                <label htmlFor="weight">weight (KG)</label>
                                <input type="number" id="weight" placeholder="weight" required onChange={e => setAttValue(`${e.target.value}KG`)} />
                            </div>
                            <span>Please, provide weight in Kg.</span>
                        </>
                    }
                    {(type === "3") &&
                        <>
                            <div>
                                <label htmlFor="height">Height (CM)</label>
                                <input type="number" id="height" placeholder="height" required onChange={
                                    e => {
                                        setHeight(e.target.value)
                                        setAttValue(`${e.target.value}x${width}x${length}`)
                                    }} />
                            </div>
                            <div>
                                <label htmlFor="width">Width (CM)</label>
                                <input type="number" id="width" placeholder="width" required onChange={
                                    e => {
                                        setWidth(e.target.value)
                                        setAttValue(`${height}x${e.target.value}x${length}`)
                                    }} />
                            </div>
                            <div>
                                <label htmlFor="length">Length (CM)</label>
                                <input type="number" id="length" placeholder="length" required onChange={
                                    e => {
                                        setLength(e.target.value)
                                        setAttValue(`${height}x${width}x${e.target.value}`)
                                    }} />
                            </div>
                            <span>Please, provide dimensions in HxWxL format.</span>
                        </>
                    }
                </Form>}
            <Footer>
                <span>Scandiweb test assignment</span>
            </Footer>
        </>
    )
}

const Form = styled.form`
    display: ${props => props.loading ? 'none' : 'show'};
    width: 600px;
    font-weight: 600;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background-color: white;
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 20px;
    border: solid 1px lightgray;
    border-radius: 4px;
    padding: 20px;
    input{
        font-size: 16px;
        box-sizing: border-box;
        width: 300px;
        height: 40px;
        outline: none;
        border: 2px solid black;
        border-radius: 5px;
        background-color: whitesmoke;
        padding: 10px;
    }
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    select{
        width: 200px;
        height: 40px;
        outline: none;
        margin-top: 20px;
        margin-right: 30px;
        border: 2px solid black;
        border-radius: 5px;
        padding-left: 10px;
    }
    div{
        margin: 20px;
        display: flex;
        width: inherit;
        align-items: center;
        align-content: center;
        justify-content: space-between;
    }
`