import { IonContent, IonHeader,IonImg ,IonButton,IonInput,IonItem,IonLabel,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle, IonGrid,IonPage,IonCol, IonRow,IonTitle, IonToolbar,IonRefresherContent,IonRefresher } from '@ionic/react';
import {useState,useEffect,useRef} from 'react'
import {storage,ref,uploadBytesResumable,getDownloadURL}  from '../Firestore';
import firebase  from '../Firebase';
import { Toast } from '@capacitor/toast';

const AddCategoryComponent: React.FC=()=>{
	const [category,setCategoryData] = useState({name:'',thumb:''});
	const [uploaded, setUploaded] = useState<any>(false);
	const dbref = firebase.database().ref('categories/');
	const inputRef = useRef(null);

	const setCategory=(e:any)=>{
		let name = e.target.name;
		let value = e.target.value;

		switch(name){
			case 'name':
				setCategoryData({...category,name:value});
				break;
			default:
				break;
		}
	}

	const addCategory=async ()=>{
		console.log(category);
		if(category.name != '' && category.thumb != ''){
			dbref.push(category);
			await Toast.show({
		      text: 'Added Successfuly',
		    });
			setCategoryData({name:'',thumb:''});
			setUploaded(false);
			inputRef.current.value = null;
			return;
		}
		await Toast.show({
	      text: 'something went wrong',
	    });
	}
	
	const uploadThumbnail=(e:any)=>{
		const image = e.target.files[0];
		let time = new Date().getTime();
		const imageName = time+'_'+e.target.files[0].name;
		console.log(imageName);
      	
      	const storageRef = ref(storage,`/Categories/${imageName}`);
	    const uploadTask = uploadBytesResumable(storageRef, image);
	 
	    uploadTask.on(
	        "state_changed",
	        (snapshot) => {
	            const percent = Math.round(
	                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
	            );
	            // update progress
	            console.log(percent);
	        },
	        (err) => console.log(err),
	        () => {
	            // download url
	            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
				setCategoryData({...category,thumb:url});
				setUploaded(true);
            });
	        }
	    );
	}

	return(
		<IonContent>
	      <IonCard>
	      <IonCardContent>
      	  	<IonItem>
	            <IonLabel position="stacked">Category</IonLabel>
	            <IonInput value={category.name} name="name" onIonChange={e => setCategory(e)}> </IonInput>
          	</IonItem>
          	<IonItem>
	            <IonLabel position="stacked">Thumbnail</IonLabel>
	            <input ref={inputRef} type="file" name="thumb" id="cat_thumb" onChange={e => uploadThumbnail(e)} />
          	</IonItem>
	      </IonCardContent>
          	</IonCard>
          	<IonButton style={{margin: "10px"}} onClick={()=>addCategory()} disabled={!uploaded}>Add Quote</IonButton>
      	</IonContent>
	)
}

export default AddCategoryComponent;