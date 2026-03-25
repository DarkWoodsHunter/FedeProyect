import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

export const firebaseConfig = {

  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: process.env.REACT_APP_AUTHDOMAIN,

  projectId: process.env.REACT_APP_PROYECTID,

  storageBucket: process.env.REACT_APP_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,

  appId: process.env.REACT_APP_APPID,

};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//USUARIOS
//Create a template para los Usuarios
export interface Task {
  id: string,
  Nombre: string,
  email: string,
  rol: string,
  nivel: number,
  currentExp: number,
  skill: string,
  materias: object,
  portraitimg: string,
  puntos: number,
  recompensas: string,
  logros: string,
  items: string
}

//Crear nueva entry en FireStore
export async function CreateNewEntry(nombre: string, email: string, nivel: number, currentExp: number, id: string) {
  try {
    const DocRef = await setDoc(doc(db, "Usuarios", id), {
      Nombre: nombre,
      Email: email,
      Rol: "regular",
      Nivel: nivel,
      CurrentExp: currentExp,
      Skill: "",
      Materias: [],
      PortraitImg: "",
      Puntos: 0,
      Recompensas: [],
      Logros: [],
      Items: [],
      Date: new Date(),
    })
  } catch (error) {
    console.log(error);
  };
}

//Actualizar una entry en Firestore
export async function UpdateEntry(id: string, nombre: string, email: string, rol: string, nivel: number, currentExp: number, skill: string,
  materias: object, portraitimg: string, puntos: number, recompensas: string, logros: string, items: string) {
  try {
    const DocRef = await updateDoc(doc(db, "Usuarios", id),
      {
        Nombre: nombre,
        Email: email,
        Rol: rol,
        Nivel: nivel,
        CurrentExp: currentExp,
        Skill: skill,
        Materias: materias,
        PortraitImg: portraitimg,
        Puntos: puntos,
        Recompensas: recompensas,
        Logros: logros,
        Items: items,
      }
    )
  } catch (error) {
    console.log(error)
  }
}

//Conseguir todas las Entries de la DB
export async function GetAllUsers() {
  try {
    const querySnapShot = await getDocs(collection(db, "Usuarios"));
    return querySnapShot.docs.map(doc => doc.data())
  } catch (error) {
    console.log(error)
  }
}

//Conseguir la informacion de UN solo usuario por ID
export const GetOneUser = async (id: string): Promise<Task | null> => {
  try {
    const querySnapShot = await getDoc(doc(db, "Usuarios", id));
    if (querySnapShot.exists()) {
      localStorage.setItem(id, JSON.stringify(querySnapShot.data()))
      return { id: querySnapShot.id, ...querySnapShot.data() } as Task;
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

//Eliminar una entry en la DB
export async function DeleteUser(id: string) {
  try {
    deleteDoc(doc(db, "Usuarios", id))
  } catch (error) {
    console.log(error)
  }

}

//EVENTOS
export interface EventoTask {
  id: string,
  Nombre: string,
  Puntos: number,
  Imagen: string,
}
//Crear nueva entry en FireStore
export async function CreateNewEvent(nombre: string, puntos: number, img: string, id: string) {
  try {
    const DocRef = await setDoc(doc(db, "Eventos", id), {
      Nombre: nombre,
      Puntos: puntos,
      Imagen: img,
    })
  } catch (error) {
    console.log(error);
  };
}

//Conseguir todos los Eventos de la DB
export async function GetAllEvents() {
  try {
    const querySnapShot = await getDocs(collection(db, "Eventos"));
    return querySnapShot.docs.map(doc => doc.data())
  } catch (error) {
    console.log(error)
  }
}

//Conseguir la informacion de UN solo Evento por ID
export const GetOneEvent = async (id: string): Promise<EventoTask | null> => {
  try {
    const querySnapShot = await getDoc(doc(db, "Eventos", id));
    if (querySnapShot.exists()) {
      return { id: querySnapShot.id, ...querySnapShot.data() } as EventoTask;
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

//Eliminar una entry en la DB
export async function DeleteEvent(id: string) {
  try {
    deleteDoc(doc(db, "Eventos", id))
  } catch (error) {
    console.log(error)
  }
}

//Conseguir todos las Noticias de la DB
export async function GetAllNews() {
  try {
    const querySnapShot = await getDocs(collection(db, "Noticias"));
    return querySnapShot.docs.map(doc => doc.data())
  } catch (error) {
    console.log(error)
  }
}