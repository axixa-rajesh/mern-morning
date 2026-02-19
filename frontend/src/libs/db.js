import  axios  from 'axios';
const APIURL = import.meta.env.VITE_API_URL || "127.0.0.1:5000/";
export async function all(module) {
    try {
        const object = await axios.get(APIURL+module);
        return(object.data.data);
        
    } catch (e) {
        
        throw e?.response?.data?.message;
    }
}
export async function find(module) {
    try {
        const object = await axios.get(APIURL+module);
        return(object.data.data);
        
    } catch (e) {
        
        throw e?.response?.data?.message;
    }
}
export async function store(module,data) {
    try {
        const object = await axios.post(APIURL+module,data);
        return(object.data);
        
    } catch (e) {
      
        throw e.response;
    }
}
export async function update(module,data) {
    try {
        const object = await axios.put(APIURL+module,data);
        return(object.data);
        
    } catch (e) {
      
        throw e.response;
    }
}
export async function deletes(module) {
    try {
        const object = await axios.delete(APIURL+module,{});
        return(object.data);
        
    } catch (e) {
      
        throw e.response;
    }
}