import { addDoc, CollectionReference, deleteDoc, doc, DocumentData, getDoc, getDocs, query, Query, QueryFieldFilterConstraint, QuerySnapshot, updateDoc } from "firebase/firestore";

export default class BaseService {
    static async create<T extends object>(collectionRef: CollectionReference<DocumentData, DocumentData>, data: T): Promise<T> {
        const docRef = await addDoc(collectionRef, data)
        const docSnap = await getDoc(doc(collectionRef, docRef.id))
        return { ...docSnap.data(), id: docSnap.id } as T & { id: string };
    }
    static async update(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string, data: object): Promise<void> {
        const docRef = doc(collectionRef, id);
        await updateDoc(docRef, { ...data })
    }
    static async delete(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string): Promise<void> {
        const docRef = doc(collectionRef, id);
        await deleteDoc(docRef);
    }
    // static async get(collectionRef: CollectionReference<DocumentData, DocumentData>, id: string): Promise<DocumentData | null> {
    //     const docRef = doc(collectionRef, id);
    //     const docSnap = await getDoc(docRef);
    //     return docSnap.exists ? docSnap.data() : null;
    // }
    static async query(collectionRef: CollectionReference<DocumentData, DocumentData>, queryFilter: QueryFieldFilterConstraint): Promise<QuerySnapshot<DocumentData, DocumentData>> {
        const queryInstance = query(collectionRef, queryFilter)
        const querySnapshot = await getDocs(queryInstance);
        return querySnapshot;
    }
}