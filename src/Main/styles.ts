import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === 'android'

/**
 * SafeAreaView Trabalha com a area segura do dispositivo. Isso indica qual é a area segura para se trabalhar com meus styles
 * sem que um determinado componente fique escondido no notch da tela do celular. Porém o  SafeAreaView funciona apenas para o IOS
*/

export const Container = styled.SafeAreaView`
    /**
    Usando operador ternário para setar a distância padrão para a status bar do android,
    quando for IOS, a distância para a statusbar será 0, para android, vai variar de dispositivo para dispositivo
    */
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}.px`: 0};
    flex: 1;
    background: #fafafa;
`

export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 34px;
`

export const MenuContainer = styled.View`
    height: 50px;
    flex: 1;
`


export const Footer = styled.View`
    min-height: 10px;
    background: #fff;
    padding: 16px 24px;
`


export const FooterContainer = styled.SafeAreaView`
`