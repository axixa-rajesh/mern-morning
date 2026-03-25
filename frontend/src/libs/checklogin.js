export default function checklogin() {
    const token = localStorage.getItem('token');
    return !!token;   
}