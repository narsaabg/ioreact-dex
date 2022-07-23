import { IonContent, IonHeader,IonButton,IonIcon, IonPage, IonTitle, IonRefresherContent,IonRefresher ,IonListHeader,IonToolbar ,IonCard,IonCardContent} from '@ionic/react';
import {heart,copy,share,chevronDownCircleOutline} from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import {useEffect,useState} from 'react'
import './Favourite.css';
import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';
import { Toast } from '@capacitor/toast';
import { Storage } from '@capacitor/storage';


type quote = {
  id: string;
  quote: string;
  author: string;
};

const Favourite: React.FC = () => {
  const [quotes,setQuotes] = useState<quote[]>([]);

  useEffect(()=>{
    getQuotes();
  },[]);

  const getQuotes=async()=>{
      console.log('get quotes')
      const favouriteArr:any = await Storage.get({ key: 'favourite' });
      if(favouriteArr.value == null){
        return;
      }
      setQuotes(JSON.parse(favouriteArr.value));
    }

  const copyBtn=async (item:any)=>{
    var quote = item.quote+' ~'+item.author;
    
    await Clipboard.write({
      string: quote
    });
    await Toast.show({
      text: 'Copied',
    });
  }

  const shareBtn=async(item:any)=>{
    await Share.share({
      title: 'See this quote',
      text: item.quote,
      url: '',
      dialogTitle: 'Share with buddies',
    });
  }

  const unFavouriteBtn=async(item:any)=>{
    const favouriteArr:any = await Storage.get({ key: 'favourite' });

    if(typeof favouriteArr == 'object'){
      const savedArr:any = await JSON.parse(favouriteArr.value);
      if(savedArr == null){
       console.log('empty');
      }else{
        if(savedArr.length  > 0){
          let exist = false;
          savedArr.forEach((data:any,index:number)=>{
            if(data.id == item.id){
              // exist = true;

              savedArr.splice(index,1);
            }
          });

          await Storage.set({
            key: 'favourite',
            value: JSON.stringify(savedArr),
          });
            getQuotes();
        }else{
          console.log('empty array')
        }
      }
      
    }else{
      console.log(typeof favouriteArr);
    }
  }

  const doRefresh=(event: CustomEvent<RefresherEventDetail>)=>{
    setTimeout(() => {
      getQuotes();
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favourite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing...">
            </IonRefresherContent>
          </IonRefresher>
            {
            quotes.map((item,index)=>(
                <IonCard class="welcome-card" key={index}>
                  <IonCardContent className="quote-card-content">
                   <p className="quote-text">
                    {item.quote}
                  </p>
                  <p className="quote-author">
                    ~{item.author}
                  </p>
                  </IonCardContent>
                  <IonListHeader style={{justifyContent: 'end'}} className="quote-card-list-header">
                    <IonButton onClick={()=>unFavouriteBtn(item)}><IonIcon icon={heart} className='is-favourite'/></IonButton>
                    <IonButton onClick={()=>copyBtn(item)}><IonIcon icon={copy} /></IonButton>
                    <IonButton onClick={()=>shareBtn(item)}><IonIcon icon={share} /></IonButton>
                  </IonListHeader>
                </IonCard>
            ))
          }
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Favourite;
