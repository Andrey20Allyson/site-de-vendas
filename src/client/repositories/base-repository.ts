import {
  CollectionReference,
  DocumentData,
  Firestore,
  QueryConstraint,
  WithFieldValue,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc
} from "firebase/firestore";

export interface RepositoryConfig {
  database: Firestore;
  collectionName: string;
}

export class BaseRepository<T extends DocumentData = DocumentData> {
  private collectionRef: CollectionReference<T>;

  constructor(config: RepositoryConfig) {
    const {
      collectionName,
      database,
    } = config;

    this.collectionRef = collection(database, collectionName) as CollectionReference<T>;
  }

  getDoc(id: string) {
    const docRef = doc(this.collectionRef, id);

    return getDoc(docRef);
  }

  getDocs(...constants: QueryConstraint[]) {
    const q = query<T>(this.collectionRef, ...constants)

    return getDocs(q);
  }

  setDoc(id: string, data: WithFieldValue<T>) {
    const docRef = doc(this.collectionRef, id);

    return setDoc(docRef, data);
  }
}