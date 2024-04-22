'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import {useParams,useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import urlFetch from "@/URl";

export default function EditUserPage() {
  const route = useRouter()
  const {loading, data} = useProfile();
  const [user, setUser] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    fetch(urlFetch.profile + id)
    .then(res => res.json())
    .then(user => {
        setUser(user);
      });
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch(urlFetch.profile + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data,_id:id}),
      });
      if (res.ok){
        route.push('/users')
        resolve()
      }
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: 'An error has occurred while saving the user',
    });
  }

  if (loading) {
    return <h1>'Loading user profile...'</h1>;
  }

  if (!data.admin) {
    return <h1>'Not an admin'</h1>;
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      {user !== null ? (
        <div className="mt-8">
          <UserForm user={user} onSave={handleSaveButtonClick} />
        </div>
      ): (
        <h1>loading...</h1>
      )}
    </section>
  );
}