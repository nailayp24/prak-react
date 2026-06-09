import axios from 'axios'

const API_URL = "https://gjzvlpjinchgwzeuvzas.supabase.co/rest/v1/note"
const API_KEY = "sb_publishable_F8Iot9vlObSzAFx3r5bxSQ_F78Gd0Vs"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    }, // <-- Berikan tanda koma di sini

    // TAMBAHKAN FUNGSI HAPUS INI
    async deleteNote(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}