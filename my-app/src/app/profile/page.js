'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import { getCookie } from 'cookies-next';
import urlFetch from "@/URl";
import toast from "react-hot-toast";
import Alert from "@/components/alert";
import Header from "@/components/layout/Header";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [isAdmin, setIAdmin] = useState(0);
  const [alert, setAlert] = useState(false);
  const status = getCookie('c_user');
  
  useEffect(() => {
    if (status !== undefined) {
      fetch(`${urlFetch.profile}${status}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIAdmin(data.admin);
        setProfileFetched(true);
      })
    }
  }, [status]);

  const handleProfileInfoUpdate = async (ev, data) => {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(`${urlFetch.profile}${status}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (response.ok){
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000);
        resolve()
      }
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });

  }

  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <div className="mt-8">
      <Header cookies = {getCookie('c_user')}/>
      {alert? (
        <Alert/>
      ): null}
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        {profileFetched ? (
          <UserForm user={user} onSave={handleProfileInfoUpdate} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
  
}
