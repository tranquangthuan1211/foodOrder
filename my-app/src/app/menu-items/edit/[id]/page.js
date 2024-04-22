'use client';
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {redirect, useParams,useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import urlFetch from "@/URl";
export default function EditMenuItemPage() {
  const {id} = useParams();
  const route = useRouter();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = useProfile();
  useEffect(() => {
    fetch(urlFetch.MenuItem)
    .then(res => res.json())
    .then(items => {
      const item = items.find(i => i._id === id);
        setMenuItem(item);
      });
  }, []);

  // async function handleFormSubmit(ev, data) {
  //   ev.preventDefault();
  //   const savingPromise = new Promise(async (resolve, reject) => {
  //     const response = await fetch('http://localhost:3000/menu-items', {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         _id:id,
  //         data:data
  //       }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     if (response.ok){
  //       route.push('/menu-items')
  //       resolve()
  //     }
  //     else
  //       reject();
  //   });

  //   await toast.promise(savingPromise, {
  //     loading: 'Saving this tasty item',
  //     success: 'Saved',
  //     error: 'Error',
  //   }
  // );

  //   setRedirectToItems(true);
  // }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch(urlFetch.MenuItem +id, {
        method: 'DELETE',
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return <h1>'Loading user info...'</h1>;
  }

  if (!data.admin) {
    return <h1>'Not an admin.'</h1>;
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      {menuItem !== null ? (
        <MenuItemForm menuItem={menuItem} />
      ): (<h1>loading</h1>)} 
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}