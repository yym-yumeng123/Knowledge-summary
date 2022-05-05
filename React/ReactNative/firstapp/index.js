import {AppRegistry} from 'react-native';
import App from './App/index';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent(appName, () => {
  setTimeout(() => {
    SplashScreen.hide();
  }, 1000);
  return App;
});

// export default class WelcomePage extends Component {
//   componentDidMount() {
//     // do stuff while splash screen is shown
//     // After having done stuff (such as async tasks) hide the splash screen
//     SplashScreen.hide();
//   }
// }
