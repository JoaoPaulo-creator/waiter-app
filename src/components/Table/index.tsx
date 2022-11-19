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

    const [table, setTable] = useState('')

    function handleSave(){
        onSave(table)
        onClose()
    }

    return (

        
        <Modal
            visible={visible}
            transparent
            animationType='fade'
        >
            <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                <ModalBody>
                    <Header>

                        <Text weight='600'>Informe a mesa</Text>
                        
                        <TouchableOpacity onPress={onClose}>
                            
                        </TouchableOpacity>

                    </Header>

                    
                    <Form>
                        <Input 
                            placeholder='Número da mesa' 
                            placeholderTextColor={'#666'}
                            keyboardType='number-pad'
                            onChangeText={setTable}
                        />

                        <Button onPress={handleSave} disabled={table.length === 0}>Salvar</Button>
                    </Form>

                </ModalBody>
            </Overlay>
        </Modal>

    )
}