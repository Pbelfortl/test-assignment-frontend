import axios from "axios";

const baseUrl = "https://scandiwebtestpablo.shop/"

export async function getProducts () {
    const response = await axios.get(`${baseUrl}`)
    return response.data
}

export async function massDelete (productIds) {
    const response = await axios.patch(`${baseUrl}`, productIds)
    return response.data
}

export async function addProduct (body) {
    const response = await axios.post(`${baseUrl}`, body)
    return response.data
}