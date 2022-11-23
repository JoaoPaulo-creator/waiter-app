import { useState } from 'react'
import { Modal, TouchableOpacity, Platform } from 'react-native'
import { Button } from '../Button'
import { Close } from '../Icons/Close' // importar depois <Close color={'#666'}/>

import { Text } from '../Text'

import { Overlay, ModalBody, Header, Form, Input } from './styles'



interface TableModalPropps {
    visible: boolean
    onClose: () => void
    onSave: (table: string) => void
}


export function TableModal({visible, onClose, onSave}: TableModalPropps){

    const isAndroid = Platform.OS === 'android'
    const [table, setTable] = useState('')

    function handleSave(){
        onSave(table)
        onClose()
        setTable('')
    }

    return (


        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={onClose}
        >
            <Overlay behavior={isAndroid ? 'height' : 'padding'}>
                <ModalBody>
                    <Header>
                        <Text weight='600'>Informe a mesa</Text>

                        <TouchableOpacity onPress={onClose}>
                            <Close color='#666'/>
                        </TouchableOpacity>
                    </Header>

                    <Form>
                        <Input
                            placeholder='Número da mesa'
                            placeholderTextColor={'#666'}
                            keyboardType='number-pad'
                            onChangeText={(value) => setTable(value)}
                        />
                        <Button onPress={handleSave} disabled={table.length === 0}>Salvar</Button>
                    </Form>

                </ModalBody>
            </Overlay>
        </Modal>

    )
}