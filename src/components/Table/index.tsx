import { Modal } from 'react-native'
import { Overlay } from './styles'
import { Text } from '../Text'

export function TableModal(){
    return (

        <Overlay>
        <Modal
        transparent>

            <Text>
                Ola, mundo
            </Text>


        </Modal>

        </Overlay>
    )
}