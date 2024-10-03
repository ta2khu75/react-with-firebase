import { addDoc, CollectionReference, deleteDoc, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";

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
}