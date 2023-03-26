import { useEffect, useState } from "react"
import styled from "styled-components"
import { getProducts, massDelete } from "../api/productsApi"
import { useNavigate } from "react-router-dom"
import loadingImg from "../img/Pulse.gif"

export function Products() {

    const navigate = useNavigate();
    const [products, setProducts] = useState();
    let selectedProducts = []
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getProducts()
            .then(ans => {
                setProducts(ans)})
            .catch(ans => console.log(ans))
    }, [refresh])

    function select(id) {
        if (selectedProducts.includes(id)) {
            selectedProducts.splice(selectedProducts.indexOf(id), 1)
        } else {
            selectedProducts.push(id)
        }
    }

    function deleteProducts() {
        setProducts()
        massDelete(selectedProducts)
            .then(ans => {
                setRefresh(!refresh)
                selectedProducts = []})
            .catch(ans => {
                selectedProducts = []
                alert("It was not possible to delete items")})
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
                                <input type="checkbox" className="delete-checkbox" onClick={() => select(prod.id)}></input>
                            </form>
                            <span>{prod.sku}</span>
                            <span>{prod.name}</span>
                            <span>{prod.price},00 $</span>
                            <span>{prod.attribute}: {prod.value}</span>
                        </div>
                    )) 
                }
            </Container>}
            <Footer>
                <span>Scandiweb test assignment</span>
            </Footer>
        </>
    )
}

export const Header = styled.div`
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
    padding-top: 60px;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    width: 1250px;
    height: 130px;
    border-bottom: 2px black solid;
    padding-left: 20px;
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
    background-color: white;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 50px;
    width: 1250px;
    div{
        font-size: 18px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 15px;
        width: 280px;
        height: 220px;
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
    span{
        margin: 3px;
    }
    
`

export const Footer = styled.footer`
    font-size: 18px;
    display: flex;
    justify-content: center;
    background-color: white;
    align-items: center;
    height: 60px;
    width: 1250px;
    position: fixed;
    bottom: 0px;
    border-top: solid black 2px; 
`
