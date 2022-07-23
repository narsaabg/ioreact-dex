import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact,IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge  } from '@ionic/react';
import {heart,home,menu,add} from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Favourite from './pages/Favourite';
import Manage from './pages/Manage';
import PushNotificationsContainer from './Notifications';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route exact path="/favourite">
          <Favourite />
        </Route>
        <Route exact path="/manage">
          <Manage />
        </Route>
        <Route exact path="/notification">
          <PushNotificationsContainer />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>home</IonLabel>
          {/*<IonBadge>6</IonBadge>*/}
        </IonTabButton>
        <IonTabButton tab="categories" href="/categories">
          <IonIcon icon={menu} />
          <IonLabel>Categories</IonLabel>
          {/*<IonBadge>6</IonBadge>*/}
        </IonTabButton>
        <IonTabButton tab="favourite" href="/favourite">
          <IonIcon icon={heart} />
          <IonLabel>Favourite</IonLabel>
          {/*<IonBadge>6</IonBadge>*/}
        </IonTabButton>
        <IonTabButton tab="manage" href="/manage">
          <IonIcon icon={add} />
          <IonLabel>Manage</IonLabel>
          {/*<IonBadge>6</IonBadge>*/}
        </IonTabButton>
      </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
