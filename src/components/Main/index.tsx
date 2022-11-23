import {
    Container,
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContainer,
    CenteredContainer
    } from "./styles";
import { Header } from "../Header"
import { Categories } from "../Categories"
import { Menu } from "../Menu"
import { Button } from "../Button"
import { TableModal } from "../TableModal"
import { useEffect, useState } from "react"
import { Cart } from '../Cart'
import { ActivityIndicator } from "react-native"
import { Empty } from "../Icons/Empty"
import { Text } from "../Text"
import { ICategory, IProduct, CartItem } from "../../interfaces/interface"
import { api } from "../../utils/api"


export function Main(){

    const [isTableModalVisible, setIsTableModalVisible] = useState(false)
    const [selectedTable, setSelectedTale] = useState('')
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [isLoadingProducts, setIsLoadingProducts] = useState(false)


    useEffect(() => {
        Promise.all([
            api.get('/categories'),
            api.get('/products')
        ]).then(([categoriesResponse, productsResponse]) => {
            setCategories(categoriesResponse.data)
            setProducts(productsResponse.data)
            setIsLoading(false)
        })
    }, [])

    async function handleSelectCategory(categoryId: string) {
        const route = categoryId ? `/categories/${categoryId}/products` : '/products'
        setIsLoadingProducts(true)

        const response = await api.get(route)

        setProducts(response.data)
        setIsLoadingProducts(false)
    }

    function handleSaveTable(table: string){
        setSelectedTale(table)
    }


    function handleResetOrder(){
        setSelectedTale('')
        setCartItems([])
    }

    function handleAddToCart(product: IProduct){
        if(!selectedTable){
            setIsTableModalVisible(true)
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id)

            if(itemIndex < 0){
                return prevState.concat({
                    quantity: 1,
                    product,
                })
            }

            const newCartItems = [...prevState]
            const item =  newCartItems[itemIndex]

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1
            }

            return newCartItems
        })
    }

    function handleDecrementCartItem(product: IProduct) {
        setCartItems((prevState) => {

            const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id)
            const item = prevState[itemIndex]
            const newCartItems = [...prevState]

            if(item.quantity === 1) {
                newCartItems.splice(itemIndex, 1)

                return newCartItems
            }

            newCartItems[itemIndex] = {
                ...newCartItems[itemIndex],
                quantity: newCartItems[itemIndex].quantity - 1
            }

            return newCartItems

        })
    }


    return (
        <>
            <Container>
                <Header
                selectedTable={selectedTable}
                onCancelOrder={handleResetOrder}
                />

                {isLoading && (
                    <CenteredContainer>
                        <ActivityIndicator color="#D73035" size='large'/>
                    </CenteredContainer>
                )}

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenteredContainer>
                                <ActivityIndicator color="#D73035" size="large"/>
                            </CenteredContainer>
                        ) : (
                            <>
                                {products.length > 0 ? (
                                    <MenuContainer>
                                        <Menu onAddToCart={handleAddToCart} products={products}/>
                                    </MenuContainer>
                                ) : (
                                    <CenteredContainer>
                                        <Empty />
                                        <Text color='#666' style={{ marginTop: 24 }}>Nenhum produto foi encontrado!</Text>
                                    </CenteredContainer>
                                )}
                            </>
                        )}
                    </>
                )}

            </Container>

            <Footer>
                <FooterContainer>
                    {!selectedTable && (
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            disabled={isLoading}
                        >
                            Novo Pedido
                        </Button>
                    )}

                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                            onAdd={handleAddToCart}
                            onDecrement={handleDecrementCartItem}
                            onConfirmOrder={handleResetOrder}
                            selectedTable={selectedTable}
                        />
                    )}
                </FooterContainer>
            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable}
            />

        </>
    )
}
