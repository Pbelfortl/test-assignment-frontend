import axios from "axios";

const baseUrl = "https://test-assignment-pablo.000webhostapp.com/products"

export async function getProducts () {
    const response = await axios.get(`${baseUrl}`)
    return response.data
}

export async function massDelete (productIds) {
    const response = await axios.delete(`${baseUrl}`, productIds)
    return response.data
}

export async function addProduct (body) {
    const response = await axios.post(`${baseUrl}`, body)
    return response.data
}