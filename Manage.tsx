import { IonContent, IonHeader,IonImg ,IonButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle, IonGrid,IonPage,IonCol, IonRow,IonTitle, IonToolbar,IonRefresherContent,IonRefresher } from '@ionic/react';
import {useState,useEffect} from 'react'
import AddQuoteComponent from '../components/AddQuoteComponent'
import AddCategoryComponent from '../components/AddCategoryComponent'

const AddQuote: React.FC=()=>{
	const [isAddQuote , setIsAddQuote] = useState<boolean>(true);

	const changeScreen=(val:number)=>{
		if(val === 2){
			setIsAddQuote(false)
		}else{
			setIsAddQuote(true)
		}
	}

	return(
		<IonPage>
	      <IonHeader>
	        <IonToolbar>
	          <IonTitle>Categories</IonTitle>
	        </IonToolbar>
	      </IonHeader>
	      <IonContent fullscreen>
      	  	<IonRow>
              <IonCol size="6">
         		<IonButton expand="block" fill="outline" onClick={()=>changeScreen(1)}>Add Quote</IonButton>
              </IonCol>
              <IonCol size="6">
         		<IonButton expand="block" fill="outline" onClick={()=>changeScreen(2)}>Add Category</IonButton>
              </IonCol>
          	</IonRow>
          	<IonContent>
          	 	{
          	 		isAddQuote ?

          	 		<AddQuoteComponent /> : <AddCategoryComponent/>
          	 	}
          	</IonContent>
	      </IonContent>
		</IonPage>
	)
}

export default AddQuote;