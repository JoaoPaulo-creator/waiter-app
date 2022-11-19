import { useFonts } from 'expo-font'
import { Main } from './src/Main';
import { StatusBar } from 'expo-status-bar';


// realizando esses dois imports para que a formação da moeda seja feita no android
// sem eles, a formatação do jeito que está será realizada somente no IOS, retornando um erron o android
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

export default function App() {
  const [ isFontsLoaded ] = useFonts({
    //'GeneralSans-400': require('./assets/fonts/GeneralSans-Regular.otf'),
    //'GeneralSans-600':  require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    //'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf')
  })

  if(!isFontsLoaded){
    return null
  }

  return (
    <>
      <StatusBar style='dark'/>
      <Main />      
    </>

  );
}