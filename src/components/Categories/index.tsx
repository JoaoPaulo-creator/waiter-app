import { FlatList } from 'react-native'

import { categories } from '../../mocks/categories'
import { CategoryContainer, Icon } from './styles'
import { Text } from '../Text'
import { useState } from 'react'

import { ICategory } from '../../interfaces/interface'

interface CategoriesProps {
    categories: ICategory[]
    onSelectCategory: (categoryId: string) => Promise<void>
}


export function Categories({ categories, onSelectCategory }: CategoriesProps) {

    const [selectedCategory, setSelectedCategory] = useState('') // estado dos ícones de categoria

    function handleSelectCategory(categoryId: string){
        const category = selectedCategory === categoryId ? '' : categoryId
        onSelectCategory(category)
        setSelectedCategory(category)
    }



    return (

        // usando flatlist para iterar meu category e rendereizar os elementos na tela

        <FlatList
        data={categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
        keyExtractor={(category) =>  category._id}
        renderItem={({ item: category }) => {

            const isSelected = selectedCategory === category._id

            return(

                <CategoryContainer onPress={() => handleSelectCategory(category._id)}>

                    <Icon>
                        <Text opacity={isSelected ? 1 : 0.5}>
                            {category.icon}
                        </Text>
                    </Icon>

                    <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
                        {category.name}
                    </Text>

                </CategoryContainer>

            )
        }}
        />
    )
}