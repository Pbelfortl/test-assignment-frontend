import { useEffect, useState } from "react"
import styled from "styled-components"
import { getProducts, massDelete } from "../api/productsApi"
import { useNavigate } from "react-router-dom"

export function Products () {

    const navigate = useNavigate();
    const [products, setProducts] = useState();
    let selectedProducts = []
 
    useEffect(() => {
        getProducts()
            .then(ans => setProducts(ans))
            .catch(ans => console.log(ans))
    },[])

    function select (id) {
        if (selectedProducts.includes(id)){
            selectedProducts.splice(selectedProducts.indexOf(id), 1)
        } else {
            selectedProducts.push(id)
        }
        console.log(selectedProducts)
    }

    function deleteProducts (prods) {
        massDelete(selectedProducts)
            .then (ans => selectedProducts = [])
            .catch(ans => alert ("It was not possible to delete items"))
    }

    return (
        <>
        <Header>
            <span>Product List</span>
            <div>
                <button onClick={() => navigate("/add-product")}>ADD</button>
                <button onClick={() => deleteProducts(selectedProducts)}>MASS DELETE</button>
            </div>
        </Header>
        {<Container>
            {products &&
                products.map(prod => (                    
                    <div key={prod.id}>
                        <form>
                            <input type="checkbox" onClick={() => select(prod.id)}></input>
                        </form>
                        <span>{prod.sku}</span>
                        <span>{prod.name}</span>
                        <span>{prod.price},00$</span>
                        <span>{prod.attribute}: {prod.value} {prod.unit}</span>
                    </div>
                ))
            }
        </Container>}
        </>
    )
}

export const Header = styled.div`
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
    padding-top: 90px;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    width: 80vw;
    height: 150px;
    background-color: aqua;
    border-bottom: 2px black solid;
    button{
        height: 30px;
        font-size: large;
        font-family: 'Courier New', Courier, monospace;
        margin-right: 15px;
        :hover{
            cursor: pointer;
        }
    }
`
export const Container = styled.div`
    width: 80vw;
    background-color: white;
    display: flex;
    padding-top: 50px;
    div{
        font-size: 18px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 10px;
        width: 250px;
        height: 200px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: solid black 1px;
        background-color: whitesmoke;
        form{
            position: absolute;
            top: 10px;
            left: 10px;
        }
    }

`