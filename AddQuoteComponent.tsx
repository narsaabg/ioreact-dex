import { IonContent, IonHeader,IonImg ,IonItem,IonTextarea,IonInput,IonLabel,IonButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle, IonGrid,IonPage,IonCol, IonRow,IonTitle, IonToolbar,IonRefresherContent,IonRefresher } from '@ionic/react';
import {useState,useEffect} from 'react'
import { Toast } from '@capacitor/toast';
import firebase from '../Firebase';

const AddQuoteComponent: React.FC=()=>{
	const [quoteData,setQuoteData] = useState({quote:'',author:''});
	const dbref = firebase.database().ref('quotzy/');

	const setQuote=(e:any)=>{
		let name = e.target.name;
		let value = e.target.value;

		switch(name){
			case 'quote':
				setQuoteData({...quoteData,quote:value});
				break;
			case 'author':
				setQuoteData({...quoteData,author:value});
				break;
			default:
				break;
		}
	}

	const addQuote=async()=>{
		if(quoteData.quote != '' && quoteData.author != ''){
			dbref.push(quoteData);
			return;
		}
		await Toast.show({
	      text: 'empty field!',
	    });
	}

	return(
		
	      <IonContent>
	      <IonCard>
	      <IonCardContent>
      	  	<IonItem>
	            <IonLabel position="stacked">Quote</IonLabel>
	            <IonTextarea  value={quoteData.quote} name="quote" onIonChange={e => setQuote(e)}> </IonTextarea >
          	</IonItem>
          	<IonItem>
	            <IonLabel position="stacked">Author</IonLabel>
	            <IonInput value={quoteData.author} name="author" onIonChange={e => setQuote(e)}> </IonInput>
          	</IonItem>
	      </IonCardContent>
          	</IonCard>
          	<IonButton style={{margin: "10px"}} onClick={()=>addQuote()}>Add Quote</IonButton>
	      </IonContent>
	)
}

export default AddQuoteComponent;