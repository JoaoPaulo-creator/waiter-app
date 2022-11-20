import { Modal, Platform } from "react-native";
import { Product } from "../../types/Product";
import { Text } from '../Text'


const isAndroid = Platform.OS === 'android'

interface ProductModalProps{
    visible: boolean
    onClose: () => void
    product: null | Product
}

export function ProductModal({visible, onClose, product}: ProductModalProps){
    return (
        <Modal
        visible={visible}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={onClose}
        >
            <Text>
                ProductMotal
            </Text>
        </Modal>
    )
}