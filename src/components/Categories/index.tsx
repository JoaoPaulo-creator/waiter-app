import { FlatList } from 'react-native'

import { categories } from '../mocks/categories'
import { Category, Icon } from './styles'
import { Text } from '../Text'
import { useState } from 'react'



export function Categories() {

    const [selectedCategory, setSelectedCategory] = useState('') // estado dos ícones de categoria

    function handleSelectCategory(categoryId: string){
        const category = selectedCategory === categoryId ? '' : categoryId
        setSelectedCategory(category)
    }



    return (

        // usando flatlist para iterar meu category e rendereizar os elementos na tela

        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        contentContainerStyle={{ paddingRight: 24 }}
        keyExtractor={category =>  category._id}
        renderItem={({ item: category }) => {

            const isSelected = selectedCategory === category._id

            return(

                <Category onPress={() => handleSelectCategory(category._id)}>

                    <Icon>
                        <Text opacity={isSelected ? 1 : 0.5}>
                            {category.icon}
                        </Text>
                    </Icon>

                    <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
                        {category.name}
                    </Text>

                </Category>

            )
        }}
        >

        </FlatList>

    )
}