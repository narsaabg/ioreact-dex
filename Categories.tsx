import {useState,useEffect} from 'react'
import { IonContent,IonLoading, IonHeader,IonImg ,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle, IonGrid,IonPage,IonCol, IonRow,IonTitle, IonToolbar,IonRefresherContent,IonRefresher } from '@ionic/react';
import {chevronDownCircleOutline,copy,share} from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import './Categories.css';
import firebase from '../Firebase'

const Categories: React.FC = () => {
  const dbref = firebase.database().ref('categories/');
  const [categories,setCategories] = useState<any>([]);
  const [showLoading, setShowLoading] = useState(true);


  const getFireCategories=async()=>{
    const data = await dbref.once('value');
    var CatList:Array<any> = [];
      data.forEach(function(DataSnapshot) {  
        let key = DataSnapshot.key; 
        let val = DataSnapshot.val(); 
        CatList.push({ id: key, name: val.name,thumb:val.thumb});
      });
      setCategories(CatList);
      setShowLoading(false);
  }

  useEffect(()=>{
    getFireCategories();
  },[]);

  const CategoriesList=[{
    id:'1',
    img:'https://picsum.photos/200',
  },
  {
    id:'2',
    img:'https://picsum.photos/200',
  },
  {
    id:'3',
    img:'https://picsum.photos/200',
  },
  {
    id:'4',
    img:'https://picsum.photos/200',
  }];

  const doRefresh=(event: CustomEvent<RefresherEventDetail>)=>{
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Loading..'}
          />
          <IonGrid>
          <IonRow>
          { 
            categories.map((item:any,index:any)=>(
              <IonCol size="12" key={index}>
                <IonCard>
                  <IonCardContent className="card-content-img">
                    <IonImg src={item.thumb} alt="test" className="cat-img"/>
                     <IonCardHeader className="card-header">
                    <IonCardSubtitle className="cat-name">{item.name}</IonCardSubtitle>
                  </IonCardHeader>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))
          }
          </IonRow>
        </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
