import axios from "axios";

export async function login(payload: { email: string; password: string }) {
  const res = await axios.post("http://localhost:8080/api/login", payload);
  return res.data;
}
