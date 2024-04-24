'use client';
import Image from "next/image";
import {useState} from "react";
import { useRouter } from 'next/navigation'
import { setCookie } from "cookies-next";
import urlFetch from "@/URl";
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const route = useRouter()
  const handleFormSubmit = async () => {
    try {
      const response = await fetch(urlFetch.login, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if(data.status === "ok"){
        setCookie('c_user', data.id);
        route.push('/')
      }else {
        setLoginInProgress(false);
      }
    }
    catch(error) {
      console.log(error)
    }

  }

  // const handleFormSubmit = async (ev) => {
  //   ev.preventDefault();
  //   setLoginInProgress(true);

  //   await signIn('credentials', {email, password, callbackUrl: '/'});

  //   setLoginInProgress(false);
  // }
  return (
    <section className="mt-8" style={{height:'480px'}}>
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <div className="max-w-xs mx-auto">
        <input type="email" name="email" placeholder="email" value={email}
             
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
              
               onChange={ev => setPassword(ev.target.value)}/>
        <button type="submit" onClick={handleFormSubmit}>Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </div>
    </section>
  );
}