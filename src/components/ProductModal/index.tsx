import { FlatList, Modal } from "react-native";
import { IProduct } from "../../interfaces/interface";
import { Product } from "../../types/Product";
import { localHostWithPort } from "../../utils/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import  { Close }  from "../Icons/Close"; //O navegador não renderiza esse componente
import { Text } from '../Text'
import { Image, CloseButton, Header, ModalBody, IngredientContainer, Ingredient, Footer, FooterContainer, PriceContainer } from './styles'



interface ProductModalProps{
    visible: boolean
    onClose: () => void
    product: null | Product
    onAddToCart: (product: IProduct) => void
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps){

    if(!product){
        return null
    }

    function handleAddToCart(){
        onAddToCart(product!)
        onClose()
    }

    return (
        <Modal
        visible={visible}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={onClose}
        >
            <Image source={{
                    uri: `http://${localHostWithPort}/uploads/${product.imagePath}`
                }}
            >

                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>

            <ModalBody>
                <Header>
                    <Text size={24} weight='600'>{product.name}</Text>
                    <Text color="#666" style={{ marginTop: 8 }}>{product.description}</Text>
                </Header>

                {(product.ingredients.length > 0  &&
                    <IngredientContainer>
                        <Text color="#666" weight="600">Ingredientes</Text>

                        <FlatList
                            data={product.ingredients}
                            keyExtractor={(ingredients) => ingredients._id}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: 16 }}
                            renderItem={({ item }) => (
                                <Ingredient>
                                    <Text>{item.icon}</Text>
                                    <Text color="#666" size={14} style={{ marginLeft: 20 }}>{item.name}</Text>
                                </Ingredient>
                            )}
                        />
                    </IngredientContainer>
                )}
            </ModalBody>

            <Footer>
                <FooterContainer>
                    <PriceContainer>

                        <Text color='#666'>Preço</Text>
                        <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>

                    </PriceContainer>

                    <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
                </FooterContainer>
            </Footer>
        </Modal>
    )
}