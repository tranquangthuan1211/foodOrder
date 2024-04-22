'use client';
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import {useEffect, useState} from "react";
import urlFetch from "@/URl";
import toast from "react-hot-toast";

export default function CategoriesPage() {

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  // const {loading:profileLoading, data:profileData} = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch(urlFetch.catogories)
      .then(res => res.json())
      .then(categories => setCategories(categories));
  }
// ---------------------
  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`${urlFetch.catogories}${_id}`, {
        method: 'DELETE',
      });
      const res = await response.json()
      if(res.status === 'success'){ 
        resolve();
      }else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    fetchCategories();
  }
  // -----------------------------
  async function handlePutClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`${urlFetch.catogories}/update`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8' 
         },
         body: JSON.stringify({
          _id: _id,
          name:categoryName
         })
      });
      const res = await response.json()
      if(res.status === 'success'){ 
        resolve();
      }else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Update...',
      success: 'Update',
      error: 'Error',
    });

    fetchCategories();
  }
  async function handleCreate() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`${urlFetch.catogories}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:'beef'
        }),
      });
      const res = await response.json()
      if(res.status === 'success'){ 
        resolve();
      }else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Create...',
      success: 'Create',
      error: 'Error',
    });

    fetchCategories();
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8">
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update category' : 'New category name'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input type="text"
                   value={categoryName}
                  onChange={ev => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            {editedCategory ? (
              <button className="border border-primary" type="button" 
                onClick={() => handlePutClick(editedCategory._id)}
              >
                Update 
              </button>

            ) : (
              <button className="border border-primary" type="button"
                onClick={() => handleCreate()}
              >
                Create
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
              >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 && categories.map(c => (
          <div
            key={c._id}
            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">
              {c.name}
            </div>
            <div className="flex gap-1">
              <button type="button"
                      onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                      }}
              >
                Edit
              </button>
              <DeleteButton
                label="Delete"
                onDelete={() => handleDeleteClick(c._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}