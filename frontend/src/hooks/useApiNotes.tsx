import { useAuth } from "@clerk/react"
import type { Note, CreateNoteType, UpdateNoteType } from "@/app/types"
import { useCallback } from "react"
const API_URL= import.meta.env.VITE_API_URL || "http://localhost:3001"

export default function useGetAllNotes(){
    const {getToken}= useAuth()

    const getAllUserNote=useCallback( async ()=>{ // * useCallback keeps the function reference stable between renders
                                              // * as long as its dependencies don't change.
        const token= await getToken()
        if(!token){
            console.log("No token provided")
            return []
        }
         console.log("token",token)
        const response= await fetch(API_URL+"/api/notes",{
          headers: {
            Authorization: `Bearer ${token}`  //Bearer: Keyword used before the authentication token.
          }
        }
        )
        const data:{ notes: Note[] } = await response.json() // notes is the key of the object
        console.log("data",data)
        if (!response.ok) {
          return []
        }
        return data.notes ?? []
        },[getToken]) 







      //Create Note
      const createnote = useCallback(async (note: CreateNoteType) => {
        const token = await getToken()

        if (!token) {
          console.log("No token provided")
          return null
        }

        const response = await fetch(API_URL + "/api/notes", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        })
        const data: { note: Note } = await response.json()
        console.log("data", data)
        if (!response.ok) {
          return null
        }
        return data.note ?? null
      }, [getToken])




      // * GET is used to get a single note by id
      const getNoteById = useCallback(async (id: string) => {
        const token = await getToken()
        if (!token) {
          console.log("No token provided")
          return null
        }
        const response = await fetch(API_URL + "/api/notes/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data: { note: Note } = await response.json()
        console.log("data", data)
        return data.note
      }, [getToken])



      // * PATCH is used to update a single note by id
      const updateNote = async (id: string, note: UpdateNoteType) => {
        const token = await getToken()
        if (!token) {
          console.log("No token provided")
          return null
        }

        const response = await fetch(API_URL + "/api/notes/" + id, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        })
        const data: { note: Note } = await response.json()
      
        return data.note
      }

      // * DELETE is used to delete a single note by id
      const deleteNote = useCallback(async (id: string) => {
        const token = await getToken()
        if (!token) {
          console.log("No token provided")
          return null
        }
        const response = await fetch(API_URL + "/api/notes/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      
     
        return response.ok
      }, [getToken])
  
   
return {getAllUserNote, createnote,getNoteById,updateNote,deleteNote}
}